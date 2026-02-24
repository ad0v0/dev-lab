import {
  AI_MOOD_FALLBACK_RESPONSE,
  parseAiMoodResponse,
  type AiMoodResponse,
} from "../../types";
import type OpenAI from "openai";

export type MoodAnalysisResult =
  | { ok: true; data: AiMoodResponse }
  | { ok: false; code: "RATE_LIMIT" | "SERVER_ERROR"; error?: unknown };

const MAX_RETRIES = 2;
const BASE_BACKOFF_MS = 300;

const ANALYSIS_SYSTEM_PROMPT = `
You are a psychologically aware emotional reflection engine.

Your task:
- Identify the dominant emotional tone.
- Estimate intensity on a 1–10 scale.
- Generate a cohesive color palette that reflects the emotional atmosphere.
- Provide a short but emotionally intelligent reflection.

Rules:
- The reflection should feel human, grounded, and non-judgmental.
- Avoid clichés.
- Do not over-motivate.
- Be emotionally precise rather than dramatic.
The color palette should not be random.
It must reflect the emotional temperature:
- warm colors for high-arousal emotions
- cool colors for low-energy emotions
- muted tones for neutral states

Return ONLY valid JSON with this structure:
{
  "emotion": string,
  "intensity": number,
  "colorPalette": string[],
  "shortReflection": string,
  "followUpQuestion": string | null
}

Always return a short reflective question.
Never return null.
No explanations outside JSON.
`;

type ErrorWithStatus = {
  status?: number;
};

function getErrorStatusCode(error: unknown): number | null {
  if (typeof error !== "object" || error === null) {
    return null;
  }

  const { status } = error as ErrorWithStatus;
  return typeof status === "number" ? status : null;
}

function shouldRetry(statusCode: number | null): boolean {
  if (statusCode === 429) {
    return true;
  }

  if (statusCode === null) {
    return true;
  }

  return statusCode >= 500;
}

async function sleep(ms: number): Promise<void> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function analyzeMoodWithOpenAI(
  openai: OpenAI,
  text: string,
): Promise<MoodAnalysisResult> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: ANALYSIS_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.4,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        return { ok: true, data: AI_MOOD_FALLBACK_RESPONSE };
      }

      try {
        const parsedContent: unknown = JSON.parse(content);
        const validated = parseAiMoodResponse(parsedContent);
        return { ok: true, data: validated ?? AI_MOOD_FALLBACK_RESPONSE };
      } catch {
        return { ok: true, data: AI_MOOD_FALLBACK_RESPONSE };
      }
    } catch (error: unknown) {
      const statusCode = getErrorStatusCode(error);
      const hasNextAttempt = attempt < MAX_RETRIES;
      if (hasNextAttempt && shouldRetry(statusCode)) {
        const delay = BASE_BACKOFF_MS * 2 ** attempt;
        await sleep(delay);
        continue;
      }

      if (statusCode === 429) {
        return { ok: false, code: "RATE_LIMIT", error };
      }

      return { ok: false, code: "SERVER_ERROR", error };
    }
  }

  return { ok: false, code: "SERVER_ERROR" };
}

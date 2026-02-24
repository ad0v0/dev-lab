import { z } from "zod";

/**
 * Shared types and interfaces.
 * Domain models and API contracts live here.
 */

/** Intensity scale for mood (1–10). */
export type MoodIntensity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/** A single mood log entry (user text + AI analysis). */
export interface MoodEntry {
  id: string;
  text: string;
  /** ISO 8601 date-time string, e.g. from `new Date().toISOString()`. */
  createdAt: string;
  response: AiMoodResponse;
  followUpQuestion: string;
}

/** Valid intensity values for runtime checks. */
export const MOOD_INTENSITY_MIN = 1;
export const MOOD_INTENSITY_MAX = 10;

export const MOOD_INTENSITY_VALUES: readonly MoodIntensity[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
] as const;

/**
 * Type guard: returns true if n is a valid MoodIntensity.
 */
export function isMoodIntensity(n: number): n is MoodIntensity {
  return Number.isInteger(n) && n >= MOOD_INTENSITY_MIN && n <= MOOD_INTENSITY_MAX;
}

function isMoodIntensityValue(value: unknown): value is MoodIntensity {
  return typeof value === "number" && isMoodIntensity(value);
}

export const aiMoodResponseSchema = z
  .object({
    emotion: z.string().min(1),
    intensity: z.custom<MoodIntensity>(isMoodIntensityValue, {
      message: "Invalid intensity value",
    }),
    colorPalette: z.array(z.string()).min(1),
    shortReflection: z.string().min(1),
    followUpQuestion: z.string().min(1),
  })
  .strict();

/** AI-generated mood analysis response. */
export type AiMoodResponse = z.infer<typeof aiMoodResponseSchema>;

export const AI_MOOD_FALLBACK_RESPONSE: AiMoodResponse = {
  emotion: "Neutral",
  intensity: 5,
  colorPalette: ["#dbe7ff", "#e7f7ef", "#fff1dd"],
  shortReflection: "Take a breath and check in with yourself.",
  followUpQuestion: "What is one small thing you need right now?",
};

export function parseAiMoodResponse(input: unknown): AiMoodResponse | null {
  const parsed = aiMoodResponseSchema.safeParse(input);
  return parsed.success ? parsed.data : null;
}

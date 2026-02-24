type AnalyzeBody = {
  text?: unknown;
};

export function getValidatedAnalyzeText(body: unknown): string | null {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const { text } = body as AnalyzeBody;
  if (typeof text !== "string" || text.length === 0) {
    return null;
  }

  return text;
}

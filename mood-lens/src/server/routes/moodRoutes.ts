import type { Express, NextFunction, Request, Response } from "express";
import type OpenAI from "openai";
import { createApiError } from "../middleware/errorHandler";
import { analyzeMoodWithOpenAI } from "../services/moodAnalysisService";
import { getValidatedAnalyzeText } from "../validation/analyzeRequestValidation";

export function registerMoodRoutes(app: Express, openai: OpenAI): void {
  app.post("/api/analyze", async (req: Request, res: Response, next: NextFunction) => {
    const text = getValidatedAnalyzeText(req.body as unknown);
    if (text === null) {
      return next(createApiError(400, "Invalid text input"));
    }

    const result = await analyzeMoodWithOpenAI(openai, text);
    if (result.ok) {
      return res.json(result.data);
    }

    if (result.code === "RATE_LIMIT") {
      return next(createApiError(429, "Rate limit exceeded", result.error));
    }

    return next(createApiError(500, "Server error", result.error));
  });
}

import type { ErrorRequestHandler } from "express";

type ApiError = Error & {
  statusCode?: number;
};

export function createApiError(
  statusCode: number,
  message: string,
  cause?: unknown,
): ApiError {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  if (cause !== undefined) {
    (error as Error & { cause?: unknown }).cause = cause;
  }
  return error;
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode = 500;
  const candidateStatusCode = (err as ApiError).statusCode;
  if (typeof candidateStatusCode === "number") {
    statusCode = candidateStatusCode;
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  const message = statusCode === 500
    ? "Server error"
    : (err instanceof Error ? err.message : "Unexpected error");
  res.status(statusCode).json({ error: message });
};

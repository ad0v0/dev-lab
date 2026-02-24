# MoodLens

AI-powered mood reflection interface.

## Features

- Text-based mood analysis
- Dynamic UI based on emotional palette
- Follow-up reflective question

## Architecture

- React + TypeScript
- Strategy-based analyzer
- Demo / Live mode support
- Separation of client/server concerns

## AI

This project explores AI-assisted development:

- Concept & system design refined with ChatGPT
- Code generation accelerated using Codex
- OpenAI API integrated with structured validation
- Manual architectural decisions and refactoring applied throughout

## Modes

### Demo mode (default)

Runs without any external APIs:

```bash
npm run server
npm run dev
```

### Live mode (local only)

1. Create `.env`
2. Add key to `OPENAI_API_KEY=your_key`
3. Add `VITE_MODE=live`
4. Run:

```bash
npm run server
npm run dev
```

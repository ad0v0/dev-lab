import {
  AI_MOOD_FALLBACK_RESPONSE,
  parseAiMoodResponse,
  type AiMoodResponse,
} from '@/types'
import type { MoodAnalyzer } from './demoAnalyzer'

export const liveAnalyzer: MoodAnalyzer = {
  async analyzeMood(text: string): Promise<AiMoodResponse> {
    const trimmed = text.trim()
    if (trimmed.length === 0) {
      throw new Error('Mood text cannot be empty')
    }

    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze mood')
      }

      const data: unknown = await response.json()
      const validated = parseAiMoodResponse(data)
      return validated ?? AI_MOOD_FALLBACK_RESPONSE
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error
      }

      throw new Error('Failed to analyze mood')
    }
  },
}

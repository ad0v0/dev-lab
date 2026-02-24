import type { MoodEntry } from '@/types'

const STORAGE_KEY = 'mood_history'

function asString(value: unknown, fallback: string): string {
  return typeof value === 'string' ? value : fallback
}

function asIntensity(value: unknown): MoodEntry['response']['intensity'] {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 10
    ? (value as MoodEntry['response']['intensity'])
    : 5
}

function asColorPalette(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return ['#dbe7ff', '#e7f7ef', '#fff1dd']
  }

  const colors = value.filter((item): item is string => typeof item === 'string' && item.length > 0)
  return colors.length > 0 ? colors : ['#dbe7ff', '#e7f7ef', '#fff1dd']
}

function parseMoodEntry(input: unknown): MoodEntry | null {
  if (typeof input !== 'object' || input === null) {
    return null
  }

  const candidate = input as {
    id?: unknown
    text?: unknown
    createdAt?: unknown
    response?: unknown
    followUpQuestion?: unknown
  }

  if (typeof candidate.response !== 'object' || candidate.response === null) {
    return null
  }

  const response = candidate.response as {
    emotion?: unknown
    intensity?: unknown
    colorPalette?: unknown
    shortReflection?: unknown
    followUpQuestion?: unknown
  }

  const responseFollowUp = asString(response.followUpQuestion, '')
  const entryFollowUp = asString(candidate.followUpQuestion, responseFollowUp)

  return {
    id: asString(candidate.id, crypto.randomUUID()),
    text: asString(candidate.text, ''),
    createdAt: asString(candidate.createdAt, new Date().toISOString()),
    response: {
      emotion: asString(response.emotion, 'Neutral'),
      intensity: asIntensity(response.intensity),
      colorPalette: asColorPalette(response.colorPalette),
      shortReflection: asString(response.shortReflection, ''),
      followUpQuestion: responseFollowUp,
    },
    followUpQuestion: entryFollowUp,
  }
}

/**
 * Reads mood history from localStorage.
 * Returns an empty array if missing, invalid JSON, or not an array. Never throws.
 */
export function getMoodHistory(): MoodEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) {
      return []
    }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed
      .map((entry) => parseMoodEntry(entry))
      .filter((entry): entry is MoodEntry => entry !== null)
  } catch {
    return []
  }
}

/**
 * Writes mood history to localStorage.
 * Swallows errors and never throws.
 */
export function saveMoodHistory(entries: MoodEntry[]): void {
  try {
    const json = JSON.stringify(entries)
    localStorage.setItem(STORAGE_KEY, json)
  } catch {
    // Never throw; storage may be full or unavailable.
  }
}

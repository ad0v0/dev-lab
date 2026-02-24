import type { AiMoodResponse } from '@/types'

type DemoMoodKey = 'happy' | 'sad' | 'angry' | 'calm' | 'default'

export type MoodAnalyzer = {
  analyzeMood: (text: string) => Promise<AiMoodResponse>
}

function getDemoMoodKey(text: string): DemoMoodKey {
  const normalizedText = text.toLowerCase()

  if (normalizedText.includes('happy') || normalizedText.includes('joy')) {
    return 'happy'
  }

  if (normalizedText.includes('sad') || normalizedText.includes('down')) {
    return 'sad'
  }

  if (normalizedText.includes('angry') || normalizedText.includes('mad')) {
    return 'angry'
  }

  if (normalizedText.includes('calm') || normalizedText.includes('peaceful')) {
    return 'calm'
  }

  return 'default'
}

function createDemoMoodResponse(text: string): AiMoodResponse {
  const key = getDemoMoodKey(text)

  switch (key) {
    case 'happy':
      return {
        emotion: 'Happy',
        intensity: 7,
        colorPalette: ['#ffb347', '#ffd166', '#ffe29a'],
        shortReflection: 'You sound upbeat. Lean into what is working.',
        followUpQuestion: 'What has been contributing most to this positive energy?',
      }
    case 'sad':
      return {
        emotion: 'Sad',
        intensity: 4,
        colorPalette: ['#6fa8dc', '#8e9ccf', '#c9daf8'],
        shortReflection: 'It sounds heavy right now. Take it one step at a time.',
        followUpQuestion: 'What feels hardest in this moment?',
      }
    case 'angry':
      return {
        emotion: 'Angry',
        intensity: 8,
        colorPalette: ['#b22222', '#dc143c', '#ff6b6b'],
        shortReflection: 'There is strong energy here. Pause before reacting.',
        followUpQuestion: 'What boundary feels crossed for you right now?',
      }
    case 'calm':
      return {
        emotion: 'Calm',
        intensity: 3,
        colorPalette: ['#2a9d8f', '#43aa8b', '#4ea8de'],
        shortReflection: 'You seem grounded. Keep this steady pace.',
        followUpQuestion: 'What helps you maintain this sense of balance?',
      }
    case 'default':
      return {
        emotion: 'Neutral',
        intensity: 5,
        colorPalette: ['#d6d6d6', '#e5e5e5', '#f2f2f2'],
        shortReflection: 'A neutral moment is still useful data.',
        followUpQuestion: 'What subtle signal are you noticing in yourself right now?',
      }
  }
}

export const demoAnalyzer: MoodAnalyzer = {
  async analyzeMood(text: string): Promise<AiMoodResponse> {
    const trimmed = text.trim()
    if (trimmed.length === 0) {
      throw new Error('Mood text cannot be empty')
    }

    return createDemoMoodResponse(trimmed)
  },
}

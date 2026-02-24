import type { AiMoodResponse } from '@/types'
import { demoAnalyzer, type MoodAnalyzer } from './analyzers/demoAnalyzer'
import { liveAnalyzer } from './analyzers/liveAnalyzer'

type RuntimeMode = 'demo' | 'live'

function getRuntimeMode(): RuntimeMode {
  return import.meta.env.VITE_MODE === 'live' ? 'live' : 'demo'
}

const analyzersByMode: Record<RuntimeMode, MoodAnalyzer> = {
  demo: demoAnalyzer,
  live: liveAnalyzer,
}

const activeAnalyzer = analyzersByMode[getRuntimeMode()]

export function analyzeMood(text: string): Promise<AiMoodResponse> {
  return activeAnalyzer.analyzeMood(text)
}

import type { AiMoodResponse } from '@/types'
import { demoAnalyzer, type MoodAnalyzer } from './analyzers/demoAnalyzer'
import { liveAnalyzer } from './analyzers/liveAnalyzer'
import { isLiveMode, isLocalhost } from './runtimeMode'

type RuntimeMode = 'demo' | 'live'

function getRuntimeMode(): RuntimeMode {
  const liveRequested = import.meta.env.VITE_MODE === 'live'
  const liveMode = isLiveMode()

  if (liveRequested && !isLocalhost()) {
    console.warn(
      'LIVE mode was requested, but hostname is not localhost. Falling back to DEMO mode.'
    )
  }

  return liveMode ? 'live' : 'demo'
}

const analyzersByMode: Record<RuntimeMode, MoodAnalyzer> = {
  demo: demoAnalyzer,
  live: liveAnalyzer,
}

const activeAnalyzer = analyzersByMode[getRuntimeMode()]

export function analyzeMood(text: string): Promise<AiMoodResponse> {
  return activeAnalyzer.analyzeMood(text)
}

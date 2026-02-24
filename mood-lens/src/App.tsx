import type { CSSProperties, JSX } from 'react'
import { useCallback, useMemo, useState } from 'react'
import { HistoryList, MoodInput } from '@/features/mood/components'
import { useMoodHistory } from '@/features/mood/hooks'
import type { AiMoodResponse, MoodEntry } from '@/types'
import './App.css'

type AppCssVars = CSSProperties & {
  '--bg-start'?: string
  '--bg-mid'?: string
  '--history-accent'?: string
  '--intensity'?: string
  '--intensity-scale'?: string
  '--intensity-duration'?: string
}

function App(): JSX.Element {
  const [aiResponse, setAiResponse] = useState<AiMoodResponse | null>(null)
  const { entries, addEntry } = useMoodHistory()

  const handleAnalyzed = useCallback(
    (result: AiMoodResponse | null, submittedText?: string): void => {
      setAiResponse(result)
      if (result !== null && submittedText !== undefined) {
        const entry: MoodEntry = {
          id: crypto.randomUUID(),
          text: submittedText,
          createdAt: new Date().toISOString(),
          response: result,
          followUpQuestion: result.followUpQuestion,
        }
        addEntry(entry)
      }
    },
    [addEntry],
  )

  const appStyles = useMemo<AppCssVars>(() => {
    const fallbackPalette: readonly [string, string, string] = [
      '#f6f8ff',
      '#e9f4ff',
      '#fef3f2',
    ]

    const palette = aiResponse?.colorPalette ?? fallbackPalette
    const bgStart = palette[0] ?? fallbackPalette[0]
    const bgMid = palette[1] ?? bgStart

    const intensity = aiResponse?.intensity ?? 1
    const clampedIntensity = Math.max(1, Math.min(10, intensity))
    const intensityScale = 1 + clampedIntensity * 0.006
    const intensityDuration = Math.max(6, 12 - clampedIntensity * 0.5)

    return {
      '--bg-start': bgStart,
      '--bg-mid': bgMid,
      '--history-accent': bgStart,
      '--intensity': String(clampedIntensity),
      '--intensity-scale': intensityScale.toFixed(3),
      '--intensity-duration': `${intensityDuration.toFixed(2)}s`,
    }
  }, [aiResponse])

  const analysisKey =
    aiResponse === null
      ? 'empty'
      : `${aiResponse.emotion}-${aiResponse.intensity}-${aiResponse.shortReflection}-${aiResponse.followUpQuestion}`

  return (
    <main className="app" style={appStyles}>
      <div className="app__container">
        <header className="app__header">
          <h1 className="app__title">MoodLens</h1>
          <p className="app__subtitle">Track your emotional tone with calm, reflective insights.</p>
        </header>

        <section className="card" aria-labelledby="mood-input-heading">
          <h2 id="mood-input-heading">Log your mood</h2>
          <MoodInput onAnalyzed={handleAnalyzed} />
        </section>

        {aiResponse !== null && (
          <section
            key={analysisKey}
            className="card card--analysis card--glass"
            aria-live="polite"
            aria-label="AI mood analysis"
          >
            <h2 id="analysis-heading">Analysis</h2>
            <p id="analysis-emotion" className="analysis__emotion">
              {aiResponse.emotion}
            </p>
            <p id="analysis-reflection" className="analysis__reflection">
              {aiResponse.shortReflection}
            </p>
            <p id="analysis-follow-up" className="analysis__follow-up">
              <span className="analysis__follow-up-label">Reflective question:</span>{' '}
              <em>{aiResponse.followUpQuestion}</em>
            </p>
          </section>
        )}

        <section className="card card--glass" aria-labelledby="history-heading">
          <h2 id="history-heading">History</h2>
          <HistoryList entries={entries} />
        </section>
      </div>
    </main>
  )
}

export default App

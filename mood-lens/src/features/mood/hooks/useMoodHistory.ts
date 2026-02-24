import { useCallback, useEffect, useState } from 'react'
import { getMoodHistory, saveMoodHistory } from '@/features/mood/services'
import type { MoodEntry } from '@/types'

const MAX_ENTRIES = 10

export function useMoodHistory(): {
  entries: MoodEntry[]
  addEntry: (entry: MoodEntry) => void
} {
  const [entries, setEntries] = useState<MoodEntry[]>(() => getMoodHistory())

  useEffect(() => {
    saveMoodHistory(entries)
  }, [entries])

  const addEntry = useCallback((entry: MoodEntry) => {
    setEntries((prev) => [entry, ...prev].slice(0, MAX_ENTRIES))
  }, [])

  return { entries, addEntry }
}

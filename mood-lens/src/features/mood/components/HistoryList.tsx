import { memo, type CSSProperties, type JSX } from 'react'
import type { MoodEntry } from '@/types'

type HistoryListProps = {
  entries: MoodEntry[]
}

type HistoryItemStyle = CSSProperties & {
  '--entry-accent'?: string
  '--entry-accent-text'?: string
}

type RgbColor = {
  r: number
  g: number
  b: number
}

function parseHexColor(hexColor: string): RgbColor | null {
  const normalized = hexColor.trim()
  const shortHexMatch = /^#([0-9a-f]{3})$/i.exec(normalized)
  if (shortHexMatch !== null) {
    const [r, g, b] = shortHexMatch[1].split('').map((ch) => Number.parseInt(ch + ch, 16))
    return { r, g, b }
  }

  const longHexMatch = /^#([0-9a-f]{6})$/i.exec(normalized)
  if (longHexMatch === null) {
    return null
  }

  const r = Number.parseInt(longHexMatch[1].slice(0, 2), 16)
  const g = Number.parseInt(longHexMatch[1].slice(2, 4), 16)
  const b = Number.parseInt(longHexMatch[1].slice(4, 6), 16)
  return { r, g, b }
}

function getLuminance({ r, g, b }: RgbColor): number {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function isHexColorTooLight(hexColor: string): boolean {
  const rgb = parseHexColor(hexColor)
  if (rgb === null) {
    return true
  }

  return getLuminance(rgb) > 195
}

function darkenHexColor(hexColor: string, ratio: number): string | null {
  const rgb = parseHexColor(hexColor)
  if (rgb === null) {
    return null
  }

  const safeRatio = Math.max(0, Math.min(1, ratio))
  const scale = 1 - safeRatio
  const r = Math.round(rgb.r * scale)
  const g = Math.round(rgb.g * scale)
  const b = Math.round(rgb.b * scale)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function getEntryAccentColor(primaryColor: string): string {
  if (!isHexColorTooLight(primaryColor)) {
    return primaryColor
  }

  const darkened = darkenHexColor(primaryColor, 0.3)
  return darkened ?? '#7a8496'
}

function getBadgeTextColor(hexColor: string): string {
  const rgb = parseHexColor(hexColor)
  if (rgb === null) {
    return '#ffffff'
  }

  const luminance = getLuminance(rgb)
  return luminance > 150 ? '#162033' : '#ffffff'
}

function HistoryListComponent({ entries }: HistoryListProps): JSX.Element {
  return (
    <ul className="history-list">
      {entries.map((entry) => {
        const primaryColor = entry.response.colorPalette[0] ?? '#d6dbe6'
        const accentColor = getEntryAccentColor(primaryColor)
        const itemStyle: HistoryItemStyle = {
          '--entry-accent': accentColor,
          '--entry-accent-text': getBadgeTextColor(accentColor),
        }

        return (
          <li key={entry.id} className="history-list__item" style={itemStyle}>
            <p className="history-list__text">{entry.text}</p>
            <p className="history-list__reflection">{entry.response.shortReflection}</p>
            {entry.followUpQuestion.trim().length > 0 && (
              <p className="history-list__follow-up">{entry.followUpQuestion}</p>
            )}
            <p className="history-list__meta">
              <span className="history-list__badge" aria-label={`Emotion ${entry.response.emotion}`}>
                {entry.response.emotion}
              </span>
              <span>intensity {entry.response.intensity}</span>
            </p>
            <p className="history-list__date">
              <time dateTime={entry.createdAt}>{new Date(entry.createdAt).toLocaleString()}</time>
            </p>
          </li>
        )
      })}
    </ul>
  )
}

export const HistoryList = memo(HistoryListComponent)

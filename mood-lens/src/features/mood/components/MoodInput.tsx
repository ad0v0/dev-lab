import {
  type ChangeEvent,
  type FormEvent,
  type JSX,
  useId,
  useState,
} from 'react'
import { analyzeMood } from '@/features/mood/services'
import type { AiMoodResponse } from '@/types'

type MoodInputProps = {
  /**
   * Accessible label shown above the textarea.
   * Defaults to "How are you feeling?".
   */
  label?: string
  /**
   * Placeholder text inside the textarea.
   */
  placeholder?: string
  /**
   * Maximum length for the mood text.
   */
  maxLength?: number
  /**
   * Called with the analysis result (or null on error / empty) and the submitted text when result is non-null.
   */
  onAnalyzed: (result: AiMoodResponse | null, submittedText?: string) => void
}

export function MoodInput({
  label = 'How are you feeling?',
  placeholder = 'Write a few words about your current mood…',
  maxLength = 500,
  onAnalyzed,
}: MoodInputProps): JSX.Element {
  const [value, setValue] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaId = useId()
  const helperTextId = `${textareaId}-helper`

  const trimmedValue = value.trim()
  const isSubmitDisabled = isSubmitting || trimmedValue.length === 0

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    if (isSubmitDisabled) {
      return
    }

    setIsSubmitting(true)
    analyzeMood(trimmedValue)
      .then((result) => {
        onAnalyzed(result, trimmedValue)
        setValue('')
      })
      .catch(() => {
        onAnalyzed(null)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <form
      aria-labelledby={textareaId}
      aria-describedby={helperTextId}
      onSubmit={handleSubmit}
    >
      <div>
        <label id={textareaId} htmlFor={textareaId}>
          {label}
        </label>
        <textarea
          id={textareaId}
          rows={4}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeholder}
          aria-required="true"
          aria-describedby={helperTextId}
          aria-busy={isSubmitting}
          disabled={isSubmitting}
        />
        <p id={helperTextId}>
          {maxLength - value.length} characters remaining
        </p>
      </div>
      <button
        type="submit"
        disabled={isSubmitDisabled}
        aria-disabled={isSubmitDisabled}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Submit mood'}
      </button>
      <p role="status" aria-live="polite">
        {isSubmitting ? 'Submitting your mood entry' : ''}
      </p>
    </form>
  )
}

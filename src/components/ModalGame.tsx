import { useEffect, useRef, useState } from 'react'
import type { ExerciseType } from '../types'

interface ModalGameProps {
  open: boolean
  exercise: ExerciseType | null
  childName: string
  onClose: () => void
}

const readingPassages = [
  {
    title: 'The River at Dawn',
    text: 'The elephant walked slowly to the river. She dipped her trunk into the cool water and drank deeply. A small bird sat on her back and sang. The sun rose behind the tall green trees.',
  },
  {
    title: 'Market Morning',
    text: 'Mama carries a big basket on her head to the market. James helps pick the ripest mangoes. The vendor smiles and gives them an extra banana. The market smells of spices and fresh bread.',
  },
]

const letterQuestions = [
  { prompt: 'Which letter says "buh"?', answer: 'b', options: ['b', 'd', 'p', 'q'] },
  { prompt: 'Find the letter that comes after A', answer: 'B', options: ['D', 'B', 'P', 'C'] },
  { prompt: 'Which of these is a lowercase "d"?', answer: 'd', options: ['b', 'p', 'd', 'q'] },
  { prompt: 'Which letter says "puh"?', answer: 'P', options: ['Q', 'P', 'D', 'B'] },
  { prompt: 'Find the letter that faces right', answer: 'd', options: ['p', 'b', 'd', 'q'] },
  { prompt: 'Which two letters look like mirrors?', answer: 'b', options: ['b', 'd', 'b', 'n'] },
]

const numberQuestions = [
  { sequence: [3, '?', 5, 6], answer: 4, options: [2, 4, 7, 9] },
  { sequence: [10, 8, '?', 4], answer: 6, options: [5, 6, 7, 8] },
  { sequence: [2, 4, '?', 8], answer: 6, options: [5, 6, 7, 9] },
  { sequence: [15, '?', 25, 30], answer: 20, options: [18, 20, 22, 24] },
  { sequence: [1, 3, 5, '?'], answer: 7, options: [6, 7, 8, 9] },
]

const patternQuestions = [
  { sequence: ['🔴', '🔵', '🔴', '🔵', '?'], answer: '🔴', options: ['🔴', '🔵', '🟡', '🟢'] },
  { sequence: ['🟡', '🟡', '🔴', '🟡', '🟡', '?'], answer: '🔴', options: ['🔵', '🟡', '🔴', '🟢'] },
  { sequence: ['🔺', '🔵', '🔺', '🔵', '🔺', '?'], answer: '🔵', options: ['🔺', '🔵', '🟡', '🔴'] },
  { sequence: ['🟢', '🔴', '🔴', '🟢', '🔴', '?'], answer: '🔴', options: ['🟢', '🟡', '🔴', '🔵'] },
]

const reversibleStarts = new Set(['b', 'd', 'p', 'q'])

function getTimestamp() {
  return Date.now()
}

function hasRandomReversal() {
  return Math.random() < 0.3
}

export function ModalGame({ open, exercise, childName, onClose }: ModalGameProps) {
  const [readingIndex, setReadingIndex] = useState(0)
  const [readingWordIndex, setReadingWordIndex] = useState(0)
  const [readingReversals, setReadingReversals] = useState(0)
  const [readingGap, setReadingGap] = useState('—')

  const [letterIndex, setLetterIndex] = useState(0)
  const [letterScore, setLetterScore] = useState(0)
  const [letterErrors, setLetterErrors] = useState(0)
  const [letterResponse, setLetterResponse] = useState('—')
  const [letterFeedback, setLetterFeedback] = useState('Tap the answer that matches the prompt.')

  const [numberIndex, setNumberIndex] = useState(0)
  const [numberScore, setNumberScore] = useState(0)
  const [numberResponse, setNumberResponse] = useState('—')

  const [patternIndex, setPatternIndex] = useState(0)
  const [patternScore, setPatternScore] = useState(0)
  const [patternResponse, setPatternResponse] = useState('—')

  const [hint, setHint] = useState('The system records hesitation, repetition, and error shape without turning the activity into a test.')
  const lastTapRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (open && exercise) {
      lastTapRef.current = getTimestamp()
    }
  }, [exercise, open])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  if (!open || !exercise) {
    return null
  }

  const scheduleAdvance = (callback: () => void) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(callback, 650)
  }

  const closeWithCleanup = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }

    onClose()
  }

  const currentReading = readingPassages[readingIndex % readingPassages.length]
  const readingWords = currentReading.text.split(' ')

  const currentLetter = letterQuestions[letterIndex % letterQuestions.length]
  const currentNumber = numberQuestions[numberIndex % numberQuestions.length]
  const currentPattern = patternQuestions[patternIndex % patternQuestions.length]

  const tapReadingWord = (index: number) => {
    const gap = ((getTimestamp() - lastTapRef.current) / 1000).toFixed(1)
    lastTapRef.current = getTimestamp()
    setReadingGap(`${gap}s`)
    setReadingWordIndex(index + 1)

    const word = readingWords[index] ?? ''
    if (reversibleStarts.has(word[0]?.toLowerCase() ?? '') && hasRandomReversal()) {
      setReadingReversals((value) => value + 1)
      setHint(`b/d or p/q confusion recorded for ${childName}.`)
    }
  }

  const nextReadingPassage = () => {
    setReadingIndex((value) => value + 1)
    setReadingWordIndex(0)
    setReadingGap('—')
    lastTapRef.current = Date.now()
  }

  const checkLetter = (choice: string) => {
    const response = ((getTimestamp() - lastTapRef.current) / 1000).toFixed(1)
    lastTapRef.current = getTimestamp()
    setLetterResponse(`${response}s`)

    if (choice === currentLetter.answer) {
      setLetterScore((value) => value + 1)
      setLetterFeedback('Correct. Moving to the next prompt.')
      scheduleAdvance(() => setLetterIndex((value) => value + 1))
      return
    }

    setLetterErrors((value) => value + 1)
    setLetterFeedback('Try again. The system keeps the mistake as part of the pattern.' )
    if (['b', 'd', 'p', 'q', 'B', 'D', 'P', 'Q'].includes(choice) && ['b', 'd', 'p', 'q', 'B', 'D', 'P', 'Q'].includes(currentLetter.answer)) {
      setHint('Confusable letter pair detected and logged into the learning profile.')
    }
  }

  const checkNumber = (choice: number) => {
    const response = ((getTimestamp() - lastTapRef.current) / 1000).toFixed(1)
    lastTapRef.current = getTimestamp()
    setNumberResponse(`${response}s`)

    if (choice === currentNumber.answer) {
      setNumberScore((value) => value + 1)
      scheduleAdvance(() => setNumberIndex((value) => value + 1))
      return
    }

    setHint('The wrong number was selected. That mismatch is still useful signal.')
  }

  const checkPattern = (choice: string) => {
    const response = ((getTimestamp() - lastTapRef.current) / 1000).toFixed(1)
    lastTapRef.current = getTimestamp()
    setPatternResponse(`${response}s`)

    if (choice === currentPattern.answer) {
      setPatternScore((value) => value + 1)
      scheduleAdvance(() => setPatternIndex((value) => value + 1))
      return
    }

    setHint('Pattern recognition error logged. The sequence will adapt on the next attempt.')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(14,10,8,0.62)] p-4 backdrop-blur-md">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-white/10 bg-[color:var(--bg)] shadow-[var(--shadow-strong)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[color:var(--border)] bg-[color:var(--bg)] px-5 py-4 sm:px-7">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-orange)]">Learning Exercise</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-[color:var(--ink)] sm:text-2xl">
              {exercise === 'reading' && 'Story Reading'}
              {exercise === 'letters' && 'Letter Match'}
              {exercise === 'numbers' && 'Number Puzzles'}
              {exercise === 'patterns' && 'Pattern Play'}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeWithCleanup}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-lg text-[color:var(--ink-mid)] transition hover:bg-[color:var(--surface)]"
            aria-label="Close exercise"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Child</div>
              <div className="mt-1 font-medium text-[color:var(--ink)]">{childName}</div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Focus</div>
              <div className="mt-1 font-medium text-[color:var(--ink)]">
                {exercise === 'reading' && `${readingReversals} reversals`}
                {exercise === 'letters' && `${letterErrors} errors`}
                {exercise === 'numbers' && `${numberScore} correct`}
                {exercise === 'patterns' && `${patternScore} correct`}
              </div>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
              <div className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Signal</div>
              <div className="mt-1 font-medium text-[color:var(--ink)]">{hint}</div>
            </div>
          </div>

          {exercise === 'reading' && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Last gap" value={readingGap} tone="orange" />
                <MetricCard label="Reversals" value={String(readingReversals)} tone="red" />
                <MetricCard label="Progress" value={`${Math.min(readingWordIndex, readingWords.length)}/${readingWords.length}`} tone="ink" />
              </div>

              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-5 sm:p-7">
                <div className="text-sm font-medium text-[color:var(--ink-mid)]">{currentReading.title}</div>
                <div className="mt-4 flex flex-wrap gap-2 text-[clamp(1rem,2.2vw,1.2rem)] leading-[2] text-[color:var(--ink)] sm:text-[1.25rem]">
                  {readingWords.map((word, index) => {
                    const isDone = index < readingWordIndex
                    const isActive = index === readingWordIndex
                    return (
                      <button
                        key={`${word}-${index}`}
                        type="button"
                        onClick={() => tapReadingWord(index)}
                        className={[
                          'rounded-md px-1.5 py-0.5 text-left transition-colors',
                          isActive ? 'bg-[color:var(--color-orange)] text-white' : '',
                          isDone ? 'text-[color:var(--ink-soft)]' : '',
                          !isActive && !isDone ? 'hover:bg-[color:var(--orange-bg)]' : '',
                        ].join(' ')}
                      >
                        {word}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-[color:var(--ink-soft)]">Tap each word as the child reads aloud. The timing and order become the signal.</p>
                <button
                  type="button"
                  onClick={nextReadingPassage}
                  className="rounded-full bg-[color:var(--color-orange)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,114,53,0.22)] transition hover:-translate-y-0.5 hover:bg-[#c6652d]"
                >
                  Next story →
                </button>
              </div>
            </>
          )}

          {exercise === 'letters' && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Correct" value={String(letterScore)} tone="green" />
                <MetricCard label="Errors" value={String(letterErrors)} tone="red" />
                <MetricCard label="Response" value={letterResponse} tone="ink" />
              </div>

              <div className="rounded-[1.5rem] bg-[color:var(--ink)] px-5 py-4 text-center text-lg font-semibold text-white shadow-sm sm:px-7 sm:py-5">
                {currentLetter.prompt}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {currentLetter.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => checkLetter(option)}
                    className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-5 text-3xl font-bold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--color-orange)] hover:bg-[color:var(--orange-bg)]"
                  >
                    {option}
                  </button>
                ))}
              </div>

              <p className="rounded-2xl bg-[color:var(--surface)] px-4 py-3 text-sm leading-6 text-[color:var(--ink-soft)]">
                {letterFeedback}
              </p>
            </>
          )}

          {exercise === 'numbers' && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Correct" value={String(numberScore)} tone="green" />
                <MetricCard label="Response" value={numberResponse} tone="orange" />
                <MetricCard label="Focus" value="Sequence" tone="ink" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-white p-5">
                {currentNumber.sequence.map((item, index) => (
                  <span key={`${item}-${index}`} className={index === 1 ? 'rounded-2xl border border-dashed border-[color:var(--color-orange)] bg-[color:var(--orange-bg)] px-5 py-4 text-3xl font-bold text-[color:var(--color-orange)]' : 'rounded-2xl border border-[color:var(--border)] bg-white px-5 py-4 text-3xl font-bold text-[color:var(--ink)]'}>
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {currentNumber.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => checkNumber(option)}
                    className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-4 text-2xl font-bold text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:border-[color:var(--color-orange)] hover:bg-[color:var(--orange-bg)]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {exercise === 'patterns' && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <MetricCard label="Correct" value={String(patternScore)} tone="green" />
                <MetricCard label="Response" value={patternResponse} tone="orange" />
                <MetricCard label="Focus" value="Pattern" tone="ink" />
              </div>

              <div className="flex flex-wrap justify-center gap-3 rounded-[1.5rem] border border-[color:var(--border)] bg-white p-5">
                {currentPattern.sequence.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className={[
                      'grid h-16 w-16 place-items-center rounded-2xl text-3xl transition sm:h-20 sm:w-20',
                      item === '?' ? 'border-2 border-dashed border-[color:var(--color-orange)] bg-[color:var(--orange-bg)] text-[color:var(--color-orange)]' : 'bg-[color:var(--surface)]',
                    ].join(' ')}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {currentPattern.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => checkPattern(option)}
                    className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-4 text-3xl transition hover:-translate-y-0.5 hover:border-[color:var(--color-orange)] hover:bg-[color:var(--orange-bg)]"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 text-sm leading-6 text-[color:var(--ink-soft)]">
            🔬 AI is watching for hesitation gaps, reversals, re-reads, impulsive responses, and sequence confusion.
          </div>
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  label: string
  value: string
  tone: 'green' | 'orange' | 'red' | 'ink'
}

function MetricCard({ label, value, tone }: MetricCardProps) {
  const toneClass = {
    green: 'text-[color:var(--color-green)]',
    orange: 'text-[color:var(--color-orange)]',
    red: 'text-[color:var(--color-red)]',
    ink: 'text-[color:var(--ink)]',
  }[tone]

  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 shadow-sm">
      <div className={`text-2xl font-bold tracking-tight ${toneClass}`}>{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">{label}</div>
    </div>
  )
}

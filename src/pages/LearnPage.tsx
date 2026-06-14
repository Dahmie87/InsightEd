import { useState } from 'react'
import { ModalGame } from '../components/ModalGame'
import { useAppContext } from '../appContext'
import { activities } from '../data'
import type { ExerciseType } from '../types'

export function LearnPage() {
  const { selectedChild } = useAppContext()
  const [activeExercise, setActiveExercise] = useState<ExerciseType | null>(null)
  const [modalVersion, setModalVersion] = useState(0)

  const signalWave = Array.from({ length: 32 }, (_, index) => {
    const base = [12, 18, 26, 20, 14, 30, 22, 15][index % 8]
    return Math.max(10, base + (index % 3) * 4)
  })

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-[color:var(--ink)] px-6 py-10 text-white shadow-[var(--shadow)] sm:px-8 lg:px-10">
        <div className="absolute right-[-4rem] top-[-4rem] h-80 w-80 rounded-full bg-[rgba(217,114,53,0.16)] blur-3xl" />
        <div className="relative space-y-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-orange-lt)]">Learning mode</div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Hello, {selectedChild.name}.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Choose an activity. Take your time. The exercises feel like games, while the system quietly records hesitation, reversal patterns, and response style.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:max-w-2xl">
            <Stat label="Sessions" value={String(selectedChild.sessions)} />
            <Stat label="Stars" value={`⭐ ${selectedChild.stars}`} />
            <Stat label="Streak" value={`🔥 ${selectedChild.streak}`} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4 rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Live signal strip</div>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">Real-time learning signals</h2>
            </div>
            <div className="rounded-full bg-[color:var(--orange-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
              Passive tracking
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-4">
            <MiniMetric label="Avg hesitation" value={selectedChild.hesitation} tone="orange" />
            <MiniMetric label="Reversals" value={String(selectedChild.reversals)} tone="red" />
            <MiniMetric label="Re-reads" value={String(selectedChild.rereads)} tone="ink" />
            <MiniMetric label="Confidence" value={`${selectedChild.confidence}%`} tone="green" />
          </div>

          <div className="rounded-[1.35rem] border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <div className="flex min-h-16 items-end gap-1 overflow-hidden">
              {signalWave.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(240,168,114,0.95)_0%,rgba(217,114,53,0.9)_100%)]"
                  style={{ height: `${height}px`, opacity: 0.4 + (index % 5) * 0.12 }}
                />
              ))}
            </div>
          </div>

          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">
            The child is not being tested. They are interacting. The system learns from ordinary behavior, which is why the signal quality is high.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)] p-6 text-white shadow-[var(--shadow)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Unlock path</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">What becomes available as progress grows</h2>
          <div className="mt-5 space-y-4">
            {[
              { title: 'Sound Blends', text: 'Unlock at 50 stars for more phonics practice.', threshold: 50 },
              { title: 'Word Safari', text: 'Unlock at 60 stars for context-rich reading.', threshold: 60 },
              { title: 'Adaptive Review', text: 'Unlock when the app detects stable progress.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-white/5 px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="font-medium text-white">{item.title}</div>
                  <div className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                    {item.threshold ? `${item.threshold} stars` : 'Adaptive'}
                  </div>
                </div>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Activities</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">Choose an exercise</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => (
            <button
              key={activity.title}
              type="button"
              disabled={activity.locked}
              onClick={() => {
                if (activity.locked) {
                  return
                }

                setModalVersion((value) => value + 1)
                setActiveExercise(activity.type)
              }}
              className={[
                'group rounded-[1.5rem] border p-5 text-left shadow-[var(--shadow)] transition',
                activity.locked
                  ? 'cursor-not-allowed border-[color:var(--border)] bg-white/70 opacity-60'
                  : 'border-[color:var(--border)] bg-white hover:-translate-y-1 hover:border-[color:var(--color-orange)] hover:shadow-[0_0_0_3px_rgba(217,114,53,0.10),var(--shadow)]',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[color:var(--orange-bg)] text-2xl">
                  {activity.icon}
                </div>
                {activity.locked ? (
                  <span className="rounded-full bg-[rgba(201,132,26,0.1)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-amber)]">
                    Locked
                  </span>
                ) : (
                  <span className="rounded-full bg-[color:var(--orange-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-orange)]">
                    {activity.active ? 'Active' : 'Open'}
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-2">
                <h3 className="font-display text-xl font-semibold tracking-tight text-[color:var(--ink)]">{activity.title}</h3>
                <p className="text-sm leading-6 text-[color:var(--ink-soft)]">{activity.description}</p>
              </div>

              <div className="mt-5 space-y-2">
                <div className="h-2 rounded-full bg-[color:var(--surface)]">
                  <div className="h-2 rounded-full bg-[color:var(--color-orange)] transition-all duration-500" style={{ width: `${activity.progress}%` }} />
                </div>
                <div className="text-xs uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">
                  {activity.locked ? activity.unlockText : `${activity.progress}% complete`}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Current learning signal</div>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">
              The app is looking for hesitation, reversal, and pattern load
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--ink-soft)]">
              Timing, repetition, and mistake shape are more informative than a one-off score. That is why the app can adapt silently and still give teachers something actionable.
            </p>
          </div>
          <div className="rounded-[1.35rem] bg-[color:var(--surface)] p-4 text-sm leading-7 text-[color:var(--ink-mid)]">
            <div className="font-semibold text-[color:var(--ink)]">What the system learns</div>
            <p className="mt-2">{selectedChild.summary}</p>
          </div>
        </div>
      </section>

      <ModalGame
        key={`${activeExercise ?? 'closed'}-${modalVersion}`}
        open={activeExercise !== null}
        exercise={activeExercise}
        childName={selectedChild.name}
        onClose={() => setActiveExercise(null)}
      />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
    </div>
  )
}

function MiniMetric({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'green' | 'orange' | 'red' | 'ink'
}) {
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

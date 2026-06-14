import { conditionCards, scienceSteps } from '../data'

export function SciencePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 rounded-[2rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)] sm:p-8 lg:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ink-soft)]">Science behind the app</div>
        <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-5xl">
          Learning differences leave a <span className="italic text-[color:var(--color-orange)]">digital fingerprint.</span>
        </h1>
        <p className="max-w-2xl text-base leading-7 text-[color:var(--ink-mid)] sm:text-lg">
          InsightED reads that fingerprint through ordinary learning behavior, not through clinical tests. The result is a screen that feels like play for the child and actionable guidance for the teacher.
        </p>
      </section>

      <section className="space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">How it works</div>
        <div className="grid gap-4 lg:grid-cols-5">
          {scienceSteps.map((step, index) => (
            <div key={step.title} className="rounded-[1.35rem] border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow)]">
              <div className="font-display text-4xl font-semibold tracking-tight text-[color:var(--surface2)]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h2 className="mt-3 text-base font-semibold text-[color:var(--ink)]">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">
          The three conditions screened
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {conditionCards.map((condition) => (
            <article key={condition.name} className="overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-white shadow-[var(--shadow)]">
              <div className="border-b border-[color:var(--border)] p-6">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-2xl" style={{ backgroundColor: condition.tint }}>
                  {condition.icon}
                </div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">{condition.name}</h2>
                <p className="mt-3 text-sm leading-6 text-[color:var(--ink-soft)]">{condition.description}</p>
              </div>
              <div className="space-y-3 p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Signals tracked</div>
                {condition.signals.map((signal) => (
                  <div key={signal} className="flex gap-3 border-b border-[color:var(--border)] pb-3 text-sm leading-6 text-[color:var(--ink-mid)] last:border-b-0 last:pb-0">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-orange)]" />
                    <span>{signal}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)] p-6 text-white shadow-[var(--shadow)] sm:p-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Ethics & safeguards</div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: 'Screening, not diagnosis',
              text: 'The app flags children for review. It does not replace a clinical assessment.',
            },
            {
              title: 'Confidence threshold',
              text: 'Below the threshold, the system observes quietly and avoids premature labeling.',
            },
            {
              title: 'Local-first data flow',
              text: 'The model can run on-device so sensitive learner behavior stays close to the school.',
            },
            {
              title: 'African classroom context',
              text: 'Language patterns and pacing are calibrated around local learning realities.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white/5 p-4">
              <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/60">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import { improvements, principles } from '../data'
import { useAppContext } from '../appContext'

export function ReportsPage() {
  const { selectedChild } = useAppContext()

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.95)_0%,rgba(243,237,229,0.9)_100%)] p-6 shadow-[var(--shadow)] sm:p-8 lg:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--ink-soft)]">Problem and roadmap</div>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-5xl">
          The problem it solves is not just detection. It is <span className="italic text-[color:var(--color-orange)]">timely understanding.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--ink-mid)] sm:text-lg">
          The goal is to surface hidden learning differences early enough that teachers can change support before shame, delay, or mislabeling becomes permanent.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Why it works</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">The working principles</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {principles.map((principle) => (
              <div key={principle.title} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <h3 className="font-semibold text-[color:var(--ink)]">{principle.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)] p-6 text-white shadow-[var(--shadow)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Current learner snapshot</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">{selectedChild.name}</h2>
          <p className="mt-3 text-sm leading-7 text-white/70">{selectedChild.summary}</p>
          <div className="mt-5 space-y-3">
            {selectedChild.recommendations.map((item) => (
              <div key={item} className="rounded-2xl bg-white/5 px-4 py-3 text-sm leading-6 text-white/70">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">What still needs improvement</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">Next engineering priorities</h2>
          <div className="mt-5 space-y-3">
            {improvements.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--color-orange)] text-sm font-bold text-white">{index + 1}</div>
                <p className="text-sm leading-6 text-[color:var(--ink-mid)]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Intervention loop</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">From signal to support</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Observe', text: 'Collect natural learning behavior without test pressure.' },
              { title: 'Interpret', text: 'Convert timing and error shape into understandable patterns.' },
              { title: 'Adapt', text: 'Shift exercise type, pacing, and scaffolding silently.' },
              { title: 'Support', text: 'Give the teacher a plain-language next step.' },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <h3 className="font-semibold text-[color:var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

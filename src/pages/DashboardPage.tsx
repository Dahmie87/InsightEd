import { Gauge } from '../components/Gauge'
import { useAppContext } from '../appContext'
import { childOrder } from '../data'
import type { ChildId } from '../types'

export function DashboardPage() {
  const { children, selectedChild, selectedChildId, setSelectedChildId, navigate } = useAppContext()
  const child = selectedChild

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(253,243,235,0.96)_52%,rgba(243,237,229,0.96)_100%)] p-6 shadow-[var(--shadow)] sm:p-8 lg:p-10">
        <div className="absolute right-[-3rem] top-[-4rem] h-64 w-64 rounded-full bg-[rgba(217,114,53,0.14)] blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(217,114,53,0.2)] bg-[color:var(--orange-bg)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--color-orange)]">
              AI-powered early detection · Africa
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-5xl lg:text-6xl">
                Every child deserves to be <span className="italic text-[color:var(--color-orange)]">understood</span>, not labelled.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-[color:var(--ink-mid)] sm:text-lg">
                MindBridge watches how a child learns, then surfaces the patterns that reveal whether they need a different kind of teaching. The child experiences games. The teacher gets guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('learn')}
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-orange)] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(217,114,53,0.22)] transition hover:-translate-y-0.5 hover:bg-[#c6652d]"
              >
                Open Learning Mode →
              </button>
              <button
                type="button"
                onClick={() => navigate('science')}
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--ink-mid)] transition hover:border-[color:var(--color-orange)] hover:bg-[color:var(--orange-bg)] hover:text-[color:var(--ink)]"
              >
                How detection works
              </button>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-white/90 p-5 shadow-sm backdrop-blur">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">Select a child</div>
            <div className="mt-4 grid gap-3">
              {childOrder.map((id) => {
                const profile = children[id]
                const selected = selectedChildId === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedChildId(id as ChildId)}
                    className={[
                      'flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition',
                      selected
                        ? 'border-[color:var(--color-orange)] bg-[color:var(--orange-bg)] shadow-sm'
                        : 'border-[color:var(--border)] bg-white hover:border-[color:var(--color-orange)] hover:bg-[color:var(--surface)]',
                    ].join(' ')}
                  >
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: avatarBackground(profile.id), color: avatarColor(profile.id) }}
                    >
                      {profile.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-[color:var(--ink)]">{profile.name}</div>
                      <div className="text-xs text-[color:var(--ink-soft)]">
                        {profile.condition} · {profile.confidence}% confidence
                      </div>
                    </div>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: profile.arcColor }}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Gauge
          value={child.confidence}
          color={child.arcColor}
          title={`${child.condition} detection`}
          subtitle={`${child.sessions} sessions · ${child.sessions * 24} signals analysed`}
          description={child.summary}
        />

        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">Detected signals</h2>
              <p className="mt-2 text-sm text-[color:var(--ink-soft)]">Measured across {child.sessions} learning sessions.</p>
            </div>
            <div className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">
              {child.riskLevel} risk
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {child.signals.map((signal) => (
              <div key={signal.name} className="space-y-2">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-[color:var(--ink-mid)]">{signal.name}</span>
                  <span className="font-semibold" style={{ color: signal.color }}>
                    {signal.display}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[color:var(--surface)]">
                  <div
                    className="h-2 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${signal.value}%`, backgroundColor: signal.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Teacher review</div>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">
                {child.alertHeadline}
              </h2>
            </div>
            <div
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{
                backgroundColor: alertTint(child.riskLevel),
                color: child.arcColor,
              }}
            >
              {child.riskLevel === 'high' ? 'Flagged' : child.riskLevel === 'medium' ? 'Monitoring' : 'Typical'}
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--ink-mid)]">{child.alertDetail}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {child.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-mid)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)] p-6 text-white shadow-[var(--shadow)]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Recommended support</div>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">What the teacher should do next</h2>
          <div className="mt-5 space-y-4">
            {child.recommendations.map((recommendation, index) => (
              <div key={recommendation} className="flex gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-orange)] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-white/75">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MiniStat title="Sessions" value={String(child.sessions)} note="Collected without turning the app into a test." />
        <MiniStat title="Stars earned" value={String(child.stars)} note="Used to unlock new practice modes." />
        <MiniStat title="Day streak" value={String(child.streak)} note="Keeps the child returning often enough for patterns to emerge." />
      </section>
    </div>
  )
}

function MiniStat({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">{title}</div>
      <div className="mt-3 font-display text-4xl font-semibold tracking-tight text-[color:var(--ink)]">{value}</div>
      <p className="mt-3 text-sm leading-6 text-[color:var(--ink-soft)]">{note}</p>
    </div>
  )
}

function avatarBackground(childId: string) {
  switch (childId) {
    case 'james':
      return '#F5E8D8'
    case 'amara':
      return '#E8F2EC'
    case 'chidi':
      return '#EDE8F5'
    default:
      return '#FAE8E0'
  }
}

function avatarColor(childId: string) {
  switch (childId) {
    case 'james':
      return '#8C4010'
    case 'amara':
      return '#2A6B45'
    case 'chidi':
      return '#5A3A91'
    default:
      return '#8C3A1C'
  }
}

function alertTint(riskLevel: 'high' | 'medium' | 'low') {
  switch (riskLevel) {
    case 'high':
      return 'rgba(201,78,53,0.1)'
    case 'medium':
      return 'rgba(201,132,26,0.1)'
    default:
      return 'rgba(77,155,111,0.1)'
  }
}

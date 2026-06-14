import { Gauge } from '../components/Gauge'
import { useAppContext } from '../appContext'
import { childOrder } from '../data'
import type { ChildId } from '../types'

export function DashboardPage() {
  const { children, selectedChild, selectedChildId, setSelectedChildId, navigate } = useAppContext()
  const child = selectedChild

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(255,247,234,0.96)_58%,rgba(255,244,226,0.92)_100%)] p-5 shadow-[var(--shadow)] sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:rgba(239,125,47,0.18)] bg-[color:var(--orange-bg)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--color-orange)]">
              AI-powered early detection · Africa
            </div>
            <h1 className="font-display text-3xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-4xl lg:text-5xl">
              Every child deserves to be <span className="text-[color:var(--color-orange)]">understood</span>, not labelled.
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[color:var(--ink-mid)] sm:text-base">
              MindBridge watches how a child learns, then turns the patterns into gentle, useful guidance. The child sees games. The teacher sees next steps.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 xl:justify-end">
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

        <div className="mt-6 rounded-[1.5rem] border border-[color:var(--border)] bg-white/80 p-4 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">Quick switch</div>
              <div className="mt-1 text-sm text-[color:var(--ink-mid)]">Tap a child to view their profile without leaving the page.</div>
            </div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">Selected child: {selectedChild.name}</div>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {childOrder.map((id) => {
              const profile = children[id]
              const selected = selectedChildId === id

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSelectedChildId(id as ChildId)}
                  className={[
                    'min-w-[220px] shrink-0 rounded-[1.25rem] border px-4 py-3 text-left transition',
                    selected
                      ? 'border-[color:var(--color-orange)] bg-[color:var(--orange-bg)] shadow-sm'
                      : 'border-[color:var(--border)] bg-white hover:-translate-y-0.5 hover:border-[color:var(--color-orange)] hover:bg-[color:var(--surface)]',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-bold"
                      style={{ backgroundColor: avatarBackground(profile.id), color: avatarColor(profile.id) }}
                    >
                      {profile.name[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold text-[color:var(--ink)]">{profile.name}</div>
                      <div className="truncate text-xs text-[color:var(--ink-soft)]">
                        {profile.condition} · {profile.confidence}% confidence
                      </div>
                    </div>
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: profile.arcColor }} aria-hidden="true" />
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatPill label="Sessions" value={String(child.sessions)} note="Collected naturally" />
        <StatPill label="Confidence" value={`${child.confidence}%`} note="Screening signal" />
        <StatPill label="Stars" value={String(child.stars)} note="Unlock progress" />
        <StatPill label="Streak" value={String(child.streak)} note="Daily practice" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1.05fr]">
        <Gauge
          value={child.confidence}
          color={child.arcColor}
          title={`${child.condition} detection`}
          subtitle={`${child.sessions} sessions · ${child.sessions * 24} signals analysed`}
          description={child.summary}
        />

        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow)] sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-2xl">Detected signals</h2>
              <p className="mt-1 text-sm text-[color:var(--ink-soft)]">What the app is noticing behind the scenes.</p>
            </div>
            <div className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">
              {child.riskLevel} risk
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {child.signals.map((signal) => (
              <div key={signal.name} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/55 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[color:var(--ink)]">{signal.name}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-soft)]">{signal.display}</div>
                  </div>
                  <div className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: signal.color, backgroundColor: signal.color.replace('var(--', 'rgba(0,0,0,0.0)') }}>
                    •
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white">
                  <div className="h-2 rounded-full transition-all duration-700 ease-out" style={{ width: `${signal.value}%`, backgroundColor: signal.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[1.5rem] border border-[color:var(--border)] bg-white p-5 shadow-[var(--shadow)] sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">Teacher review</div>
              <h2 className="font-display text-xl font-semibold tracking-tight text-[color:var(--ink)] sm:text-2xl">{child.alertHeadline}</h2>
            </div>
            <div className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]" style={{ backgroundColor: alertTint(child.riskLevel), color: child.arcColor }}>
              {child.riskLevel === 'high' ? 'Flagged' : child.riskLevel === 'medium' ? 'Monitoring' : 'Typical'}
            </div>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--ink-mid)]">{child.alertDetail}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {child.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-[color:var(--surface)] px-3 py-1 text-xs font-semibold text-[color:var(--ink-mid)]">
                {tag}
              </span>
            ))}
          </div>
        </article>

        <article className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--ink)] p-5 text-white shadow-[var(--shadow)] sm:p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Recommended support</div>
          <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">What the teacher should do next</h2>
          <div className="mt-5 space-y-3">
            {child.recommendations.map((recommendation, index) => (
              <div key={recommendation} className="flex gap-3 rounded-2xl bg-white/5 px-4 py-3">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-[color:var(--color-orange)] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-6 text-white/75">{recommendation}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <MiniStat title="Sessions" value={String(child.sessions)} note="Collected without turning the app into a test." />
        <MiniStat title="Stars earned" value={String(child.stars)} note="Used to unlock new practice modes." />
        <MiniStat title="Day streak" value={String(child.streak)} note="Keeps the child returning often enough for patterns to emerge." />
      </section>
    </div>
  )
}

function StatPill({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[color:var(--border)] bg-white p-4 shadow-[var(--shadow)]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:var(--ink-soft)]">{label}</div>
      <div className="mt-2 text-3xl font-bold tracking-tight text-[color:var(--ink)]">{value}</div>
      <p className="mt-2 text-sm leading-6 text-[color:var(--ink-soft)]">{note}</p>
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

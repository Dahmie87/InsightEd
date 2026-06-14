interface GaugeProps {
  value: number
  color: string
  title: string
  subtitle: string
  description: string
}

const RADIUS = 90
const CIRCUMFERENCE = Math.PI * RADIUS

export function Gauge({ value, color, title, subtitle, description }: GaugeProps) {
  const safeValue = Math.max(0, Math.min(100, value))
  const offset = CIRCUMFERENCE - (CIRCUMFERENCE * safeValue) / 100

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--surface-card)] p-6 shadow-[var(--shadow)] md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(217,114,53,0.08)_0%,transparent_65%)]" />
      <div className="relative flex flex-col items-center justify-center text-center">
        <div className="relative mb-5 h-[110px] w-[220px] max-w-full sm:h-[120px] sm:w-[240px]">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 220 110" aria-hidden="true">
            <path
              d="M 20 110 A 90 90 0 0 1 200 110"
              fill="none"
              stroke="rgba(240,234,226,0.95)"
              strokeLinecap="round"
              strokeWidth="14"
            />
            <path
              d="M 20 110 A 90 90 0 0 1 200 110"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="14"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-1000 ease-[cubic-bezier(.22,.68,0,1.2)]"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 text-center">
            <div className="text-3xl font-extrabold leading-none tracking-tight tabular-nums text-[color:var(--ink)] md:text-4xl">
              {safeValue}%
            </div>
            <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--ink-soft)]">
              confidence
            </div>
          </div>
        </div>

        <div className="max-w-md space-y-3">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-[color:var(--ink)]">{title}</h2>
          <p className="text-sm leading-6 text-[color:var(--ink-mid)]">{subtitle}</p>
          <p className="text-sm leading-7 text-[color:var(--ink-soft)]">{description}</p>
        </div>
      </div>
    </div>
  )
}

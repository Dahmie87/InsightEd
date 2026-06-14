import { type ReactNode, useEffect, useState } from 'react'
import { Brain } from 'lucide-react'
import { useAppContext } from '../appContext'
import type { AppPage } from '../types'

interface LayoutProps {
  children: ReactNode
}

const navItems: Array<{ to: AppPage; label: string }> = [
  { to: 'overview', label: 'Overview' },
  { to: 'learn', label: 'Learn' },
  { to: 'science', label: 'Science' },
  { to: 'reports', label: 'Reports' },
]

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const context = useAppContext()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [context.currentPage])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(217,114,53,0.12)_0%,transparent_30%),linear-gradient(180deg,var(--bg)_0%,#fcfaf7_100%)] text-[color:var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[rgba(250,247,244,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button type="button" onClick={() => context.navigate('overview')} className="flex items-center gap-3 text-left">
            <div className="grid h-11 w-11 place-items-center rounded-[1.15rem] bg-[color:var(--color-orange)] shadow-[var(--shadow)] ring-1 ring-white/70">
              <Brain className="h-6 w-6 text-white" strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div>
              <div className="font-display text-lg font-medium tracking-tight text-[color:var(--ink)]">
                Insight<span className="rounded-full bg-[color:var(--orange-bg)] px-1.5 py-0.5 text-[color:var(--color-orange)]">ED</span>
              </div>
              <div className="mt-0.5 text-[9px] font-normal uppercase tracking-[0.16em] text-[color:var(--ink-soft)] sm:text-[10px]">
                early learning intelligence
              </div>
            </div>
          </button>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => {
                  context.navigate(item.to)
                  setMenuOpen(false)
                }}
                className={[
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  context.currentPage === item.to
                    ? 'bg-[color:var(--orange-bg)] text-[color:var(--color-orange)]'
                    : 'text-[color:var(--ink-soft)] hover:bg-[color:var(--surface)] hover:text-[color:var(--ink)]',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-[color:rgba(77,155,111,0.2)] bg-[rgba(77,155,111,0.1)] px-3 py-1.5 text-sm font-medium text-[color:var(--color-green)]">
              <span className="h-2 w-2 rounded-full bg-[color:var(--color-green)]" />
              AI active
            </div>
            <div className="rounded-full border border-[color:var(--border)] bg-white px-3 py-1.5 text-sm text-[color:var(--ink-mid)]">
              Selected: <span className="font-medium text-[color:var(--ink)]">{context.selectedChild.name}</span>
            </div>
          </div>

          <button
            type="button"
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white text-[color:var(--ink)] shadow-sm transition hover:bg-[color:var(--surface)] md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-[2px] w-5 rounded-full bg-current" />
              <span className="h-[2px] w-5 rounded-full bg-current" />
              <span className="h-[2px] w-5 rounded-full bg-current" />
            </span>
          </button>
        </div>

        <div
          className={[
            'border-t border-[color:var(--border)] bg-[color:var(--bg)] px-4 py-3 md:hidden',
            menuOpen ? 'block' : 'hidden',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => {
                  context.navigate(item.to)
                  setMenuOpen(false)
                }}
                className={[
                  'rounded-2xl px-4 py-3 text-left text-sm font-medium',
                  context.currentPage === item.to
                    ? 'bg-[color:var(--orange-bg)] text-[color:var(--color-orange)]'
                    : 'bg-white text-[color:var(--ink-mid)]',
                ].join(' ')}
              >
                {item.label}
              </button>
            ))}
            <div className="rounded-2xl border border-[color:var(--border)] bg-white px-4 py-3 text-sm text-[color:var(--ink-mid)]">
              Selected child: <span className="font-medium text-[color:var(--ink)]">{context.selectedChild.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}

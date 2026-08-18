import { useEffect, useState } from 'react'
import { PROFILE } from '../data/profile'

const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'work', label: 'Work' },
  { id: 'agentic', label: 'Agentic' },
  { id: 'contact', label: 'Contact' },
]

export function Nav({ onEnterNvim }: { onEnterNvim: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('about')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )
    for (const section of SECTIONS) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? 'border-b border-edge bg-void/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-edge bg-surface font-display text-[13px] font-bold text-ink transition-colors group-hover:border-violet/60">
            {PROFILE.initials}
          </span>
          <span className="hidden text-sm font-medium text-ink-dim transition-colors group-hover:text-ink sm:block">
            {PROFILE.name}
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors duration-200 ${
                active === section.id ? 'text-ink' : 'text-muted hover:text-ink-dim'
              }`}
            >
              {section.label}
              {active === section.id && (
                <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-violet to-aqua" />
              )}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={onEnterNvim}
          title="Switch to the Neovim version (or press `)"
          className="group flex items-center gap-2 rounded-lg border border-edge bg-surface px-3 py-1.5 font-mono text-xs text-ink-dim transition-all duration-200 hover:border-violet/60 hover:text-ink"
        >
          <span className="text-mint transition-transform duration-200 group-hover:translate-x-0.5">:</span>
          <span>nvim mode</span>
          <kbd className="hidden rounded border border-edge-bright px-1 text-[10px] text-muted sm:inline">`</kbd>
        </button>
      </nav>
    </header>
  )
}

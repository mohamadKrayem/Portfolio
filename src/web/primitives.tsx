import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/** Inline markers shared with the nvim buffers: **bold** and `code`. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          )
        if (part.startsWith('`') && part.endsWith('`'))
          return (
            <code key={i} className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-aqua">
              {part.slice(1, -1)}
            </code>
          )
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-shown={shown}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

/** Card whose border and inner light follow the pointer. */
export function GlowCard({
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li'
} & React.HTMLAttributes<HTMLElement>) {
  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <Tag
      onMouseMove={onMouseMove}
      className={`glow-card relative overflow-hidden rounded-2xl border border-edge bg-surface/70 transition-colors duration-300 hover:border-edge-bright ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({
  index,
  kicker,
  title,
  lead,
}: {
  index: string
  kicker: string
  title: ReactNode
  lead?: string
}) {
  return (
    <div className="max-w-2xl">
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <span className="text-violet">{index}</span>
          <span className="h-px w-8 bg-edge-bright" />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-5 font-display text-3xl leading-[1.1] font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={150}>
          <p className="mt-5 text-base leading-relaxed text-ink-dim md:text-lg">
            <RichText text={lead} />
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function Chip({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`rounded-full border border-edge bg-surface-2/80 px-3 py-1 font-mono text-[11px] tracking-wide text-ink-dim transition-colors duration-200 hover:border-violet/60 hover:text-ink ${className}`}
    >
      {children}
    </span>
  )
}

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-6xl scroll-mt-24 px-6 py-24 md:py-32 ${className}`}>
      {children}
    </section>
  )
}

import { useEffect, useState } from 'react'
import { PROFILE } from '../data/profile'
import { RichText, Reveal } from './primitives'
import { EditorPreview } from './EditorPreview'

/** Types each role out, holds, deletes, moves on. */
function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    const word = words[index % words.length]
    const done = text === word
    const empty = text === ''

    if (!deleting && done) {
      const hold = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(hold)
    }
    if (deleting && empty) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }
    const delay = deleting ? 35 : 65
    const timer = setTimeout(() => {
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [text, deleting, index, words])

  return text
}

export function Hero({ onEnterNvim }: { onEnterNvim: () => void }) {
  const typed = useTypewriter(PROFILE.roles)

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-center px-6 pt-28 pb-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-surface/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-ink-dim backdrop-blur">
            <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-mint" />
            {PROFILE.available}
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] font-bold tracking-[-0.03em]">
            <span className="block text-ink">Mohamad</span>
            <span className="text-gradient block">Krayem</span>
          </h1>
        </Reveal>

        <Reveal delay={170}>
          <div className="mt-7 flex items-center gap-3 font-mono text-sm text-muted sm:text-base">
            <span className="text-violet">~$</span>
            <span className="text-ink-dim">{typed}</span>
            <span className="animate-caret inline-block h-[1.1em] w-[0.55ch] translate-y-[0.15em] bg-aqua" />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-dim md:text-xl">
            <RichText text={PROFILE.intro[0]} />
          </p>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${PROFILE.contact.email}`}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet to-aqua px-6 py-3 text-sm font-semibold text-void transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="relative z-10">Get in touch</span>
            </a>
            <a
              href="#work"
              className="rounded-xl border border-edge bg-surface/70 px-6 py-3 text-sm font-medium text-ink-dim transition-all duration-200 hover:-translate-y-0.5 hover:border-edge-bright hover:text-ink"
            >
              See the work
            </a>
            <button
              type="button"
              onClick={onEnterNvim}
              className="rounded-xl border border-transparent px-4 py-3 font-mono text-sm text-muted transition-colors duration-200 hover:text-aqua"
            >
              :e portfolio<span className="text-violet">.nvim</span>
            </button>
          </div>
        </Reveal>
        </div>

        <Reveal delay={380} className="hidden lg:block">
          <EditorPreview onEnterNvim={onEnterNvim} />
        </Reveal>
      </div>

      <div className="animate-fade-in absolute inset-x-6 bottom-8 flex items-end justify-between opacity-0 [animation-delay:700ms]">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          scroll
          <span className="animate-bounce text-violet">↓</span>
        </div>
        <div className="hidden font-mono text-[11px] text-muted sm:block">{PROFILE.contact.location}</div>
      </div>

    </section>
  )
}

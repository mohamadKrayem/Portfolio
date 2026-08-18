import { useState } from 'react'
import { PROFILE } from '../data/profile'
import { Chip, Reveal, Section, SectionHeading } from './primitives'

export function Contact({ onEnterNvim }: { onEnterNvim: () => void }) {
  const { email, github, linkedin, location, prompts, responseTime } = PROFILE.contact
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Section id="contact">
      <SectionHeading
        index="05"
        kicker="contact"
        title={
          <>
            Let's build something
            <br />
            that stays up.
          </>
        }
      />

      <Reveal delay={140}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="rounded-xl bg-gradient-to-r from-violet to-aqua px-6 py-3.5 text-sm font-semibold text-void transition-transform duration-200 hover:-translate-y-0.5"
          >
            {email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-xl border border-edge bg-surface/70 px-5 py-3.5 font-mono text-sm text-ink-dim transition-all duration-200 hover:-translate-y-0.5 hover:border-edge-bright hover:text-ink"
          >
            {copied ? '✓ copied' : 'copy address'}
          </button>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-10 border-t border-edge pt-10 md:grid-cols-2">
        <Reveal>
          <div className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">good conversations to start</div>
          <ul className="mt-5 space-y-3">
            {prompts.map((prompt) => (
              <li key={prompt} className="flex gap-3 text-sm text-ink-dim md:text-base">
                <span className="text-violet">—</span>
                <span>{prompt}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">elsewhere</div>
          <div className="mt-5 flex flex-col gap-3">
            {[
              ['GitHub', github],
              ['LinkedIn', linkedin],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border-b border-edge py-3 text-sm text-ink-dim transition-colors hover:text-ink"
              >
                <span>{label}</span>
                <span className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-aqua">
                  ↗
                </span>
              </a>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Chip>{location}</Chip>
            <Chip>{responseTime}</Chip>
          </div>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <footer className="mt-20 flex flex-col gap-4 border-t border-edge pt-8 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {PROFILE.name}. Hand-built with React, TypeScript & Tailwind.</span>
          <button type="button" onClick={onEnterNvim} className="text-left transition-colors hover:text-aqua">
            press <span className="text-violet">`</span> to open this site in Neovim
          </button>
        </footer>
      </Reveal>
    </Section>
  )
}

import { PROFILE } from '../data/profile'
import { GlowCard, Reveal, RichText, Section, SectionHeading } from './primitives'

export function Agentic() {
  const { lead, points, stack, closing } = PROFILE.agentic

  return (
    <div className="relative border-y border-edge bg-surface/25">
      <Section id="agentic">
        <SectionHeading index="04" kicker="agentic systems" title="Agents, built like systems" lead={lead} />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={(i % 3) * 90}>
              <GlowCard className="h-full p-6">
                <div className="font-mono text-[11px] text-violet">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="mt-3 font-display text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  <RichText text={point.body} />
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-edge bg-void/70">
              <div className="flex items-center gap-2 border-b border-edge px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f7768e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e0af68]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9ece6a]" />
                <span className="ml-2 font-mono text-[11px] text-muted">agent-stack.toml</span>
              </div>
              <div className="space-y-2.5 p-5 font-mono text-xs leading-relaxed md:text-[13px]">
                {stack.map(([key, value]) => (
                  <div key={key} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <span className="w-20 shrink-0 text-violet">{key}</span>
                    <span className="text-ink-dim">
                      <span className="text-muted">= </span>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <blockquote className="flex h-full flex-col justify-center rounded-2xl border border-edge bg-surface/60 p-8">
              <p className="font-display text-xl leading-snug text-ink md:text-2xl">“{closing}”</p>
              <footer className="mt-5 font-mono text-xs text-muted">— the short version</footer>
            </blockquote>
          </Reveal>
        </div>
      </Section>
    </div>
  )
}

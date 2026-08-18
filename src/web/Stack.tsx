import { PROFILE } from '../data/profile'
import { Chip, GlowCard, Reveal, Section, SectionHeading } from './primitives'

export function Stack() {
  return (
    <Section id="stack">
      <SectionHeading
        index="02"
        kicker="stack"
        title="What I reach for"
        lead="Tools I have actually run in production, grouped by the job they do rather than by how new they are."
      />

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROFILE.skills.map((group, i) => (
          <Reveal key={group.key} delay={(i % 3) * 90}>
            <GlowCard className="h-full p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{group.label}</h3>
                <span className="font-mono text-[11px] text-muted">{String(group.items.length).padStart(2, '0')}</span>
              </div>
              <p className="mt-1.5 text-xs text-muted">{group.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

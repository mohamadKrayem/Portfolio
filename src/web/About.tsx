import { PROFILE } from '../data/profile'
import { Chip, GlowCard, Reveal, RichText, Section, SectionHeading } from './primitives'

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        kicker="about"
        title={
          <>
            Full stack, in the
            <br />
            unglamorous sense.
          </>
        }
      />

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          {PROFILE.intro.map((paragraph, i) => (
            <Reveal key={i} delay={i * 90}>
              <p className="mb-5 text-base leading-relaxed text-ink-dim md:text-lg">
                <RichText text={paragraph} />
              </p>
            </Reveal>
          ))}

          <Reveal delay={200}>
            <ul className="mt-8 space-y-3.5">
              {PROFILE.doing.map((item) => (
                <li key={item} className="flex gap-3.5 text-sm leading-relaxed text-ink-dim md:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet to-aqua" />
                  <span>
                    <RichText text={item} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          {PROFILE.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 110}>
              <GlowCard className="p-6">
                <div className="font-mono text-[11px] tracking-[0.18em] text-violet uppercase">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{principle.body}</p>
              </GlowCard>
            </Reveal>
          ))}

          <Reveal delay={340}>
            <div className="flex flex-wrap gap-2 pt-2">
              {['ships to production', 'reads the logs', 'writes the migration', 'answers the page'].map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

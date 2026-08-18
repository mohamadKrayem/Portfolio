import { PROFILE } from '../data/profile'
import { Chip, GlowCard, Reveal, Section, SectionHeading } from './primitives'

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        index="03"
        kicker="work"
        title="Selected work"
        lead="A few systems worth describing. Each one is a link, a stack, and the part that was actually hard."
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {PROFILE.projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 90} className={project.featured ? 'md:col-span-2' : ''}>
            <GlowCard as="article" className="group h-full p-7 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="font-mono text-[11px] tracking-[0.18em] text-violet uppercase">
                    {String(i + 1).padStart(2, '0')} {project.featured && <span className="ml-2 text-aqua">featured</span>}
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight font-semibold text-ink md:text-3xl">
                    {project.name}
                  </h3>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-edge text-muted transition-all duration-300 group-hover:border-violet/60 group-hover:text-ink hover:rotate-45"
                  >
                    ↗
                  </a>
                )}
              </div>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-dim md:text-base">{project.desc}</p>

              <ul className="mt-6 space-y-2">
                {project.notes.map((note) => (
                  <li key={note} className="flex gap-3 font-mono text-xs leading-relaxed text-muted">
                    <span className="text-violet/70">→</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Experience() {
  return (
    <Section id="experience" className="pt-0">
      <SectionHeading index="03b" kicker="experience" title="Where I have worked" />

      <div className="relative mt-14 pl-6 sm:pl-10">
        <div className="absolute inset-y-2 left-0 w-px bg-gradient-to-b from-violet via-aqua/40 to-transparent" />

        {PROFILE.experience.map((role, i) => (
          <Reveal key={`${role.company}-${i}`} delay={i * 100}>
            <div className="group relative pb-12 last:pb-0">
              <span className="absolute top-2 -left-6 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-violet bg-void transition-colors duration-300 group-hover:bg-violet sm:-left-10" />
              <div className="font-mono text-xs tracking-wide text-muted">{role.period}</div>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink md:text-2xl">
                {role.role} <span className="text-muted">·</span>{' '}
                <span className="bg-gradient-to-r from-violet to-aqua bg-clip-text text-transparent">{role.company}</span>
              </h3>
              <p className="mt-2 text-sm text-ink-dim md:text-base">{role.summary}</p>
              <ul className="mt-4 space-y-2">
                {role.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-edge-bright" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

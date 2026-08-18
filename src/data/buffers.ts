import type { Buffer } from '../lib/types'
import { PROFILE } from './profile'

/**
 * The nvim buffers are generated from `profile.ts` so both modes of the site
 * always say the same thing. Edit the content there, not here.
 */

const WIDTH = 72

function wrap(text: string, indent = '', width = WIDTH): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = indent

  for (const word of words) {
    const candidate = line.trim() ? `${line} ${word}` : `${indent}${word}`
    if (candidate.length > width && line.trim()) {
      lines.push(line)
      line = `${indent}${word}`
    } else {
      line = candidate
    }
  }
  if (line.trim()) lines.push(line)
  return lines
}

function bullet(text: string, marker = '-'): string[] {
  const [first, ...rest] = wrap(text, '', WIDTH - marker.length - 1)
  return [`${marker} ${first}`, ...rest.map((l) => `  ${l}`)]
}

function aboutBuffer(): string[] {
  const { name, roles, intro, doing, principles } = PROFILE
  return [
    `# ${name}`,
    '',
    `> ${roles[0]}  ·  ${roles[1]}`,
    '',
    ...intro.flatMap((p) => [...wrap(p), '']),
    '## What I do',
    '',
    ...doing.flatMap((d) => bullet(d)),
    '',
    '## How I work',
    '',
    ...principles.flatMap((p) => bullet(`**${p.title}** — ${p.body}`)),
    '',
    '## Navigate',
    '',
    '  `:e skills.json`     what I work with',
    '  `:e experience.md`   where I have worked',
    '  `:e projects.lua`    selected work',
    '  `:e agentic.md`      how I build agents',
    '  `:e contact.sh`      how to reach me',
    '',
    '  Press `?` for keymaps, `<Space>ff` to fuzzy find a file.',
    '  `:web` (or `` ` ``) leaves the editor for the website.',
  ]
}

function experienceBuffer(): string[] {
  return [
    '# Experience',
    '',
    '<!-- Placeholders live in src/data/profile.ts -->',
    '',
    ...PROFILE.experience.flatMap((role) => [
      `## ${role.role} — ${role.company}`,
      `### ${role.period}`,
      '',
      ...wrap(role.summary),
      '',
      ...role.bullets.flatMap((b) => bullet(b)),
      '',
    ]),
    '---',
    '',
    'See `projects.lua` for the work itself, or `contact.sh` for a CV.',
  ]
}

function skillsBuffer(): string[] {
  const object = Object.fromEntries(PROFILE.skills.map((group) => [group.key, group.items]))
  return JSON.stringify(object, null, 2).split('\n')
}

function projectsBuffer(): string[] {
  const lines: string[] = [
    '-- projects.lua',
    '-- Selected work, written as a lazy.nvim spec because why not.',
    '',
    'return {',
  ]

  PROFILE.projects.forEach((project, i) => {
    lines.push('  {')
    lines.push(`    "krayem/${project.slug}",`)
    lines.push(`    desc = "${project.name}",`)
    lines.push(`    stack = { ${project.stack.map((s) => `"${s}"`).join(', ')} },`)
    lines.push('    notes = {')
    for (const note of project.notes) lines.push(`      "${note}",`)
    lines.push('    },')
    if (project.url) lines.push(`    url = "${project.url}",`)
    if (project.featured) lines.push('    featured = true,')
    lines.push(i === PROFILE.projects.length - 1 ? '  },' : '  },')
    lines.push('')
  })

  lines.push('}')
  return lines
}

function agenticBuffer(): string[] {
  const { lead, points, stack, closing } = PROFILE.agentic
  const pad = Math.max(...stack.map(([key]) => key.length)) + 4
  return [
    '# Agentic systems, in practice',
    '',
    ...wrap(lead),
    '',
    '## What I actually build',
    '',
    ...points.flatMap((p) => [...bullet(`**${p.title}.** ${p.body}`), '']),
    '## The stack I reach for',
    '',
    ...stack.flatMap(([key, value]) => {
      const [first, ...rest] = wrap(value, '', WIDTH - pad - 2)
      return [`  ${key.padEnd(pad, ' ')}${first}`, ...rest.map((l) => `  ${' '.repeat(pad)}${l}`)]
    }),
    '',
    '## The opinion',
    '',
    ...wrap(closing),
  ]
}

function contactBuffer(): string[] {
  const { email, github, linkedin, location, prompts, responseTime } = PROFILE.contact
  return [
    '#!/usr/bin/env bash',
    '# contact.sh — pick a channel, any channel.',
    '',
    `EMAIL="${email}"`,
    `GITHUB="${github}"`,
    `LINKEDIN="${linkedin}"`,
    `LOCATION="${location}"`,
    '',
    '# Fastest path: just send the email.',
    'open "mailto:${EMAIL}?subject=Hello%20Mohamad"',
    '',
    '# Good conversations to start:',
    ...prompts.map((p) => `#   - ${p}`),
    '',
    `echo "${PROFILE.available}."`,
    `echo "${responseTime}"`,
    '',
    '# :q to quit, like everything else here.',
  ]
}

function buf(id: string, name: string, filetype: Buffer['filetype'], lines: string[]): Buffer {
  return { id, name, path: `~/portfolio/${name}`, filetype, lines }
}

export const BUFFERS: Buffer[] = [
  buf('about', 'about.md', 'markdown', aboutBuffer()),
  buf('experience', 'experience.md', 'markdown', experienceBuffer()),
  buf('skills', 'skills.json', 'json', skillsBuffer()),
  buf('projects', 'projects.lua', 'lua', projectsBuffer()),
  buf('agentic', 'agentic.md', 'markdown', agenticBuffer()),
  buf('contact', 'contact.sh', 'sh', contactBuffer()),
]

export const LINKS: Record<string, string> = {
  email: `mailto:${PROFILE.contact.email}`,
  github: PROFILE.contact.github,
  linkedin: PROFILE.contact.linkedin,
}

import type { FileType, Token } from './types'

type Rule = { re: RegExp; cls: string }

/**
 * Tiny regex tokenizer. Nowhere near treesitter, but it only has to make a
 * handful of hand-written buffers look like they came out of an editor.
 */
const RULES: Record<FileType, Rule[]> = {
  markdown: [
    { re: /^\s*#{1,6}\s.*$/, cls: 'text-blue font-bold' },
    { re: /^\s*>.*$/, cls: 'text-comment italic' },
    { re: /^\s*(?:[-*+]|\d+\.)\s/, cls: 'text-magenta' },
    { re: /`[^`]+`/, cls: 'text-green' },
    { re: /\*\*[^*]+\*\*/, cls: 'text-yellow font-bold' },
    { re: /\[[^\]]+\]\([^)]*\)/, cls: 'text-cyan underline' },
    { re: /^\s*(?:---|===)+\s*$/, cls: 'text-line' },
    { re: /\b(?:https?:\/\/|www\.)[^\s)]+/, cls: 'text-cyan underline' },
  ],
  json: [
    { re: /"(?:[^"\\]|\\.)*"(?=\s*:)/, cls: 'text-blue' },
    { re: /"(?:[^"\\]|\\.)*"/, cls: 'text-green' },
    { re: /\b(?:true|false|null)\b/, cls: 'text-orange' },
    { re: /-?\b\d+(?:\.\d+)?\b/, cls: 'text-orange' },
    { re: /[{}[\]]/, cls: 'text-yellow' },
    { re: /[,:]/, cls: 'text-fg-dark' },
  ],
  lua: [
    { re: /--.*$/, cls: 'text-comment italic' },
    { re: /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, cls: 'text-green' },
    {
      re: /\b(?:local|function|end|return|if|then|else|elseif|for|in|do|while|require|not|and|or|nil|true|false)\b/,
      cls: 'text-magenta',
    },
    { re: /-?\b\d+(?:\.\d+)?\b/, cls: 'text-orange' },
    { re: /\b[A-Za-z_]\w*(?=\s*=[^=])/, cls: 'text-blue' },
    { re: /\b[A-Za-z_]\w*(?=\()/, cls: 'text-cyan' },
    { re: /[{}[\]()]/, cls: 'text-yellow' },
  ],
  sh: [
    { re: /#.*$/, cls: 'text-comment italic' },
    { re: /"(?:[^"\\]|\\.)*"|'[^']*'/, cls: 'text-green' },
    { re: /^\s*\$/, cls: 'text-red' },
    { re: /\b(?:curl|echo|cat|grep|ssh|git|docker|npm|dotnet|export|sudo|mailto)\b/, cls: 'text-cyan' },
    { re: /(?:^|\s)(?:-{1,2}[\w-]+)/, cls: 'text-yellow' },
    { re: /\b(?:https?:\/\/)[^\s]+/, cls: 'text-blue underline' },
  ],
  typescript: [
    { re: /\/\/.*$/, cls: 'text-comment italic' },
    { re: /`[^`]*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/, cls: 'text-green' },
    {
      re: /\b(?:const|let|var|function|return|import|from|export|type|interface|as|await|async|new|class|extends|if|else)\b/,
      cls: 'text-magenta',
    },
    { re: /-?\b\d+(?:\.\d+)?\b/, cls: 'text-orange' },
    { re: /\b[A-Za-z_]\w*(?=\()/, cls: 'text-cyan' },
  ],
}

export function tokenize(line: string, filetype: FileType): Token[] {
  const rules = RULES[filetype] ?? []
  const out: Token[] = []
  let rest = line
  let offset = 0

  while (rest.length > 0) {
    let best: { index: number; length: number; cls: string } | null = null

    for (const rule of rules) {
      const re = new RegExp(rule.re.source, rule.re.flags.includes('g') ? rule.re.flags : rule.re.flags + 'g')
      re.lastIndex = 0
      // Anchored rules (^) only make sense against the original line.
      const target = rule.re.source.startsWith('^') ? line : rest
      const base = rule.re.source.startsWith('^') ? -offset : 0
      const m = re.exec(target)
      if (!m || m[0].length === 0) continue
      const index = m.index + base
      if (index < 0) continue
      if (!best || index < best.index || (index === best.index && m[0].length > best.length)) {
        best = { index, length: m[0].length, cls: rule.cls }
      }
    }

    if (!best) {
      out.push({ text: rest, cls: '' })
      break
    }
    if (best.index > 0) out.push({ text: rest.slice(0, best.index), cls: '' })
    out.push({ text: rest.slice(best.index, best.index + best.length), cls: best.cls })
    rest = rest.slice(best.index + best.length)
    offset += best.index + best.length
  }

  return out
}

import { useEffect, useRef } from 'react'
import type { Editor } from '../hooks/useEditor'
import type { Token } from '../lib/types'
import { tokenize } from '../lib/highlight'

const URL_RE = /(https?:\/\/[^\s"'`)]+|mailto:[^\s"'`)]+|[\w.+-]+@[\w-]+\.[\w.]+)/

function splitSearch(tokens: Token[], query: string): Token[] {
  if (!query) return tokens
  const needle = query.toLowerCase()
  const out: Token[] = []
  for (const token of tokens) {
    let rest = token.text
    let idx = rest.toLowerCase().indexOf(needle)
    while (idx !== -1) {
      if (idx > 0) out.push({ text: rest.slice(0, idx), cls: token.cls })
      out.push({ text: rest.slice(idx, idx + needle.length), cls: `${token.cls} bg-yellow/30 text-fg` })
      rest = rest.slice(idx + needle.length)
      idx = rest.toLowerCase().indexOf(needle)
    }
    if (rest) out.push({ text: rest, cls: token.cls })
  }
  return out
}


/** Paints a vim-style block cursor over the first character of the line. */
function withCursor(tokens: Token[], insert: boolean): Token[] {
  const cls = insert ? 'border-l-2 border-fg' : 'bg-fg/80 text-bg'
  if (tokens.length === 0 || tokens[0].text.length === 0) return [{ text: ' ', cls }]
  const [first, ...rest] = tokens
  const head = { text: first.text.slice(0, 1), cls: `${first.cls} ${cls}` }
  const tail = first.text.length > 1 ? [{ text: first.text.slice(1), cls: first.cls }] : []
  return [head, ...tail, ...rest]
}

function TokenSpan({ token }: { token: Token }) {
  const match = URL_RE.exec(token.text)
  if (match) {
    const before = token.text.slice(0, match.index)
    const after = token.text.slice(match.index + match[0].length)
    const raw = match[0]
    const href = raw.startsWith('http') || raw.startsWith('mailto:') ? raw : `mailto:${raw}`
    return (
      <span className={token.cls}>
        {before}
        <a href={href} target="_blank" rel="noreferrer" className="underline decoration-dotted hover:text-cyan">
          {raw}
        </a>
        {after}
      </span>
    )
  }
  return <span className={token.cls}>{token.text}</span>
}

export function BufferView({ editor }: { editor: Editor }) {
  const { buffer, cursor, setCursor, numberMode, search, visualRange, mode } = editor
  const activeLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    activeLineRef.current?.scrollIntoView({ block: 'nearest' })
  }, [cursor, buffer.id])

  const gutterWidth = String(buffer.lines.length).length + 1

  return (
    <div className="relative flex-1 overflow-y-auto overflow-x-auto bg-bg">
      <div className="min-h-full py-1 text-[13px] leading-6 md:text-sm">
        {buffer.lines.map((line, i) => {
          const isCursor = i === cursor
          const inVisual = visualRange && i >= visualRange.start && i <= visualRange.end
          let tokens = splitSearch(tokenize(line, buffer.filetype), search.query)
          if (isCursor) tokens = withCursor(tokens, mode === 'INSERT')
          const relative = numberMode === 'relative' && !isCursor ? Math.abs(i - cursor) : i + 1

          return (
            <div
              key={i}
              ref={isCursor ? activeLineRef : undefined}
              onClick={() => setCursor(i)}
              className={`flex cursor-text scroll-mt-8 scroll-mb-8 ${
                inVisual ? 'bg-bg-visual/60' : isCursor ? 'bg-bg-hl/70' : ''
              }`}
            >
              {numberMode !== 'off' && (
                <span
                  className={`shrink-0 pr-3 pl-3 text-right tabular-nums select-none ${
                    isCursor ? 'text-orange' : 'text-fg-gutter'
                  }`}
                  style={{ width: `${gutterWidth + 3}ch` }}
                >
                  {relative}
                </span>
              )}
              <pre
                className={`min-w-0 flex-1 pr-6 font-mono break-words whitespace-pre-wrap md:whitespace-pre ${
                  isCursor ? 'cursor-block-line' : ''
                }`}
              >
                {tokens.length === 0 ? <span> </span> : tokens.map((token, t) => <TokenSpan key={t} token={token} />)}
              </pre>
            </div>
          )
        })}
        <div className="px-3 text-fg-gutter">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>~</div>
          ))}
        </div>
      </div>
    </div>
  )
}

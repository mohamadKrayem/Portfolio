import { useEffect, useMemo, useRef, useState } from 'react'
import type { Editor } from '../hooks/useEditor'
import { tokenize } from '../lib/highlight'
import { FileIcon } from './icons'

type Entry = { bufId: string; line: number; label: string; detail: string }

/** Subsequence match with a light bonus for consecutive hits, like fzf's cheap cousin. */
function fuzzyScore(needle: string, haystack: string): number | null {
  if (!needle) return 0
  const n = needle.toLowerCase()
  const h = haystack.toLowerCase()
  let score = 0
  let hi = 0
  let streak = 0
  for (const ch of n) {
    const found = h.indexOf(ch, hi)
    if (found === -1) return null
    streak = found === hi ? streak + 1 : 0
    score += 10 - Math.min(9, found - hi) + streak * 2
    hi = found + 1
  }
  return score
}

export function Telescope({ editor }: { editor: Editor }) {
  const { buffers, pickerMode, setOverlay, openAt } = editor
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const entries = useMemo<Entry[]>(() => {
    if (pickerMode === 'files') {
      return buffers.map((b) => ({ bufId: b.id, line: 0, label: b.name, detail: b.path }))
    }
    return buffers.flatMap((b) =>
      b.lines.flatMap((line, i) =>
        line.trim() ? [{ bufId: b.id, line: i, label: `${b.name}:${i + 1}`, detail: line.trim() }] : [],
      ),
    )
  }, [buffers, pickerMode])

  const results = useMemo(() => {
    const scored = entries
      .map((entry) => {
        const target = pickerMode === 'files' ? entry.label : `${entry.label} ${entry.detail}`
        const score = fuzzyScore(query, target)
        return score === null ? null : { entry, score }
      })
      .filter((x): x is { entry: Entry; score: number } => x !== null)
    scored.sort((a, b) => b.score - a.score)
    return scored.slice(0, 200).map((x) => x.entry)
  }, [entries, query, pickerMode])

  useEffect(() => setSelected(0), [query, pickerMode])

  useEffect(() => {
    listRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [selected, results])

  const current = results[selected]
  const previewBuffer = current ? buffers.find((b) => b.id === current.bufId) : undefined

  function move(delta: number) {
    setSelected((s) => Math.max(0, Math.min(results.length - 1, s + delta)))
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOverlay('none')
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (current) openAt(current.bufId, current.line)
      setOverlay('none')
      return
    }
    if (e.key === 'ArrowDown' || (e.ctrlKey && e.key.toLowerCase() === 'j')) {
      e.preventDefault()
      move(1)
      return
    }
    if (e.key === 'ArrowUp' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
      e.preventDefault()
      move(-1)
    }
  }

  return (
    <div
      className="absolute inset-0 z-30 flex items-start justify-center bg-bg-dark/70 p-3 pt-[6vh] backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOverlay('none')
      }}
    >
      <div className="flex h-[70vh] w-full max-w-4xl flex-col overflow-hidden rounded border border-blue/60 bg-bg-float shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="text-red">&gt;</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={pickerMode === 'files' ? 'Find Files' : 'Live Grep'}
            className="flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-comment"
          />
          <span className="text-[12px] text-comment tabular-nums">{results.length}</span>
        </div>

        <div className="flex min-h-0 flex-1">
          <div ref={listRef} className="w-1/2 overflow-y-auto py-1 text-[13px] md:w-2/5">
            {results.length === 0 && <div className="px-3 py-2 text-comment">no results</div>}
            {results.map((entry, i) => {
              const buffer = buffers.find((b) => b.id === entry.bufId)
              const active = i === selected
              return (
                <div
                  key={`${entry.bufId}-${entry.line}-${i}`}
                  data-selected={active}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => {
                    openAt(entry.bufId, entry.line)
                    setOverlay('none')
                  }}
                  className={`flex cursor-pointer items-center gap-2 px-3 py-0.5 ${
                    active ? 'bg-bg-hl text-fg' : 'text-fg-dark'
                  }`}
                >
                  <span className={active ? 'text-red' : 'text-transparent'}>▸</span>
                  {buffer && <FileIcon filetype={buffer.filetype} />}
                  <span className="shrink-0">{entry.label}</span>
                  {pickerMode === 'grep' && <span className="truncate text-comment">{entry.detail}</span>}
                </div>
              )
            })}
          </div>

          <div className="hidden min-w-0 flex-1 flex-col border-l border-line md:flex">
            <div className="border-b border-line px-3 py-1 text-[12px] text-comment">
              {previewBuffer?.path ?? 'preview'}
            </div>
            <div className="min-h-0 flex-1 overflow-auto py-1 text-[12px] leading-5">
              {previewBuffer &&
                previewBuffer.lines.slice(Math.max(0, (current?.line ?? 0) - 6), (current?.line ?? 0) + 26).map((line, i) => {
                  const lineNo = Math.max(0, (current?.line ?? 0) - 6) + i
                  return (
                    <div key={lineNo} className={`flex ${lineNo === current?.line ? 'bg-bg-hl' : ''}`}>
                      <span className="w-[5ch] shrink-0 pr-2 text-right text-fg-gutter tabular-nums">{lineNo + 1}</span>
                      <pre className="whitespace-pre">
                        {tokenize(line, previewBuffer.filetype).map((token, t) => (
                          <span key={t} className={token.cls}>
                            {token.text}
                          </span>
                        ))}
                      </pre>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-line px-3 py-1 text-[11px] text-comment">
          <span>{pickerMode === 'files' ? 'find_files' : 'live_grep'}</span>
          <span>↑↓ / C-j C-k move · ⏎ open · esc close</span>
        </div>
      </div>
    </div>
  )
}

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BUFFERS } from '../data/buffers'
import type { Mode } from '../lib/types'
import { THEME_NAMES, applyTheme } from '../lib/themes'

export type Overlay = 'none' | 'telescope' | 'help'
export type PickerMode = 'files' | 'grep'
export type NumberMode = 'relative' | 'absolute' | 'off'
export type Message = { text: string; kind: 'info' | 'error' } | null

const HALF_PAGE = 12
const DEFAULT_TABS = ['about', 'skills', 'projects']

/** Read once at load: the hash is rewritten as soon as the editor renders. */
const INITIAL = (() => {
  if (typeof window === 'undefined') return BUFFERS[0]
  const wanted = decodeURIComponent(window.location.hash.replace(/^#\/?/, ''))
  return BUFFERS.find((b) => b.name === wanted || b.id === wanted) ?? BUFFERS[0]
})()
const PENDING_TIMEOUT = 900

export type EditorOptions = { onLeaveEditor?: () => void }

export function useEditor({ onLeaveEditor }: EditorOptions = {}) {
  const [activeId, setActiveId] = useState(INITIAL.id)
  const [openIds, setOpenIds] = useState<string[]>(() =>
    DEFAULT_TABS.includes(INITIAL.id) ? DEFAULT_TABS : [INITIAL.id, ...DEFAULT_TABS],
  )
  const [cursors, setCursors] = useState<Record<string, number>>({})
  const [mode, setMode] = useState<Mode>('NORMAL')
  const [cmdline, setCmdline] = useState('')
  const [message, setMessage] = useState<Message>(null)
  const [search, setSearch] = useState({ query: '', index: 0 })
  const [visualAnchor, setVisualAnchor] = useState<number | null>(null)
  const [treeOpen, setTreeOpen] = useState(() => typeof window === 'undefined' || window.innerWidth >= 768)
  const [overlay, setOverlay] = useState<Overlay>('none')
  const [pickerMode, setPickerMode] = useState<PickerMode>('files')
  const [numberMode, setNumberMode] = useState<NumberMode>('relative')
  const [theme, setTheme] = useState('tokyonight')
  const [quit, setQuit] = useState(false)
  const [pending, setPending] = useState('')

  const pendingTimer = useRef<number | null>(null)
  const buffer = useMemo(() => BUFFERS.find((b) => b.id === activeId) ?? BUFFERS[0], [activeId])
  const cursor = cursors[activeId] ?? 0

  const matches = useMemo(() => {
    if (!search.query) return []
    const q = search.query.toLowerCase()
    return buffer.lines.flatMap((line, i) => (line.toLowerCase().includes(q) ? [i] : []))
  }, [search.query, buffer])

  const setCursor = useCallback(
    (updater: number | ((prev: number) => number)) => {
      setCursors((prev) => {
        const current = prev[activeId] ?? 0
        const next = typeof updater === 'function' ? updater(current) : updater
        const clamped = Math.max(0, Math.min(buffer.lines.length - 1, next))
        return { ...prev, [activeId]: clamped }
      })
    },
    [activeId, buffer.lines.length],
  )

  const openBuffer = useCallback((id: string) => {
    setActiveId(id)
    setOpenIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
    setOverlay('none')
    setVisualAnchor(null)
    setMode('NORMAL')
  }, [])

  // Deep links: /#skills.json opens that buffer (see INITIAL); the hash tracks the active one.
  useEffect(() => {
    window.history.replaceState(null, '', `#${buffer.name}`)
  }, [buffer.name])

  const openAt = useCallback(
    (id: string, line: number) => {
      openBuffer(id)
      setCursors((prev) => ({ ...prev, [id]: Math.max(0, line) }))
    },
    [openBuffer],
  )

  const closeBuffer = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        if (prev.length <= 1) return prev
        const next = prev.filter((x) => x !== id)
        if (id === activeId) setActiveId(next[Math.max(0, prev.indexOf(id) - 1)])
        return next
      })
    },
    [activeId],
  )

  const cycleBuffer = useCallback(
    (delta: number) => {
      setActiveId((prev) => {
        const i = openIds.indexOf(prev)
        const next = (i + delta + openIds.length) % openIds.length
        return openIds[next]
      })
      setVisualAnchor(null)
    },
    [openIds],
  )

  const jumpToMatch = useCallback(
    (delta: number) => {
      if (matches.length === 0) {
        setMessage({ text: `E486: Pattern not found: ${search.query}`, kind: 'error' })
        return
      }
      const current = cursors[activeId] ?? 0
      let target: number
      if (delta > 0) target = matches.find((m) => m > current) ?? matches[0]
      else target = [...matches].reverse().find((m) => m < current) ?? matches[matches.length - 1]
      setCursor(target)
      setMessage({ text: `/${search.query}  [${matches.indexOf(target) + 1}/${matches.length}]`, kind: 'info' })
    },
    [matches, cursors, activeId, search.query, setCursor],
  )

  const yank = useCallback(
    (text: string, lineCount: number) => {
      navigator.clipboard?.writeText(text).catch(() => {})
      setMessage({ text: `${lineCount} line${lineCount === 1 ? '' : 's'} yanked`, kind: 'info' })
    },
    [],
  )

  const execCommand = useCallback(
    (raw: string) => {
      const input = raw.trim()
      const [head, ...rest] = input.split(/\s+/)
      const arg = rest.join(' ')
      const cmd = head?.toLowerCase() ?? ''

      const findBuffer = (needle: string) =>
        BUFFERS.find((b) => b.name === needle || b.id === needle || b.name.startsWith(needle))

      switch (cmd) {
        case '':
          return
        case 'q':
        case 'q!':
        case 'qa':
        case 'qa!':
        case 'quit':
        case 'wq':
        case 'x':
          setQuit(true)
          return
        case 'w':
        case 'write':
          setMessage({ text: "E45: 'readonly' option is set (add ! to override)", kind: 'error' })
          return
        case 'w!':
          setMessage({ text: '"about.md" [readonly] written to the void', kind: 'info' })
          return
        case 'e':
        case 'e!':
        case 'edit':
        case 'b':
        case 'buffer': {
          if (!arg) {
            setMessage({ text: `E32: No file name`, kind: 'error' })
            return
          }
          const index = Number(arg)
          const target = Number.isInteger(index) && index > 0 ? BUFFERS[index - 1] : findBuffer(arg)
          if (!target) {
            setMessage({ text: `E94: No matching buffer for ${arg}`, kind: 'error' })
            return
          }
          openBuffer(target.id)
          setMessage({ text: `"${target.path}" ${target.lines.length}L`, kind: 'info' })
          return
        }
        case 'ls':
        case 'buffers':
          setMessage({
            text: BUFFERS.map((b, i) => `${i + 1} ${b.id === activeId ? '%a' : ' '} "${b.name}"`).join('   '),
            kind: 'info',
          })
          return
        case 'h':
        case 'help':
          setOverlay('help')
          return
        case 'telescope':
        case 'find':
        case 'files':
          setPickerMode('files')
          setOverlay('telescope')
          return
        case 'grep':
        case 'rg':
        case 'livegrep':
          setPickerMode('grep')
          setOverlay('telescope')
          return
        case 'ex':
        case 'explore':
        case 'nvimtree':
        case 'tree':
          setTreeOpen((v) => !v)
          return
        case 'set': {
          const opt = arg.toLowerCase()
          if (opt === 'number' || opt === 'nu') return setNumberMode('absolute')
          if (opt === 'relativenumber' || opt === 'rnu') return setNumberMode('relative')
          if (opt === 'nonumber' || opt === 'nonu') return setNumberMode('off')
          setMessage({ text: `E518: Unknown option: ${arg}`, kind: 'error' })
          return
        }
        case 'colorscheme':
        case 'colo': {
          if (!arg) {
            setMessage({ text: `colorscheme ${theme}  (${THEME_NAMES.join(', ')})`, kind: 'info' })
            return
          }
          if (applyTheme(arg)) {
            setTheme(arg)
            setMessage({ text: `colorscheme ${arg}`, kind: 'info' })
          } else {
            setMessage({ text: `E185: Cannot find color scheme '${arg}'`, kind: 'error' })
          }
          return
        }
        case 'web':
        case 'gui':
        case 'site':
        case 'browser':
          onLeaveEditor?.()
          return
        case 'nohl':
        case 'nohlsearch':
          setSearch({ query: '', index: 0 })
          return
        default:
          setMessage({ text: `E492: Not an editor command: ${input}`, kind: 'error' })
      }
    },
    [activeId, openBuffer, theme, onLeaveEditor],
  )

  const queuePending = useCallback((key: string) => {
    setPending(key)
    if (pendingTimer.current) window.clearTimeout(pendingTimer.current)
    pendingTimer.current = window.setTimeout(() => setPending(''), PENDING_TIMEOUT)
  }, [])

  const clearPending = useCallback(() => {
    if (pendingTimer.current) window.clearTimeout(pendingTimer.current)
    setPending('')
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      const typingInField = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA'

      if (quit) {
        e.preventDefault()
        setQuit(false)
        return
      }
      if (typingInField) return
      if (e.metaKey || (e.ctrlKey && !'dupn'.includes(e.key.toLowerCase()))) return

      const key = e.key

      if (overlay === 'help') {
        if (key === 'Escape' || key === 'q' || key === 'Enter') {
          e.preventDefault()
          setOverlay('none')
        }
        return
      }
      if (overlay === 'telescope') return

      // ---- command / search line ------------------------------------------
      if (mode === 'COMMAND' || mode === 'SEARCH') {
        e.preventDefault()
        if (key === 'Escape') {
          setMode('NORMAL')
          setCmdline('')
          return
        }
        if (key === 'Enter') {
          const value = cmdline
          setMode('NORMAL')
          setCmdline('')
          if (mode === 'COMMAND') execCommand(value)
          else {
            setSearch({ query: value, index: 0 })
            const q = value.toLowerCase()
            const hits = buffer.lines.flatMap((l, i) => (q && l.toLowerCase().includes(q) ? [i] : []))
            const next = hits.find((m) => m > (cursors[activeId] ?? 0)) ?? hits[0]
            if (next === undefined) setMessage({ text: `E486: Pattern not found: ${value}`, kind: 'error' })
            else setCursor(next)
          }
          return
        }
        if (key === 'Backspace') {
          if (cmdline.length === 0) {
            setMode('NORMAL')
            return
          }
          setCmdline((v) => v.slice(0, -1))
          return
        }
        if (key.length === 1) setCmdline((v) => v + key)
        return
      }

      // ---- insert ----------------------------------------------------------
      if (mode === 'INSERT') {
        if (key === 'Escape') {
          e.preventDefault()
          setMode('NORMAL')
          setMessage(null)
          return
        }
        if (key.length === 1) {
          e.preventDefault()
          setMessage({ text: "E21: Cannot make changes, 'modifiable' is off", kind: 'error' })
        }
        return
      }

      // ---- normal / visual -------------------------------------------------
      const seq = pending + key
      const stop = () => e.preventDefault()

      if (key === 'Escape') {
        stop()
        clearPending()
        setVisualAnchor(null)
        setMessage(null)
        setSearch({ query: '', index: 0 })
        return
      }

      if (e.ctrlKey) {
        const k = key.toLowerCase()
        if (k === 'd') {
          stop()
          setCursor((c) => c + HALF_PAGE)
        } else if (k === 'u') {
          stop()
          setCursor((c) => c - HALF_PAGE)
        } else if (k === 'p') {
          stop()
          setPickerMode('files')
          setOverlay('telescope')
        } else if (k === 'n') {
          stop()
          setTreeOpen((v) => !v)
        }
        return
      }

      // multi-key sequences: gg, gt, yy, ]b, <leader>ff, ...
      if (pending) {
        stop()
        clearPending()
        if (seq === ' f') {
          queuePending(' f')
          return
        }
        const combos: Record<string, () => void> = {
          gg: () => setCursor(0),
          gt: () => cycleBuffer(1),
          gT: () => cycleBuffer(-1),
          yy: () => yank(buffer.lines[cursor] ?? '', 1),
          ']b': () => cycleBuffer(1),
          '[b': () => cycleBuffer(-1),
          ' e': () => setTreeOpen((v) => !v),
          ' h': () => openBuffer('about'),
          ' ?': () => setOverlay('help'),
          ' c': () => {
            const i = THEME_NAMES.indexOf(theme)
            const next = THEME_NAMES[(i + 1) % THEME_NAMES.length]
            applyTheme(next)
            setTheme(next)
            setMessage({ text: `colorscheme ${next}`, kind: 'info' })
          },
          ' ff': () => {
            setPickerMode('files')
            setOverlay('telescope')
          },
          ' fg': () => {
            setPickerMode('grep')
            setOverlay('telescope')
          },
        }
        combos[seq]?.()
        return
      }

      switch (key) {
        case 'j':
        case 'ArrowDown':
          stop()
          setCursor((c) => c + 1)
          return
        case 'k':
        case 'ArrowUp':
          stop()
          setCursor((c) => c - 1)
          return
        case 'G':
          stop()
          setCursor(buffer.lines.length - 1)
          return
        case '{': {
          stop()
          const above = buffer.lines.slice(0, cursor).map((l, i) => ({ l, i })).reverse()
          setCursor(above.find(({ l, i }) => l.trim() === '' && i < cursor - 1)?.i ?? 0)
          return
        }
        case '}': {
          stop()
          const below = buffer.lines
            .map((l, i) => ({ l, i }))
            .slice(cursor + 1)
            .find(({ l }) => l.trim() === '')
          setCursor(below?.i ?? buffer.lines.length - 1)
          return
        }
        case 'g':
        case 'y':
        case ']':
        case '[':
        case ' ':
          stop()
          queuePending(key)
          return
        case 'Tab':
          stop()
          cycleBuffer(1)
          return
        case ':':
          stop()
          setMode('COMMAND')
          setCmdline('')
          setMessage(null)
          return
        case '/':
          stop()
          setMode('SEARCH')
          setCmdline('')
          setMessage(null)
          return
        case 'n':
          stop()
          jumpToMatch(1)
          return
        case 'N':
          stop()
          jumpToMatch(-1)
          return
        case 'i':
        case 'a':
        case 'o':
        case 'I':
        case 'A':
          stop()
          setMode('INSERT')
          return
        case 'v':
        case 'V':
          stop()
          setVisualAnchor((prev) => (prev === null ? cursor : null))
          return
        case '?':
          stop()
          setOverlay('help')
          return
        case '`':
        case '~':
          stop()
          onLeaveEditor?.()
          return
        case 'Z':
          stop()
          setQuit(true)
          return
        default:
          if (/^[1-9]$/.test(key)) {
            stop()
            const target = BUFFERS[Number(key) - 1]
            if (target) openBuffer(target.id)
          }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [
    mode,
    cmdline,
    pending,
    overlay,
    quit,
    cursor,
    cursors,
    activeId,
    buffer,
    theme,
    setCursor,
    execCommand,
    cycleBuffer,
    openBuffer,
    jumpToMatch,
    yank,
    queuePending,
    clearPending,
    onLeaveEditor,
  ])

  // visual mode selection follows the cursor
  const visualRange = useMemo(() => {
    if (visualAnchor === null) return null
    return { start: Math.min(visualAnchor, cursor), end: Math.max(visualAnchor, cursor) }
  }, [visualAnchor, cursor])

  const effectiveMode: Mode = visualRange ? 'VISUAL' : mode

  return {
    buffers: BUFFERS,
    buffer,
    openIds,
    activeId,
    cursor,
    setCursor,
    mode: effectiveMode,
    cmdline,
    message,
    setMessage,
    search,
    matches,
    visualRange,
    treeOpen,
    setTreeOpen,
    overlay,
    setOverlay,
    pickerMode,
    setPickerMode,
    numberMode,
    theme,
    quit,
    setQuit,
    pending,
    openBuffer,
    openAt,
    closeBuffer,
    cycleBuffer,
    execCommand,
  }
}

export type Editor = ReturnType<typeof useEditor>

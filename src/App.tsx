import { useCallback, useEffect, useRef, useState } from 'react'
import { Site } from './web/Site'
import { NvimApp } from './nvim/NvimApp'

type Mode = 'web' | 'nvim'

const STORAGE_KEY = 'portfolio:mode'
const SWITCH_MS = 420

function initialMode(): Mode {
  if (typeof window === 'undefined') return 'web'
  const param = new URLSearchParams(window.location.search).get('mode')
  if (param === 'nvim' || param === 'web') return param
  return window.localStorage.getItem(STORAGE_KEY) === 'nvim' ? 'nvim' : 'web'
}

export default function App() {
  const [mode, setMode] = useState<Mode>(initialMode)
  const [switching, setSwitching] = useState<Mode | null>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    document.body.dataset.mode = mode
    try {
      window.localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* private browsing; the mode just will not persist */
    }
  }, [mode])

  useEffect(() => () => timers.current.forEach(window.clearTimeout), [])

  const switchTo = useCallback((next: Mode) => {
    setSwitching(next)
    timers.current.push(
      window.setTimeout(() => {
        setMode(next)
        window.scrollTo({ top: 0 })
      }, SWITCH_MS),
      window.setTimeout(() => setSwitching(null), 950),
    )
  }, [])

  // ` toggles into the editor from the website (the editor handles its own).
  useEffect(() => {
    if (mode !== 'web') return
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '`' || e.key === '~') {
        e.preventDefault()
        switchTo('nvim')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mode, switchTo])

  return (
    <>
      {mode === 'web' ? (
        <Site onEnterNvim={() => switchTo('nvim')} />
      ) : (
        <NvimApp onLeaveEditor={() => switchTo('web')} />
      )}

      {switching && (
        <div className="animate-mode-switch pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-black">
          <div className="font-mono text-sm text-[#9ece6a] sm:text-base">
            <span className="text-[#565f89]">$ </span>
            {switching === 'nvim' ? 'nvim ~/portfolio' : 'open https://mohamadkrayem.dev'}
            <span className="ml-1 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] bg-[#c0caf5]" />
          </div>
        </div>
      )}
    </>
  )
}

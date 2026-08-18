import { useEffect, useRef, useState } from 'react'

/** Fixed atmosphere behind the whole site: drifting orbs, grid, grain. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="animate-drift absolute -top-40 -left-32 h-[36rem] w-[36rem] rounded-full bg-violet/20 blur-[130px]" />
      <div className="animate-drift-slow absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-aqua/12 blur-[130px]" />
      <div className="animate-drift absolute -bottom-52 left-1/3 h-[30rem] w-[30rem] rounded-full bg-violet/10 blur-[140px]" />
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #2a2a3c 1px, transparent 1px), linear-gradient(to bottom, #2a2a3c 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  )
}

/** A soft light that trails the pointer. Pointer devices only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let tx = x
    let ty = y

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const tick = () => {
      x += (tx - x) * 0.12
      y += (ty - y) * 0.12
      if (ref.current) ref.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-10 hidden h-[600px] w-[600px] rounded-full opacity-60 md:block"
      style={{ background: 'radial-gradient(circle, rgb(124 92 255 / 0.10), transparent 62%)' }}
    />
  )
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-50 h-px bg-transparent">
      <div
        className="h-px origin-left bg-gradient-to-r from-violet to-aqua transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

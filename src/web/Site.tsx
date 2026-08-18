import { Backdrop, CursorGlow, ScrollProgress } from './Backdrop'
import { Nav } from './Nav'
import { Hero } from './Hero'
import { Marquee } from './Marquee'
import { About } from './About'
import { Stack } from './Stack'
import { Work, Experience } from './Work'
import { Agentic } from './Agentic'
import { Contact } from './Contact'

export function Site({ onEnterNvim }: { onEnterNvim: () => void }) {
  return (
    <div className="relative min-h-screen font-sans text-ink antialiased">
      <Backdrop />
      <CursorGlow />
      <ScrollProgress />
      <Nav onEnterNvim={onEnterNvim} />

      <main>
        <Hero onEnterNvim={onEnterNvim} />
        <Marquee />
        <About />
        <Stack />
        <Work />
        <Experience />
        <Agentic />
        <Contact onEnterNvim={onEnterNvim} />
      </main>
    </div>
  )
}

const ROW_ONE = ['.NET', 'ASP.NET Core', 'C#', 'Node.js', 'TypeScript', 'React', 'PostgreSQL', 'Redis']
const ROW_TWO = ['RabbitMQ', 'Docker', 'AWS', 'Claude API', 'MCP', 'OpenTelemetry', 'GitHub Actions', 'Vite']

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="group flex overflow-hidden">
      <div
        className={`flex shrink-0 items-center gap-10 pr-10 whitespace-nowrap ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium text-ink-dim/45 md:text-3xl">
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-violet/50" />
          </span>
        ))}
      </div>
    </div>
  )
}

export function Marquee() {
  return (
    <div
      className="relative border-y border-edge bg-surface/30 py-8"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)',
      }}
    >
      <div className="flex flex-col gap-6">
        <Row items={ROW_ONE} />
        <Row items={ROW_TWO} reverse />
      </div>
    </div>
  )
}

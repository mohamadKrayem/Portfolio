import type { Editor } from '../hooks/useEditor'

const MODE_STYLE: Record<string, string> = {
  NORMAL: 'bg-blue text-bg',
  INSERT: 'bg-green text-bg',
  VISUAL: 'bg-magenta text-bg',
  COMMAND: 'bg-yellow text-bg',
  SEARCH: 'bg-yellow text-bg',
}

export function StatusLine({ editor }: { editor: Editor }) {
  const { mode, buffer, cursor } = editor
  const total = buffer.lines.length
  const percent = total <= 1 ? 'All' : `${Math.round((cursor / (total - 1)) * 100)}%`

  return (
    <div className="flex shrink-0 items-stretch bg-bg-float text-[12px] select-none">
      <div className={`px-3 py-1 font-bold tracking-widest ${MODE_STYLE[mode] ?? 'bg-blue text-bg'}`}>{mode}</div>

      <div className="flex items-center gap-1.5 bg-bg-hl px-3 py-1 text-fg-dark">
        <span className="text-magenta">⑂</span>
        <span>main</span>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-1 text-comment">
        <span className="truncate">{buffer.path}</span>
        <span className="hidden text-yellow sm:inline">[RO]</span>
      </div>

      <div className="hidden items-center gap-3 px-3 py-1 text-comment md:flex">
        <span>{buffer.filetype}</span>
        <span>utf-8</span>
        <span>LF</span>
      </div>

      <div className="flex items-center gap-1 bg-bg-hl px-3 py-1 text-fg-dark tabular-nums">
        <span>
          {cursor + 1}:{1}
        </span>
      </div>
      <div className="flex items-center bg-blue px-3 py-1 font-bold text-bg tabular-nums">{percent}</div>
    </div>
  )
}

import type { Editor } from '../hooks/useEditor'
import { FileIcon } from './icons'

export function TabLine({ editor, onLeaveEditor }: { editor: Editor; onLeaveEditor: () => void }) {
  const { buffers, openIds, activeId, openBuffer, closeBuffer, theme } = editor

  return (
    <div className="flex shrink-0 items-stretch overflow-x-auto bg-bg-dark text-[13px] select-none">
      <div className="flex shrink-0 items-center gap-2 border-r border-line px-3 py-1.5 text-comment">
        <span className="text-green">◈</span>
        <span className="hidden sm:inline">NVIM</span>
      </div>

      {openIds.map((id) => {
        const buffer = buffers.find((b) => b.id === id)
        if (!buffer) return null
        const active = id === activeId
        return (
          <div
            key={id}
            onClick={() => openBuffer(id)}
            className={`group flex shrink-0 cursor-pointer items-center gap-2 border-r border-line px-3 py-1.5 transition-colors ${
              active ? 'bg-bg text-fg' : 'bg-bg-dark text-comment hover:text-fg-dark'
            }`}
          >
            <FileIcon filetype={buffer.filetype} />
            <span className={active ? 'text-fg' : ''}>{buffer.name}</span>
            <button
              type="button"
              aria-label={`close ${buffer.name}`}
              onClick={(e) => {
                e.stopPropagation()
                closeBuffer(id)
              }}
              className="text-[11px] text-comment opacity-0 transition group-hover:opacity-100 hover:text-red"
            >
              ✕
            </button>
            {active && <span className="absolute" />}
          </div>
        )
      })}

      <div className="flex-1 border-b border-line" />
      <div className="hidden shrink-0 items-center gap-2 border-l border-line px-3 py-1.5 text-comment md:flex">
        <span className="text-magenta">◐</span>
        <span>{theme}</span>
      </div>
      <button
        type="button"
        onClick={onLeaveEditor}
        title="Back to the website (` or :web)"
        className="flex shrink-0 items-center gap-2 border-l border-line px-3 py-1.5 text-comment transition-colors hover:bg-bg-hl hover:text-green"
      >
        <span className="text-green">`</span>
        <span className="hidden sm:inline">website</span>
      </button>
    </div>
  )
}

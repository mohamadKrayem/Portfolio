import type { Editor } from '../hooks/useEditor'
import { LINKS } from '../data/buffers'
import { FileIcon } from './icons'

export function FileTree({ editor }: { editor: Editor }) {
  const { buffers, activeId, openBuffer, treeOpen, setTreeOpen } = editor

  if (!treeOpen) return null

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-line bg-bg-dark text-[13px] select-none md:w-60">
      <div className="flex items-center justify-between px-3 py-2 text-comment">
        <span className="truncate">~/portfolio</span>
        <button
          type="button"
          onClick={() => setTreeOpen(false)}
          className="text-comment hover:text-red"
          aria-label="close file tree"
        >
          ✕
        </button>
      </div>

      <div className="px-2 pb-2">
        <div className="flex items-center gap-1.5 px-1 py-0.5 text-blue">
          <span>▾</span>
          <span className="font-bold">portfolio</span>
        </div>

        {buffers.map((buffer, i) => {
          const active = buffer.id === activeId
          const last = i === buffers.length - 1
          return (
            <button
              key={buffer.id}
              type="button"
              onClick={() => openBuffer(buffer.id)}
              className={`flex w-full items-center gap-1.5 rounded px-1 py-0.5 text-left transition-colors ${
                active ? 'bg-bg-hl text-fg' : 'text-fg-dark hover:bg-bg-hl/60'
              }`}
            >
              <span className="text-fg-gutter">{last ? '└' : '├'}</span>
              <FileIcon filetype={buffer.filetype} />
              <span className="truncate">{buffer.name}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-auto border-t border-line px-2 py-2">
        <div className="px-1 py-0.5 text-comment">links</div>
        {Object.entries(LINKS).map(([label, href]) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded px-1 py-0.5 text-fg-dark transition-colors hover:bg-bg-hl/60 hover:text-cyan"
          >
            <span className="text-fg-gutter">›</span>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}

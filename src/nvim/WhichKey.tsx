import type { Editor } from '../hooks/useEditor'

const GROUPS: Record<string, [string, string][]> = {
  ' ': [
    ['f', '+find'],
    ['e', 'file tree'],
    ['h', 'home (about.md)'],
    ['c', 'cycle colorscheme'],
    ['?', 'keymaps'],
  ],
  ' f': [
    ['f', 'find files'],
    ['g', 'live grep'],
  ],
  g: [
    ['g', 'top of buffer'],
    ['t', 'next buffer'],
    ['T', 'previous buffer'],
  ],
  y: [['y', 'yank line']],
  ']': [['b', 'next buffer']],
  '[': [['b', 'previous buffer']],
}

export function WhichKey({ editor }: { editor: Editor }) {
  const entries = GROUPS[editor.pending]
  if (!entries) return null

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex justify-center px-3">
      <div className="w-full max-w-lg rounded border border-line bg-bg-float px-3 py-2 text-[12px] shadow-xl">
        <div className="mb-1 text-comment">
          {editor.pending === ' ' ? '<Space>' : editor.pending}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          {entries.map(([key, desc]) => (
            <span key={key} className="whitespace-nowrap">
              <span className="text-yellow">{key}</span>
              <span className="text-comment"> → </span>
              <span className={desc.startsWith('+') ? 'text-blue' : 'text-fg-dark'}>{desc}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

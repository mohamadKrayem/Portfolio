import type { Editor } from '../hooks/useEditor'

const SECTIONS: { title: string; keys: [string, string][] }[] = [
  {
    title: 'motion',
    keys: [
      ['j / k', 'line down / up'],
      ['gg / G', 'top / bottom of buffer'],
      ['C-d / C-u', 'half page down / up'],
      ['{ / }', 'previous / next block'],
      ['click', 'move cursor to line'],
    ],
  },
  {
    title: 'buffers',
    keys: [
      ['Tab / gt', 'next buffer'],
      ['gT / [b', 'previous buffer'],
      ['1 … 6', 'jump to buffer n'],
      [':e about.md', 'open a file'],
      [':ls', 'list buffers'],
    ],
  },
  {
    title: 'find',
    keys: [
      ['<Space>ff / C-p', 'find files'],
      ['<Space>fg', 'live grep'],
      ['/pattern', 'search in buffer'],
      ['n / N', 'next / previous match'],
      [':nohl', 'clear highlight'],
    ],
  },
  {
    title: 'the rest',
    keys: [
      ['<Space>e / C-n', 'toggle file tree'],
      ['<Space>c', 'cycle colorscheme'],
      [':colo gruvbox', 'set colorscheme'],
      ['yy', 'yank line to clipboard'],
      ['v', 'visual line mode'],
      ['i', 'insert mode (good luck)'],
      [':q', 'quit'],
      ['?', 'this window'],
      ['` or :web', 'back to the website'],
    ],
  },
]

export function HelpFloat({ editor }: { editor: Editor }) {
  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-bg-dark/70 p-3 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) editor.setOverlay('none')
      }}
    >
      <div className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded border border-blue/60 bg-bg-float shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-4 py-2 text-[13px]">
          <span className="text-blue">*keymaps.txt*</span>
          <button type="button" onClick={() => editor.setOverlay('none')} className="text-comment hover:text-red">
            esc
          </button>
        </div>

        <div className="grid gap-6 p-4 text-[13px] sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <div className="mb-1 text-magenta">── {section.title} ──</div>
              <table className="w-full">
                <tbody>
                  {section.keys.map(([key, desc]) => (
                    <tr key={key}>
                      <td className="w-[14ch] py-0.5 pr-3 align-top text-yellow whitespace-nowrap">{key}</td>
                      <td className="py-0.5 text-fg-dark">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="border-t border-line px-4 py-2 text-[12px] text-comment">
          Everything here is keyboard-first, but every tab, tree entry and link is clickable too.
        </div>
      </div>
    </div>
  )
}

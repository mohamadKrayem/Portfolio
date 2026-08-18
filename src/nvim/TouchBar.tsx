import type { Editor } from '../hooks/useEditor'

/** Mobile visitors have no keyboard, so the important keymaps get buttons. */
export function TouchBar({ editor, onLeaveEditor }: { editor: Editor; onLeaveEditor: () => void }) {
  const { setOverlay, setPickerMode, setTreeOpen, cycleBuffer } = editor

  const actions: [string, () => void][] = [
    ['tree', () => setTreeOpen((v) => !v)],
    [
      'find',
      () => {
        setPickerMode('files')
        setOverlay('telescope')
      },
    ],
    [
      'grep',
      () => {
        setPickerMode('grep')
        setOverlay('telescope')
      },
    ],
    ['keys', () => setOverlay('help')],
    ['next ›', () => cycleBuffer(1)],
    ['site', onLeaveEditor],
  ]

  return (
    <div className="flex shrink-0 items-stretch gap-px border-t border-line bg-bg-dark text-[12px] md:hidden">
      {actions.map(([label, run]) => (
        <button
          key={label}
          type="button"
          onClick={run}
          className="min-w-0 flex-1 truncate py-2 text-[11px] text-fg-dark active:bg-bg-hl active:text-fg"
        >
          {label}
        </button>
      ))}
    </div>
  )
}

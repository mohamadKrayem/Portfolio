import { useEditor } from '../hooks/useEditor'
import { TabLine } from './TabLine'
import { FileTree } from './FileTree'
import { BufferView } from './BufferView'
import { StatusLine } from './StatusLine'
import { CmdLine } from './CmdLine'
import { Telescope } from './Telescope'
import { HelpFloat } from './HelpFloat'
import { WhichKey } from './WhichKey'
import { QuitScreen } from './QuitScreen'
import { TouchBar } from './TouchBar'

export function NvimApp({ onLeaveEditor }: { onLeaveEditor: () => void }) {
  const editor = useEditor({ onLeaveEditor })

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-bg font-mono text-fg">
      <TabLine editor={editor} onLeaveEditor={onLeaveEditor} />

      <div className="flex min-h-0 flex-1">
        <FileTree editor={editor} />
        <BufferView editor={editor} />
      </div>

      <StatusLine editor={editor} />
      <CmdLine editor={editor} />
      <TouchBar editor={editor} onLeaveEditor={onLeaveEditor} />

      <WhichKey editor={editor} />
      {editor.overlay === 'telescope' && <Telescope editor={editor} />}
      {editor.overlay === 'help' && <HelpFloat editor={editor} />}
      {editor.quit && <QuitScreen editor={editor} onLeaveEditor={onLeaveEditor} />}
    </div>
  )
}

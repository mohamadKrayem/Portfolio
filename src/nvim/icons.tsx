import type { FileType } from '../lib/types'

const COLORS: Record<FileType, string> = {
  markdown: 'text-blue',
  json: 'text-yellow',
  lua: 'text-magenta',
  sh: 'text-green',
  typescript: 'text-cyan',
}

const GLYPHS: Record<FileType, string> = {
  markdown: 'md',
  json: '{}',
  lua: 'lu',
  sh: '$_',
  typescript: 'ts',
}

export function FileIcon({ filetype }: { filetype: FileType }) {
  return (
    <span className={`${COLORS[filetype]} inline-block w-[2ch] text-center text-[0.85em] opacity-90`}>
      {GLYPHS[filetype]}
    </span>
  )
}

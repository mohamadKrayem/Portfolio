export type FileType = 'markdown' | 'json' | 'lua' | 'sh' | 'typescript'

export type Buffer = {
  id: string
  /** file name as shown in the tree / tabline / statusline */
  name: string
  path: string
  filetype: FileType
  lines: string[]
}

export type Mode = 'NORMAL' | 'INSERT' | 'VISUAL' | 'COMMAND' | 'SEARCH'

export type Token = { text: string; cls: string }

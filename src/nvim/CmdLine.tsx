import type { Editor } from '../hooks/useEditor'

export function CmdLine({ editor }: { editor: Editor }) {
  const { mode, cmdline, message, pending, matches, search } = editor
  const typing = mode === 'COMMAND' || mode === 'SEARCH'
  const prefix = mode === 'COMMAND' ? ':' : '/'

  return (
    <div className="flex h-7 shrink-0 items-center justify-between gap-4 bg-bg-dark px-3 text-[13px] select-none">
      <div className="min-w-0 flex-1 truncate">
        {typing ? (
          <span className="text-fg">
            {prefix}
            {cmdline}
            <span className="ml-px inline-block h-[1.1em] w-[1ch] translate-y-[0.2em] bg-fg/80" />
          </span>
        ) : message ? (
          <span className={message.kind === 'error' ? 'text-red' : 'text-fg-dark'}>{message.text}</span>
        ) : search.query ? (
          <span className="text-comment">
            /{search.query}
            <span className="ml-2">
              {matches.length} match{matches.length === 1 ? '' : 'es'}
            </span>
          </span>
        ) : (
          <span className="text-comment">
            press <span className="text-yellow">?</span> for keymaps ·{' '}
            <span className="text-yellow">&lt;Space&gt;ff</span> to find files ·{' '}
            <span className="text-yellow">:e about.md</span> ·{' '}
            <span className="text-green">`</span> for the website
          </span>
        )}
      </div>
      <div className="shrink-0 text-yellow tabular-nums">{pending.trim() === '' && pending ? '␣' : pending}</div>
    </div>
  )
}

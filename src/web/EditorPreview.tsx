import { BUFFERS } from '../data/buffers'
import { tokenize } from '../lib/highlight'

const PREVIEW_LINES = 14

/**
 * A non-interactive miniature of the nvim mode, rendered from the same buffer
 * and tokenizer the real editor uses. Click it to switch modes.
 */
export function EditorPreview({ onEnterNvim }: { onEnterNvim: () => void }) {
  const buffer = BUFFERS[0]
  const lines = buffer.lines.slice(0, PREVIEW_LINES)

  return (
    <button
      type="button"
      onClick={onEnterNvim}
      aria-label="Open the Neovim version of this portfolio"
      className="group relative block w-full rotate-[-1.5deg] text-left transition-transform duration-500 hover:rotate-0 hover:-translate-y-1"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-violet/12 blur-3xl transition-opacity duration-500 group-hover:opacity-90" />

      <div className="overflow-hidden rounded-xl border border-edge bg-bg-dark font-mono shadow-2xl shadow-black/60 ring-1 ring-white/5">
        <div className="flex items-center gap-2 border-b border-line px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow" />
          <span className="h-2.5 w-2.5 rounded-full bg-green" />
          <span className="ml-2 text-[11px] text-comment">~/portfolio — nvim</span>
        </div>

        <div className="flex border-b border-line text-[11px]">
          <span className="border-r border-line bg-bg px-3 py-1.5 text-fg">about.md</span>
          <span className="border-r border-line px-3 py-1.5 text-comment">skills.json</span>
          <span className="hidden border-r border-line px-3 py-1.5 text-comment sm:inline">projects.lua</span>
        </div>

        <div
          className="overflow-hidden bg-bg py-2 pr-3 pl-1 text-[10.5px] leading-[1.6]"
          style={{
            maskImage: 'linear-gradient(to right, #000 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, #000 88%, transparent)',
          }}
        >
          {lines.map((line, i) => (
            <div key={i} className={`flex ${i === 0 ? 'bg-bg-hl/70' : ''}`}>
              <span className={`w-[3.5ch] shrink-0 pr-2 text-right ${i === 0 ? 'text-orange' : 'text-fg-gutter'}`}>
                {i === 0 ? 1 : i}
              </span>
              <pre className="overflow-hidden whitespace-pre">
                {tokenize(line, buffer.filetype).map((token, t) => (
                  <span key={t} className={token.cls}>
                    {token.text}
                  </span>
                ))}
              </pre>
            </div>
          ))}
        </div>

        <div className="flex items-stretch text-[10.5px]">
          <span className="bg-blue px-2.5 py-1 font-bold tracking-widest text-bg">NORMAL</span>
          <span className="bg-bg-hl px-2.5 py-1 text-fg-dark">⑂ main</span>
          <span className="flex-1 bg-bg-float px-2.5 py-1 text-comment">about.md</span>
          <span className="bg-bg-hl px-2.5 py-1 text-fg-dark">1:1</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 font-sans text-xs text-muted transition-colors duration-300 group-hover:text-aqua">
        <span className="rounded border border-edge px-1.5 py-0.5 font-mono">`</span>
        <span>or click to open the editor</span>
      </div>
    </button>
  )
}

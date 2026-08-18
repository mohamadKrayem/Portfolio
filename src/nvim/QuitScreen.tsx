import type { Editor } from '../hooks/useEditor'
import { LINKS } from '../data/buffers'

export function QuitScreen({ editor, onLeaveEditor }: { editor: Editor; onLeaveEditor: () => void }) {
  return (
    <div
      className="absolute inset-0 z-40 cursor-text bg-bg-dark p-6 text-[13px] md:p-10"
      onClick={() => editor.setQuit(false)}
    >
      <div className="mx-auto max-w-2xl leading-6">
        <div>
          <span className="text-green">mohamad@portfolio</span>
          <span className="text-comment">:</span>
          <span className="text-blue">~/portfolio</span>
          <span className="text-comment">$ </span>
          <span>nvim .</span>
        </div>
        <div className="mt-1 text-comment">[Process exited 0]</div>

        <div className="mt-6 text-fg-dark">Thanks for reading.</div>
        <div className="mt-4 grid gap-1">
          <div>
            <span className="text-comment">name    </span>
            <span className="text-fg">Mohamad Krayem</span>
          </div>
          <div>
            <span className="text-comment">role    </span>
            <span className="text-fg">Full Stack Developer · Agentic Systems Engineer</span>
          </div>
          <div>
            <span className="text-comment">stack   </span>
            <span className="text-fg-dark">.NET · Node.js · React · PostgreSQL · Redis · RabbitMQ · Docker · AWS</span>
          </div>
          {Object.entries(LINKS).map(([label, href]) => (
            <div key={label}>
              <span className="text-comment">{label.padEnd(8, ' ')}</span>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-cyan underline decoration-dotted"
              >
                {href.replace('mailto:', '')}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <span className="text-green">mohamad@portfolio</span>
          <span className="text-comment">:</span>
          <span className="text-blue">~/portfolio</span>
          <span className="text-comment">$ </span>
          <span className="inline-block h-[1.1em] w-[1ch] translate-y-[0.2em] bg-fg/80" />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-comment">
          <span>press any key — or click — to reopen the editor</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onLeaveEditor()
            }}
            className="rounded border border-line px-3 py-1 text-fg-dark transition-colors hover:border-green hover:text-green"
          >
            back to the website
          </button>
        </div>
      </div>
    </div>
  )
}

# ~/portfolio

A personal portfolio with two modes over one content source:

- **Website mode** (default) — near-black, animated, scroll-revealed. Hero with
  a typewriter role line and a live miniature of the editor, marquee, glow
  cards, timeline, project grid, contact.
- **nvim mode** — the real thing: buffers, modal keybindings, a file tree, a
  statusline, telescope-style fuzzy finding, and a command line.

Switch with the **nvim mode** button, the backtick key `` ` `` (either
direction), `:web` from inside the editor, or `?mode=nvim` in the URL. The
choice is remembered in `localStorage`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Editing the content

Everything both modes render lives in **`src/data/profile.ts`** — name, intro,
principles, skills, experience, projects, the agentic section, contact. The
website reads it directly; `src/data/buffers.ts` turns the same data into the
nvim buffers (wrapping prose to 72 columns, emitting the `.lua`, `.json` and
`.sh` files). Edit once, both modes update.

Prose supports two inline markers, shared by both modes: `**bold**` and
`` `code` ``.

Placeholders to replace before shipping: company names and dates in
`experience`, the four entries in `projects`, and the GitHub / LinkedIn handles
in `contact`.

## Keymaps

| key | does |
| --- | --- |
| `j` / `k`, `gg` / `G`, `C-d` / `C-u`, `{` / `}` | motion |
| `Tab` / `gt` / `gT`, `1`–`6`, `:e <file>` | buffers |
| `<Space>ff` / `C-p`, `<Space>fg`, `/pattern`, `n` / `N` | find |
| `<Space>e` / `C-n` | file tree |
| `<Space>c`, `:colo <name>` | colorscheme (tokyonight, catppuccin, gruvbox, nord, rosepine) |
| `yy` | yank line to clipboard |
| `i`, `v`, `:q`, `?` | modes, quit, keymaps |
| `` ` `` or `:web` | back to the website |

Mouse and touch work throughout; small screens get a button bar instead of the
tree.

## Layout

```
src/
  App.tsx              mode switching, persistence, transition overlay
  data/profile.ts      all content (edit this)
  data/buffers.ts      renders the profile into nvim buffers
  hooks/useEditor.ts   modal state machine, keymaps, ex-commands
  lib/highlight.ts     small regex tokenizer per filetype
  lib/themes.ts        nvim colorschemes (CSS variables)
  nvim/                tabline, tree, buffer, statusline, cmdline, telescope
  web/                 hero, marquee, sections, backdrop, primitives
```

No animation or UI libraries: reveals are an IntersectionObserver, the
pointer glow is one rAF loop, everything else is CSS.

Deep links work: `/#projects.lua` opens that buffer directly.

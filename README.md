# horsy.run

Marketing site for Horsy (Claude Code plugin). Astro, static, deployed to GitHub Pages on every push to `main`.

```
npm install
npm run dev       # http://localhost:4321
npm run build     # -> dist/
```

- `src/pages/index.astro` assembles the home page from `src/components/*` (one component per section).
- `src/styles/global.css` holds brand tokens and all styles. Brand: ink #16140F, paper #F4F1EA, silk #D9541E.
- `src/scripts/*` are small modules: Lenis smooth scroll, scroll reveal, race lanes, receipt print, lazy video, copy button. All respect `prefers-reduced-motion`.
- `public/media/` holds videos, the gallop sprite, logo and favicons. The terminal demo is rendered from `../motion/terminal-demo` (HyperFrames).

# Diego Crisafulli · Portfolio

Single-page portfolio. Plain semantic HTML, one stylesheet, a small inline behaviour script. No build step, no framework, no runtime transpilation. Designed for GitHub Pages.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Or any other static server (`npx serve`, `caddy file-server`, etc.).

## Build

There isn't one. Edit `index.html` and `style.css` directly.

## Deploy

Static hosting (GitHub Pages):

1. Push to the repo. GitHub Pages will serve `index.html` from the root.
2. Currently served from `https://diegocrisafu.github.io/diegoc55.github.io/` because the repo is named `diegoc55.github.io`.

To serve from a clean root URL, pick one:

- **Rename the repo** to `diegocrisafulli.github.io` (matches the GitHub username). Pages will then serve at `https://diegocrisafulli.github.io/` with no nested path.
- **Custom domain:** add a `CNAME` file at the repo root containing the apex/subdomain (e.g. `diegocrisafulli.com`), configure DNS, then enable the custom domain in Pages settings.

All internal links in `index.html` are path-agnostic (relative or hash-only), so moving the site to a different root won't break them.

## File layout

| File | Purpose |
|------|---------|
| `index.html` | The page |
| `style.css` | All styles |
| `sw.js` | Service worker (offline shell) |
| `manifest.webmanifest` | PWA manifest |
| `favicon.svg`, `social-card.svg` | Icons / OG card |
| `Diego_Resume.pdf` | Résumé download |
| `images/` | Portrait + photos |

`assistant.js`, `chat-config.js`, `script.js`, `about.html`, `blogs.html`, `home.html`, `projects.html`, and `index.refactor.broken.html` are orphans from earlier iterations and are not referenced by the current page. Safe to delete when you're ready.

## License

MIT.

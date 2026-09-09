# Diego Crisafulli · Portfolio

Personal software engineering portfolio, hosted on [GitHub Pages](https://diegocrisafu.github.io/diegoc55.github.io/).

The site uses semantic HTML, CSS, and a small JavaScript file. It has no framework or application build step. Main content, metrics, email links, and navigation work without JavaScript; JavaScript adds disclosure navigation, theme preferences, form feedback, and offline caching.

## Edit and preview

Edit `index.html`, `style.css`, and `behavior.js`. Any static HTTP server can serve the repository root. For example:

```sh
python3 -m http.server 8000
```

The site includes responsive WebP image variants, explicit image dimensions, keyboard accessible navigation, and light/dark themes. Legacy page URLs redirect to the corresponding sections of the current site.

The portfolio uses native vertical scroll snapping. Each page has a minimum height equal to the viewport minus the measured sticky header. Work projects and employers have individual pages. Oversized content stays in normal document flow so smaller screens and zoom do not clip text. The top index tracks all pages, with section highlighting and previous/next links. Reduced motion preferences use proximity snapping and instant anchor navigation.

## Rebuild the résumé

The downloadable résumé is generated from `resume.json`. Install ReportLab in your Python environment, then run:

```sh
python3 scripts/build_resume.py
```

This updates `Diego_Resume.pdf`. Keep its education, dates, contact links, and work descriptions consistent with `index.html`. The generator follows the original classic serif layout: centered contact header, black section rules, compact role headings, and experience before education. It embeds the bundled Portfolio Resume Serif fonts and preserves selectable text and clickable links. Review the resulting PDF before publishing it.

## Publish

Push the site files and generated PDF to `main`; the repository's GitHub Pages deployment publishes the root directory. The repository name makes the current site a project site under `/diegoc55.github.io/`.

When changing CSS or JavaScript, update their query versions in `index.html`, the matching `CORE` entries in `sw.js`, and the service worker cache name together. Navigation uses the network when available, with cached documents for offline use.

## Main files

| File                                     | Purpose                                    |
| ---------------------------------------- | ------------------------------------------ |
| `index.html`                             | Portfolio content and metadata             |
| `style.css`                              | Layout, themes, and responsive styles      |
| `behavior.js`                            | Navigation, themes, and contact validation |
| `resume.json`                            | Editable public résumé content             |
| `scripts/build_resume.py`                | PDF generator                              |
| `Diego_Resume.pdf`                       | Downloadable résumé                        |
| `sw.js`                                  | Offline document and asset caching         |
| `images/*_480.webp`, `images/*_960.webp` | Responsive photos                          |

The `server/` and `server-worker/` directories and the older `assistant.js`, `chat-config.js`, and `script.js` belong to earlier experiments and are not loaded by the current homepage.

## License

MIT for site code. Bundled fonts use the SIL Open Font License in `assets/fonts/LICENSE`.

# Diego Crisafulli · Portfolio

Personal software engineering portfolio, hosted on [GitHub Pages](https://diegocrisafu.github.io/diegoc55.github.io/).

The site uses semantic HTML, CSS, and a small JavaScript file. It has no framework or application build step. Main content, metrics, email links, and navigation work without JavaScript; JavaScript adds disclosure navigation, theme preferences, form feedback, and offline caching.

## Edit and preview

Edit `index.html`, `style.css`, and `behavior.js`. Any static HTTP server can serve the repository root. For example:

```sh
python3 -m http.server 8000
```

The site includes responsive WebP image variants, explicit image dimensions, keyboard accessible navigation, and light/dark themes. Legacy page URLs redirect to the corresponding sections of the current site.

The portfolio uses normal document scrolling in six sections: Home, Experience, Projects, Skills, About me, and Contact. Only the opening fills the viewport. The sticky navigation follows the active section. Native disclosures keep employer details and personal photos available without turning the page into a second résumé. Older work anchors still open their containing disclosure. Reduced motion preferences use instant anchor navigation.

The design retains the cream background and coffee illustration, with self-hosted Uncut Sans replacing the previous type pairing. The type scale advances by 1.25; reading text and headings use 1.5 leading. Hero and project layouts use 12 desktop, 8 tablet and 4 phone columns. Experience connects each employer to labeled technology icons and a short contribution. It stacks below 900px; no essential information depends on hover.

SceneBreaker appears only in Projects, not on the opening screen. Every project has an actual capture, original identity asset, or explicitly labeled system sketch. See `images/PROVENANCE.md` and `assets/icons/README.md`. The SceneBreaker source link targets its implementation branch; update it after verifying a merge.

## Verify changes

Run the dependency-free regression checks:

```sh
node --test tests/portfolio.test.mjs
node --check behavior.js
node --check sw.js
```

Before publishing, inspect all six sections at desktop, tablet and phone widths; verify direct navigation, employer disclosures, mobile-menu Escape/focus restoration, theme changes without scroll jumps, and contact hints. Do not send a real contact message as a smoke test. Verify the demo/source links and keep SceneBreaker’s manual tracing, approximate 3D collision boxes and non-safety limitation explicit.

## Résumé source and maintenance

The current `Diego_Resume.pdf` is the exact one-page PDF supplied by Diego on October 7, 2026: `DIEGO CRISAFULLI_Data Engineer Intern_20261007.pdf`. SHA-256: `b3123bb12baabd8f410f2880d860fa625b62c15afb4f51cfeeb128ce42e1d988`. The original download was not modified.

`resume.json` and the generator are retained as legacy editing sources; they are **not** the source of the currently published download. Do not run the generator over the supplied PDF without an explicit request. For a separately requested generated revision, install ReportLab and run:

```sh
python3 scripts/build_resume.py
```

This replaces `Diego_Resume.pdf`. Back up the supplied PDF first. The generator follows a separate classic serif layout and embeds the bundled Portfolio Resume Serif fonts. Review any generated revision before publishing it. The website’s current skill grouping and personal language priorities come from Diego’s October 8 feedback; the supplied PDF is deliberately kept unchanged.

## Publish

Push the site files and generated PDF to `main`; the repository's GitHub Pages deployment publishes the root directory. The repository name makes the current site a project site under `/diegoc55.github.io/`.

When changing CSS or JavaScript, update their query versions in `index.html`, the matching `CORE` entries in `sw.js`, and the service worker cache name together. Navigation uses the network when available, with cached documents for offline use.

## Main files

| File                                         | Purpose                                    |
| -------------------------------------------- | ------------------------------------------ |
| `index.html`                                 | Portfolio content and metadata             |
| `style.css`                                  | Layout, themes, and responsive styles      |
| `behavior.js`                                | Navigation, themes, and contact validation |
| `resume.json`                                | Editable public résumé content             |
| `scripts/build_resume.py`                    | PDF generator                              |
| `Diego_Resume.pdf`                           | Downloadable résumé                        |
| `sw.js`                                      | Offline document and asset caching         |
| `images/*_480.webp`, `images/*_960.webp`     | Responsive photos                          |
| `privacy.html`, `terms.html`, `cookies.html` | Privacy, terms, and cookie policies        |

The `server/` and `server-worker/` directories and the older `script.js` belong to earlier experiments and are not loaded by the current homepage.

## Privacy and third parties

Pages load no third-party resources. The current web font is self-hosted in `assets/fonts/uncut/`; icons and project previews are local. FormSubmit receives the contact form only after the visitor consents and sends it. `privacy.html` and `cookies.html` describe this behavior. Update them before adding analytics, embeds, external fonts, or other services.

## License

MIT for site code. Bundled fonts use the SIL Open Font License: see `assets/fonts/LICENSE` for the résumé fonts and `assets/fonts/uncut/LICENSE.txt` for the current web font. Legacy fonts remain in `assets/fonts/web/`. Icon libraries have separate notices in `assets/icons/`; brand marks remain their owners’ trademarks.

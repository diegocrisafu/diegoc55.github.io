# Roadmap – diegoc55.github.io

This roadmap outlines the next high‑ROI improvements planned for the
portfolio site.  Each item links back to the Value Plan for context.

1. **Accessibility overhaul** – Add alt attributes to all images, use
   semantic HTML (`nav`, `main`, `footer`), and add ARIA labels to
   interactive elements like the dark‑mode toggle and chat controls.

2. **Mobile navigation** – Introduce a hamburger menu that toggles the
   navigation links on smaller screens.  Ensure keyboard navigation and
   focus management are handled correctly.

3. **CI setup** – Create a GitHub Actions workflow that runs
   `htmlhint`/`stylelint` and an accessibility linter (e.g. pa11y)
   against changed files.  Failing tasks should block merges.

4. **Asset bundling and optimization** – Migrate the site to a local
   build tool (e.g. Vite or Parcel) to bundle and minify JavaScript and
   CSS, reduce HTTP requests and improve load time.  This change will
   require updating the repository structure and deployment strategy.

5. **Progressive Web App** – Add a `manifest.json` and service worker
   using Workbox to enable offline support, caching and the ability to
   install the site on mobile devices.
# Value Plan – diegoc55.github.io

This document captures initial enhancement opportunities for the personal
portfolio site and scores them using the **ICE** framework (Impact ×
Confidence ÷ Effort).  Higher scores indicate greater value relative to
implementation effort.

| Opportunity | Impact | Confidence | Effort | ICE | Notes |
| --- | --- | --- | --- | --- | --- |
| **Improve accessibility:** add alternative text for all images, use semantic HTML elements and ARIA labels for interactive controls | 5 | 9 | 3 | **15.0** | High accessibility benefits with low effort. |
| **Responsive navigation:** implement a hamburger menu and collapse the nav links on small screens for better mobile UX | 7 | 8 | 5 | **11.2** | Ensures the site is usable on phones and tablets. |
| **Continuous integration:** set up GitHub Actions to run HTML/CSS linters and accessibility audits on each PR | 4 | 8 | 3 | **10.7** | Automates quality checks and catches regressions early. |
| **Asset optimization:** migrate CDN imports to a local build (e.g. Vite) and minify JS/CSS assets | 5 | 7 | 6 | **5.8** | Improves load times but requires refactoring the current setup. |
| **Progressive Web App:** add manifest and service worker for offline support and installability | 4 | 6 | 6 | **4.0** | Nice to have; lower impact relative to effort. |

### Priorities

The highest‑ROI task is improving accessibility since it requires little
effort and benefits all users.  Next is implementing a responsive
navigation for mobile.  CI setup should follow to catch issues
automatically.  Asset optimization and PWA support can be tackled
afterwards.
# PR: Hero Reveal + Top Bleed Fix + Contact CTA Cleanup

Summary: Adds an optional, performant “Erase to Reveal” canvas hero with accessibility and rollback controls, resolves top background bleed at scroll-top, and removes the confusing Contact vCard CTA.

## Feature Overview
- Canvas scratch-to-reveal overlay with blurred image
- Auto-fade at ~60% cleared (downscaled alpha sampling)
- Reduced-motion: crossfade (no scratch)
- Offscreen pause via IntersectionObserver
- Kill-switch: `body[data-hero-reveal="on|off"]`
- “Reveal instantly” button for keyboard/motion-sensitive users

## Files Changed
- `index.html`: Hero markup (underlay `<img>` + `<canvas>` + button), wipe script, preloads, contact CTA cleanup
- `style.css`: Underlay and button styles; navbar/top-bleed fixes; hero overlay tweaks
- `README.md`: Flag + budgets + test plan

## Accessiblity & UX
- Canvas `aria-hidden="true"`; hero has descriptive `aria-label`
- Keyboard-accessible “Reveal instantly” button
- Skip link fixed (`class` attr) and visible on focus
- Prefers-reduced-motion honored

## Performance Guardrails (Budgets)
- LCP ≤ 1.8s (mobile emulation)
- CLS ≤ 0.02
- Long tasks (>50ms) ≤ 5 during hero interaction

LCP Hints:
- Underlay `img` flagged `loading="eager"` + `fetchpriority="high"` + `decoding="async"`
- Preloaded both overlay and underlay assets
- Canvas erasing throttled for sampling; work paused offscreen

## Top Bleed Fixes
- `html/body` use tokenized background
- Navbar uses `var(--surface)` + `border-bottom`
- `#home.section { border-top: 1px solid transparent; }` prevents margin-collapse
- Overscroll behavior contained

## QA Checklist
- Desktop Chrome/Firefox/Safari: hero reveal works; offscreen pause; no top bleed
- iOS Safari: touch scratch smooth; scroll doesn’t lock; down arrow clickable
- Reduced motion: instant crossfade
- Keyboard: “Reveal instantly” works; skip link focus visible
- No CLS: hero area maintains size; preloaded images present

## How to Test Locally
```bash
# Serve static site
python3 -m http.server 8000
# Open in browser
open http://localhost:8000
```

Lighthouse (CLI option):
```bash
# Using Node 18+ (optional)
npx lighthouse http://localhost:8000 --preset=desktop --view
npx lighthouse http://localhost:8000 --preset=mobile --view
```
Record LCP/CLS/Long Tasks and confirm vs budgets above.

## Rollback Strategy
- Immediate: set `data-hero-reveal="off"` on `<body>`
- If needed, remove the wipe `<script>` block and canvas markup; underlay hero remains intact

## Notes
- Assets used: `images/Golden Trunks and Blue Sky.png` (overlay), `images/img_trees.png` (underlay)
- Contact vCard button removed to reduce decision fatigue; success CTAs maintained

# Diego Crisafulli Portfolio

This project contains the source for a simple single‑page portfolio website built with **React** and vanilla CSS.  It summarises Diego Crisafulli’s professional profile—including his summary, skills, experience, projects and education—based on the provided résumés.  The app is designed to run directly in the browser using CDN links for React and Babel, so there is no build step required.

## Usage

To view the portfolio locally:

1. Open `index.html` in a web browser.  No additional dependencies are required because the page pulls React and Babel from content‑delivery networks.
2. Scroll through the sections to see the About, Skills, Experience, Projects, Education and Contact information.
3. Use the **Dark Mode** toggle in the navigation bar to switch between light and dark themes.
4. Click the **Download Résumé** button in the hero section to obtain a PDF copy of the résumé (update the link in `index.html` to point to your actual CV).

5. Hover over the floating **chat** icon in the bottom‑right corner to reveal a personal assistant chatbot.  The assistant can answer questions about skills, experience, projects, education, contact info, plus small‑talk (greetings, thanks, "how are you", a joke). It now remembers your name (e.g. say "I'm Alex") and recent topics for short follow‑ups ("tell me more" / "that one"). A badge shows whether a response was Remote or Local.

6. Explore the **Featured Projects** section to learn about additional applications such as the real‑time data dashboard and expense tracker.  Links to their GitHub repositories and deployed pages are provided.

7. Enable AI‑powered responses for the chatbot via a small backend proxy that calls Google Gemini:

  - Production: Deploy the Cloudflare Worker in `server-worker/` and set its secret `GEMINI_API_KEY` in the Cloudflare Dashboard. Then set the site’s backend base in `chat-config.js` to your Worker URL (no trailing slash).
  - Local dev: Run the Node proxy in `server/` (set `GEMINI_API_KEY` in `.env`, `npm install`, `npm start`) and set `window.CHAT_API_BASE = 'http://localhost:8787'` in `chat-config.js`.

  If the backend isn’t configured or reachable, the assistant automatically falls back to local responses and shows a Local badge. Use the in‑chat Auto/Local toggle to force local mode.

### Assistant Features Summary

| Feature | Description |
|---------|-------------|
| Local knowledge base | Preloaded portfolio facts (skills, experience, projects, education, contact, summary). |
| Remote model (Gemini) | Optional; proxied via Node server or Cloudflare Worker. |
| Automatic fallback | If remote fails or key missing, switches to local seamlessly. |
| Mode badge | Displays Remote or Local for each bot reply. |
| Force Local toggle | Click Auto/Local button in chat header to disable remote calls. |
| Name memory | Learns your name via "I'm X" / "my name is X" and greets you personally. |
| Topic follow‑ups | Phrases like "tell me more" or pronouns refer back to last topic. |
| Fuzzy matching | Accepts minor typos (Levenshtein distance ≤ 1) for category keywords. |
| Small‑talk | Greetings, thanks, how‑are‑you, lightweight joke. |
| Context to model | Sends short recent history to remote model for coherence. |

To modify behaviour, edit `assistant.js`. Service worker version (`sw.js`) is bumped when assistant logic changes (currently static-v10) ensuring cache refresh.

## Customisation

- **Styling:** Edit `style.css` to adjust colours, fonts, spacing or layout.  Variables at the top of the file define the basic colour palette.
- **Content:** Modify the JSX within the `<script type="text/babel">` tag in `index.html` to update the text, add or remove experience entries or projects, or change contact details.

  Additionally, you can customise the behaviour of the chatbot by editing the `getAIReply` helper and the chat UI in `index.html`. The current implementation calls your proxy at `${CHAT_API_BASE}/api/chat`, which forwards to Gemini 1.5 Flash.

## Deployment

This project is ready for deployment to GitHub Pages or any static web host.  Simply commit the files to the root of a GitHub Pages repository (e.g. `<username>.github.io`) and enable Pages in repository settings.  GitHub will serve the site automatically.

## License

This project is released under the MIT license.  See `LICENSE` for details.
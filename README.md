# Diego Crisafulli Portfolio

This project contains the source for a simple single‑page portfolio website built with **React** and vanilla CSS.  It summarises Diego Crisafulli’s professional profile—including his summary, skills, experience, projects and education—based on the provided résumés.  The app is designed to run directly in the browser using CDN links for React and Babel, so there is no build step required.

## Usage

To view the portfolio locally:

1. Open `index.html` in a web browser.  No additional dependencies are required because the page pulls React and Babel from content‑delivery networks.
2. Scroll through the sections to see the About, Skills, Experience, Projects, Education and Contact information.
3. Use the **Dark Mode** toggle in the navigation bar to switch between light and dark themes.
4. Click the **Download Résumé** button in the hero section to obtain a PDF copy of the résumé (update the link in `index.html` to point to your actual CV).

5. Hover over the floating **chat** icon in the bottom‑right corner to reveal a personal assistant chatbot.  The assistant can answer basic questions about the site and guide you to different sections.

6. Explore the **Featured Projects** section to learn about additional applications such as the real‑time data dashboard and expense tracker.  Links to their GitHub repositories and deployed pages are provided.

7. Enable AI‑powered responses for the chatbot by defining an OpenAI API key.  Before loading `index.html`, set a global `OPENAI_API_KEY` property on the `window` object in the browser console:

   ```js
   window.OPENAI_API_KEY = 'your‑openai‑api‑key';
   ```

   Without a key the chatbot will fall back to canned responses.

## Customisation

- **Styling:** Edit `style.css` to adjust colours, fonts, spacing or layout.  Variables at the top of the file define the basic colour palette.
- **Content:** Modify the JSX within the `<script type="text/babel">` tag in `index.html` to update the text, add or remove experience entries or projects, or change contact details.

  Additionally, you can customise the behaviour of the chatbot by modifying the `ChatBot` component in `index.html`—for example, changing the initial greeting or how it responds to user input.

  To integrate ChatGPT, see the `getChatGPTReply` helper function in `index.html`.  It uses the `OPENAI_API_KEY` variable to call the OpenAI API.  You can adjust the prompt, model or message structure as needed.

## Deployment

This project is ready for deployment to GitHub Pages or any static web host.  Simply commit the files to the root of a GitHub Pages repository (e.g. `<username>.github.io`) and enable Pages in repository settings.  GitHub will serve the site automatically.

## License

This project is released under the MIT license.  See `LICENSE` for details.
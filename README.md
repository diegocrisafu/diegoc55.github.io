# Diego Crisafulli Portfolio

This project contains the source for a simple single‑page portfolio website built with **React** and vanilla CSS.  It summarises Diego Crisafulli’s professional profile—including his summary, skills, experience, projects and education—based on the provided résumés.  The app is designed to run directly in the browser using CDN links for React and Babel, so there is no build step required.

## Usage

To view the portfolio locally:

1. Open `index.html` in a web browser.  No additional dependencies are required because the page pulls React and Babel from content‑delivery networks.
2. Scroll through the sections to see the About, Skills, Experience, Projects, Education and Contact information.
3. Use the **Dark Mode** toggle in the navigation bar to switch between light and dark themes.
4. Click the **Download Résumé** button in the hero section to obtain a PDF copy of the résumé (update the link in `index.html` to point to your actual CV).

## Customisation

- **Styling:** Edit `style.css` to adjust colours, fonts, spacing or layout.  Variables at the top of the file define the basic colour palette.
- **Content:** Modify the JSX within the `<script type="text/babel">` tag in `index.html` to update the text, add or remove experience entries or projects, or change contact details.

## Deployment

This project is ready for deployment to GitHub Pages or any static web host.  Simply commit the files to the root of a GitHub Pages repository (e.g. `<username>.github.io`) and enable Pages in repository settings.  GitHub will serve the site automatically.

## License

This project is released under the MIT license.  See `LICENSE` for details.
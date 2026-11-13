# ECOAI — AI-Powered Environmental Awareness & Sustainability Platform

A responsive static website project prepared for a 5th Semester VTU Artificial Intelligence academic demonstration.

## Files
- `index.html` — website structure and content
- `style.css` — responsive visual design
- `script.js` — interactive demo features
- `README.md` — setup and deployment guide

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a browser.
3. For best results, use a local development server (for example, VS Code Live Server).

## Publish free with GitHub Pages
1. Sign in at https://github.com/
2. Create a **Public** repository named `ecoai`.
3. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch `main` and folder `/ (root)`, then click **Save**.
7. Wait for the deployment to finish. Your URL will look like:
   `https://YOUR-GITHUB-USERNAME.github.io/ecoai/`

## Important project notes
- Dashboard figures are illustrative sample values, not live measurements.
- Pollution image analysis is a simulated UI demonstration. It does not run a trained computer-vision model.
- EcoBot uses predefined educational responses. It is not connected to a generative AI API.
- The carbon calculator uses simplified illustrative factors and is not an audited carbon accounting tool.
- Challenge progress is stored in the browser's local storage on the device.

## Suggested future extensions
- Connect a real air-quality API and clearly show source, timestamp and location.
- Train or integrate a computer-vision model for waste / water / land image classification.
- Connect a secure backend and an LLM API for EcoBot. Never put private API keys in frontend JavaScript.
- Replace illustrative carbon factors with a documented regional methodology.

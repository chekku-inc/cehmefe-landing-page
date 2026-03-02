# Deploy CEHMEFE to GitHub Pages

## One-time setup

1. **Create the repo** in your org (e.g. `your-org/cehmefe`). Do **not** add a README, .gitignore, or license (this project already has them).

2. **Set `base` and `homepage`**  
   If the repo name is **not** `cehmefe`:
   - In `vite.config.mts`, set `base: '/YOUR_REPO_NAME/'`.
   - In `package.json`, set `"homepage": "https://YOUR_ORG.github.io/YOUR_REPO_NAME"`.

3. **Push the code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: CEHMEFE landing"
   git branch -M main
   git remote add origin https://github.com/YOUR_ORG/cehmefe.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Repo **Settings** → **Pages**
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.

After the first push, the **Deploy to GitHub Pages** workflow will run. When it finishes, the site will be at:

**https://YOUR_ORG.github.io/cehmefe/**

(Use your org and repo name if you changed them.)

---

## Deploy again

- **From GitHub:** Push to `main`; the Actions workflow will build and deploy.
- **From your machine:** Run `npm run deploy` to build and push the `dist` folder to the `gh-pages` branch (only if you use that method instead of Actions).

# BuiltByAnnaGaleano — Static Portfolio

This repository is a static portfolio site intended to be hosted via GitHub Pages.

What I added for GitHub Pages compatibility
- `.nojekyll` — prevents GitHub Pages from running Jekyll which can ignore files or directories that start with `_` or otherwise alter site output.

How to preview locally
1. From the repository root run a simple static server (Python 3):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Quick deploy to GitHub Pages (project pages)
1. Push your repository to GitHub (if not already):

```bash
git add .
git commit -m "Prepare site for GitHub Pages: standardized headers, add .nojekyll and README"
git push origin main
```

2. In the GitHub repository settings → Pages:
   - Source: `main` branch
   - Folder: `root` (/) 
   - Save. GitHub Pages will publish at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

Notes about URLs and paths
- The site uses relative asset paths (e.g. `assets/css/main.css`) so it will work both as a user/organization site and as a project site.
- If you plan to host at a custom domain, create a `CNAME` file containing the domain (I can add this if you provide the domain).

Optional improvements I can make
- Add a small `backups/` directory with timestamped copies of modified files.
- Run an automated HTML validation and a quick visual smoke-test (headless screenshots).
- Add a tiny GitHub Actions workflow to auto-deploy on push (not needed for Pages but useful for build steps).

If you want, I can create backups now and/or add a `CNAME` file. Tell me what to do next.
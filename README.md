# Eric Ariel De La Paz — Portfolio

Static site, no build step. Plain HTML/CSS/JS.

## Structure
```
index.html
case-studies/
  secureid.html
  honda.html
  devtective.html
  vextaro.html
assets/
  css/style.css
  js/main.js
  Eric_De_La_Paz_Resume.pdf
```

## Deploy to GitHub Pages
1. Create a new repo on GitHub (e.g. `portfolio` or `<username>.github.io` if you want it at the root domain).
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Portfolio v2: recruiter-focused redesign"
   git branch -M main
   git remote add origin https://github.com/EricArielDeLaPaz/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from branch → main / (root)** → Save.
4. Your site publishes at `https://EricArielDeLaPaz.github.io/<repo-name>/`
   (or `https://EricArielDeLaPaz.github.io/` if the repo is named `EricArielDeLaPaz.github.io`).

## To edit later
- Content lives directly in each `.html` file — no templating, so just edit the text in place.
- Shared look and feel (colors, spacing, cards) lives in `assets/css/style.css`.
- Swap `assets/Eric_De_La_Paz_Resume.pdf` whenever your resume updates — the link on every page points to that filename.

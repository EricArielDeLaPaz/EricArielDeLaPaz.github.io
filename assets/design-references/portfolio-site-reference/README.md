# Eric Ariel De La Paz — Portfolio

A single-page site styled as a Figma Slides workspace: tab strip, file bar, a home
dashboard (sidebar + card grid), and per-project slide decks with a slide rail.
No build step, no framework — plain HTML/CSS/JS in one file.

## Structure
```
index.html                         ← the whole site
assets/
  Eric_De_La_Paz_Resume.pdf        ← linked from the sidebar "Documents" item
```

## Deploy to GitHub Pages
1. Create a new repo on GitHub (e.g. `portfolio`, or `EricArielDeLaPaz.github.io` for the clean root URL).
2. From this folder:
   ```
   git init
   git add .
   git commit -m "Portfolio: Figma-workspace-styled site"
   git branch -M main
   git remote add origin https://github.com/EricArielDeLaPaz/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source → Deploy from a branch** → Branch `main` / `(root)` → **Save**.
4. Site publishes at `https://EricArielDeLaPaz.github.io/<repo-name>/`.

## To edit later
- Everything — copy, project cards, slide content — lives in the `DECKS` and `HOME_CARDS`
  JavaScript objects near the bottom of `index.html`. Edit the text there; the page
  re-renders itself from that data, no templating needed.
- Colors and type live in the `:root` block at the top of the `<style>` tag.
- Swap `assets/Eric_De_La_Paz_Resume.pdf` whenever your resume updates.

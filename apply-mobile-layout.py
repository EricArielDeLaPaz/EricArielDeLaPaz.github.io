#!/usr/bin/env python3
"""Mobile layout + text size fixes. Run from the ROOT of EricArielDeLaPaz.github.io:
    python3 apply-mobile-layout.py
Appends one clearly marked block to the END of assets/css/style.css (nothing else is touched).
To undo: delete everything from the "/* MOBILE LAYOUT" comment to the end of the file."""
import pathlib, sys
CSS = pathlib.Path('assets/css/style.css')
css = CSS.read_text(encoding='utf-8')
if 'MOBILE LAYOUT + TEXT SIZE' in css:
    print('NOTHING WAS WRITTEN: already applied.'); sys.exit(1)

block = r"""
/* ===== MOBILE LAYOUT + TEXT SIZE (phones, 760px and under) ===== */
@media(max-width:760px){
  /* 1. The whole page scrolls: toolbar, profile banner, nav and content move together */
  html,body.workspace-page,body.case-study-page{ height:auto!important; min-height:100vh; overflow:visible!important; }
  .workspace-toolbar{ position:static!important; }
  .workspace-shell,.case-study-page .workspace-shell{ display:block!important; height:auto!important; min-height:0!important; }
  .workspace-main,.case-study-page .workspace-main{ display:block!important; height:auto!important; overflow:visible!important; }
  .workspace-file,.workspace-file[data-page="hero"],.workspace-content{ height:auto!important; overflow:visible!important; }
  /* 2. Remove the empty space under Home / Earlier Work / Recent Work */
  .workspace-rail{ height:auto!important; overflow:visible!important; padding-bottom:6px!important; }
  .workspace-rail nav{ overflow-x:auto; padding-bottom:2px; }
  .rail-profile{ padding:8px 0 6px!important; }
  /* 3. Smaller text for titles and body copy on phones (small labels stay at 12px) */
  .hero-slide h1{ font-size:clamp(18px,5.4vw,23px)!important; line-height:1.25; }
  .hero-slide-footer strong{ font-size:15px!important; line-height:1.55!important; }
  .hero-slide h1{ margin-bottom:6px!important; }
  .hero-slide-footer{ margin-top:22px!important; }
  .hero-canvas{ min-height:0!important; padding:12px!important; }
  .hero-slide{ height:auto!important; min-height:340px!important; padding:24px 20px 20px!important; }
  .page-heading h1,.workspace-hero h1{ font-size:clamp(24px,7vw,30px)!important; }
  .page-heading p{ font-size:13px; }
  .hero-internships h2,.file-section h2{ font-size:17px!important; }
  .intern-card p{ font-size:12.5px; line-height:1.5; }
  .cs-hero h1{ font-size:clamp(26px,8vw,34px)!important; }
  .cs-hero .tagline{ font-size:15px!important; }
  .cs-section h2{ font-size:20px!important; line-height:1.25; }
  .cs-section p{ font-size:15px!important; line-height:1.55!important; }
  .reasoning-chain.compact .chain-step .v{ font-size:13px!important; }
  /* 4. Case-study slides grow with their content instead of scrolling inside a box */
  .case-study-deck{ height:auto!important; }
  .case-study-deck .hero-canvas{ height:auto!important; }
  .case-study-deck .case-study-slide{ height:auto!important; overflow:visible!important; }
}

/* ===== DESKTOP: slightly smaller body text, same meaning ===== */
@media(min-width:761px){
  .hero-slide-footer strong{ font-size:17px; }
  .cs-section p{ font-size:16px; }
  .cs-hero .tagline{ font-size:16px; }
  .cs-section h2{ font-size:24px; }
}
"""
CSS.write_text(css + block, encoding='utf-8')
print('Done. Appended the mobile layout block to assets/css/style.css')

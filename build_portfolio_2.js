const fs = require('fs');
const path = require('path');

const ROOT = process.env.TARGET_DIR || process.cwd();
console.log("==> Building complete Portfolio 2.0 system in:", ROOT);

function backupAndWrite(filePath, content) {
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, filePath + '.bak');
  } else {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Written: ${path.relative(ROOT, filePath)} (${content.length} bytes)`);
}

// ---------------------------------------------------------------------------
// 1. MINI ERIC CHIBI SVG & BANNER
// ---------------------------------------------------------------------------
function getMiniEricSvg(size = 72) {
  return `<svg class="mini-eric-avatar" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mini Eric anime avatar">
  <ellipse cx="50" cy="94" rx="28" ry="4" fill="rgba(35, 25, 10, 0.12)"/>
  <path d="M26 88 C26 72, 34 68, 50 68 C66 68, 74 72, 74 88 L78 96 L22 96 Z" fill="#29332e"/>
  <path d="M35 70 C42 77, 58 77, 65 70 C60 82, 40 82, 35 70 Z" fill="#1e2622"/>
  <path d="M43 74 L42 86" stroke="#eae5dc" stroke-width="2" stroke-linecap="round"/>
  <path d="M57 74 L58 86" stroke="#eae5dc" stroke-width="2" stroke-linecap="round"/>
  <rect x="44" y="62" width="12" height="10" rx="3" fill="#c9976b"/>
  <ellipse cx="50" cy="46" rx="23" ry="21" fill="#d8a77d"/>
  <circle cx="27" cy="48" r="5" fill="#c9976b"/>
  <circle cx="73" cy="48" r="5" fill="#c9976b"/>
  <path d="M25 46 C24 30, 32 18, 50 18 C68 18, 76 30, 75 46 C71 36, 62 26, 50 26 C38 26, 29 36, 25 46 Z" fill="#1b1715"/>
  <ellipse cx="40" cy="48" rx="4" ry="4.5" fill="#201a16"/>
  <ellipse cx="60" cy="48" rx="4" ry="4.5" fill="#201a16"/>
  <circle cx="41.5" cy="46.5" r="1.5" fill="#ffffff"/>
  <circle cx="61.5" cy="46.5" r="1.5" fill="#ffffff"/>
  <path d="M36 41 Q41 39 45 42" stroke="#1b1715" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M64 41 Q59 39 55 42" stroke="#1b1715" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M46 56 Q50 59 54 56" stroke="#875338" stroke-width="2" stroke-linecap="round" fill="none"/>
  <rect x="33" y="43" width="14" height="11" rx="3" fill="rgba(255, 255, 255, 0.2)" stroke="#b88e2c" stroke-width="1.3"/>
  <rect x="53" y="43" width="14" height="11" rx="3" fill="rgba(255, 255, 255, 0.2)" stroke="#b88e2c" stroke-width="1.3"/>
  <path d="M47 46 Q50 44 53 46" stroke="#b88e2c" stroke-width="1.5" fill="none"/>
  <path d="M32 43 Q40 40 47.5 43" stroke="#111111" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M52.5 43 Q60 40 68 43" stroke="#111111" stroke-width="2.6" stroke-linecap="round"/>
  <line x1="35" y1="45" x2="38" y2="48" stroke="rgba(255, 255, 255, 0.6)" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="55" y1="45" x2="58" y2="48" stroke="rgba(255, 255, 255, 0.6)" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M29 36 Q38 27 50 32 Q62 27 71 36 Q64 33 58 37 Q52 32 46 38 Q38 32 29 36 Z" fill="#241e1a"/>
  <path d="M25 40 C24 16, 76 16, 75 40" stroke="#141414" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  <path d="M23 38 L21 46" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M77 38 L79 46" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round"/>
  <rect x="18" y="44" width="7" height="15" rx="3.5" fill="#141414" stroke="#dc2626" stroke-width="1"/>
  <rect x="75" y="44" width="7" height="15" rx="3.5" fill="#141414" stroke="#dc2626" stroke-width="1"/>
</svg>`;
}

function getMiniEricBanner(message, isFooter = false) {
  return `
    <aside class="mini-eric-banner ${isFooter ? 'is-footer' : 'is-header'}" aria-label="Mini Eric dialogue">
      <div class="mini-eric-char" title="Click Mini Eric!">
        ${getMiniEricSvg(isFooter ? 56 : 64)}
      </div>
      <div class="mini-eric-bubble">
        <span class="mini-eric-tag">MINI ERIC</span>
        <p class="mini-eric-text">${message}</p>
      </div>
    </aside>`;
}

// ---------------------------------------------------------------------------
// 2. NAV & INFO DROPDOWN COMPONENT
// ---------------------------------------------------------------------------
function getHeaderNav(activeNav = 'home', isCaseStudy = false) {
  const root = isCaseStudy ? '../' : '';
  const homeActive = activeNav === 'home' ? 'class="sx-nav-link is-active"' : 'class="sx-nav-link"';
  const aboutActive = activeNav === 'about' ? 'class="sx-nav-link is-active"' : 'class="sx-nav-link"';
  const playActive = activeNav === 'playground' ? 'class="sx-nav-link is-active"' : 'class="sx-nav-link"';

  return `
  <header class="sx-nav-wrap">
    <nav class="sx-nav" aria-label="Main navigation">
      <a class="sx-brand" href="${root}index.html" aria-label="Eric Ariel De La Paz, home">
        <img src="${root}assets/images/profile.png" alt="" width="28" height="28">
        <span>De La Paz</span>
      </a>
      <span class="sx-nav-sep" aria-hidden="true"></span>
      <a href="${root}index.html" ${homeActive}>Home</a>
      <a href="${root}about.html" ${aboutActive}>About</a>
      <a href="${root}playground.html" ${playActive}>Playground</a>
      <button type="button" class="sx-nav-info-btn" id="infoBtn" aria-expanded="false" aria-controls="infoPopover" title="Open Quick Contact & Info">
        <span>Info</span>
        <svg class="sx-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <span class="sx-nav-sep" aria-hidden="true"></span>
      <span class="sx-status" title="Open to work"><i class="sx-dot" aria-hidden="true"></i><span>Open to work</span></span>
    </nav>

    <!-- Floating Info Dropdown Drawer -->
    <div class="sx-info-popover" id="infoPopover" role="dialog" aria-modal="false" aria-label="Quick contact & information" hidden>
      <div class="info-card">
        <div class="info-header">
          <div class="info-avatar-row">
            <img src="${root}assets/images/profile.png" alt="Eric Ariel De La Paz" class="info-avatar">
            <div>
              <strong class="info-name">Eric Ariel De La Paz</strong>
              <span class="info-role">Product Designer &amp; Aspiring Design Engineer</span>
            </div>
          </div>
          <span class="info-status-pill"><i class="sx-dot"></i> Open to Work</span>
        </div>
        <p class="info-bio">Building tokenized Figma systems, interaction prototypes, and engineering-ready workflows. Texas-based, open to remote and relocation.</p>
        <div class="info-actions">
          <button type="button" class="info-btn info-btn-copy" id="copyEmailBtn" data-email="ericforall247@gmail.com" title="Click to copy email">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span class="btn-label">Copy Email</span>
            <span class="copy-toast" id="copyToast" aria-live="polite">Copied!</span>
          </button>
          <a href="https://www.linkedin.com/in/eric-ariel-de-la-paz/" target="_blank" rel="noopener" class="info-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/EricArielDeLaPaz" target="_blank" rel="noopener" class="info-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>GitHub</span>
          </a>
          <a href="${root}assets/Eric_De_La_Paz_Resume.pdf" target="_blank" rel="noopener" class="info-btn info-btn-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            <span>Resume</span>
          </a>
        </div>
        <div class="info-footer-note">
          <span>📍 Texas (Open to Remote &amp; Relocation)</span>
          <span>⚡ 2 concurrent design internships completed</span>
        </div>
      </div>
    </div>
  </header>`;
}

function getSiteFooter() {
  return `
  <footer class="sx-footer sx-wrap">
    <span>© 2026 Eric Ariel De La Paz</span>
    <div>
      <a href="mailto:ericforall247@gmail.com"><svg class="sx-footer-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg><span>Email</span></a>
      <a href="https://www.linkedin.com/in/eric-ariel-de-la-paz/" target="_blank" rel="noopener"><svg class="sx-footer-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg><span>LinkedIn</span></a>
      <a href="https://github.com/EricArielDeLaPaz" target="_blank" rel="noopener"><svg class="sx-footer-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg><span>GitHub</span></a>
    </div>
  </footer>`;
}

// ---------------------------------------------------------------------------
// 3. NINTENDO DS LITE COMPONENT (Crimson Red & Onyx Black)
// ---------------------------------------------------------------------------
function getNintendoDsHtml() {
  return `
  <div class="ds-container" id="nintendoDs" aria-label="Interactive Crimson Red Nintendo DS Lite">
    <!-- Closed Lid State -->
    <div class="ds-lid" id="dsLid" role="button" tabindex="0" aria-label="Click to flip open Nintendo DS Lite">
      <div class="ds-lid-face">
        <div class="ds-lid-sheen"></div>
        <div class="ds-emblem">
          <span class="ds-sq ds-sq-1"></span>
          <span class="ds-sq ds-sq-2"></span>
        </div>
        <span class="ds-engraving">Nintendo DS Lite</span>
        <div class="ds-open-prompt">
          <span class="ds-sparkle">✦</span>
          <span>Click to Flip Open DS</span>
          <span class="ds-sparkle">✦</span>
        </div>
      </div>
      <div class="ds-hinge-band"></div>
    </div>

    <!-- Opened Console State -->
    <div class="ds-console" id="dsConsole" hidden>
      <!-- Top Bezel & Backlit Screen -->
      <div class="ds-top-housing">
        <div class="ds-top-bezel">
          <div class="ds-speaker ds-speaker-l"><i></i><i></i><i></i><i></i></div>
          <div class="ds-screen ds-top-screen">
            <div class="ds-top-bar">
              <span class="ds-top-title" id="dsCartridgeTitle">POKÉMON BLACK</span>
              <span class="ds-top-batt">BATT ■■■</span>
            </div>
            <div class="ds-screen-stage" id="dsScreenStage">
              <!-- Rendered via JS based on active cartridge -->
            </div>
          </div>
          <div class="ds-speaker ds-speaker-r"><i></i><i></i><i></i><i></i></div>
        </div>
        <button type="button" class="ds-close-btn" id="dsCloseBtn" title="Snap DS lid closed">✕ Close Lid</button>
      </div>

      <!-- Center Hinge & LEDs -->
      <div class="ds-hinge-middle">
        <div class="ds-mic">MIC.</div>
        <div class="ds-leds">
          <span class="ds-led ds-led-pwr" title="Power"></span>
          <span class="ds-led ds-led-chr" title="Battery"></span>
        </div>
      </div>

      <!-- Bottom Housing & Touch Screen -->
      <div class="ds-bottom-housing">
        <!-- D-Pad Left -->
        <div class="ds-dpad-col">
          <div class="ds-dpad">
            <button type="button" class="dpad-key dpad-up" aria-label="D-pad Up"></button>
            <button type="button" class="dpad-key dpad-left" id="dpadLeft" aria-label="Previous Game">◀</button>
            <div class="dpad-core"></div>
            <button type="button" class="dpad-key dpad-right" id="dpadRight" aria-label="Next Game">▶</button>
            <button type="button" class="dpad-key dpad-down" aria-label="D-pad Down"></button>
          </div>
        </div>

        <!-- Touch Screen Center -->
        <div class="ds-screen ds-touch-screen">
          <div class="ds-touch-body" id="dsTouchBody">
            <!-- Dynamic Cartridge Details & Memory Note -->
          </div>
          <div class="ds-touch-controls">
            <button type="button" class="ds-touch-nav-btn" id="touchPrev">◀ Prev</button>
            <span class="ds-touch-indicator" id="touchIndicator">1 / 4</span>
            <button type="button" class="ds-touch-nav-btn" id="touchNext">Next ▶</button>
          </div>
        </div>

        <!-- Action Buttons Right -->
        <div class="ds-abxy-col">
          <div class="ds-abxy">
            <button type="button" class="ds-btn ds-btn-x" aria-label="X">X</button>
            <button type="button" class="ds-btn ds-btn-y" aria-label="Y">Y</button>
            <button type="button" class="ds-btn ds-btn-b" aria-label="B">B</button>
            <button type="button" class="ds-btn ds-btn-a" id="dsBtnA" aria-label="A">A</button>
          </div>
          <div class="ds-start-select">
            <button type="button" class="ds-pill-btn" aria-label="Select">SELECT</button>
            <button type="button" class="ds-pill-btn" aria-label="Start">START</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

console.log("Templates compiled.");

// ---------------------------------------------------------------------------
// 4. ABOUT.HTML GENERATOR
// ---------------------------------------------------------------------------
function buildAboutHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About | Eric Ariel De La Paz — Product Designer &amp; Aspiring Design Engineer</title>
  <meta name="description" content="The story, creative fuel, morning routines, anime favorites, and childhood Nintendo DS memories of Eric Ariel De La Paz.">
  <link rel="icon" type="image/png" href="assets/images/profile.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/scroll.css">
</head>
<body class="sx-page is-light" data-nav="about">
  <a class="sx-skip" href="#main">Skip to content</a>
  ${getHeaderNav('about')}

  <main class="sx-main" id="main">
    <div class="sx-wrap">
      ${getMiniEricBanner("Welcome to the origin story! Here's what I love: anime, gaming, morning routines, and high design standards.")}

      <!-- Hero Header -->
      <header class="about-hero">
        <p class="sx-kicker"><i class="sx-dot" aria-hidden="true"></i> The Story Behind The Screens</p>
        <h1 class="about-title">Designing systems behind the screens. Grounded in craft, fueled by curiosity.</h1>
        <p class="about-lede">I am a Product Designer with a background in tokenized design systems, clickable high-fidelity prototyping, and engineering handoffs. Born and raised in Texas of Mexican heritage, my foundation is built on discipline, craft, and an obsession with how complex software fits together.</p>
      </header>

      <!-- The Daily Foundation -->
      <section class="about-section" id="foundations">
        <div class="section-badge"><span>01</span> Daily Foundations</div>
        <h2 class="section-heading">How I start and stay grounded</h2>
        <div class="foundations-grid">
          <!-- Bible Card -->
          <article class="foundation-card card-bible">
            <div class="bible-cover">
              <span class="bible-cross">✝</span>
              <span class="bible-gold-spine"></span>
              <span class="bible-ribbon"></span>
              <span class="bible-emboss">HOLY BIBLE</span>
            </div>
            <div class="card-body">
              <span class="card-tag">Daily Morning Ritual</span>
              <h3>A Chapter a Day</h3>
              <p>In the mornings, I always go ahead and read a chapter of the most popular book in the world. It provides perspective, humility, and calm intention before jumping into Figma, tokens, or complex engineering challenges.</p>
            </div>
          </article>

          <!-- Water / Hydration Card -->
          <article class="foundation-card card-water">
            <div class="water-glass-art">
              <div class="water-level"></div>
              <span class="water-drop">💧</span>
            </div>
            <div class="card-body">
              <span class="card-tag">Wellness Habit</span>
              <h3>Water is King</h3>
              <p>Drink-wise, I love water—it's great for you and you can't really go wrong with it. Always stay hydrated! (This exact routine is what inspired the hydration break in my Study Buddy desktop app!).</p>
            </div>
          </article>

          <!-- Downtime Card -->
          <article class="foundation-card card-downtime">
            <div class="downtime-art">
              <span class="play-chip">▶</span>
              <span class="laugh-chip">😂</span>
            </div>
            <div class="card-body">
              <span class="card-tag">Downtime &amp; Humor</span>
              <h3>Laughter &amp; Relaxation</h3>
              <p>In my free time, I mainly watch anime and explore YouTube, watching funny videos and relatable skits. Keeping humor and curiosity close keeps the creative tank full.</p>
            </div>
          </article>
        </div>
      </section>

      <!-- Anime Wall (Megan Yap / Case Study Hover Reveal) -->
      <section class="about-section" id="anime">
        <div class="section-badge"><span>02</span> Creative Fuel</div>
        <div class="section-head-row">
          <div>
            <h2 class="section-heading">Top Anime &amp; Stories That Stick</h2>
            <p class="sx-sub">Hover over any poster to reveal the story of why it inspires my creative craft.</p>
          </div>
          <div class="watching-pill" title="Currently finishing season!">
            <span class="watching-dot"></span>
            <span>Currently Watching: <strong>Black Clover</strong> (Wrapping up the season!)</span>
          </div>
        </div>

        <div class="anime-grid">
          <!-- 1. Naruto -->
          <div class="anime-card" tabindex="0">
            <div class="anime-poster anime-naruto">
              <div class="anime-kanji">ナルト</div>
              <span class="anime-num">01</span>
              <div class="anime-cover-title">
                <h3>Naruto</h3>
                <span>NARUTO - ナルト -</span>
              </div>
            </div>
            <div class="anime-reveal">
              <span class="reveal-tag">Lifelong Inspiration</span>
              <h4>The Underdog Work Ethic</h4>
              <p>I grew up with Naruto and loved each part of it. It's stuck with me for a long time and is globally recognized for a reason: it taught me perseverance, teamwork, and seeing a difficult path through to the very end.</p>
            </div>
          </div>

          <!-- 2. Bleach -->
          <div class="anime-card" tabindex="0">
            <div class="anime-poster anime-bleach">
              <div class="anime-kanji">ブリーチ</div>
              <span class="anime-num">02</span>
              <div class="anime-cover-title">
                <h3>Bleach</h3>
                <span>BLEACH - ブリーチ -</span>
              </div>
            </div>
            <div class="anime-reveal">
              <span class="reveal-tag">Equilibrium &amp; Style</span>
              <h4>World Stability &amp; Insane Drip</h4>
              <p>Besides the unmatched visual style and fashion drip, I really like the concept of different beings (Soul Reapers, Hollows, Quincies) and how they each serve a distinct purpose to bring balance and stability to the world. Recently finished the full series!</p>
            </div>
          </div>

          <!-- 3. World Trigger -->
          <div class="anime-card" tabindex="0">
            <div class="anime-poster anime-worldtrigger">
              <div class="anime-kanji">ワールドトリガー</div>
              <span class="anime-num">03</span>
              <div class="anime-cover-title">
                <h3>World Trigger</h3>
                <span>WORLD TRIGGER</span>
              </div>
            </div>
            <div class="anime-reveal">
              <span class="reveal-tag">Tactics &amp; Systems</span>
              <h4>Strategy &amp; Weapon Concepts</h4>
              <p>It's been a while since I've watched it, but I loved the deliberate team battle tactics, character concepts, and the creative weapon mechanics they used. Pure tactical problem-solving.</p>
            </div>
          </div>

          <!-- 4. Spirited Away -->
          <div class="anime-card" tabindex="0">
            <div class="anime-poster anime-spiritedaway">
              <div class="anime-kanji">千と千尋</div>
              <span class="anime-num">04</span>
              <div class="anime-cover-title">
                <h3>Spirited Away</h3>
                <span>Studio Ghibli</span>
              </div>
            </div>
            <div class="anime-reveal">
              <span class="reveal-tag">Ghibli Magic</span>
              <h4>The Dragon Shirt Origin</h4>
              <p>My first Studio Ghibli movie! Why did I watch it? I bought a shirt of the characters at a store solely because I thought Haku the dragon looked amazing—so naturally, I had to watch the movie then, and it became an instant masterpiece in my book.</p>
            </div>
          </div>

          <!-- 5. Hell's Paradise -->
          <div class="anime-card" tabindex="0">
            <div class="anime-poster anime-hellsparadise">
              <div class="anime-kanji">地獄楽</div>
              <span class="anime-num">05</span>
              <div class="anime-cover-title">
                <h3>Hell's Paradise</h3>
                <span>Jigokuraku</span>
              </div>
            </div>
            <div class="anime-reveal">
              <span class="reveal-tag">Unshakable Resolve</span>
              <h4>Gabimaru's Focus &amp; Eerie Ecology</h4>
              <p>I like the overall story, the deadly island mysteries, and Gabimaru's quiet, determined personality—fighting through insurmountable odds driven by his love and promise to return home.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Nintendo DS Lite Interactive Vault -->
      <section class="about-section" id="nintendo-ds-section">
        <div class="section-badge"><span>03</span> Childhood Vault</div>
        <div class="section-head-row">
          <div>
            <h2 class="section-heading">My Nintendo DS Lite (Crimson &amp; Black)</h2>
            <p class="sx-sub">Click the closed DS below to flip open the dual screens and explore my childhood Pokémon memories.</p>
          </div>
        </div>

        ${getNintendoDsHtml()}
      </section>

      ${getMiniEricBanner("Thanks for learning about what makes me tick! Ready to see the case studies or try out the playground?", true)}
    </div>
  </main>

  ${getSiteFooter()}
  <script src="assets/js/scroll.js"></script>
</body>
</html>`;
}

console.log("buildAboutHtml ready.");

// ---------------------------------------------------------------------------
// 5. PLAYGROUND.HTML GENERATOR
// ---------------------------------------------------------------------------
function buildPlaygroundHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Playground | Eric Ariel De La Paz — Design Engineering Lab</title>
  <meta name="description" content="Interactive experiments, token playgrounds, and working micro-apps by Eric Ariel De La Paz.">
  <link rel="icon" type="image/png" href="assets/images/profile.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/scroll.css">
</head>
<body class="sx-page is-light" data-nav="playground">
  <a class="sx-skip" href="#main">Skip to content</a>
  ${getHeaderNav('playground')}

  <main class="sx-main" id="main">
    <div class="sx-wrap">
      ${getMiniEricBanner("Welcome to the lab! Here are my working prototypes, token experiments, and the interactive Nintendo DS.")}

      <!-- Hero Header -->
      <header class="about-hero">
        <p class="sx-kicker"><i class="sx-dot" aria-hidden="true"></i> The Design Engineering Sandbox</p>
        <h1 class="about-title">Creative coding, token experiments, and playful interactions.</h1>
        <p class="about-lede">A space where I test interaction physics, build micro-apps like Study Buddy, and explore where design systems meet production-ready code.</p>
      </header>

      <!-- Experiment 1: The Nintendo DS Lite Interactive Console -->
      <section class="about-section" id="lab-nintendo-ds">
        <div class="section-badge"><span>01</span> Handheld Nostalgia</div>
        <div class="section-head-row">
          <div>
            <h2 class="section-heading">Interactive Nintendo DS Lite (Crimson &amp; Black)</h2>
            <p class="sx-sub">Click the closed lid below to flip open the dual screens and test out the D-Pad and touch controls.</p>
          </div>
        </div>

        ${getNintendoDsHtml()}
      </section>

      <!-- Experiment 2: Study Buddy Desktop Web Simulator -->
      <section class="about-section" id="lab-studybuddy">
        <div class="section-badge"><span>02</span> Shipped Product</div>
        <div class="section-head-row">
          <div>
            <h2 class="section-heading">Study Buddy — Focus &amp; Break Companion</h2>
            <p class="sx-sub">Interactive simulator of the desktop overlay built with Gemini 4 Argon and Electron.</p>
          </div>
          <div class="lab-links">
            <a href="https://github.com/EricArielDeLaPaz/study-buddy-desktop" target="_blank" rel="noopener" class="sx-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span>GitHub Repo</span>
            </a>
            <a href="case-studies/study-buddy.html" class="sx-btn sx-btn-primary"><span>View Case Study</span></a>
          </div>
        </div>

        <div class="sb-sim-card">
          <div class="sb-sim-topbar">
            <span class="sb-sim-dot red"></span>
            <span class="sb-sim-dot yellow"></span>
            <span class="sb-sim-dot green"></span>
            <span class="sb-sim-title">Study Buddy Overlay (v1.2.4)</span>
          </div>
          <div class="sb-sim-body">
            <div class="sb-sim-avatar">
              <div class="sb-mambo-preview">
                <span class="sb-mambo-eyes">◠ ◠</span>
                <span class="sb-mambo-sparkles">✨</span>
              </div>
              <strong class="sb-mambo-name">Mambo is Resting</strong>
              <small>Pomodoro: 25m Focus • 5m Hydration Break</small>
            </div>
            <div class="sb-sim-controls">
              <div class="sb-sim-timer" id="sbTimer">24:59</div>
              <div class="sb-sim-btn-row">
                <button type="button" class="sb-sim-btn active" id="sbStartBtn">Start Focus</button>
                <button type="button" class="sb-sim-btn" id="sbBreakBtn">Take 5m Hydration Break 💧</button>
                <button type="button" class="sb-sim-btn" id="sbResetBtn">Reset</button>
              </div>
              <p class="sb-sim-status" id="sbStatusText">Session active: Mambo keeps distractions away so you can stay in flow.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Experiment 3: Live Design Token Sandbox -->
      <section class="about-section" id="lab-tokens">
        <div class="section-badge"><span>03</span> Design Systems</div>
        <div class="section-head-row">
          <div>
            <h2 class="section-heading">Interactive Token Lab</h2>
            <p class="sx-sub">Adjust live design tokens below and watch the preview card recompute in real-time.</p>
          </div>
        </div>

        <div class="token-lab-grid">
          <div class="token-lab-controls">
            <div class="control-group">
              <label for="radiusSlider">Border Radius: <strong id="radiusValue">16px</strong></label>
              <input type="range" id="radiusSlider" min="4" max="32" value="16" step="2">
            </div>

            <div class="control-group">
              <label for="elevationSlider">Shadow Elevation: <strong id="elevationValue">Medium</strong></label>
              <input type="range" id="elevationSlider" min="1" max="3" value="2" step="1">
            </div>

            <div class="control-group">
              <label>Theme Accent Token</label>
              <div class="token-palette-row">
                <button type="button" class="palette-swatch is-active" data-color="#997324" style="background:#997324;" title="Antique Gold"></button>
                <button type="button" class="palette-swatch" data-color="#2563eb" style="background:#2563eb;" title="Vextaro Blue"></button>
                <button type="button" class="palette-swatch" data-color="#7c3aed" style="background:#7c3aed;" title="Study Buddy Purple"></button>
                <button type="button" class="palette-swatch" data-color="#059669" style="background:#059669;" title="SecureID Emerald"></button>
              </div>
            </div>
          </div>

          <div class="token-lab-preview">
            <div class="sample-token-card" id="tokenPreviewCard">
              <span class="sample-badge">Live Token Component</span>
              <h3 class="sample-title">Production Design System</h3>
              <p class="sample-copy">Every radius, color token, and elevation value is centralized and synchronized across mobile and desktop interfaces.</p>
              <div class="sample-actions">
                <button type="button" class="sample-btn-primary" id="sampleBtnPrimary">Primary Action</button>
                <button type="button" class="sample-btn-secondary" id="sampleBtnSecondary">Secondary</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experiment 4: AI Design Library Teaser -->
      <section class="about-section" id="lab-ai-teaser">
        <div class="section-badge"><span>03</span> Soon to be Released</div>
        <div class="ai-teaser-card">
          <div class="ai-teaser-copy">
            <span class="ai-chip">In Development</span>
            <h2>Mambo Database</h2>
            <p>A dual-purpose knowledge repository designed for both humans and AI agents. It curates high-contrast font pairings, tested token scales, and structured system prompts for Claude, Gemini, and v0 to build pristine, production-grade user interfaces.</p>
            <div class="ai-teaser-tags">
              <span>Font Pairings</span><span>WCAG Contrast Matrices</span><span>Claude/Gemini Skill System</span><span>Figma Tokens</span>
            </div>
            <br>
            <div>
            <a href="https://ericarieldelapaz.tech/mambo-database" target="_blank" rel="noopener" class="sx-btn sx-btn-primary">
                <span>View Mambo Database</span>
            </a>
            </div>
          </div>
        </div>
      </section>

      ${getMiniEricBanner("Have an experiment idea or want to build something together? Drop me a note in the Info tab!", true)}
    </div>
  </main>

  ${getSiteFooter()}
  <script src="assets/js/scroll.js"></script>
</body>
</html>`;
}

console.log("buildPlaygroundHtml ready.");

// ---------------------------------------------------------------------------
// 6. INDEX.HTML (HOME) GENERATOR
// ---------------------------------------------------------------------------
function buildIndexHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eric Ariel De La Paz | Product Designer, Texas</title>
  <meta name="description" content="Portfolio of Eric Ariel De La Paz, a Product Designer focused on design systems, token architecture, interaction design, and clickable prototypes.">
  <link rel="icon" type="image/png" href="assets/images/profile.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Raleway:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
  <link rel="stylesheet" href="assets/css/scroll.css">
</head>
<body class="sx-page is-light" data-nav="home">
  <a class="sx-skip" href="#work">Skip to work</a>
  ${getHeaderNav('home')}

  <main class="sx-main" id="main">
    <div class="sx-wrap">
      ${getMiniEricBanner("Hey! I'm Mini Eric. I see you're looking at my work—you must be looking to hire me!")}

      <!-- Hero Section -->
      <section class="sx-hero sx-reveal" id="hero">
        <div class="sx-hero-grid">
          <div class="sx-hero-copy">
            <p class="sx-kicker"><i class="sx-dot" aria-hidden="true"></i> Hi, I'm Eric. Open to product design roles</p>
            <h1 id="hero-title">Product Designer: systems, flows, prototypes.</h1>
            <p class="sx-lede">I design token-based Figma systems and clickable prototypes that engineers can build from. Texas-based, open to work.</p>
            <ul class="sx-badges" aria-label="At a glance">
              <li>Texas (Open to Remote &amp; Relocation)</li>
              <li>2 Concurrent Design Internships (Flyrank AI &amp; Stealth Startup)</li>
              <li>Design Systems &amp; Token Architecture</li>
              <li>B.S. User Experience Design, Western Governors University</li>
            </ul>
            <div class="sx-cta">
              <a class="sx-btn" href="mailto:ericforall247@gmail.com">
                <svg class="sx-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span>Email</span>
              </a>
              <a class="sx-btn" href="https://www.linkedin.com/in/eric-ariel-de-la-paz/" target="_blank" rel="noopener">
                <svg class="sx-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LinkedIn</span>
              </a>
              <a class="sx-btn" href="assets/Eric_De_La_Paz_Resume.pdf" target="_blank" rel="noopener">
                <svg class="sx-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                <span>Resume</span>
              </a>
              <a class="sx-btn sx-btn-primary" href="#work">View my work</a>
            </div>
          </div>
          <figure class="sx-portrait">
            <img src="assets/images/profile.png" alt="Eric Ariel De La Paz" width="320" height="427" fetchpriority="high">
          </figure>
        </div>

        <ul class="sx-statbar" aria-label="Highlights">
          <li class="is-text"><b>Design Tokens</b><span>Centralized semantic variables across mobile &amp; web</span></li>
          <li class="is-text"><b>Clickable Flows</b><span>9-state interactive branches with zero dead-ends</span></li>
          <li class="is-text"><b>WCAG 2.2 AA</b><span>15/15 color contrast checks documented in tokens</span></li>
          <li class="is-text"><b>Implementation Ready</b><span>Production-aligned token bindings, responsive constraints, and variant states</span></li>
        </ul>
      </section>

      <!-- Selected Works Section (Megan Yap Style Cards) -->
      <section class="sx-section sx-reveal" id="work">
        <p class="sx-kicker">Selected Works</p>
        <h2 id="work-title">Case studies &amp; systems</h2>
        <p class="sx-sub">Self-initiated, certificate capstones, and internship projects. Click any project to open the full craft breakdown.</p>

        <div class="megan-work-grid">
          <!-- 1. Study Buddy -->
          <article class="megan-card card-theme-studybuddy">
            <a href="case-studies/study-buddy.html" class="megan-card-link" aria-label="View Study Buddy case study">
              <div class="megan-card-preview">
                <img loading="lazy" src="assets/images/study-buddy.png" alt="Study Buddy desktop focus companion app" class="megan-card-img">
                <span class="megan-card-pill">Desktop App · Electron &amp; AI</span>
              </div>
              <div class="megan-card-content">
                <div class="megan-meta-row">
                  <span class="megan-role">Solo Product Designer</span>
                  <span class="megan-year">2026</span>
                </div>
                <h3 class="megan-title">Study Buddy — Desktop Focus Companion</h3>
                <p class="megan-desc">A lightweight desktop companion app designed to keep students in flow with gentle break nudges and study presets.</p>
                <div class="megan-tags">
                  <span>Windows / Mac / Linux</span><span>Design Systems</span><span>AI-Assisted Build</span><span>WCAG AA</span>
                </div>
                <div class="megan-outcome-banner">
                  <strong>Outcome:</strong> Shipped working installers across 3 OS in ~14h build time. Dogfooded daily to eliminate edge cases.
                </div>
              </div>
            </a>
          </article>

          <!-- 2. SecureID -->
          <article class="megan-card card-theme-secureid">
            <a href="case-studies/secureid.html" class="megan-card-link" aria-label="View SecureID case study">
              <div class="megan-card-preview">
                <img loading="lazy" src="assets/images/secureid.png" alt="SecureID identity verification platform" class="megan-card-img">
                <span class="megan-card-pill">Dual-Sided: Mobile &amp; SaaS</span>
              </div>
              <div class="megan-card-content">
                <div class="megan-meta-row">
                  <span class="megan-role">Solo Product Designer</span>
                  <span class="megan-year">2026</span>
                </div>
                <h3 class="megan-title">SecureID — Identity Verification &amp; Analyst Platform</h3>
                <p class="megan-desc">End-to-end identity onboarding flow paired with a high-density triage dashboard for compliance analysts.</p>
                <div class="megan-tags">
                  <span>Design Tokens</span><span>Clickable Prototype</span><span>Case Triage UX</span><span>Progressive Disclosure</span>
                </div>
                <div class="megan-outcome-banner">
                  <strong>Outcome:</strong> 1 shared token system across mobile &amp; web, 3-action analyst triage, and verified Figma prototype.
                </div>
              </div>
            </a>
          </article>

          <!-- 3. Vextaro -->
          <article class="megan-card card-theme-vextaro">
            <a href="case-studies/vextaro.html" class="megan-card-link" aria-label="View Vextaro case study">
              <div class="megan-card-preview">
                <img loading="lazy" src="assets/images/vextaro.png" alt="Vextaro luxury formalwear rental app" class="megan-card-img">
                <span class="megan-card-pill">Mobile App · Flyrank AI Internship</span>
              </div>
              <div class="megan-card-content">
                <div class="megan-meta-row">
                  <span class="megan-role">UX/UI Design Intern · Flyrank AI</span>
                  <span class="megan-year">Completed</span>
                </div>
                <h3 class="megan-title">Vextaro — Luxury Formalwear Rental App &amp; System</h3>
                <p class="megan-desc">A token-based design system, research-backed IA, 9-state high-fidelity prototype, and developer handoff for men's formalwear rental.</p>
                <div class="megan-tags">
                  <span>Mobile App (iOS &amp; Android)</span><span>Tokens</span><span>UX Research &amp; IA</span><span>WCAG 2.2 AA</span>
                </div>
                <div class="megan-outcome-banner">
                  <strong>Outcome:</strong> 7-section IA, 15/15 WCAG AA contrast checks passed, 35 component variants documented.
                </div>
              </div>
            </a>
          </article>

          <!-- 4. Honda of Clear Lake -->
          <article class="megan-card card-theme-honda">
            <a href="case-studies/honda.html" class="megan-card-link" aria-label="View Honda of Clear Lake case study">
              <div class="megan-card-preview">
                <img loading="lazy" src="assets/images/honda.png" alt="Honda of Clear Lake dealership heuristic evaluation" class="megan-card-img">
                <span class="megan-card-pill">UX Audit · Dealership Web</span>
              </div>
              <div class="megan-card-content">
                <div class="megan-meta-row">
                  <span class="megan-role">Solo UX Auditor</span>
                  <span class="megan-year">2026</span>
                </div>
                <h3 class="megan-title">Honda of Clear Lake — Website Usability Audit</h3>
                <p class="megan-desc">Heuristic evaluation of an active dealership website using Nielsen's 10 principles with prioritized redesign solutions.</p>
                <div class="megan-tags">
                  <span>Responsive Web</span><span>Heuristic Evaluation</span><span>Severity Scale (0–4)</span><span>Conversion UX</span>
                </div>
                <div class="megan-outcome-banner">
                  <strong>Outcome:</strong> Ranked findings on 0–4 scale with annotated redesign proposals and engineering punch lists.
                </div>
              </div>
            </a>
          </article>

          <!-- 5. DevTective -->
          <article class="megan-card card-theme-devtective">
            <a href="case-studies/devtective.html" class="megan-card-link" aria-label="View DevTective case study">
              <div class="megan-card-preview">
                <img loading="lazy" src="assets/images/devtective.png" alt="DevTective developer habit tracker app" class="megan-card-img">
                <span class="megan-card-pill">Google UX Certificate Capstone</span>
              </div>
              <div class="megan-card-content">
                <div class="megan-meta-row">
                  <span class="megan-role">Solo UX Designer</span>
                  <span class="megan-year">2026</span>
                </div>
                <h3 class="megan-title">DevTective — Developer Learning Progress Tracker</h3>
                <p class="megan-desc">Mobile web app helping self-taught programmers build persistent coding habits, track milestones, and reflect on progress.</p>
                <div class="megan-tags">
                  <span>Mobile Web App</span><span>User Research</span><span>Journey Mapping</span><span>Wireframe to Prototype</span>
                </div>
                <div class="megan-outcome-banner">
                  <strong>Outcome:</strong> Complete 5-phase Google UX design certificate capstone with user testing iterations.
                </div>
              </div>
            </a>
          </article>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="sx-section sx-reveal" id="experience">
        <p class="sx-kicker">Track Record</p>
        <h2 id="experience-title">Experience &amp; Internships</h2>
        <div class="experience-list">
          <!-- Stealth Startup -->
          <article class="exp-row-card">
            <div class="exp-header">
              <div>
                <span class="exp-company">Stealth Startup</span>
                <h3 class="exp-role">Product Designer</h3>
              </div>
              <span class="exp-badge active"><i class="sx-dot"></i> Active</span>
            </div>
            <div class="exp-meta-line">Jul 2026 – Present • Remote • Full-time internship</div>
            <p class="exp-copy">Leading end-to-end product design across mobile and desktop surfaces. Collaborating directly with founders and engineering to design design-token systems, conduct usability sessions, and hand off production-ready Figma specs.</p>
          </article>

          <!-- Flyrank AI -->
          <article class="exp-row-card">
            <div class="exp-header">
              <div>
                <span class="exp-company">Flyrank AI</span>
                <h3 class="exp-role">UX/UI Design Intern</h3>
              </div>
              <span class="exp-badge completed">Completed</span>
            </div>
            <div class="exp-meta-line">Jul 2026 – Nov 2026 • Remote • 8-week internship</div>
            <p class="exp-copy">Delivered Vextaro, a men's luxury formalwear rental app. Built a 35-variant tokenized component system, passed 15/15 WCAG 2.2 AA contrast checks, mapped a 7-section IA, and authored a 9-state high-fidelity prototype with complete developer handoff.</p>
          </article>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="sx-section sx-reveal sx-contact" id="contact">
        ${getMiniEricBanner("Found a project that caught your eye? Grab a glass of water and send a note—I can walk you through any Figma file!", true)}
        <p class="sx-kicker">Get in Touch</p>
        <h2 id="contact-title">Let's build something useful.</h2>
        <p class="sx-sub">I am looking for a Product Designer role where I can build the system behind the screens. If your team is hiring, I would love to talk. Send me an email or connect on LinkedIn.</p>
        <div class="sx-cta">
          <a class="sx-btn sx-btn-primary" href="mailto:ericforall247@gmail.com">
            <svg class="sx-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span>Email</span>
          </a>
          <a class="sx-btn" href="https://www.linkedin.com/in/eric-ariel-de-la-paz/" target="_blank" rel="noopener">
            <svg class="sx-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span>Connect on LinkedIn</span>
          </a>
          <a class="sx-btn" href="https://github.com/EricArielDeLaPaz" target="_blank" rel="noopener">
            <svg class="sx-btn-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span>GitHub</span>
          </a>
        </div>
      </section>
    </div>
  </main>

  ${getSiteFooter()}
  <script src="assets/js/scroll.js"></script>
</body>
</html>`;
}

console.log("buildIndexHtml ready.");

// ---------------------------------------------------------------------------
// 7. CASE STUDIES UPDATER
// ---------------------------------------------------------------------------
function updateCaseStudies() {
  const caseStudies = [
    {
      file: 'vextaro.html',
      greeting: "Welcome to Vextaro! I built this 35-variant token system, 7-section IA, and 9-state high-fidelity Figma flow during my Flyrank AI internship."
    },
    {
      file: 'study-buddy.html',
      greeting: "Welcome to Study Buddy! Solo designed and built with Gemini 4 Argon. I dogfood it daily to stay focused and keep my hydration breaks on point."
    },
    {
      file: 'secureid.html',
      greeting: "Welcome to SecureID! Dual-sided product architecture: a verified mobile verification flow paired with a 3-action analyst triage dashboard."
    },
    {
      file: 'honda.html',
      greeting: "Welcome to Honda of Clear Lake! A comprehensive heuristic evaluation ranked on a 0–4 severity scale with developer-ready punch lists."
    },
    {
      file: 'devtective.html',
      greeting: "Welcome to DevTective! My Google UX Design Certificate capstone focused on developer learning habits and milestone tracking."
    }
  ];

  const csDir = path.join(ROOT, 'case-studies');
  if (!fs.existsSync(csDir)) return;

  for (const cs of caseStudies) {
    const filePath = path.join(csDir, cs.file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Ensure body has is-light class
    content = content.replace(/<body([^>]*?)class="([^"]*?)"/i, (m, pre, cls) => {
      if (!cls.includes('is-light')) {
        return `<body${pre}class="${cls} is-light"`;
      }
      return m;
    });

    // 2. Replace nav header with new 4-pill nav + info popover
    content = content.replace(/<header class="sx-nav-wrap">[\s\S]*?<\/header>/, getHeaderNav('work', true));

    // 3. Inject top Mini Eric banner if not present
    if (!content.includes('mini-eric-banner')) {
      const topBanner = getMiniEricBanner(cs.greeting, false);
      content = content.replace(/(<main[^>]*?>[\s\S]*?<div class="container">)/i, `$1\n${topBanner}`);
    }

    // 4. Inject footer Mini Eric banner before footer
    if (!content.includes('is-footer')) {
      const footerBanner = getMiniEricBanner("You finished reviewing the craft! Stay hydrated and check out the next project or hop over to About to see my old Nintendo DS.", true);
      content = content.replace(/(<div class="cs-nav-footer">[\s\S]*?<\/div>\s*<\/div>)/i, `$1\n<div class="container">${footerBanner}</div>`);
    }

    backupAndWrite(filePath, content);
  }
}

// ---------------------------------------------------------------------------
// 8. ASSETS/CSS/SCROLL.CSS GENERATOR
// ---------------------------------------------------------------------------
function buildScrollCss() {
  const cssPath = path.join(ROOT, 'assets', 'css', 'scroll.css');
  let currentCss = '';
  if (fs.existsSync(cssPath)) {
    currentCss = fs.readFileSync(cssPath, 'utf8');
  }

  const p2Css = `
/* ============================================================
   PORTFOLIO 2.0: STUDIO PAPER & GLASS LIGHT MODE SYSTEM
   Crafted for Eric Ariel De La Paz — Product Designer
   ============================================================ */
:root {
  --bg: #FAF9F6;
  --bg-subtle: #F3F1EC;
  --card: #FFFFFF;
  --card-hover: #FCFBF9;
  --card-raised: #FFFFFF;
  --border: rgba(26, 24, 20, 0.08);
  --border-soft: rgba(26, 24, 20, 0.05);
  --border-strong: rgba(26, 24, 20, 0.16);
  --text: #171512;
  --text-dim: #544f46;
  --text-faint: #857e74;
  --gold: #997324;
  --gold-bright: #b88e2c;
  --gold-soft: rgba(153, 115, 36, 0.09);
  --ok: #15803d;
  --shadow-sm: 0 2px 8px rgba(35, 25, 10, 0.04);
  --shadow-card: 0 4px 20px -2px rgba(35, 25, 10, 0.05), 0 1px 3px rgba(0,0,0,0.03);
  --shadow-hover: 0 16px 36px -8px rgba(35, 25, 10, 0.08), 0 2px 6px rgba(0,0,0,0.04);
  --shadow-pop: 0 24px 48px -12px rgba(35, 25, 10, 0.12), 0 4px 12px rgba(0,0,0,0.04);
  --ease-motion: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Light mode overrides across pages */
body.sx-page.is-light,
body.sx-case.is-light {
  background: var(--bg) !important;
  color: var(--text) !important;
}
.is-light .sx-section {
  border-top-color: var(--border) !important;
}
.is-light .sx-wrap > h2,
.is-light h1,
.is-light h2,
.is-light h3 {
  color: var(--text) !important;
}
.is-light .sx-sub,
.is-light .sx-lede,
.is-light p {
  color: var(--text-dim) !important;
}
.is-light .sx-statbar {
  border-color: var(--border) !important;
  background: var(--card) !important;
  box-shadow: var(--shadow-sm) !important;
}
.is-light .sx-statbar li {
  border-color: var(--border) !important;
}
.is-light .sx-statbar li span {
  color: var(--text-dim) !important;
}
.is-light .sx-statbar b {
  color: var(--gold) !important;
}
.is-light .sx-portrait img {
  border-color: var(--border-strong) !important;
  box-shadow: var(--shadow-hover) !important;
}
.is-light .sx-badges li {
  background: var(--card) !important;
  border-color: var(--border) !important;
  color: var(--text-dim) !important;
}

/* ------------------------------------------------------------
   4-PILL FLOATING FROSTED NAV & INFO BUTTON
   ------------------------------------------------------------ */
.sx-nav-wrap {
  position: fixed !important;
  top: 14px !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 100 !important;
  display: flex !important;
  justify-content: center !important;
  padding: 0 12px !important;
  pointer-events: none !important;
}
.sx-nav {
  pointer-events: auto !important;
  display: flex !important;
  align-items: center !important;
  gap: 4px !important;
  padding: 6px 10px 6px 8px !important;
  border: 1px solid rgba(153, 115, 36, 0.24) !important;
  border-radius: 999px !important;
  background: rgba(250, 249, 246, 0.88) !important;
  -webkit-backdrop-filter: blur(18px) saturate(160%) !important;
  backdrop-filter: blur(18px) saturate(160%) !important;
  box-shadow: 0 10px 30px -10px rgba(35, 25, 10, 0.12), 0 1px 0 rgba(255,255,255,0.8) inset !important;
}
.sx-nav a.sx-nav-link {
  padding: 7px 14px !important;
  border-radius: 999px !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  color: var(--text-dim) !important;
  text-decoration: none !important;
  transition: background-color 0.18s var(--ease-motion), color 0.18s var(--ease-motion) !important;
  white-space: nowrap !important;
}
.sx-nav a.sx-nav-link:hover {
  color: var(--text) !important;
  background: rgba(26, 24, 20, 0.05) !important;
}
.sx-nav a.sx-nav-link.is-active {
  color: var(--gold) !important;
  background: var(--gold-soft) !important;
}
.sx-nav .sx-brand {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 2px 10px 2px 2px !important;
  color: var(--text) !important;
  text-decoration: none !important;
  font-family: Cinzel, Georgia, serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.06em !important;
}
.sx-nav .sx-brand img {
  width: 28px !important;
  height: 28px !important;
  border-radius: 50% !important;
  border: 1.5px solid var(--gold) !important;
}
.sx-nav-sep {
  width: 1px !important;
  height: 16px !important;
  background: rgba(26, 24, 20, 0.12) !important;
  margin: 0 4px !important;
}

/* Info Dropdown Toggle Button */
.sx-nav-info-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  padding: 7px 13px !important;
  border: none !important;
  border-radius: 999px !important;
  background: transparent !important;
  color: var(--text-dim) !important;
  font-family: 'Raleway', Inter, sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: background-color 0.18s var(--ease-motion), color 0.18s var(--ease-motion) !important;
}
.sx-nav-info-btn:hover,
.sx-nav-info-btn[aria-expanded="true"] {
  color: var(--text) !important;
  background: rgba(26, 24, 20, 0.05) !important;
}
.sx-nav-info-btn .sx-chevron {
  transition: transform 0.24s var(--ease-motion) !important;
}
.sx-nav-info-btn[aria-expanded="true"] .sx-chevron {
  transform: rotate(180deg) !important;
}

/* ------------------------------------------------------------
   FLOATING INFO POPOVER DRAWER
   ------------------------------------------------------------ */
.sx-info-popover {
  position: absolute !important;
  top: calc(100% + 10px) !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
  z-index: 110 !important;
  width: min(440px, 94vw) !important;
  pointer-events: auto !important;
  animation: popoverFadeIn 0.22s var(--ease-motion) forwards !important;
}
.sx-info-popover[hidden] {
  display: none !important;
}
@keyframes popoverFadeIn {
  from { opacity: 0; transform: translate(-50%, -8px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
.info-card {
  background: #FFFFFF !important;
  border: 1px solid var(--border-strong) !important;
  border-radius: 18px !important;
  box-shadow: var(--shadow-pop) !important;
  padding: 22px !important;
}
.info-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
  padding-bottom: 14px !important;
  border-bottom: 1px solid var(--border) !important;
}
.info-avatar-row {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
}
.info-avatar {
  width: 44px !important;
  height: 44px !important;
  border-radius: 50% !important;
  border: 1.5px solid var(--gold) !important;
  object-fit: cover !important;
}
.info-name {
  display: block !important;
  font-family: Cinzel, Georgia, serif !important;
  font-size: 16px !important;
  color: var(--text) !important;
}
.info-role {
  display: block !important;
  font-size: 12px !important;
  color: var(--text-dim) !important;
  margin-top: 2px !important;
}
.info-status-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 4px 10px !important;
  border-radius: 999px !important;
  background: rgba(21, 128, 61, 0.08) !important;
  border: 1px solid rgba(21, 128, 61, 0.2) !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  color: #15803d !important;
}
.info-bio {
  font-size: 13.5px !important;
  line-height: 1.5 !important;
  color: var(--text-dim) !important;
  margin: 14px 0 !important;
}
.info-actions {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 10px !important;
}
.info-btn {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 10px 14px !important;
  border-radius: 999px !important;
  border: 1px solid var(--border-strong) !important;
  background: var(--card) !important;
  color: var(--text) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  cursor: pointer !important;
  transition: transform 0.18s var(--ease-motion), border-color 0.18s var(--ease-motion), box-shadow 0.18s var(--ease-motion) !important;
}
.info-btn:hover {
  transform: translateY(-2px) !important;
  border-color: var(--gold) !important;
  box-shadow: var(--shadow-sm) !important;
}
.info-btn-primary {
  background: var(--gold) !important;
  color: #FFFFFF !important;
  border-color: var(--gold) !important;
}
.info-btn-primary:hover {
  background: var(--gold-bright) !important;
  color: #FFFFFF !important;
}
.info-btn-copy .copy-toast {
  position: absolute !important;
  inset: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #15803d !important;
  color: #FFFFFF !important;
  border-radius: 999px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  opacity: 0 !important;
  pointer-events: none !important;
  transition: opacity 0.2s ease !important;
}
.info-btn-copy.copied .copy-toast {
  opacity: 1 !important;
}
.info-footer-note {
  margin-top: 14px !important;
  padding-top: 10px !important;
  border-top: 1px solid var(--border) !important;
  display: flex !important;
  justify-content: space-between !important;
  font-size: 11px !important;
  color: var(--text-faint) !important;
  flex-wrap: wrap !important;
  gap: 6px !important;
}

/* ------------------------------------------------------------
   MINI ERIC CHIBI COMPONENT & DIALOGUE BUBBLES
   ------------------------------------------------------------ */
.mini-eric-banner {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
  margin: 18px 0 28px !important;
  max-width: 780px !important;
}
.mini-eric-banner.is-footer {
  margin: 48px auto 20px !important;
  padding-top: 24px !important;
  border-top: 1px dashed var(--border-strong) !important;
}
.mini-eric-char {
  flex-shrink: 0 !important;
  cursor: pointer !important;
  transition: transform 0.2s var(--ease-motion) !important;
  animation: miniEricIdle 4s ease-in-out infinite !important;
}
.mini-eric-char:hover {
  transform: scale(1.08) rotate(-2deg) !important;
}
.mini-eric-char:active {
  transform: scale(0.96) !important;
}
@keyframes miniEricIdle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.mini-eric-bubble {
  position: relative !important;
  background: #FFFFFF !important;
  border: 1px solid var(--border-strong) !important;
  border-radius: 16px !important;
  padding: 12px 18px !important;
  box-shadow: var(--shadow-sm) !important;
}
.mini-eric-bubble::before {
  content: "" !important;
  position: absolute !important;
  left: -8px !important;
  top: 50% !important;
  transform: translateY(-50%) rotate(45deg) !important;
  width: 14px !important;
  height: 14px !important;
  background: #FFFFFF !important;
  border-left: 1px solid var(--border-strong) !important;
  border-bottom: 1px solid var(--border-strong) !important;
}
.mini-eric-tag {
  display: inline-block !important;
  font-family: Cinzel, Georgia, serif !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
  color: var(--gold) !important;
  margin-bottom: 4px !important;
}
.mini-eric-text {
  margin: 0 !important;
  font-size: 13.5px !important;
  line-height: 1.5 !important;
  color: var(--text) !important;
}

/* ------------------------------------------------------------
   MEGAN YAP-INSPIRED CASE STUDY CARDS (HOME)
   ------------------------------------------------------------ */
.megan-work-grid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 28px !important;
  margin-top: 32px !important;
}
.megan-card {
  background: #FFFFFF !important;
  border: 1px solid var(--border) !important;
  border-radius: 20px !important;
  box-shadow: var(--shadow-card) !important;
  overflow: hidden !important;
  transition: transform 0.28s var(--ease-motion), box-shadow 0.28s var(--ease-motion), border-color 0.28s var(--ease-motion) !important;
}
.megan-card:hover {
  transform: translateY(-4px) !important;
  box-shadow: var(--shadow-hover) !important;
  border-color: var(--gold) !important;
}
.megan-card-link {
  display: grid !important;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr) !important;
  text-decoration: none !important;
  color: inherit !important;
}
@media (max-width: 860px) {
  .megan-card-link {
    grid-template-columns: 1fr !important;
  }
}
.megan-card-preview {
  position: relative !important;
  background: #f7f5f0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 24px !important;
  overflow: hidden !important;
}
.megan-card-img {
  width: 100% !important;
  height: auto !important;
  max-height: 280px !important;
  object-fit: cover !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 24px -4px rgba(35, 25, 10, 0.1) !important;
  transition: transform 0.32s var(--ease-motion) !important;
}
.megan-card:hover .megan-card-img {
  transform: scale(1.03) !important;
}
.megan-card-pill {
  position: absolute !important;
  top: 16px !important;
  left: 16px !important;
  padding: 5px 12px !important;
  border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.92) !important;
  backdrop-filter: blur(8px) !important;
  border: 1px solid var(--border-strong) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  color: var(--text) !important;
}
.megan-card-content {
  padding: 28px 32px !important;
  display: flex !important;
  flex-direction: column !important;
}
.megan-meta-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  font-size: 12px !important;
  color: var(--text-faint) !important;
  margin-bottom: 8px !important;
}
.megan-role {
  font-weight: 700 !important;
  color: var(--gold) !important;
}
.megan-title {
  font-family: Cinzel, Georgia, serif !important;
  font-size: clamp(20px, 2.2vw, 24px) !important;
  line-height: 1.25 !important;
  color: var(--text) !important;
  margin: 0 0 10px !important;
}
.megan-desc {
  font-size: 14.5px !important;
  line-height: 1.55 !important;
  color: var(--text-dim) !important;
  margin: 0 0 16px !important;
}
.megan-tags {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 6px !important;
  margin-bottom: 18px !important;
}
.megan-tags span {
  padding: 4px 10px !important;
  border-radius: 999px !important;
  background: var(--bg-subtle) !important;
  border: 1px solid var(--border) !important;
  font-size: 11.5px !important;
  color: var(--text-dim) !important;
}
.megan-outcome-banner {
  margin-top: auto !important;
  padding: 10px 14px !important;
  border-radius: 10px !important;
  background: rgba(153, 115, 36, 0.08) !important;
  border: 1px solid rgba(153, 115, 36, 0.2) !important;
  font-size: 12.5px !important;
  color: var(--text) !important;
}
.megan-outcome-banner strong {
  color: var(--gold) !important;
}

/* ------------------------------------------------------------
   ABOUT PAGE: FOUNDATIONS & ANIME WALL
   ------------------------------------------------------------ */
.about-hero {
  padding: 32px 0 24px !important;
}
.about-title {
  font-family: Cinzel, Georgia, serif !important;
  font-size: clamp(28px, 4vw, 44px) !important;
  line-height: 1.2 !important;
  color: var(--text) !important;
  margin: 12px 0 16px !important;
}
.about-lede {
  font-size: 18px !important;
  line-height: 1.6 !important;
  color: var(--text-dim) !important;
  max-width: 68ch !important;
}
.about-section {
  padding: 56px 0 32px !important;
  border-top: 1px solid var(--border) !important;
}
.section-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: 'Raleway', sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.14em !important;
  text-transform: uppercase !important;
  color: var(--gold) !important;
  margin-bottom: 12px !important;
}
.section-heading {
  font-family: Cinzel, Georgia, serif !important;
  font-size: clamp(24px, 3vw, 32px) !important;
  color: var(--text) !important;
  margin: 0 0 8px !important;
}
.section-head-row {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-end !important;
  gap: 20px !important;
  flex-wrap: wrap !important;
  margin-bottom: 24px !important;
}
.watching-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  background: var(--card) !important;
  border: 1px solid var(--border-strong) !important;
  font-size: 12.5px !important;
  color: var(--text-dim) !important;
  box-shadow: var(--shadow-sm) !important;
}
.watching-dot {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  background: #e11d48 !important;
  box-shadow: 0 0 6px rgba(225, 29, 72, 0.6) !important;
}

/* Foundations Grid */
.foundations-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 20px !important;
  margin-top: 24px !important;
}
@media (max-width: 860px) {
  .foundations-grid {
    grid-template-columns: 1fr !important;
  }
}
.foundation-card {
  background: #FFFFFF !important;
  border: 1px solid var(--border) !important;
  border-radius: 16px !important;
  padding: 24px !important;
  box-shadow: var(--shadow-card) !important;
  display: flex !important;
  flex-direction: column !important;
}
.card-bible .bible-cover {
  position: relative !important;
  width: 100% !important;
  height: 90px !important;
  background: linear-gradient(135deg, #2b1f1d, #1c1412) !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 4px 14px rgba(0,0,0,0.18) !important;
  margin-bottom: 18px !important;
}
.bible-cross {
  font-size: 28px !important;
  color: var(--gold-bright) !important;
}
.bible-emboss {
  position: absolute !important;
  bottom: 8px !important;
  font-family: Cinzel, Georgia, serif !important;
  font-size: 10px !important;
  letter-spacing: 0.16em !important;
  color: rgba(255, 255, 255, 0.7) !important;
}
.water-glass-art {
  height: 90px !important;
  background: linear-gradient(180deg, #eff6ff, #dbeafe) !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 36px !important;
  margin-bottom: 18px !important;
}
.downtime-art {
  height: 90px !important;
  background: linear-gradient(135deg, #fef2f2, #fee2e2) !important;
  border-radius: 8px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
  font-size: 28px !important;
  margin-bottom: 18px !important;
}
.card-tag {
  display: inline-block !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase !important;
  color: var(--gold) !important;
  margin-bottom: 4px !important;
}
.foundation-card h3 {
  font-family: Cinzel, Georgia, serif !important;
  font-size: 18px !important;
  color: var(--text) !important;
  margin: 0 0 8px !important;
}
.foundation-card p {
  font-size: 14px !important;
  line-height: 1.55 !important;
  color: var(--text-dim) !important;
  margin: 0 !important;
}

/* Anime Wall */
.anime-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important;
  gap: 20px !important;
}
.anime-card {
  position: relative !important;
  height: 320px !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  border: 1px solid var(--border) !important;
  box-shadow: var(--shadow-card) !important;
  cursor: pointer !important;
  background: #111111 !important;
}
.anime-poster {
  position: absolute !important;
  inset: 0 !important;
  padding: 20px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  color: #FFFFFF !important;
  background-size: cover !important;
  background-position: center !important;
  transition: transform 0.36s var(--ease-motion) !important;
}
.anime-card:hover .anime-poster {
  transform: scale(1.05) !important;
}
.anime-naruto { background: linear-gradient(135deg, #ea580c, #9a3412); }
.anime-bleach { background: linear-gradient(135deg, #1e293b, #0f172a); }
.anime-worldtrigger { background: linear-gradient(135deg, #059669, #064e3b); }
.anime-spiritedaway { background: linear-gradient(135deg, #0284c7, #075985); }
.anime-hellsparadise { background: linear-gradient(135deg, #b91c1c, #7f1d1d); }

.anime-kanji {
  font-size: 32px !important;
  font-weight: 900 !important;
  opacity: 0.3 !important;
  letter-spacing: 0.1em !important;
}
.anime-num {
  font-family: Cinzel, serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  color: rgba(255, 255, 255, 0.7) !important;
}
.anime-cover-title h3 {
  font-family: Cinzel, Georgia, serif !important;
  font-size: 22px !important;
  color: #FFFFFF !important;
  margin: 0 !important;
}
.anime-cover-title span {
  font-size: 11px !important;
  opacity: 0.8 !important;
}
.anime-reveal {
  position: absolute !important;
  inset: 0 !important;
  background: rgba(23, 21, 18, 0.94) !important;
  backdrop-filter: blur(12px) !important;
  padding: 24px !important;
  color: #FAF9F6 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: center !important;
  opacity: 0 !important;
  transform: translateY(12px) !important;
  transition: opacity 0.28s var(--ease-motion), transform 0.28s var(--ease-motion) !important;
}
.anime-card:hover .anime-reveal,
.anime-card:focus .anime-reveal {
  opacity: 1 !important;
  transform: translateY(0) !important;
}
.reveal-tag {
  font-size: 11px !important;
  font-weight: 700 !important;
  letter-spacing: 0.12em !important;
  text-transform: uppercase !important;
  color: var(--gold-bright) !important;
  margin-bottom: 6px !important;
}
.anime-reveal h4 {
  font-family: Cinzel, serif !important;
  font-size: 16px !important;
  color: #FFFFFF !important;
  margin: 0 0 10px !important;
}
.anime-reveal p {
  font-size: 13px !important;
  line-height: 1.5 !important;
  color: #d6d3cd !important;
  margin: 0 !important;
}

/* ------------------------------------------------------------
   INTERACTIVE NINTENDO DS LITE (CRIMSON RED & ONYX BLACK)
   ------------------------------------------------------------ */
.ds-container {
  max-width: 580px !important;
  margin: 28px auto !important;
}
.ds-lid {
  cursor: pointer !important;
  perspective: 1000px !important;
  transition: transform 0.24s var(--ease-motion) !important;
}
.ds-lid:hover {
  transform: translateY(-4px) !important;
}
.ds-lid-face {
  position: relative !important;
  background: linear-gradient(135deg, #b91c1c, #881337) !important;
  border-radius: 20px 20px 8px 8px !important;
  padding: 40px 32px 48px !important;
  border: 2px solid #7f1d1d !important;
  box-shadow: 0 18px 40px -8px rgba(185, 28, 28, 0.35), 0 4px 12px rgba(0,0,0,0.15) !important;
  text-align: center !important;
  color: #FFFFFF !important;
}
.ds-lid-sheen {
  position: absolute !important;
  inset: 0 !important;
  border-radius: 18px 18px 6px 6px !important;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.35), transparent 70%) !important;
  pointer-events: none !important;
}
.ds-emblem {
  display: inline-flex !important;
  gap: 6px !important;
  margin-bottom: 12px !important;
}
.ds-sq {
  width: 14px !important;
  height: 14px !important;
  border: 2.5px solid rgba(255, 255, 255, 0.9) !important;
  border-radius: 3px !important;
}
.ds-engraving {
  display: block !important;
  font-family: 'Raleway', sans-serif !important;
  font-size: 14px !important;
  font-weight: 700 !important;
  letter-spacing: 0.16em !important;
  text-transform: uppercase !important;
  color: rgba(255, 255, 255, 0.95) !important;
  margin-bottom: 18px !important;
}
.ds-open-prompt {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  padding: 8px 18px !important;
  border-radius: 999px !important;
  background: rgba(0, 0, 0, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #FFFFFF !important;
}
.ds-hinge-band {
  height: 12px !important;
  background: #111111 !important;
  border-radius: 0 0 12px 12px !important;
  margin-top: -2px !important;
  border: 1px solid #000000 !important;
}

/* Console Open State */
.ds-console {
  background: #141414 !important;
  border-radius: 18px !important;
  padding: 18px !important;
  border: 2px solid #292929 !important;
  box-shadow: 0 24px 60px -12px rgba(0,0,0,0.4) !important;
  color: #FFFFFF !important;
  animation: dsOpenSnap 0.34s var(--ease-motion) forwards !important;
}
@keyframes dsOpenSnap {
  from { opacity: 0; transform: scale(0.96); }
  to { opacity: 1; transform: scale(1); }
}
.ds-top-housing {
  background: #1c1c1c !important;
  border-radius: 14px !important;
  padding: 16px !important;
  border: 1px solid #2e2e2e !important;
  position: relative !important;
}
.ds-top-bezel {
  display: flex !important;
  align-items: center !important;
  gap: 14px !important;
}
.ds-speaker i {
  display: block !important;
  width: 4px !important;
  height: 4px !important;
  border-radius: 50% !important;
  background: #3a3a3a !important;
  margin: 3px 0 !important;
}
.ds-screen {
  flex: 1 !important;
  background: #0d1217 !important;
  border-radius: 8px !important;
  border: 2px solid #222a35 !important;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.7) !important;
  overflow: hidden !important;
}
.ds-top-screen {
  min-height: 180px !important;
}
.ds-top-bar {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 6px 10px !important;
  background: #16202c !important;
  border-bottom: 1px solid #222a35 !important;
  font-family: monospace !important;
  font-size: 11px !important;
  color: #7dd3fc !important;
}
.ds-screen-stage {
  padding: 16px !important;
}
.ds-close-btn {
  position: absolute !important;
  top: 10px !important;
  right: 10px !important;
  background: rgba(0, 0, 0, 0.5) !important;
  border: 1px solid #444 !important;
  color: #ccc !important;
  font-size: 11px !important;
  padding: 3px 8px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
}
.ds-close-btn:hover {
  color: #fff !important;
  border-color: #888 !important;
}
.ds-hinge-middle {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 8px 16px !important;
  background: #0d0d0d !important;
  border-radius: 6px !important;
  margin: 10px 0 !important;
  font-size: 9px !important;
  letter-spacing: 0.1em !important;
  color: #555 !important;
}
.ds-leds {
  display: flex !important;
  gap: 6px !important;
}
.ds-led {
  width: 6px !important;
  height: 6px !important;
  border-radius: 50% !important;
}
.ds-led-pwr { background: #22c55e; box-shadow: 0 0 5px #22c55e; }
.ds-led-chr { background: #ea580c; }

.ds-bottom-housing {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 14px !important;
  background: #1c1c1c !important;
  border-radius: 14px !important;
  padding: 14px !important;
  border: 1px solid #2e2e2e !important;
}
.ds-touch-screen {
  flex: 1 !important;
  min-height: 180px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  background: #101722 !important;
  padding: 12px !important;
}
.ds-touch-controls {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-top: 1px solid #222a35 !important;
  padding-top: 8px !important;
  margin-top: 8px !important;
}
.ds-touch-nav-btn {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
  color: #e2e8f0 !important;
  border-radius: 6px !important;
  padding: 5px 12px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
}
.ds-touch-nav-btn:hover {
  background: #334155 !important;
}
.ds-touch-indicator {
  font-family: monospace !important;
  font-size: 11px !important;
  color: #94a3b8 !important;
}

/* D-Pad */
.ds-dpad {
  position: relative !important;
  width: 76px !important;
  height: 76px !important;
}
.dpad-key {
  position: absolute !important;
  background: #2b2b2b !important;
  border: 1px solid #141414 !important;
  color: #888 !important;
  font-size: 10px !important;
  cursor: pointer !important;
}
.dpad-key:active { background: #111 !important; color: #fff !important; }
.dpad-up { top: 0; left: 26px; width: 24px; height: 26px; border-radius: 4px 4px 0 0; }
.dpad-down { bottom: 0; left: 26px; width: 24px; height: 26px; border-radius: 0 0 4px 4px; }
.dpad-left { top: 26px; left: 0; width: 26px; height: 24px; border-radius: 4px 0 0 4px; }
.dpad-right { top: 26px; right: 0; width: 26px; height: 24px; border-radius: 0 4px 4px 0; }
.dpad-core { position: absolute; top: 26px; left: 26px; width: 24px; height: 24px; background: #2b2b2b; }

/* ABXY Buttons */
.ds-abxy {
  position: relative !important;
  width: 76px !important;
  height: 76px !important;
}
.ds-btn {
  position: absolute !important;
  width: 22px !important;
  height: 22px !important;
  border-radius: 50% !important;
  background: #2b2b2b !important;
  border: 1px solid #141414 !important;
  color: #bbb !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  cursor: pointer !important;
}
.ds-btn:active { background: #111 !important; color: #fff !important; }
.ds-btn-x { top: 0; left: 27px; }
.ds-btn-b { bottom: 0; left: 27px; }
.ds-btn-y { top: 27px; left: 0; }
.ds-btn-a { top: 27px; right: 0; }
.ds-start-select {
  display: flex !important;
  justify-content: center !important;
  gap: 8px !important;
  margin-top: 10px !important;
}
.ds-pill-btn {
  background: #2b2b2b !important;
  border: 1px solid #141414 !important;
  border-radius: 999px !important;
  color: #666 !important;
  font-size: 7px !important;
  font-weight: 700 !important;
  padding: 2px 6px !important;
  letter-spacing: 0.05em !important;
}

/* ------------------------------------------------------------
   PLAYGROUND: STUDY BUDDY SIM & TOKEN LAB
   ------------------------------------------------------------ */
.sb-sim-card {
  background: #FFFFFF !important;
  border: 1px solid var(--border-strong) !important;
  border-radius: 16px !important;
  overflow: hidden !important;
  box-shadow: var(--shadow-card) !important;
  margin-top: 20px !important;
}
.sb-sim-topbar {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  padding: 10px 16px !important;
  background: #f7f5f0 !important;
  border-bottom: 1px solid var(--border) !important;
}
.sb-sim-dot {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
}
.sb-sim-dot.red { background: #ef4444; }
.sb-sim-dot.yellow { background: #f59e0b; }
.sb-sim-dot.green { background: #10b981; }
.sb-sim-title {
  font-size: 11px !important;
  font-weight: 600 !important;
  color: var(--text-faint) !important;
  margin-left: 8px !important;
}
.sb-sim-body {
  padding: 28px !important;
  display: grid !important;
  grid-template-columns: 240px 1fr !important;
  gap: 28px !important;
  align-items: center !important;
}
@media (max-width: 760px) {
  .sb-sim-body {
    grid-template-columns: 1fr !important;
  }
}
.sb-mambo-preview {
  width: 80px !important;
  height: 80px !important;
  border-radius: 20px !important;
  background: #7c3aed !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #fff !important;
  font-size: 24px !important;
  margin-bottom: 12px !important;
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.3) !important;
}
.sb-sim-timer {
  font-family: monospace !important;
  font-size: 42px !important;
  font-weight: 700 !important;
  color: var(--text) !important;
  margin-bottom: 12px !important;
}
.sb-sim-btn-row {
  display: flex !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
}
.sb-sim-btn {
  padding: 8px 16px !important;
  border-radius: 999px !important;
  border: 1px solid var(--border-strong) !important;
  background: #FFFFFF !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}
.sb-sim-btn.active,
.sb-sim-btn:hover {
  background: #7c3aed !important;
  color: #FFFFFF !important;
  border-color: #7c3aed !important;
}
.sb-sim-status {
  font-size: 13px !important;
  color: var(--text-dim) !important;
  margin-top: 12px !important;
}

/* Token Lab Grid */
.token-lab-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 24px !important;
  margin-top: 24px !important;
}
@media (max-width: 820px) {
  .token-lab-grid {
    grid-template-columns: 1fr !important;
  }
}
.token-lab-controls {
  background: #FFFFFF !important;
  border: 1px solid var(--border) !important;
  border-radius: 16px !important;
  padding: 24px !important;
  box-shadow: var(--shadow-card) !important;
}
.control-group {
  margin-bottom: 20px !important;
}
.control-group label {
  display: flex !important;
  justify-content: space-between !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  color: var(--text) !important;
  margin-bottom: 8px !important;
}
.control-group input[type="range"] {
  width: 100% !important;
}
.token-palette-row {
  display: flex !important;
  gap: 10px !important;
}
.palette-swatch {
  width: 32px !important;
  height: 32px !important;
  border-radius: 50% !important;
  border: 2px solid transparent !important;
  cursor: pointer !important;
  transition: transform 0.2s ease !important;
}
.palette-swatch.is-active {
  border-color: #171512 !important;
  transform: scale(1.15) !important;
}
.sample-token-card {
  background: #FFFFFF !important;
  border: 1px solid var(--border-strong) !important;
  border-radius: 16px !important;
  padding: 28px !important;
  box-shadow: var(--shadow-card) !important;
  transition: all 0.2s ease !important;
}
.sample-badge {
  display: inline-block !important;
  padding: 4px 10px !important;
  border-radius: 999px !important;
  background: rgba(153, 115, 36, 0.1) !important;
  color: var(--gold) !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  margin-bottom: 12px !important;
}
.sample-title {
  font-family: Cinzel, serif !important;
  font-size: 20px !important;
  color: var(--text) !important;
  margin: 0 0 10px !important;
}
.sample-copy {
  font-size: 13.5px !important;
  line-height: 1.55 !important;
  color: var(--text-dim) !important;
  margin: 0 0 20px !important;
}
.sample-actions {
  display: flex !important;
  gap: 10px !important;
}
.sample-btn-primary {
  padding: 10px 18px !important;
  border-radius: 999px !important;
  background: var(--gold) !important;
  border: 1px solid var(--gold) !important;
  color: #fff !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}
.sample-btn-secondary {
  padding: 10px 18px !important;
  border-radius: 999px !important;
  background: transparent !important;
  border: 1px solid var(--border-strong) !important;
  color: var(--text) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
}

/* AI Teaser Card */
.ai-teaser-card {
  background: linear-gradient(135deg, #1e1b18, #2a241f) !important;
  border-radius: 20px !important;
  padding: 36px 32px !important;
  color: #FAF9F6 !important;
  box-shadow: var(--shadow-card) !important;
  margin-top: 24px !important;
}
.ai-chip {
  display: inline-block !important;
  padding: 4px 12px !important;
  border-radius: 999px !important;
  background: rgba(184, 142, 44, 0.25) !important;
  border: 1px solid var(--gold-bright) !important;
  color: #f7df96 !important;
  font-size: 11px !important;
  font-weight: 700 !important;
  margin-bottom: 12px !important;
}
.ai-teaser-card h2 {
  font-family: Cinzel, serif !important;
  font-size: clamp(22px, 3vw, 30px) !important;
  color: #FFFFFF !important;
  margin: 0 0 12px !important;
}
.ai-teaser-card p {
  font-size: 15px !important;
  line-height: 1.6 !important;
  color: #d6d3cd !important;
  max-width: 65ch !important;
  margin: 0 0 20px !important;
}
.ai-teaser-tags {
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
}
.ai-teaser-tags span {
  padding: 5px 12px !important;
  border-radius: 999px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  font-size: 12px !important;
  color: #f0ede8 !important;
}

/* Experience Cards on Home */
.experience-list {
  display: grid !important;
  gap: 16px !important;
  margin-top: 24px !important;
}
.exp-row-card {
  background: #FFFFFF !important;
  border: 1px solid var(--border) !important;
  border-radius: 16px !important;
  padding: 24px !important;
  box-shadow: var(--shadow-card) !important;
}
.exp-header {
  display: flex !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  gap: 12px !important;
}
.exp-company {
  font-size: 13px !important;
  font-weight: 700 !important;
  color: var(--gold) !important;
  text-transform: uppercase !important;
  letter-spacing: 0.08em !important;
}
.exp-role {
  font-family: Cinzel, serif !important;
  font-size: 20px !important;
  color: var(--text) !important;
  margin: 4px 0 0 !important;
}
.exp-badge {
  padding: 4px 10px !important;
  border-radius: 999px !important;
  font-size: 11px !important;
  font-weight: 700 !important;
}
.exp-badge.active {
  background: rgba(21, 128, 61, 0.1) !important;
  border: 1px solid rgba(21, 128, 61, 0.25) !important;
  color: #15803d !important;
}
.exp-badge.completed {
  background: var(--bg-subtle) !important;
  border: 1px solid var(--border) !important;
  color: var(--text-dim) !important;
}
.exp-meta-line {
  font-size: 12px !important;
  color: var(--text-faint) !important;
  margin: 6px 0 12px !important;
}
.exp-copy {
  font-size: 14px !important;
  line-height: 1.55 !important;
  color: var(--text-dim) !important;
  margin: 0 !important;
}
`;

  // Preserve existing base rules (smooth scroll engine, reset) cleanly & idempotently
  const markerIdx = currentCss.indexOf('PORTFOLIO 2.0: STUDIO PAPER & GLASS LIGHT MODE SYSTEM');
  let baseCss = currentCss;
  if (markerIdx !== -1) {
    const commentStart = currentCss.lastIndexOf('/*', markerIdx);
    if (commentStart !== -1) baseCss = currentCss.slice(0, commentStart).trim();
  }
  backupAndWrite(cssPath, (baseCss ? baseCss + '\n\n' : '') + p2Css.trim() + '\n');
}

// ---------------------------------------------------------------------------
// 9. ASSETS/JS/SCROLL.JS GENERATOR
// ---------------------------------------------------------------------------
function buildScrollJs() {
  const jsPath = path.join(ROOT, 'assets', 'js', 'scroll.js');

  const jsContent = `/**
 * Portfolio 2.0 Engine
 * Handles: Pure JS Smooth Scroll, Info Popover, Nintendo DS Lite, Mini Eric Emotes, Token Sandbox
 */
(function() {
  'use strict';

  // 1. INFO POPOVER DROPDOWN
  const infoBtn = document.getElementById('infoBtn');
  const infoPopover = document.getElementById('infoPopover');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (infoBtn && infoPopover) {
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = infoBtn.getAttribute('aria-expanded') === 'true';
      infoBtn.setAttribute('aria-expanded', !isExpanded);
      infoPopover.hidden = isExpanded;
    });

    document.addEventListener('click', (e) => {
      if (!infoPopover.hidden && !infoPopover.contains(e.target) && e.target !== infoBtn) {
        infoBtn.setAttribute('aria-expanded', 'false');
        infoPopover.hidden = true;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !infoPopover.hidden) {
        infoBtn.setAttribute('aria-expanded', 'false');
        infoPopover.hidden = true;
      }
    });
  }

  // Copy Email Toast
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.dataset.email || 'ericforall247@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        setTimeout(() => copyEmailBtn.classList.remove('copied'), 2000);
      });
    });
  }

  // 2. MINI ERIC EMOTE & SPEECH ROTATOR
  const miniEricChars = document.querySelectorAll('.mini-eric-char');
  const quotes = [
    "I see you're looking at my work—you must be looking to hire me!",
    "Remember to stay hydrated! Water is king 💧",
    "Fun fact: I still have my childhood Pokémon card binder safe!",
    "Every morning starts grounded: reading a chapter before pixels.",
    "Tokens, design systems, and clickable flows—that's my jam."
  ];

  miniEricChars.forEach(char => {
    char.addEventListener('click', () => {
      const banner = char.closest('.mini-eric-banner');
      if (!banner) return;
      const textEl = banner.querySelector('.mini-eric-text');
      if (textEl) {
        const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
        textEl.textContent = nextQuote;
      }
      char.style.transform = 'scale(1.2) rotate(6deg)';
      setTimeout(() => { char.style.transform = ''; }, 260);
    });
  });

  // 3. INTERACTIVE NINTENDO DS LITE (CRIMSON RED & ONYX BLACK)
  const dsLid = document.getElementById('dsLid');
  const dsConsole = document.getElementById('dsConsole');
  const dsCloseBtn = document.getElementById('dsCloseBtn');
  const dsCartridgeTitle = document.getElementById('dsCartridgeTitle');
  const dsScreenStage = document.getElementById('dsScreenStage');
  const dsTouchBody = document.getElementById('dsTouchBody');
  const touchIndicator = document.getElementById('touchIndicator');
  const dpadLeft = document.getElementById('dpadLeft');
  const dpadRight = document.getElementById('dpadRight');
  const touchPrev = document.getElementById('touchPrev');
  const touchNext = document.getElementById('touchNext');

  const cartridges = [
    {
      title: "POKÉMON BLACK",
      color: "#0f172a",
      stageHtml: \`
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🦦 ⚡</div>
          <strong style="display:block; color:#7dd3fc; font-size:15px; font-family:monospace;">STARTER: OSHAWOTT</strong>
          <small style="color:#94a3b8; font-size:11px;">UNOVA REGION • GENERATION V</small>
        </div>
      \`,
      touchHtml: \`
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#38bdf8; display:block; margin-bottom:4px;">First Pokémon Game as a Kid</strong>
          <p style="margin:0 0 8px; font-style:italic;">"My first ever DS game as a kid! Starter: Oshawott (he's adorable). Fun fact: I kept getting stuck and never finished it as a kid, but as an adult that issue doesn't happen anymore!"</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">STATUS: CLEARED WITH HONOR</span>
        </div>
      \`
    },
    {
      title: "POKÉMON PLATINUM",
      color: "#3b0764",
      stageHtml: \`
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🐉 🛡️</div>
          <strong style="display:block; color:#c084fc; font-size:15px; font-family:monospace;">LEGENDARY: GIRATINA</strong>
          <small style="color:#94a3b8; font-size:11px;">SINNOH REGION • DISTORTION WORLD</small>
        </div>
      \`,
      touchHtml: \`
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#c084fc; display:block; margin-bottom:4px;">Bulky Legendaries &amp; Shuckle Love</strong>
          <p style="margin:0 0 8px; font-style:italic;">"Platinum holds Giratina, one of my absolute favorite legendaries—incredible Ghost/Dragon typing and total defensive bulk. Also, huge love for Shuckle because of its quirky, unyielding design!"</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">FAVORITES: GIRATINA &amp; SHUCKLE</span>
        </div>
      \`
    },
    {
      title: "MARIO KART DS",
      color: "#b91c1c",
      stageHtml: \`
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🏎️ 🏁</div>
          <strong style="display:block; color:#f87171; font-size:15px; font-family:monospace;">CIRCUIT: RAINBOW ROAD</strong>
          <small style="color:#94a3b8; font-size:11px;">HANDHELD WIRELESS MULTIPLAYER</small>
        </div>
      \`,
      touchHtml: \`
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#f87171; display:block; margin-bottom:4px;">Road Trip Battles</strong>
          <p style="margin:0 0 8px; font-style:italic;">"Played Mario Kart DS during road trips and holidays with friends. Handheld multiplayer at its absolute peak."</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">CLASSIC MEMORIES</span>
        </div>
      \`
    },
    {
      title: "POKÉMON CARD BINDER",
      color: "#997324",
      stageHtml: \`
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🎴 ✨</div>
          <strong style="display:block; color:#fde047; font-size:15px; font-family:monospace;">VINTAGE COLLECTION</strong>
          <small style="color:#94a3b8; font-size:11px;">PHYSICAL CARDS KEPT SAFE</small>
        </div>
      \`,
      touchHtml: \`
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#fde047; display:block; margin-bottom:4px;">Preserved Since Childhood</strong>
          <p style="margin:0 0 8px; font-style:italic;">"Collected physical cards growing up, traded with friends at school, and I still have my binder kept safe today!"</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">COLLECTION VAULT ACTIVE</span>
        </div>
      \`
    }
  ];

  let activeCartIdx = 0;

  function renderCartridge(idx) {
    if (!dsCartridgeTitle || !dsScreenStage || !dsTouchBody) return;
    const item = cartridges[idx];
    dsCartridgeTitle.textContent = item.title;
    dsScreenStage.innerHTML = item.stageHtml;
    dsTouchBody.innerHTML = item.touchHtml;
    if (touchIndicator) {
      touchIndicator.textContent = \`\${idx + 1} / \${cartridges.length}\`;
    }
  }

  if (dsLid && dsConsole) {
    dsLid.addEventListener('click', () => {
      dsLid.hidden = true;
      dsConsole.hidden = false;
      renderCartridge(activeCartIdx);
    });

    if (dsCloseBtn) {
      dsCloseBtn.addEventListener('click', () => {
        dsConsole.hidden = true;
        dsLid.hidden = false;
      });
    }

    function prevCart() {
      activeCartIdx = (activeCartIdx - 1 + cartridges.length) % cartridges.length;
      renderCartridge(activeCartIdx);
    }
    function nextCart() {
      activeCartIdx = (activeCartIdx + 1) % cartridges.length;
      renderCartridge(activeCartIdx);
    }

    if (dpadLeft) dpadLeft.addEventListener('click', prevCart);
    if (dpadRight) dpadRight.addEventListener('click', nextCart);
    if (touchPrev) touchPrev.addEventListener('click', prevCart);
    if (touchNext) touchNext.addEventListener('click', nextCart);
  }

  // 4. PLAYGROUND TOKEN LAB CONTROLS
  const radiusSlider = document.getElementById('radiusSlider');
  const radiusValue = document.getElementById('radiusValue');
  const tokenPreviewCard = document.getElementById('tokenPreviewCard');
  const paletteSwatches = document.querySelectorAll('.palette-swatch');

  if (radiusSlider && tokenPreviewCard && radiusValue) {
    radiusSlider.addEventListener('input', (e) => {
      const val = e.target.value + 'px';
      radiusValue.textContent = val;
      tokenPreviewCard.style.borderRadius = val;
    });
  }

  if (paletteSwatches.length && tokenPreviewCard) {
    paletteSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        paletteSwatches.forEach(s => s.classList.remove('is-active'));
        swatch.classList.add('is-active');
        const color = swatch.dataset.color;
        const btn = tokenPreviewCard.querySelector('.sample-btn-primary');
        const badge = tokenPreviewCard.querySelector('.sample-badge');
        if (btn) { btn.style.background = color; btn.style.borderColor = color; }
        if (badge) { badge.style.color = color; badge.style.background = color + '18'; }
      });
    });
  }

  // 5. STUDY BUDDY WEB SIMULATOR
  const sbStartBtn = document.getElementById('sbStartBtn');
  const sbBreakBtn = document.getElementById('sbBreakBtn');
  const sbResetBtn = document.getElementById('sbResetBtn');
  const sbTimer = document.getElementById('sbTimer');
  const sbStatusText = document.getElementById('sbStatusText');

  if (sbStartBtn && sbTimer && sbStatusText) {
    let timerInt = null;
    let secondsLeft = 25 * 60;

    function formatTime(sec) {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      return \`\${m}:\${s}\`;
    }

    sbStartBtn.addEventListener('click', () => {
      clearInterval(timerInt);
      sbStartBtn.classList.add('active');
      if (sbBreakBtn) sbBreakBtn.classList.remove('active');
      sbStatusText.textContent = "Focus session running: Mambo blocks distracting sites so you can stay in flow.";
      timerInt = setInterval(() => {
        if (secondsLeft > 0) {
          secondsLeft--;
          sbTimer.textContent = formatTime(secondsLeft);
        } else {
          clearInterval(timerInt);
          sbStatusText.textContent = "Great job! Time to take a hydration break 💧";
        }
      }, 1000);
    });

    if (sbBreakBtn) {
      sbBreakBtn.addEventListener('click', () => {
        clearInterval(timerInt);
        secondsLeft = 5 * 60;
        sbTimer.textContent = formatTime(secondsLeft);
        sbBreakBtn.classList.add('active');
        sbStartBtn.classList.remove('active');
        sbStatusText.textContent = "Break mode: Step away, drink a glass of water, and rest your eyes!";
      });
    }

    if (sbResetBtn) {
      sbResetBtn.addEventListener('click', () => {
        clearInterval(timerInt);
        secondsLeft = 25 * 60;
        sbTimer.textContent = "25:00";
        sbStartBtn.classList.remove('active');
        if (sbBreakBtn) sbBreakBtn.classList.remove('active');
        sbStatusText.textContent = "Timer reset. Click Start Focus when you're ready.";
      });
    }
  }

  // 6. BUTTERY PURE JS SMOOTH SCROLL (Header alignment)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const nav = document.querySelector('.sx-nav');
    const navHeight = nav ? nav.getBoundingClientRect().height + 28 : 84;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

    const startY = window.pageYOffset;
    const diff = targetTop - startY;
    const duration = Math.min(900, Math.max(500, Math.abs(diff) * 0.55));
    let start = null;

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

})();
`;

  backupAndWrite(jsPath, jsContent);
}

// ---------------------------------------------------------------------------
// 10. MAIN EXECUTION
// ---------------------------------------------------------------------------
console.log("Generating Portfolio 2.0 files...");
backupAndWrite(path.join(ROOT, 'about.html'), buildAboutHtml());
backupAndWrite(path.join(ROOT, 'playground.html'), buildPlaygroundHtml());
backupAndWrite(path.join(ROOT, 'index.html'), buildIndexHtml());
updateCaseStudies();
buildScrollCss();
buildScrollJs();

console.log("\n✅ PORTFOLIO 2.0 GENERATION COMPLETE!");

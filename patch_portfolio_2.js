const fs = require('fs');
const path = require('path');

const ROOT = process.env.TARGET_DIR || process.cwd();
console.log("==> Applying Portfolio 2.0 Refinements in:", ROOT);

function backupAndWrite(filePath, content) {
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, filePath + '.bak');
  } else {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Updated: ${path.relative(ROOT, filePath)} (${content.length} bytes)`);
}

// ---------------------------------------------------------------------------
// 1. FULL BODY CHIBI MINI ERIC (Ray-Bans, No Headset, Nike Retro 1s High)
// ---------------------------------------------------------------------------
function getMiniEricSvg(width = 80, height = 104) {
  return `<svg class="mini-eric-avatar" width="${width}" height="${height}" viewBox="0 0 100 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mini Eric full body chibi anime avatar">
  <!-- Ground Shadow -->
  <ellipse cx="50" cy="126" rx="30" ry="4" fill="rgba(35, 25, 10, 0.14)"/>

  <!-- Legs / Charcoal Pants -->
  <path d="M38 78 L36 108 L45 108 L46 80 Z" fill="#24272a"/>
  <path d="M54 80 L55 108 L64 108 L62 78 Z" fill="#24272a"/>
  <line x1="46" y1="80" x2="46" y2="92" stroke="#181a1c" stroke-width="1.5"/>
  <line x1="54" y1="80" x2="54" y2="92" stroke="#181a1c" stroke-width="1.5"/>

  <!-- Left Shoe: Nike Air Jordan Retro 1 High (Chicago/Bred) -->
  <g class="shoe-left">
    <path d="M34 104 L34 116 L45 116 L46 104 Z" fill="#dc2626"/>
    <path d="M34 104 L34 108 L46 108 L46 104 Z" fill="#18181b"/>
    <rect x="26" y="120" width="22" height="4" rx="1.5" fill="#ffffff" stroke="#e4e4e7" stroke-width="0.6"/>
    <rect x="26" y="123" width="22" height="1.6" rx="0.8" fill="#dc2626"/>
    <path d="M28 120 C26 120, 26 114, 34 113 L45 113 C46 113, 46 120, 45 120 Z" fill="#ffffff"/>
    <path d="M26 120 C25 117, 29 114, 34 114 L34 120 Z" fill="#dc2626"/>
    <path d="M34 117 Q39 118 45 114 Q41 116 35 116 Z" fill="#18181b"/>
    <line x1="36" y1="110" x2="41" y2="110" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="35" y1="113" x2="42" y2="113" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
  </g>

  <!-- Right Shoe: Nike Air Jordan Retro 1 High -->
  <g class="shoe-right">
    <path d="M54 104 L55 116 L66 116 L66 104 Z" fill="#dc2626"/>
    <path d="M54 104 L54 108 L66 108 L66 104 Z" fill="#18181b"/>
    <rect x="52" y="120" width="22" height="4" rx="1.5" fill="#ffffff" stroke="#e4e4e7" stroke-width="0.6"/>
    <rect x="52" y="123" width="22" height="1.6" rx="0.8" fill="#dc2626"/>
    <path d="M55 120 C54 120, 54 113, 65 113 C73 114, 73 120, 72 120 Z" fill="#ffffff"/>
    <path d="M65 120 C65 114, 70 114, 73 117 C73 120, 68 120, 65 120 Z" fill="#dc2626"/>
    <path d="M55 114 Q61 118 66 117 Q60 116 55 114 Z" fill="#18181b"/>
    <line x1="58" y1="110" x2="63" y2="110" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
    <line x1="57" y1="113" x2="64" y2="113" stroke="#18181b" stroke-width="1.2" stroke-linecap="round"/>
  </g>

  <!-- Torso: Dark Olive Hoodie -->
  <path d="M32 54 C28 54, 26 62, 28 80 L72 80 C74 62, 72 54, 68 54 Z" fill="#2d3832"/>
  <path d="M37 72 C42 69, 58 69, 63 72 L62 80 L38 80 Z" fill="#232c27"/>
  <path d="M42 54 L50 64 L58 54" stroke="#232c27" stroke-width="2.5" fill="none"/>
  <path d="M46 62 L45 72" stroke="#f1efe9" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M54 62 L55 72" stroke="#f1efe9" stroke-width="1.6" stroke-linecap="round"/>

  <!-- Arms & Chibi Hands -->
  <path d="M31 56 L24 70 C23 72, 25 75, 28 74 L33 65" fill="#2d3832"/>
  <circle cx="26" cy="72" r="3.5" fill="#c9976b"/>
  <path d="M69 56 L76 70 C77 72, 75 75, 72 74 L67 65" fill="#2d3832"/>
  <circle cx="74" cy="72" r="3.5" fill="#c9976b"/>

  <!-- Neck -->
  <rect x="45" y="48" width="10" height="8" rx="2" fill="#c9976b"/>

  <!-- Chibi Head Base -->
  <ellipse cx="50" cy="34" rx="26" ry="23" fill="#d8a77d"/>
  <circle cx="24" cy="36" r="4.5" fill="#c9976b"/>
  <circle cx="76" cy="36" r="4.5" fill="#c9976b"/>

  <!-- Dark Textured Anime Hair (No Headset) -->
  <path d="M23 34 C21 16, 32 6, 50 6 C68 6, 79 16, 77 34 C73 22, 64 14, 50 14 C36 14, 27 22, 23 34 Z" fill="#1b1715"/>
  <path d="M21 28 Q25 18 34 13 Q28 20 27 30 Z" fill="#1b1715"/>
  <path d="M79 28 Q75 18 66 13 Q72 20 73 30 Z" fill="#1b1715"/>

  <!-- Expressive Chibi Eyes with Catchlights -->
  <ellipse cx="38" cy="36" rx="4.5" ry="5.5" fill="#1e1814"/>
  <ellipse cx="62" cy="36" rx="4.5" ry="5.5" fill="#1e1814"/>
  <circle cx="39.5" cy="34.5" r="1.8" fill="#ffffff"/>
  <circle cx="63.5" cy="34.5" r="1.8" fill="#ffffff"/>
  <circle cx="36.5" cy="38" r="0.8" fill="#ffffff"/>
  <circle cx="60.5" cy="38" r="0.8" fill="#ffffff"/>

  <!-- Eyebrows -->
  <path d="M33 27 Q39 25 44 28" stroke="#1b1715" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M67 27 Q61 25 56 28" stroke="#1b1715" stroke-width="2.2" stroke-linecap="round" fill="none"/>

  <!-- Warm Chibi Smile & Blush -->
  <path d="M45 44 Q50 48 55 44" stroke="#875338" stroke-width="2" stroke-linecap="round" fill="none"/>
  <ellipse cx="32" cy="40" rx="3.5" ry="2" fill="rgba(217, 119, 87, 0.28)"/>
  <ellipse cx="68" cy="40" rx="3.5" ry="2" fill="rgba(217, 119, 87, 0.28)"/>

  <!-- Ray-Ban RB6363 Glasses (Black Browline on Gold Frame) -->
  <rect x="30" y="30" width="16" height="12" rx="3.5" fill="rgba(255, 255, 255, 0.22)" stroke="#b88e2c" stroke-width="1.3"/>
  <rect x="54" y="30" width="16" height="12" rx="3.5" fill="rgba(255, 255, 255, 0.22)" stroke="#b88e2c" stroke-width="1.3"/>
  <path d="M46 33 Q50 31 54 33" stroke="#b88e2c" stroke-width="1.6" fill="none"/>
  <path d="M29 30 Q38 27 46.5 30.5" stroke="#111111" stroke-width="3" stroke-linecap="round"/>
  <path d="M53.5 30.5 Q62 27 71 30" stroke="#111111" stroke-width="3" stroke-linecap="round"/>
  <line x1="33" y1="32" x2="36" y2="36" stroke="rgba(255, 255, 255, 0.7)" stroke-width="1.4" stroke-linecap="round"/>
  <line x1="57" y1="32" x2="60" y2="36" stroke="rgba(255, 255, 255, 0.7)" stroke-width="1.4" stroke-linecap="round"/>

  <!-- Front Anime Bangs -->
  <path d="M26 23 Q36 12 48 18 Q60 12 72 22 Q65 18 58 23 Q52 17 46 24 Q37 17 26 23 Z" fill="#241e1a"/>
  <path d="M33 22 L37 28 L40 22" fill="#241e1a"/>
  <path d="M60 22 L63 28 L67 22" fill="#241e1a"/>
</svg>`;
}

function getMiniEricBanner(message, isFooter = false) {
  return `
    <aside class="mini-eric-banner ${isFooter ? 'is-footer' : 'is-header'}" aria-label="Mini Eric dialogue">
      <div class="mini-eric-char" title="Click Mini Eric!">
        ${getMiniEricSvg(isFooter ? 64 : 76, isFooter ? 84 : 100)}
      </div>
      <div class="mini-eric-bubble">
        <span class="mini-eric-tag">MINI ERIC</span>
        <p class="mini-eric-text">${message}</p>
      </div>
    </aside>`;
}

// ---------------------------------------------------------------------------
// 2. REFINED NAV COMPONENT (Square photo, Product Designer only, Gold toast)
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
              <span class="info-role">Product Designer</span>
            </div>
          </div>
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
      </div>
    </div>
  </header>`;
}

// ---------------------------------------------------------------------------
// 3. UPDATE ABOUT.HTML (Daily Read, Water Is Healthy, Popeyes, Play icon only)
// ---------------------------------------------------------------------------
function updateAboutPage() {
  const file = path.join(ROOT, 'about.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(/<header class="sx-nav-wrap">[\s\S]*?<\/header>/, getHeaderNav('about'));

  const topBanner = getMiniEricBanner("Welcome to my story! Here is what drives my craft—anime, morning routines, gaming, and high design standards.", false);
  html = html.replace(/<aside class="mini-eric-banner is-header"[\s\S]*?<\/aside>/, topBanner);

  const bottomBanner = getMiniEricBanner("Thanks for getting to know me! Ready to see my work or test out the Nintendo DS in the playground?", true);
  html = html.replace(/<aside class="mini-eric-banner is-footer"[\s\S]*?<\/aside>/, bottomBanner);

  html = html.replace(/Daily Morning Ritual/g, "Daily Read");
  html = html.replace(/Water is King/g, "Water Is Healthy");
  html = html.replace(/Drink-wise, I love water—it's great for you and you can't really go wrong with it\./g, "Drink-wise, I love water—it's great for you and keeps you sharp all day.");

  // Keep ONLY play icon (remove laugh chip)
  html = html.replace(/<div class="downtime-art">[\s\S]*?<\/div>/, `<div class="downtime-art"><span class="play-chip">▶</span></div>`);

  // Add Popeyes Comfort Fuel Card if not present
  if (!html.includes('Popeyes 5pc Mild Combo')) {
    const popeyesCard = `
          <!-- Popeyes Comfort Fuel Card -->
          <article class="foundation-card card-popeyes">
            <div class="popeyes-art">
              <span class="popeyes-emoji">🍗</span>
              <span class="popeyes-sparkle">✨</span>
            </div>
            <div class="card-body">
              <span class="card-tag">Comfort Fuel</span>
              <h3>Popeyes 5pc Mild Combo</h3>
              <p>When it comes to comfort food, nothing beats Popeyes. My absolute go-to order is the 5pc chicken tender mild combo—crispy, seasoned just right, and the ultimate reward after deep design sprints.</p>
            </div>
          </article>`;
    html = html.replace(/(<\/article>)(\s*<\/div>\s*<\/section>\s*<!-- Anime Wall)/, `$1\n${popeyesCard}$2`);
  }

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 4. UPDATE PLAYGROUND.HTML (Study Buddy Image showcase, Remove Token Lab)
// ---------------------------------------------------------------------------
function updatePlaygroundPage() {
  const file = path.join(ROOT, 'playground.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(/<header class="sx-nav-wrap">[\s\S]*?<\/header>/, getHeaderNav('playground'));

  const topBanner = getMiniEricBanner("Welcome to the lab! Here are my working prototypes and the interactive Nintendo DS.", false);
  html = html.replace(/<aside class="mini-eric-banner is-header"[\s\S]*?<\/aside>/, topBanner);

  const bottomBanner = getMiniEricBanner("Thanks for exploring the lab! Check out the case studies to see how these experiments translate to production.", true);
  html = html.replace(/<aside class="mini-eric-banner is-footer"[\s\S]*?<\/aside>/, bottomBanner);

  const studyBuddyShowcase = `
        <div class="sb-showcase-card">
          <div class="sb-showcase-frame">
            <img src="assets/images/study-buddy.png" alt="Study Buddy Desktop Focus Companion preview" class="sb-showcase-img" loading="lazy">
            <div class="sb-showcase-overlay">
              <span class="sb-showcase-badge">Desktop Companion • Electron &amp; AI</span>
            </div>
          </div>
          <div class="sb-showcase-caption">
            <h3>Study Buddy — Focus &amp; Break Companion</h3>
            <p>A lightweight desktop companion app designed to keep students in flow with gentle break nudges and study presets. Built with Gemini 4 Argon and Electron.</p>
            <div class="sb-showcase-links">
              <a href="https://github.com/EricArielDeLaPaz/study-buddy-desktop" target="_blank" rel="noopener" class="sx-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span>GitHub Repo</span>
              </a>
              <a href="case-studies/study-buddy.html" class="sx-btn sx-btn-primary">
                <span>View Full Case Study</span>
              </a>
            </div>
          </div>
        </div>`;

  html = html.replace(/<div class="sb-sim-card">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, studyBuddyShowcase);

  // Remove Interactive Token Lab completely
  html = html.replace(/<!-- Experiment 3: Live Design Token Sandbox -->[\s\S]*?<\/section>/, '');

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 5. UPDATE INDEX.HTML (Square photo, distinct greetings, nav)
// ---------------------------------------------------------------------------
function updateIndexPage() {
  const file = path.join(ROOT, 'index.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  html = html.replace(/<header class="sx-nav-wrap">[\s\S]*?<\/header>/, getHeaderNav('home'));

  const topBanner = getMiniEricBanner("Hey! I'm Mini Eric. I see you're looking at my work—you must be looking to hire me!", false);
  html = html.replace(/<aside class="mini-eric-banner is-header"[\s\S]*?<\/aside>/, topBanner);

  const bottomBanner = getMiniEricBanner("Thanks for reviewing my portfolio! Let's connect—I'd love to chat about product design roles.", true);
  html = html.replace(/<aside class="mini-eric-banner is-footer"[\s\S]*?<\/aside>/, bottomBanner);

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 6. UPDATE CASE STUDIES (Remove TYPE ELECTRIC, single banner top/bottom)
// ---------------------------------------------------------------------------
function updateCaseStudies() {
  const csDir = path.join(ROOT, 'case-studies');
  if (!fs.existsSync(csDir)) return;

  const data = [
    {
      file: 'vextaro.html',
      greet: "Welcome to Vextaro! I designed this 35-variant token system, 7-section IA, and 9-state high-fidelity prototype during my Flyrank AI internship.",
      thank: "Thanks for checking out Vextaro! Don't forget to stay hydrated before jumping to the next project."
    },
    {
      file: 'study-buddy.html',
      greet: "Welcome to Study Buddy! Solo designed and built with Gemini 4 Argon. Built to keep focus sharp and hydration on point.",
      thank: "Thanks for checking out Study Buddy! Hope it inspires your next focused study session."
    },
    {
      file: 'secureid.html',
      greet: "Welcome to SecureID! Dual-sided product architecture: a verified mobile verification flow paired with a 3-action analyst triage dashboard.",
      thank: "Thanks for checking out SecureID! Check out the next case study or head to About to see my Nintendo DS."
    },
    {
      file: 'honda.html',
      greet: "Welcome to Honda of Clear Lake! A comprehensive heuristic evaluation ranked on a 0–4 severity scale with developer-ready punch lists.",
      thank: "Thanks for checking out Honda of Clear Lake! Heuristics are always better with a clear engineering punch list."
    },
    {
      file: 'devtective.html',
      greet: "Welcome to DevTective! My Google UX Design Certificate capstone focused on developer learning habits and milestone tracking.",
      thank: "Thanks for checking out DevTective! Ready to explore more systems or connect on LinkedIn?"
    }
  ];

  for (const cs of data) {
    const csPath = path.join(csDir, cs.file);
    if (!fs.existsSync(csPath)) continue;
    let content = fs.readFileSync(csPath, 'utf8');

    // 1. Remove TYPE ELECTRIC / IDENTITY / CLASSIFICATION / ORIGIN block
    content = content.replace(/(?:<[^>]+>|\s)*TYPE[\s\S]*?ELECTRIC[\s\S]*?CLASSIFICATION[\s\S]*?DUAL-SIDED[\s\S]*?ORIGIN[\s\S]*?INDEPENDENT PROJECT(?:<[^>]+>|\s)*/gi, '');
    content = content.replace(/TYPE\s*\n\s*ELECTRIC\s*\/\s*IDENTITY[\s\S]*?INDEPENDENT\s*PROJECT/gi, '');

    // 2. Remove ANY existing mini-eric banners completely to prevent duplicates
    content = content.replace(/<aside class="mini-eric-banner[\s\S]*?<\/aside>/gi, '');
    content = content.replace(/<div class="container">\s*<\/div>/g, '');

    // 3. Update nav
    content = content.replace(/<header class="sx-nav-wrap">[\s\S]*?<\/header>/, getHeaderNav('work', true));

    // 4. Inject exactly ONE Top Banner
    const topBanner = getMiniEricBanner(cs.greet, false);
    if (content.includes('<section class="cs-hero container">')) {
      content = content.replace('<section class="cs-hero container">', `<div class="container">\n${topBanner}\n</div>\n<section class="cs-hero container">`);
    } else {
      content = content.replace(/(<main[^>]*?>)/i, `$1\n<div class="container">\n${topBanner}\n</div>`);
    }

    // 5. Inject exactly ONE Bottom Banner
    const bottomBanner = getMiniEricBanner(cs.thank, true);
    if (content.includes('<div class="cs-nav-footer">')) {
      content = content.replace('<div class="cs-nav-footer">', `${bottomBanner}\n    <div class="cs-nav-footer">`);
    } else if (content.includes('</main>')) {
      content = content.replace('</main>', `<div class="container">${bottomBanner}</div>\n</main>`);
    }

    backupAndWrite(csPath, content);
  }
}

// ---------------------------------------------------------------------------
// 7. UPDATE ASSETS/CSS/SCROLL.CSS (Gold copied toast, square photo, breadcrumbs)
// ---------------------------------------------------------------------------
function updateScrollCss() {
  const cssPath = path.join(ROOT, 'assets', 'css', 'scroll.css');
  if (!fs.existsSync(cssPath)) return;
  let css = fs.readFileSync(cssPath, 'utf8');

  // Change copied toast background from green to gold
  css = css.replace(/(\.info-btn-copy\s*\.copy-toast\s*\{[^}]*?background:)\s*#15803d/gi, '$1 var(--gold)');

  // Make Info Avatar square
  css = css.replace(/(\.info-avatar\s*\{[^}]*?border-radius:)\s*50%/gi, '$1 8px');

  // Make Portrait Image square
  css = css.replace(/(\.is-light\s*\.sx-portrait\s*img\s*\{)/gi, '$1 border-radius: 16px !important; aspect-ratio: 1/1 !important; object-fit: cover !important;');

  // Better Breadcrumb Colors
  const breadcrumbCss = `
/* Enhanced Breadcrumbs (Light Mode Contrast) */
.is-light .breadcrumb,
.sx-case.is-light .breadcrumb {
  color: var(--text-faint) !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
}
.is-light .breadcrumb a,
.sx-case.is-light .breadcrumb a {
  color: var(--gold) !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  transition: color 0.18s var(--ease-motion) !important;
}
.is-light .breadcrumb a:hover,
.sx-case.is-light .breadcrumb a:hover {
  color: var(--gold-bright) !important;
  text-decoration: underline !important;
  text-underline-offset: 3px !important;
}

/* Popeyes Card & Study Buddy Showcase Card */
.card-popeyes {
  border-color: rgba(234, 88, 12, 0.2) !important;
}
.card-popeyes:hover {
  border-color: #ea580c !important;
}
.popeyes-art {
  height: 120px;
  background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 42px;
}
.popeyes-sparkle {
  position: absolute;
  top: 14px;
  right: 18px;
  font-size: 18px;
}
.sb-showcase-card {
  background: #FFFFFF;
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.25s var(--ease-motion), box-shadow 0.25s var(--ease-motion);
  margin-top: 24px;
}
.sb-showcase-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--gold);
}
.sb-showcase-frame {
  position: relative;
  background: #f8fafc;
  border-bottom: 1px solid var(--border);
}
.sb-showcase-img {
  width: 100%;
  height: auto;
  display: block;
}
.sb-showcase-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
}
.sb-showcase-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.85);
  color: #f8fafc;
  font-size: 12px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}
.sb-showcase-caption {
  padding: 24px 28px;
}
.sb-showcase-caption h3 {
  font-family: Cinzel, Georgia, serif;
  font-size: 20px;
  color: var(--text);
  margin: 0 0 8px;
}
.sb-showcase-caption p {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--text-dim);
  margin: 0 0 20px;
  max-width: 65ch;
}
.sb-showcase-links {
  display: flex;
  gap: 12px;
}
`;

  if (!css.includes('Enhanced Breadcrumbs (Light Mode Contrast)')) {
    css += '\n' + breadcrumbCss;
  }

  backupAndWrite(cssPath, css);
}

// ---------------------------------------------------------------------------
// 8. UPDATE ASSETS/JS/SCROLL.JS (Water droplet instead of electric)
// ---------------------------------------------------------------------------
function updateScrollJs() {
  const jsPath = path.join(ROOT, 'assets', 'js', 'scroll.js');
  if (!fs.existsSync(jsPath)) return;
  let js = fs.readFileSync(jsPath, 'utf8');

  js = js.replace(/🦦\s*⚡/g, '🦦 💧');
  js = js.replace(/STARTER:\s*OSHAWOTT/g, 'STARTER: OSHAWOTT (WATER-TYPE)');

  backupAndWrite(jsPath, js);
}

// ---------------------------------------------------------------------------
// EXECUTE REFINEMENTS
// ---------------------------------------------------------------------------
console.log("Applying refinements...");
updateAboutPage();
updatePlaygroundPage();
updateIndexPage();
updateCaseStudies();
updateScrollCss();
updateScrollJs();

console.log("\n✅ ALL PORTFOLIO 2.0 REFINEMENTS APPLIED SUCCESSFULLY!");
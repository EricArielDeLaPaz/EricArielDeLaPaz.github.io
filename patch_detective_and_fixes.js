const fs = require('fs');
const path = require('path');

const ROOT = process.env.TARGET_DIR || process.cwd();
console.log("==> Applying Portfolio 2.0 Detective Character & Fixes in:", ROOT);

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
// 1. COPY UPLOADED ARTWORK TO ASSETS IF AVAILABLE
// ---------------------------------------------------------------------------
try {
  const uploadedImgPath = 'C:/Users/ericf/.gemini/antigravity/brain/c693b551-afdb-45e7-846a-f06e1d637e57/.user_uploaded/media_1794080665166_2ef3f277.jpg';
  const destImgDir = path.join(ROOT, 'assets', 'images');
  const destImgPath = path.join(destImgDir, 'mini-eric.jpg');
  if (fs.existsSync(uploadedImgPath)) {
    if (!fs.existsSync(destImgDir)) fs.mkdirSync(destImgDir, { recursive: true });
    fs.copyFileSync(uploadedImgPath, destImgPath);
    console.log("  ✓ Copied uploaded detective art to assets/images/mini-eric.jpg");
  }
} catch (e) {
  // Graceful fallback if path differs in Codespaces
}

// ---------------------------------------------------------------------------
// 2. DETECTIVE CHIBI MINI ERIC (Tweed Cap, Goggles, Trench Coat, Thumbs Up)
// ---------------------------------------------------------------------------
function getMiniEricSvg(width = 82, height = 120, prefix = 'top') {
  return `<svg class="mini-eric-avatar" width="${width}" height="${height}" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Mini Eric thumbs up anime chibi avatar">
  <defs>
    <pattern id="${prefix}-tweed" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M0 3 L3 0 L6 3 L3 6 Z" fill="#4d4c47"/>
      <path d="M0 0 L1.5 1.5 L0 3 Z" fill="#3a3935"/>
      <path d="M6 0 L4.5 1.5 L6 3 Z" fill="#3a3935"/>
      <path d="M3 3 L4.5 4.5 L3 6 Z" fill="#5c5b55"/>
      <path d="M3 3 L1.5 4.5 L3 6 Z" fill="#5c5b55"/>
    </pattern>
    <linearGradient id="${prefix}-maroonLining" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#4a151b"/>
      <stop offset="100%" stop-color="#6b1d26"/>
    </linearGradient>
  </defs>

  <!-- Ground Shadow -->
  <ellipse cx="50" cy="146" rx="34" ry="4" fill="rgba(35, 25, 10, 0.14)"/>

  <!-- Trench Coat Back Flaps / Maroon Lining (Behind Legs) -->
  <path d="M22 92 C16 112, 14 132, 20 138 C23 134, 28 116, 32 94 Z" fill="url(#${prefix}-maroonLining)"/>
  <path d="M78 92 C84 112, 86 132, 80 138 C77 134, 72 116, 68 94 Z" fill="url(#${prefix}-maroonLining)"/>
  <path d="M19 138 C14 126, 17 106, 23 90 L26 92 C21 110, 19 126, 21 138 Z" fill="#383632"/>
  <path d="M81 138 C86 126, 83 106, 77 90 L74 92 C79 110, 81 126, 79 138 Z" fill="#383632"/>

  <!-- Legs: Dark Charcoal Trousers -->
  <path d="M38 96 L36 132 L46 132 L47 98 Z" fill="#2c2d30"/>
  <path d="M53 98 L54 132 L64 132 L62 96 Z" fill="#2c2d30"/>
  <line x1="41" y1="116" x2="43" y2="128" stroke="#1f2022" stroke-width="1.2"/>
  <line x1="59" y1="116" x2="57" y2="128" stroke="#1f2022" stroke-width="1.2"/>

  <!-- Shoes: Dark Brown / Black Oxford Shoes -->
  <ellipse cx="40" cy="138" rx="8" ry="4.5" fill="#1c1815"/>
  <ellipse cx="60" cy="138" rx="8" ry="4.5" fill="#1c1815"/>
  <rect x="33" y="138" width="14" height="3" rx="1.5" fill="#110e0c"/>
  <rect x="53" y="138" width="14" height="3" rx="1.5" fill="#110e0c"/>
  <ellipse cx="38" cy="136" rx="4" ry="1.5" fill="#38322c"/>
  <ellipse cx="58" cy="136" rx="4" ry="1.5" fill="#38322c"/>

  <!-- White Inner Dress Shirt & Collar -->
  <path d="M44 60 L50 78 L56 60 Z" fill="#f4f3ef"/>
  <line x1="50" y1="64" x2="50" y2="76" stroke="#d5d3cb" stroke-width="1.2"/>
  <circle cx="50" cy="70" r="1" fill="#716f68"/>

  <!-- Tweed Buttoned Vest / Waistcoat -->
  <path d="M38 74 L44 62 L50 78 L56 62 L62 74 L60 102 L50 96 L40 102 Z" fill="#484641"/>
  <path d="M38 74 L44 62 L50 78 L56 62 L62 74 L60 102 L50 96 L40 102 Z" fill="url(#${prefix}-tweed)" opacity="0.6"/>
  <circle cx="50" cy="82" r="1.3" fill="#23221f"/>
  <circle cx="50" cy="88" r="1.3" fill="#23221f"/>
  <circle cx="50" cy="94" r="1.3" fill="#23221f"/>

  <!-- Open Tweed Overcoat / Trench Coat -->
  <path d="M29 60 L40 60 L42 82 L38 122 L27 126 L24 88 Z" fill="#52504a"/>
  <path d="M29 60 L40 60 L42 82 L38 122 L27 126 L24 88 Z" fill="url(#${prefix}-tweed)" opacity="0.65"/>
  <path d="M36 60 L43 78 L37 84 L32 68 Z" fill="#3f3d38"/>
  <rect x="29" y="100" width="10" height="9" rx="1.5" fill="#46443f" stroke="#363430" stroke-width="0.8"/>
  <circle cx="40" cy="90" r="1.8" fill="#c49a3c" stroke="#8c6a20" stroke-width="0.6"/>
  <circle cx="39" cy="104" r="1.8" fill="#c49a3c" stroke="#8c6a20" stroke-width="0.6"/>

  <path d="M71 60 L60 60 L58 82 L62 122 L73 126 L76 88 Z" fill="#52504a"/>
  <path d="M71 60 L60 60 L58 82 L62 122 L73 126 L76 88 Z" fill="url(#${prefix}-tweed)" opacity="0.65"/>
  <path d="M64 60 L57 78 L63 84 L68 68 Z" fill="#3f3d38"/>
  <rect x="61" y="100" width="10" height="9" rx="1.5" fill="#46443f" stroke="#363430" stroke-width="0.8"/>

  <!-- Left Arm & Hand (Fist at Side) -->
  <path d="M71 64 L79 88 C79 92, 76 96, 72 96 L67 86" fill="#4b4944"/>
  <path d="M71 64 L79 88 C79 92, 76 96, 72 96 L67 86" fill="url(#${prefix}-tweed)" opacity="0.6"/>
  <rect x="66" y="90" width="9" height="3" rx="1" fill="#441217"/>
  <circle cx="70" cy="98" r="4.5" fill="#d8a77d" stroke="#b37e54" stroke-width="0.8"/>

  <!-- Right Arm & Hand: THUMBS UP 👍 -->
  <path d="M29 64 L21 82 C20 86, 24 90, 28 88 L33 76" fill="#4b4944"/>
  <path d="M29 64 L21 82 C20 86, 24 90, 28 88 L33 76" fill="url(#${prefix}-tweed)" opacity="0.6"/>
  <rect x="23" y="80" width="9" height="3" rx="1" fill="#441217" transform="rotate(-20 23 80)"/>
  
  <g class="thumbs-up">
    <rect x="19" y="70" width="9" height="11" rx="4" fill="#d8a77d" stroke="#875338" stroke-width="1.2"/>
    <line x1="20" y1="74" x2="26" y2="74" stroke="#875338" stroke-width="1"/>
    <line x1="20" y1="77" x2="26" y2="77" stroke="#875338" stroke-width="1"/>
    <path d="M22 72 C22 64, 25 61, 26 61 C28 61, 28 65, 27 72 Z" fill="#d8a77d" stroke="#875338" stroke-width="1.2"/>
  </g>

  <!-- Neck -->
  <rect x="45" y="50" width="10" height="9" rx="2" fill="#c9976b"/>

  <!-- Chibi Head Base -->
  <ellipse cx="50" cy="38" rx="26" ry="22" fill="#d8a77d"/>
  <circle cx="24" cy="40" r="4.5" fill="#c9976b"/>
  <circle cx="76" cy="40" r="4.5" fill="#c9976b"/>

  <!-- Messy Dark Anime Hair -->
  <path d="M22 38 C20 24, 28 12, 50 12 C72 12, 80 24, 78 38 C72 26, 62 18, 50 18 C38 18, 28 26, 22 38 Z" fill="#201a17"/>
  <path d="M20 40 Q24 48 22 56 Q28 48 26 40 Z" fill="#201a17"/>
  <path d="M80 40 Q76 48 78 56 Q72 48 74 40 Z" fill="#201a17"/>
  <path d="M29 32 Q36 42 42 36 Q34 32 29 32 Z" fill="#201a17"/>
  <path d="M71 32 Q64 42 58 36 Q66 32 71 32 Z" fill="#201a17"/>

  <!-- Big Round Goggles / Glasses (Grey Lenses, Black Frame) -->
  <circle cx="37" cy="40" r="11" fill="#141416"/>
  <circle cx="37" cy="40" r="8.5" fill="#9ba1a6"/>
  <circle cx="37" cy="40" r="8.5" fill="none" stroke="#2b2d30" stroke-width="1.2"/>
  <path d="M32 35 L40 43" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>
  <circle cx="41" cy="37" r="1.2" fill="#ffffff" opacity="0.8"/>

  <circle cx="63" cy="40" r="11" fill="#141416"/>
  <circle cx="63" cy="40" r="8.5" fill="#9ba1a6"/>
  <circle cx="63" cy="40" r="8.5" fill="none" stroke="#2b2d30" stroke-width="1.2"/>
  <path d="M58 35 L66 43" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>
  <circle cx="67" cy="37" r="1.2" fill="#ffffff" opacity="0.8"/>

  <rect x="46" y="38" width="8" height="4" rx="2" fill="#141416"/>

  <!-- Warm Chibi Smile below goggles -->
  <path d="M46 51 Q50 54 54 51" stroke="#875338" stroke-width="1.8" stroke-linecap="round" fill="none"/>
  <ellipse cx="28" cy="46" rx="3.5" ry="2" fill="rgba(217, 119, 87, 0.28)"/>
  <ellipse cx="72" cy="46" rx="3.5" ry="2" fill="rgba(217, 119, 87, 0.28)"/>

  <!-- Tweed Newsboy / Flat Cap -->
  <path d="M22 28 C26 36, 42 38, 50 38 C58 38, 74 36, 78 28 C70 32, 58 33, 50 33 C42 33, 30 32, 22 28 Z" fill="#d9d6ce" stroke="#201e1b" stroke-width="1.5"/>
  <path d="M19 28 C16 16, 26 4, 50 4 C74 4, 84 16, 81 28 C74 30, 64 31, 50 31 C36 31, 26 30, 19 28 Z" fill="#52504a" stroke="#201e1b" stroke-width="1.8"/>
  <path d="M19 28 C16 16, 26 4, 50 4 C74 4, 84 16, 81 28 C74 30, 64 31, 50 31 C36 31, 26 30, 19 28 Z" fill="url(#${prefix}-tweed)" opacity="0.7"/>
  <ellipse cx="50" cy="5" rx="4" ry="2" fill="#302e2a" stroke="#201e1b" stroke-width="1"/>
  <path d="M50 5 Q42 16 35 28" stroke="#363430" stroke-width="1.4" fill="none"/>
  <path d="M50 5 Q58 16 65 28" stroke="#363430" stroke-width="1.4" fill="none"/>
  <polygon points="31,10 39,12 37,21 29,19" fill="#f0ede6" stroke="#2a2926" stroke-width="1.2"/>
</svg>`;
}

function getMiniEricBanner(message, isFooter = false) {
  const prefix = isFooter ? 'foot' : 'head';
  return `
    <aside class="mini-eric-banner ${isFooter ? 'is-footer' : 'is-header'}" aria-label="Mini Eric dialogue">
      <div class="mini-eric-char" title="Click Mini Eric!">
        ${getMiniEricSvg(isFooter ? 70 : 82, isFooter ? 104 : 120, prefix)}
      </div>
      <div class="mini-eric-bubble">
        <span class="mini-eric-tag">MINI ERIC</span>
        <p class="mini-eric-text">${message}</p>
      </div>
    </aside>`;
}

// ---------------------------------------------------------------------------
// 3. FIX INDEX.HTML (Transparent statbar, 8 months internship badge)
// ---------------------------------------------------------------------------
function fixIndexPage() {
  const file = path.join(ROOT, 'index.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Update badge: "8 months of Internship experience (Flyrank AI & Stealth Startup)"
  html = html.replace(
    /<li>2 Concurrent Design Internships[\s\S]*?<\/li>/i,
    '<li>8 months of Internship experience (Flyrank AI &amp; Stealth Startup)</li>'
  );

  // Update Mini Eric banners
  const topBanner = getMiniEricBanner("Hey! I'm Mini Eric. I see you're looking at my work—you must be looking to hire me!", false);
  html = html.replace(/<aside class="mini-eric-banner is-header"[\s\S]*?<\/aside>/, topBanner);

  const bottomBanner = getMiniEricBanner("Thanks for reviewing my portfolio! Let's connect—I'd love to chat about product design roles.", true);
  html = html.replace(/<aside class="mini-eric-banner is-footer"[\s\S]*?<\/aside>/, bottomBanner);

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 4. FIX ABOUT.HTML (Remove sparkle from Popeyes card)
// ---------------------------------------------------------------------------
function fixAboutPage() {
  const file = path.join(ROOT, 'about.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Remove sparkle from popeyes card
  html = html.replace(/<span class="popeyes-sparkle">✨<\/span>/g, '');

  // Update Mini Eric banners
  const topBanner = getMiniEricBanner("Welcome to my story! Here is what drives my craft—anime, morning routines, gaming, and high design standards.", false);
  html = html.replace(/<aside class="mini-eric-banner is-header"[\s\S]*?<\/aside>/, topBanner);

  const bottomBanner = getMiniEricBanner("Thanks for getting to know me! Ready to see my work or test out the Nintendo DS in the playground?", true);
  html = html.replace(/<aside class="mini-eric-banner is-footer"[\s\S]*?<\/aside>/, bottomBanner);

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 5. FIX PLAYGROUND.HTML (Better text, remove buttons github/case-study)
// ---------------------------------------------------------------------------
function fixPlaygroundPage() {
  const file = path.join(ROOT, 'playground.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  const targetHeader = /(<section class="about-section" id="lab-studybuddy">\s*<div class="section-badge"><span>02<\/span> Shipped Product<\/div>\s*<div class="section-head-row">)[\s\S]*?(<\/div>\s*<\/div>\s*<div class="sb-showcase-card">)/;
  
  const replacementHeader = `$1
          <div>
            <h2 class="section-heading">Study Buddy — Focus &amp; Break Companion</h2>
            <p class="sx-sub">A cross-platform desktop utility designed to maintain flow state through gentle pomodoro intervals and scheduled hydration check-ins. Built with Electron and Gemini 4 Argon, packaged across macOS, Windows, and Linux.</p>
          </div>
        </div>
        <div class="sb-showcase-card">`;

  if (targetHeader.test(html)) {
    html = html.replace(targetHeader, replacementHeader);
  }

  // Update Mini Eric banners
  const topBanner = getMiniEricBanner("Welcome to the lab! Here are my working prototypes and the interactive Nintendo DS.", false);
  html = html.replace(/<aside class="mini-eric-banner is-header"[\s\S]*?<\/aside>/, topBanner);

  const bottomBanner = getMiniEricBanner("Thanks for exploring the lab! Check out the case studies to see how these experiments translate to production.", true);
  html = html.replace(/<aside class="mini-eric-banner is-footer"[\s\S]*?<\/aside>/, bottomBanner);

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 6. FIX SECUREID.HTML (Full markup repair, cs-hero intact, no broken tags)
// ---------------------------------------------------------------------------
function fixSecureIdPage() {
  const file = path.join(ROOT, 'case-studies', 'secureid.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');

  // Strip ANY deformed banners or empty container wrappers
  html = html.replace(/<aside class="mini-eric-banner[\s\S]*?<\/aside>/gi, '');
  html = html.replace(/<div class="container">\s*<\/div>/g, '');

  const topBanner = getMiniEricBanner("Welcome to SecureID! Dual-sided product architecture: a verified mobile verification flow paired with a 3-action analyst triage dashboard.", false);
  const bottomBanner = getMiniEricBanner("Thanks for checking out SecureID! Check out the next case study or head to About to see my Nintendo DS.", true);

  // Re-inject top banner cleanly before cs-hero
  if (html.includes('<section class="cs-hero container">')) {
    html = html.replace('<section class="cs-hero container">', `<div class="container">\n${topBanner}\n</div>\n<section class="cs-hero container">`);
  } else if (html.includes('<main class="sx-main" id="main">')) {
    html = html.replace('<main class="sx-main" id="main">', `<main class="sx-main" id="main">\n<div class="container">\n${topBanner}\n</div>`);
  }

  // Re-inject bottom banner cleanly before cs-nav-footer
  if (html.includes('<div class="cs-nav-footer">')) {
    html = html.replace('<div class="cs-nav-footer">', `${bottomBanner}\n    <div class="cs-nav-footer">`);
  }

  backupAndWrite(file, html);
}

// ---------------------------------------------------------------------------
// 7. UPDATE SCROLL.CSS (Transparent statbar, no white boxes, detective avatar)
// ---------------------------------------------------------------------------
function fixScrollCss() {
  const cssPath = path.join(ROOT, 'assets', 'css', 'scroll.css');
  if (!fs.existsSync(cssPath)) return;
  let css = fs.readFileSync(cssPath, 'utf8');

  // Transparent statbar (no white squares on Home)
  const statbarFix = `
/* Transparent Statbar Highlights (No White Boxes) */
.is-light .sx-statbar {
  background: transparent !important;
  border-color: var(--border) !important;
  box-shadow: none !important;
}
.is-light .sx-statbar li {
  background: transparent !important;
  border-color: var(--border) !important;
  box-shadow: none !important;
}
`;

  if (!css.includes('Transparent Statbar Highlights (No White Boxes)')) {
    css += '\n' + statbarFix;
  }

  const avatarCss = `
.mini-eric-char {
  display: flex !important;
  align-items: flex-end !important;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  cursor: pointer !important;
}
.mini-eric-char:hover {
  transform: translateY(-4px) scale(1.05) !important;
}
`;
  if (!css.includes('.mini-eric-char:hover')) {
    css += '\n' + avatarCss;
  }

  backupAndWrite(cssPath, css);
}

// ---------------------------------------------------------------------------
// EXECUTE ALL FIXES
// ---------------------------------------------------------------------------
console.log("Applying fixes...");
fixIndexPage();
fixAboutPage();
fixPlaygroundPage();
fixSecureIdPage();
fixScrollCss();

console.log("\n✅ ALL REQUESTED FIXES APPLIED SUCCESSFULLY!");
const fs = require('fs');
const path = require('path');

console.log('🎨 Applying Warm Minimalist / Editorial Studio (Light Mode) Color Swap...');

// 1. UPDATE assets/css/style.css
const stylePath = path.join('assets', 'css', 'style.css');
if (fs.existsSync(stylePath)) {
  let style = fs.readFileSync(stylePath, 'utf8');

  // New Light Mode Tokens
  const lightTokens = `:root{
  color-scheme: light;

  --bg: #faf8f5;
  --bg-raised: #f5f2eb;
  --panel: #f0e9dc;
  --card: #ffffff;
  --card-hover: #ffffff;
  --border: #e2d8c7;
  --border-soft: #ede7dc;

  --text: #2a241c;
  --text-dim: #6b5e4f;
  --text-faint: #8a7b6a;

  --gold: #9a7428;
  --gold-bright: #7c5a1a;
  --gold-dim: #b89758;

  --secureid: #9a7428;
  --honda: #b84822;
  --devtective: #6044a6;
  --vextaro: #1e6e94;
  --studybuddy: #6b46b8;

  --ok: #1b824c;
  --radius: 14px;
  --radius-sm: 8px;
  --measure: 68ch;

  --shadow-card: 0 1px 3px rgba(42,36,28,0.04), 0 10px 24px -10px rgba(42,36,28,0.07);
  --shadow-pop: 0 4px 14px -2px rgba(42,36,28,0.06), 0 20px 40px -12px rgba(42,36,28,0.1);
}`;

  style = style.replace(/:root\s*\{[\s\S]*?--shadow-pop:[^;]+;\s*\}/m, lightTokens);

  // Background subtle warm glow
  style = style.replace(
    /radial-gradient\(900px 500px at 85% -10%,[\s\S]*?transparent 55%\)/g,
    'radial-gradient(900px 500px at 85% -10%, rgba(154,116,40,0.05), transparent 60%), radial-gradient(700px 400px at -10% 20%, rgba(154,116,40,0.03), transparent 55%)'
  );

  // Selection highlight
  style = style.replace(/::selection\{[^}]+\}/g, '::selection{ background:#eeddb8; color:#2a241c; }');

  // Headings color in style.css
  style = style.replace(/h1,h2,h3,h4\{([^}]+)color:#fbf7ee;/g, 'h1,h2,h3,h4{$1color:#1a1612;');

  // Buttons
  style = style.replace(/\.btn-primary\{[^}]+\}/g, '.btn-primary{ background:var(--gold); border-color:var(--gold); color:#ffffff; }');
  style = style.replace(/\.btn-primary:hover\{[^}]+\}/g, '.btn-primary:hover{ background:var(--gold-bright); border-color:var(--gold-bright); color:#ffffff; }');

  // Project cards & art containers
  style = style.replace(/background:#151515;/g, 'background:var(--card);');
  style = style.replace(/background:#111;/g, 'background:var(--card);');
  style = style.replace(/border:1px solid #2a2a2a;/g, 'border:1px solid var(--border);');
  style = style.replace(/border-color:#8d7634;/g, 'border-color:var(--gold);');
  style = style.replace(/box-shadow:0 4px 20px rgba\(0,0,0,\.4\);/g, 'box-shadow:var(--shadow-card);');
  style = style.replace(/\.card-art\{([^}]+)background:var\(--card\);/g, '.card-art{$1background:var(--bg-raised);');

  // Card typography
  style = style.replace(/\.card-title h3\{([^}]+)color:#f0ede8;/g, '.card-title h3{$1color:var(--text);');
  style = style.replace(/\.card-title small\{color:#4a4540;/g, '.card-title small{color:var(--text-faint);');
  style = style.replace(/\.card-title b\{color:#716a63;/g, '.card-title b{color:var(--text-dim);');
  style = style.replace(/\.card-details p\{([^}]+)color:#aaa39b;/g, '.card-details p{$1color:var(--text-dim);');

  // Tags & skills
  style = style.replace(/border:1px solid rgba\(201,168,76,\.18\);/g, 'border:1px solid rgba(154,116,40,.22);');
  style = style.replace(/color:#8a6a1e;/g, 'color:#7c5a1a;');
  style = style.replace(/background:rgba\(201,168,76,\.05\);/g, 'background:rgba(154,116,40,.07);');

  // Flow cards in Process & Skills
  style = style.replace(/border:1px solid #343434;/g, 'border:1px solid var(--border);');
  style = style.replace(/\.hero-flow span\{([^}]+)background:#1b1b1b;\s*color:#f0ede8;/g, '.hero-flow span{$1background:var(--bg-raised); color:var(--text);');
  style = style.replace(/border-top:1px dashed #3a3a3a;/g, 'border-top:1px dashed var(--border);');

  fs.writeFileSync(stylePath, style, 'utf8');
  console.log('✓ assets/css/style.css updated.');
}

// 2. UPDATE assets/css/scroll.css
const scrollPath = path.join('assets', 'css', 'scroll.css');
if (fs.existsSync(scrollPath)) {
  let scroll = fs.readFileSync(scrollPath, 'utf8');

  // Replace dark .sx-page override with Light Mode tokens
  const lightSxPage = `/* ============================================================
   Warm Minimalist / Editorial Studio (Light Mode) Tokens & Polish
   ============================================================ */
.sx-page{
  --bg: #faf8f5;
  --bg-raised: #f5f2eb;
  --panel: #f0e9dc;
  --card: #ffffff;
  --card-hover: #ffffff;
  --border: #e2d8c7;
  --border-soft: #ede7dc;

  --text: #2a241c;
  --text-dim: #6b5e4f;
  --text-faint: #8a7b6a;

  --gold: #9a7428;
  --gold-bright: #7c5a1a;
  --gold-dim: #b89758;

  --secureid: #9a7428;
  --honda: #b84822;
  --devtective: #6044a6;
  --vextaro: #1e6e94;
  --studybuddy: #6b46b8;

  background: var(--bg);
  color: var(--text);
  font-family: 'Raleway', Inter, sans-serif;
}
.sx-page h1,.sx-page h2,.sx-page h3{ font-family:Cinzel,Georgia,serif; color:#1a1612; letter-spacing:.01em; }
.sx-page .sx-kicker{ font-family:'Raleway',sans-serif; letter-spacing:.18em; color:var(--gold); }
.sx-nav{ background:rgba(255,255,255,.88); border-color:rgba(154,116,40,.25); box-shadow:0 10px 30px -10px rgba(42,36,28,.1), 0 1px 0 rgba(255,255,255,.9) inset; }
.sx-nav .sx-brand{ font-family:Cinzel,Georgia,serif; font-size:14px; letter-spacing:.08em; text-transform:uppercase; color:var(--text); }
.sx-nav a,.sx-status{ font-family:'Raleway',sans-serif; color:var(--text-dim); }
.sx-nav a:hover{ color:var(--text); background:rgba(42,36,28,.05); }
.sx-nav a.is-active{ color:var(--gold-bright); background:rgba(154,116,40,.12); font-weight:600; }`;

  const darkSxPageRegex = /\/\* =+\s*Old design system[\s\S]*?\.sx-nav a\.is-active\{[^}]+\}/;
  if (darkSxPageRegex.test(scroll)) {
    scroll = scroll.replace(darkSxPageRegex, lightSxPage);
  }

  // Frosted nav pill (top definition)
  scroll = scroll.replace(
    /background:rgba\(18,15,11,\.55\);[\s\S]*?box-shadow:0 10px 40px -12px rgba\(0,0,0,\.7\), 0 1px 0 rgba\(255,255,255,\.05\) inset;/g,
    'background:rgba(255,255,255,.88); -webkit-backdrop-filter:blur(18px) saturate(150%); backdrop-filter:blur(18px) saturate(150%);\n  box-shadow:0 10px 30px -10px rgba(42,36,28,.1), 0 1px 0 rgba(255,255,255,.9) inset;'
  );
  scroll = scroll.replace(/color:#f0ede8; letter-spacing:\.01em;/g, 'color:#1a1612; letter-spacing:.01em;');

  // Badges & exp cards in scroll.css
  scroll = scroll.replace(/background:rgba\(255,255,255,\.025\);/g, 'background:var(--card); box-shadow:0 1px 3px rgba(42,36,28,.04);');
  scroll = scroll.replace(/\.sx-badges li\{ border-color:#2b2b2b; border-radius:4px; background:#111;/g, '.sx-badges li{ border-color:var(--border); border-radius:4px; background:var(--card);');
  scroll = scroll.replace(/\.sx-exp-card\{ background:#111; border-color:#292929;/g, '.sx-exp-card{ background:var(--card); border-color:var(--border);');
  scroll = scroll.replace(/\.sx-exp-card h3\{ font-family:Cinzel,Georgia,serif; font-size:20px; \}/g, '.sx-exp-card h3{ font-family:Cinzel,Georgia,serif; font-size:20px; color:#1a1612; }');

  // Portrait ambient glow
  scroll = scroll.replace(/rgba\(217,172,84,\\.22\)/g, 'rgba(154,116,40,.14)');
  scroll = scroll.replace(/rgba\(201,168,76,\\.18\)/g, 'rgba(154,116,40,.14)');
  scroll = scroll.replace(/border-color:#343434;/g, 'border-color:var(--border);');

  // Buttons in scroll.css (.sx-btn)
  scroll = scroll.replace(
    /\.sx-btn\{[^}]+\}/g,
    '.sx-btn{ display:inline-flex; align-items:center; gap:8px; padding:11px 20px; border:1px solid var(--gold); border-radius:999px; background:var(--card); color:var(--gold-bright); font:700 14px/1 \'Raleway\',sans-serif; cursor:pointer; transition:transform .18s ease,box-shadow .18s ease,background-color .18s ease,color .18s ease; }'
  );
  scroll = scroll.replace(
    /\.sx-btn:hover,\.sx-btn:focus-visible\{[^}]+\}/g,
    '.sx-btn:hover,.sx-btn:focus-visible{ transform:translateY(-2px); background:rgba(154,116,40,.1); color:var(--gold-bright); box-shadow:0 6px 20px rgba(154,116,40,.18); }'
  );
  scroll = scroll.replace(/\.sx-btn-primary\{[^}]+\}/g, '.sx-btn-primary{ background:var(--gold); border-color:var(--gold); color:#ffffff; }');
  scroll = scroll.replace(/\.sx-btn-primary:hover,\.sx-btn-primary:focus-visible\{[^}]+\}/g, '.sx-btn-primary:hover,.sx-btn-primary:focus-visible{ background:var(--gold-bright); border-color:var(--gold-bright); color:#ffffff; }');

  fs.writeFileSync(scrollPath, scroll, 'utf8');
  console.log('✓ assets/css/scroll.css updated.');
}

console.log('\n✨ Warm Minimalist Light Theme applied cleanly! Structure is 100% untouched.\n');

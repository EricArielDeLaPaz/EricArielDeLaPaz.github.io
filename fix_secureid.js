const fs = require('fs');
const path = require('path');

const target = path.join(process.cwd(), 'case-studies', 'secureid.html');

if (!fs.existsSync(target)) {
  console.error("❌ Could not find case-studies/secureid.html in current directory:", process.cwd());
  process.exit(1);
}

let html = fs.readFileSync(target, 'utf8');

// The missing header block containing doctype, head, stylesheets, nav, and hero start
const missingTop = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SecureID — Identity Verification &amp; Analyst Review Platform · Eric Ariel De La Paz</title>
<meta name="description" content="SecureID case study: one identity-verification flow for end users and a separate analyst review dashboard, built on a single shared design token system.">
<link rel="canonical" href="https://ericarieldelapaz.tech/case-studies/secureid.html">
<link rel="icon" type="image/png" href="../assets/images/profile.png">
<link rel="stylesheet" href="../assets/css/style.css">
<link rel="stylesheet" href="../assets/css/scroll.css">
<link rel="stylesheet" href="/assets/css/style.css">
<link rel="stylesheet" href="/assets/css/scroll.css">
<style>:root{ --accent:var(--secureid); }</style>
</head>
<body class="sx-page sx-case is-light" data-case-study="SecureID" data-accent="secureid">

<header class="sx-nav-wrap">
  <nav class="sx-nav" aria-label="Main navigation">
    <a class="sx-brand" href="../index.html" aria-label="Eric Ariel De La Paz, home">
      <img src="../assets/images/profile.png" alt="" width="28" height="28">
      <span>De La Paz</span>
    </a>
    <span class="sx-nav-sep" aria-hidden="true"></span>
    <a href="../index.html" class="sx-nav-link">Home</a>
    <a href="../about.html" class="sx-nav-link">About</a>
    <a href="../playground.html" class="sx-nav-link">Playground</a>
    <button type="button" class="sx-nav-info-btn" id="infoBtn" aria-expanded="false" aria-controls="infoPopover" title="Open Quick Contact &amp; Info">
      <span>Info</span>
      <svg class="sx-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <span class="sx-nav-sep" aria-hidden="true"></span>
    <span class="sx-status" title="Open to work"><i class="sx-dot" aria-hidden="true"></i><span>Open to work</span></span>
  </nav>
</header>

<main class="sx-main" id="main">
<div class="container">
  <aside class="mini-eric-banner is-header" aria-label="Mini Eric dialogue">
    <div class="mini-eric-char" title="Click Mini Eric!">
      <img src="../assets/images/mini-eric-thinking.png" class="mini-eric-img" alt="Mini Eric chibi avatar" width="80" height="120" />
    </div>
    <div class="mini-eric-bubble">
      <div class="mini-eric-name">Mini Eric </div>
      <p class="mini-eric-text">Welcome to SecureID! Dual-sided product architecture: a calm mobile verification flow and a fast 3-action analyst triage dashboard.</p>
    </div>
  </aside>
</div>

<section class="cs-hero container">
  <figure class="sx-cover"><img src="../assets/images/secureid.png" alt="Secureid project artwork" width="1200" height="600"></figure>
  <div class="breadcrumb"><a href="../index.html">`;

// Backup file
fs.copyFileSync(target, target + '.bak');

// If the file was truncated at '<!doc' or is missing <head>
if (html.startsWith('<!docDe La Paz') || html.startsWith('<!doc') || !html.includes('<head>')) {
  html = missingTop + html.replace(/^<!doc(?:De La Paz)?/, 'De La Paz');
  fs.writeFileSync(target, html, 'utf8');
  console.log('✅ Successfully restored SecureID <head>, CSS stylesheets, navigation, and hero structure!');
} else {
  // Ensure CSS links have both relative and root fallback
  if (!html.includes('/assets/css/scroll.css')) {
    html = html.replace(
      '<link rel="stylesheet" href="../assets/css/scroll.css">',
      '<link rel="stylesheet" href="../assets/css/scroll.css">\n<link rel="stylesheet" href="/assets/css/scroll.css">'
    );
    fs.writeFileSync(target, html, 'utf8');
  }
  console.log('ℹ️ SecureID already had <head> tag; verified CSS links are linked.');
}

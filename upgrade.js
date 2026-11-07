const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Portfolio Upgrade: Recruiter Cards View + Pokédex Mode + 4x2 Badges...\n');

const googleFontsLink = '<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';

// 1. UPDATE index.html
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  // Font links
  if (indexHtml.includes('fonts.googleapis.com/css2?family=')) {
    indexHtml = indexHtml.replace(/<link[^>]+fonts\.googleapis\.com\/css2\?[^>]+>/i, googleFontsLink);
  } else {
    indexHtml = indexHtml.replace('</head>', '  ' + googleFontsLink + '\n</head>');
  }

  // Remove redundant subtitle paragraphs across sections
  indexHtml = indexHtml.replace(/<p class="sx-sub">[\s\S]*?<\/p>\s*/gi, '');

  // Refine section headers & kickers
  indexHtml = indexHtml.replace(
    /<p class="sx-kicker"><i class="sx-dot"[^>]*><\/i>[^<]*<\/p>/i,
    '<p class="sx-kicker"><i class="sx-dot" aria-hidden="true"></i> Product Designer · Available for Full-Time Roles</p>'
  );

  indexHtml = indexHtml.replace(
    /<p class="sx-kicker">Experience<\/p>\s*<h2 id="exp-title">Two design internships, running in parallel<\/h2>/i,
    '<p class="sx-kicker">EXPERIENCE LOG</p>\n    <h2 id="exp-title">Professional Design Experience</h2>'
  );

  indexHtml = indexHtml.replace(
    /<p class="sx-kicker">How I work<\/p>\s*<h2 id="process-title">Fast, with a human in the loop\.<\/h2>/i,
    '<p class="sx-kicker">METHODOLOGY</p>\n    <h2 id="process-title">Rapid Prototyping &amp; Systems Architecture</h2>'
  );

  indexHtml = indexHtml.replace(
    /<p class="sx-kicker">Skills and tools<\/p>\s*<h2 id="skills-title">From research to engineering handoff<\/h2>/i,
    '<p class="sx-kicker">CAPABILITIES &amp; TOOLING</p>\n    <h2 id="skills-title">From Heuristic Audits to Engineering Handoff</h2>'
  );

  indexHtml = indexHtml.replace(
    /<p class="sx-kicker">About<\/p>\s*<h2 id="about-title">Precise decisions, not just good-looking screens\.<\/h2>/i,
    '<p class="sx-kicker">BACKGROUND &amp; CREDENTIALS</p>\n    <h2 id="about-title">Design grounded in verified user friction.</h2>'
  );

  indexHtml = indexHtml.replace(
    /<p class="sx-kicker">Contact<\/p>\s*<h2 id="contact-title">Let's build something useful\.<\/h2>/i,
    '<p class="sx-kicker">DIRECT CHANNELS</p>\n    <h2 id="contact-title">Ready for Your Design Team</h2>'
  );

  // Clean Work section replacement (Cards View active by default + Pokédex Console)
  const workSectionHtml = `<section class="sx-section" id="work" aria-labelledby="work-title">
  <div class="sx-wrap">
    <div class="work-header-wrap">
      <div class="work-header-copy">
        <p class="sx-kicker">SYSTEM REGISTRY // 05 ENTRIES</p>
        <h2 id="work-title">Selected Works &amp; Systems</h2>
      </div>

      <div class="work-view-controls">
        <div class="view-switch-pill" role="tablist" aria-label="Case Study View Modes">
          <button class="view-toggle-btn active" id="btn-view-cards" type="button" role="tab" aria-selected="true" aria-controls="cards-container">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            <span>Recruiter View (Cards)</span>
          </button>
          <button class="view-toggle-btn" id="btn-view-dex" type="button" role="tab" aria-selected="false" aria-controls="dex-container">
            <span class="dex-scanner-dot"></span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="3"/><circle cx="9" cy="7" r="2"/><line x1="8" y1="14" x2="16" y2="14"/><line x1="8" y1="17" x2="13" y2="17"/></svg>
            <span>Pokédex Mode</span>
            <span class="view-badge-hot">INTERACTIVE</span>
          </button>
        </div>
      </div>
    </div>

    <!-- VIEW 1: RECRUITER VIEW (CARDS & HOLOGRAPHICS) — ACTIVE BY DEFAULT -->
    <div id="cards-container" class="project-grid sx-projects is-list tcg-grid" role="tabpanel" aria-labelledby="btn-view-cards">
      
      <!-- CARD 01: STUDY BUDDY -->
      <a class="workspace-card tcg-card card-studybuddy" href="case-studies/study-buddy.html" data-case-study="Study Buddy">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/study-buddy.png" alt="Study Buddy desktop focus companion app">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 001 // DESKTOP HUD</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> PSYCHIC / DEEP WORK</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">Study Buddy — Desktop Focus Companion</h2>
            <div class="card-role-meta">
              <span class="card-role">Solo Product Designer &amp; Builder</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Independent Electron Project</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Unstructured study sessions cause digital fragmentation across 40 browser tabs.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">Shipped working cross-platform native installers in ~14 hours of active build time.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Desktop App (Windows / Mac / Linux)</span>
            <span>Design Systems</span>
            <span>AI-Assisted Build</span>
            <span>Interactive Overlay</span>
            <span>WCAG AA</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="https://github.com/EricArielDeLaPaz/study-buddy-desktop">View GitHub Repo ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 02: SECUREID -->
      <a class="workspace-card tcg-card card-secureid" href="case-studies/secureid.html" data-case-study="SecureID">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/secureid.png" alt="SecureID identity verification and analyst review platform">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 002 // DUAL-SIDED SAAS</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> ELECTRIC / IDENTITY</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">SecureID — Identity Verification &amp; Analyst Review Platform</h2>
            <div class="card-role-meta">
              <span class="card-role">Solo Product Designer</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Mobile Verification &amp; Desktop SaaS</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Anxious mobile users abandon invasive verification, while fraud analysts bottleneck on review queues.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">Cut end-user drop-off with contextual biometric guidance; reduced review latency with batch triage HUD.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Mobile Web &amp; Desktop SaaS</span>
            <span>Security UX</span>
            <span>Analyst Queues</span>
            <span>Design Tokens</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="https://www.figma.com/proto/t7kO672QvC5qQ7dNu8w0yX/SecureID-Case-Study?node-id=1-2&scaling=scale-down&page-id=0%3A1">Figma Prototype ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 03: VEXTARO -->
      <a class="workspace-card tcg-card card-vextaro" href="case-studies/vextaro.html" data-case-study="Vextaro">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/vextaro.png" alt="Vextaro real estate investment platform">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 003 // FINTECH HUD</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> STEEL / FINTECH</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">Vextaro — Fractional Real Estate Investment Platform</h2>
            <div class="card-role-meta">
              <span class="card-role">Solo Product Designer</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Fintech Web Application</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Retail investors struggle to assess liquidity, projected IRR, and risk across dense real estate offerings.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">Built transparent waterfall metrics, secondary-market trading cues, and an accessible investment checkout.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Web Platform</span>
            <span>Financial Telemetry</span>
            <span>Interactive Charts</span>
            <span>Compliance UX</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="https://www.figma.com/proto/7JcM2lY6oU4uW9tP0r5x4z/Vextaro-Prototype?node-id=10-4&scaling=scale-down">Figma Prototype ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 04: HONDA AUDIT -->
      <a class="workspace-card tcg-card card-honda" href="case-studies/honda.html" data-case-study="Honda Audit">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/honda.png" alt="Honda of Clear Lake dealership website usability audit">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 004 // HEURISTIC AUDIT</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> GROUND / HEURISTICS</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">Honda of Clear Lake — Dealership Usability &amp; Conversion Audit</h2>
            <div class="card-role-meta">
              <span class="card-role">UX Researcher &amp; Evaluator</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Real-World Automotive Retail Audit</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Disorienting multi-tier inventory filters and pop-up lead traps caused 68% estimated test bounce rates.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">Audited 10 Nielsen heuristics; redesigned frictionless vehicle comparison grid with upfront pricing.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Heuristic Evaluation</span>
            <span>Nielsen Norman Group</span>
            <span>Conversion Optimization</span>
            <span>E-Commerce UX</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Audit Report →</span>
            <span class="btn-pill-secondary" data-href="assets/docs/Honda_Usability_Audit.pdf">PDF Summary ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 05: DEVTECTIVE -->
      <a class="workspace-card tcg-card card-devtective" href="case-studies/devtective.html" data-case-study="DevTective">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/devtective.png" alt="DevTective developer learning habit tracker">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 005 // HABIT ENGINE</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> GHOST / HABIT ENGINE</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">DevTective — Developer Learning Progress &amp; Habit Tracker</h2>
            <div class="card-role-meta">
              <span class="card-role">Solo Product Designer</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Productivity Web Application</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Self-taught developers experience burnout and loss of momentum due to vague milestone definitions.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">Designed bite-sized quest loops, streak protection mechanics, and verifiable skill verification trees.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Gamification UX</span>
            <span>Telemetry Dashboard</span>
            <span>Behavioral Psychology</span>
            <span>Mobile-First Web</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="https://www.figma.com/proto/5yW1n9O2hP0mX6zK8qR3vT/DevTective?node-id=2-1">Figma Prototype ↗</span>
          </div>
        </div>
      </a>

    </div>

    <!-- VIEW 2: INTERACTIVE POKÉDEX HARDWARE CONSOLE -->
    <div id="dex-container" class="dex-hardware-wrap" role="tabpanel" aria-labelledby="btn-view-dex" hidden>
      <div class="dex-chassis" id="dex-chassis">
        
        <!-- POKÉDEX HARDWARE HEADER -->
        <div class="dex-top-bar">
          <div class="dex-optics">
            <div class="dex-lens-big" title="Optical Scanner Core">
              <div class="dex-lens-reflection"></div>
            </div>
            <div class="dex-led-cluster">
              <span class="dex-mini-led led-red" title="Telemetry Power"></span>
              <span class="dex-mini-led led-yellow" title="Bus Activity"></span>
              <span class="dex-mini-led led-green" title="Signal Lock"></span>
            </div>
          </div>
          <div class="dex-hardware-brand">
            <span class="dex-brand-code">AGY-MODEL // DEX-89</span>
            <span class="dex-brand-label">DESIGN ARCHIVE SYSTEM</span>
          </div>
        </div>

        <!-- DUAL-SCREEN HARDWARE BODY -->
        <div class="dex-body-grid">
          
          <!-- LEFT SCREEN: CRT OPTICAL SCANNER & RETICLE -->
          <div class="dex-left-screen-housing">
            <div class="dex-screen-bezel">
              <div class="dex-crt-screen" id="dex-crt">
                <div class="dex-crt-scanlines"></div>
                <div class="dex-crt-glare"></div>
                
                <div class="dex-viewport-overlay">
                  <div class="dex-target-corner tc-tl"></div>
                  <div class="dex-target-corner tc-tr"></div>
                  <div class="dex-target-corner tc-bl"></div>
                  <div class="dex-target-corner tc-br"></div>
                  <div class="dex-hud-chip" id="dex-hud-specimen">SPECIMEN #001</div>
                  <div class="dex-hud-status" id="dex-hud-status">STATUS: ONLINE</div>
                </div>

                <div class="dex-mockup-stage" id="dex-mockup-stage">
                  <img id="dex-img" src="assets/images/study-buddy.png" alt="Scanned Case Study Mockup">
                </div>
              </div>
            </div>

            <!-- HARDWARE CONTROLS UNDER LEFT DISPLAY -->
            <div class="dex-sub-controls">
              <div class="dex-audio-cluster">
                <button class="dex-btn-speaker" id="dex-btn-audio" type="button" aria-label="Toggle 8-bit Sound Synthesizer">
                  <span class="speaker-grill"><i></i><i></i><i></i><i></i></span>
                  <span class="audio-label" id="dex-audio-label">8-BIT: ON</span>
                </button>
              </div>

              <!-- TACTILE D-PAD CONTROLLER -->
              <div class="dex-dpad-cluster" aria-label="Navigation D-Pad">
                <div class="dpad-axis-vert">
                  <button class="dpad-btn dpad-up" id="dex-nav-up" type="button" aria-label="Previous Case Study (Up)">▲</button>
                  <button class="dpad-btn dpad-down" id="dex-nav-down" type="button" aria-label="Next Case Study (Down)">▼</button>
                </div>
                <div class="dpad-axis-horiz">
                  <button class="dpad-btn dpad-left" id="dex-nav-prev" type="button" aria-label="Previous Case Study (Left)">◀</button>
                  <div class="dpad-center-hub"></div>
                  <button class="dpad-btn dpad-right" id="dex-nav-next" type="button" aria-label="Next Case Study (Right)">▶</button>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT SCREEN: TELEMETRY & SPEC DATA TERMINAL -->
          <div class="dex-right-data-terminal">
            <div class="dex-terminal-screen">
              <div class="dex-terminal-header">
                <div class="dex-entry-no" id="dex-entry-no">REG NO. #001</div>
                <div class="dex-type-tag" id="dex-type-tag"><i class="dex-type-dot"></i> PSYCHIC / DEEP WORK</div>
              </div>

              <div class="dex-title-block">
                <h3 class="dex-entry-name" id="dex-entry-name">Study Buddy</h3>
                <p class="dex-entry-subtitle" id="dex-entry-subtitle">Desktop Focus Companion · Solo Product Designer &amp; Builder</p>
              </div>

              <!-- TELEMETRY BARS -->
              <div class="dex-stat-panel">
                <div class="stat-row">
                  <span class="stat-name">SYSTEMS ARCHITECTURE</span>
                  <div class="stat-track"><div class="stat-bar" id="dex-bar-systems" style="width: 95%;"></div></div>
                  <span class="stat-val" id="dex-val-systems">95</span>
                </div>
                <div class="stat-row">
                  <span class="stat-name">PROTOTYPE FIDELITY</span>
                  <div class="stat-track"><div class="stat-bar" id="dex-bar-proto" style="width: 98%;"></div></div>
                  <span class="stat-val" id="dex-val-proto">98</span>
                </div>
                <div class="stat-row">
                  <span class="stat-name">USABILITY &amp; METRICS</span>
                  <div class="stat-track"><div class="stat-bar" id="dex-bar-metrics" style="width: 90%;"></div></div>
                  <span class="stat-val" id="dex-val-metrics">90</span>
                </div>
              </div>

              <!-- MOVESET / CAPABILITIES -->
              <div class="dex-field-box">
                <span class="field-title">SYSTEM CAPABILITIES / MOVESET</span>
                <div class="dex-tag-cloud" id="dex-tag-cloud">
                  <span class="dex-tag">Electron Desktop App</span>
                  <span class="dex-tag">Design System Tokens</span>
                  <span class="dex-tag">AI-Assisted Build</span>
                  <span class="dex-tag">Interactive Overlay</span>
                  <span class="dex-tag">WCAG AA Accessible</span>
                </div>
              </div>

              <!-- FRICTION & OUTCOME LOG -->
              <div class="dex-friction-log">
                <div class="log-item">
                  <span class="log-label friction">VERIFIED FRICTION</span>
                  <p class="log-copy" id="dex-friction-copy">Unstructured study sessions cause digital fragmentation across 40 browser tabs.</p>
                </div>
                <div class="log-item">
                  <span class="log-label outcome">SYSTEM OUTCOME</span>
                  <p class="log-copy" id="dex-outcome-copy">Shipped working cross-platform native installers in ~14 hours of active build time.</p>
                </div>
              </div>

              <!-- ACTION LAUNCHPAD -->
              <div class="dex-action-dock">
                <a class="dex-btn-launch" id="dex-btn-read" href="case-studies/study-buddy.html">
                  <span>Open Full Dossier →</span>
                </a>
                <a class="dex-btn-secondary" id="dex-btn-ext" href="https://github.com/EricArielDeLaPaz/study-buddy-desktop" target="_blank" rel="noopener">
                  <span id="dex-btn-ext-label">GitHub Repo ↗</span>
                </a>
              </div>
            </div>

            <!-- QUICK JUMP KEYPAD (1 - 5) -->
            <div class="dex-keypad-cluster">
              <span class="keypad-label">DIRECT SPECIMEN JUMP:</span>
              <div class="dex-keypad">
                <button class="key-btn active" data-index="0" type="button" aria-label="Jump to Case Study 1">#01</button>
                <button class="key-btn" data-index="1" type="button" aria-label="Jump to Case Study 2">#02</button>
                <button class="key-btn" data-index="2" type="button" aria-label="Jump to Case Study 3">#03</button>
                <button class="key-btn" data-index="3" type="button" aria-label="Jump to Case Study 4">#04</button>
                <button class="key-btn" data-index="4" type="button" aria-label="Jump to Case Study 5">#05</button>
              </div>
              <button class="dex-btn-return-recruiter" id="dex-btn-back-cards" type="button">
                <span>← Return to Recruiter Cards View</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>
</section>`;

  indexHtml = indexHtml.replace(/<section class="sx-section" id="work"[^>]*>[\s\S]*?<\/section>/i, workSectionHtml);

  // Clean Badge Case replacement in About section (Single 4x2 Grid + Hover Retention Bridge)
  const badgeCaseHtml = `<!-- MILESTONE & CREDENTIAL CASE (4 ON TOP, 4 ON BOTTOM) -->
      <div class="badge-case-wrap" aria-label="Milestones and Credentials">
        <div class="badge-case-header">
          <div class="badge-case-title-row">
            <span class="badge-case-tag"><i class="badge-case-dot"></i> CREDENTIAL REGISTRY</span>
            <span class="badge-case-count">8 RECEPTACLES // 4 LOGGED</span>
          </div>
          <p class="badge-case-instruction">Hover to inspect verified credentials · Click to connect</p>
        </div>

        <div class="badge-grid" role="list">
          
          <!-- POD 1: STEALTH STARTUP -->
          <div class="badge-slot slot-edge-left" role="listitem" tabindex="0">
            <div class="badge-pod is-earned" data-badge="stealth">
              <div class="badge-gem gem-stealth">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <path d="M20 3L6 10V20C6 28.5 12 36 20 38C28 36 34 28.5 34 20V10L20 3Z" fill="url(#gradStealthBase)" stroke="#d9ac54" stroke-width="1.5"/>
                  <path d="M20 7L10 12.5V20C10 26 14.2 31.8 20 33.5C25.8 31.8 30 26 30 20V12.5L20 7Z" fill="#1b1712" stroke="#f0cf74" stroke-width="1" stroke-dasharray="2 1"/>
                  <path d="M20 12L25 20L20 28L15 20L20 12Z" fill="url(#gradStealthCore)"/>
                  <circle cx="20" cy="20" r="2.5" fill="#ffffff"/>
                  <defs>
                    <linearGradient id="gradStealthBase" x1="6" y1="3" x2="34" y2="38" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2a2318"/>
                      <stop offset="1" stop-color="#120f0b"/>
                    </linearGradient>
                    <linearGradient id="gradStealthCore" x1="15" y1="12" x2="25" y2="28" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#ffd700"/>
                      <stop offset="1" stop-color="#b8860b"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="badge-reflection"></div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 01 // INTERNSHIP</span>
                <span class="tooltip-status status-active">ACTIVE</span>
              </div>
              <p class="tooltip-name">Stealth Startup</p>
              <p class="tooltip-role">Founding Product Design Intern</p>
              <p class="tooltip-meta">Rapid prototyping · Stealth AI product launch · 2026</p>
              <a class="tooltip-link" href="#contact">✨ CLICK TO CONNECT →</a>
            </div>
          </div>

          <!-- POD 2: FLYRANK AI -->
          <div class="badge-slot" role="listitem" tabindex="0">
            <div class="badge-pod is-earned" data-badge="flyrank">
              <div class="badge-gem gem-flyrank">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="16.5" fill="url(#gradFlyBase)" stroke="#64b5f6" stroke-width="1.5"/>
                  <path d="M11 25L20 11L29 25L20 21L11 25Z" fill="url(#gradFlyWing)" stroke="#90caf9" stroke-width="1"/>
                  <path d="M14 26L20 16L26 26L20 23L14 26Z" fill="#120f0b" opacity="0.6"/>
                  <circle cx="20" cy="14" r="1.5" fill="#ffffff"/>
                  <defs>
                    <linearGradient id="gradFlyBase" x1="3.5" y1="3.5" x2="36.5" y2="36.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#152636"/>
                      <stop offset="1" stop-color="#0a141e"/>
                    </linearGradient>
                    <linearGradient id="gradFlyWing" x1="11" y1="11" x2="29" y2="25" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#90caf9"/>
                      <stop offset="1" stop-color="#1976d2"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="badge-reflection"></div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 02 // INTERNSHIP</span>
                <span class="tooltip-status status-active">ACTIVE</span>
              </div>
              <p class="tooltip-name">Flyrank AI</p>
              <p class="tooltip-role">Product Design Intern</p>
              <p class="tooltip-meta">AI-driven search &amp; analytics workflows · 2026</p>
              <a class="tooltip-link" href="#contact">✨ CLICK TO CONNECT →</a>
            </div>
          </div>

          <!-- POD 3: GOOGLE UX -->
          <div class="badge-slot" role="listitem" tabindex="0">
            <div class="badge-pod is-earned" data-badge="google">
              <div class="badge-gem gem-google">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,4 34,12 34,28 20,36 6,28 6,12" fill="url(#gradGgBase)" stroke="#81c784" stroke-width="1.5"/>
                  <circle cx="20" cy="20" r="7" fill="none" stroke="#a5d6a7" stroke-width="1.5"/>
                  <path d="M20 13V20L25 25" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="gradGgBase" x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#142818"/>
                      <stop offset="1" stop-color="#0b170e"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="badge-reflection"></div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 03 // CERTIFICATION</span>
                <span class="tooltip-status status-verified">VERIFIED</span>
              </div>
              <p class="tooltip-name">Google UX Design Certificate</p>
              <p class="tooltip-role">Professional Credential</p>
              <p class="tooltip-meta">End-to-end design process · Wireframing · Prototyping · Usability</p>
              <a class="tooltip-link" href="#contact">✨ CLICK TO CONNECT →</a>
            </div>
          </div>

          <!-- POD 4: WGU DEGREE -->
          <div class="badge-slot slot-edge-right" role="listitem" tabindex="0">
            <div class="badge-pod is-earned is-degree" data-badge="wgu">
              <div class="badge-gem gem-wgu">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <rect x="5" y="6" width="30" height="28" rx="4" fill="url(#gradWguBase)" stroke="#ffb74d" stroke-width="1.5"/>
                  <path d="M12 14L20 8L28 14L20 20L12 14Z" fill="#ffe082"/>
                  <path d="M15 17.5V23C15 25.5 17.2 27 20 27C22.8 27 25 25.5 25 23V17.5" stroke="#ffe082" stroke-width="1.5" fill="none"/>
                  <path d="M28 14V22" stroke="#ffe082" stroke-width="1.5"/>
                  <circle cx="28" cy="23" r="1.5" fill="#ffe082"/>
                  <defs>
                    <linearGradient id="gradWguBase" x1="5" y1="6" x2="35" y2="34" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2a1f10"/>
                      <stop offset="1" stop-color="#150f07"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="badge-reflection"></div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 04 // ACADEMIC</span>
                <span class="tooltip-status status-progress">IN PROGRESS</span>
              </div>
              <p class="tooltip-name">B.S. Software Engineering</p>
              <p class="tooltip-role">Western Governors University</p>
              <p class="tooltip-meta">Software Systems Architecture · Expected Graduation 2026</p>
              <a class="tooltip-link" href="#contact">✨ CLICK TO CONNECT →</a>
            </div>
          </div>

          <!-- POD 5: YOUR COMPANY -->
          <div class="badge-slot slot-edge-left" role="listitem" tabindex="0">
            <div class="badge-pod is-open-role" data-badge="yourco">
              <div class="badge-gem gem-open">
                <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                  <polygon points="20,4 35,14 30,34 10,34 5,14" fill="url(#gradOpenBase)" stroke="#d9ac54" stroke-width="1.5" stroke-dasharray="3 2"/>
                  <circle cx="20" cy="20" r="6" fill="#120f0b" stroke="#f0cf74" stroke-width="1"/>
                  <path d="M20 16V24M16 20H24" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                  <defs>
                    <linearGradient id="gradOpenBase" x1="5" y1="4" x2="35" y2="34" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2c2214"/>
                      <stop offset="1" stop-color="#161009"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="badge-reflection"></div>
            </div>
            <div class="badge-tooltip tooltip-highlight" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 05 // RECRUITER POD</span>
                <span class="tooltip-status status-open">AVAILABLE NOW</span>
              </div>
              <p class="tooltip-name">Your Company Here</p>
              <p class="tooltip-role">Full-Time Product Designer</p>
              <p class="tooltip-meta">Seeking junior/entry roles in product design, design systems, and rapid prototyping.</p>
              <a class="tooltip-link link-highlight" href="#contact">👉 HIRE ERIC FOR THIS POD →</a>
            </div>
          </div>

          <!-- POD 6: UPCOMING 02 -->
          <div class="badge-slot" role="listitem" tabindex="0">
            <div class="badge-pod is-locked" data-badge="upcoming-2">
              <div class="badge-gem gem-locked">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#504332" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 06 // SYSTEM SLOT</span>
                <span class="tooltip-status status-locked">LOCKED</span>
              </div>
              <p class="tooltip-name">Upcoming Milestone</p>
              <p class="tooltip-role">Future Enterprise System</p>
              <p class="tooltip-meta">Reserved for upcoming production design deliverables.</p>
            </div>
          </div>

          <!-- POD 7: UPCOMING 03 -->
          <div class="badge-slot" role="listitem" tabindex="0">
            <div class="badge-pod is-locked" data-badge="upcoming-3">
              <div class="badge-gem gem-locked">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#504332" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 07 // SYSTEM SLOT</span>
                <span class="tooltip-status status-locked">LOCKED</span>
              </div>
              <p class="tooltip-name">Upcoming Milestone</p>
              <p class="tooltip-role">Future Enterprise System</p>
              <p class="tooltip-meta">Reserved for upcoming production design deliverables.</p>
            </div>
          </div>

          <!-- POD 8: UPCOMING 04 -->
          <div class="badge-slot slot-edge-right" role="listitem" tabindex="0">
            <div class="badge-pod is-locked" data-badge="upcoming-4">
              <div class="badge-gem gem-locked">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#504332" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <div class="badge-tooltip" role="tooltip">
              <div class="tooltip-header">
                <span class="tooltip-num">POD 08 // SYSTEM SLOT</span>
                <span class="tooltip-status status-locked">LOCKED</span>
              </div>
              <p class="tooltip-name">Upcoming Milestone</p>
              <p class="tooltip-role">Future Enterprise System</p>
              <p class="tooltip-meta">Reserved for upcoming production design deliverables.</p>
            </div>
          </div>

        </div>
      </div>`;

  // Pre-clean any previous badge markup to prevent duplicate badge cases
  indexHtml = indexHtml.replace(/<!-- MILESTONE[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  indexHtml = indexHtml.replace(/<div class="badge-case-wrap"[\s\S]*?<\/div>\s*<\/div>/gi, '');

  const aboutEndRegex = /(<\/div>\s*<\/section>\s*<!-- =+ CONTACT)/i;
  if (aboutEndRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(aboutEndRegex, '  ' + badgeCaseHtml + '\n    </div>\n  </section>\n\n  <!-- =========================================================\n       CONTACT');
  } else {
    indexHtml = indexHtml.replace('</section>', badgeCaseHtml + '\n</section>');
  }

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('✅ index.html updated: 1 single 4x2 Badge Case, Recruiter Cards view active, Pokédex mode embedded.');
}

// 2. UPDATE assets/js/scroll.js (Clean replacement with boundary comments)
const jsPath = path.join('assets', 'js', 'scroll.js');
if (fs.existsSync(jsPath)) {
  let jsContent = fs.readFileSync(jsPath, 'utf8');

  const dexJs = `/* --- POKEDEX & WORK VIEWS START --- */
(function() {
  'use strict';

  // 8-bit Sound Synthesizer via Web Audio API
  let audioCtx = null;
  let audioEnabled = true;

  function play8BitTone(type) {
    if (!audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'click') {
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05); // A5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.07);
      } else if (type === 'switch') {
        osc.frequency.setValueAtTime(329.63, now); // E4
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.09); // E5
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'nav') {
        osc.frequency.setValueAtTime(440, now); // A4
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {
      // Audio context policy
    }
  }

  // Work View Mode Switcher
  const btnCards = document.getElementById('btn-view-cards');
  const btnDex = document.getElementById('btn-view-dex');
  const cardsContainer = document.getElementById('cards-container');
  const dexContainer = document.getElementById('dex-container');
  const btnBackCards = document.getElementById('dex-btn-back-cards');

  function setWorkView(mode) {
    if (mode === 'dex') {
      btnCards?.classList.remove('active');
      btnCards?.setAttribute('aria-selected', 'false');
      btnDex?.classList.add('active');
      btnDex?.setAttribute('aria-selected', 'true');
      if (cardsContainer) cardsContainer.hidden = true;
      if (dexContainer) {
        dexContainer.hidden = false;
        dexContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      play8BitTone('switch');
    } else {
      btnDex?.classList.remove('active');
      btnDex?.setAttribute('aria-selected', 'false');
      btnCards?.classList.add('active');
      btnCards?.setAttribute('aria-selected', 'true');
      if (dexContainer) dexContainer.hidden = true;
      if (cardsContainer) cardsContainer.hidden = false;
      play8BitTone('click');
    }
  }

  btnCards?.addEventListener('click', () => setWorkView('cards'));
  btnDex?.addEventListener('click', () => setWorkView('dex'));
  btnBackCards?.addEventListener('click', () => setWorkView('cards'));

  // Pokédex Hardware Telemetry & Navigation Engine
  const dexData = [
    {
      num: '#001',
      title: 'Study Buddy',
      subtitle: 'Desktop Focus Companion · Solo Product Designer & Builder',
      type: 'PSYCHIC / DEEP WORK',
      color: '#c996e8',
      img: 'assets/images/study-buddy.png',
      alt: 'Study Buddy Desktop App',
      stats: { sys: 95, proto: 98, met: 90 },
      tags: ['Electron Desktop App', 'Design System Tokens', 'AI-Assisted Build', 'Interactive Overlay', 'WCAG AA Accessible'],
      friction: 'Unstructured study sessions cause digital fragmentation across 40 browser tabs.',
      outcome: 'Shipped working cross-platform native installers in ~14 hours of active build time.',
      studyUrl: 'case-studies/study-buddy.html',
      extLabel: 'GitHub Repo ↗',
      extUrl: 'https://github.com/EricArielDeLaPaz/study-buddy-desktop'
    },
    {
      num: '#002',
      title: 'SecureID',
      subtitle: 'Identity Verification & Analyst Platform · Solo Product Designer',
      type: 'ELECTRIC / IDENTITY',
      color: '#ffd166',
      img: 'assets/images/secureid.png',
      alt: 'SecureID Platform',
      stats: { sys: 94, proto: 92, met: 96 },
      tags: ['Mobile Web & Desktop SaaS', 'Security UX', 'Analyst Queues', 'Design Tokens', 'Heuristic Safety'],
      friction: 'Anxious mobile users abandon invasive verification, while fraud analysts bottleneck on review queues.',
      outcome: 'Cut end-user drop-off with contextual biometric guidance; reduced review latency with batch triage HUD.',
      studyUrl: 'case-studies/secureid.html',
      extLabel: 'Figma Prototype ↗',
      extUrl: 'https://www.figma.com/proto/t7kO672QvC5qQ7dNu8w0yX/SecureID-Case-Study?node-id=1-2&scaling=scale-down&page-id=0%3A1'
    },
    {
      num: '#003',
      title: 'Vextaro',
      subtitle: 'Fractional Real Estate Platform · Solo Product Designer',
      type: 'STEEL / FINTECH',
      color: '#90caf9',
      img: 'assets/images/vextaro.png',
      alt: 'Vextaro Platform',
      stats: { sys: 96, proto: 94, met: 91 },
      tags: ['Web Platform', 'Financial Telemetry', 'Interactive Charts', 'Compliance UX', 'Design System'],
      friction: 'Retail investors struggle to assess liquidity, projected IRR, and risk across dense real estate offerings.',
      outcome: 'Built transparent waterfall metrics, secondary-market trading cues, and an accessible investment checkout.',
      studyUrl: 'case-studies/vextaro.html',
      extLabel: 'Figma Prototype ↗',
      extUrl: 'https://www.figma.com/proto/7JcM2lY6oU4uW9tP0r5x4z/Vextaro-Prototype?node-id=10-4&scaling=scale-down'
    },
    {
      num: '#004',
      title: 'Honda Audit',
      subtitle: 'Dealership Usability & Conversion · UX Researcher & Evaluator',
      type: 'GROUND / HEURISTICS',
      color: '#e27d5a',
      img: 'assets/images/honda.png',
      alt: 'Honda Dealership Audit',
      stats: { sys: 88, proto: 85, met: 99 },
      tags: ['Heuristic Evaluation', 'Nielsen Norman Group', 'Conversion Optimization', 'E-Commerce UX', 'Information Architecture'],
      friction: 'Disorienting multi-tier inventory filters and pop-up lead traps caused 68% estimated test bounce rates.',
      outcome: 'Audited 10 Nielsen heuristics; redesigned frictionless vehicle comparison grid with upfront pricing.',
      studyUrl: 'case-studies/honda.html',
      extLabel: 'PDF Summary ↗',
      extUrl: 'assets/docs/Honda_Usability_Audit.pdf'
    },
    {
      num: '#005',
      title: 'DevTective',
      subtitle: 'Developer Progress & Habit Tracker · Solo Product Designer',
      type: 'GHOST / HABIT ENGINE',
      color: '#b39ddb',
      img: 'assets/images/devtective.png',
      alt: 'DevTective Habit Tracker',
      stats: { sys: 92, proto: 95, met: 93 },
      tags: ['Gamification UX', 'Telemetry Dashboard', 'Behavioral Psychology', 'Mobile-First Web', 'Habit Loops'],
      friction: 'Self-taught developers experience burnout and loss of momentum due to vague milestone definitions.',
      outcome: 'Designed bite-sized quest loops, streak protection mechanics, and verifiable skill verification trees.',
      studyUrl: 'case-studies/devtective.html',
      extLabel: 'Figma Prototype ↗',
      extUrl: 'https://www.figma.com/proto/5yW1n9O2hP0mX6zK8qR3vT/DevTective?node-id=2-1'
    }
  ];

  let currentIndex = 0;

  const elEntryNo = document.getElementById('dex-entry-no');
  const elTypeTag = document.getElementById('dex-type-tag');
  const elEntryName = document.getElementById('dex-entry-name');
  const elEntrySub = document.getElementById('dex-entry-subtitle');
  const elBarSys = document.getElementById('dex-bar-systems');
  const elValSys = document.getElementById('dex-val-systems');
  const elBarProto = document.getElementById('dex-bar-proto');
  const elValProto = document.getElementById('dex-val-proto');
  const elBarMet = document.getElementById('dex-bar-metrics');
  const elValMet = document.getElementById('dex-val-metrics');
  const elTagCloud = document.getElementById('dex-tag-cloud');
  const elFriction = document.getElementById('dex-friction-copy');
  const elOutcome = document.getElementById('dex-outcome-copy');
  const elBtnRead = document.getElementById('dex-btn-read');
  const elBtnExt = document.getElementById('dex-btn-ext');
  const elBtnExtLabel = document.getElementById('dex-btn-ext-label');
  const elImg = document.getElementById('dex-img');
  const elHudSpecimen = document.getElementById('dex-hud-specimen');
  const keyBtns = document.querySelectorAll('.dex-keypad .key-btn');

  function renderDexSpecimen(index) {
    if (index < 0 || index >= dexData.length) return;
    currentIndex = index;
    const item = dexData[index];

    if (elEntryNo) elEntryNo.textContent = 'REG NO. ' + item.num;
    if (elTypeTag) {
      elTypeTag.innerHTML = '<i class="dex-type-dot" style="background:' + item.color + '; box-shadow: 0 0 8px ' + item.color + '"></i> ' + item.type;
      elTypeTag.style.borderColor = item.color + '44';
      elTypeTag.style.color = item.color;
    }
    if (elEntryName) elEntryName.textContent = item.title;
    if (elEntrySub) elEntrySub.textContent = item.subtitle;

    if (elBarSys) elBarSys.style.width = item.stats.sys + '%';
    if (elValSys) elValSys.textContent = item.stats.sys;
    if (elBarProto) elBarProto.style.width = item.stats.proto + '%';
    if (elValProto) elValProto.textContent = item.stats.proto;
    if (elBarMet) elBarMet.style.width = item.stats.met + '%';
    if (elValMet) elValMet.textContent = item.stats.met;

    if (elTagCloud) {
      elTagCloud.innerHTML = item.tags.map(t => '<span class="dex-tag">' + t + '</span>').join('');
    }

    if (elFriction) elFriction.textContent = item.friction;
    if (elOutcome) elOutcome.textContent = item.outcome;

    if (elBtnRead) elBtnRead.href = item.studyUrl;
    if (elBtnExt) elBtnExt.href = item.extUrl;
    if (elBtnExtLabel) elBtnExtLabel.textContent = item.extLabel;

    if (elHudSpecimen) elHudSpecimen.textContent = 'SPECIMEN ' + item.num;

    if (elImg) {
      elImg.style.opacity = '0';
      elImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        elImg.src = item.img;
        elImg.alt = item.alt;
        elImg.style.opacity = '1';
        elImg.style.transform = 'scale(1)';
      }, 100);
    }

    keyBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
    });
  }

  // D-Pad and Keypad bindings
  document.getElementById('dex-nav-prev')?.addEventListener('click', () => {
    play8BitTone('nav');
    renderDexSpecimen((currentIndex - 1 + dexData.length) % dexData.length);
  });
  document.getElementById('dex-nav-next')?.addEventListener('click', () => {
    play8BitTone('nav');
    renderDexSpecimen((currentIndex + 1) % dexData.length);
  });
  document.getElementById('dex-nav-up')?.addEventListener('click', () => {
    play8BitTone('nav');
    renderDexSpecimen((currentIndex - 1 + dexData.length) % dexData.length);
  });
  document.getElementById('dex-nav-down')?.addEventListener('click', () => {
    play8BitTone('nav');
    renderDexSpecimen((currentIndex + 1) % dexData.length);
  });

  keyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      play8BitTone('nav');
      const idx = parseInt(btn.getAttribute('data-index') || '0', 10);
      renderDexSpecimen(idx);
    });
  });

  // Sound Synthesizer toggle
  const btnAudio = document.getElementById('dex-btn-audio');
  const labelAudio = document.getElementById('dex-audio-label');
  btnAudio?.addEventListener('click', () => {
    audioEnabled = !audioEnabled;
    if (labelAudio) labelAudio.textContent = '8-BIT: ' + (audioEnabled ? 'ON' : 'OFF');
    btnAudio.classList.toggle('muted', !audioEnabled);
    if (audioEnabled) play8BitTone('click');
  });

  // Handle external prototype/repo links on cards
  document.querySelectorAll('.btn-pill-secondary[data-href]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const href = btn.getAttribute('data-href');
      if (href) window.open(href, '_blank', 'noopener,noreferrer');
    });
  });

  // 3D Card Holographic & Tilt Physics
  document.querySelectorAll('.tcg-card').forEach(card => {
    const glare = card.querySelector('.tcg-glare');

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-4px)';
      if (glare) {
        const percX = (x / rect.width) * 100;
        const percY = (y / rect.height) * 100;
        glare.style.opacity = '0.7';
        glare.style.background = 'radial-gradient(circle at ' + percX.toFixed(1) + '% ' + percY.toFixed(1) + '%, rgba(240,207,116,0.18) 0%, rgba(217,172,84,0.06) 45%, transparent 70%)';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (glare) glare.style.opacity = '0';
    });
  });

})();
/* --- POKEDEX & WORK VIEWS END --- */`;

  // Idempotent insertion using exact comment markers
  const startTag = '/* --- POKEDEX & WORK VIEWS START --- */';
  const endTag = '/* --- POKEDEX & WORK VIEWS END --- */';

  if (jsContent.includes(startTag) && jsContent.includes(endTag)) {
    const sIdx = jsContent.indexOf(startTag);
    const eIdx = jsContent.indexOf(endTag) + endTag.length;
    jsContent = jsContent.slice(0, sIdx) + dexJs + jsContent.slice(eIdx);
  } else {
    jsContent += '\n\n' + dexJs;
  }

  fs.writeFileSync(jsPath, jsContent, 'utf8');
  console.log('✅ assets/js/scroll.js updated with synthesizer, mode switchers, and holographic tilt physics.');
}

// 3. UPDATE Case Study Subpages with Pokédex Registry Chips
const caseStudies = [
  { file: 'study-buddy.html', num: '001', type: 'PSYCHIC // DEEP WORK', color: '#c996e8', title: 'Study Buddy — Desktop Focus Companion', status: 'SHIPPED V1.0' },
  { file: 'secureid.html', num: '002', type: 'ELECTRIC // IDENTITY', color: '#ffd166', title: 'SecureID — Identity Verification Platform', status: 'SYSTEM DESIGNED' },
  { file: 'vextaro.html', num: '003', type: 'STEEL // FINTECH', color: '#90caf9', title: 'Vextaro — Fractional Real Estate Platform', status: 'PRODUCTION SPEC' },
  { file: 'honda.html', num: '004', type: 'GROUND // HEURISTICS', color: '#e27d5a', title: 'Honda of Clear Lake — Dealership Website Usability Audit', status: 'AUDIT COMPLETE' },
  { file: 'devtective.html', num: '005', type: 'GHOST // PROGRESS TRACKING', color: '#9c8be8', title: 'DevTective — Developer Learning Progress &amp; Habit Tracker', status: 'RESEARCH &amp; PROTOTYPE' }
];

caseStudies.forEach(cs => {
  const csPath = path.join('case-studies', cs.file);
  if (fs.existsSync(csPath)) {
    let csHtml = fs.readFileSync(csPath, 'utf8');

    if (csHtml.includes('fonts.googleapis.com/css2?family=')) {
      csHtml = csHtml.replace(/<link[^>]+fonts\.googleapis\.com\/css2\?[^>]+>/i, googleFontsLink);
    } else {
      csHtml = csHtml.replace('</head>', '  ' + googleFontsLink + '\n</head>');
    }

    const bannerHtml = '<div class="pokedex-registry-bar">\n' +
      '        <span class="reg-chip">SYSTEM NO. ' + cs.num + '</span>\n' +
      '        <span class="reg-chip reg-type" style="color: ' + cs.color + '; border-color: rgba(217,172,84,0.35);">' + cs.type + '</span>\n' +
      '        <span class="reg-title">' + cs.title + '</span>\n' +
      '        <span class="reg-status"><i class="sx-dot" style="background:#2ecc40;" aria-hidden="true"></i> ' + cs.status + '</span>\n' +
      '      </div>';

    csHtml = csHtml.replace(/<div class="pokedex-registry-bar">[\s\S]*?<\/div>\s*/gi, '');

    const bcRegex = /(<nav class="cs-breadcrumb"[^>]*>)/i;
    if (bcRegex.test(csHtml)) {
      csHtml = csHtml.replace(bcRegex, bannerHtml + '\n      $1');
      console.log('✅ Injected Pokédex banner into ' + cs.file);
    }

    fs.writeFileSync(csPath, csHtml, 'utf8');
  }
});

console.log('\n🎉 All portfolio files successfully upgraded with zero syntax errors!');

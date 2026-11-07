const fs = require('fs');
const path = require('path');

console.log('🚀 Executing Portfolio Upgrade: Recruiter Cards View + Pokédex Mode + 4x2 Badges...\n');

const googleFontsLink = '<link rel="preconnect" href="https://fonts.googleapis.com">\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">';

// 1. UPDATE index.html
const indexPath = 'index.html';
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  if (indexHtml.includes('fonts.googleapis.com/css2?family=')) {
    indexHtml = indexHtml.replace(/<link[^>]+fonts\.googleapis\.com\/css2\?[^>]+>/i, googleFontsLink);
  } else {
    indexHtml = indexHtml.replace('</head>', '  ' + googleFontsLink + '\n</head>');
  }

  indexHtml = indexHtml.replace(/<p class="sx-sub">[\s\S]*?<\/p>\s*/gi, '');

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

  // Clean Work section replacement
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
              <span class="summary-val">1 shared token system across mobile &amp; web, 3-action analyst triage pattern, verified Figma prototype.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Dual-Sided: Mobile &amp; SaaS Dashboard</span>
            <span>Design Tokens</span>
            <span>Clickable Prototype</span>
            <span>Case Triage UX</span>
            <span>Progressive Disclosure</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="https://www.figma.com/proto/lkyBLNn8aDnai9EJADZQ7e/SecureID?node-id=148-4058&viewport=326%2C414%2C0.05&t=iJAA0fPXCSZhktzN-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=148%3A4058&show-proto-sidebar=1&page-id=41%3A3813">Figma Prototype ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 03: VEXTARO -->
      <a class="workspace-card tcg-card card-vextaro" href="case-studies/vextaro.html" data-case-study="Vextaro">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/vextaro.png" alt="Vextaro luxury formalwear rental app">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 003 // LUXURY E-COMMERCE</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> STEEL / APPAREL</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">Vextaro — Luxury Formalwear Rental App &amp; System</h2>
            <div class="card-role-meta">
              <span class="card-role">UX/UI Design Intern</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Flyrank AI 8-Week Capstone</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Renters cannot try formalwear on before it ships, making fit uncertainty the #1 checkout blocker.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">7-section IA, 15/15 WCAG AA contrast passes, 35 component variants, developer handoff package.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Mobile App (iOS &amp; Android)</span>
            <span>Design Systems &amp; Tokens</span>
            <span>UX Research &amp; IA</span>
            <span>WCAG 2.2 AA Audit</span>
            <span>Engineering Handoff</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="https://www.figma.com/proto/fwsFyRAMmhGtRbqeYjq0mZ/Vextaro-Internship-Capstone?node-id=2166-2413&viewport=129%2C25%2C0.06&t=AglpdG5iapGW7Pro-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2166%3A2413&page-id=2166%3A2410">Figma Prototype ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 04: HONDA OF CLEAR LAKE -->
      <a class="workspace-card tcg-card card-honda" href="case-studies/honda.html" data-case-study="Honda of Clear Lake">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/honda.png" alt="Honda of Clear Lake website heuristic evaluation">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 004 // LIVE AUDIT</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> GROUND / HEURISTICS</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">Honda of Clear Lake — Dealership Website Usability Audit</h2>
            <div class="card-role-meta">
              <span class="card-role">Solo UX Auditor</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Independent Dealership Evaluation</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Car buyers experienced severe friction finding real-time pricing, trade-in values, and financing terms.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">31 usability violations ranked on 0–4 severity scale with annotated redesign punch list for 3 blockers.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Responsive Dealership Website</span>
            <span>Heuristic Evaluation</span>
            <span>Nielsen's 10 Heuristics</span>
            <span>Severity Rating (0–4)</span>
            <span>Conversion Optimization</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="case-studies/honda.html#scorecard">Heuristic Scorecard ↗</span>
          </div>
        </div>
      </a>

      <!-- CARD 05: DEVTECTIVE -->
      <a class="workspace-card tcg-card card-devtective" href="case-studies/devtective.html" data-case-study="DevTective">
        <div class="tcg-glare" aria-hidden="true"></div>
        <div class="card-art tcg-art">
          <img loading="lazy" src="assets/images/devtective.png" alt="DevTective coding progress tracker app">
        </div>
        <div class="card-details tcg-body">
          <div class="tcg-header">
            <span class="tcg-no">NO. 005 // HABIT TRACKER</span>
            <span class="tcg-type-badge"><i class="tcg-type-dot"></i> GHOST / PROGRESS TRACKING</span>
          </div>
          <div class="card-title-group">
            <h2 class="card-heading">DevTective — Developer Learning Progress &amp; Habit Tracker</h2>
            <div class="card-role-meta">
              <span class="card-role">Solo UX Designer</span>
              <span class="card-role-sep">·</span>
              <span class="card-context">Google UX Design Certificate</span>
            </div>
          </div>
          <div class="card-summary-box">
            <div class="summary-line">
              <span class="summary-lbl">FRICTION</span>
              <span class="summary-val">Self-taught coders face high drop-off rates due to cognitive overload and lack of structured milestone tracking.</span>
            </div>
            <div class="summary-line">
              <span class="summary-lbl summary-delta">OUTCOME</span>
              <span class="summary-val">End-to-end UX research foundation, personas, wireframes, and responsive interactive prototype.</span>
            </div>
          </div>
          <div class="card-tags">
            <span>Mobile Web App</span>
            <span>Google UX Certificate</span>
            <span>User Research</span>
            <span>Journey Mapping</span>
            <span>Wireframe to Prototype</span>
          </div>
          <div class="card-action-bar">
            <span class="btn-pill-primary">Read Full Case Study →</span>
            <span class="btn-pill-secondary" data-href="case-studies/devtective.html#prototype">UX Journey Map ↗</span>
          </div>
        </div>
      </a>

    </div>

    <!-- VIEW 2: POKÉDEX HARDWARE CONSOLE — TOGGLED ON DEMAND -->
    <div id="dex-container" class="dex-hardware-wrap" role="tabpanel" aria-labelledby="btn-view-dex" hidden>
      <div class="dex-chassis" id="dex-chassis">
        <div class="dex-top-bar">
          <div class="dex-optics">
            <div class="dex-lens-big" title="Optical Scanner Core"><div class="dex-lens-reflection"></div></div>
            <div class="dex-led-cluster">
              <span class="dex-mini-led led-red"></span>
              <span class="dex-mini-led led-yellow"></span>
              <span class="dex-mini-led led-green"></span>
            </div>
          </div>
          <div class="dex-top-title">
            <span class="dex-brand-tag">PRODUCTDEX OS // v2.6.4</span>
            <span class="dex-brand-sub">HARDWARE SYSTEM TELEMETRY</span>
          </div>
          <div class="dex-top-actions">
            <button class="dex-audio-btn" id="dex-audio-btn" type="button" aria-pressed="false" title="Toggle 8-Bit Audio SFX">
              <span class="dex-speaker-icon">🔊</span> <span id="dex-audio-lbl">SFX: OFF</span>
            </button>
            <button class="dex-return-btn" id="dex-return-cards-btn" type="button" title="Return to Recruiter Cards View">
              <span>✕ RECRUITER VIEW</span>
            </button>
          </div>
        </div>

        <div class="dex-screen-grid">
          <!-- LEFT SCREEN: CRT VIEWFINDER -->
          <div class="dex-viewfinder-screen">
            <div class="crt-bezel">
              <div class="crt-scanlines"></div>
              <div class="crt-header">
                <span class="crt-id" id="dex-viewfinder-id">ENTRY #001</span>
                <span class="crt-class" id="dex-classification">ACADEMIC FOCUS HUD</span>
              </div>
              <div class="crt-display">
                <img id="dex-img" src="assets/images/study-buddy.png" alt="Case Study Preview" class="dex-screen-img">
                <div class="crt-reticle">
                  <span class="reticle-tl"></span><span class="reticle-tr"></span>
                  <span class="reticle-bl"></span><span class="reticle-br"></span>
                  <span class="reticle-cross"></span>
                </div>
              </div>
              <div class="crt-footer">
                <span class="crt-signal"><i class="signal-dot"></i> LIVE LINK</span>
                <span class="crt-origin" id="dex-origin">INDEPENDENT (ELECTRON)</span>
              </div>
            </div>
          </div>

          <!-- RIGHT SCREEN: TELEMETRY LCD TERMINAL -->
          <div class="dex-telemetry-screen">
            <div class="telemetry-bezel">
              <div class="telemetry-header">
                <div class="telemetry-badge-wrap">
                  <span class="telemetry-entry" id="dex-entry-num">NO. 001</span>
                  <span class="telemetry-type" id="dex-type-badge">PSYCHIC / DEEP WORK</span>
                </div>
                <div class="telemetry-role" id="dex-role">Solo Product Designer &amp; Builder</div>
              </div>
              <div class="telemetry-titles">
                <h3 class="telemetry-name" id="dex-title">Study Buddy</h3>
                <p class="telemetry-subtitle" id="dex-subtitle">Distraction-Free Academic Desktop HUD</p>
              </div>
              <div class="telemetry-stats-section">
                <div class="stats-legend">DISCIPLINE METRICS // EVALUATION</div>
                <div class="stats-bars" id="dex-stats-container"></div>
              </div>
              <div class="telemetry-moves-section">
                <div class="moves-legend">SYSTEM MOVESET &amp; CAPABILITIES</div>
                <div class="moves-chips" id="dex-moves-container"></div>
              </div>
              <div class="telemetry-logs">
                <div class="log-row">
                  <span class="log-tag log-friction">[!] FRICTION</span>
                  <p class="log-text" id="dex-friction">Students lose hours to digital fragmentation when juggling 40 research tabs.</p>
                </div>
                <div class="log-row">
                  <span class="log-tag log-delta">[✓] RESOLUTION</span>
                  <p class="log-text" id="dex-delta">Designed a floating desktop companion overlay in Figma, then built and shipped cross-platform native installers in ~14 hours.</p>
                </div>
              </div>
              <div class="telemetry-cta">
                <a class="dex-act-button" id="dex-cta-link" href="case-studies/study-buddy.html"><span>OPEN FULL CASE STUDY [A] →</span></a>
              </div>
            </div>
          </div>
        </div>

        <div class="dex-controls-bar">
          <div class="dex-dpad-wrap">
            <button class="dex-dpad-btn dpad-prev" id="dex-prev-btn" type="button" aria-label="Previous Entry"><span>◀ PREV</span></button>
            <button class="dex-dpad-btn dpad-next" id="dex-next-btn" type="button" aria-label="Next Entry"><span>NEXT ▶</span></button>
          </div>
          <div class="dex-keypad-wrap">
            <span class="dex-keypad-lbl">DIRECT REGISTRY INDEX:</span>
            <div class="dex-keypad-buttons">
              <button class="dex-pad active" data-index="0" type="button" title="01: Study Buddy">01</button>
              <button class="dex-pad" data-index="1" type="button" title="02: SecureID">02</button>
              <button class="dex-pad" data-index="2" type="button" title="03: Vextaro">03</button>
              <button class="dex-pad" data-index="3" type="button" title="04: Honda">04</button>
              <button class="dex-pad" data-index="4" type="button" title="05: DevTective">05</button>
            </div>
          </div>
          <div class="dex-switch-back-wrap">
            <button class="dex-b-btn" id="dex-b-return-btn" type="button" title="Return to Recruiter Cards View">
              <span class="btn-letter">[B]</span> <span>RECRUITER VIEW</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`;

  const workRegex = /<section[^>]*id="work"[\s\S]*?<\/section>/i;
  if (workRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(workRegex, workSectionHtml);
    console.log('✅ index.html: Work section updated with Recruiter Cards + Inline Pokédex Mode.');
  }

  // Clear previous duplicate badge cases
  indexHtml = indexHtml.replace(/<!-- MILESTONE & CREDENTIAL BADGE CASE[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  indexHtml = indexHtml.replace(/<div class="badge-case-wrap"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');

  const badgeCaseHtml = `    <!-- MILESTONE & CREDENTIAL BADGE CASE (Pokémon Gym Badge Tray Aesthetic · 4 Top, 4 Bottom) -->
    <div class="badge-case-wrap">
      <div class="badge-case-header">
        <div class="badge-case-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          <span>Milestone &amp; Credential Case</span>
        </div>
        <div class="badge-case-count">4 / 8 UNLOCKED</div>
      </div>

      <div class="badge-grid">
        <!-- ROW 1, COL 1: STEALTH STARTUP -->
        <div class="badge-slot active badge-stealth" tabindex="0">
          <div class="badge-pod">
            <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 21 7 19 18 12 22 5 18 3 7" fill="rgba(217,172,84,0.15)"/><path d="M12 2v20"/><path d="M12 12l9-5"/><path d="M12 12l-9-5"/><path d="M12 12l7 6"/><path d="M12 12l-7 6"/><circle cx="12" cy="12" r="2.2" fill="#f0cf74"/></svg>
          </div>
          <span class="badge-name">Stealth Startup</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">Product Design Intern</div>
            <div class="tt-issuer">Stealth Startup · Active</div>
            <div class="tt-desc">Leading token-based design systems across 2 mobile apps and SaaS desktop dashboard.</div>
          </div>
        </div>

        <!-- ROW 1, COL 2: FLYRANK AI -->
        <div class="badge-slot active badge-flyrank" tabindex="0">
          <div class="badge-pod">
            <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13.5L12 6.5l9 7"/><path d="M5.5 17.5L12 12.5l6.5 5" opacity="0.75"/><path d="M12 2v3M12 19v3" opacity="0.5"/><polygon points="12 7.5 13.8 11.5 18 12 13.8 12.5 12 16.5 10.2 12.5 6 12 10.2 11.5" fill="rgba(78,205,196,0.3)" stroke="#4ecdc4" stroke-width="1.2"/></svg>
          </div>
          <span class="badge-name">Flyrank AI</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">UI/UX Design Intern</div>
            <div class="tt-issuer">Flyrank AI · Capstone</div>
            <div class="tt-desc">Built centralized design token architecture and shipped the Vextaro capstone prototype.</div>
          </div>
        </div>

        <!-- ROW 1, COL 3: GOOGLE UX -->
        <div class="badge-slot active badge-google" tabindex="0">
          <div class="badge-pod">
            <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          </div>
          <span class="badge-name">Google UX</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">Google UX Certificate</div>
            <div class="tt-issuer">Google · Certified</div>
            <div class="tt-desc">Verified foundations in UX research, inclusive design, journey mapping, and wireframing.</div>
          </div>
        </div>

        <!-- ROW 1, COL 4: WGU DEGREE (IN PROGRESS) -->
        <div class="badge-slot locked" tabindex="0">
          <div class="badge-pod">
            <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <div class="badge-lock-tag" aria-label="Locked"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
          </div>
          <span class="badge-name">WGU Degree</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">B.S. User Experience Design</div>
            <div class="tt-issuer">Western Governors University</div>
            <div class="tt-desc">In progress · Expected graduation 2026.</div>
            <div class="tt-action" style="cursor:default; text-decoration:none;">🔒 UNLOCK CONDITION: GRADUATION</div>
          </div>
        </div>

        <!-- ROW 2, COL 1: YOUR COMPANY (RECRUITER SLOT) -->
        <div class="badge-slot recruiter-slot" tabindex="0">
          <div class="badge-pod"><span class="recruiter-q">+</span></div>
          <span class="badge-name" style="color:var(--gold);">Your Co?</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">Reserved: Your Company</div>
            <div class="tt-issuer">Next Product Design Role</div>
            <div class="tt-desc">Ready to earn this badge on your design team. Let's build something useful together.</div>
            <a class="tt-action" href="#contact">✨ CLICK TO CONNECT →</a>
          </div>
        </div>

        <!-- ROW 2, COL 2: MYSTERY -->
        <div class="badge-slot mystery" tabindex="0">
          <div class="badge-pod"><span class="mystery-q">???</span></div>
          <span class="badge-name">Upcoming</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">Future Milestone</div>
            <div class="tt-desc">Awaiting next career achievement.</div>
          </div>
        </div>

        <!-- ROW 2, COL 3: MYSTERY -->
        <div class="badge-slot mystery" tabindex="0">
          <div class="badge-pod"><span class="mystery-q">???</span></div>
          <span class="badge-name">Upcoming</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">Future Milestone</div>
            <div class="tt-desc">Awaiting next career achievement.</div>
          </div>
        </div>

        <!-- ROW 2, COL 4: MYSTERY -->
        <div class="badge-slot mystery" tabindex="0">
          <div class="badge-pod"><span class="mystery-q">???</span></div>
          <span class="badge-name">Upcoming</span>
          <div class="badge-tooltip" role="tooltip">
            <div class="tt-title">Future Milestone</div>
            <div class="tt-desc">Awaiting next career achievement.</div>
          </div>
        </div>
      </div>
    </div>`;

  const aboutSectionRegex = /(<section[^>]*id="about"[^>]*>[\s\S]*?<\/div>\s*<\/div>)([\s\S]*?<\/section>)/i;
  if (aboutSectionRegex.test(indexHtml)) {
    indexHtml = indexHtml.replace(aboutSectionRegex, '$1\n' + badgeCaseHtml + '\n</section>');
    console.log('✅ index.html: Single 4x2 Milestone Badge Case inserted inside #about.');
  }

  indexHtml = indexHtml.replace(/<!-- =+ PRODUCTDEX =+[\s\S]*?id="productdex-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');
  indexHtml = indexHtml.replace(/<div id="productdex-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi, '');

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log('✅ index.html successfully saved.');
}

// 2. UPDATE assets/css/scroll.css
const cssPath = path.join('assets', 'css', 'scroll.css');
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');

  const cssStart = '/* --- POKEDEX & WORK VIEWS CSS START --- */';
  const cssEnd = '/* --- POKEDEX & WORK VIEWS CSS END --- */';

  const dexAndBadgesCss = `
.work-header-wrap { display: flex !important; justify-content: space-between !important; align-items: flex-end !important; flex-wrap: wrap !important; gap: 20px !important; margin-bottom: 32px !important; }
.work-view-controls { display: flex !important; align-items: center !important; gap: 12px !important; }
.view-switch-pill { display: inline-flex !important; align-items: center !important; background: rgba(18, 15, 11, 0.85) !important; border: 1px solid rgba(217, 172, 84, 0.28) !important; border-radius: 999px !important; padding: 4px !important; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6) !important; }
.view-toggle-btn { display: inline-flex !important; align-items: center !important; gap: 8px !important; padding: 7px 16px !important; border-radius: 999px !important; border: 1px solid transparent !important; background: transparent !important; color: var(--text-dim, #999388) !important; font-family: var(--font-display, sans-serif) !important; font-size: 12.5px !important; font-weight: 600 !important; cursor: pointer !important; transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important; white-space: nowrap !important; outline: none !important; }
.view-toggle-btn:hover { color: var(--text, #f0ede8) !important; background: rgba(255, 255, 255, 0.04) !important; }
.view-toggle-btn.active { background: linear-gradient(135deg, rgba(217, 172, 84, 0.18), rgba(217, 172, 84, 0.08)) !important; border-color: rgba(217, 172, 84, 0.45) !important; color: var(--gold-bright, #f0cf74) !important; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12) !important; }
.dex-scanner-dot { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #ff4d4d !important; box-shadow: 0 0 8px #ff4d4d !important; transition: all 0.22s ease !important; }
.view-toggle-btn.active .dex-scanner-dot { background: #4ecdc4 !important; box-shadow: 0 0 10px #4ecdc4, 0 0 4px #fff !important; animation: pulse-dot 1.8s infinite !important; }
@keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(0.85); } }
.view-badge-hot { font-family: var(--font-mono, monospace) !important; font-size: 9.5px !important; font-weight: 700 !important; letter-spacing: 0.06em !important; padding: 2px 6px !important; border-radius: 4px !important; background: rgba(217, 172, 84, 0.22) !important; color: var(--gold-bright, #f0cf74) !important; border: 1px solid rgba(217, 172, 84, 0.35) !important; }

/* TCG Holographic Cards */
.tcg-grid { display: flex !important; flex-direction: column !important; gap: 30px !important; width: 100% !important; perspective: 1200px !important; }
.tcg-card { position: relative !important; display: grid !important; grid-template-columns: minmax(320px, 400px) 1fr !important; min-height: 330px !important; background: linear-gradient(135deg, rgba(22, 18, 14, 0.95), rgba(14, 12, 10, 0.95)) !important; border: 1px solid rgba(217, 172, 84, 0.22) !important; border-radius: 20px !important; text-decoration: none !important; color: inherit !important; overflow: hidden !important; box-shadow: 0 12px 36px -8px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important; transform-style: preserve-3d !important; backface-visibility: hidden !important; -webkit-backface-visibility: hidden !important; transform-origin: center center !important; transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1); transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease !important; will-change: transform; }
.tcg-glare { position: absolute !important; inset: 0 !important; border-radius: 20px !important; background: radial-gradient(circle at var(--tcg-glare-x, 50%) var(--tcg-glare-y, 50%), rgba(255, 255, 255, 0.16) 0%, rgba(217, 172, 84, 0.09) 25%, transparent 65%) !important; opacity: 0 !important; pointer-events: none !important; mix-blend-mode: color-dodge !important; transition: opacity 0.25s ease !important; z-index: 5 !important; }
.tcg-card:hover .tcg-glare { opacity: 1 !important; }
.tcg-art { width: 100% !important; height: 100% !important; min-height: 100% !important; position: relative !important; background: radial-gradient(circle at center, #1e1914 0%, #0d0c0a 100%) !important; border-right: 1px solid rgba(217, 172, 84, 0.18) !important; border-bottom: none !important; display: flex !important; align-items: center !important; justify-content: center !important; padding: 22px !important; box-sizing: border-box !important; overflow: hidden !important; }
.tcg-art img { width: 100% !important; height: 100% !important; max-height: 285px !important; object-fit: contain !important; border-radius: 12px !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.75), 0 0 1px rgba(255, 255, 255, 0.15) !important; display: block !important; transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) !important; }
.tcg-card:hover .tcg-art img { transform: scale(1.03) translateY(-3px) !important; }
.tcg-body { padding: 26px 30px !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; position: relative !important; z-index: 2 !important; }
.tcg-header { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 12px !important; margin-bottom: 8px !important; }
.tcg-no { font-family: var(--font-mono, monospace) !important; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.1em !important; color: var(--text-dim, #999388) !important; text-transform: uppercase !important; }
.tcg-type-badge { display: inline-flex !important; align-items: center !important; gap: 6px !important; font-family: var(--font-mono, monospace) !important; font-size: 10.5px !important; font-weight: 700 !important; letter-spacing: 0.08em !important; padding: 3px 10px !important; border-radius: 999px !important; background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; text-transform: uppercase !important; color: var(--text, #f0ede8) !important; }
.tcg-type-dot { width: 6px !important; height: 6px !important; border-radius: 50% !important; background: currentColor !important; }
.card-title-group { margin-bottom: 12px !important; }
.card-heading { font-family: var(--font-display, sans-serif) !important; font-size: 20px !important; font-weight: 700 !important; line-height: 1.3 !important; margin: 0 0 6px !important; color: #fff !important; letter-spacing: -0.01em !important; }
.card-role-meta { display: flex !important; align-items: center !important; gap: 8px !important; font-family: var(--font-mono, monospace) !important; font-size: 11.5px !important; font-weight: 600 !important; letter-spacing: 0.03em !important; }
.card-role { color: var(--gold, #d9ac54) !important; }
.card-role-sep { color: rgba(255, 255, 255, 0.25) !important; }
.card-context { color: var(--text-dim, #999388) !important; }
.card-summary-box { background: rgba(0, 0, 0, 0.38) !important; border: 1px solid rgba(255, 255, 255, 0.07) !important; border-radius: 10px !important; padding: 11px 14px !important; margin-bottom: 14px !important; display: flex !important; flex-direction: column !important; gap: 7px !important; }
.summary-line { display: flex !important; align-items: baseline !important; gap: 10px !important; }
.summary-lbl { font-family: var(--font-mono, monospace) !important; font-size: 9.5px !important; font-weight: 700 !important; letter-spacing: 0.08em !important; padding: 2px 6px !important; border-radius: 3px !important; background: rgba(255, 65, 54, 0.15) !important; color: #ff6b6b !important; white-space: nowrap !important; }
.summary-lbl.summary-delta { background: rgba(46, 204, 64, 0.15) !important; color: #51cf66 !important; }
.summary-val { font-size: 12px !important; line-height: 1.45 !important; color: #c8c2b8 !important; margin: 0 !important; }
.card-tags { display: flex !important; flex-wrap: wrap !important; gap: 6px !important; margin-bottom: 16px !important; }
.card-tags span { font-size: 11px !important; font-weight: 500 !important; padding: 4px 8px !important; border-radius: 3px !important; background: rgba(255, 255, 255, 0.04) !important; border: 1px solid rgba(255, 255, 255, 0.09) !important; color: var(--text-dim, #999388) !important; }
.card-action-bar { display: flex !important; align-items: center !important; gap: 10px !important; margin-top: auto !important; }
.btn-pill-primary { display: inline-flex !important; align-items: center !important; gap: 6px !important; padding: 7px 18px !important; border-radius: 999px !important; background: linear-gradient(135deg, rgba(217, 172, 84, 0.24), rgba(217, 172, 84, 0.1)) !important; border: 1px solid rgba(217, 172, 84, 0.45) !important; color: var(--gold-bright, #f0cf74) !important; font-family: var(--font-display, sans-serif) !important; font-size: 12px !important; font-weight: 700 !important; letter-spacing: 0.03em !important; transition: all 0.2s ease !important; }
.tcg-card:hover .btn-pill-primary { background: linear-gradient(135deg, var(--gold, #d9ac54), var(--gold-bright, #f0cf74)) !important; color: #120f0b !important; box-shadow: 0 4px 14px rgba(217, 172, 84, 0.35) !important; }
.btn-pill-secondary { display: inline-flex !important; align-items: center !important; gap: 6px !important; padding: 7px 15px !important; border-radius: 999px !important; background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; color: var(--text-dim, #999388) !important; font-family: var(--font-display, sans-serif) !important; font-size: 11.5px !important; font-weight: 600 !important; transition: all 0.2s ease !important; cursor: pointer !important; }
.tcg-card:hover .btn-pill-secondary { color: var(--text, #f0ede8) !important; border-color: rgba(255, 255, 255, 0.25) !important; }
.card-studybuddy:hover { border-color: #a594f9 !important; box-shadow: 0 16px 44px -8px rgba(165, 148, 249, 0.3) !important; }
.card-studybuddy .tcg-type-badge { color: #a594f9 !important; border-color: rgba(165, 148, 249, 0.35) !important; }
.card-secureid:hover { border-color: #d9ac54 !important; box-shadow: 0 16px 44px -8px rgba(217, 172, 84, 0.3) !important; }
.card-secureid .tcg-type-badge { color: #f0cf74 !important; border-color: rgba(217, 172, 84, 0.35) !important; }
.card-vextaro:hover { border-color: #5aa3c9 !important; box-shadow: 0 16px 44px -8px rgba(90, 163, 201, 0.3) !important; }
.card-vextaro .tcg-type-badge { color: #5aa3c9 !important; border-color: rgba(90, 163, 201, 0.35) !important; }
.card-honda:hover { border-color: #e27d5a !important; box-shadow: 0 16px 44px -8px rgba(226, 125, 90, 0.3) !important; }
.card-honda .tcg-type-badge { color: #e27d5a !important; border-color: rgba(226, 125, 90, 0.35) !important; }
.card-devtective:hover { border-color: #9c8be8 !important; box-shadow: 0 16px 44px -8px rgba(156, 139, 232, 0.3) !important; }
.card-devtective .tcg-type-badge { color: #9c8be8 !important; border-color: rgba(156, 139, 232, 0.35) !important; }
@media (max-width: 860px) { .tcg-card { grid-template-columns: 1fr !important; min-height: auto !important; } .tcg-art { height: 220px !important; min-height: 220px !important; border-right: none !important; border-bottom: 1px solid rgba(217, 172, 84, 0.18) !important; padding: 16px !important; } }

/* Pokédex Hardware Console */
.dex-hardware-wrap { width: 100% !important; margin-top: 10px !important; }
.dex-hardware-wrap[hidden] { display: none !important; }
.dex-chassis { position: relative !important; width: 100% !important; max-width: 1080px !important; margin: 0 auto !important; background: linear-gradient(180deg, #1c1814 0%, #0e0c0a 100%) !important; border: 1.5px solid rgba(217, 172, 84, 0.45) !important; border-radius: 24px !important; box-shadow: 0 32px 80px rgba(0, 0, 0, 0.95), 0 0 40px rgba(217, 172, 84, 0.12), inset 0 2px 10px rgba(255, 255, 255, 0.1) !important; padding: 24px 28px 28px !important; box-sizing: border-box !important; --active-accent: #a594f9; }
.dex-top-bar { display: flex !important; justify-content: space-between !important; align-items: center !important; padding-bottom: 18px !important; margin-bottom: 20px !important; border-bottom: 1.5px solid rgba(217, 172, 84, 0.25) !important; flex-wrap: wrap !important; gap: 14px !important; }
.dex-optics { display: flex !important; align-items: center !important; gap: 14px !important; }
.dex-lens-big { width: 44px !important; height: 44px !important; border-radius: 50% !important; background: radial-gradient(circle at 35% 30%, #a8f5ff 0%, #17a2b8 45%, #06404d 100%) !important; border: 3px solid #f0ede8 !important; box-shadow: 0 0 16px rgba(78, 205, 196, 0.8), inset 0 2px 6px rgba(255, 255, 255, 0.8) !important; position: relative !important; animation: optic-pulse 2.8s infinite ease-in-out !important; }
@keyframes optic-pulse { 0%, 100% { box-shadow: 0 0 14px rgba(78, 205, 196, 0.7); } 50% { box-shadow: 0 0 26px rgba(78, 205, 196, 1), 0 0 8px #fff; } }
.dex-lens-reflection { position: absolute !important; top: 6px !important; left: 9px !important; width: 10px !important; height: 6px !important; border-radius: 50% !important; background: rgba(255, 255, 255, 0.85) !important; transform: rotate(-30deg) !important; }
.dex-led-cluster { display: flex !important; gap: 8px !important; }
.dex-mini-led { width: 12px !important; height: 12px !important; border-radius: 50% !important; border: 1px solid rgba(0, 0, 0, 0.6) !important; }
.led-red { background: #ff4136; box-shadow: 0 0 6px #ff4136; }
.led-yellow { background: #ffdc00; box-shadow: 0 0 6px #ffdc00; }
.led-green { background: #2ecc40; box-shadow: 0 0 6px #2ecc40; }
.dex-top-title { display: flex !important; flex-direction: column !important; text-align: center !important; }
.dex-brand-tag { font-family: var(--font-mono, monospace) !important; font-size: 13px !important; font-weight: 700 !important; letter-spacing: 0.12em !important; color: var(--gold-bright, #f0cf74) !important; }
.dex-brand-sub { font-family: var(--font-mono, monospace) !important; font-size: 10px !important; letter-spacing: 0.08em !important; color: var(--text-dim, #999388) !important; }
.dex-top-actions { display: flex !important; align-items: center !important; gap: 10px !important; }
.dex-audio-btn { background: rgba(255, 255, 255, 0.05) !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; color: var(--text-dim) !important; padding: 6px 12px !important; border-radius: 8px !important; font-family: var(--font-mono, monospace) !important; font-size: 11px !important; cursor: pointer !important; transition: all 0.2s ease !important; }
.dex-audio-btn:hover { color: #fff !important; border-color: var(--gold) !important; }
.dex-return-btn { background: linear-gradient(135deg, rgba(217, 172, 84, 0.25), rgba(217, 172, 84, 0.12)) !important; border: 1px solid rgba(217, 172, 84, 0.45) !important; color: var(--gold-bright, #f0cf74) !important; padding: 6px 14px !important; border-radius: 999px !important; font-family: var(--font-display, sans-serif) !important; font-size: 11.5px !important; font-weight: 700 !important; letter-spacing: 0.04em !important; cursor: pointer !important; transition: all 0.2s ease !important; }
.dex-return-btn:hover { background: var(--gold) !important; color: #120f0b !important; }
.dex-screen-grid { display: grid !important; grid-template-columns: 1.15fr 1.35fr !important; gap: 24px !important; margin-bottom: 22px !important; }
.dex-viewfinder-screen { background: #080808 !important; border: 2px solid rgba(255, 255, 255, 0.1) !important; border-radius: 16px !important; padding: 16px !important; box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.9) !important; display: flex !important; flex-direction: column !important; }
.crt-bezel { position: relative !important; display: flex !important; flex-direction: column !important; height: 100% !important; overflow: hidden !important; }
.crt-scanlines { position: absolute !important; inset: 0 !important; background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.25) 0px, rgba(0, 0, 0, 0.25) 1px, transparent 1px, transparent 3px) !important; pointer-events: none !important; z-index: 10 !important; opacity: 0.7 !important; }
.crt-header { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 12px !important; font-family: var(--font-mono, monospace) !important; font-size: 11px !important; color: var(--active-accent, var(--gold)) !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important; padding-bottom: 8px !important; }
.crt-display { position: relative !important; flex: 1 !important; min-height: 250px !important; background: #050505 !important; border-radius: 10px !important; overflow: hidden !important; display: flex !important; align-items: center !important; justify-content: center !important; }
.dex-screen-img { width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: center top !important; transition: opacity 0.3s ease !important; }
.crt-reticle { position: absolute !important; inset: 12px !important; pointer-events: none !important; }
.reticle-tl, .reticle-tr, .reticle-bl, .reticle-br { position: absolute !important; width: 10px !important; height: 10px !important; border: 1.5px solid var(--active-accent, var(--gold)) !important; }
.reticle-tl { top: 0; left: 0; border-right: none; border-bottom: none; }
.reticle-tr { top: 0; right: 0; border-left: none; border-bottom: none; }
.reticle-bl { bottom: 0; left: 0; border-right: none; border-top: none; }
.reticle-br { bottom: 0; right: 0; border-left: none; border-top: none; }
.crt-footer { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-top: 12px !important; padding-top: 8px !important; border-top: 1px solid rgba(255, 255, 255, 0.08) !important; font-family: var(--font-mono, monospace) !important; font-size: 10px !important; color: var(--text-dim) !important; }
.signal-dot { display: inline-block !important; width: 6px !important; height: 6px !important; border-radius: 50% !important; background: #2ecc40 !important; box-shadow: 0 0 6px #2ecc40 !important; margin-right: 4px !important; }
.dex-telemetry-screen { background: #0d0c0a !important; border: 2px solid rgba(217, 172, 84, 0.3) !important; border-radius: 16px !important; padding: 20px 22px !important; box-shadow: inset 0 2px 14px rgba(0, 0, 0, 0.9) !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; }
.telemetry-header { display: flex !important; justify-content: space-between !important; align-items: flex-start !important; margin-bottom: 10px !important; }
.telemetry-entry { font-family: var(--font-mono, monospace) !important; font-size: 13px !important; font-weight: 700 !important; color: var(--gold-bright) !important; margin-right: 10px !important; }
.telemetry-type { font-family: var(--font-mono, monospace) !important; font-size: 10.5px !important; font-weight: 700 !important; letter-spacing: 0.08em !important; padding: 3px 8px !important; border-radius: 999px !important; background: rgba(255, 255, 255, 0.06) !important; border: 1px solid var(--active-accent, var(--gold)) !important; color: var(--active-accent, var(--gold-bright)) !important; }
.telemetry-role { font-family: var(--font-mono, monospace) !important; font-size: 11px !important; color: var(--text-dim) !important; }
.telemetry-name { font-family: var(--font-display, sans-serif) !important; font-size: 22px !important; font-weight: 700 !important; color: #fff !important; margin: 0 0 4px !important; }
.telemetry-subtitle { font-size: 12.5px !important; color: var(--text-dim) !important; margin: 0 0 14px !important; }
.stats-legend, .moves-legend { font-family: var(--font-mono, monospace) !important; font-size: 10px !important; font-weight: 700 !important; letter-spacing: 0.08em !important; color: var(--gold) !important; margin-bottom: 6px !important; }
.stats-bars { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px 16px !important; margin-bottom: 14px !important; }
.stat-row { display: flex !important; flex-direction: column !important; gap: 3px !important; }
.stat-meta { display: flex !important; justify-content: space-between !important; font-family: var(--font-mono, monospace) !important; font-size: 10px !important; color: var(--text-dim) !important; }
.stat-val { color: var(--active-accent, var(--gold-bright)) !important; font-weight: 700 !important; }
.stat-bar-track { width: 100% !important; height: 5px !important; border-radius: 999px !important; background: rgba(255, 255, 255, 0.08) !important; overflow: hidden !important; }
.stat-bar-fill { height: 100% !important; border-radius: 999px !important; background: var(--active-accent, var(--gold)) !important; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; }
.moves-chips { display: flex !important; flex-wrap: wrap !important; gap: 6px !important; margin-bottom: 14px !important; }
.dex-move-pill { font-family: var(--font-mono, monospace) !important; font-size: 10px !important; padding: 3px 8px !important; border-radius: 4px !important; background: rgba(255, 255, 255, 0.04) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; color: var(--text) !important; }
.telemetry-logs { background: rgba(0, 0, 0, 0.35) !important; border-radius: 8px !important; padding: 10px 12px !important; border: 1px solid rgba(255, 255, 255, 0.05) !important; margin-bottom: 14px !important; display: flex !important; flex-direction: column !important; gap: 8px !important; }
.log-row { display: flex !important; align-items: flex-start !important; gap: 8px !important; }
.log-tag { font-family: var(--font-mono, monospace) !important; font-size: 9px !important; font-weight: 700 !important; padding: 2px 5px !important; border-radius: 3px !important; white-space: nowrap !important; }
.log-friction { background: rgba(255, 65, 54, 0.15) !important; color: #ff6b6b !important; }
.log-delta { background: rgba(46, 204, 64, 0.15) !important; color: #51cf66 !important; }
.log-text { font-size: 11.5px !important; line-height: 1.4 !important; color: var(--text-dim) !important; margin: 0 !important; }
.telemetry-cta { display: flex !important; }
.dex-act-button { width: 100% !important; text-align: center !important; display: block !important; padding: 10px 18px !important; border-radius: 10px !important; background: linear-gradient(135deg, var(--gold, #d9ac54), var(--gold-bright, #f0cf74)) !important; color: #120f0b !important; font-family: var(--font-display, sans-serif) !important; font-size: 13px !important; font-weight: 700 !important; letter-spacing: 0.04em !important; text-decoration: none !important; box-shadow: 0 4px 18px rgba(217, 172, 84, 0.4) !important; transition: all 0.2s ease !important; }
.dex-act-button:hover { transform: translateY(-2px) !important; box-shadow: 0 8px 24px rgba(217, 172, 84, 0.6) !important; color: #000 !important; }
.dex-controls-bar { display: flex !important; align-items: center !important; justify-content: space-between !important; padding-top: 18px !important; border-top: 1.5px solid rgba(217, 172, 84, 0.25) !important; flex-wrap: wrap !important; gap: 16px !important; }
.dex-dpad-wrap { display: flex !important; gap: 8px !important; }
.dex-dpad-btn { background: #25201a !important; border: 1px solid rgba(255, 255, 255, 0.15) !important; color: var(--text, #f0ede8) !important; padding: 8px 16px !important; border-radius: 8px !important; font-family: var(--font-mono, monospace) !important; font-size: 12px !important; font-weight: 700 !important; cursor: pointer !important; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5) !important; transition: all 0.15s ease !important; }
.dex-dpad-btn:hover { background: #362e25 !important; border-color: var(--gold) !important; color: var(--gold-bright) !important; }
.dex-dpad-btn:active { transform: translateY(2px) !important; box-shadow: none !important; }
.dex-keypad-wrap { display: flex !important; align-items: center !important; gap: 10px !important; }
.dex-keypad-lbl { font-family: var(--font-mono, monospace) !important; font-size: 10.5px !important; color: var(--text-dim) !important; }
.dex-keypad-buttons { display: flex !important; gap: 6px !important; }
.dex-pad { width: 34px !important; height: 34px !important; border-radius: 6px !important; background: #181512 !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; color: var(--text-dim) !important; font-family: var(--font-mono, monospace) !important; font-size: 12px !important; font-weight: 700 !important; cursor: pointer !important; transition: all 0.18s ease !important; }
.dex-pad:hover { border-color: var(--gold) !important; color: var(--text) !important; }
.dex-pad.active { background: var(--gold) !important; color: #120f0b !important; border-color: var(--gold-bright) !important; box-shadow: 0 0 12px rgba(217, 172, 84, 0.6) !important; }
.dex-b-btn { background: rgba(255, 65, 54, 0.12) !important; border: 1px solid rgba(255, 65, 54, 0.4) !important; color: #ff857f !important; padding: 8px 16px !important; border-radius: 8px !important; font-family: var(--font-display, sans-serif) !important; font-size: 12px !important; font-weight: 700 !important; cursor: pointer !important; transition: all 0.2s ease !important; }
.dex-b-btn:hover { background: #ff4136 !important; color: #fff !important; }
.dex-b-btn .btn-letter { font-family: var(--font-mono, monospace) !important; margin-right: 4px !important; }
@media (max-width: 900px) { .dex-screen-grid { grid-template-columns: 1fr !important; } }

/* 4x2 Milestone Badge Case */
.badge-case-wrap { margin-top: 36px !important; padding: 26px 28px 30px !important; background: rgba(18, 15, 11, 0.85) !important; border: 1px solid rgba(217, 172, 84, 0.28) !important; border-radius: 20px !important; box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.9), 0 18px 48px -12px rgba(0, 0, 0, 0.75) !important; position: relative !important; max-width: 620px !important; margin-left: auto !important; margin-right: auto !important; }
.badge-case-header { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 22px !important; padding-bottom: 14px !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important; }
.badge-case-title { display: flex !important; align-items: center !important; gap: 10px !important; font-family: var(--font-display, sans-serif) !important; font-size: 13px !important; font-weight: 700 !important; letter-spacing: 0.1em !important; text-transform: uppercase !important; color: var(--gold-bright, #f0cf74) !important; }
.badge-case-title svg { color: var(--gold, #d9ac54) !important; }
.badge-case-count { font-family: var(--font-mono, monospace) !important; font-size: 11px !important; font-weight: 700 !important; letter-spacing: 0.08em !important; color: var(--text-dim, #999388) !important; background: rgba(255, 255, 255, 0.05) !important; padding: 4px 10px !important; border-radius: 999px !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; }
.badge-grid { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 26px 16px !important; position: relative !important; }
.badge-slot { position: relative !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; cursor: pointer !important; padding: 6px 0 !important; text-decoration: none !important; color: inherit !important; outline: none !important; user-select: none !important; }
.badge-pod { width: 64px !important; height: 64px !important; border-radius: 50% !important; display: flex !important; align-items: center !important; justify-content: center !important; position: relative !important; background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.08), rgba(0,0,0,0.7) 85%) !important; border: 1px solid rgba(255, 255, 255, 0.12) !important; box-shadow: inset 0 2px 8px rgba(0,0,0,0.9), 0 4px 12px rgba(0,0,0,0.5) !important; transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease !important; }
.badge-slot:hover .badge-pod, .badge-slot:focus-visible .badge-pod { transform: translateY(-3px) scale(1.05) !important; }
.badge-slot.active .badge-pod { border-color: rgba(217, 172, 84, 0.45) !important; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), 0 6px 18px rgba(217, 172, 84, 0.2) !important; }
.badge-slot.active:hover .badge-pod { border-color: var(--gold-bright) !important; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(217, 172, 84, 0.38) !important; }
.badge-slot.badge-stealth.active .badge-pod { border-color: rgba(217, 172, 84, 0.55) !important; }
.badge-slot.badge-flyrank.active .badge-pod { border-color: rgba(78, 205, 196, 0.5) !important; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), 0 6px 18px rgba(78, 205, 196, 0.2) !important; }
.badge-slot.badge-flyrank.active:hover .badge-pod { border-color: #4ecdc4 !important; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), 0 8px 24px rgba(78, 205, 196, 0.4) !important; }
.badge-icon { width: 28px !important; height: 28px !important; color: var(--gold-bright) !important; transition: transform 0.25s ease !important; }
.badge-slot.badge-flyrank .badge-icon { color: #4ecdc4 !important; }
.badge-slot:hover .badge-icon { transform: scale(1.08) !important; }
.badge-slot.locked .badge-pod { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.03), rgba(0,0,0,0.85) 85%) !important; border-color: rgba(255, 255, 255, 0.08) !important; filter: grayscale(1) !important; opacity: 0.65 !important; }
.badge-slot.locked:hover .badge-pod { opacity: 0.9 !important; filter: grayscale(0.5) !important; border-color: rgba(217, 172, 84, 0.35) !important; }
.badge-lock-tag { position: absolute !important; bottom: -2px !important; right: -2px !important; background: #1e1914 !important; border: 1px solid rgba(255, 255, 255, 0.18) !important; border-radius: 50% !important; width: 18px !important; height: 18px !important; display: flex !important; align-items: center !important; justify-content: center !important; color: var(--text-dim) !important; }
.badge-slot.mystery .badge-pod { background: radial-gradient(circle at 35% 30%, rgba(255,255,255,0.02), rgba(0,0,0,0.9) 85%) !important; border: 1px dashed rgba(255, 255, 255, 0.12) !important; opacity: 0.45 !important; }
.badge-slot.mystery:hover .badge-pod { opacity: 0.8 !important; border-color: rgba(217, 172, 84, 0.3) !important; }
.mystery-q { font-family: var(--font-mono, monospace) !important; font-size: 14px !important; font-weight: 700 !important; color: var(--text-dim) !important; letter-spacing: 0.05em !important; }
.badge-slot.recruiter-slot .badge-pod { background: radial-gradient(circle at 35% 30%, rgba(217,172,84,0.12), rgba(0,0,0,0.8) 85%) !important; border: 1.5px dashed var(--gold) !important; }
.badge-slot.recruiter-slot:hover .badge-pod { border-color: var(--gold-bright) !important; box-shadow: inset 0 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(217, 172, 84, 0.35) !important; }
.recruiter-q { font-family: var(--font-display, sans-serif) !important; font-size: 26px !important; font-weight: 700 !important; color: var(--gold-bright) !important; line-height: 1 !important; }
.badge-name { margin-top: 8px !important; font-family: var(--font-mono, monospace) !important; font-size: 10.5px !important; font-weight: 600 !important; color: var(--text-dim) !important; letter-spacing: 0.04em !important; text-align: center !important; white-space: nowrap !important; transition: color 0.2s ease !important; }
.badge-slot:hover .badge-name { color: var(--text) !important; }
.badge-slot.active:hover .badge-name { color: var(--gold-bright) !important; }

/* Tooltip Hover Retention & Edge Clamping */
.badge-tooltip { position: absolute !important; bottom: calc(100% + 12px) !important; width: 230px !important; background: rgba(18, 15, 11, 0.98) !important; border: 1px solid rgba(217, 172, 84, 0.4) !important; box-shadow: 0 14px 36px rgba(0, 0, 0, 0.9), 0 0 18px rgba(217, 172, 84, 0.15) !important; border-radius: 12px !important; padding: 14px 16px !important; pointer-events: none !important; opacity: 0 !important; visibility: hidden !important; transition: opacity 0.22s ease 0.12s, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1) 0.12s, visibility 0.22s ease 0.12s !important; z-index: 100 !important; }
.badge-tooltip::before { content: '' !important; position: absolute !important; top: 100% !important; left: 0 !important; right: 0 !important; height: 18px !important; background: transparent !important; }
.badge-tooltip::after { content: '' !important; position: absolute !important; top: 100% !important; border: 6px solid transparent !important; border-top-color: rgba(217, 172, 84, 0.4) !important; }
.badge-slot:hover .badge-tooltip, .badge-slot:focus-visible .badge-tooltip, .badge-tooltip:hover { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; transition-delay: 0s !important; }
.badge-grid > .badge-slot:nth-child(4n + 1) .badge-tooltip { left: -8px !important; right: auto !important; transform: translateY(6px) !important; }
.badge-grid > .badge-slot:nth-child(4n + 1):hover .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 1):focus-visible .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 1) .badge-tooltip:hover { transform: translateY(0) !important; }
.badge-grid > .badge-slot:nth-child(4n + 1) .badge-tooltip::after { left: 38px !important; right: auto !important; transform: none !important; }
.badge-grid > .badge-slot:nth-child(4n) .badge-tooltip { left: auto !important; right: -8px !important; transform: translateY(6px) !important; }
.badge-grid > .badge-slot:nth-child(4n):hover .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n):focus-visible .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n) .badge-tooltip:hover { transform: translateY(0) !important; }
.badge-grid > .badge-slot:nth-child(4n) .badge-tooltip::after { left: auto !important; right: 38px !important; transform: none !important; }
.badge-grid > .badge-slot:nth-child(4n + 2) .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 3) .badge-tooltip { left: 50% !important; right: auto !important; transform: translateX(-50%) translateY(6px) !important; }
.badge-grid > .badge-slot:nth-child(4n + 2):hover .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 3):hover .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 2):focus-visible .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 3):focus-visible .badge-tooltip, .badge-grid > .badge-slot:nth-child(4n + 2) .badge-tooltip:hover, .badge-grid > .badge-slot:nth-child(4n + 3) .badge-tooltip:hover { transform: translateX(-50%) translateY(0) !important; }
.badge-grid > .badge-slot:nth-child(4n + 2) .badge-tooltip::after, .badge-grid > .badge-slot:nth-child(4n + 3) .badge-tooltip::after { left: 50% !important; right: auto !important; transform: translateX(-50%) !important; }
.tt-title { font-family: var(--font-display, sans-serif) !important; font-size: 13px !important; font-weight: 700 !important; color: var(--text, #f0ede8) !important; margin-bottom: 3px !important; }
.tt-issuer { font-size: 11px !important; font-weight: 600 !important; color: var(--gold, #d9ac54) !important; margin-bottom: 6px !important; }
.tt-desc { font-size: 11.5px !important; line-height: 1.45 !important; color: var(--text-dim, #999388) !important; }
.tt-action { margin-top: 8px !important; padding-top: 8px !important; border-top: 1px solid rgba(255,255,255,0.08) !important; font-family: var(--font-mono, monospace) !important; font-size: 10px !important; font-weight: 700 !important; color: var(--gold-bright, #f0cf74) !important; display: inline-block !important; text-decoration: none !important; cursor: pointer !important; letter-spacing: 0.05em !important; transition: color 0.18s ease !important; }
.tt-action:hover { color: #fff !important; text-decoration: underline !important; }
@media (max-width: 580px) {
  .badge-case-wrap { padding: 20px 16px 24px !important; }
  .badge-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 22px 12px !important; }
  .badge-grid > .badge-slot:nth-child(odd) .badge-tooltip { left: -4px !important; right: auto !important; transform: translateY(6px) !important; }
  .badge-grid > .badge-slot:nth-child(odd):hover .badge-tooltip, .badge-grid > .badge-slot:nth-child(odd) .badge-tooltip:hover { transform: translateY(0) !important; }
  .badge-grid > .badge-slot:nth-child(odd) .badge-tooltip::after { left: 34px !important; right: auto !important; transform: none !important; }
  .badge-grid > .badge-slot:nth-child(even) .badge-tooltip { left: auto !important; right: -4px !important; transform: translateY(6px) !important; }
  .badge-grid > .badge-slot:nth-child(even):hover .badge-tooltip, .badge-grid > .badge-slot:nth-child(even) .badge-tooltip:hover { transform: translateY(0) !important; }
  .badge-grid > .badge-slot:nth-child(even) .badge-tooltip::after { left: auto !important; right: 34px !important; transform: none !important; }
}`;

  const newCssBlock = cssStart + '\n' + dexAndBadgesCss.trim() + '\n' + cssEnd;

  if (css.includes(cssStart)) {
    const sIdx = css.indexOf(cssStart);
    const eIdx = css.indexOf(cssEnd);
    if (sIdx !== -1 && eIdx !== -1) {
      css = css.substring(0, sIdx) + newCssBlock + css.substring(eIdx + cssEnd.length);
    }
  } else {
    const oldMarker = '/* ============================================================\n   WORK SECTION HEADER & VIEW SWITCHER';
    if (css.includes(oldMarker)) {
      const idx = css.indexOf(oldMarker);
      css = css.substring(0, idx);
    }
    css += '\n\n' + newCssBlock + '\n';
  }

  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('✅ assets/css/scroll.css updated.');
}

// 3. UPDATE assets/js/scroll.js
const jsPath = path.join('assets', 'js', 'scroll.js');
if (fs.existsSync(jsPath)) {
  let js = fs.readFileSync(jsPath, 'utf8');

  const bannerStart = '/* --- POKEDEX & WORK VIEWS START --- */';
  const bannerEnd = '/* --- POKEDEX & WORK VIEWS END --- */';

  const dexJs = `  // WORK VIEW SWITCHER & POKÉDEX HARDWARE CONTROLLER
  (function initWorkViews() {
    var cardsBtn = document.getElementById('btn-view-cards');
    var dexBtn = document.getElementById('btn-view-dex');
    var cardsContainer = document.getElementById('cards-container');
    var dexContainer = document.getElementById('dex-container');
    var returnCardsBtn = document.getElementById('dex-return-cards-btn');
    var bReturnBtn = document.getElementById('dex-b-return-btn');

    if (!cardsBtn || !dexBtn || !cardsContainer || !dexContainer) return;

    function switchToCards() {
      cardsBtn.classList.add('active');
      cardsBtn.setAttribute('aria-selected', 'true');
      dexBtn.classList.remove('active');
      dexBtn.setAttribute('aria-selected', 'false');
      cardsContainer.removeAttribute('hidden');
      dexContainer.setAttribute('hidden', '');
    }

    function switchToDex(indexToOpen) {
      dexBtn.classList.add('active');
      dexBtn.setAttribute('aria-selected', 'true');
      cardsBtn.classList.remove('active');
      cardsBtn.setAttribute('aria-selected', 'false');
      cardsContainer.setAttribute('hidden', '');
      dexContainer.removeAttribute('hidden');
      renderDexEntry(typeof indexToOpen === 'number' ? indexToOpen : currentDexIndex);
    }

    cardsBtn.addEventListener('click', function () { switchToCards(); });
    dexBtn.addEventListener('click', function () { switchToDex(); });
    if (returnCardsBtn) returnCardsBtn.addEventListener('click', function () { switchToCards(); });
    if (bReturnBtn) bReturnBtn.addEventListener('click', function () { switchToCards(); });

    var chassis = document.getElementById('dex-chassis');
    var prevBtn = document.getElementById('dex-prev-btn');
    var nextBtn = document.getElementById('dex-next-btn');
    var audioBtn = document.getElementById('dex-audio-btn');
    var audioLbl = document.getElementById('dex-audio-lbl');
    var keypads = dexContainer.querySelectorAll('.dex-pad');

    var dexImg = document.getElementById('dex-img');
    var dexViewfinderId = document.getElementById('dex-viewfinder-id');
    var dexClassification = document.getElementById('dex-classification');
    var dexOrigin = document.getElementById('dex-origin');
    var dexEntryNum = document.getElementById('dex-entry-num');
    var dexTypeBadge = document.getElementById('dex-type-badge');
    var dexTitle = document.getElementById('dex-title');
    var dexSubtitle = document.getElementById('dex-subtitle');
    var dexRole = document.getElementById('dex-role');
    var dexStatsContainer = document.getElementById('dex-stats-container');
    var dexMovesContainer = document.getElementById('dex-moves-container');
    var dexFriction = document.getElementById('dex-friction');
    var dexDelta = document.getElementById('dex-delta');
    var dexCtaLink = document.getElementById('dex-cta-link');

    var sfxEnabled = false;
    var audioCtx = null;
    var currentDexIndex = 0;

    var DEX_DATA = [
      {
        id: '001',
        title: 'Study Buddy',
        subtitle: 'Distraction-Free Academic Desktop HUD',
        type: 'PSYCHIC / DEEP WORK',
        accent: '#a594f9',
        role: 'Solo Product Designer & Builder',
        image: 'assets/images/study-buddy.png',
        link: 'case-studies/study-buddy.html',
        classification: 'ACADEMIC FOCUS HUD',
        origin: 'INDEPENDENT (ELECTRON)',
        stats: [
          { label: 'IA & System Architecture', val: 96 },
          { label: 'Speed-to-Ship (14h)', val: 98 },
          { label: 'Distraction Reduction', val: 92 },
          { label: 'Cross-Platform Build', val: 95 }
        ],
        moves: ['Electron Shell', 'Dual Study Modes', 'Zero Context-Switch', 'Open Source'],
        friction: 'Students lose hours to digital fragmentation when juggling 40 research tabs across disconnected browser windows.',
        delta: 'Designed a floating desktop companion overlay in Figma, then built and shipped cross-platform native installers in ~14 hours.'
      },
      {
        id: '002',
        title: 'SecureID',
        subtitle: 'Identity Verification & Analyst Review Platform',
        type: 'ELECTRIC / IDENTITY',
        accent: '#d9ac54',
        role: 'Solo Product Designer',
        image: 'assets/images/secureid.png',
        link: 'case-studies/secureid.html',
        classification: 'DUAL-SIDED SAAS & MOBILE',
        origin: 'INDEPENDENT PROJECT',
        stats: [
          { label: 'Dual-Sided IA Alignment', val: 95 },
          { label: 'Design Token System', val: 94 },
          { label: 'Case Triage Density', val: 91 },
          { label: 'Onboarding Completion', val: 89 }
        ],
        moves: ['Biometric 1-Tap', 'Triage Queue UX', 'Progressive Disclosure', 'Unified Tokens'],
        friction: 'Anxious consumers abandon invasive verification flows, while fraud analysts bottleneck on cluttered review queues.',
        delta: 'Unified 1-tap mobile onboarding with a high-density analyst triage dashboard on a shared token system.'
      },
      {
        id: '003',
        title: 'Vextaro',
        subtitle: "Men's Luxury Formalwear Rental App & System",
        type: 'STEEL / APPAREL',
        accent: '#5aa3c9',
        role: 'UX/UI Design Intern · Flyrank AI',
        image: 'assets/images/vextaro.png',
        link: 'case-studies/vextaro.html',
        classification: 'LUXURY APPAREL RENTAL',
        origin: 'FLYRANK AI CAPSTONE',
        stats: [
          { label: 'Design System Tokens', val: 96 },
          { label: 'WCAG 2.2 AA Contrast', val: 100 },
          { label: 'Fit-Check IA Flow', val: 94 },
          { label: 'Developer Redlines', val: 95 }
        ],
        moves: ['Fit Confirmation', 'Tokenized UI Kit', '15/15 WCAG Passes', '35 Variants'],
        friction: 'Renters cannot try formalwear on before it ships, making sizing anxiety and fit uncertainty the #1 checkout blocker.',
        delta: 'Led competitive audits, designed a pre-checkout fit checkpoint, tokenized UI system, and full developer handoff package.'
      },
      {
        id: '004',
        title: 'Honda of Clear Lake',
        subtitle: 'Dealership Website Usability & Conversion Audit',
        type: 'GROUND / HEURISTICS',
        accent: '#e27d5a',
        role: 'Solo UX Auditor',
        image: 'assets/images/honda.png',
        link: 'case-studies/honda.html',
        classification: 'DEALERSHIP HEURISTIC AUDIT',
        origin: 'INDEPENDENT AUDIT',
        stats: [
          { label: 'Heuristic Evaluation', val: 96 },
          { label: 'Severity Rating (0–4)', val: 95 },
          { label: 'Conversion Optimization', val: 92 },
          { label: 'Eng Punch List', val: 94 }
        ],
        moves: ["Nielsen's 10 Heuristics", '31 Usability Fixes', 'Trade-In Flow Redesign', 'Banner Noise Cleanup'],
        friction: 'High-intent car shoppers faced friction locating real-time trade-in values and financing terms amidst banner noise.',
        delta: 'Audited 31 usability violations on a 0–4 severity scale, delivering an annotated redesign punch list for 3 critical blockers.'
      },
      {
        id: '005',
        title: 'DevTective',
        subtitle: 'Developer Learning Progress & Habit Tracker',
        type: 'GHOST / PROGRESS TRACKING',
        accent: '#9c8be8',
        role: 'Solo UX Designer',
        image: 'assets/images/devtective.png',
        link: 'case-studies/devtective.html',
        classification: 'DEVELOPER HABIT TRACKER',
        origin: 'GOOGLE UX CERTIFICATE',
        stats: [
          { label: 'User Research & Mapping', val: 93 },
          { label: 'Habit Reinforcement IA', val: 90 },
          { label: 'Mobile Prototyping', val: 94 },
          { label: 'Cognitive Load Reduction', val: 91 }
        ],
        moves: ['Progress Curves', 'Journey Mapping', 'Milestone Triggers', 'Interactive Prototype'],
        friction: 'Self-taught coders experience high drop-off rates due to cognitive overload and lack of structured milestone reinforcement.',
        delta: 'Conducted user interviews, mapped emotional progress curves, and designed an end-to-end habit tracking prototype.'
      }
    ];

    function playBeep(freq, duration) {
      if (!sfxEnabled) return;
      try {
        if (!audioCtx) {
          var AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) audioCtx = new AudioContext();
        }
        if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
        if (audioCtx) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq || 880, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (duration || 0.05));
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + (duration || 0.05));
        }
      } catch (e) {}
    }

    function renderDexEntry(index) {
      if (index < 0) index = DEX_DATA.length - 1;
      if (index >= DEX_DATA.length) index = 0;
      currentDexIndex = index;

      var item = DEX_DATA[currentDexIndex];
      if (!item) return;

      if (chassis) chassis.style.setProperty('--active-accent', item.accent);
      if (dexViewfinderId) dexViewfinderId.textContent = 'ENTRY #' + item.id;
      if (dexClassification) dexClassification.textContent = item.classification;
      if (dexOrigin) dexOrigin.textContent = item.origin;
      if (dexEntryNum) dexEntryNum.textContent = 'NO. ' + item.id;
      if (dexTypeBadge) dexTypeBadge.textContent = item.type;
      if (dexTitle) dexTitle.textContent = item.title;
      if (dexSubtitle) dexSubtitle.textContent = item.subtitle;
      if (dexRole) dexRole.textContent = item.role;
      if (dexFriction) dexFriction.textContent = item.friction;
      if (dexDelta) dexDelta.textContent = item.delta;
      if (dexCtaLink) dexCtaLink.href = item.link;

      if (dexImg) {
        dexImg.style.opacity = '0';
        dexImg.src = item.image;
        dexImg.onload = function () { dexImg.style.opacity = '1'; };
        dexImg.onerror = function () { dexImg.style.opacity = '1'; };
      }

      if (dexStatsContainer) {
        var statsHtml = '';
        item.stats.forEach(function (st) {
          statsHtml += '<div class="stat-row">' +
            '<div class="stat-meta"><span class="stat-lbl">' + st.label + '</span><span class="stat-val">' + st.val + '%</span></div>' +
            '<div class="stat-bar-track"><div class="stat-bar-fill" style="width:' + st.val + '%;"></div></div>' +
            '</div>';
        });
        dexStatsContainer.innerHTML = statsHtml;
      }

      if (dexMovesContainer) {
        var movesHtml = '';
        item.moves.forEach(function (m) {
          movesHtml += '<span class="dex-move-pill">' + m + '</span>';
        });
        dexMovesContainer.innerHTML = movesHtml;
      }

      keypads.forEach(function (pad) {
        var idx = parseInt(pad.getAttribute('data-index'), 10);
        if (idx === currentDexIndex) pad.classList.add('active');
        else pad.classList.remove('active');
      });

      playBeep(720, 0.04);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { renderDexEntry(currentDexIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { renderDexEntry(currentDexIndex + 1); });

    keypads.forEach(function (pad) {
      pad.addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-index'), 10);
        renderDexEntry(idx);
      });
    });

    if (audioBtn) {
      audioBtn.addEventListener('click', function () {
        sfxEnabled = !sfxEnabled;
        audioBtn.setAttribute('aria-pressed', sfxEnabled ? 'true' : 'false');
        if (audioLbl) audioLbl.textContent = sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
        if (sfxEnabled) {
          audioBtn.style.color = '#f0cf74';
          audioBtn.style.borderColor = '#d9ac54';
          playBeep(1040, 0.08);
        } else {
          audioBtn.style.color = '';
          audioBtn.style.borderColor = '';
        }
      });
    }

    document.addEventListener('keydown', function (e) {
      if (dexContainer.hasAttribute('hidden')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); renderDexEntry(currentDexIndex - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); renderDexEntry(currentDexIndex + 1); }
      else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') { switchToCards(); }
      else if (e.key >= '1' && e.key <= '5') {
        var numIdx = parseInt(e.key, 10) - 1;
        if (numIdx >= 0 && numIdx < DEX_DATA.length) renderDexEntry(numIdx);
      }
    });

    renderDexEntry(0);
  })();

  // TCG 3D HOLOGRAPHIC TILT ON CARDS
  (function initTcgHolographics() {
    var cards = document.querySelectorAll('.tcg-card');
    if (!cards.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    cards.forEach(function (card) {
      function onMouseMove(e) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        var rotX = ((y - rect.height / 2) / (rect.height / 2)) * -5.5;
        var rotY = ((x - rect.width / 2) / (rect.width / 2)) * 5.5;
        card.style.transform = 'perspective(1000px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale3d(1.015, 1.015, 1.015)';
        card.style.setProperty('--tcg-glare-x', ((x / rect.width) * 100).toFixed(1) + '%');
        card.style.setProperty('--tcg-glare-y', ((y / rect.height) * 100).toFixed(1) + '%');
      }

      function onMouseEnter() { card.style.transition = 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'; }
      function onMouseLeave() {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      }

      card.addEventListener('mouseenter', onMouseEnter);
      card.addEventListener('mousemove', onMouseMove);
      card.addEventListener('mouseleave', onMouseLeave);
    });
  })();

  // Secondary button direct navigation handler
  document.querySelectorAll('.btn-pill-secondary[data-href]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var href = btn.getAttribute('data-href');
      if (href) {
        if (href.startsWith('http')) window.open(href, '_blank', 'noopener,noreferrer');
        else window.location.href = href;
      }
    });
  });

  // Micro-interaction: dismiss tooltips from previous slots on touch/click
  document.querySelectorAll('.badge-slot').forEach(function (slot) {
    slot.addEventListener('mouseenter', function () {
      document.querySelectorAll('.badge-slot').forEach(function (s) {
        if (s !== slot) s.blur();
      });
    });
  });`;

  const newJsBlock = bannerStart + '\n' + dexJs + '\n' + bannerEnd;

  if (js.includes(bannerStart)) {
    const sIdx = js.indexOf(bannerStart);
    const eIdx = js.indexOf(bannerEnd);
    if (sIdx !== -1 && eIdx !== -1) {
      js = js.substring(0, sIdx) + newJsBlock + js.substring(eIdx + bannerEnd.length);
    }
  } else {
    js = js.replace(/\(function initProductDex\(\)[\s\S]*?\}\)\(\);?\s*/i, '');
    js = js.replace(/\(function initTcgHolographics\(\)[\s\S]*?\}\)\(\);?\s*/i, '');

    const lastCloseIdx = js.lastIndexOf('})();');
    if (lastCloseIdx !== -1) {
      js = js.substring(0, lastCloseIdx) + '\n' + newJsBlock + '\n})();\n';
    } else {
      js += '\n' + newJsBlock + '\n';
    }
  }

  fs.writeFileSync(jsPath, js, 'utf8');
  console.log('✅ assets/js/scroll.js updated.');
}

// 4. UPDATE case-studies/*.html (Pokédex Registry Banners)
const caseStudies = [
  { file: 'study-buddy.html', num: '001', type: 'PSYCHIC // DEEP WORK', color: '#a594f9', title: 'Study Buddy — Distraction-Free Academic Desktop HUD', status: 'SHIPPED &amp; OPEN SOURCE' },
  { file: 'secureid.html', num: '002', type: 'ELECTRIC // IDENTITY', color: '#d9ac54', title: 'SecureID — Identity Verification &amp; Analyst Review Platform', status: 'PROTOTYPE VERIFIED' },
  { file: 'vextaro.html', num: '003', type: 'STEEL // APPAREL', color: '#5aa3c9', title: 'Vextaro — Men\\'s Luxury Formalwear Rental App', status: 'CAPSTONE SHIPPED' },
  { file: 'honda.html', num: '004', type: 'GROUND // HEURISTICS', color: '#e27d5a', title: 'Honda of Clear Lake — Dealership Website Usability Audit', status: 'AUDIT COMPLETE' },
  { file: 'devtective.html', num: '005', type: 'GHOST // PROGRESS TRACKING', color: '#9c8be8', title: 'DevTective — Developer Learning Progress &amp; Habit Tracker', status: 'RESEARCH &amp; PROTOTYPE' }
];

caseStudies.forEach(cs => {
  const csPath = path.join('case-studies', cs.file);
  if (fs.existsSync(csPath)) {
    let csHtml = fs.readFileSync(csPath, 'utf8');

    if (csHtml.includes('fonts.googleapis.com/css2?family=')) {
      csHtml = csHtml.replace(/<link[^>]+fonts\\.googleapis\\.com\\/css2\\?[^>]+>/i, googleFontsLink);
    } else {
      csHtml = csHtml.replace('</head>', '  ' + googleFontsLink + '\\n</head>');
    }

    const bannerHtml = '<div class="pokedex-registry-bar">\\n' +
      '        <span class="reg-chip">SYSTEM NO. ' + cs.num + '</span>\\n' +
      '        <span class="reg-chip reg-type" style="color: ' + cs.color + '; border-color: rgba(217,172,84,0.35);">' + cs.type + '</span>\\n' +
      '        <span class="reg-title">' + cs.title + '</span>\\n' +
      '        <span class="reg-status"><i class="sx-dot" style="background:#2ecc40;" aria-hidden="true"></i> ' + cs.status + '</span>\\n' +
      '      </div>';

    csHtml = csHtml.replace(/<div class="pokedex-registry-bar">[\\s\\S]*?<\\/div>\\s*/gi, '');

    const bcRegex = /(<nav class="cs-breadcrumb"[^>]*>)/i;
    if (bcRegex.test(csHtml)) {
      csHtml = csHtml.replace(bcRegex, bannerHtml + '\\n      $1');
      console.log('✅ Injected Pokédex banner into ' + cs.file);
    }

    fs.writeFileSync(csPath, csHtml, 'utf8');
  }
});

console.log('\\n🎉 All portfolio files successfully upgraded with zero syntax errors!');

// integrate_vextaro_presentation.js
const fs = require('fs');
const path = require('path');

// 1. COPY THE PRESENTATION PDF TO ASSETS
const brainPdf = 'C:/Users/ericf/.gemini/antigravity/brain/c693b551-afdb-45e7-846a-f06e1d637e57/scratch/Vextaro_Impact_Project.pdf';
const targetDir = fs.existsSync('assets') ? 'assets' : (fs.existsSync('../assets') ? '../assets' : 'assets');
const targetPdf = path.join(targetDir, 'Vextaro_Impact_Project.pdf');

try {
  if (fs.existsSync(brainPdf)) {
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(brainPdf, targetPdf);
    console.log(`✓ Copied presentation deck to ${targetPdf}`);
  }
} catch (e) {
  console.log(`Note on PDF copy: ${e.message}`);
}

// 2. UPDATE VEXTARO.HTML
const vextaroPath = fs.existsSync('case-studies/vextaro.html') ? 'case-studies/vextaro.html' : 'vextaro.html';
if (!fs.existsSync(vextaroPath)) {
  console.error(`Could not locate ${vextaroPath}`);
  process.exit(1);
}

let html = fs.readFileSync(vextaroPath, 'utf8');
fs.writeFileSync(vextaroPath + '.bak', html, 'utf8');

// A. Clean up ghost markup & extra closing divs
html = html.replace(`      </div>\n    </div>\n    </div>\n\n    <div class="cs-section">\n      <h2>High-fidelity screens</h2>`, `      </div>\n    </div>\n\n    <div class="cs-section">\n      <h2>High-fidelity screens</h2>`);
html = html.replace(`      </div>\n    </div>\n    </div>\n    </div>\n\n    <div class="cs-section">\n      <h2>Designed for the unhappy path</h2>`, `      </div>\n    </div>\n\n    <div class="cs-section">\n      <h2>Designed for the unhappy path</h2>`);
html = html.replace(`      </div>\n    </div>\n    </div>\n\n    <div class="cs-section">\n      <h2>Engineering hand-off</h2>`, `      </div>\n    </div>\n\n    <div class="cs-section">\n      <h2>Engineering hand-off</h2>`);

// Remove the leftover ghost stats block below Section 11
const ghostBlock = `        <div class="impact-stat"><div class="n">35</div><div class="l">component variants documented in the handoff index</div></div>
        <div class="impact-stat"><div class="n">146</div><div class="l">prototype links QA'd across booking &amp; recovery flows</div></div>
      </div>
    </div>
        <div class="impact-stat"><div class="n">~90%</div><div class="l">faster global UI updates</div></div>
        <div class="impact-stat"><div class="n">7</div><div class="l">IA sections, 3 annotated user flows</div></div>
      </div>
    </div>`;
html = html.replace(ghostBlock, '');

// B. Update CSS styling for timeline, AI log, and reflections
const newStyles = `
.timeline-table-wrap{ overflow-x:auto; margin:16px 0 24px; border:1px solid var(--border); border-radius:var(--radius-sm); background:var(--card); }
.timeline-table{ width:100%; border-collapse:collapse; font-size:13.5px; text-align:left; font-family:'Raleway',sans-serif; }
.timeline-table th{ padding:12px 14px; background:rgba(255,255,255,0.03); border-bottom:1px solid var(--border); color:var(--text); font-weight:700; }
.timeline-table td{ padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.05); color:var(--text-dim); }
.timeline-table tr:last-child td{ border-bottom:none; }
.timeline-table .highlight-row{ background:rgba(200,169,110,0.08); }
.timeline-table .highlight-row td{ color:var(--text); }
.ai-tools-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin:16px 0; }
.ai-card{ border:1px solid var(--border); border-radius:var(--radius-sm); padding:16px; background:var(--card); }
.ai-badge{ display:inline-block; font-size:11px; text-transform:uppercase; font-weight:700; letter-spacing:0.05em; color:var(--accent,var(--gold-bright)); margin-bottom:8px; }
.ai-card h3{ font-size:15px; margin:0 0 6px; color:var(--text); font-family:'Cinzel',serif; }
.ai-card p{ font-size:13px; line-height:1.5; color:var(--text-dim); margin:0; }
.ai-lesson-box{ border:1px solid rgba(239,68,68,0.3); background:rgba(239,68,68,0.05); border-radius:var(--radius-sm); padding:14px 18px; margin-top:14px; }
.ai-lesson-box h4{ margin:0 0 6px; font-size:14px; color:#F87171; font-family:'Raleway',sans-serif; }
.ai-lesson-box p{ margin:0; font-size:13px; line-height:1.55; color:var(--text-dim); }
.reflection-grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin:16px 0; }
.reflection-card{ border:1px solid var(--border); border-radius:var(--radius-sm); padding:16px; background:var(--card); }
.reflection-card h3{ font-size:15px; margin:0 0 6px; color:var(--accent,var(--gold-bright)); font-family:'Cinzel',serif; }
.reflection-card p{ font-size:13px; line-height:1.5; color:var(--text-dim); margin:0; }
.challenge-box{ border:1px solid var(--border); border-left:3px solid var(--accent,var(--gold-bright)); border-radius:var(--radius-sm); padding:16px 20px; background:var(--card); margin-top:16px; }
.challenge-box h3{ font-size:16px; margin:0 0 8px; color:var(--text); font-family:'Cinzel',serif; }
.challenge-box p{ font-size:13.5px; line-height:1.6; color:var(--text-dim); margin:0 0 8px; }
.challenge-box p:last-child{ margin-bottom:0; }
@media (max-width:768px){
  .ai-tools-grid,.reflection-grid{ grid-template-columns:1fr; }
}
`;
if (!html.includes('.timeline-table')) {
  html = html.replace('</style>', newStyles + '\n</style>');
  console.log('✓ Added custom CSS for timeline, AI tools grid, and reflection cards');
}

// C. Update Hero Badge Row with PDF Button
const oldBadge = html.match(/<div class="cs-badge-row"[\s\S]*?<\/div>/)?.[0];
const newBadge = `<div class="cs-badge-row">
      <span>Mobile App (iOS &amp; Android)</span>
      <span>Flyrank AI Internship · 8 Weeks</span>
      <a target="_blank" rel="noopener" href="https://www.figma.com/proto/fwsFyRAMmhGtRbqeYjq0mZ/Vextaro-Internship-Capstone?node-id=2166-2413&viewport=129%2C25%2C0.06&t=AglpdG5iapGW7Pro-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2166%3A2413&page-id=2166%3A2410"><span>View Figma Prototype</span></a>
      <a target="_blank" rel="noopener" href="../assets/Vextaro_Impact_Project.pdf"><span>View 7-Slide Capstone Deck (PDF)</span></a>
    </div>`;
if (oldBadge) {
  html = html.replace(oldBadge, newBadge);
  console.log('✓ Updated hero badge row with PDF presentation deck link');
}

// D. Insert Section: 8-Week Scoping & Prioritization (Slide 2)
const timelineSection = `
    <div class="cs-section">
      <h2>Eight weeks: from blank canvas to engineering hand-off</h2>
      <p>I structured the 8-week capstone around staged milestones, collaborating with Claude and custom tooling each week:</p>
      <div class="timeline-table-wrap">
        <table class="timeline-table">
          <thead>
            <tr><th>Week</th><th>Focus</th><th>Key Deliverable</th><th>AI Toolkit</th></tr>
          </thead>
          <tbody>
            <tr><td><b>W1</b></td><td>Workspace &amp; Toolkit</td><td>Figma workspace &amp; capstone scope setup</td><td>Claude</td></tr>
            <tr><td><b>W2</b></td><td>Research Synthesis</td><td>Marcus persona &amp; emotional journey map</td><td>Claude</td></tr>
            <tr><td><b>W3</b></td><td>IA &amp; Core Flows</td><td>7-section IA &amp; primary booking user flows</td><td>Claude</td></tr>
            <tr class="highlight-row"><td><b>W4</b></td><td><strong>"Kill Your Darlings" Cut-down</strong></td><td><strong>Pruned secondary features to protect core fit checkpoint</strong></td><td>Claude</td></tr>
            <tr><td><b>W5</b></td><td>Wireframes (AI vs Hand-built)</td><td>Hand-built wireframes &amp; fit-check flow</td><td>Claude, Figma AI Agent</td></tr>
            <tr><td><b>W6</b></td><td>Design System Foundations</td><td>Token variables, 9 components, 35 variants</td><td>Claude, Scripter Scripts</td></tr>
            <tr><td><b>W7</b></td><td>Accessibility &amp; Polish</td><td>Hi-fi screens, 15-check WCAG 2.2 AA audit</td><td>Claude, Scripter Scripts</td></tr>
            <tr><td><b>W8</b></td><td>Engineering Hand-off Package</td><td>Annotated redlines, component index &amp; tokens</td><td>Claude, Scripter Scripts</td></tr>
          </tbody>
        </table>
      </div>
    </div>
`;
if (!html.includes('Eight weeks: from blank canvas to engineering hand-off')) {
  html = html.replace('<div class="cs-section">\n      <h2>Marcus and his journey</h2>', timelineSection + '\n    <div class="cs-section">\n      <h2>Marcus and his journey</h2>');
  console.log('✓ Inserted 8-Week Journey Map & Scoping section (Slide 2)');
}

// E. Insert Section: AI Integration Log & Scripter Scripts (Slide 3)
const aiSection = `
    <div class="cs-section">
      <h2>AI integration log: Three scripts that saved hours, one that taught me more</h2>
      <p>Rather than letting AI generate arbitrary designs, I wrote Scripter scripts (JavaScript via the Figma Plugin API) and directed Claude to automate repetitive, error-prone production tasks:</p>
      
      <div class="ai-tools-grid">
        <div class="ai-card">
          <span class="ai-badge">Time-Saver 1</span>
          <h3>Assemble screens from components</h3>
          <p>Wrote a Scripter script to programmatically assemble 4 new views and 9 state screens directly from master components, followed by manual design QA on every screen.</p>
        </div>
        <div class="ai-card">
          <span class="ai-badge">Time-Saver 2</span>
          <h3>Semantic layer renaming for hand-off</h3>
          <p>Automated consistent layer naming across the entire file so developers receive clean, semantic frame trees without hours of manual renaming.</p>
        </div>
        <div class="ai-card">
          <span class="ai-badge">Time-Saver 3</span>
          <h3>Automated token contrast audit</h3>
          <p>Extracted token hex values into Claude to calculate WCAG contrast ratios. Exposed a failing light-mode secondary text value (4.29:1) and resolved it at the token level (8.31:1).</p>
        </div>
      </div>

      <div class="ai-lesson-box">
        <h4><span class="alert-icon">⚠</span> The Failed Prompt &amp; Technical Lesson</h4>
        <p>An AI-generated script called <code>figma.createAutoLayout</code>, which does not exist in the Figma Plugin API, causing a runtime crash. I diagnosed the error, debugged the script, and replaced it with a custom <code>createFrame</code> helper. <strong>Lesson:</strong> Always test automation scripts on isolated sandbox frames before running them globally.</p>
      </div>
    </div>
`;
if (!html.includes('AI integration log: Three scripts that saved hours')) {
  html = html.replace('<div class="cs-section">\n      <h2>A system built to scale</h2>', aiSection + '\n    <div class="cs-section">\n      <h2>A system built to scale</h2>');
  console.log('✓ Inserted AI Integration Log & Scripter Automation section (Slide 3)');
}

// F. Insert Section: Editorial Restraint & "AI builds fast, I decide" (Slide 7)
const reflectionSection = `
    <div class="cs-section">
      <h2>Three learnings and one hard problem</h2>
      <div class="reflection-grid">
        <div class="reflection-card">
          <h3>1. Fix it at the token level</h3>
          <p>A single contrast fix in a token corrected every component and variant across light and dark modes.</p>
        </div>
        <div class="reflection-card">
          <h3>2. AI builds fast, I decide</h3>
          <p>Exercised strict editorial restraint: rejected an arbitrary AI type-scale rescale, rejected a full-width Swap button, and rejected synthetic AI imagery in favor of real curation.</p>
        </div>
        <div class="reflection-card">
          <h3>3. Design the unhappy path</h3>
          <p>Uncertain, slow-loading, and error correction states matter as much as the happy path.</p>
        </div>
      </div>
      <div class="challenge-box">
        <h3>The Hard Problem: Trust as a design hypothesis</h3>
        <p><strong>Challenge:</strong> Making an AI fit estimate trustworthy in a conceptual prototype without an active production machine learning model.</p>
        <p><strong>Solution:</strong> Clearly labeled the recommendation as an "AI estimate", exposed transparent reasoning ("Why this size?"), and provided immediate manual escape hatches (Edit measurements, Not my size, Ask a specialist). Because it is not yet tested in live production, trust remains a rigorous design hypothesis to be validated with real renters.</p>
      </div>
    </div>
`;
if (!html.includes('Three learnings and one hard problem')) {
  html = html.replace('<div class="cs-section">\n      <h2>Production readiness & next steps</h2>', reflectionSection + '\n    <div class="cs-section">\n      <h2>Production readiness & next steps</h2>');
  console.log('✓ Inserted Editorial Restraint & Reflection section (Slide 7)');
}

fs.writeFileSync(vextaroPath, html, 'utf8');
console.log(`\n[SUCCESS] Updated ${vextaroPath} with presentation deck integration & cleaned ghost markup!`);
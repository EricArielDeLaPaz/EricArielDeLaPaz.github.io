// Workspace files behave like a small, keyboard-friendly Figma file browser.
(function () {
  const list = document.querySelector('[data-tab-list]');
  const main = document.querySelector('#workspace-main');
  if (!main || !document.querySelector('[data-file-title]')) return;
  const files = new Map();
  const fixedFiles = [['hero', 'Home', '▣']];
  let active = 'hero';

  const makeTab = (id, label, icon = '▣', closable = false) => {
    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = 'workspace-tab';
    tab.dataset.tabId = id;
    tab.innerHTML = `<span aria-hidden="true">${icon}</span><span>${label}</span>${closable ? '<b aria-label="Close tab">×</b>' : ''}`;
    tab.addEventListener('click', (event) => {
      if (event.target.closest('b')) {
        event.stopPropagation();
        closeFile(id);
        return;
      }
      openFile(id);
    });
    list?.appendChild(tab);
    return tab;
  };

  fixedFiles.forEach(([id, label, icon]) => { files.set(id, { id, label }); makeTab(id, label, icon); });
  files.set('previous', { id: 'previous', label: 'Earlier Work' });
  files.set('current', { id: 'current', label: 'Recent Work' });

  function openFile(id) {
    active = id;
    document.querySelectorAll('.workspace-file').forEach((file) => file.classList.toggle('is-visible', file.dataset.page === id));
    document.querySelectorAll('.workspace-tab').forEach((tab) => tab.classList.toggle('is-active', tab.dataset.tabId === id));
    document.querySelectorAll('[data-open-page]').forEach((link) => link.classList.toggle('is-active', link.dataset.openPage === id));
    const entry = files.get(id);
    document.querySelector('[data-file-title]').textContent = entry?.label || 'Portfolio';
    history.replaceState(null, '', `#${id}`);
  }

  function closeFile(id) {
    if (!files.get(id)?.closable) return;
    files.delete(id);
    list?.querySelector(`[data-tab-id="${id}"]`)?.remove();
    main.querySelector(`[data-page="${id}"]`)?.remove();
    openFile(id === active ? 'hero' : active);
  }

  document.querySelectorAll('[data-open-page]').forEach((link) => link.addEventListener('click', (event) => {
    if (!files.has(link.dataset.openPage)) return;
    event.preventDefault();
    openFile(link.dataset.openPage);
  }));

  const initial = window.location.hash.slice(1);
  openFile(files.has(initial) ? initial : 'hero');

  document.querySelectorAll('[data-project-search]').forEach((search) => search.addEventListener('input', () => {
    const section = search.closest('.workspace-file');
    const query = search.value.trim().toLowerCase();
    section?.querySelectorAll('.workspace-card').forEach((card) => { card.hidden = Boolean(query) && !card.textContent.toLowerCase().includes(query); });
  }));
  document.querySelectorAll('.view-toggle').forEach((toggle) => {
    const grid = toggle.closest('.workspace-file')?.querySelector('.project-grid');
    toggle.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
      grid?.classList.toggle('is-list', button.dataset.view === 'list');
      toggle.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('selected', item === button));
    }));
  });

  // Long list cards by default on desktop; original card grid on mobile.
  const desktopQuery = window.matchMedia('(min-width: 761px)');
  const applyDefaultView = () => {
    document.querySelectorAll('.view-toggle').forEach((toggle) => {
      const grid = toggle.closest('.workspace-file')?.querySelector('.project-grid');
      const view = desktopQuery.matches ? 'list' : 'grid';
      grid?.classList.toggle('is-list', view === 'list');
      toggle.querySelectorAll('[data-view]').forEach((item) => item.classList.toggle('selected', item.dataset.view === view));
    });
  };
  applyDefaultView();
  desktopQuery.addEventListener?.('change', applyDefaultView);

  document.querySelector('[data-share]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    try { await navigator.clipboard.writeText(window.location.href); button.textContent = 'Link copied'; }
    catch { button.textContent = 'Copy unavailable'; }
    window.setTimeout(() => { button.textContent = 'Share'; }, 1600);
  });

  const cs = (file, label) => `<a class="hero-link" href="case-studies/${file}.html">${label}</a>`;
  const heroSlides = [
    ['HERO', 'Product Designer: systems, flows, prototypes.', '', 'I design token-based Figma systems and clickable prototypes that engineers can build from. Texas-based, open to work. B.S. in UX Design (WGU), Nov 2026.', 'INTRO'],
    ['EXPERIENCE', 'UI/UX Design Intern | Flyrank AI', '', '<ul class="hero-bullets"><li>Built a token-based Figma design system: est. ~60% less visual rework, est. ~90% faster global UI updates.</li><li>Cut the UI element count by over half by consolidating components and styles.</li><li>Paired 10+ competitive audits with desk research to design a fit-confirmation checkpoint.</li><li>Delivered a 7-section information architecture and 3 annotated user flows.</li></ul>', 'WORK · 01', 'rich'],
    ['EXPERIENCE', 'Product Design Intern | Stealth Startup', '', '<ul class="hero-bullets"><li>Led a token-based design system from scratch across 2 mobile apps and a desktop dashboard.</li><li>Delivered ~30 new and refined screens and interactive prototypes for engineering handoff.</li><li>Cut demo setup and run time by 30+ minutes per demo, timed against the old process.</li><li>Mentored 2-3 interns per session and led monthly Figma workshops.</li><li class="hero-note">Under NDA; company details confidential.</li></ul>', 'WORK · 02', 'rich'],
    ['ABOUT ME', 'Precise decisions, not just good-looking screens.', '', 'I pair UX research and information architecture with advanced Figma prototyping, grounding every decision in competitive audits, desk research, and the complaints people actually have.', 'PROFILE'],
    ['AI WORKFLOW', 'Fast, with a human in the loop.', '', '<ol class="hero-flow hero-map"><li><b>01</b><strong>Design first</strong><span>I design the product in Figma before any code exists.</span><em><i>Study Buddy:</i> a floating desktop focus companion, designed screen by screen.</em></li><li><b>02</b><strong>Write staged change lists</strong><span>I break the build into small, ordered requests for the AI.</span><em><i>Study Buddy:</i> the app was built in stages, one change list at a time.</em></li><li><b>03</b><strong>AI builds a round</strong><span>The AI writes the code for that stage.</span><em><i>Study Buddy:</i> Electron, React, and TypeScript across 40+ commits.</em></li><li><b>04</b><strong>Review against designs</strong><span>I check every round against my Figma designs.</span><em><i>Study Buddy:</i> each round compared with the original screens.</em></li><li><b>05</b><strong>Decide and correct</strong><span>I cut, fix, and redirect what does not hold up.</span><em><i>Study Buddy:</i> cut features, fixed contrast failures, changed window behavior.</em></li><li><b>06</b><strong>Ship</strong><span>I repeat steps 3 to 5 until it is ready to use.</span><em><i>Study Buddy:</i> about 14 hours of active build time; Windows, Mac, and Linux installers.</em></li></ol><p class="hero-flow-tools">I use AI to move quickly and stay accountable for what ships. Build time counted from commit timestamps.</p>', 'HOW I WORK', 'rich'],
    ['PROJECTS', 'Self-initiated and internship case studies', '', `<ul class="hero-bullets hero-projects"><li>${cs('study-buddy', 'Study Buddy')}: AI-assisted desktop focus app built in Electron, React, and TypeScript.</li><li>${cs('secureid', 'SecureID')}: identity-verification flow and analyst dashboard on one token system.</li><li>${cs('vextaro', 'Vextaro')}: luxury formalwear rental app from my Flyrank internship.</li><li>${cs('devtective', 'DevTective')}: Google UX Certificate capstone.</li><li>${cs('honda', 'Honda of Clear Lake')}: heuristic audit rated on a 0-4 severity scale.</li></ul>`, 'CASE STUDIES', 'rich'],
    ['EDUCATION', 'Degree + certificate', '', '<div class="hero-edu"><div class="hero-edu-card"><span>DEGREE</span><strong>B.S. in User Experience Design</strong><small>Western Governors University · expected Nov 2026</small></div><div class="hero-edu-card"><span>CERTIFICATE</span><strong>Google UX Design Professional Certificate</strong><small>Coursera · expected Nov 2026</small></div></div>', 'EDUCATION', 'rich'],
    ['SKILLS + TOOLS', 'From research to engineering handoff', '', '<ol class="hero-flow"><li><b>01 · Understand</b><span>UX research</span><span>Usability testing</span><span>Information architecture</span><span>User flows</span></li><li><b>02 · Systematize</b><span>Design systems</span><span>Tokens &amp; variables</span><span>Responsive design</span><span>WCAG accessibility</span></li><li><b>03 · Prototype</b><span>Wireframing</span><span>Interactive prototyping</span><span>Figma</span><span>HTML &amp; CSS</span></li><li><b>04 · Hand off</b><span>Engineering handoff</span><span>Specs &amp; annotations</span><span>AI-assisted React &amp; TypeScript</span></li></ol><p class="hero-flow-tools">AI in my workflow: Claude, Gemini, GitHub Copilot, Granola AI. Every output reviewed against user needs.</p>', 'CAPABILITIES', 'rich'],
    ['CONTACT', "Let's build something useful.", '', '<p class="hero-contact-copy">I am looking for a Product Designer role where I can build the system behind the screens. If your team is hiring, I would love to talk. Send me a note or connect on LinkedIn, and I can walk you through any case study.</p><div class="hero-cta"><a class="hero-cta-primary" href="mailto:ericforall247@gmail.com">Email me</a><a class="hero-cta-secondary" href="https://www.linkedin.com/in/eric-ariel-de-la-paz/" target="_blank" rel="noopener">Connect on LinkedIn</a></div>', 'LINKS', 'rich'],
  ];
  const canvas = document.querySelector('[data-hero-canvas]');
  const thumbs = document.querySelector('[data-hero-thumbs]');
  if (canvas && thumbs) {
    let heroIndex = 0;
    heroSlides.forEach((slide, index) => {
      const page = document.createElement('article');
      const rich = slide[5] === 'rich';
      const tag = index === 0 ? 'h1' : 'h2';
      page.className = 'hero-slide' + (rich ? ' hero-slide-rich' : '');
      page.innerHTML = `<div class="hero-slide-top"><span>${slide[0]}</span><i></i></div><${tag} class="hero-title">${slide[1]}</${tag}>${rich ? `<div class="hero-slide-body">${slide[3]}</div>` : ''}<div class="hero-slide-footer">${rich ? '<div></div>' : `<div><strong>${slide[3]}</strong></div>`}<small>PORTFOLIO / ${String(index + 1).padStart(2, '0')}</small><em>${slide[4]}</em></div>`;
      page.addEventListener('click', (event) => {
        if (event.target.closest('a')) return;
        if (event.clientX - page.getBoundingClientRect().left > page.clientWidth / 2) showHero(heroIndex + 1);
        else showHero(heroIndex - 1);
      });
      canvas.appendChild(page);
      const thumb = document.createElement('button');
      thumb.type = 'button'; thumb.className = 'hero-thumb'; thumb.innerHTML = `<span>${index + 1}</span><strong>${slide[0]}</strong><small>${slide[4]}</small>`;
      thumb.addEventListener('click', () => showHero(index));
      thumbs.appendChild(thumb);
    });
    function showHero(index) {
      heroIndex = (index + heroSlides.length) % heroSlides.length;
      canvas.querySelectorAll('.hero-slide').forEach((slide, i) => slide.classList.toggle('is-active', i === heroIndex));
      thumbs.querySelectorAll('.hero-thumb').forEach((thumb, i) => thumb.classList.toggle('is-active', i === heroIndex));
      const activeThumb = thumbs.children[heroIndex], railBox = thumbs.closest('.hero-rail');
      if (activeThumb && railBox && railBox.scrollWidth > railBox.clientWidth) {
        railBox.scrollTo({ left: railBox.scrollLeft + activeThumb.getBoundingClientRect().left - railBox.getBoundingClientRect().left - 12, behavior: 'smooth' });
      }
      document.querySelector('.hero-progress span').style.width = `${((heroIndex + 1) / heroSlides.length) * 100}%`;
    }
    document.querySelector('[data-hero-prev]').addEventListener('click', () => showHero(heroIndex - 1));
    document.querySelector('[data-hero-next]').addEventListener('click', () => showHero(heroIndex + 1));
    showHero(0);
  }
})();

// Keep the workspace controls useful without introducing a second page model.
(function () {
  const search = document.querySelector('[data-project-search]');
  const cards = [...document.querySelectorAll('.workspace-card')];
  const shareButtons = [...document.querySelectorAll('[data-share]')];

  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    cards.forEach((card) => {
      card.hidden = Boolean(query) && !card.textContent.toLowerCase().includes(query);
    });
    document.querySelectorAll('.file-section').forEach((section) => {
      const visibleCards = [...section.querySelectorAll('.workspace-card')].filter((card) => !card.hidden);
      const count = section.querySelector('.file-count');
      if (count) count.textContent = `${visibleCards.length} ${visibleCards.length === 1 ? 'file' : 'files'}`;
    });
  });

  document.querySelectorAll('.view-toggle').forEach((toggle) => {
    const section = toggle.closest('.file-section');
    const grid = section?.querySelector('.project-grid');
    if (!grid) return;
    toggle.querySelectorAll('[data-view]').forEach((button) => {
      button.addEventListener('click', () => {
        const view = button.dataset.view;
        grid.classList.toggle('is-list', view === 'list');
        toggle.querySelectorAll('[data-view]').forEach((item) => {
          item.classList.toggle('selected', item === button);
        });
      });
    });
  });

  shareButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(window.location.href);
        button.textContent = 'Link copied';
      } catch {
        button.textContent = 'Copy unavailable';
      }
      window.setTimeout(() => { button.textContent = original; }, 1600);
    });
  });
})();

// Present case studies as a Figma Slides-style deck: the existing authored
// sections become navigable slides without duplicating or hiding their content.
(function () {
  const page = document.querySelector('.case-study-page');
  const main = page?.querySelector('main');
  if (!page || !main) return;

  const hero = main.querySelector('.cs-hero');
  const body = main.querySelector('.cs-body');
  const note = main.querySelector('.note-box');
  if (!hero || !body) return;

  const slides = [hero, ...(note ? [note] : []), ...body.querySelectorAll('.cs-section')];
  const shell = document.createElement('div');
  shell.className = 'hero-workspace case-study-deck';
  const rail = document.createElement('aside');
  rail.className = 'hero-rail';
  rail.setAttribute('aria-label', `${page.dataset.caseStudy} slides`);
  const railHeading = document.createElement('span');
  railHeading.className = 'rail-heading';
  railHeading.textContent = 'SLIDES';
  rail.appendChild(railHeading);
  const canvasWrap = document.createElement('div');
  canvasWrap.className = 'hero-canvas-wrap';
  const canvas = document.createElement('div');
  canvas.className = 'hero-canvas';
  const controls = document.createElement('div');
  controls.className = 'hero-controls';
  controls.innerHTML = `<button type="button" data-presentation-prev aria-label="Previous slide">←</button><div class="hero-progress"><span></span></div><button type="button" data-presentation-next aria-label="Next slide">→</button><span class="hero-hint">Use ← → or click the canvas edges</span><a class="toolbar-button toolbar-contact" href="mailto:ericforall247@gmail.com"><img src="../assets/icons/mail-01.svg" alt="" aria-hidden="true">Contact</a>`;

  const caseStudy = page.dataset.caseStudy;
  const slideLabels = {
    SecureID: ['SecureID', 'Defining', 'Calm Verification', 'Analyst Triage', 'Analyst Pivot', 'Personas', 'Paper to Pixels', 'System Design', 'Impact & Outcome'],
    'Honda of Clear Lake': ['Honda of Clear Lake', 'The Problem', 'What We Found', 'From Violation to Fix', 'Catastrophic Findings', 'Fix List'],
    DevTective: ['DevTective', 'Momentum', 'Three Learners', 'Re-entry Design', 'The Screens', 'Design System', 'Capstone Scope'],
    'Study Buddy': ['Study Buddy', 'The Problem', 'Designed First', 'Frame to Build', 'Working With AI', 'Human Review', 'The App', 'Companion & Progress', 'Next Steps'],
    Vextaro: ['Vextaro', 'Fit Anxiety', 'Marcus & Journey', 'The Checkpoint', 'Flows & Screens', 'System Design', "What's Next"],
  };
  const labels = slideLabels[caseStudy] || ['Overview', ...(note ? ['Context'] : []), ...[...body.querySelectorAll('.cs-section h2')].map((heading) => heading.textContent.trim())];
  const coverAssets = {
    SecureID: '../assets/images/secureid.png',
    'Honda of Clear Lake': '../assets/images/honda.png',
    DevTective: '../assets/images/devtective.png',
    Vextaro: '../assets/images/vextaro.png',
    'Study Buddy': '../assets/images/study-buddy.png',
  };
  let current = 0;
  slides.forEach((slide, index) => {
    slide.classList.add('presentation-slide', 'hero-slide', 'case-study-slide');
    slide.dataset.presentationIndex = String(index);
    if (slide === note) slide.classList.add('presentation-note');
    if (slide === hero) {
      slide.classList.add('presentation-cover');
      const visual = document.createElement('div');
      visual.className = 'presentation-cover-visual';
      if (coverAssets[caseStudy]) {
        const image = document.createElement('img');
        image.src = coverAssets[caseStudy];
        image.alt = `${caseStudy} project artwork`;
        visual.appendChild(image);
      } else {
        const mark = document.createElement('span');
        mark.className = 'cover-mark';
        mark.textContent = caseStudy === 'Vextaro' ? 'V' : caseStudy;
        visual.appendChild(mark);
      }
      const meta = slide.querySelector('.cs-meta');
      const copy = document.createElement('div');
      copy.className = 'presentation-cover-copy';
      while (slide.firstChild) copy.appendChild(slide.firstChild);
      if (meta) copy.removeChild(meta);
      slide.append(visual, copy);
      if (meta) slide.append(meta);
    }
    canvas.appendChild(slide);
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'hero-thumb';
    item.innerHTML = `<span>${index + 1}</span><strong>${labels[index] || `Slide ${index + 1}`}</strong><small>${index === 0 ? 'OVERVIEW' : `SLIDE ${String(index).padStart(2, '0')}`}</small>`;
    item.addEventListener('click', () => show(index));
    rail.appendChild(item);
  });
  body.remove();
  main.innerHTML = '';
  canvasWrap.append(canvas, controls);
  shell.append(rail, canvasWrap);
  main.append(shell);

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
    rail.querySelectorAll('.hero-thumb').forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === current));
    controls.querySelector('.hero-progress span').style.width = `${((current + 1) / slides.length) * 100}%`;
    controls.querySelector('[data-presentation-prev]').disabled = current === 0;
    controls.querySelector('[data-presentation-next]').disabled = current === slides.length - 1;
    history.replaceState(null, '', `#slide-${current + 1}`);
  }
  controls.querySelector('[data-presentation-prev]').addEventListener('click', () => show(current - 1));
  controls.querySelector('[data-presentation-next]').addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
  const hashIndex = Number(window.location.hash.replace('#slide-', '')) - 1;
  show(Number.isInteger(hashIndex) && hashIndex >= 0 ? hashIndex : 0);
})();

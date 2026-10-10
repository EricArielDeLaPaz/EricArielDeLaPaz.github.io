// Workspace files behave like a small, keyboard-friendly Figma file browser.
(function () {
  const list = document.querySelector('[data-tab-list]');
  const main = document.querySelector('#workspace-main');
  if (!main || !document.querySelector('[data-file-title]')) return;
  const files = new Map();
  const fixedFiles = [['hero', 'Hero', '▣']];
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
  files.set('previous', { id: 'previous', label: 'Previous Works' });
  files.set('current', { id: 'current', label: 'Current Works' });

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

  document.querySelector('[data-share]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    try { await navigator.clipboard.writeText(window.location.href); button.textContent = 'Link copied'; }
    catch { button.textContent = 'Copy unavailable'; }
    window.setTimeout(() => { button.textContent = 'Share'; }, 1600);
  });

  const heroSlides = [
    ['HERO', 'Junior Product / UI/UX Designer — Texas, Remote', '', 'Two concurrent remote internships building token-based design systems across web and mobile, while finishing a Bachelor’s in User Experience Design at WGU — expected November 2026.', 'INTRO'],
    ['ABOUT ME', 'Precise decisions, not just good-looking screens.', '', 'I pair UX research and information architecture with advanced Figma prototyping — grounding every decision in competitive audits, user interviews, and the complaints people actually have.', 'PROFILE'],
    ['EXPERIENCE', 'UI/UX Design Intern — Flyrank AI', '', 'Built a Figma token-based design system that cut visual rework ~60% and sped up global UI updates ~90%. Paired 10+ competitive audits with user interviews to design a fit-confirmation checkpoint and a 7-section information architecture with 3 annotated user flows.', 'WORK · 01'],
    ['EXPERIENCE', 'Product Design Intern — Stealth Startup', '', 'Led a Figma token-based design system from scratch across two mobile apps and a desktop dashboard, as one of ~5 design interns reporting directly to the founder — delivering ~30 new screen designs and cutting demo setup time by 30+ minutes each.', 'WORK · 02'],
    ['LEADERSHIP', 'Mentoring the next wave of design interns', '', 'Mentored 2–3 design interns per session, 1:1 and in small groups, and led monthly workshops on responsive design and advanced Figma prototyping — including how to use Figma variables inside interactive prototypes.', 'MENTORSHIP'],
    ['EDUCATION', 'B.S. in User Experience Design, WGU', '', 'Expected November 2026, alongside the Google UX Design Professional Certificate — a hands-on program in user research methods and usability testing.', 'EDUCATION'],
    ['SKILLS + TOOLS', 'Research, systems, and craft', '', 'UX research, usability testing, information architecture, user flows, design systems, tokens & variables, responsive design, and WCAG accessibility — built in Figma, Figma Variables, and Figma Prototyping.', 'CAPABILITIES'],
    ['CONTACT', 'Let’s make something useful.', '', 'Open to product design and UX research roles, remote or Texas-based. Outside of design, I’m into competitive Pokémon — ask me what that has to do with UX. ericforall247@gmail.com · LinkedIn · GitHub', 'LINKS'],
  ];
  const canvas = document.querySelector('[data-hero-canvas]');
  const thumbs = document.querySelector('[data-hero-thumbs]');
  if (canvas && thumbs) {
    let heroIndex = 0;
    heroSlides.forEach((slide, index) => {
      const page = document.createElement('article');
      page.className = 'hero-slide';
      page.innerHTML = `<div class="hero-slide-top"><span>${slide[0]}</span><i></i></div><h1>${slide[1]}</h1><div class="hero-slide-footer"><div><strong>${slide[3]}</strong></div><small>PORTFOLIO / ${String(index + 1).padStart(2, '0')}</small><em>${slide[4]}</em></div>`;
      page.addEventListener('click', (event) => {
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
    SecureID: ['SecureID', 'Defining', 'Research & Decisions', 'Personas', 'System Design', 'Impact & Outcome'],
    'Honda of Clear Lake': ['Honda of Clear Lake', 'Overview', 'Navigation & Accessibility', 'Product Clarity'],
    DevTective: ['DevTective', 'Overview', 'Empathizing', 'Design System'],
    Vextaro: ['Vextaro', 'Overview', 'The Problem', 'Design System', "What's Next"],
  };
  const labels = slideLabels[caseStudy] || ['Overview', ...(note ? ['Context'] : []), ...[...body.querySelectorAll('.cs-section h2')].map((heading) => heading.textContent.trim())];
  const coverAssets = {
    SecureID: '../assets/images/secureid.png',
    'Honda of Clear Lake': '../assets/images/honda.png',
    DevTective: '../assets/images/devtective.png',
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

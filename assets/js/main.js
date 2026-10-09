// Mark the current page's nav link active, in both the desktop
// filebar nav and the mobile scrollable tab strip.
(function () {
  const workspaceTabs = [...document.querySelectorAll('[data-workspace-target]')];
  const workspaceContent = document.querySelector('.workspace-content');
  if (workspaceTabs.length && workspaceContent) {
    const setActiveWorkspaceTab = (target) => {
      workspaceTabs.forEach((tab) => {
        tab.classList.toggle('is-active', tab.dataset.workspaceTarget === target);
      });

      const addTab = document.querySelector('.workspace-tab-add');
      addTab?.addEventListener('click', () => {
        if (document.querySelector('[data-workspace-target="work"]')) {
          document.querySelector('[data-workspace-target="work"]').focus();
          return;
        }
        const tab = document.createElement('a');
        tab.className = 'workspace-tab';
        tab.href = '#work';
        tab.dataset.workspaceTarget = 'work';
        tab.innerHTML = '▣ <span>Work</span><b aria-hidden="true">×</b>';
        addTab.before(tab);
        workspaceTabs.push(tab);
        tab.addEventListener('click', (event) => {
          event.preventDefault();
          setActiveWorkspaceTab('work');
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', '#work');
        });
        tab.click();
      });
    };

    workspaceTabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        const target = document.getElementById(tab.dataset.workspaceTarget);
        if (!target) return;
        event.preventDefault();
        setActiveWorkspaceTab(tab.dataset.workspaceTarget);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `#${tab.dataset.workspaceTarget}`);
      });
    });

    workspaceContent.addEventListener('scroll', () => {
      const sections = ['hero', 'work']
        .map((id) => document.getElementById(id))
        .filter(Boolean);
      const current = sections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - workspaceContent.getBoundingClientRect().top);
        return distance < closest.distance ? { id: section.id, distance } : closest;
      }, { id: 'hero', distance: Infinity });
      setActiveWorkspaceTab(current.id);
    });
  }

  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;

  const dots = document.querySelector('.slide-dots');
  const progress = document.querySelector('.slide-progress span');
  let current = Math.max(0, slides.findIndex((slide) => slide.id === window.location.hash.slice(1)));
  if (current === -1) current = 0;

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slide-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dots.appendChild(dot);
  });

  function showSlide(index, updateHash = true) {
    current = (index + slides.length) % slides.length;
    const activeSection = slides[current].id === 'intro' ? 'intro' :
      slides[current].id === 'about' ? 'about' : 'work';
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots.children[slideIndex].classList.toggle('is-active', active);
    });
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    if (updateHash) history.replaceState(null, '', `#${slides[current].id}`);
    document.querySelectorAll('.filebar nav a, .mobile-tabs a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeSection}`);
    });
  }

  document.querySelector('[data-prev]').addEventListener('click', () => showSlide(current - 1));
  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => showSlide(current + 1));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') showSlide(current + 1);
    if (event.key === 'ArrowLeft') showSlide(current - 1);
  });
  window.addEventListener('hashchange', () => {
    const next = slides.findIndex((slide) => slide.id === window.location.hash.slice(1));
    if (next >= 0) showSlide(next, false);
  });

  showSlide(current, false);
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
  shell.className = 'presentation-shell';
  const rail = document.createElement('aside');
  rail.className = 'presentation-rail';
  rail.setAttribute('aria-label', 'Case study slides');
  const canvas = document.createElement('div');
  canvas.className = 'presentation-canvas';
  const controls = document.createElement('div');
  controls.className = 'presentation-controls';
  controls.innerHTML = '<button type="button" data-presentation-prev aria-label="Previous slide">←</button><div class="presentation-progress"><span></span></div><button type="button" data-presentation-next aria-label="Next slide">→</button><button type="button" class="present-button" data-presentation-present>Present</button>';

  const labels = ['Overview', ...(note ? ['Context'] : []), ...[...body.querySelectorAll('.cs-section h2')].map((heading) => heading.textContent.trim())];
  let current = 0;
  slides.forEach((slide, index) => {
    slide.classList.add('presentation-slide');
    slide.dataset.presentationIndex = String(index);
    if (slide === note) slide.classList.add('presentation-note');
    canvas.appendChild(slide);
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'presentation-thumb';
    item.innerHTML = `<span>${index + 1}</span><strong>${labels[index]}</strong><small>${index === 0 ? 'OVERVIEW' : `SLIDE ${String(index).padStart(2, '0')}`}</small>`;
    item.addEventListener('click', () => show(index));
    rail.appendChild(item);
  });
  body.remove();
  main.innerHTML = '';
  shell.append(rail, canvas);
  main.append(shell, controls);

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
    rail.querySelectorAll('.presentation-thumb').forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === current));
    controls.querySelector('.presentation-progress span').style.width = `${((current + 1) / slides.length) * 100}%`;
    controls.querySelector('[data-presentation-prev]').disabled = current === 0;
    controls.querySelector('[data-presentation-next]').disabled = current === slides.length - 1;
    history.replaceState(null, '', `#slide-${current + 1}`);
  }
  controls.querySelector('[data-presentation-prev]').addEventListener('click', () => show(current - 1));
  controls.querySelector('[data-presentation-next]').addEventListener('click', () => show(current + 1));
  controls.querySelector('[data-presentation-present]').addEventListener('click', () => page.classList.toggle('is-presenting'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
    if (event.key === 'Escape') page.classList.remove('is-presenting');
  });
  const hashIndex = Number(window.location.hash.replace('#slide-', '')) - 1;
  show(Number.isInteger(hashIndex) && hashIndex >= 0 ? hashIndex : 0);
})();

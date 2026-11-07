// Scrolling portfolio: Serena nav interactivity, Joshua Lucas reveals, silky smooth scroll & outline dots.
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Cancel any native jump so pure JS RAF controls smooth motion without compositor fight
  document.documentElement.style.scrollBehavior = 'auto';

  // Buttery pure JS smooth scroll with Motion easeOutQuart physics
  var activeScrollAnim = null;
  function smoothScrollTo(targetY, duration) {
    if (activeScrollAnim) cancelAnimationFrame(activeScrollAnim);
    var startY = window.pageYOffset || document.documentElement.scrollTop;
    var distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    duration = duration || Math.min(850, Math.max(420, Math.abs(distance) * 0.42));
    var startTime = null;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function step(now) {
      if (!startTime) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = easeOutQuart(progress);

      window.scrollTo(0, Math.round(startY + distance * eased));

      if (progress < 1) {
        activeScrollAnim = requestAnimationFrame(step);
      } else {
        activeScrollAnim = null;
      }
    }

    // Cancel gracefully on mousewheel or touch
    function cancelScroll() {
      if (activeScrollAnim) {
        cancelAnimationFrame(activeScrollAnim);
        activeScrollAnim = null;
      }
      window.removeEventListener('wheel', cancelScroll);
      window.removeEventListener('touchmove', cancelScroll);
    }
    window.addEventListener('wheel', cancelScroll, { passive: true, once: true });
    window.addEventListener('touchmove', cancelScroll, { passive: true, once: true });

    activeScrollAnim = requestAnimationFrame(step);
  }

  // Intercept anchor hash links: scroll directly to section header with perfect breathing room below nav
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    var hashIdx = href.indexOf('#');
    if (hashIdx === -1) return;
    var hash = href.slice(hashIdx);
    var path = href.slice(0, hashIdx);
    if (!path || path === location.pathname || path === location.pathname.split('/').pop() || href.startsWith('#')) {
      var target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        // Target the internal kicker / heading so it aligns with header text ~24px below floating nav
        var header = target.querySelector('.sx-kicker, h2, h1');
        var targetY;
        if (header && header !== target && hash !== '#top') {
          targetY = header.getBoundingClientRect().top + window.pageYOffset - 84;
        } else {
          targetY = (hash === '#top') ? 0 : (target.getBoundingClientRect().top + window.pageYOffset - 84);
        }
        smoothScrollTo(Math.max(0, targetY));
        if (history.pushState) history.pushState(null, '', hash);
      }
    }
  });

  // Long horizontal cards on desktop, stacked vertical cards on mobile
  var mq = window.matchMedia('(min-width: 761px)');
  function applyView() {
    document.querySelectorAll('.sx-projects, .project-grid').forEach(function (g) {
      g.classList.toggle('is-list', mq.matches);
    });
  }
  applyView();
  if (mq.addEventListener) mq.addEventListener('change', applyView);

  // Joshua Lucas style scroll reveals: observe sections, cards, figures, reasoning steps & stats
  var revealSelectors = [
    '.sx-section',
    '.cs-section',
    '.workspace-card',
    '.sx-exp-card',
    '.cs-section figure',
    '.chain-step',
    '.impact-stat',
    '.timeline-table-wrap',
    '.note-box',
    '.sx-statbar li'
  ];
  var revealElements = document.querySelectorAll(revealSelectors.join(', '));
  revealElements.forEach(function (el) { el.classList.add('sx-reveal'); });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });
    revealElements.forEach(function (el) { observer.observe(el); });
  } else {
    revealElements.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Home: active nav link indicator (Serena style active tracking)
  var spyMap = {
    top: 'top',
    work: 'work',
    experience: 'experience',
    process: 'process',
    skills: 'skills',
    about: 'about',
    contact: 'contact'
  };
  var navLinks = document.querySelectorAll('.sx-nav a[data-spy]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = spyMap[e.target.id];
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.dataset.spy === key);
        });
      });
    }, { rootMargin: '-35% 0px -50% 0px' });
    Object.keys(spyMap).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // Case study: progress bar & interactive floating outline rail
  if (document.body.classList.contains('sx-case')) {
    var bar = document.createElement('div');
    bar.className = 'sx-progress';
    document.body.appendChild(bar);

    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Collect hero (Case Study Info) + all sections
    var hero = document.querySelector('.cs-hero');
    var bodySecs = [].slice.call(document.querySelectorAll('.cs-section'));
    var allSecs = [];
    if (hero) {
      hero.id = hero.id || 'case-study-info';
      hero.dataset.railTitle = 'Case Study Info';
      allSecs.push(hero);
    }
    allSecs = allSecs.concat(bodySecs);

    var rail = document.createElement('nav');
    rail.className = 'sx-rail';
    rail.setAttribute('aria-label', 'Case study outline');

    var links = allSecs.map(function (s, i) {
      var title = s.dataset.railTitle;
      if (!title) {
        var h = s.querySelector('h2');
        title = h ? h.textContent.trim() : 'Section ' + i;
      }
      s.id = s.id || 'section-' + i;
      var a = document.createElement('a');
      a.href = '#' + s.id;
      a.setAttribute('aria-label', title);
      a.innerHTML = '<span>' + title.replace(/</g, '&lt;') + '</span>';
      rail.appendChild(a);
      return a;
    });
    document.body.appendChild(rail);

    // Initial hash positioning
    if (location.hash) {
      var target = document.querySelector(location.hash);
      if (target) {
        setTimeout(function () {
          var y = target.getBoundingClientRect().top + window.pageYOffset - 84;
          smoothScrollTo(Math.max(0, y));
        }, 50);
      }
    }

    // Scroll spy for outline dots
    function updateActiveDot() {
      if (window.scrollY < 180) {
        links.forEach(function (a, j) { a.classList.toggle('is-active', j === 0); });
        return;
      }
      var scrollPos = window.scrollY + 220;
      var currentIdx = 0;
      allSecs.forEach(function (s, i) {
        if (s.offsetTop <= scrollPos) {
          currentIdx = i;
        }
      });
      links.forEach(function (a, j) {
        a.classList.toggle('is-active', j === currentIdx);
      });
    }
    window.addEventListener('scroll', updateActiveDot, { passive: true });
    updateActiveDot();

    // Dot Scrubbing: Press, drag through dots, and release to navigate
    var isScrubbing = false;
    var scrubbedIdx = 0;

    function handleScrub(clientY) {
      var closestIdx = 0;
      var minDistance = Infinity;
      links.forEach(function (a, idx) {
        var rect = a.getBoundingClientRect();
        var centerY = rect.top + rect.height / 2;
        var dist = Math.abs(clientY - centerY);
        if (dist < minDistance) {
          minDistance = dist;
          closestIdx = idx;
        }
      });
      scrubbedIdx = closestIdx;
      links.forEach(function (a, idx) {
        a.classList.toggle('is-active', idx === closestIdx);
      });
    }

    rail.addEventListener('pointerdown', function (e) {
      isScrubbing = true;
      try { rail.setPointerCapture(e.pointerId); } catch (err) {}
      handleScrub(e.clientY);
    });

    rail.addEventListener('pointermove', function (e) {
      if (!isScrubbing) return;
      handleScrub(e.clientY);
    });

    function finishScrub(e) {
      if (!isScrubbing) return;
      isScrubbing = false;
      try { rail.releasePointerCapture(e.pointerId); } catch (err) {}
      var targetSec = allSecs[scrubbedIdx];
      if (targetSec) {
        var header = targetSec.querySelector('.sx-kicker, h2, h1');
        var targetY = (header && header !== targetSec)
          ? (header.getBoundingClientRect().top + window.pageYOffset - 84)
          : (targetSec.getBoundingClientRect().top + window.pageYOffset - 84);
        smoothScrollTo(Math.max(0, targetY));
      }
    }
    rail.addEventListener('pointerup', finishScrub);
    rail.addEventListener('pointercancel', finishScrub);
  }

  // Lightbox for case study figures
  var lb = document.createElement('div');
  lb.className = 'sx-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Image preview');
  lb.innerHTML = '<button class="sx-lightbox-close" aria-label="Close">&times;</button><img src="" alt="" />';
  document.body.appendChild(lb);
  var lbI = lb.querySelector('img'), lbC = lb.querySelector('.sx-lightbox-close');
  function openLB(s, a) { lbI.src = s; lbI.alt = a || ''; lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function closeLB() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
  document.addEventListener('click', function(e) {
    var l = e.target.closest('a.cs-zoom, .cs-section figure img');
    if (!l) return;
    if (l.tagName === 'A' && /\.(png|jpe?g|webp|gif)$/i.test(l.href)) { e.preventDefault(); openLB(l.href, l.title); }
    else if (l.tagName === 'IMG' && l.closest('.cs-section figure')) { openLB(l.src, l.alt); }
  });
  lb.addEventListener('click', function(e) { if (e.target === lb || e.target === lbC) closeLB(); });
  window.addEventListener('keydown', function(e) { if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLB(); });

  // ============================================================
  // TCG HOLOGRAPHIC 3D TILT & SPECULAR GLARE TRACKER
  // ============================================================
  if (!reduce) {
    var tcgCards = document.querySelectorAll('.tcg-card');
    tcgCards.forEach(function (card) {
      var bounds;
      function updateBounds() { bounds = card.getBoundingClientRect(); }

      card.addEventListener('mouseenter', function () {
        updateBounds();
        card.style.transition = 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease';
      });

      card.addEventListener('mousemove', function (e) {
        if (!bounds) updateBounds();
        var x = e.clientX - bounds.left;
        var y = e.clientY - bounds.top;

        var normX = (x / bounds.width) - 0.5;
        var normY = (y / bounds.height) - 0.5;

        var tiltX = -normY * 10;
        var tiltY = normX * 10;

        card.style.transform = 'perspective(1000px) rotateX(' + tiltX.toFixed(2) + 'deg) rotateY(' + tiltY.toFixed(2) + 'deg) scale3d(1.015, 1.015, 1.015)';
        card.style.setProperty('--glare-x', ((x / bounds.width) * 100).toFixed(1) + '%');
        card.style.setProperty('--glare-y', ((y / bounds.height) * 100).toFixed(1) + '%');
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ============================================================
  // PRODUCTDEX INTERACTIVE HUD MODAL DRIVER
  // ============================================================
  (function initProductDex() {
    var modal = document.getElementById('productdex-modal');
    var openBtn = document.getElementById('open-productdex-btn');
    if (!modal) return;

    var chassis = modal.querySelector('.dex-chassis');
    var backdrop = document.getElementById('productdex-backdrop');
    var closeBtn = document.getElementById('dex-close-btn');
    var prevBtn = document.getElementById('dex-prev-btn');
    var nextBtn = document.getElementById('dex-next-btn');
    var audioBtn = document.getElementById('dex-audio-btn');
    var keypads = modal.querySelectorAll('.dex-pad:not(.locked)');

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
    var currentIndex = 0;

    var DEX_DATA = [
      {
        id: '001',
        title: 'Study Buddy',
        subtitle: 'Distraction-Free Academic Desktop HUD',
        type: 'PSYCHIC / DEEP WORK',
        accent: '#a594f9',
        role: 'Product Designer & Builder · Independent Project',
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
        role: 'Product Designer · Independent Project',
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
        subtitle: "Men's Luxury Formalwear Rental App",
        type: 'STEEL / APPAREL',
        accent: '#5aa3c9',
        role: 'UX/UI Design Intern · Flyrank AI (8-Week Capstone)',
        image: 'assets/images/vextaro.png',
        link: 'case-studies/vextaro.html',
        classification: 'LUXURY FORMALWEAR SYSTEM',
        origin: 'FLYRANK AI INTERNSHIP',
        stats: [
          { label: 'Token Architecture', val: 98 },
          { label: 'WCAG AA Compliance', val: 100 },
          { label: 'Recovery & Edge Cases', val: 94 },
          { label: 'Developer Handoff', val: 96 }
        ],
        moves: ['Sizing Token Engine', '15/15 WCAG AA Checks', '9 Edge Case Flows', 'Handoff Package'],
        friction: 'Renters cannot try formalwear on before it ships, making fit uncertainty the #1 checkout blocker killing conversion.',
        delta: 'Architected a centralized sizing token engine, 9 annotated error edge cases, and a 100% tokenized handoff package.'
      },
      {
        id: '004',
        title: 'Honda of Clear Lake',
        subtitle: 'Dealership Website Usability Audit',
        type: 'FIRE / USABILITY AUDIT',
        accent: '#e27d5a',
        role: 'UX Auditor · Independent Audit',
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
        role: 'UX Designer · Google UX Certificate',
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
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
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

    function renderEntry(index) {
      if (index < 0) index = DEX_DATA.length - 1;
      if (index >= DEX_DATA.length) index = 0;
      currentIndex = index;

      var item = DEX_DATA[currentIndex];
      if (!item) return;

      if (chassis) {
        chassis.style.setProperty('--active-accent', item.accent);
      }

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
        if (idx === currentIndex) {
          pad.classList.add('active');
        } else {
          pad.classList.remove('active');
        }
      });

      playBeep(720, 0.04);
    }

    function openDex(idx) {
      if (typeof idx === 'number') currentIndex = idx;
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      renderEntry(currentIndex);
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      playBeep(980, 0.06);
    }

    function closeDex() {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
      if (openBtn) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.focus();
      }
      playBeep(440, 0.05);
    }

    if (openBtn) {
      openBtn.addEventListener('click', function () { openDex(0); });
    }

    if (closeBtn) closeBtn.addEventListener('click', closeDex);
    if (backdrop) backdrop.addEventListener('click', closeDex);

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        renderEntry(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        renderEntry(currentIndex + 1);
      });
    }

    keypads.forEach(function (pad) {
      pad.addEventListener('click', function () {
        var idx = parseInt(pad.getAttribute('data-index'), 10);
        if (!isNaN(idx)) renderEntry(idx);
      });
    });

    if (audioBtn) {
      audioBtn.addEventListener('click', function () {
        sfxEnabled = !sfxEnabled;
        var icon = audioBtn.querySelector('.audio-icon');
        var text = audioBtn.querySelector('.audio-text');
        if (sfxEnabled) {
          if (icon) icon.textContent = '🔊';
          if (text) text.textContent = 'SFX ON';
          audioBtn.style.borderColor = 'var(--gold)';
          audioBtn.style.color = 'var(--gold-bright)';
          playBeep(880, 0.08);
        } else {
          if (icon) icon.textContent = '🔇';
          if (text) text.textContent = 'SFX OFF';
          audioBtn.style.borderColor = '';
          audioBtn.style.color = '';
        }
      });
    }

    window.addEventListener('keydown', function (e) {
      var isModalOpen = !modal.hasAttribute('hidden');

      if (isModalOpen) {
        if (e.key === 'Escape') {
          e.preventDefault();
          closeDex();
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          renderEntry(currentIndex - 1);
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          renderEntry(currentIndex + 1);
        } else if (e.key >= '1' && e.key <= '5') {
          e.preventDefault();
          renderEntry(parseInt(e.key, 10) - 1);
        }
      } else {
        var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
        if (tag !== 'input' && tag !== 'textarea' && !e.ctrlKey && !e.metaKey && !e.altKey) {
          if (e.key === 'd' || e.key === 'D' || e.key === 'p' || e.key === 'P') {
            e.preventDefault();
            openDex(0);
          }
        }
      }
    });

    var caseStudyCards = document.querySelectorAll('.tcg-card');
    caseStudyCards.forEach(function (card, i) {
      card.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        openDex(i);
      });
    });

  })();

})();
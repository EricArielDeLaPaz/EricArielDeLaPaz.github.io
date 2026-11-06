// Scrolling portfolio: nav highlight, reveal-on-scroll, default project view, case-study outline.
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Long project cards on desktop, stacked cards on phones.
  var mq = window.matchMedia('(min-width: 761px)');
  function applyView() {
    document.querySelectorAll('.sx-projects').forEach(function (g) { g.classList.toggle('is-list', mq.matches); });
  }
  applyView();
  if (mq.addEventListener) mq.addEventListener('change', applyView);

  // Universal smooth scroll helper for desktop & mobile
  function scrollToTarget(target, offset) {
    if (!target) return;
    offset = (offset !== undefined) ? offset : 88;
    var targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  }

  // Intercept on-page hash clicks (navbar, hero CTAs) for buttery smooth scrolling
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="#"]');
    if (!a || a.closest('.sx-rail')) return;
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    var hashIndex = href.indexOf('#');
    if (hashIndex === -1) return;
    var hash = href.slice(hashIndex);
    var path = href.slice(0, hashIndex);
    if (!path || path === location.pathname || path === location.pathname.split('/').pop() || href.startsWith('#')) {
      var target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        scrollToTarget(target, 88);
        if (history.pushState) history.pushState(null, '', hash);
      }
    }
  });

  // Reveal sections as they scroll into view.
  var reveal = document.querySelectorAll('.sx-section, .sx-statbar, .cs-section');
  reveal.forEach(function (el) { el.classList.add('sx-reveal'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Home: highlight the nav link for the section in view.
  var spyMap = { work: 'work', experience: 'experience', process: 'process', skills: 'skills', about: 'about', contact: 'contact' };
  var navLinks = document.querySelectorAll('.sx-nav a[data-spy]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var key = spyMap[e.target.id];
        navLinks.forEach(function (a) { a.classList.toggle('is-active', a.dataset.spy === key); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(spyMap).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  // Case studies: progress bar + interactive outline rail with scrub-to-section
  if (document.body.classList.contains('sx-case')) {
    var bar = document.createElement('div'); bar.className = 'sx-progress'; document.body.appendChild(bar);
    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    var secs = [].slice.call(document.querySelectorAll('.cs-section'));
    var rail = document.createElement('nav'); rail.className = 'sx-rail'; rail.setAttribute('aria-label', 'Sections');
    var links = secs.map(function (s, i) {
      var h = s.querySelector('h2'); var title = h ? h.textContent.trim() : 'Section ' + (i + 1);
      s.id = s.id || 'section-' + (i + 1);
      var a = document.createElement('a'); a.href = '#' + s.id; a.setAttribute('aria-label', title);
      a.innerHTML = '<span>' + title.replace(/</g, '&lt;') + '</span>';
      rail.appendChild(a); return a;
    });
    document.body.appendChild(rail);

    // Initial hash positioning
    if (/^#section-\d+$/.test(location.hash)) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) setTimeout(function () { scrollToTarget(target, 88); }, 50);
    }

    // Scrubber & smooth navigation mechanics
    var isScrubbing = false;
    var activeScrubIdx = -1;
    var isAutoScrolling = false;
    var autoScrollTimer = null;

    function setActiveDot(index) {
      links.forEach(function (a, j) {
        a.classList.toggle('is-active', j === index);
        a.classList.toggle('is-scrubbing-active', isScrubbing && j === index);
      });
    }

    function getClosestDotIndex(clientY) {
      var closest = 0;
      var minDist = Infinity;
      links.forEach(function (a, i) {
        var rect = a.getBoundingClientRect();
        var midY = rect.top + rect.height / 2;
        var dist = Math.abs(clientY - midY);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      return closest;
    }

    function goToSection(index) {
      if (index < 0 || index >= secs.length) return;
      isAutoScrolling = true;
      clearTimeout(autoScrollTimer);
      setActiveDot(index);
      scrollToTarget(secs[index], 88);
      if (history.replaceState) history.replaceState(null, '', '#' + secs[index].id);
      autoScrollTimer = setTimeout(function () {
        isAutoScrolling = false;
      }, 750);
    }

    // Pointer events on rail for press-and-scrub
    rail.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      isScrubbing = true;
      rail.classList.add('is-scrubbing');
      if (rail.setPointerCapture) {
        try { rail.setPointerCapture(e.pointerId); } catch (_) {}
      }
      activeScrubIdx = getClosestDotIndex(e.clientY);
      setActiveDot(activeScrubIdx);
    });

    rail.addEventListener('pointermove', function (e) {
      if (!isScrubbing) return;
      e.preventDefault();
      var idx = getClosestDotIndex(e.clientY);
      if (idx !== activeScrubIdx) {
        activeScrubIdx = idx;
        setActiveDot(activeScrubIdx);
      }
    });

    function finishScrub(e) {
      if (!isScrubbing) return;
      isScrubbing = false;
      rail.classList.remove('is-scrubbing');
      if (rail.releasePointerCapture && e.pointerId !== undefined) {
        try { rail.releasePointerCapture(e.pointerId); } catch (_) {}
      }
      if (activeScrubIdx >= 0) {
        goToSection(activeScrubIdx);
      }
    }

    rail.addEventListener('pointerup', finishScrub);
    rail.addEventListener('pointercancel', finishScrub);

    links.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        goToSection(i);
      });
    });

    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (entries) {
        if (isScrubbing || isAutoScrolling) return;
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var i = secs.indexOf(e.target);
            if (i !== -1) setActiveDot(i);
          }
        });
      }, { rootMargin: '-35% 0px -55% 0px' });
      secs.forEach(function (s) { so.observe(s); });
    }
  }

  // Inline Non-Intrusive Lightbox
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
})();

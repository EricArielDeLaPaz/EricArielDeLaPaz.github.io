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

})();

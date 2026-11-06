// Scrolling portfolio: Motion smooth scroll, nav highlight, card layout, outline rail & lightbox.
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // RAF Motion smooth scroll engine (Physics-inspired easing curve)
  function motionScrollTo(targetY, duration) {
    if (reduce) {
      window.scrollTo(0, targetY);
      return;
    }
    var startY = window.pageYOffset || document.documentElement.scrollTop;
    var diff = targetY - startY;
    if (Math.abs(diff) < 2) return;
    duration = duration || Math.min(850, Math.max(380, Math.abs(diff) * 0.45));
    var startTime = null;

    // Motion easeOutQuint deceleration curve
    function ease(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function step(now) {
      if (!startTime) startTime = now;
      var elapsed = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased = ease(progress);
      window.scrollTo(0, Math.round(startY + diff * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  // Intercept anchor hash links for smooth glide with header offset
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
        var y = target.getBoundingClientRect().top + window.pageYOffset - 88;
        motionScrollTo(Math.max(0, y));
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

  // Reveal sections on scroll with Motion spring curve
  var reveal = document.querySelectorAll('.sx-section, .sx-statbar, .cs-section, .workspace-card, .sx-exp-card');
  reveal.forEach(function (el) { el.classList.add('sx-reveal'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Home: active nav link indicator
  var spyMap = { work: 'work', experience: 'experience', process: 'process', skills: 'skills', about: 'about', contact: 'contact' };
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
    }, { rootMargin: '-45% 0px -50% 0px' });
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
          var y = target.getBoundingClientRect().top + window.pageYOffset - 88;
          motionScrollTo(Math.max(0, y));
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
        var y = targetSec.getBoundingClientRect().top + window.pageYOffset - 88;
        motionScrollTo(Math.max(0, y));
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
})();

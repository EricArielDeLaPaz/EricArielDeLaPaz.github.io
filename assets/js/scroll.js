// Scrolling portfolio: smooth scroll, nav highlight, card layout, outline dots, lightbox.
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Buttery-smooth scroll helper
  function smoothScrollTo(targetY) {
    if (reduce) {
      window.scrollTo(0, targetY);
      return;
    }
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  }

  // Intercept on-page hash links for smooth scroll with fixed header offset
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
        smoothScrollTo(y);
        if (history.pushState) history.pushState(null, '', hash);
      }
    }
  });

  // Long horizontal cards on desktop, stacked vertical cards on mobile
  var mq = window.matchMedia('(min-width: 761px)');
  function applyView() {
    document.querySelectorAll('.sx-projects').forEach(function (g) {
      g.classList.toggle('is-list', mq.matches);
    });
  }
  applyView();
  if (mq.addEventListener) mq.addEventListener('change', applyView);

  // Reveal sections on scroll
  var reveal = document.querySelectorAll('.sx-section, .sx-statbar, .cs-section');
  reveal.forEach(function (el) { el.classList.add('sx-reveal'); });
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
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

  // Case study: progress bar & floating outline rail with dots
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
    rail.setAttribute('aria-label', 'Sections');

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
          smoothScrollTo(y);
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
    if (l.tagName === 'A' && /.(png|jpe?g|webp|gif)$/i.test(l.href)) { e.preventDefault(); openLB(l.href, l.title); }
    else if (l.tagName === 'IMG' && l.closest('.cs-section figure')) { openLB(l.src, l.alt); }
  });
  lb.addEventListener('click', function(e) { if (e.target === lb || e.target === lbC) closeLB(); });
  window.addEventListener('keydown', function(e) { if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLB(); });
})();

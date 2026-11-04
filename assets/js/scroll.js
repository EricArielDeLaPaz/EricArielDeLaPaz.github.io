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

  // Case studies: progress bar + section outline dots.
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
    if (/^#section-\d+$/.test(location.hash)) { var target = document.getElementById(location.hash.slice(1)); if (target) setTimeout(function () { target.scrollIntoView(); }, 50); }
    if ('IntersectionObserver' in window) {
      var so = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { var i = secs.indexOf(e.target); links.forEach(function (a, j) { a.classList.toggle('is-active', i === j); }); }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      secs.forEach(function (s) { so.observe(s); });
    }
  }
})();

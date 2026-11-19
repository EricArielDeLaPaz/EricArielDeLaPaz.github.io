/**
 * Quick Scan vs Deep Dive: a global reading-density toggle.
 *
 * Source of truth: body[data-view-mode="deep-dive" | "quick-scan"]
 * (mirrored on <html> so CSS can apply before <body> exists). Fires
 * window "viewmodechange" {detail:{mode}} so cursor.js can switch reticles.
 *
 * Load this file synchronously in <head> so a visitor who arrives with
 * ?mode=scan, or who switched on the previous page, never sees a flash of
 * the long version. Works on desktop and mobile. No dependencies.
 */
(function () {
  'use strict';

  var KEY = 'eric_view_mode';
  var DEEP = 'deep-dive';
  var SCAN = 'quick-scan';
  var root = document.documentElement;

  /* ----------------------------------------------------------- state */
  function store(get, val) {
    try {
      if (get) return window.sessionStorage.getItem(KEY);
      window.sessionStorage.setItem(KEY, val);
    } catch (e) { /* private mode / blocked storage: fall back to in-memory */ }
    return null;
  }

  function initialMode() {
    var q = null;
    try { q = new URLSearchParams(window.location.search).get('mode'); } catch (e) { /* old browser */ }
    if (q) {
      q = q.toLowerCase();
      if (q === 'scan' || q === 'quick' || q === 'recruiter' || q === 'quick-scan') { store(false, SCAN); return SCAN; }
      if (q === 'deep' || q === 'deep-dive') { store(false, DEEP); return DEEP; }
    }
    var s = store(true);
    return s === SCAN ? SCAN : DEEP;
  }

  var mode = initialMode();
  root.setAttribute('data-view-mode', mode);
  // Hide <main> until tagging is done so scan loads never flash the long page.
  if (mode === SCAN) root.setAttribute('data-scan-pending', '');
  window.setTimeout(function () { root.removeAttribute('data-scan-pending'); }, 1500);

  /* ------------------------------------------------------ quick facts */
  // Every line restates something already on the page it summarises.
  var CASES = {
    'Study Buddy': {
      line: 'A desktop focus companion, shipped on 3 operating systems.',
      img: 'study-buddy.png',
      alt: 'Study Buddy desktop focus companion',
      metrics: [['~14 hrs', 'build time'], ['40+', 'commits'], ['3', 'OS installers']]
    },
    'SecureID': {
      line: 'One token system for a mobile ID flow and an analyst dashboard.',
      img: 'secureid.png',
      alt: 'SecureID identity verification platform',
      metrics: [['2', 'interfaces'], ['3', 'review actions'], ['4', 'personas']]
    },
    'Vextaro': {
      line: 'A luxury formalwear rental app with a fit-confirmation step.',
      img: 'vextaro.png',
      alt: 'Vextaro formalwear rental app',
      metrics: [['15/15', 'WCAG AA checks'], ['7', 'IA sections'], ['35', 'component variants']]
    },
    'Honda of Clear Lake': {
      line: 'A heuristic usability audit with a ranked fix list.',
      img: 'honda.png',
      alt: 'Honda of Clear Lake website audit',
      metrics: [['31', 'findings'], ['3', 'catastrophic'], ['10', 'heuristics']]
    }
  };

  var MAMBO_URL = 'https://ericarieldelapaz.tech/mambo-database/';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ------------------------------------------------- the one-page brief */
  // Built from the page's own content (cards, roles, links) so it can never
  // drift out of sync with the long version.
  function txt(sel, scope) {
    var n = (scope || document).querySelector(sel);
    return n ? n.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  function section(label) {
    var s = el('section', 'scan-block');
    s.appendChild(el('h2', 'scan-label', label));
    return s;
  }

  function cloneLinks(list, wrap) {
    list.forEach(function (a) {
      if ((a.getAttribute('href') || '').charAt(0) === '#') return;
      var c = a.cloneNode(true);
      c.classList.remove('sx-btn-primary');
      wrap.appendChild(c);
    });
    var first = wrap.querySelector('a');
    if (first) first.classList.add('sx-btn-primary');
  }

  function projectRow(o) {
    var li = el('li');
    var a = el('a', 'scan-work-row');
    a.href = o.href;
    if (o.external) { a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('data-cursor-label', 'Open Website'); }
    var img = el('img', 'scan-thumb-img');
    img.src = o.img; img.alt = o.alt; img.width = 160; img.height = 100; img.loading = 'lazy';
    a.appendChild(img);
    var main = el('div', 'scan-work-main');
    main.appendChild(el('h3', null, o.title));
    main.appendChild(el('p', null, o.line));
    a.appendChild(main);
    var arrow = el('span', 'scan-arrow', o.external ? '↗' : '→');
    arrow.setAttribute('aria-hidden', 'true');
    a.appendChild(arrow);
    li.appendChild(a);
    return li;
  }

  function buildBrief() {
    var brief = el('div', 'scan-brief');
    brief.setAttribute('data-scan-only', '');

    var head = el('header', 'scan-head');
    head.appendChild(el('h1', 'scan-name', txt('.info-name') || 'Eric Ariel De La Paz'));
    head.appendChild(el('p', 'scan-role', txt('.info-role') || 'Product Designer'));
    var cta = el('div', 'scan-cta');
    cloneLinks([].slice.call(document.querySelectorAll('.sx-hero .sx-cta a')), cta);
    head.appendChild(cta);
    brief.appendChild(head);

    var work = section('Selected work');
    var list = el('ul', 'scan-work');
    list.appendChild(projectRow({ title: 'Mambo Database', line: '1,480+ tested token hierarchies, font pairings and prompts.',
      img: 'assets/images/mambo-database-cover.png', alt: 'Mambo Database preview', href: MAMBO_URL, external: true }));
    [['Study Buddy', 'study-buddy'], ['SecureID', 'secureid']].forEach(function (p) {
      var c = CASES[p[0]];
      list.appendChild(projectRow({ title: p[0], line: c.line, img: 'assets/images/' + c.img, alt: c.alt, href: 'case-studies/' + p[1] + '.html' }));
    });
    work.appendChild(list);
    brief.appendChild(work);
    return brief;
  }

  /* One short page per case study: title, one line, one visual, three numbers. */
  function buildCase(name, data) {
    var box = el('article', 'scan-case');
    box.setAttribute('data-scan-only', '');
    var back = el('a', 'scan-back', '← Home');
    back.href = '../index.html';
    box.appendChild(back);
    box.appendChild(el('h1', 'scan-name', name));
    box.appendChild(el('p', 'scan-lede', data.line));
    var fig = el('figure', 'scan-figure');
    var img = el('img');
    img.src = '../assets/images/' + data.img; img.alt = data.alt; img.width = 1200; img.height = 675;
    fig.appendChild(img);
    box.appendChild(fig);
    var ul = el('ul', 'scan-metrics');
    data.metrics.forEach(function (m) {
      var li = el('li');
      li.setAttribute('data-cursor-metric', '');
      li.appendChild(el('b', null, m[0]));
      li.appendChild(el('span', null, m[1]));
      ul.appendChild(li);
    });
    box.appendChild(ul);
    var link = document.querySelector('.cs-action-row a[href^="http"]');
    if (link) {
      var cta = el('div', 'scan-cta');
      var c = link.cloneNode(true);
      c.className = 'sx-btn sx-btn-primary';
      cta.appendChild(c);
      box.appendChild(cta);
    }
    return box;
  }

  /* --------------------------------------------------------- tagging */
  // Quick Scan = quick reads, minimal images. Interactive replicas, covers and
  // long process sections are hidden; the summary card and outcomes stay.
  function deepOnly(n) { if (!n.hasAttribute('data-deep-only')) n.setAttribute('data-deep-only', ''); }

  function tagCaseStudy() {
    var main = document.querySelector('main');
    var name = document.body.getAttribute('data-case-study');
    if (!main || !name || !CASES[name] || main.querySelector('.scan-case')) return;
    [].slice.call(main.children).forEach(deepOnly);
    main.insertBefore(buildCase(name, CASES[name]), main.firstChild);
  }

  function tagSitePages() {
    document.querySelectorAll('.mini-eric-banner').forEach(deepOnly);
    var page = document.body.getAttribute('data-nav');

    if (page === 'home') {
      // The whole home page condenses into one brief.
      var wrap = document.querySelector('.sx-wrap');
      if (wrap && !document.querySelector('.scan-brief')) {
        var brief = buildBrief();
        wrap.insertBefore(brief, wrap.firstChild);
      }
      document.querySelectorAll('.sx-hero, #work, #experience, #contact, .sx-wrap > section').forEach(deepOnly);
    } else if (page === 'about') {
      // About keeps its professional summary; the personal sections are deep-dive only.
      document.querySelectorAll('.about-section').forEach(deepOnly);
    } else if (page === 'playground') {
      // Playground keeps Mambo Database only.
      document.querySelectorAll('.about-section').forEach(function (s) { if (s.id !== 'lab-ai-teaser') deepOnly(s); });
      document.querySelectorAll('#lab-ai-teaser .sb-showcase-frame').forEach(deepOnly);
    }
  }

  function tagMetrics() {
    document.querySelectorAll('.impact-stat, .featured-outcome-banner').forEach(function (n) {
      if (!n.hasAttribute('data-cursor-metric')) n.setAttribute('data-cursor-metric', '');
    });
  }

  function tagAll() {
    if (document.body.hasAttribute('data-case-study')) tagCaseStudy();
    tagSitePages();
    tagMetrics();
    var main = document.querySelector('main');
    if (main) {
      main.querySelectorAll('h1, h2').forEach(function (h) {
        if (!h.hasAttribute('data-section-anchor')) h.setAttribute('data-section-anchor', '');
      });
    }
  }

  /* ---------------------------------------------------- scroll anchor */
  function visible(n) { return n.getClientRects().length > 0; }

  function findAnchor() {
    var list = document.querySelectorAll('[data-section-anchor]');
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      if (!visible(n)) continue;
      var r = n.getBoundingClientRect();
      if (r.bottom > 0) return { node: n, top: r.top };
    }
    return null;
  }

  /* ----------------------------------------------------------- toggle */
  var toggle = null, live = null, mq = null;

  var BOLT = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg>';

  function buildToggle() {
    toggle = el('div', 'scan-toggle');
    toggle.setAttribute('role', 'group');
    toggle.setAttribute('aria-label', 'Reading mode');
    toggle.setAttribute('data-xray-ignore', '');
    toggle.appendChild(el('span', 'scan-thumb'));
    toggle.lastChild.setAttribute('aria-hidden', 'true');

    var a = el('button', 'scan-opt');
    a.type = 'button';
    a.setAttribute('data-mode', SCAN);
    a.title = 'Condensed view for a quick scan';
    a.innerHTML = BOLT + '<span>Quick Scan</span>';

    var b = el('button', 'scan-opt');
    b.type = 'button';
    b.setAttribute('data-mode', DEEP);
    b.title = 'Full case studies and process';
    b.innerHTML = '<span>Deep Dive</span>';

    toggle.appendChild(a);
    toggle.appendChild(b);
    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.scan-opt') : null;
      if (btn) setMode(btn.getAttribute('data-mode'));
    });

    live = el('div', 'scan-live');
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    document.body.appendChild(live);
  }

  // Desktop: lives in the nav pill. Under 900px the nav scrolls sideways,
  // so the toggle docks as a thumb-reachable pill at the bottom of the screen.
  function place() {
    if (!toggle) return;
    var nav = document.querySelector('.sx-nav');
    if (mq.matches && nav) {
      var info = nav.querySelector('.sx-nav-info-btn');
      toggle.setAttribute('data-placement', 'nav');
      if (toggle.parentNode !== nav) nav.insertBefore(toggle, info || null);
      document.body.classList.remove('has-scan-dock');
    } else {
      toggle.setAttribute('data-placement', 'dock');
      if (toggle.parentNode !== document.body) document.body.appendChild(toggle);
      document.body.classList.add('has-scan-dock');
    }
  }

  function syncToggle() {
    if (!toggle) return;
    toggle.setAttribute('data-mode', mode);
    toggle.querySelectorAll('.scan-opt').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === mode));
    });
  }

  /* ------------------------------------------------------- mode switch */
  function setMode(next, quiet) {
    if (next !== SCAN && next !== DEEP) return;
    if (next === mode && root.getAttribute('data-view-mode') === next) { syncToggle(); return; }

    var anchor = findAnchor();
    mode = next;
    store(false, mode);
    root.setAttribute('data-view-mode', mode);
    if (document.body) document.body.setAttribute('data-view-mode', mode);
    syncToggle();

    // Keep the reader's place: re-anchor to the same heading after reflow.
    if (anchor && visible(anchor.node)) {
      var delta = anchor.node.getBoundingClientRect().top - anchor.top;
      if (delta) window.scrollTo({ top: window.pageYOffset + delta, behavior: 'instant' });
    }

    if (!quiet) {
      root.classList.add('scan-switching');
      window.setTimeout(function () { root.classList.remove('scan-switching'); }, 360);
      if (toggle) {
        toggle.classList.remove('is-pulse');
        void toggle.offsetWidth;                  // restart the pulse
        toggle.classList.add('is-pulse');
      }
      if (live) live.textContent = mode === SCAN ? 'Quick scan view on' : 'Deep dive view on';
    }
    window.dispatchEvent(new CustomEvent('viewmodechange', { detail: { mode: mode } }));
  }

  /* --------------------------------------------------------------- init */
  function init() {
    try { tagAll(); } catch (e) { /* never block the page on tagging */ }
    document.body.setAttribute('data-view-mode', mode);

    if (document.querySelector('.sx-nav')) {       // 404 has no nav: no toggle
      mq = window.matchMedia('(min-width: 900px)');
      buildToggle();
      place();
      syncToggle();
      if (mq.addEventListener) mq.addEventListener('change', place);
      else if (mq.addListener) mq.addListener(place);
    }

    root.removeAttribute('data-scan-pending');
    window.dispatchEvent(new CustomEvent('viewmodechange', { detail: { mode: mode } }));
  }

  window.PortfolioScan = {
    setMode: function (m) { setMode(m); },
    getMode: function () { return mode; },
    toggle: function () { setMode(mode === SCAN ? DEEP : SCAN); }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

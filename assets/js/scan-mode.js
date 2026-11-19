/**
 * 30s Scan (recruiter) vs Deep Dive: a global reading-density toggle.
 *
 * Source of truth: body[data-view-mode="deep-dive" | "recruiter-scan"]
 * (mirrored on <html> so CSS can apply before <body> exists). Fires
 * window "viewmodechange" {detail:{mode}} so cursor.js can switch reticles.
 *
 * Load this file synchronously in <head> so a recruiter who arrives with
 * ?mode=scan, or who switched on the previous page, never sees a flash of
 * the long version. Works on desktop and mobile. No dependencies.
 */
(function () {
  'use strict';

  var KEY = 'eric_view_mode';
  var DEEP = 'deep-dive';
  var SCAN = 'recruiter-scan';
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
      if (q === 'scan' || q === 'recruiter' || q === 'recruiter-scan') { store(false, SCAN); return SCAN; }
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

  /* ----------------------------------------------- executive summaries */
  // Every line below restates something already on the case-study page.
  var SUMMARY = {
    'Study Buddy': {
      friction: 'I kept drifting to YouTube during my own study sessions and wanted gentle help with focus and breaks, not a screen lock.',
      fix: 'Mambo, an ambient desktop companion with focus and break timers, water reminders and one-tap postpone, designed in Figma first and built by directing AI.',
      outcome: [['~14 hrs', 'active build time'], ['40+', 'commits, every round reviewed'], ['3', 'desktop installers: Windows, Mac, Linux']]
    },
    'SecureID': {
      friction: 'My first analyst review screen showed every action at once, slowing the person reviewing edge cases, while end users needed one calm job per screen.',
      fix: 'One token system across a mobile verification flow and an analyst dashboard, with review reduced to three primary actions (Reject, Escalate, Approve) and follow-ups in overlays.',
      outcome: [['2', 'interfaces on one token system'], ['3', 'primary actions, down from every control at once'], ['4', 'personas guiding both flows']],
      note: 'Self-initiated project: the goal was a defensible process, not a shipped metric.'
    },
    'Vextaro': {
      friction: "Renters can't try garments on before they ship, so fit uncertainty blocks booking.",
      fix: 'A specialist fit-confirmation checkpoint in booking, backed by a 7-section IA, 3 annotated flows and one centralized token system.',
      outcome: [['15/15', 'WCAG 2.2 AA checks passing, 5 fixed at the token level'], ['24 → 9', 'redundant styles consolidated into master components'], ['9', 'loading, empty and error states designed']]
    },
    'Honda of Clear Lake': {
      friction: "Small violations (inconsistent navigation, unclear pricing, weak error recovery) eroded shopper trust before they reached financing.",
      fix: "A heuristic audit against Nielsen's 10 principles, with every finding severity-rated and translated into a phased engineering punch list.",
      outcome: [['31', 'findings, rated 0–4 for severity'], ['3', 'catastrophic findings, each with a fix'], ['10', 'Nielsen heuristics evaluated']]
    }
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function buildStrip(data) {
    var strip = el('section', 'scan-strip');
    strip.setAttribute('data-scan-only', '');
    strip.setAttribute('aria-label', 'Executive summary');
    var dl = el('dl', 'scan-rows');

    [['The friction', data.friction], ['The system fix', data.fix]].forEach(function (r) {
      var row = el('div', 'scan-row');
      row.appendChild(el('dt', null, r[0]));
      row.appendChild(el('dd', null, r[1]));
      dl.appendChild(row);
    });

    var out = el('div', 'scan-row scan-row-metrics');
    out.appendChild(el('dt', null, 'Outcome'));
    var dd = el('dd');
    var ul = el('ul', 'scan-metrics');
    data.outcome.forEach(function (m) {
      var li = el('li');
      li.setAttribute('data-cursor-metric', '');
      li.appendChild(el('b', null, m[0]));
      li.appendChild(el('span', null, m[1]));
      ul.appendChild(li);
    });
    dd.appendChild(ul);
    if (data.note) dd.appendChild(el('p', 'scan-note', data.note));
    out.appendChild(dd);
    dl.appendChild(out);

    strip.appendChild(dl);
    return strip;
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

  function buildBrief() {
    var brief = el('div', 'scan-brief');
    brief.setAttribute('data-scan-only', '');

    /* header */
    var head = el('header', 'scan-head');
    var status = txt('.sx-status span') || 'Open to work';
    var pill = el('p', 'scan-status');
    pill.appendChild(el('i', 'sx-dot'));
    pill.lastChild.setAttribute('aria-hidden', 'true');
    pill.appendChild(el('span', null, status));
    head.appendChild(pill);
    head.appendChild(el('h1', 'scan-name', txt('.info-name') || 'Eric Ariel De La Paz'));
    head.appendChild(el('p', 'scan-role', txt('.info-role') || 'Product Designer'));
    head.appendChild(el('p', 'scan-lede', txt('.sx-lede')));
    var cta = el('div', 'scan-cta');
    cloneLinks([].slice.call(document.querySelectorAll('.sx-hero .sx-cta a')), cta);
    head.appendChild(cta);
    brief.appendChild(head);

    /* at a glance */
    var glance = section('At a glance');
    var gl = el('ul', 'scan-glance');
    document.querySelectorAll('.sx-badges li').forEach(function (li) { gl.appendChild(el('li', null, li.textContent.trim())); });
    glance.appendChild(gl);
    brief.appendChild(glance);

    /* selected work: one row per case study */
    var work = section('Selected work');
    var list = el('ul', 'scan-work');
    document.querySelectorAll('.megan-card').forEach(function (card) {
      var link = card.querySelector('a[href*="case-studies"]');
      if (!link) return;
      var li = el('li');
      var a = el('a', 'scan-work-row');
      a.href = link.getAttribute('href');
      var left = el('div', 'scan-work-main');
      left.appendChild(el('h3', null, txt('.megan-title', card)));
      left.appendChild(el('p', null, [txt('.megan-role', card), txt('.megan-year', card)].filter(Boolean).join(' · ')));
      a.appendChild(left);
      var out = el('p', 'scan-work-out', txt('.megan-outcome-banner', card).replace(/^Outcome:\s*/i, ''));
      out.setAttribute('data-cursor-metric', '');
      a.appendChild(out);
      var arrow = el('span', 'scan-arrow', '→');
      arrow.setAttribute('aria-hidden', 'true');
      a.appendChild(arrow);
      li.appendChild(a);
      list.appendChild(li);
    });
    work.appendChild(list);
    brief.appendChild(work);

    /* experience */
    var exp = section('Experience');
    var rows = el('ul', 'scan-exp');
    document.querySelectorAll('.exp-row-card').forEach(function (card) {
      var li = el('li');
      var l = el('div');
      l.appendChild(el('h3', null, txt('.exp-role', card)));
      l.appendChild(el('p', null, txt('.exp-company', card) + ' · ' + txt('.exp-meta-line', card)));
      li.appendChild(l);
      var badge = txt('.exp-badge', card);
      if (badge) li.appendChild(el('span', 'scan-tag', badge));
      rows.appendChild(li);
    });
    exp.appendChild(rows);
    brief.appendChild(exp);

    /* strengths + side project */
    var str = section('Strengths');
    var chips = el('ul', 'scan-chips');
    document.querySelectorAll('.sx-spec-bar li > b').forEach(function (b) { chips.appendChild(el('li', null, b.textContent.trim())); });
    str.appendChild(chips);
    var mambo = document.querySelector('.sx-spec-link');
    if (mambo) {
      var m = el('p', 'scan-side');
      var ma = el('a', null, mambo.textContent.trim());
      ma.href = mambo.getAttribute('href'); ma.target = '_blank'; ma.rel = 'noopener';
      m.appendChild(ma);
      m.appendChild(document.createTextNode(': 1,480+ entry repository of tested token hierarchies, font pairings and structured prompts for production UI.'));
      str.appendChild(m);
    }
    brief.appendChild(str);

    /* contact */
    var contact = section('Get in touch');
    var c = el('div', 'scan-cta');
    cloneLinks([].slice.call(document.querySelectorAll('#contact .sx-cta a')), c);
    contact.appendChild(c);
    brief.appendChild(contact);

    return brief;
  }

  /* --------------------------------------------------------- tagging */
  // 30s Scan = quick reads, minimal images. Interactive replicas, covers and
  // long process sections are hidden; the summary card and outcomes stay.
  var KEEP_HEADING = /^(outcome|what the audit found)/i;

  function deepOnly(n) { if (!n.hasAttribute('data-deep-only')) n.setAttribute('data-deep-only', ''); }

  function tagCaseStudy() {
    document.querySelectorAll('.cs-body .cs-section').forEach(function (sec) {
      var h = sec.querySelector('h2');
      if (!(h && KEEP_HEADING.test(h.textContent.trim()))) deepOnly(sec);
    });
    document.querySelectorAll('.sx-cover-top, .cs-hero .impact-grid').forEach(deepOnly);

    var hero = document.querySelector('.cs-hero');
    var name = document.body.getAttribute('data-case-study');
    if (hero && name && SUMMARY[name] && !document.querySelector('.scan-strip')) {
      hero.parentNode.insertBefore(buildStrip(SUMMARY[name]), hero.nextSibling);
    }
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
      document.querySelectorAll('.sx-hero, #work, #experience, #contact').forEach(deepOnly);
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
    document.querySelectorAll('.impact-stat, .megan-outcome-banner').forEach(function (n) {
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
    a.innerHTML = BOLT + '<span>30s Scan</span>';

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
      var sep = nav.querySelector('.sx-nav-sep');
      toggle.setAttribute('data-placement', 'nav');
      if (toggle.parentNode !== nav) nav.insertBefore(toggle, sep || null);
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
      if (live) live.textContent = mode === SCAN ? '30 second scan view on' : 'Deep dive view on';
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

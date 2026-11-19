/**
 * Multi-state precision cursor + gold-leaf card illumination.
 *
 * Mode is read from <body data-portfolio-mode="deep-dive|recruiter-scan|xray">
 * (body.xray-mode is honoured as an alias). Public API: window.PortfolioCursor.
 *
 * Layer 1 (core)  : written straight from pointermove, zero smoothing.
 * Layer 2 (ring)  : rAF lerp at 0.18, only runs while it is still catching up.
 * Gold leaf       : --mouse-x / --mouse-y written in one rAF batch, reads first.
 */
(function () {
  'use strict';

  var QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)';
  var MODES = ['deep-dive', 'recruiter-scan', 'xray'];
  var LERP = 0.18;
  var LEAF_RADIUS = 260;

  var SEL = {
    interactive: 'a, button:not(:disabled), [role="button"]:not([aria-disabled="true"]), summary, .interactive-target',
    metric: '[data-metric], [data-cursor-metric], .impact-card, .before-after-card',
    ignore: '[data-xray-ignore]',
    native: 'input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="file"]):not([type="color"]):not([type="image"]), textarea, select, [contenteditable=""], [contenteditable="true"], iframe, embed, object, video[controls], audio[controls]',
    card: '.gold-card, .case-study-card, .megan-card'
  };

  var mq = window.matchMedia(QUERY);
  var reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var root, ring, core, hud, hudRefs;
  var built = false, visible = false, pressed = false;
  var mx = 0, my = 0, rx = 0, ry = 0;
  var rafRing = 0, rafLeaf = 0, rafHud = 0;
  var mode = 'deep-dive', hover = 'none', lastTarget = null;
  var hudW = 0, hudH = 0, hudTarget = null;
  var cards = new Set(), lit = new Set(), io = null, bodyObserver = null;
  var colorCache = {}, canvasCtx = null;

  /* ------------------------------------------------------------ build */
  function build() {
    if (built || !document.body) return;
    built = true;

    root = document.createElement('div');
    root.className = 'pc';
    root.setAttribute('aria-hidden', 'true');
    root.dataset.hover = 'none';
    root.dataset.visible = 'false';
    root.dataset.pressed = 'false';
    root.innerHTML =
      '<div class="pc-ring"><span class="pc-ring-shape"></span><span class="pc-ticks"></span><span class="pc-brackets"></span></div>' +
      '<div class="pc-core">' +
        '<span class="pc-dot"></span>' +
        '<svg class="pc-cross" viewBox="0 0 24 24" focusable="false">' +
          '<path class="case" d="M2 12H22M12 2V22M4 10V14M20 10V14M10 4H14M10 20H14"/>' +
          '<path class="gold" d="M2 12H22M12 2V22M4 10V14M20 10V14M10 4H14M10 20H14"/>' +
        '</svg>' +
        '<div class="pc-hud" data-flip-x="false" data-flip-y="false">' +
          '<div class="hud-sel"></div>' +
          '<div class="hud-row hud-size"></div>' +
          '<div class="hud-row hud-fg"><i class="hud-sw"></i><span></span></div>' +
          '<div class="hud-row hud-bg"><i class="hud-sw"></i><span></span></div>' +
          '<div class="hud-row hud-contrast"></div>' +
          '<div class="hud-row hud-dim hud-font"></div>' +
          '<div class="hud-row hud-dim hud-space"></div>' +
          '<div class="hud-row hud-dim hud-extra"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(root);

    ring = root.querySelector('.pc-ring');
    core = root.querySelector('.pc-core');
    hud = root.querySelector('.pc-hud');
    hudRefs = {
      sel: hud.querySelector('.hud-sel'),
      size: hud.querySelector('.hud-size'),
      fgSw: hud.querySelector('.hud-fg .hud-sw'),
      fgTx: hud.querySelector('.hud-fg span'),
      bgSw: hud.querySelector('.hud-bg .hud-sw'),
      bgTx: hud.querySelector('.hud-bg span'),
      contrast: hud.querySelector('.hud-contrast'),
      font: hud.querySelector('.hud-font'),
      space: hud.querySelector('.hud-space'),
      extra: hud.querySelector('.hud-extra')
    };

    document.documentElement.classList.add('pc-active');
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    document.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointercancel', onUp, { passive: true });
    window.addEventListener('blur', hide);
    window.addEventListener('viewmodechange', syncMode);
    window.addEventListener('scroll', scheduleLeaf, { passive: true });
    window.addEventListener('resize', scheduleLeaf, { passive: true });

    observeBody();
    observeCards();
    syncMode();
  }

  function destroy() {
    if (!built) return;
    built = false;
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerover', onOver);
    document.removeEventListener('pointerout', onOut);
    document.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointercancel', onUp);
    window.removeEventListener('blur', hide);
    window.removeEventListener('viewmodechange', syncMode);
    window.removeEventListener('scroll', scheduleLeaf);
    window.removeEventListener('resize', scheduleLeaf);
    if (bodyObserver) { bodyObserver.disconnect(); bodyObserver = null; }
    if (io) { io.disconnect(); io = null; }
    cancelAnimationFrame(rafRing); cancelAnimationFrame(rafLeaf); cancelAnimationFrame(rafHud);
    rafRing = rafLeaf = rafHud = 0;
    clearLeaf();
    cards.clear();
    document.documentElement.classList.remove('pc-active');
    if (root && root.parentNode) root.parentNode.removeChild(root);
    root = null; visible = false; lastTarget = null; hudTarget = null;
  }

  /* ------------------------------------------------------------- mode */
  function readMode() {
    var b = document.body;
    var m = b.getAttribute('data-portfolio-mode');
    if (b.classList.contains('xray-mode') || m === 'xray') return 'xray';
    // scan-mode.js owns data-view-mode when present (body, or <html> before body exists)
    var v = b.getAttribute('data-view-mode') || document.documentElement.getAttribute('data-view-mode');
    if (v === 'recruiter-scan' || v === 'deep-dive') return v;
    return MODES.indexOf(m) > -1 ? m : 'deep-dive';
  }

  // Keeps the attribute and the .xray-mode alias in agreement without looping.
  function syncMode() {
    if (!built) return;
    var b = document.body;
    var next = readMode();
    if (b.getAttribute('data-portfolio-mode') !== next) b.setAttribute('data-portfolio-mode', next);
    var wantsClass = next === 'xray';
    if (b.classList.contains('xray-mode') !== wantsClass) b.classList.toggle('xray-mode', wantsClass);
    if (next === mode && root.dataset.mode === next) return;
    mode = next;
    root.dataset.mode = mode;
    if (mode !== 'xray') hudTarget = null;
    if (mode === 'xray') clearLeaf();
    if (lastTarget) updateHover(lastTarget); else setHover('none');
    scheduleLeaf();
  }

  function observeBody() {
    bodyObserver = new MutationObserver(syncMode);
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['data-portfolio-mode', 'data-view-mode', 'class'] });
  }

  /* ------------------------------------------------------ pointer events */
  function isPointer(e) { return e.pointerType !== 'touch'; }

  function onMove(e) {
    if (!isPointer(e)) return;
    mx = e.clientX; my = e.clientY;
    core.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';   // Layer 1: exact
    if (!visible) {
      visible = true;
      rx = mx; ry = my;                                                  // no sweep from 0,0
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      root.dataset.visible = 'true';
    }
    if (!rafRing) rafRing = requestAnimationFrame(tickRing);
    if (mode === 'xray' && hover === 'inspect') placeHud();
    scheduleLeaf();
  }

  function onOver(e) {
    if (!isPointer(e) || !(e.target instanceof Element)) return;
    lastTarget = e.target;
    updateHover(e.target);
  }

  function onOut(e) { if (!e.relatedTarget) hide(); }

  function onDown(e) { if (isPointer(e)) { pressed = true; root.dataset.pressed = 'true'; } }
  function onUp() { pressed = false; if (root) root.dataset.pressed = 'false'; }

  function hide() {
    if (!root) return;
    visible = false;
    root.dataset.visible = 'false';
    clearLeaf();
  }

  function setHover(kind) {
    if (hover === kind) return;
    hover = kind;
    root.dataset.hover = kind;
  }

  function updateHover(t) {
    if (!root || !t || !t.closest) return;
    var kind = 'none';
    if (t.closest(SEL.native)) kind = 'native';
    else if (t.closest(SEL.ignore)) kind = 'none';
    else if (mode === 'xray') {
      var X = window.PortfolioXray;
      kind = (X && X.isCanvas ? X.isCanvas(t) : (t === document.body || t === document.documentElement)) ? 'none' : 'inspect';
    }
    else if (mode === 'recruiter-scan' && t.closest(SEL.metric)) kind = 'metric';
    else if (t.closest(SEL.interactive)) kind = 'interactive';
    setHover(kind);
    setGround(t);
    if (kind === 'inspect') { hudTarget = t; if (!rafHud) rafHud = requestAnimationFrame(renderHud); }
  }

  // Accent colours need a lighter shade on dark replicas to hold 3:1.
  function setGround(t) {
    if (mode === 'xray') return;
    var g = lum(resolveBg(t)) < 0.18 ? 'dark' : 'light';
    if (root.dataset.ground !== g) root.dataset.ground = g;
  }

  /* ------------------------------------------- Layer 2: ring lerp (rAF) */
  function tickRing() {
    rafRing = 0;
    var k = reduceMq.matches ? 1 : LERP;
    rx += (mx - rx) * k;
    ry += (my - ry) * k;
    if (Math.abs(mx - rx) < 0.05 && Math.abs(my - ry) < 0.05) { rx = mx; ry = my; }
    ring.style.transform = 'translate3d(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px,0)';
    if (rx !== mx || ry !== my) rafRing = requestAnimationFrame(tickRing);
  }

  /* ------------------------------------------------- Gold-leaf borders */
  function observeCards() {
    if (!('IntersectionObserver' in window)) return;
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) cards.add(en.target);
        else { cards.delete(en.target); unlight(en.target); }
      });
      scheduleLeaf();
    }, { rootMargin: LEAF_RADIUS + 'px' });
    document.querySelectorAll(SEL.card).forEach(function (c) { io.observe(c); });
  }

  function unlight(card) {
    if (!lit.has(card)) return;
    lit.delete(card);
    card.style.setProperty('--leaf-o', '0');
  }
  function clearLeaf() { lit.forEach(function (c) { c.style.setProperty('--leaf-o', '0'); }); lit.clear(); }

  function scheduleLeaf() {
    if (!rafLeaf && built) rafLeaf = requestAnimationFrame(leafFrame);
  }

  function leafFrame() {
    rafLeaf = 0;
    if (!visible || mode === 'xray') { clearLeaf(); return; }
    var rects = [];
    cards.forEach(function (card) { rects.push([card, card.getBoundingClientRect()]); });   // all reads
    rects.forEach(function (pair) {                                                          // then all writes
      var card = pair[0], r = pair[1];
      var dx = Math.max(r.left - mx, 0, mx - r.right);
      var dy = Math.max(r.top - my, 0, my - r.bottom);
      if (Math.sqrt(dx * dx + dy * dy) <= LEAF_RADIUS) {
        card.style.setProperty('--mouse-x', (mx - r.left).toFixed(1) + 'px');
        card.style.setProperty('--mouse-y', (my - r.top).toFixed(1) + 'px');
        if (!lit.has(card)) { lit.add(card); card.style.setProperty('--leaf-o', '1'); }
      } else {
        unlight(card);
      }
    });
  }

  /* ------------------------------------------------------ X-Ray HUD */
  function toRGBA(css) {
    if (colorCache[css]) return colorCache[css];
    if (!canvasCtx) {
      var c = document.createElement('canvas');
      c.width = c.height = 1;
      canvasCtx = c.getContext('2d', { willReadFrequently: true });
    }
    canvasCtx.clearRect(0, 0, 1, 1);
    canvasCtx.fillStyle = '#000';
    canvasCtx.fillStyle = css;           // invalid values are ignored by the canvas
    canvasCtx.fillRect(0, 0, 1, 1);
    var d = canvasCtx.getImageData(0, 0, 1, 1).data;
    var out = { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    colorCache[css] = out;
    return out;
  }
  function over(top, bottom) {
    var a = top.a + bottom.a * (1 - top.a);
    if (!a) return { r: 255, g: 255, b: 255, a: 1 };
    return {
      r: (top.r * top.a + bottom.r * bottom.a * (1 - top.a)) / a,
      g: (top.g * top.a + bottom.g * bottom.a * (1 - top.a)) / a,
      b: (top.b * top.a + bottom.b * bottom.a * (1 - top.a)) / a,
      a: a
    };
  }
  function resolveBg(el) {
    var stack = [];
    for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
      var c = toRGBA(getComputedStyle(n).backgroundColor);
      if (c.a > 0) { stack.push(c); if (c.a >= 1) break; }
    }
    var base = { r: 255, g: 255, b: 255, a: 1 };
    for (var i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  }
  function lum(c) {
    function ch(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  }
  function ratio(a, b) {
    var l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function hex(c) {
    return '#' + [c.r, c.g, c.b].map(function (v) {
      return ('0' + Math.round(v).toString(16)).slice(-2);
    }).join('').toUpperCase();
  }
  function hasOwnText(el) {
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    }
    return false;
  }
  function label(el) {
    var s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    var cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean) : [];
    if (cls.length) s += '.' + cls.slice(0, 2).join('.');
    return s;
  }

  function box4(a) { return a.map(function (n) { return Math.round(n * 10) / 10; }).join(' '); }

  function renderHud() {
    rafHud = 0;
    var el = hudTarget;
    if (!el || !hudRefs || !el.isConnected) return;
    var spec = window.PortfolioXray && window.PortfolioXray.getSpec ? window.PortfolioXray.getSpec(el) : null;

    if (spec) {
      // Pre-X-Ray values captured before the blueprint theme changed any colours.
      if (!flashing) hudRefs.sel.textContent = spec.name;
      hudRefs.size.textContent = Math.round(spec.w) + ' × ' + Math.round(spec.h) + ' px';
      hudRefs.fgSw.style.background = spec.fg;
      hudRefs.fgTx.textContent = 'text ' + spec.fg;
      hudRefs.bgSw.style.background = spec.bg;
      hudRefs.bgTx.textContent = 'surface ' + spec.bg;
      var good = spec.badge !== 'Fail';
      hudRefs.contrast.className = 'hud-row ' + (good ? 'hud-ok' : 'hud-bad');
      hudRefs.contrast.textContent = spec.ratio.toFixed(2) + ':1 • ' + (spec.badge === 'Fail' ? 'Below AA' : 'WCAG ' + spec.badge);
      hudRefs.font.textContent = spec.hasText
        ? spec.font.family + ' • ' + spec.font.size + '/' + spec.font.lh + ' • ' + spec.font.weight
        : 'no text node';
      hudRefs.space.textContent = 'pad ' + box4(spec.pad) + ' • mar ' + box4(spec.mar);
      hudRefs.extra.textContent = 'gap ' + spec.gap + ' • r ' + spec.radius + (spec.token ? ' • ' + spec.token : '');
    } else {
      var cs = getComputedStyle(el);
      var rect = el.getBoundingClientRect();
      var fg = toRGBA(cs.color);
      var bg = resolveBg(el);
      var fgOver = over(fg, bg);
      if (!flashing) hudRefs.sel.textContent = label(el);
      hudRefs.size.textContent = Math.round(rect.width) + ' × ' + Math.round(rect.height) + ' px';
      hudRefs.fgSw.style.background = hex(fgOver);
      hudRefs.fgTx.textContent = 'fg ' + hex(fgOver);
      hudRefs.bgSw.style.background = hex(bg);
      hudRefs.bgTx.textContent = 'bg ' + hex(bg);
      hudRefs.space.textContent = '';
      hudRefs.extra.textContent = '';
      if (hasOwnText(el)) {
        var r = ratio(fgOver, bg);
        var px = parseFloat(cs.fontSize);
        var large = px >= 24 || (px >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
        var need = large ? 3 : 4.5;
        var ok = r >= need;
        hudRefs.contrast.className = 'hud-row ' + (ok ? 'hud-ok' : 'hud-bad');
        hudRefs.contrast.textContent = r.toFixed(2) + ':1  AA ' + (ok ? 'pass' : 'fail') + ' (≥' + need + ')';
        hudRefs.font.textContent = cs.fontFamily.split(',')[0].replace(/["']/g, '') + ' ' + Math.round(px) + '/' + cs.fontWeight;
      } else {
        hudRefs.contrast.className = 'hud-row hud-dim';
        hudRefs.contrast.textContent = 'no text node';
        hudRefs.font.textContent = 'radius ' + (cs.borderTopLeftRadius || '0px');
      }
    }
    hudW = hud.offsetWidth; hudH = hud.offsetHeight;
    placeHud();
  }

  // Brief confirmation in the HUD header after click-to-copy.
  var flashing = false, flashTimer = 0;
  function flash(text) {
    if (!hudRefs) return;
    flashing = true;
    hudRefs.sel.textContent = text;
    window.clearTimeout(flashTimer);
    flashTimer = window.setTimeout(function () { flashing = false; if (hudTarget && !rafHud) rafHud = requestAnimationFrame(renderHud); }, 1200);
  }

  // Keeps the +16/+16 quadrant unless it would leave the viewport.
  function placeHud() {
    if (!hudW) { hudW = hud.offsetWidth; hudH = hud.offsetHeight; }
    var fx = mx + 16 + hudW > window.innerWidth - 8;
    var fy = my + 16 + hudH > window.innerHeight - 8;
    if ((hud.dataset.flipX === 'true') !== fx) hud.dataset.flipX = String(fx);
    if ((hud.dataset.flipY === 'true') !== fy) hud.dataset.flipY = String(fy);
  }

  /* ------------------------------------------------------- lifecycle */
  function sync() {
    if (mq.matches) build(); else destroy();
  }

  function init() {
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
  }

  window.PortfolioCursor = {
    setMode: function (m) {
      if (MODES.indexOf(m) === -1) return;
      var b = document.body, X = window.PortfolioXray, S = window.PortfolioScan;
      if (m === 'xray') {
        if (X) X.setActive(true);
        else { b.setAttribute('data-portfolio-mode', 'xray'); b.classList.add('xray-mode'); }
      } else {
        if (X && X.isActive()) X.setActive(false);
        else { b.classList.remove('xray-mode'); if (b.getAttribute('data-portfolio-mode') === 'xray') b.setAttribute('data-portfolio-mode', m); }
        if (S) S.setMode(m); else b.setAttribute('data-portfolio-mode', m);
      }
      syncMode();
    },
    flash: flash,
    getMode: function () { return built ? mode : readMode(); },
    refreshCards: function () {
      if (!io) return;
      document.querySelectorAll(SEL.card).forEach(function (c) { io.observe(c); });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/**
 * X-Ray dev-mode inspector (desktop fine-pointer only).
 *
 * Toggle -> body.xray-mode (obsidian blueprint). The crosshair and spec HUD
 * are rendered by cursor.js; this file owns:
 *   - the nav toggle pill
 *   - the PRE-X-Ray style snapshot (taken the instant before the class is
 *     added, so colours/contrast describe the real design system)
 *   - the box-model highlighter overlay
 *   - click-to-copy, Escape to exit, auto-exit below 900px
 *
 * Public API: window.PortfolioXray { setActive, isActive, getSpec }
 */
(function () {
  'use strict';

  var QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)';
  var mq = window.matchMedia(QUERY);
  var active = false, built = false;
  var pill = null, overlay = null, parts = null;
  var snap = new WeakMap();
  var target = null, rafOv = 0, lastX = 0, lastY = 0, animTimer = 0;
  var ctx = null, colorCache = {};

  var SKIP = /^(SCRIPT|STYLE|LINK|META|NOSCRIPT|BR|HEAD|TITLE|PATH|CIRCLE|RECT|LINE|POLYLINE|POLYGON|G|DEFS|USE)$/i;
  var IGNORE = '[data-xray-ignore], .pc, .xr-ov';

  /* ------------------------------------------------------------ colour */
  function rgba(css) {
    if (colorCache[css]) return colorCache[css];
    if (!ctx) {
      var c = document.createElement('canvas');
      c.width = c.height = 1;
      ctx = c.getContext('2d', { willReadFrequently: true });
    }
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = css;                       // understands rgb(), color(srgb ...), color-mix results
    ctx.fillRect(0, 0, 1, 1);
    var d = ctx.getImageData(0, 0, 1, 1).data;
    return (colorCache[css] = { r: d[0], g: d[1], b: d[2], a: d[3] / 255 });
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
  function hex(c) {
    return '#' + [c.r, c.g, c.b].map(function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); }).join('').toUpperCase();
  }
  function lum(c) {
    function ch(v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b);
  }
  function ratio(a, b) {
    var l1 = lum(a), l2 = lum(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  // Effective surface: composite every translucent ancestor over white (the page default).
  function surface(el) {
    var stack = [];
    for (var n = el; n && n.nodeType === 1; n = n.parentElement) {
      var c = rgba(getComputedStyle(n).backgroundColor);
      if (c.a > 0) { stack.push(c); if (c.a >= 1) break; }
    }
    var base = { r: 255, g: 255, b: 255, a: 1 };
    for (var i = stack.length - 1; i >= 0; i--) base = over(stack[i], base);
    return base;
  }

  /* ---------------------------------------------------------- snapshot */
  function px(v) { var n = parseFloat(v); return isNaN(n) ? 0 : n; }
  function four(cs, p) { return ['Top', 'Right', 'Bottom', 'Left'].map(function (s) { return px(cs[p + s]); }); }

  function tokenOf(el, cs) {
    var t = el.getAttribute('data-token');
    if (t) return t;
    return '';
  }

  function nameOf(el) {
    var comp = el.getAttribute('data-component');
    if (comp) return comp;
    var s = el.tagName.toLowerCase();
    var cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).filter(Boolean) : [];
    return cls.length ? s + '.' + cls[0] : s;
  }

  function capture(el) {
    var cs = getComputedStyle(el);
    var bg = surface(el);
    var fg = over(rgba(cs.color), bg);
    var size = px(cs.fontSize), weight = parseInt(cs.fontWeight, 10) || 400;
    var lh = cs.lineHeight === 'normal' ? 'normal' : Math.round(px(cs.lineHeight) * 10) / 10 + 'px';
    var data = {
      name: nameOf(el),
      fg: hex(fg), bg: hex(bg),
      ratio: ratio(fg, bg),
      size: size, weight: weight,
      font: {
        family: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(),
        size: Math.round(size * 10) / 10 + 'px',
        lh: lh,
        weight: weight,
        ls: cs.letterSpacing
      },
      pad: four(cs, 'padding'),
      mar: four(cs, 'margin'),
      gap: cs.rowGap && cs.rowGap !== 'normal' ? cs.rowGap : '0px',
      radius: cs.borderTopLeftRadius || '0px',
      token: tokenOf(el, cs),
      component: el.getAttribute('data-component') || ''
    };
    snap.set(el, data);
    return data;
  }

  function hasText(el) {
    for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim()) return true;
    return false;
  }

  // Everything on screen, captured BEFORE body.xray-mode changes a single colour.
  function snapshotAll() {
    var list = document.body.querySelectorAll('*');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (SKIP.test(el.tagName) || el.closest('.pc, .xr-ov')) continue;
      if (!el.getClientRects().length) continue;
      capture(el);
    }
  }

  function badge(r, large, text) {
    if (!text) return r >= 3 ? 'Large/UI' : 'Fail';
    if (large ? r >= 4.5 : r >= 7) return 'AAA';
    if (large ? r >= 3 : r >= 4.5) return 'AA';
    return r >= 3 ? 'Large/UI' : 'Fail';
  }

  function getSpec(el) {
    if (!el || el.nodeType !== 1) return null;
    var d = snap.get(el) || capture(el);   // nodes added after activation: best effort (live styles)
    var rect = el.getBoundingClientRect();
    var text = hasText(el);
    var large = d.size >= 24 || (d.size >= 18.66 && d.weight >= 700);
    var b = badge(d.ratio, large, text);
    return {
      name: d.name, w: rect.width, h: rect.height,
      fg: d.fg, bg: d.bg, ratio: d.ratio, badge: b, hasText: text,
      font: d.font, pad: d.pad, mar: d.mar, gap: d.gap, radius: d.radius, token: d.token
    };
  }

  function summary(el) {
    var s = getSpec(el);
    if (!s) return '';
    var r = Math.round;
    var lines = [
      s.name + ' (' + r(s.w) + 'x' + r(s.h) + 'px)',
      'color: ' + s.fg + ';  background: ' + s.bg + ';  /* ' + s.ratio.toFixed(2) + ':1 ' + s.badge + ' */'
    ];
    if (s.hasText) lines.push('font: ' + s.font.weight + ' ' + s.font.size + '/' + s.font.lh + ' ' + s.font.family + ';  letter-spacing: ' + s.font.ls + ';');
    lines.push('padding: ' + s.pad.map(function (n) { return n + 'px'; }).join(' ') + ';  margin: ' + s.mar.map(function (n) { return n + 'px'; }).join(' ') + ';');
    lines.push('gap: ' + s.gap + ';  border-radius: ' + s.radius + ';' + (s.token ? '  /* ' + s.token + ' */' : ''));
    return lines.join('\n');
  }

  /* ---------------------------------------------- box-model highlighter */
  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'xr-ov';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = '<div class="xr-m"></div><div class="xr-p"></div><div class="xr-b"></div>';
    document.body.appendChild(overlay);
    parts = { m: overlay.children[0], p: overlay.children[1], b: overlay.children[2] };
  }

  function place(node, l, t, w, h, widths) {
    var st = node.style;
    st.left = l + 'px'; st.top = t + 'px'; st.width = Math.max(w, 0) + 'px'; st.height = Math.max(h, 0) + 'px';
    if (widths) st.borderWidth = widths.map(function (n) { return Math.max(n, 0) + 'px'; }).join(' ');
  }

  var lastKey = '';

  // Runs every frame while an element is hovered, so the overlay follows
  // hover transitions (cards lift), scroll and resize without drifting.
  function drawOverlay() {
    rafOv = 0;
    if (!active || !overlay) return;
    var el = target;
    if (!el || !el.isConnected || isCanvas(el)) { overlay.dataset.on = 'false'; lastKey = ''; return; }
    var r = el.getBoundingClientRect();
    var cs = getComputedStyle(el);
    var m = four(cs, 'margin'), p = four(cs, 'padding'), b = four(cs, 'border');
    m = m.map(function (n) { return Math.max(n, 0); });
    rafOv = requestAnimationFrame(drawOverlay);
    var key = [r.left, r.top, r.width, r.height].concat(m, p, b).join(',');
    if (key === lastKey && overlay.dataset.on === 'true') return;
    lastKey = key;
    // margin ring: sits outside the border box
    place(parts.m, r.left - m[3], r.top - m[0], r.width + m[1] + m[3], r.height + m[0] + m[2], m);
    // border box
    place(parts.b, r.left, r.top, r.width, r.height, null);
    // padding ring: inside the border, widths = padding
    place(parts.p, r.left + b[3], r.top + b[0], r.width - b[1] - b[3], r.height - b[0] - b[2], p);
    overlay.dataset.on = 'true';
  }
  function schedule() { if (!rafOv && active) rafOv = requestAnimationFrame(drawOverlay); }

  /* ----------------------------------------------------------- events */
  function ignored(t) { return !t || !t.closest || !!t.closest(IGNORE); }

  // The page canvas (gutters / layout wrappers): nothing to inspect there.
  function isCanvas(el) {
    return el === document.body || el === document.documentElement || el.matches('main, .sx-main, .sx-wrap');
  }

  function onOver(e) {
    if (!active) return;
    var t = e.target;
    if (!(t instanceof Element)) return;
    target = (ignored(t) || isCanvas(t)) ? null : t;
    lastKey = '';
    schedule();
  }
  function onMove(e) { lastX = e.clientX; lastY = e.clientY; }
  function onOut(e) { if (!e.relatedTarget) { target = null; schedule(); } }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).catch(function () { legacyCopy(text); });
    }
    legacyCopy(text);
    return Promise.resolve();
  }
  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* nothing more to try */ }
    document.body.removeChild(ta);
  }

  function onClick(e) {
    if (!active || !e.isTrusted) return;            // let automated replica demos run untouched
    var t = e.target;
    if (!(t instanceof Element) || ignored(t)) return;
    if (isCanvas(t)) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    var text = summary(t);
    copyText(text);
    if (window.PortfolioCursor && window.PortfolioCursor.flash) window.PortfolioCursor.flash('COPIED');
    document.dispatchEvent(new CustomEvent('xraycopy', { detail: { text: text } }));
  }

  function onKey(e) { if (e.key === 'Escape' && active) setActive(false); }

  /* ------------------------------------------------------ toggle pill */
  function buildPill() {
    pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'xr-pill';
    pill.setAttribute('data-xray-ignore', '');
    pill.setAttribute('aria-pressed', 'false');
    pill.title = 'Toggle X-Ray inspector (Esc to exit)';
    pill.innerHTML = '<i class="xr-dot" aria-hidden="true"></i><span>X-Ray</span><span class="xr-sr"> off</span>';
    pill.addEventListener('click', function () { setActive(!active); });
    var nav = document.querySelector('.sx-nav');
    if (!nav) { pill = null; return; }
    var sep = nav.querySelector('.sx-nav-sep');
    nav.insertBefore(pill, sep || null);
  }

  function syncPill() {
    if (!pill) return;
    pill.setAttribute('aria-pressed', String(active));
    pill.querySelector('.xr-sr').textContent = active ? ' on' : ' off';
  }

  /* --------------------------------------------------------- activate */
  function animate() {
    var root = document.documentElement;
    root.classList.add('xr-anim');
    window.clearTimeout(animTimer);
    animTimer = window.setTimeout(function () { root.classList.remove('xr-anim'); }, 420);
  }

  function setActive(on) {
    on = !!on && mq.matches && built;
    if (on === active) return;
    var b = document.body;
    if (on) {
      snapshotAll();                                 // 1) capture real colours first
      animate();
      active = true;
      b.classList.add('xray-mode');                  // 2) only then transform the page
      b.setAttribute('data-portfolio-mode', 'xray');
      document.addEventListener('pointerover', onOver, true);
      document.addEventListener('pointermove', onMove, { passive: true, capture: true });
      document.addEventListener('pointerout', onOut, true);
      document.addEventListener('click', onClick, true);
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    } else {
      animate();
      active = false;
      b.classList.remove('xray-mode');
      if (b.getAttribute('data-portfolio-mode') === 'xray') {
        b.setAttribute('data-portfolio-mode', b.getAttribute('data-view-mode') === 'recruiter-scan' ? 'recruiter-scan' : 'deep-dive');
      }
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointermove', onMove, { capture: true });
      document.removeEventListener('pointerout', onOut, true);
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      target = null;
      if (overlay) overlay.dataset.on = 'false';
    }
    syncPill();
    schedule();
  }

  /* ---------------------------------------------------------- lifecycle */
  function build() {
    if (built || !document.body) return;
    built = true;
    buildPill();
    buildOverlay();
    document.addEventListener('keydown', onKey);
  }

  function destroy() {
    if (active) setActive(false);
    if (!built) return;
    built = false;
    document.removeEventListener('keydown', onKey);
    if (pill && pill.parentNode) pill.parentNode.removeChild(pill);
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    pill = overlay = parts = null;
  }

  function sync() { if (mq.matches) build(); else destroy(); }

  function init() {
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else if (mq.addListener) mq.addListener(sync);
  }

  window.PortfolioXray = {
    setActive: setActive,
    isActive: function () { return active; },
    getSpec: getSpec,
    isCanvas: isCanvas
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

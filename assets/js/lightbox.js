/**
 * In-page image / video viewer.
 *
 * Click an image (or a video without native controls) in a case study to see
 * it larger in a centred panel. The panel never fills the page (32px margin all
 * round), closes with the X, a click outside the panel, or Esc, and never opens
 * the file in another tab. Links that wrap an image file (a.cs-zoom) are
 * intercepted and shown in the same viewer.
 */
(function () {
  'use strict';

  var SKIP = '.info-avatar, .mini-eric-img, .mini-eric-banner, .sx-nav, .sx-info-popover, .pc, .stageshow-mount, [class*="stageshow"], .scan-thumb-img, .sx-portrait, .lb';
  var IMG_RE = /\.(png|jpe?g|gif|webp|avif|svg)(\?|#|$)/i;
  var VID_RE = /\.(mp4|webm|mov|m4v)(\?|#|$)/i;
  var lb = null, panel = null, closeBtn = null, stage = null, cap = null, opener = null, lockPad = '';

  function build() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'lb';
    lb.hidden = true;
    lb.innerHTML =
      '<div class="lb-panel" role="dialog" aria-modal="true" aria-label="Enlarged media">' +
        '<button type="button" class="lb-close" aria-label="Close enlarged view">' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>' +
        '</button>' +
        '<div class="lb-stage"></div>' +
        '<p class="lb-cap"></p>' +
      '</div>';
    document.body.appendChild(lb);
    panel = lb.querySelector('.lb-panel');
    closeBtn = lb.querySelector('.lb-close');
    stage = lb.querySelector('.lb-stage');
    cap = lb.querySelector('.lb-cap');

    closeBtn.addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (!panel.contains(e.target)) close(); });   // click outside the panel
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); }                   // close button is the only stop
    });
  }

  function open(kind, src, label, from) {
    build();
    opener = from || null;
    stage.textContent = '';
    var node;
    if (kind === 'video') {
      node = document.createElement('video');
      node.src = src; node.controls = true; node.playsInline = true; node.autoplay = true;
    } else {
      node = document.createElement('img');
      node.src = src; node.alt = label || '';
    }
    stage.appendChild(node);
    cap.textContent = label || '';
    cap.hidden = !label;
    var sw = window.innerWidth - document.documentElement.clientWidth;      // no layout jump when the scrollbar goes
    lockPad = document.body.style.paddingRight;
    if (sw > 0) document.body.style.paddingRight = sw + 'px';
    document.documentElement.classList.add('lb-open');
    lb.hidden = false;
    void lb.offsetWidth;
    lb.classList.add('is-on');
    closeBtn.focus({ preventScroll: true });
  }

  function close() {
    if (!lb || lb.hidden) return;
    lb.classList.remove('is-on');
    lb.hidden = true;
    var v = stage.querySelector('video'); if (v) v.pause();
    stage.textContent = '';
    document.documentElement.classList.remove('lb-open');
    document.body.style.paddingRight = lockPad;
    if (opener && opener.focus) opener.focus({ preventScroll: true });
    opener = null;
  }

  function xray() { return document.body.classList.contains('xray-mode'); }

  /* What counts as zoomable */
  function zoomTarget(t) {
    if (!(t instanceof Element)) return null;
    var link = t.closest('a.cs-zoom, a[href]');
    if (link && !link.closest('.lb')) {
      var href = link.getAttribute('href') || '';
      if (link.classList.contains('cs-zoom') || IMG_RE.test(href) || VID_RE.test(href)) {
        return { el: link, kind: VID_RE.test(href) ? 'video' : 'image', src: link.href, label: (link.querySelector('img') || {}).alt || link.getAttribute('title') || '' };
      }
      return null;                                          // an ordinary navigation link wrapping an image
    }
    var m = t.closest('main img, main video');
    if (!m || m.closest(SKIP)) return null;
    if (m.tagName === 'VIDEO') {
      if (m.hasAttribute('controls')) return null;          // native controls own the clicks
      return { el: m, kind: 'video', src: m.currentSrc || m.src, label: m.getAttribute('aria-label') || '' };
    }
    if (m.naturalWidth && m.naturalWidth < 96) return null;  // icons
    return { el: m, kind: 'image', src: m.currentSrc || m.src, label: m.alt || '' };
  }

  function decorate(root) {
    (root || document).querySelectorAll('main img, main a.cs-zoom').forEach(function (n) {
      var z = zoomTarget(n);
      if (!z || n.hasAttribute('data-zoomable')) return;
      n.setAttribute('data-zoomable', '');
      if (n.tagName === 'IMG' && !n.closest('a')) {
        n.tabIndex = 0;
        n.setAttribute('role', 'button');
        n.setAttribute('aria-label', 'Enlarge image: ' + (n.alt || 'image'));
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented && !(e.target instanceof Element && e.target.closest('a.cs-zoom'))) return;
    var z = zoomTarget(e.target);
    if (!z) return;
    if (z.el.tagName === 'A') e.preventDefault();            // never open the file in another tab/page
    if (xray()) return;                                      // X-Ray owns clicks while it is on
    e.preventDefault();
    open(z.kind, z.src, z.label, z.el);
  });

  document.addEventListener('keydown', function (e) {
    if ((e.key !== 'Enter' && e.key !== ' ') || !(e.target instanceof Element)) return;
    if (!e.target.matches('img[data-zoomable]') || xray()) return;
    e.preventDefault();
    var z = zoomTarget(e.target);
    if (z) open(z.kind, z.src, z.label, z.el);
  });

  function init() {
    decorate();
    if ('MutationObserver' in window) {
      var t = 0;
      new MutationObserver(function () { clearTimeout(t); t = setTimeout(decorate, 300); }).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.PortfolioLightbox = { open: open, close: close };
})();

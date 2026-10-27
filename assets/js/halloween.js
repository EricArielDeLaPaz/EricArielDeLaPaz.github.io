/* Halloween ghost hunt: 7 ghosts hide around the portfolio.
   - "behind" ghosts pop up from behind a button or card when you hover it.
   - "hidden" ghosts sit almost invisible inside a screenshot until you hover it.
   The /halloween/ page lists where all of them are.
   Ghosts switch themselves off after SHOW_UNTIL. Add ?ghosts to any URL to see them again. */
(function () {
  'use strict';
  var TOTAL = 7;
  var SHOW_UNTIL = new Date('2026-11-04T00:00:00-06:00');
  var params = new URLSearchParams(location.search);
  if (new Date() > SHOW_UNTIL && !params.has('ghosts')) return;

  var script = document.currentScript || document.querySelector('script[src*="halloween.js"]');
  var jsUrl = script ? script.src : location.href;
  var GHOST_SRC = new URL('../images/ghost.svg', jsUrl).href;
  var HUNT_URL = new URL('../../halloween/', jsUrl).href;
  var STORE = 'hw-found';

  function readFound() { try { return JSON.parse(localStorage.getItem(STORE) || '[]'); } catch (e) { return []; } }
  function saveFound(list) { try { localStorage.setItem(STORE, JSON.stringify(list)); } catch (e) { /* private mode */ } }

  /* ---------- styles ---------- */
  var css = '' +
    '.hw-host{position:relative}' +
    /* behind a button: a clipped box sits on top edge of the host, ghost rises out of it */
    '.hw-wrap{position:absolute;left:50%;bottom:100%;width:34px;height:38px;margin-left:-17px;pointer-events:none;z-index:5;clip-path:inset(-120% -80% 0 -80%)}' +
    '.hw-wrap.hw-right{left:auto;right:18px;margin-left:0}' +
    '.hw-wrap .hw-ghost{pointer-events:auto;transform:translateY(112%) rotate(0deg);opacity:1}' +
    '.hw-host:hover>.hw-wrap .hw-ghost,.hw-host:focus-visible>.hw-wrap .hw-ghost,.hw-wrap .hw-ghost:focus-visible{transform:translateY(30%) rotate(-5deg)}' +
    '.hw-host:hover>.hw-wrap .hw-ghost:hover{transform:translateY(14%) rotate(6deg)}' +
    /* hidden in a screenshot */
    '.hw-fig{position:relative}' +
    '.hw-fig>.hw-ghost{position:absolute;width:34px;height:38px;z-index:6;opacity:.06;transform:scale(.92)}' +
    '.hw-fig:hover>.hw-ghost{opacity:.85;transform:scale(1)}' +
    '.hw-fig>.hw-ghost:hover{opacity:1;transform:scale(1.18) rotate(-7deg)}' +
    'hw-ghost,hw-peek{display:block;margin:0;padding:0;border:0;background:none;box-sizing:border-box}' +
    '.hw-ghost{display:block;width:34px;height:38px;padding:0;border:0;background:none;cursor:pointer;transition:transform .28s cubic-bezier(.34,1.56,.64,1),opacity .25s ease}' +
    '.hw-ghost img,.cs-section .hw-ghost img{display:block;width:100%;height:100%;max-height:none;margin:0;padding:0;border:0;border-radius:0;background:none;pointer-events:none;filter:drop-shadow(0 2px 6px rgba(0,0,0,.45))}' +
    '.hw-ghost.hw-pop{animation:hw-pop .6s ease}' +
    '@keyframes hw-pop{0%{transform:scale(1)}35%{transform:scale(1.5) rotate(10deg)}100%{transform:scale(1)}}' +
    /* touch screens have no hover, so ghosts peek out a little so they can be tapped */
    '.hw-host.hw-armed>.hw-wrap .hw-ghost{transform:translateY(30%) rotate(-5deg)}.hw-fig.hw-armed>.hw-ghost{opacity:.9;transform:scale(1)}' +
    /* tiny toast */
    '.hw-toast{position:fixed;left:50%;bottom:22px;z-index:9999;display:flex;align-items:center;gap:10px;max-width:calc(100vw - 32px);padding:10px 14px;border:1px solid #c9a84c;border-radius:10px;background:#141210;color:#f0ede8;font:500 13px/1.4 Raleway,Inter,sans-serif;box-shadow:0 8px 28px rgba(0,0,0,.55);transform:translate(-50%,24px);opacity:0;transition:transform .3s ease,opacity .3s ease}' +
    '.hw-toast.is-on{transform:translate(-50%,0);opacity:1}' +
    '.hw-toast img{width:22px;height:25px;flex:none}' +
    '.hw-toast a{color:#c9a84c;font-weight:600;white-space:nowrap}' +
    '@media (prefers-reduced-motion:reduce){.hw-ghost,.hw-toast{transition:none}.hw-ghost.hw-pop{animation:none}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- helpers ---------- */
  function makeGhost(id) {
    var g = document.createElement('hw-ghost');
    g.className = 'hw-ghost';
    g.setAttribute('role', 'button');
    g.setAttribute('tabindex', '0');
    g.setAttribute('aria-label', 'You found a hidden ghost');
    g.dataset.ghost = id;
    var img = document.createElement('img');
    img.src = GHOST_SRC; img.alt = ''; img.draggable = false;
    g.appendChild(img);
    function found(e) {
      e.preventDefault(); e.stopPropagation();
      g.classList.remove('hw-pop'); void g.offsetWidth; g.classList.add('hw-pop');
      collect(id);
    }
    g.addEventListener('click', found);
    g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') found(e); });
    return g;
  }

  var toast, toastTimer;
  function collect(id) {
    var list = readFound();
    var isNew = list.indexOf(id) === -1;
    if (isNew) { list.push(id); saveFound(list); }
    var n = Math.min(list.length, TOTAL);
    var msg = n >= TOTAL ? 'You found all ' + TOTAL + ' ghosts. Happy Halloween!'
      : (isNew ? 'Boo! You found ghost ' + n + ' of ' + TOTAL + '.' : 'Boo! You already found this one (' + n + ' of ' + TOTAL + ').');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'hw-toast'; toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<img src="' + GHOST_SRC + '" alt=""><span></span><a href="' + HUNT_URL + '">Ghost hunt</a>';
    toast.querySelector('span').textContent = msg;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 4200);
  }

  /* Touch screens have no hover. First tap on a host pops its ghost up (and holds the normal action).
     Tap the ghost to collect it, or tap the host again to carry on as usual. */
  function isTouch(e) {
    return e.pointerType === 'touch' || (window.matchMedia && window.matchMedia('(hover: none)').matches);
  }
  function gate(host, id) {
    host.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.hw-ghost')) return;
      if (!isTouch(e) || host.dataset.hwDone || readFound().indexOf(id) !== -1) return;
      if (host.classList.contains('hw-armed')) { host.classList.remove('hw-armed'); host.dataset.hwDone = '1'; return; }
      e.preventDefault(); e.stopImmediatePropagation();
      host.classList.add('hw-armed');
    }, true);
  }

  function behind(host, id, opts) {
    if (!host || host.querySelector('.hw-ghost')) return;
    host.classList.add('hw-host');
    var wrap = document.createElement('hw-peek');
    wrap.className = 'hw-wrap' + (opts && opts.right ? ' hw-right' : '');
    wrap.appendChild(makeGhost(id));
    host.appendChild(wrap);
    gate(host, id);
  }
  function hidden(fig, id, pos) {
    if (!fig || fig.querySelector('.hw-ghost')) return;
    fig.classList.add('hw-fig');
    var g = makeGhost(id);
    Object.keys(pos).forEach(function (k) { g.style[k] = pos[k]; });
    fig.appendChild(g);
    gate(fig, id);
  }
  function slide(n) { return document.querySelectorAll('.case-study-slide')[n - 1]; }

  /* ---------- where each ghost hides ---------- */
  function place() {
    var b = document.body;
    var study = b.dataset.caseStudy;

    if (b.classList.contains('error-page')) {
      behind(document.querySelector('.error-page a'), '404');                         // ghost 7
    } else if (study === 'SecureID') {
      var s = slide(5); if (s) hidden(s.querySelectorAll('figure')[2], 'secureid', { top: '8px', right: '10px' });
    } else if (study === 'Honda of Clear Lake') {
      var h = slide(5); if (h) behind(h.querySelectorAll('.hf-card')[2], 'honda', { right: true });
    } else if (study === 'Study Buddy') {
      var sb = slide(1); if (sb) behind(sb.querySelectorAll('.cs-badge-row a')[1], 'study-buddy');
    } else if (study === 'DevTective') {
      var d = slide(5); if (d) hidden(d.querySelectorAll('figure')[1], 'devtective', { bottom: '34px', left: '10px' });
    } else if (study === 'Vextaro') {
      var v = slide(3); if (v) hidden(v.querySelectorAll('figure')[1], 'vextaro', { top: '8px', left: '10px' });
    } else if (b.classList.contains('workspace-page')) {
      behind(document.querySelector('[data-hero-next]'), 'home');                    // ghost 1
    }
  }
  place();
})();

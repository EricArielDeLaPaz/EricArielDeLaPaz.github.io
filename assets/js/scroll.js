/**
 * Portfolio 2.0 Engine
 * Handles: Pure JS Smooth Scroll, Info Popover, Nintendo DS Lite, Mini Eric Emotes, Token Sandbox
 */
(function() {
  'use strict';

  // 1. INFO POPOVER DROPDOWN
  const infoBtn = document.getElementById('infoBtn');
  const infoPopover = document.getElementById('infoPopover');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (infoBtn && infoPopover) {
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = infoBtn.getAttribute('aria-expanded') === 'true';
      infoBtn.setAttribute('aria-expanded', !isExpanded);
      infoPopover.hidden = isExpanded;
    });

    document.addEventListener('click', (e) => {
      if (!infoPopover.hidden && !infoPopover.contains(e.target) && e.target !== infoBtn) {
        infoBtn.setAttribute('aria-expanded', 'false');
        infoPopover.hidden = true;
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !infoPopover.hidden) {
        infoBtn.setAttribute('aria-expanded', 'false');
        infoPopover.hidden = true;
      }
    });
  }

  // Copy Email Toast
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.dataset.email || 'ericforall247@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.classList.add('copied');
        setTimeout(() => copyEmailBtn.classList.remove('copied'), 2000);
      });
    });
  }

  // 2. MINI ERIC EMOTE & SPEECH ROTATOR
  const miniEricChars = document.querySelectorAll('.mini-eric-char');
  const quotes = [
    "I see you're looking at my work—you must be looking to hire me!",
    "Remember to stay hydrated! Water is king 💧",
    "Fun fact: I still have my childhood Pokémon card binder safe!",
    "Every morning starts grounded: reading a chapter before pixels.",
    "Tokens, design systems, and clickable flows—that's my jam."
  ];

  miniEricChars.forEach(char => {
    char.addEventListener('click', () => {
      const banner = char.closest('.mini-eric-banner');
      if (!banner) return;
      const textEl = banner.querySelector('.mini-eric-text');
      if (textEl) {
        const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
        textEl.textContent = nextQuote;
      }
      char.style.transform = 'scale(1.2) rotate(6deg)';
      setTimeout(() => { char.style.transform = ''; }, 260);
    });
  });

  // 3. INTERACTIVE NINTENDO DS LITE (CRIMSON RED & ONYX BLACK)
  const dsLid = document.getElementById('dsLid');
  const dsConsole = document.getElementById('dsConsole');
  const dsCloseBtn = document.getElementById('dsCloseBtn');
  const dsCartridgeTitle = document.getElementById('dsCartridgeTitle');
  const dsScreenStage = document.getElementById('dsScreenStage');
  const dsTouchBody = document.getElementById('dsTouchBody');
  const touchIndicator = document.getElementById('touchIndicator');
  const dpadLeft = document.getElementById('dpadLeft');
  const dpadRight = document.getElementById('dpadRight');
  const touchPrev = document.getElementById('touchPrev');
  const touchNext = document.getElementById('touchNext');

  const cartridges = [
    {
      title: "POKÉMON BLACK",
      color: "#0f172a",
      stageHtml: `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🦦 💧</div>
          <strong style="display:block; color:#7dd3fc; font-size:15px; font-family:monospace;">STARTER: OSHAWOTT (WATER-TYPE)</strong>
          <small style="color:#94a3b8; font-size:11px;">UNOVA REGION • GENERATION V</small>
        </div>
      `,
      touchHtml: `
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#38bdf8; display:block; margin-bottom:4px;">First Pokémon Game as a Kid</strong>
          <p style="margin:0 0 8px; font-style:italic;">"My first ever DS game as a kid! Starter: Oshawott (he's adorable). Fun fact: I kept getting stuck and never finished it as a kid, but as an adult that issue doesn't happen anymore!"</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">STATUS: CLEARED WITH HONOR</span>
        </div>
      `
    },
    {
      title: "POKÉMON PLATINUM",
      color: "#3b0764",
      stageHtml: `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🐉 🛡️</div>
          <strong style="display:block; color:#c084fc; font-size:15px; font-family:monospace;">LEGENDARY: GIRATINA</strong>
          <small style="color:#94a3b8; font-size:11px;">SINNOH REGION • DISTORTION WORLD</small>
        </div>
      `,
      touchHtml: `
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#c084fc; display:block; margin-bottom:4px;">Bulky Legendaries &amp; Shuckle Love</strong>
          <p style="margin:0 0 8px; font-style:italic;">"Platinum holds Giratina, one of my absolute favorite legendaries—incredible Ghost/Dragon typing and total defensive bulk. Also, huge love for Shuckle because of its quirky, unyielding design!"</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">FAVORITES: GIRATINA &amp; SHUCKLE</span>
        </div>
      `
    },
    {
      title: "MARIO KART DS",
      color: "#b91c1c",
      stageHtml: `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🏎️ 🏁</div>
          <strong style="display:block; color:#f87171; font-size:15px; font-family:monospace;">CIRCUIT: RAINBOW ROAD</strong>
          <small style="color:#94a3b8; font-size:11px;">HANDHELD WIRELESS MULTIPLAYER</small>
        </div>
      `,
      touchHtml: `
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#f87171; display:block; margin-bottom:4px;">Road Trip Battles</strong>
          <p style="margin:0 0 8px; font-style:italic;">"Played Mario Kart DS during road trips and holidays with friends. Handheld multiplayer at its absolute peak."</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">CLASSIC MEMORIES</span>
        </div>
      `
    },
    {
      title: "POKÉMON CARD BINDER",
      color: "#997324",
      stageHtml: `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:36px; margin-bottom:6px;">🎴 ✨</div>
          <strong style="display:block; color:#fde047; font-size:15px; font-family:monospace;">VINTAGE COLLECTION</strong>
          <small style="color:#94a3b8; font-size:11px;">PHYSICAL CARDS KEPT SAFE</small>
        </div>
      `,
      touchHtml: `
        <div style="color:#e2e8f0; font-size:13px; line-height:1.5;">
          <strong style="color:#fde047; display:block; margin-bottom:4px;">Preserved Since Childhood</strong>
          <p style="margin:0 0 8px; font-style:italic;">"Collected physical cards growing up, traded with friends at school, and I still have my binder kept safe today!"</p>
          <span style="font-size:10px; color:#64748b; font-family:monospace;">COLLECTION VAULT ACTIVE</span>
        </div>
      `
    }
  ];

  let activeCartIdx = 0;

  function renderCartridge(idx) {
    if (!dsCartridgeTitle || !dsScreenStage || !dsTouchBody) return;
    const item = cartridges[idx];
    dsCartridgeTitle.textContent = item.title;
    dsScreenStage.innerHTML = item.stageHtml;
    dsTouchBody.innerHTML = item.touchHtml;
    if (touchIndicator) {
      touchIndicator.textContent = `${idx + 1} / ${cartridges.length}`;
    }
  }

  if (dsLid && dsConsole) {
    dsLid.addEventListener('click', () => {
      dsLid.hidden = true;
      dsConsole.hidden = false;
      renderCartridge(activeCartIdx);
    });

    if (dsCloseBtn) {
      dsCloseBtn.addEventListener('click', () => {
        dsConsole.hidden = true;
        dsLid.hidden = false;
      });
    }

    function prevCart() {
      activeCartIdx = (activeCartIdx - 1 + cartridges.length) % cartridges.length;
      renderCartridge(activeCartIdx);
    }
    function nextCart() {
      activeCartIdx = (activeCartIdx + 1) % cartridges.length;
      renderCartridge(activeCartIdx);
    }

    if (dpadLeft) dpadLeft.addEventListener('click', prevCart);
    if (dpadRight) dpadRight.addEventListener('click', nextCart);
    if (touchPrev) touchPrev.addEventListener('click', prevCart);
    if (touchNext) touchNext.addEventListener('click', nextCart);
  }

  // 4. PLAYGROUND TOKEN LAB CONTROLS
  const radiusSlider = document.getElementById('radiusSlider');
  const radiusValue = document.getElementById('radiusValue');
  const tokenPreviewCard = document.getElementById('tokenPreviewCard');
  const paletteSwatches = document.querySelectorAll('.palette-swatch');

  if (radiusSlider && tokenPreviewCard && radiusValue) {
    radiusSlider.addEventListener('input', (e) => {
      const val = e.target.value + 'px';
      radiusValue.textContent = val;
      tokenPreviewCard.style.borderRadius = val;
    });
  }

  if (paletteSwatches.length && tokenPreviewCard) {
    paletteSwatches.forEach(swatch => {
      swatch.addEventListener('click', () => {
        paletteSwatches.forEach(s => s.classList.remove('is-active'));
        swatch.classList.add('is-active');
        const color = swatch.dataset.color;
        const btn = tokenPreviewCard.querySelector('.sample-btn-primary');
        const badge = tokenPreviewCard.querySelector('.sample-badge');
        if (btn) { btn.style.background = color; btn.style.borderColor = color; }
        if (badge) { badge.style.color = color; badge.style.background = color + '18'; }
      });
    });
  }

  // 5. STUDY BUDDY WEB SIMULATOR
  const sbStartBtn = document.getElementById('sbStartBtn');
  const sbBreakBtn = document.getElementById('sbBreakBtn');
  const sbResetBtn = document.getElementById('sbResetBtn');
  const sbTimer = document.getElementById('sbTimer');
  const sbStatusText = document.getElementById('sbStatusText');

  if (sbStartBtn && sbTimer && sbStatusText) {
    let timerInt = null;
    let secondsLeft = 25 * 60;

    function formatTime(sec) {
      const m = Math.floor(sec / 60).toString().padStart(2, '0');
      const s = (sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    sbStartBtn.addEventListener('click', () => {
      clearInterval(timerInt);
      sbStartBtn.classList.add('active');
      if (sbBreakBtn) sbBreakBtn.classList.remove('active');
      sbStatusText.textContent = "Focus session running: Mambo blocks distracting sites so you can stay in flow.";
      timerInt = setInterval(() => {
        if (secondsLeft > 0) {
          secondsLeft--;
          sbTimer.textContent = formatTime(secondsLeft);
        } else {
          clearInterval(timerInt);
          sbStatusText.textContent = "Great job! Time to take a hydration break 💧";
        }
      }, 1000);
    });

    if (sbBreakBtn) {
      sbBreakBtn.addEventListener('click', () => {
        clearInterval(timerInt);
        secondsLeft = 5 * 60;
        sbTimer.textContent = formatTime(secondsLeft);
        sbBreakBtn.classList.add('active');
        sbStartBtn.classList.remove('active');
        sbStatusText.textContent = "Break mode: Step away, drink a glass of water, and rest your eyes!";
      });
    }

    if (sbResetBtn) {
      sbResetBtn.addEventListener('click', () => {
        clearInterval(timerInt);
        secondsLeft = 25 * 60;
        sbTimer.textContent = "25:00";
        sbStartBtn.classList.remove('active');
        if (sbBreakBtn) sbBreakBtn.classList.remove('active');
        sbStatusText.textContent = "Timer reset. Click Start Focus when you're ready.";
      });
    }
  }

  // 6. BUTTERY PURE JS SMOOTH SCROLL (Header alignment)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    const nav = document.querySelector('.sx-nav');
    const navHeight = nav ? nav.getBoundingClientRect().height + 28 : 84;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

    const startY = window.pageYOffset;
    const diff = targetTop - startY;
    const duration = Math.min(900, Math.max(500, Math.abs(diff) * 0.55));
    let start = null;

    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    function step(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });

})();

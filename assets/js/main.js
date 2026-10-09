// Mark the current page's nav link active, in both the desktop
// filebar nav and the mobile scrollable tab strip.
(function () {
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;

  const dots = document.querySelector('.slide-dots');
  const progress = document.querySelector('.slide-progress span');
  let current = Math.max(0, slides.findIndex((slide) => slide.id === window.location.hash.slice(1)));
  if (current === -1) current = 0;

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slide-dot';
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => showSlide(index));
    dots.appendChild(dot);
  });

  function showSlide(index, updateHash = true) {
    current = (index + slides.length) % slides.length;
    const activeSection = slides[current].id === 'intro' ? 'intro' :
      slides[current].id === 'about' ? 'about' : 'work';
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots.children[slideIndex].classList.toggle('is-active', active);
    });
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    if (updateHash) history.replaceState(null, '', `#${slides[current].id}`);
    document.querySelectorAll('.filebar nav a, .mobile-tabs a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeSection}`);
    });
  }

  document.querySelector('[data-prev]').addEventListener('click', () => showSlide(current - 1));
  document.querySelectorAll('[data-next]').forEach((button) => {
    button.addEventListener('click', () => showSlide(current + 1));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') showSlide(current + 1);
    if (event.key === 'ArrowLeft') showSlide(current - 1);
  });
  window.addEventListener('hashchange', () => {
    const next = slides.findIndex((slide) => slide.id === window.location.hash.slice(1));
    if (next >= 0) showSlide(next, false);
  });

  showSlide(current, false);
})();

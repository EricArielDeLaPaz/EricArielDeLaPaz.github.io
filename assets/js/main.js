// Mark the current page's nav link active, in both the desktop
// filebar nav and the mobile scrollable tab strip.
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const target = link.getAttribute('data-nav');
    if (target === path || (target === 'index.html' && path === '')) {
      link.classList.add('active');
    }
  });

  // Keep the active mobile tab scrolled into view on load.
  const activeTab = document.querySelector('.mobile-tabs a.active');
  if (activeTab) {
    activeTab.scrollIntoView({ inline: 'center', block: 'nearest' });
  }
})();

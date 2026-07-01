document.querySelectorAll('.story-card').forEach((c,i)=>c.style.animationDelay=(i*40)+'ms');

// v1.5 release hardening: never show a broken visual during demo review.
const fallbackImage = 'assets/sffl-trophy.png';
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    if (img.dataset.fallbackApplied === 'true') return;
    img.dataset.fallbackApplied = 'true';
    img.src = fallbackImage;
    if (!img.alt) img.alt = 'SFFL trophy fallback';
  });
});

// Close the More panel after choosing a link on touch devices.
document.querySelectorAll('.more-panel a').forEach(link => {
  link.addEventListener('click', () => {
    const btn = document.querySelector('.more-menu button');
    if (btn) btn.blur();
  });
});

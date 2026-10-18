// Nav steps out of the way while reading down, comes back on scroll up.
const nav = document.querySelector('nav');
if (nav) {
  let last = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    nav.classList.toggle('away', y > last && y > 400);
    last = y;
  }, { passive: true });
}

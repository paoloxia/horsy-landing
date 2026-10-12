// Fade-up sections as they enter the viewport.
import { reducedMotion } from './motion';

const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reducedMotion()) {
  els.forEach((e) => e.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
    { rootMargin: '0px 0px -10% 0px' },
  );
  els.forEach((e) => io.observe(e));
}

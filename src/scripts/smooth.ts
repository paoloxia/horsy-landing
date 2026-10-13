// Smooth scroll (Lenis). Native scroll for reduced-motion users.
import Lenis from 'lenis';
import { reducedMotion } from './motion';

const NAV_OFFSET = -84;

if (!reducedMotion()) {
  const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
  (window as unknown as { lenis: Lenis }).lenis = lenis;

  // In-page links glide instead of jumping, and clear the floating nav.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href') as string;
    const target = id === '#' || id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.4 });
    history.replaceState(null, '', id);
  });
}

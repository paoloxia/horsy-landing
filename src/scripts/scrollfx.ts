// Depth: hero footage drifts and settles; the demo window tilts flat as it arrives.
import { reducedMotion } from './motion';

if (!reducedMotion()) {
  const hero = document.querySelector<HTMLElement>('.hero .parallax');
  const demo = document.querySelector<HTMLElement>('.demo');
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = scrollY, vh = innerHeight;
    if (hero && y < vh * 1.2) {
      const k = Math.min(y / vh, 1);
      hero.style.transform = `translate3d(0,${y * 0.3}px,0) scale(${1.1 - k * 0.06})`;
    }
    if (demo) {
      const t = Math.min(Math.max(demo.getBoundingClientRect().top / vh, 0), 1);
      demo.style.setProperty('--tilt', `${(t * 12).toFixed(2)}deg`);
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener('scroll', onScroll, { passive: true });
  update();
}

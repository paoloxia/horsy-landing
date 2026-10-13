// Count up [data-count] numbers once, when they enter the viewport.
import { reducedMotion } from './motion';

document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
  const target = parseFloat(el.dataset.count as string);
  const pre = el.dataset.prefix ?? '', suf = el.dataset.suffix ?? '';
  const dec = (el.dataset.count as string).split('.')[1]?.length ?? 0;
  if (reducedMotion()) return;
  el.textContent = pre + (0).toFixed(dec) + suf;
  const io = new IntersectionObserver((es) => {
    if (!es[0].isIntersecting) return;
    io.disconnect();
    const t0 = performance.now(), d = 1800;
    const f = (n: number) => {
      const p = Math.min(1, (n - t0) / d), e = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + (target * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  }, { threshold: 0.6 });
  io.observe(el);
});

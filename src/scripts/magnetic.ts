// Primary buttons lean toward the pointer (fine pointers only).
import { reducedMotion } from './motion';

if (!reducedMotion() && matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll<HTMLElement>('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate(${dx * 7}px,${dy * 5}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

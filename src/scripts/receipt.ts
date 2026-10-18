// Receipt prints once, when it scrolls into view.
import { reducedMotion } from './motion';

const r = document.getElementById('receipt');
const tot = document.getElementById('rtot');
if (r && tot && r.parentElement) {
  const DUR = 3;
  r.style.setProperty('--dur', `${DUR}s`);
  r.classList.add('wait');
  const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  // time at which the paper feed reaches fraction y of the receipt
  const inv = (y: number) => {
    let lo = 0, hi = 1;
    for (let i = 0; i < 20; i++) { const m = (lo + hi) / 2; ease(m) < y ? (lo = m) : (hi = m); }
    return lo;
  };
  const sync = () => {
    const H = r.offsetHeight;
    [...r.children].forEach((c) => {
      const el = c as HTMLElement;
      el.style.setProperty('--d', `${(inv((el.offsetTop + el.offsetHeight * 0.6) / H) * DUR - 0.25).toFixed(2)}s`);
    });
  };
  const count = () => {
    const t0 = performance.now(), d = 1100;
    const f = (n: number) => {
      const p = Math.min(1, (n - t0) / d);
      tot.textContent = '−$' + (0.03 * (1 - Math.pow(1 - p, 3))).toFixed(3);
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };
  if (!reducedMotion()) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            io.disconnect();
            sync();
            r.classList.remove('go');
            void r.offsetWidth;
            r.classList.remove('wait');
            r.classList.add('go');
            tot.textContent = '−$0.000';
            const d = parseFloat(getComputedStyle(tot.parentElement as Element).getPropertyValue('--d')) || DUR * 0.8;
            window.setTimeout(count, d * 1000 + 300);
          }
        }),
      { rootMargin: "0px 0px -15% 0px", threshold: 0.25 },
    );
    io.observe(r.parentElement);
  }
}

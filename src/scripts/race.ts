// Pinned race: scroll progress through #race drives the horse, the verify gate,
// the L-shaped step up (the knight's move) and the receipt.
import { reducedMotion } from './motion';

const sec = document.getElementById('race');
const board = document.getElementById('board');
const horse = document.getElementById('rhorse');
if (sec && board && horse) {
  const checks = document.getElementById('checks')!;
  const knight = document.getElementById('knightflash')!;
  const rec = document.getElementById('minirec')!;
  const lpath = document.getElementById('lpath') as SVGPathElement | null;
  const bar = document.getElementById('raceBar')!;
  const beats = [...sec.querySelectorAll<HTMLElement>('.beat')];
  const lanes = [...board.querySelectorAll<HTMLElement>('.rl')]; // opus, sonnet, haiku

  const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
  const ease = (x: number) => 1 - Math.pow(1 - x, 3);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const render = (p: number) => {
    const W = board.clientWidth, H = board.clientHeight, lane = H / 3;
    const g = horse.querySelector<HTMLElement>('.gallop')!;
    const fw = g.offsetWidth, fh = g.offsetHeight;
    const laneY = (i: number) => i * lane + lane / 2 - fh / 2 + 6;
    const x0 = 24, xGate = W * 0.5 - fw - 4, xJump = W * 0.5 + 40, xFin = W - 34 - fw - 12;

    let x = x0, y = laneY(2);
    if (p < 0.4) x = lerp(x0, xGate, ease(seg(p, 0.06, 0.4)));
    else if (p < 0.55) x = xGate;
    else if (p < 0.61) { x = xGate; y = lerp(laneY(2), laneY(1), ease(seg(p, 0.55, 0.61))); }
    else if (p < 0.68) { x = lerp(xGate, xJump, ease(seg(p, 0.61, 0.68))); y = laneY(1); }
    else { x = lerp(xJump, xFin, ease(seg(p, 0.68, 0.86))); y = laneY(1); }
    horse.style.transform = `translate3d(${x}px,${y}px,0)`;

    const lit = p < 0.58 ? 2 : 1;
    lanes.forEach((l, i) => l.classList.toggle('lit', i === lit));
    checks.classList.toggle('on', p >= 0.42 && p < 0.62);
    board.classList.toggle('fail', p >= 0.46 && p < 0.58);
    knight.classList.toggle('on', p >= 0.56 && p < 0.7);
    rec.classList.toggle('on', p >= 0.84);
    if (lpath) lpath.style.setProperty('--lp', String(1 - seg(p, 0.55, 0.68)));
    const b = p < 0.3 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3;
    beats.forEach((el, i) => el.classList.toggle('on', i === b));
    bar.style.width = `${p * 100}%`;
  };

  if (reducedMotion()) {
    render(1);
    beats.forEach((el) => el.classList.add('on'));
  } else {
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      render(clamp(-r.top / (sec.offsetHeight - innerHeight)));
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    render(0);
    update();
  }
}

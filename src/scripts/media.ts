// Videos: background loops autoplay; the demo loads only when it scrolls into view.
import { reducedMotion } from './motion';

document.querySelectorAll<HTMLVideoElement>('.bgv').forEach((v) => {
  const play = () => v.play().catch(() => {});
  play();
  new IntersectionObserver((e) => e[0].isIntersecting && play()).observe(v);
});

const demo = document.getElementById('demo') as HTMLVideoElement | null;
if (demo && !reducedMotion()) {
  let visible = false;
  demo.addEventListener('loadeddata', () => visible && demo.play().catch(() => {}));
  new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible) {
          if (!demo.src) demo.src = '/media/demo.mp4';
          demo.play().catch(() => {});
        } else if (demo.src) demo.pause();
      }),
    { threshold: 0.35 },
  ).observe(demo);
}

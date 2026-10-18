// Videos: background loops autoplay; the demo loads when it scrolls into view, plays once and rests on its final receipt frame.
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
  demo.addEventListener('ended', () => { demo.currentTime = demo.duration - 0.05; });
  new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        visible = e.isIntersecting;
        if (visible && !demo.ended) {
          if (!demo.src) demo.src = '/media/demo.mp4';
          demo.play().catch(() => {});
        }
      }),
    { threshold: 0.35 },
  ).observe(demo);
}

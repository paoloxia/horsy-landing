// Race lanes (hero + verify gate): keyframes read the lane width from --w.
const track = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const set = () => el.style.setProperty('--w', `${el.clientWidth}px`);
  set();
  addEventListener('resize', set);
};
track('lanes');
track('glanes');

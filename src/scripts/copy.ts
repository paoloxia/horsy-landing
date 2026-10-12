// Copy-to-clipboard buttons: <button data-copy="#selector">
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) => {
  b.addEventListener('click', () => {
    const src = document.querySelector(b.dataset.copy as string);
    if (src && navigator.clipboard) navigator.clipboard.writeText(src.textContent ?? '');
    b.textContent = 'copied';
  });
});

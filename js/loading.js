(() => {
  const loading = document.querySelector('#loading');
  const message = document.querySelector('#loading-message');
  const bar = document.querySelector('#loading-progress');
  const skip = document.querySelector('#loading-skip');
  const messages = [
    'Estamos preparando el buen rollo',
    'El horno ya está calentito',
    'Ya estamos listos para darte la bienvenida',
    'Preparando algo recién hecho',
    'En León ya huele a buen rollo'
  ];
  const choice = Math.floor(Math.random() * messages.length);
  message.textContent = messages[choice];
  let finished = false;
  let frame;
  let timer;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    cancelAnimationFrame(frame);
    bar.style.transform = 'scaleX(1)';
    bar.setAttribute('aria-valuenow', '100');
    loading.classList.add('done');
    loading.setAttribute('aria-hidden', 'true');
    skip.tabIndex = -1;
    if (document.activeElement === skip) document.querySelector('.skip').focus();
  }
  function updateProgress(time) {
    if (finished) return;
    if (startTime === null) startTime = time;
    const progress = Math.min((time - startTime) / 2200, 1);
    bar.style.transform = `scaleX(${progress})`;
    bar.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
    if (progress >= 1) { finish(); return; }
    frame = requestAnimationFrame(updateProgress);
  }
  let startTime = null;
  skip.addEventListener('click', finish);
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }
  timer = setTimeout(finish, 4000);
  frame = requestAnimationFrame(updateProgress);
})();

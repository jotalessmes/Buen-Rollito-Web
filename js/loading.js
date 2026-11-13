(() => {
  const loading = document.querySelector('#loading');
  const video = document.querySelector('#loading-video');
  const message = document.querySelector('#loading-message');
  const bar = document.querySelector('#loading-progress');
  const skip = document.querySelector('#loading-skip');
  const messages = [
    'Estamos preparando el buen rollo',
    'El horno ya está calentito',
    'Una vuelta más y abrimos',
    'Preparando algo recién hecho',
    'En León ya huele a buen rollo'
  ];
  let choice = Math.floor(Math.random() * messages.length);
  try {
    const previous = sessionStorage.getItem('buen-rollito-loading-message');
    if (messages.length > 1 && String(choice) === previous) choice = (choice + 1) % messages.length;
    sessionStorage.setItem('buen-rollito-loading-message', String(choice));
  } catch (_) { /* The animation works without storage. */ }
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
    video.pause();
    loading.classList.add('done');
    loading.setAttribute('aria-hidden', 'true');
    skip.tabIndex = -1;
    if (document.activeElement === skip) document.querySelector('.skip').focus();
  }
  function updateProgress() {
    if (finished) return;
    if (Number.isFinite(video.duration) && video.duration > 0) bar.style.transform = `scaleX(${Math.min(video.currentTime / video.duration, 1)})`;
    frame = requestAnimationFrame(updateProgress);
  }
  skip.addEventListener('click', finish);
  video.addEventListener('ended', () => setTimeout(finish, 350), { once: true });
  video.addEventListener('error', finish, { once: true });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish();
    return;
  }
  timer = setTimeout(finish, 12000);
  video.src = video.dataset.src;
  const playback = video.play();
  if (playback && typeof playback.catch === 'function') playback.catch(finish);
  frame = requestAnimationFrame(updateProgress);
})();

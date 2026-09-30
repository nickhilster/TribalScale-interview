document.querySelectorAll('audio').forEach((audio, index, players) => {
  audio.addEventListener('ended', () => {
    const next = players[index + 1];
    if (next) {
      next.focus();
      next.play().catch(() => {});
    }
  });
});

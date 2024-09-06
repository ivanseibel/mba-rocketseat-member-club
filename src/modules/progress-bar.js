const CUTS_TRESHOLD = 10;

export function updateProgressBar(cuts) {
  if (cuts < 0 || cuts > CUTS_TRESHOLD) {
    alert('Invalid number of cuts');
    return;
  }

  const progressBar = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-bar span');

  const progress = cuts / CUTS_TRESHOLD * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${cuts} of ${CUTS_TRESHOLD}`;
}
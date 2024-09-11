export function updateProgressBar(cuts, CUTS_TRESHOLD = 10) {
  if (cuts < 0 || cuts > CUTS_TRESHOLD) {
    alert('Invalid number of cuts');
    return;
  }

  const progressBar = document.querySelector('.progress-fill');
  const progressText = document.querySelector('.progress-bar span');
  const strongCutsRemaining = document.querySelector('.cuts-remaining strong');

  const progress = cuts / CUTS_TRESHOLD * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `${cuts} of ${CUTS_TRESHOLD}`;
  strongCutsRemaining.textContent = CUTS_TRESHOLD - cuts;

  console.log('cuts', cuts);
  console.log('progress', progress);
}
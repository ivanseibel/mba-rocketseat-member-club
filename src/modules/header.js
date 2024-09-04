// Toggles button state according to the input value
const searchInput = document.querySelector('.input-container input');
const searchButton = document.querySelector('.input-container button');

searchInput.addEventListener('input', () => {
  searchButton.disabled = !searchInput.value;
});
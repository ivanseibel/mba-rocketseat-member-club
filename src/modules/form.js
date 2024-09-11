import { fetchAndSetUser, getUserState, getIsFetching } from './userState.js';

const form = document.querySelector('form.input-container');
const inputId = document.querySelector('#id');
const buttonSubmit = document.querySelector('button[type="submit"]');
const main = document.querySelector('main');

// Handler for input to hide main if user changes the input
inputId.addEventListener('input', () => {
  main.classList.add('hidden');
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (isValidId(inputId.value)) {
    try {
      buttonSubmit.disabled = true;
      const success = await fetchAndSetUser(inputId.value);
      if (success) {
        const user = getUserState();
        renderUser(user);
        main.classList.remove('hidden');
      } else {
        alert('User not found!');
      }
    } catch (error) {
      console.log('Error searching user by card id:', error);
      alert('Error searching user by card id');
    } finally {
      buttonSubmit.disabled = false;
    }
  } else {
    alert('ID is not valid!');
  }
});

function isValidId(id) {
  // Regex for id validation 000-000-000-000
  const regex = /^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
  return regex.test(id);
};

function renderUser(user) {
  const h2UserName = document.querySelector('#user-name');
  const pMemberSince = document.querySelector('#member-since');

  h2UserName.textContent = user.name;
  pMemberSince.textContent = `Member since: ${user.clientSince}`;
}
import { updateProgressBar } from './progress-bar.js';
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
        renderAppointmentHistory(user.appointmentHistory);
        updateProgressBar(user.loyaltyCard.totalCuts, user.loyaltyCard.cutsNeeded);
        renderLoyaltyCard(user);
        
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

function renderAppointmentHistory(appointmentHistory) {
  const spanCutsCompleted = document.querySelector('.history-header-container span');
  spanCutsCompleted.textContent = `${appointmentHistory.length} cuts`;

  const ulAppointmentHistory = document.querySelector('ul.history-container');
  ulAppointmentHistory.innerHTML = '';

  appointmentHistory.forEach(appointment => {
    const li = document.createElement('li');
    li.classList.add('history-item');
    
    const divHistoryDateTime = document.createElement('div');
    divHistoryDateTime.classList.add('history-date-time');

    const spanDate = document.createElement('span');
    spanDate.classList.add('history-date');

    const spanTime = document.createElement('span');
    spanTime.classList.add('history-time');

    const divPinCheckLightContainer = document.createElement('div');
    divPinCheckLightContainer.classList.add('pin-check-light-container');

    const imgPinCheckLight = document.createElement('img');
    imgPinCheckLight.classList.add('history-checkmark');

    spanDate.textContent = appointment.date;
    spanTime.textContent = appointment.time;
    imgPinCheckLight.src = '../public/images/PinCheckLight.png';
    imgPinCheckLight.alt = 'Completed';

    divHistoryDateTime.appendChild(spanDate);
    divHistoryDateTime.appendChild(spanTime);

    divPinCheckLightContainer.appendChild(imgPinCheckLight);

    li.appendChild(divHistoryDateTime);
    li.appendChild(divPinCheckLightContainer);

    ulAppointmentHistory.appendChild(li);
  });
}

function renderLoyaltyCard(user) {
  const spanCardId = document.querySelector('span.card-id');
  spanCardId.textContent = user.id;

  const pDescription = document.querySelector('.card-header div p');
  pDescription.textContent = `Get a free haircut after ${user.loyaltyCard.cutsNeeded} cuts!`;

  const divCardStamps = document.querySelector('.card-stamps');
  divCardStamps.innerHTML = '';

  for (let i = 0; i < user.loyaltyCard.cutsNeeded; i++) {
    const divStampContainer = document.createElement('div');
    divStampContainer.classList.add('stamp-container');

    if (i < user.loyaltyCard.totalCuts) {
      const imgStamp = document.createElement('img');
      imgStamp.src = '../public/images/PinCheck.png';
      imgStamp.alt = 'Checkmark Icon';
      divStampContainer.appendChild(imgStamp);
    }

    if (i === user.loyaltyCard.cutsNeeded - 1) {
      const imgStamp = document.createElement('img');
      imgStamp.src = '../public/images/PinGift.png';
      imgStamp.alt = 'Gift Icon';
      divStampContainer.appendChild(imgStamp);
    }

    divCardStamps.appendChild(divStampContainer);
  }

  if (user.loyaltyCard.cutsRemaining === 0) {
    alert('Congratulations! You have earned a free haircut!');
  }
}
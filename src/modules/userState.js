let userState = {
  id: null,
  name: '',
  clientSince: '',
  appointmentHistory: [],
  loyaltyCard: {
    totalCuts: 0,
    cutsNeeded: 0,
    cutsRemaining: 0
  }
};

let isFetching = false;

// Gets isFetching state
export const getIsFetching = () => {
  return isFetching;
};

// Gets global state for user
export const getUserState = () => {
  return userState;
};

// Sets global state for user
export const setUserState = (newState) => {
  userState = { ...userState, ...newState };
};

// Resets global state for user
export const resetUserState = () => {
  userState = {
    id: null,
    name: '',
    clientSince: '',
    appointmentHistory: [],
    loyaltyCard: {
      totalCuts: 0,
      cutsNeeded: 0,
      cutsRemaining: 0
    }
  };
};

// Fetches user data from an API and sets it to the global state
export const fetchAndSetUser = async (clientId) => {
  try {
    isFetching = true;
    const response = await fetch(`http://localhost:3001/clients/${clientId}`);

    const clientData = await response.json();

    if (response.ok) {
      setUserState({
        id: clientData.id,
        name: clientData.name,
        clientSince: clientData.clientSince,
        appointmentHistory: clientData.appointmentHistory,
        loyaltyCard: clientData.loyaltyCard
      });
      return true;
    } else {
      resetUserState();
      return false;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('Error fetching user data');
    resetUserState();
    return false;
  } finally {
    isFetching = false;
  }
};

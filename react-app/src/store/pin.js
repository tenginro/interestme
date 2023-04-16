const LOAD_PINS = "pins/load_all";
const LOAD_PIN_DETAIL = "pins/load_one";
const LOAD_USER_PINS = "pins/load_user_pins";
const LOAD_SAVED_PINS = "pins/load_saved_pins";

const CREATE_PIN = "pins/create";
const UPDATE_PIN = "pins/update";
const REMOVE_PIN = "pins/delete";

const CLEAR_PIN_DETAIL = "pins/clear_pin_state";
const CLEAR_PINS = "pins/clear_pins_state";
const CLEAR_SAVED_PINS = "pins/clear_saved_pins";

export const actionLoadAllPins = (pins) => ({
  type: LOAD_PINS,
  pins,
});

export const actionLoadPinDetail = (pin) => ({
  type: LOAD_PIN_DETAIL,
  pin,
});
export const actionLoadUserPins = (pins) => ({
  type: LOAD_USER_PINS,
  pins,
});

export const actionCreatePin = (pin) => ({
  type: CREATE_PIN,
  pin,
});
export const actionUpdatePin = (pin) => ({
  type: UPDATE_PIN,
  pin,
});
export const actionRemovePin = (id) => ({
  type: REMOVE_PIN,
  id,
});

export const actionLoadSavedPins = (pins) => ({
  type: LOAD_SAVED_PINS,
  pins,
});

export const actionClearPins = () => ({
  type: CLEAR_PINS,
});
export const actionClearPin = () => ({
  type: CLEAR_PIN_DETAIL,
});
export const actionClearSavedPins = () => ({
  type: CLEAR_SAVED_PINS,
});

export const getAllPins = () => async (dispatch) => {
  const response = await fetch("/api/pins");
  if (response.ok) {
    const pins = await response.json();
    await dispatch(actionLoadAllPins(pins));
    return pins;
  }
  return response;
};

export const getPinDetail = (id) => async (dispatch) => {
  const response = await fetch(`/api/pins/${id}`);

  if (response.ok) {
    const pin = await response.json();
    await dispatch(actionLoadPinDetail(pin));
    return pin;
  }
};

export const getUserPins = () => async (dispatch) => {
  const response = await fetch("/api/pins/current");

  if (response.ok) {
    const pins = await response.json();
    await dispatch(actionLoadUserPins(pins));
    return pins;
  }
};

export const getSavedPins = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);

  if (response.ok) {
    const user = await response.json();
    const saved_pins = user.saved_pins;
    await dispatch(actionLoadSavedPins(saved_pins));
    return saved_pins;
  }
};

export const createPin = (pin) => async (dispatch) => {
  const response = await fetch("/api/pins", {
    method: "POST",
    body: pin,
  });

  if (response.ok) {
    const newPin = await response.json();
    const pin = newPin.pin;
    await dispatch(actionCreatePin(pin));
    return pin;
  }
  return response.json();
};

export const updatePin = (pin, pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`, {
    method: "PATCH",
    body: pin,
  });

  if (response.ok) {
    const updatedPin = await response.json();
    const updated_pin = updatedPin.pin;
    await dispatch(actionUpdatePin(updated_pin));
    return updated_pin;
  }
  return response.json();
};

export const deletePin = (pin) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pin.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionRemovePin(pin.id));
    return await response.json();
  }
  return await response.json();
};

export const savePinThunk = (pin, boardId) => async (dispatch) => {
  if (boardId !== 0) {
    const boardResponse = await fetch(`/api/boards/${boardId}`);
    const board = await boardResponse.json();

    const response = await fetch(`/api/pins/${pin.id}/save`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(board),
    });

    if (response.ok) {
      const updatedPin = await response.json();
      await dispatch(actionLoadSavedPins(updatedPin));
      return updatedPin;
    }
    // return await response.json();
  } else {
    const response = await fetch(`/api/pins/${pin.id}/save`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(0),
    });

    if (response.ok) {
      const newPinRes = await response.json();
      // await dispatch(actionUpdatePin(newPinRes));
      await dispatch(actionLoadSavedPins(newPinRes));
      return newPinRes;
    }
    return await response.json();
  }
};

export const unSavePinThunk = (pin) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pin.id}/unsave`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const newPinRes = await response.json();
    //from here, newPinRes is an array, but actionUpdatePin expects
    //an object so for the reducer later, it cannot key into action.pin,
    //and so for our AllPins state, we are getting an undefined as the last item
    //and so for PinIndexItem, it will render loading div
    // await dispatch(actionUpdatePin(newPinRes));
    await dispatch(actionLoadSavedPins(newPinRes));
    return newPinRes;
  }
};

const initialState = {
  allPins: {},
  singlePin: {},
  savedPins: {},
};

const pinReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PINS:
      const allPins = {};
      action.pins.forEach((pin) => {
        allPins[pin.id] = pin;
      });
      return { ...state, allPins: { ...allPins } };
    case LOAD_PIN_DETAIL:
      return { ...state, singlePin: { ...action.pin } };
    case LOAD_USER_PINS:
      const allUserPins = {};
      action.pins.forEach((pin) => {
        allUserPins[pin.id] = pin;
      });
      return { ...state, allPins: { ...allUserPins } };
    case LOAD_SAVED_PINS:
      const allSavedPins = {};
      action.pins.forEach((pin) => {
        allSavedPins[pin.id] = pin;
      });
      return { ...state, savedPins: { ...allSavedPins } };
    case CREATE_PIN:
      return {
        ...state,
        allPins: { ...state.allPins, [action.pin.id]: action.pin },
        singlePin: {},
      };
    case UPDATE_PIN:
      return {
        ...state,
        allPins: { ...state.allPins, [action.pin.id]: action.pin },
        singlePin: {},
      };
    case REMOVE_PIN:
      const newState = { ...state };
      delete newState.allPins[action.id];
      return newState;
    case CLEAR_PINS:
      return { ...state, allPins: {} };
    case CLEAR_PIN_DETAIL:
      return { ...state, singlePin: {} };
    case CLEAR_SAVED_PINS:
      return { ...state, savedPins: {} };
    default:
      return state;
  }
};

export default pinReducer;

const READ_PROFILE = "PROFILEs/READ_PROFILE";
const CLEAR_PROFILE = "PROFILE/CLEAR_PROFILE";

const actionReadProfile = (profile) => ({
  type: READ_PROFILE,
  profile,
});

export const actionClearProfile = () => ({
  type: CLEAR_PROFILE,
});

const initialState = {};

export const getProfile = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}`);

  if (response.ok) {
    const profile = await response.json();
    await dispatch(actionReadProfile(profile));
    return profile;
  }
  return response.json();
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_PROFILE:
      return { ...action.profile };
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};

export default profileReducer;

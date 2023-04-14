const LOAD_FOLLOW = "follows/load";
const UPDATE_FOLLOW = "follows/update";
const CLEAR_FOLLOW = "follows/clear";

export const actionReadFollow = (following, followers) => ({
  type: LOAD_FOLLOW,
  following,
  followers,
});

export const actionClearFollow = () => ({
  type: CLEAR_FOLLOW,
});

export const actionUpdateFollow = (following) => ({
  type: UPDATE_FOLLOW,
  following,
});

export const loadFollowsThunk = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  if (response.ok) {
    const user = await response.json();
    const following = user.following;
    const followers = user.followers;
    await dispatch(actionReadFollow(following, followers));
    return user;
  }
};

export const followOtherThunk = (followingId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followingId}/follow`, {
    method: "POST",
  });
  if (response.ok) {
    const user = await response.json();
    const following = user.following;
    await dispatch(actionUpdateFollow(following));
    return user;
  }
};

export const unFollowOtherThunk = (followingId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followingId}/follow`, {
    method: "DELETE",
  });
  if (response.ok) {
    const user = await response.json();
    const following = user.following;
    await dispatch(actionUpdateFollow(following));
    return user;
  }
};

const initialState = {
  following: {},
  followers: {},
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FOLLOW:
      return {
        ...state,
        following: action.following,
        followers: action.followers,
      };
    case UPDATE_FOLLOW:
      const allFollowing = {};
      action.following.forEach((f) => {
        allFollowing[f.id] = f;
      });
      return {
        ...state,
        following: { ...allFollowing },
      };
    case CLEAR_FOLLOW:
      return {
        ...state,
        following: {},
        followers: {},
      };
    default:
      return state;
  }
};

export default followReducer;

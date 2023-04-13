// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
// const GET_USER_FOLLOWING = "session/GET_USER_FOLLOWING";
// const GET_USER_FOLLOWERS = "session/GET_USER_FOLLOWERS";
const ADD_USER_FOLLOW = "session/ADD_USER_FOLLOW";
const REMOVE_USER_FOLLOW = "session/REMOVE_USER_FOLLOW";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

// const actionGetFollowing = (following) => ({
//   type: GET_USER_FOLLOWING,
//   payload: following,
// });

// const actionGetFollowers = (follower) => ({
//   type: GET_USER_FOLLOWERS,
//   payload: follower,
// });

const actionAddFollow = (user) => ({
  type: ADD_USER_FOLLOW,
  user,
});

const actionRemoveFollow = () => ({
  type: REMOVE_USER_FOLLOW,
});

const initialState = { user: null };

// export const getFollowingThunk = (user) => async (dispatch) => {
//   const response = await fetch(`/api/users/${user.id}`);
//   if (response.ok) {
//     const userRes = await response.json();
//     const following = userRes.following;
//     await dispatch(actionGetFollowing(following));
//     return following;
//   }
// };

// export const getFollowerThunk = (user) => async (dispatch) => {
//   const response = await fetch(`/api/users/${user.id}`);
//   if (response.ok) {
//     const userRes = await response.json();
//     const followers = userRes.followers;
//     await dispatch(actionGetFollowers(followers));
//     return followers;
//   }
// };

export const addFollowThunk = (followingId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followingId}/follow`, {
    method: "POST",
  });

  if (response.ok) {
    const userRes = await response.json();
    // const following = userRes.following;
    // await dispatch(actionGetFollowing(following));
    await dispatch(setUser(userRes));
    return userRes;
  }
};

export const removeFollowThunk = (user, followingId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followingId}/follow`, {
    method: "DELETE",
  });
  if (response.ok) {
    const userRes = await response.json();
    // const following = userRes.following;
    // await dispatch(actionGetFollowing(following));
    await dispatch(setUser(userRes));
    return userRes;
  }
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();

    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
  return response;
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (username, email, password, first_name, last_name, profile_pic, about) =>
  async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        first_name,
        last_name,
        profile_pic,
        about,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    default:
      return state;
  }
}

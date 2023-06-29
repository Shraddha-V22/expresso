import axios from "axios";

export const getAllUsersService = () => {
  return axios.get("/api/users");
};

export const getSingleUserService = (userId) => {
  return axios.get(`/api/users/${userId}`);
};

// /api/users/edit
export const editUserDataService = (userData, token) => {
  return axios.post(
    `/api/users/edit`,
    { userData },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// /api/users/bookmark/
export const getUserBookmarksService = (token) => {
  return axios.get(`/api/users/bookmark`, {
    headers: {
      authorization: token,
    },
  });
};

// /api/users/bookmark/:postId/
export const bookmarkPostService = (postId, token) => {
  return axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

///api/users/remove-bookmark
export const removeBookmarkPostService = (postId, token) => {
  return axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// /api/users/follow/:followUserId/
export const followUserService = (followUserId, token) => {
  return axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// /api/users/unfollow/:followUserId/
export const unfollowUserService = (followUserId, token) => {
  return axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

import axios from "axios";

export const getAllUsersService = () => {
  return axios.get("/api/users");
};

export const getSingleUserService = (userId) => {
  return axios.get(`/api/users/${userId}`);
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

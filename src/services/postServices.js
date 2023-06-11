import axios from "axios";

export const getAllPostsService = () => {
  return axios.get("/api/posts");
};

export const getSinglePostService = (postId) => {
  return axios.get(`/api/posts/${postId}`);
};

export const getUserPostsService = (username) => {
  return axios.get(`/api/posts/user/${username}`);
};

export const likePostService = (postId, token) => {
  return axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

export const dislikePostService = (postId, token) => {
  return axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

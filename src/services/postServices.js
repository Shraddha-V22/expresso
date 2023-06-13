import axios from "axios";
import { v4 as uuid } from "uuid";
import { formatDate } from "../backend/utils/authUtils";

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

// /api/posts/
export const createPostService = (inputText, token) => {
  return axios.post(
    `/api/posts/`,

    {
      postData: {
        content: inputText,
      },
    },

    {
      headers: {
        authorization: token,
      },
    }
  );
};

// /api/posts/edit/:postId
export const editPostService = (inputText, postId, token) => {
  return axios.post(
    `/api/posts/edit/${postId}`,
    {
      postData: {
        content: inputText,
      },
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// /api/posts/:postId
export const deletePostService = (postId, token) => {
  return axios.delete(`/api/posts/${postId}`, {
    headers: {
      authorization: token,
    },
  });
};

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

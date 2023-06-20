import axios from "axios";

// /api/comments/:postId
export const getPostCommentsService = (postId) => {
  return axios.get(`/api/comments/${postId}`);
};

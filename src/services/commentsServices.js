import axios from "axios";

// /api/comments/:postId
export const getPostCommentsService = (postId) => {
  return axios.get(`/api/comments/${postId}`);
};

// /api/comments/add/:postId
export const addPostCommentService = (postId, inputText, token) => {
  return axios.post(
    `/api/comments/add/${postId}`,
    {
      commentData: {
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

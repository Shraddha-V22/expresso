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

// /api/comments/edit/:postId/:commentId
export const editPostCommentService = (postId, commentId, inputText, token) => {
  return axios.post(
    `/api/comments/edit/${postId}/${commentId}`,
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

// /api/comments/delete/:postId/:commentId
export const deletePostCommentService = (postId, commentId, token) => {
  return axios.delete(`/api/comments/delete/${postId}/${commentId}`, {
    headers: {
      authorization: token,
    },
  });
};

// /api/comments/like/:postId/:commentId
export const likePostCommentService = (postId, commentId, token) => {
  return axios.post(
    `/api/comments/like/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

// /api/comments/dislike/:postId/:commentId
export const dislikePostCommentService = (postId, commentId, token) => {
  return axios.post(
    `/api/comments/dislike/${postId}/${commentId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
};

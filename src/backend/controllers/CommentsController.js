import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

/**
 * All the routes related to post comments are present here.
 * */

/**
 * This handler handles getting all comments for a particular post in the db.
 * send GET Request at /api/comments/:postId
 * */

export const getPostCommentsHandler = function (schema, request) {
  const postId = request.params.postId;

  try {
    const post = schema.posts.findBy({ _id: postId }).attrs;
    return new Response(200, {}, { comments: post.comments });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles adding a comment to a particular post in the db.
 * send POST Request at /api/comments/add/:postId
 * */

export const addPostCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);

  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { postId } = request.params;
    const { commentData } = JSON.parse(request.requestBody);

    const comment = {
      _id: uuid(),
      ...commentData,
      likes: {
        likeCount: 0,
        likedBy: [],
        dislikedBy: [],
      },
      username: user.username,
      createdAt: formatDate(),
      updatedAt: formatDate(),
    };
    const post = schema.posts.findBy({ _id: postId }).attrs;
    post.comments.push(comment);

    this.db.posts.update({ _id: postId }, post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles editing a comment to a particular post in the db.
 * send POST Request at /api/comments/edit/:postId/:commentId
 * */

export const editPostCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { postId, commentId } = request.params;
    const { commentData } = JSON.parse(request.requestBody);
    const post = schema.posts.findBy({ _id: postId }).attrs;
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id === commentId
    );
    if (post.comments[commentIndex].username !== user.username) {
      return new Response(
        400,
        {},
        { errors: ["Cannot edit a comment doesn't belong to the User."] }
      );
    }
    post.comments[commentIndex] = {
      ...post.comments[commentIndex],
      ...commentData,
      updatedAt: formatDate(),
    };
    this.db.posts.update({ _id: postId }, post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles deleting a comment to a particular post in the db.
 * send DELETE Request at /api/comments/delete/:postId/:commentId
 * */

export const deletePostCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { postId, commentId } = request.params;
    const post = schema.posts.findBy({ _id: postId }).attrs;
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id === commentId
    );
    if (
      post.comments[commentIndex].username !== user.username &&
      post.username !== user.username
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot delete a comment doesn't belong to the User."] }
      );
    }
    post.comments = post.comments.filter(
      (comment) => comment._id !== commentId
    );
    this.db.posts.update({ _id: postId }, post);
    return new Response(201, {}, { posts: this.db.posts });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles upvoting a comment of a post in the db.
 * send POST Request at /api/comments/like/:postId/:commentId
 * */

export const likePostCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { postId, commentId } = request.params;
    const post = schema.posts.findBy({ _id: postId }).attrs;
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id === commentId
    );

    if (
      post.comments[commentIndex].likes.likedBy.some(
        (currUser) => currUser._id === user._id
      )
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot upvote a post that is already upvoted. "] }
      );
    }
    post.comments[commentIndex].likes.dislikedBy = post.comments[
      commentIndex
    ].likes.dislikedBy.filter((currUser) => currUser._id !== user._id);
    post.comments[commentIndex].likes.likeCount += 1;
    post.comments[commentIndex].likes.likedBy.push(user);
    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { comments: post.comments });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles downvoting a comment of a post in the db.
 * send POST Request at /api/comments/dislike/:postId/:commentId
 * */

export const dislikePostCommentHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: [
            "The username you entered is not Registered. Not Found error",
          ],
        }
      );
    }
    const { postId, commentId } = request.params;
    const post = schema.posts.findBy({ _id: postId }).attrs;
    const commentIndex = post.comments.findIndex(
      (comment) => comment._id === commentId
    );

    if (
      post.comments[commentIndex].likes.dislikedBy.some(
        (currUser) => currUser._id === user._id
      )
    ) {
      return new Response(
        400,
        {},
        { errors: ["Cannot downvote a post that is already downvoted. "] }
      );
    }
    post.comments[commentIndex].likes.likedBy = post.comments[
      commentIndex
    ].likes.likedBy.filter((currUser) => currUser._id !== user._id);
    post.comments[commentIndex].likes.likeCount -= 1;
    post.comments[commentIndex].likes.dislikedBy.push(user);
    this.db.posts.update({ _id: postId }, { ...post, updatedAt: formatDate() });
    return new Response(201, {}, { comments: post.comments });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

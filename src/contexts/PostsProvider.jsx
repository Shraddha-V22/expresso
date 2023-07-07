import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import {
  deletePostService,
  getAllPostsService,
} from "../services/postServices";
import { useEffect } from "react";
import { useReducer } from "react";
import { postReducers } from "../reducers/postsReducers";
import { AUTH, POSTS } from "../common/reducerTypes";
import { useAuth } from "./AuthProvider";
import { addPostCommentService } from "../services/commentsServices";
import { toast } from "react-toastify";

const PostsContext = createContext();
const initialPosts = {
  posts: [],
  postsLoading: true,
  userFeed: [],
  sortedFeed: [],
  sortBy: "latest",
};

export default function PostsProvider({ children }) {
  const {
    userData: {
      user: { userDetails },
    },
    authDispatch,
  } = useAuth();
  const [postsData, postsDispatch] = useReducer(postReducers, initialPosts);

  const getAllPosts = async () => {
    try {
      const { data, status } = await getAllPostsService();
      if (status === 200) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
        postsDispatch({
          type: POSTS.IS_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const getUserFeed = () => {
    const feedPosts = postsData.posts?.filter(
      (post) =>
        userDetails?.following?.find(
          ({ username }) => username === post?.username
        ) || post.username === userDetails?.username
    );
    postsDispatch({ type: POSTS.SET_USER_FEED, payload: feedPosts });
  };

  useEffect(() => {
    getUserFeed();
  }, [postsData.posts, userDetails]);

  const handlePostLike = async (serviceFn, postId, token) => {
    try {
      const { data, status } = await serviceFn(postId, token);
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostBookmark = async (serviceFn, postId, token) => {
    try {
      const { data, status } = await serviceFn(postId, token);
      if (status === 200) {
        authDispatch({ type: AUTH.SET_BOOKMARKS, payload: data.bookmarks });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostDelete = async (postId, token) => {
    try {
      const { data, status } = await deletePostService(postId, token);
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const followUnfollowHandler = async (serviceFn, id, token) => {
    try {
      const { data, status } = await serviceFn(id, token);
      if (status === 200) {
        authDispatch({ type: AUTH.USER_FOLLOW, payload: data.user });
        // setUserProfile(data.followUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addCommentToPost = async (id, input, token) => {
    const toastId = toast.loading("Adding comment...");
    try {
      const { data, status } = await addPostCommentService(id, input, token);
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
        toast.update(toastId, {
          render: "Comment added!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
      // setCommentInput("");
      // setShowCommentInput(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostsContext.Provider
      value={{
        postsData,
        postsDispatch,
        handlePostLike,
        handlePostBookmark,
        handlePostDelete,
        followUnfollowHandler,
        addCommentToPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);

import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllPostsService } from "../services/postServices";
import { useEffect } from "react";
import { useReducer } from "react";
import { postReducers } from "../reducers/postsReducers";
import { POSTS } from "../common/reducerTypes";

const PostsContext = createContext();
const initialPosts = { posts: [], userFeed: [] };

export default function PostsProvider({ children }) {
  const [postsData, postsDispatch] = useReducer(postReducers, initialPosts);

  const getAllPosts = async () => {
    try {
      const { data, status } = await getAllPostsService();
      if (status === 200) {
        postsDispatch({ type: POSTS.INITIALISE, payload: data.posts });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ postsData, postsDispatch }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);

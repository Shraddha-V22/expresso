import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllPostsService } from "../services/postServices";
import { useEffect } from "react";

const PostsContext = createContext();

export default function PostsProvider({ children }) {
  const [postsData, setPostsData] = useState({ posts: [] });

  const getAllPosts = async () => {
    try {
      const { data, status } = await getAllPostsService();
      if (status === 200) {
        setPostsData((prev) => ({ ...prev, posts: data.posts }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ postsData }}>
      {children}
    </PostsContext.Provider>
  );
}

export const usePosts = () => useContext(PostsContext);

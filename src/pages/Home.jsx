import { useState } from "react";

import UserPost from "../components/UserPost";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { formatDate } from "../backend/utils/authUtils";
import { createPostService } from "../services/postServices";

export default function Home() {
  const {
    postsData: { posts },
  } = usePosts();

  return (
    <section>
      <h1>home</h1>
      <p>No Posts</p>
      {/* {posts?.map((post) => (
        <UserPost key={post._id} userPost={post} />
      ))} */}
      <CreatePost />
    </section>
  );
}

function CreatePost() {
  const [inputText, setInputText] = useState("");
  const { postsDispatch } = usePosts();
  const {
    userData: {
      user: { token },
    },
  } = useAuth();

  const createUserPost = async (inputText, token) => {
    try {
      const { data, status } = await createPostService(inputText, token);
      if (status === 201) {
        postsDispatch({ type: POSTS.INITIALISE, payload: data.posts });
      }
    } catch (error) {
      console.error(error);
    }
    console.log("post created");
  };

  return (
    <section className="flex flex-col gap-2 border-[1px] p-4">
      <input
        type="text"
        placeholder="What's on your mind?"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <button
        onClick={() => createUserPost(inputText, token)}
        className="self-end border-[1px]"
      >
        Create
      </button>
    </section>
  );
}

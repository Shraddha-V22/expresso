import { useState } from "react";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { createPostService, editPostService } from "../services/postServices";

export default function CreatePost({ edit, postId }) {
  const [inputText, setInputText] = useState("");
  const { postsDispatch } = usePosts();
  const {
    userData: {
      user: { token },
    },
  } = useAuth();

  const createUserPost = async (inputText, token) => {
    try {
      if (inputText !== "") {
        const { data, status } = await createPostService(inputText, token);
        if (status === 201) {
          postsDispatch({
            type: POSTS.INITIALISE,
            payload: data.posts.reverse(),
          });
          setInputText("");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostEdit = async (inputText, postId, token) => {
    try {
      const { data, status } = await editPostService(inputText, postId, token);
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
        setInputText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-2 border-[1px] p-4">
      <textarea
        placeholder="What's on your mind?"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          setInputText(e.target.value);
        }}
        value={inputText}
        className="resize-none outline-none"
        rows="2"
      />
      {edit ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePostEdit(inputText, postId, token);
          }}
          className="self-end border-[1px]"
        >
          save
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation();
            createUserPost(inputText, token);
          }}
          className="self-end border-[1px]"
        >
          Create
        </button>
      )}
    </section>
  );
}

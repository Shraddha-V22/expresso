import { useState } from "react";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { createPostService, editPostService } from "../services/postServices";
import Button from "./Button";

export default function CreatePost({ edit, post }) {
  const [inputText, setInputText] = useState(post?.content || "");
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
    <section className="flex w-full flex-col gap-2 rounded-md border p-4">
      <textarea
        placeholder="What's on your mind?"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          e.stopPropagation();
          setInputText(e.target.value);
        }}
        value={inputText}
        className="w-full resize-none outline-none"
        rows="2"
      />
      {edit ? (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handlePostEdit(inputText, post?._id, token);
          }}
          className={"self-end"}
          disabled={!inputText?.length}
        >
          save
        </Button>
      ) : (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            createUserPost(inputText, token);
          }}
          className={"self-end"}
          disabled={!inputText?.length}
        >
          Create
        </Button>
      )}
    </section>
  );
}

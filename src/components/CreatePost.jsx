import { useState } from "react";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { createPostService, editPostService } from "../services/postServices";
import Button from "./Button";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { uploadMedia } from "../common/uploadMedia";

export default function CreatePost({ edit, post }) {
  const [inputText, setInputText] = useState(post?.content || "");
  const [media, setMedia] = useState(null);
  const { postsDispatch } = usePosts();
  const {
    userData: {
      user: { token },
    },
  } = useAuth();

  const createUserPost = async (inputText, media, token) => {
    try {
      const response = await uploadMedia(media);
      const { data, status } = await createPostService(
        { content: inputText, mediaUrl: response.url },
        token
      );
      console.log({ data, status });
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
        setInputText("");
        setMedia(null);
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

  const imageUploadHandler = (e) => {
    const file = e.target.files[0];
    console.log(file, file.size);
    if (file.type.split("/")[0] === "image" && file.size > 1024000) {
      toast.error("The image size should not be more than 1mb.");
      return;
    }
    if (file.type.split("/")[0] === "video" && file.size > 7168000) {
      toast.error("The video size should not be more than 7mb.");
      return;
    }
    setMedia(file);
  };

  const btnDisable = !inputText?.trim() && media === null;

  return (
    <section className="flex w-full flex-col gap-2 rounded-md border p-4">
      <div>
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
        {media && (
          <div className="relative w-fit">
            {media.type.split("/")[0] === "image" && (
              <img
                src={URL.createObjectURL(media)}
                alt="post-img"
                className="w-[120px]"
              />
            )}
            {media.type.split("/")[0] === "video" && (
              <video alt="Post-video" className="w-[120px]">
                <source src={URL.createObjectURL(media)} />
              </video>
            )}
            <button
              onClick={() => setMedia(null)}
              className="absolute right-1 top-1 h-4 w-4 rounded-full bg-gray-200 text-[8px]"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        )}
      </div>
      <section className="flex justify-between">
        <div>
          <label htmlFor="file-upload">
            <FontAwesomeIcon icon={faImage} className="cursor-pointer" />
          </label>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*, video/*"
            onChange={imageUploadHandler}
          />
        </div>
        {edit ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handlePostEdit(inputText, post?._id, token);
            }}
            className={"self-end"}
            disabled={btnDisable}
          >
            save
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              createUserPost(inputText, media, token);
            }}
            className={"self-end"}
            disabled={btnDisable}
          >
            Create
          </Button>
        )}
      </section>
    </section>
  );
}

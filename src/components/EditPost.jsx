import { useState } from "react";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { editPostService } from "../services/postServices";
import { POSTS } from "../common/reducerTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import Button from "./Button";
import { uploadMedia } from "../common/uploadMedia";
import Avatar from "./Avatar";
import { toast } from "react-toastify";
import { useTheme } from "../contexts/ThemeProvider";

export default function EditPost({ post, setOpen }) {
  const [editPost, setEditPost] = useState(post || {});
  const [inputText, setInputText] = useState(post?.content || "");
  const [media, setMedia] = useState(null);
  const { postsDispatch } = usePosts();
  const {
    userData: {
      user: { token, userDetails },
    },
  } = useAuth();
  const { theme } = useTheme();

  const handlePostEdit = async (inputText, media, postId, token) => {
    const id = toast.loading("Updating the post...");
    if (media) {
      try {
        const response = await uploadMedia(media);
        const { data, status } = await editPostService(
          { content: inputText, mediaUrl: response.url },
          postId,
          token
        );
        if (status === 201) {
          postsDispatch({
            type: POSTS.INITIALISE,
            payload: data.posts.reverse(),
          });
          setInputText("");
          setMedia(null);
          toast.update(id, {
            render: "Post updated!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.update(id, {
          render: "Update post request failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } else {
      try {
        const { data, status } = await editPostService(
          { content: inputText },
          postId,
          token
        );
        if (status === 201) {
          postsDispatch({
            type: POSTS.INITIALISE,
            payload: data.posts.reverse(),
          });
          setInputText("");
          toast.update(id, {
            render: "Post updated!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
        }
      } catch (error) {
        console.error(error);
        toast.update(id, {
          render: "Update post request failed!",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    }
  };

  const imageUploadHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, video/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
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
    input.click();
  };

  const btnDisable = !inputText?.trim() && media === null;

  return (
    <section className="flex w-full flex-col gap-2 rounded-md border p-4">
      <div>
        <textarea
          placeholder="What's on your mind?"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          value={inputText}
          className={`w-full resize-none bg-inherit text-sm outline-none placeholder:text-sm`}
          rows="2"
        />
        {(media || editPost?.mediaUrl) && (
          <div className="relative w-fit">
            {(editPost?.mediaUrl?.split("/")[4] === "image" ||
              media?.type.split("/")[0] === "image") && (
              <img
                src={media ? URL.createObjectURL(media) : editPost?.mediaUrl}
                alt="post-img"
                className="w-[120px]"
              />
            )}
            {(editPost?.mediaUrl?.split("/")[4] === "video" ||
              media?.type.split("/")[0] === "video") && (
              <video alt="Post-video" className="w-[120px]">
                <source
                  src={media ? URL.createObjectURL(media) : editPost?.mediaUrl}
                />
              </video>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditPost((prev) => ({ ...prev, mediaUrl: null }));
              }}
              className="absolute right-1 top-1 h-4 w-4 rounded-full bg-gray-200 text-[8px] text-mineShaftDark"
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
        )}
      </div>
      <section className="flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            imageUploadHandler();
          }}
        >
          <FontAwesomeIcon icon={faImage} className="cursor-pointer" />
        </button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handlePostEdit(inputText, media, post?._id, token);
            setOpen(false);
          }}
          className={"self-end"}
          disabled={btnDisable}
        >
          save
        </Button>
      </section>
    </section>
  );
}

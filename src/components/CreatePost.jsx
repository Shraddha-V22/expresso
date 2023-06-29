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
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [media, setMedia] = useState(null);
  const { postsDispatch } = usePosts();
  const {
    userData: {
      user: { token, userDetails },
    },
  } = useAuth();

  const createUserPost = async (inputText, media, token) => {
    if (media) {
      try {
        const response = await uploadMedia(media);
        const { data, status } = await createPostService(
          { content: inputText, mediaUrl: response.url },
          token
        );
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
    } else {
      try {
        const { data, status } = await createPostService(
          { content: inputText },
          token
        );
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
    }
  };

  const imageUploadHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, video/*";
    input.onchange = (e) => {
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
    input.click();
  };

  const btnDisable = !inputText?.trim() && media === null;

  return (
    <section className="flex w-full gap-2 rounded-md border p-4">
      <Avatar
        onClick={() => navigate(`/${userDetails?._id}`)}
        profileUrl={userDetails?.profileImg}
      />
      <section className="flex w-full flex-col gap-2">
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
          <button onClick={imageUploadHandler}>
            <FontAwesomeIcon icon={faImage} className="cursor-pointer" />
          </button>
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
        </section>
      </section>
    </section>
  );
}

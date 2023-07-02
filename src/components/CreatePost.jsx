import { useState } from "react";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { createPostService } from "../services/postServices";
import Button from "./Button";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { uploadMedia } from "../common/uploadMedia";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeProvider";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect } from "react";

export default function CreatePost({ modal, setOpen }) {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [media, setMedia] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const { postsDispatch } = usePosts();
  const {
    userData: {
      user: { token, userDetails },
    },
  } = useAuth();
  const { theme } = useTheme();

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
    <section className="flex w-full gap-2 rounded-md border border-sanJuanLight p-4">
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
            className={`w-full resize-none bg-inherit text-sm outline-none placeholder:text-sm`}
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
                className="absolute right-1 top-1 h-4 w-4 rounded-full bg-gray-200 text-[8px] text-sanJuanDark"
              >
                <FontAwesomeIcon icon={faX} />
              </button>
            </div>
          )}
        </div>
        <section className="flex justify-between">
          <div className="relative flex items-center gap-4">
            <button onClick={imageUploadHandler}>
              <FontAwesomeIcon icon={faImage} className="cursor-pointer" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowEmojis((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={faSmile} />
            </button>
            {showEmojis && (
              <div className="absolute top-6 z-10">
                <Picker
                  emojiSize={16}
                  emojiButtonSize={20}
                  navPosition="bottom"
                  previewPosition="none"
                  perLine={6}
                  theme={theme}
                  data={data}
                  onEmojiSelect={(emoji) => {
                    setInputText((prev) => prev + emoji.native);
                  }}
                />
              </div>
            )}
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              createUserPost(inputText, media, token);
              modal && setOpen(false);
            }}
            className={`self-end ${btnDisable && "cursor-not-allowed"}`}
            disabled={btnDisable}
          >
            Create
          </Button>
        </section>
      </section>
    </section>
  );
}

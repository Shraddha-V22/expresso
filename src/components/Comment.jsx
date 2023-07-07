import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersProvider";
import { useAuth } from "../contexts/AuthProvider";
import { usePosts } from "../contexts/PostsProvider";
import { AUTH, POSTS } from "../common/reducerTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as faThumbsUpFilled,
  faArrowLeft,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import Button from "./Button";
import {
  deletePostCommentService,
  dislikePostCommentService,
  editPostCommentService,
  likePostCommentService,
} from "../services/commentsServices";
import { formatPostDate } from "../common/formatPostDate";
import { useTheme } from "../contexts/ThemeProvider";
import { useEffect } from "react";
import Avatar from "./Avatar";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";

export default function Comment({ comment, postId, setComments }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { token, userDetails },
    },
    authDispatch,
  } = useAuth();
  const {
    usersData: { users },
  } = useUsers();
  const { theme } = useTheme();
  const { postsDispatch } = usePosts();
  const { _id, content, username, likes, createdAt } = comment;
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [open, setOpen] = useState(false);

  const user = users.find((user) => user.username === username);

  const clickHandler = (e, func) => {
    e.stopPropagation();
    func;
  };

  const handlePostCommentLike = async (serviceFn, postId, commentId, token) => {
    try {
      const { data, status } = await serviceFn(postId, commentId, token);
      if (status === 201) {
        setComments(data.comments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostCommentDelete = async (postId, commentId, token) => {
    try {
      const { data, status } = await deletePostCommentService(
        postId,
        commentId,
        token
      );
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
      }
      setComments((prev) => prev.filter(({ _id }) => _id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showActions &&
      document.body.addEventListener("click", () => setShowActions(false));
    () =>
      showActions &&
      document.body.removeEventListener("click", () => setShowActions(false));
  }, []);

  return (
    <section
      className={`${
        theme === "dark" ? "" : "border-mineShaftLight"
      } cursor-pointer border-b last-of-type:border-b-0`}
    >
      <section className="relative m-2 grid grid-cols-[auto_1fr] gap-2 p-2 py-1">
        <div className="absolute right-2 top-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions((prev) => !prev);
            }}
            className={`${
              theme === "dark" ? "hover:bg-mineShaftDark" : "hover:bg-gray-100"
            } h-6 w-6 rounded-full hover:bg-gray-100`}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {showActions && (
            <div
              className={`${
                theme === "dark" ? "bg-mineShaft" : "bg-white"
              } absolute -right-[20%] top-5 flex flex-col items-start rounded-md border-[1px] p-1`}
            >
              {user?._id === userDetails?._id ? (
                <div>
                  <Modal
                    className="px-2"
                    setOpen={setOpen}
                    open={open}
                    modalFor={"Edit"}
                  >
                    {
                      <EditComment
                        postId={postId}
                        comment={comment}
                        setComments={setComments}
                        setOpen={setOpen}
                      />
                    }
                  </Modal>
                  <button
                    className="border-t-[1px] px-2"
                    onClick={() => handlePostCommentDelete(postId, _id, token)}
                  >
                    delete
                  </button>
                </div>
              ) : (
                <div>
                  {userDetails?.following.find(
                    ({ username }) => username === user?.username
                  ) ? (
                    <button
                      className="px-2"
                      onClick={(e) =>
                        clickHandler(
                          e,
                          followUnfollowHandler(
                            unfollowUserService,
                            user?._id,
                            token
                          )
                        )
                      }
                    >
                      unfollow
                    </button>
                  ) : (
                    <button
                      className="px-2"
                      onClick={(e) =>
                        clickHandler(
                          e,
                          followUnfollowHandler(
                            followUserService,
                            user?._id,
                            token
                          )
                        )
                      }
                    >
                      follow
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        {/* <div
          onClick={(e) => clickHandler(e, navigate(`/${user?._id}`))}
          className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px]"
        >
          <img
            src={user?.profileImg}
            alt=""
            className="h-full w-full object-cover"
          />
        </div> */}
        <Avatar
          profileUrl={user?.profileImg}
          onClick={(e) => clickHandler(e, navigate(`/${user?._id}`))}
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="leading-5">
              <p className="line-clamp-1 text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="line-clamp-1 text-xs">@{username}</p>
            </div>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } self-start text-xs`}
            >
              {formatPostDate(createdAt)}
            </p>
          </div>
          <div>
            <p className={`text-sm`}>{content}</p>
          </div>
          <div className="flex justify-between text-sm">
            <div
              className={`${
                showLikedBy ? "" : "hidden"
              } fixed left-0 top-0 z-20 flex h-[100vh] w-full flex-col gap-2 overflow-y-auto bg-white p-4 py-2`}
            >
              <button
                className="self-start"
                onClick={(e) => clickHandler(e, setShowLikedBy(false))}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <h4 className="border-b-[1px] pb-1 capitalize">liked by</h4>
              {likes?.likedBy.map((user) => (
                <div
                  key={user._id}
                  className="flex h-[30px] w-[30px] items-center gap-2"
                >
                  <img src={user.profileImg} alt="" className="rounded-full" />
                  <p>@{user.username}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full justify-start gap-2">
            {likes?.likedBy.find(({ _id }) => _id === userDetails._id) ? (
              <div className="flex items-center rounded-md">
                <Button
                  onClick={() =>
                    handlePostCommentLike(
                      dislikePostCommentService,
                      postId,
                      _id,
                      token
                    )
                  }
                  className="border-none pl-2"
                >
                  <FontAwesomeIcon icon={faThumbsUpFilled} />
                </Button>
                <p
                  className="cursor-pointer pr-2"
                  onClick={(e) =>
                    clickHandler(
                      e,
                      setShowLikedBy((prev) => !prev)
                    )
                  }
                >
                  {likes?.likeCount}
                </p>
              </div>
            ) : (
              <div className="flex items-center rounded-md">
                <Button
                  onClick={() =>
                    handlePostCommentLike(
                      likePostCommentService,
                      postId,
                      _id,
                      token
                    )
                  }
                  className="border-none pl-2"
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </Button>
                <p
                  className="cursor-pointer pr-2"
                  onClick={(e) =>
                    clickHandler(
                      e,
                      setShowLikedBy((prev) => !prev)
                    )
                  }
                >
                  {likes?.likeCount}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}

function EditComment({ postId, setOpen, comment, setComments }) {
  const {
    userData: {
      user: { token },
    },
  } = useAuth();
  const { postsDispatch } = usePosts();
  const [showEmojis, setShowEmojis] = useState(false);
  const { theme } = useTheme();
  const [inputText, setInputText] = useState(comment?.content);

  const editPostComment = async (postId, commentId, inputText, token) => {
    const id = toast.loading("Updating Comment...");
    try {
      const { data, status } = await editPostCommentService(
        postId,
        commentId,
        inputText,
        token
      );
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
        setComments((prev) =>
          prev.map((co) =>
            co._id === commentId ? { ...co, content: inputText } : co
          )
        );
        toast.update(id, {
          render: "Comment Updated!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Edited comment"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        className={`rounded-full ${
          theme === "dark" ? "bg-mineShaftDark" : "bg-gray-200"
        } p-1 indent-2 outline-none placeholder:text-sm placeholder:capitalize`}
      />
      <div className="relative flex justify-between">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEmojis((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={faSmile} />
        </button>
        {showEmojis && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-6 z-10"
          >
            <Picker
              emojiSize={16}
              emojiButtonSize={20}
              navPosition="bottom"
              previewPosition="none"
              perLine={8}
              theme={theme}
              data={data}
              onEmojiSelect={(emoji) => {
                setInputText((prev) => prev + emoji.native);
              }}
            />
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            editPostComment(postId, comment?._id, inputText, token);
            setOpen(false);
          }}
          className={`${
            theme === "dark"
              ? "active:bg-mineShaftDark/40"
              : "active:bg-gray-100"
          } self-end rounded-full border px-3 py-1 capitalize`}
        >
          post
        </button>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersProvider";
import { dislikePostService, likePostService } from "../services/postServices";
import { useAuth } from "../contexts/AuthProvider";
import { usePosts } from "../contexts/PostsProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faBookmark,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import {
  faThumbsUp as faThumbsUpFilled,
  faArrowLeft,
  faBookmark as faBookmarkFilled,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import {
  bookmarkPostService,
  followUserService,
  removeBookmarkPostService,
  unfollowUserService,
} from "../services/userServices";
import Modal from "./Modal";
import Button from "./Button";
import { formatPostDate } from "../common/formatPostDate";
import EditPost from "./EditPost";
import Avatar from "./Avatar";
import Linkify from "react-linkify";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeProvider";
import ImgModal from "./ImgModal";
import { componentDecorator } from "../common/componentDecorator";

export default function UserPost({ userPost, isSinglePage }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { token, userDetails },
    },
  } = useAuth();
  const {
    handlePostLike,
    handlePostBookmark,
    handlePostDelete,
    followUnfollowHandler,
    addCommentToPost,
  } = usePosts();
  const {
    usersData: { users },
  } = useUsers();
  const { theme } = useTheme();
  const { _id, content, username, likes, comments, createdAt } = userPost;

  const [commentInput, setCommentInput] = useState("");
  const [flags, setFlags] = useState({
    showLikedBy: false,
    showActions: false,
    showCommentInput: false,
  });
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

  const user = users.find((user) => user.username === username);

  const clickHandler = (e, func) => {
    e.stopPropagation();
    func;
  };

  useEffect(() => {
    document.body.addEventListener("click", () =>
      setFlags({
        showLikedBy: false,
        showActions: false,
        showCommentInput: false,
      })
    );
    () =>
      document.body.removeEventListener("click", () =>
        setFlags({
          showLikedBy: false,
          showActions: false,
          showCommentInput: false,
        })
      );
  }, []);

  return (
    <section
      className={`${!isSinglePage && "cursor-pointer"}`}
      onClick={() => !isSinglePage && navigate(`/post/${_id}`)}
      onDoubleClick={(e) =>
        clickHandler(e, handlePostLike(likePostService, _id, token))
      }
    >
      <section
        className={`${
          theme === "dark" ? "bg-mineShaftLight" : "border bg-white"
        } ${
          !isSinglePage && theme === "light" && "hover:bg-mineShaftLighter/10"
        } relative m-auto grid grid-cols-[auto_1fr] gap-2 rounded-md border-mineShaftLight p-2`}
      >
        <Avatar
          onClick={(e) => clickHandler(e, navigate(`/${user?._id}`))}
          profileUrl={user?.profileImg}
        />
        <div className="flex flex-col gap-2">
          <div className="leading-5">
            <div className="flex items-center justify-start gap-4">
              <p className="line-clamp-1 text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } justify-end`}
              >
                {formatPostDate(createdAt)}
              </p>
              <div className="absolute right-2 top-2 ml-auto">
                <button
                  onClick={(e) =>
                    clickHandler(
                      e,
                      setFlags((prev) => ({
                        ...prev,
                        showActions: !prev.showActions,
                      }))
                    )
                  }
                  className={`h-6 w-6 rounded-full ${
                    theme === "dark"
                      ? "hover:bg-mineShaftDark"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
                {flags.showActions && (
                  <div
                    className={`absolute -right-[20%] top-5 flex flex-col items-start rounded-md border-[1px] ${
                      theme === "dark" ? "bg-mineShaft" : "bg-white"
                    } p-1`}
                  >
                    {user?._id === userDetails?._id ? (
                      <div>
                        <Modal
                          className="px-2"
                          open={open}
                          setOpen={setOpen}
                          modalFor={"Edit"}
                        >
                          {<EditPost post={userPost} setOpen={setOpen} />}
                        </Modal>
                        <button
                          className="border-t-[1px] px-2"
                          onClick={(e) =>
                            clickHandler(e, handlePostDelete(_id, token))
                          }
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
            </div>
            <p className="text-xs">@{username}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm tracking-tight">
              <Linkify componentDecorator={componentDecorator}>
                {content}
              </Linkify>
            </p>
            {userPost?.mediaUrl && (
              <div className="max-h-[500px] w-full overflow-hidden rounded-md bg-gray-800">
                {userPost?.mediaUrl.split("/")[4] === "image" && (
                  <>
                    <img
                      src={userPost?.mediaUrl}
                      alt="post-img"
                      className="h-full w-full object-cover"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenImg(true);
                      }}
                    />
                    <ImgModal openImg={openImg} setOpenImg={setOpenImg}>
                      <img
                        src={userPost?.mediaUrl}
                        alt=""
                        className="max-h-[70vh] max-w-[70vw]"
                      />
                    </ImgModal>
                  </>
                )}
                {userPost?.mediaUrl.split("/")[4] === "video" && (
                  <>
                    <video
                      controls
                      src={userPost?.mediaUrl}
                      alt="Post-video"
                      className="h-full w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenImg(true);
                      }}
                    ></video>
                    <ImgModal openImg={openImg} setOpenImg={setOpenImg}>
                      <video
                        controls
                        src={userPost?.mediaUrl}
                        alt="Post-video"
                        className="max-h-[70vh] max-w-[70vw]"
                      ></video>
                    </ImgModal>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="relative flex justify-between text-sm">
            <div
              className={`${flags.showLikedBy ? "" : "hidden"} ${
                theme === "dark" ? "bg-mineShaftDark" : "bg-gray-200"
              } absolute bottom-0 z-20 flex max-h-[300px] w-[200px] flex-col gap-2 overflow-y-auto rounded-md p-4 py-2 shadow-one`}
            >
              <button
                className="self-start"
                onClick={(e) =>
                  clickHandler(
                    e,
                    setFlags((prev) => ({ ...prev, showLikedBy: false }))
                  )
                }
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <h4 className="border-b border-mineShaftLighter pb-1 capitalize">
                liked by
              </h4>
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
          <div
            className={`flex w-full gap-2 border-t ${
              theme === "dark" ? "border-white" : "border-mineShaftLight"
            } pt-2`}
          >
            {likes?.likedBy.find(({ _id }) => _id === userDetails._id) ? (
              <div className="flex items-center rounded-md">
                <Button
                  className="border-none pl-2"
                  onClick={(e) =>
                    clickHandler(
                      e,
                      handlePostLike(dislikePostService, _id, token)
                    )
                  }
                >
                  <FontAwesomeIcon icon={faThumbsUpFilled} />
                </Button>
                <p
                  className="cursor-pointer pr-2"
                  onClick={(e) =>
                    clickHandler(
                      e,
                      setFlags((prev) => ({
                        ...prev,
                        showLikedBy: !prev.showLikedBy,
                      }))
                    )
                  }
                >
                  {likes?.likeCount}
                </p>
              </div>
            ) : (
              <div className="flex items-center rounded-md">
                <Button
                  className="border-none pl-2"
                  onClick={(e) =>
                    clickHandler(e, handlePostLike(likePostService, _id, token))
                  }
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </Button>
                <p
                  className="cursor-pointer pr-2"
                  onClick={(e) =>
                    clickHandler(
                      e,
                      setFlags((prev) => ({
                        ...prev,
                        showLikedBy: !prev.showLikedBy,
                      }))
                    )
                  }
                >
                  {likes?.likeCount}
                </p>
              </div>
            )}
            <div className="flex items-center rounded-md">
              <Button
                onClick={(e) =>
                  clickHandler(
                    e,
                    setFlags((prev) => ({
                      ...prev,
                      showCommentInput: !prev.showCommentInput,
                    }))
                  )
                }
                className="border-none pl-2"
              >
                <FontAwesomeIcon icon={faComment} />
              </Button>
              <p className="pr-2">{comments?.length}</p>
            </div>

            {userDetails?.bookmarks.find((postId) => postId === _id) ? (
              <Button
                onClick={(e) =>
                  clickHandler(
                    e,
                    handlePostBookmark(removeBookmarkPostService, _id, token)
                  )
                }
                className="border-none"
              >
                <FontAwesomeIcon icon={faBookmarkFilled} />
              </Button>
            ) : (
              <Button
                onClick={(e) =>
                  clickHandler(
                    e,
                    handlePostBookmark(bookmarkPostService, _id, token)
                  )
                }
                className="border-none"
              >
                <FontAwesomeIcon icon={faBookmark} />
              </Button>
            )}
          </div>
        </div>
      </section>
      {flags.showCommentInput && !isSinglePage && (
        <section className="m-2 flex justify-end gap-2 p-2 pt-0">
          <input
            type="text"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className={`flex-grow rounded-full bg-mineShaftLighter/30 p-1 indent-2 outline-none placeholder:text-sm ${
              theme === "dark"
                ? "placeholder:text-mineShaftLighter"
                : "placeholder:text-mineShaftLight"
            }`}
          />
          <button
            onClick={(e) => {
              clickHandler(e, addCommentToPost(_id, commentInput, token));
              setCommentInput("");
              setFlags((prev) => ({ ...prev, showCommentInput: false }));
            }}
            className="rounded-full border border-mineShaftLight px-3 py-1 text-sm capitalize"
          >
            post
          </button>
        </section>
      )}
      {isSinglePage && (
        <section className="m-2 flex justify-end gap-2 p-2 pt-0">
          <input
            type="text"
            onClick={(e) => e.stopPropagation()}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
            className={`flex-grow rounded-full bg-mineShaftLighter/30 p-1 indent-2 outline-none placeholder:text-sm ${
              theme === "dark"
                ? "placeholder:text-gray-500"
                : "placeholder:text-mineShaftLight"
            }`}
          />
          <button
            onClick={(e) => {
              clickHandler(e, addCommentToPost(_id, commentInput, token));
              setCommentInput("");
              setFlags((prev) => ({ ...prev, showCommentInput: false }));
            }}
            className="rounded-full border border-mineShaftLight px-3 py-1 text-sm capitalize disabled:opacity-50"
            disabled={commentInput === ""}
          >
            post
          </button>
        </section>
      )}
    </section>
  );
}

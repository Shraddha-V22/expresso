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
import CreatePost from "./CreatePost";
import Button from "./Button";
import { formatPostDate } from "../common/formatPostDate";

export default function UserPost({ userPost }) {
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
  const { _id, content, username, likes, comments, createdAt } = userPost;
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const user = users.find((user) => user.username === username);

  const clickHandler = (e, func) => {
    e.stopPropagation();
    func;
  };

  return (
    <section
      className="cursor-pointer"
      onClick={() => navigate(`/post/${_id}`)}
    >
      <section className="relative grid grid-cols-[auto_1fr] gap-2 rounded-md border p-2">
        <div className="absolute right-2 top-2">
          <button
            onClick={(e) =>
              clickHandler(
                e,
                setShowActions((prev) => !prev)
              )
            }
            className="h-6 w-6 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {showActions && (
            <div className="absolute -right-[20%] top-5 flex flex-col items-start rounded-md border-[1px] bg-white p-1">
              {user?._id === userDetails?._id ? (
                <div>
                  <Modal className="px-2" modalFor={"Edit"}>
                    {<CreatePost edit post={userPost} />}
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
        <div
          onClick={(e) => clickHandler(e, navigate(`/${user?._id}`))}
          className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px]"
        >
          <img
            src={user?.profileImg}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="leading-5">
            <div className="flex items-center gap-4">
              <p className="text-sm">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-600">
                {formatPostDate(createdAt)}
              </p>
            </div>
            <p className="text-xs">@{username}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className={`text-sm`}>{content}</p>
            {userPost?.mediaUrl && (
              <div className="h-[200px] w-full rounded-md border bg-gray-800">
                {userPost?.mediaUrl.split("/")[4] === "image" && (
                  <img
                    src={userPost?.mediaUrl}
                    alt="post-img"
                    className="mx-auto h-full"
                  />
                )}
                {userPost?.mediaUrl.split("/")[4] === "video" && (
                  <video alt="Post-video" className="mx-auto h-full">
                    <source src={userPost?.mediaUrl} />
                  </video>
                )}
              </div>
            )}
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
          <div className="flex w-full gap-2">
            {likes?.likedBy.find(({ _id }) => _id === userDetails._id) ? (
              <div className="flex items-center rounded-md border">
                <Button
                  className="border-none px-2"
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
                  className="cursor-pointer px-2"
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
              <div className="flex items-center rounded-md border">
                <Button
                  className="border-none px-2"
                  onClick={(e) =>
                    clickHandler(e, handlePostLike(likePostService, _id, token))
                  }
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                </Button>
                <p
                  className="cursor-pointer px-2"
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
            <div className="flex items-center rounded-md border">
              <Button
                onClick={(e) =>
                  clickHandler(
                    e,
                    setShowCommentInput((prev) => !prev)
                  )
                }
                className="border-none px-2"
              >
                <FontAwesomeIcon icon={faComment} />
              </Button>
              <p className="px-2">{comments?.length}</p>
            </div>

            {userDetails?.bookmarks.find((postId) => postId === _id) ? (
              <Button
                onClick={(e) =>
                  clickHandler(
                    e,
                    handlePostBookmark(removeBookmarkPostService, _id, token)
                  )
                }
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
              >
                <FontAwesomeIcon icon={faBookmark} />
              </Button>
            )}
          </div>
        </div>
      </section>
      {showCommentInput && (
        <section className="m-2 flex justify-end gap-2 p-2 pt-0">
          <input
            type="text"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="write comment..."
            className="flex-grow rounded-full bg-gray-200 p-1 indent-2 outline-none placeholder:capitalize"
          />
          <button
            onClick={(e) => {
              clickHandler(e, addCommentToPost(_id, commentInput, token));
              setCommentInput("");
              setShowCommentInput(false);
            }}
            className="rounded-full border px-3 py-1 capitalize"
          >
            post
          </button>
        </section>
      )}
    </section>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersProvider";
import { useAuth } from "../contexts/AuthProvider";
import { usePosts } from "../contexts/PostsProvider";
import { AUTH, POSTS } from "../common/reducerTypes";
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
import Modal from "./Modal";
import CreatePost from "./CreatePost";
import Button from "./Button";
import {
  dislikePostCommentService,
  editPostCommentService,
  likePostCommentService,
} from "../services/commentsServices";

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
  const { _id, content, username, likes, createdAt } = comment;
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [showActions, setShowActions] = useState(false);

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

  return (
    <section className="cursor-pointer">
      <section className="relative m-2 grid grid-cols-[auto_1fr] gap-2 rounded-md border-[1px] p-2">
        <div className="absolute right-2 top-2">
          <button
            onClick={() => setShowActions((prev) => !prev)}
            className="h-6 w-6 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
          {showActions && (
            <div className="absolute -right-[20%] top-5 flex flex-col items-start rounded-md border-[1px] bg-white p-1">
              {user?._id === userDetails?._id ? (
                <div>
                  <Modal className="px-2" modalFor={"Edit"}>
                    {
                      <EditComment
                        postId={postId}
                        comment={comment}
                        setComments={setComments}
                      />
                    }
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
            <p className="text-sm">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs">@{username}</p>
          </div>
          <p className="text-xs">{createdAt}</p>
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
              <div className="flex items-center rounded-md border">
                <Button
                  onClick={() =>
                    handlePostCommentLike(
                      dislikePostCommentService,
                      postId,
                      _id,
                      token
                    )
                  }
                  className="border-none px-2"
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
                  onClick={() =>
                    handlePostCommentLike(
                      likePostCommentService,
                      postId,
                      _id,
                      token
                    )
                  }
                  className="border-none px-2"
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
          </div>
        </div>
      </section>
    </section>
  );
}

function EditComment({ postId, comment, setComments }) {
  const {
    userData: {
      user: { token },
    },
  } = useAuth();
  const { postsDispatch } = usePosts();
  const [inputText, setInputText] = useState(comment?.content);

  const editPostComment = async (postId, commentId, inputText, token) => {
    try {
      const { data, status } = await editPostCommentService(
        postId,
        commentId,
        inputText,
        token
      );
      console.log({ data, status });
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
        className="rounded-full bg-gray-200 p-1 indent-2 outline-none placeholder:text-sm placeholder:capitalize"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          editPostComment(postId, comment?._id, inputText, token);
        }}
        className="self-end rounded-full border px-3 py-1 capitalize"
      >
        post
      </button>
    </section>
  );
}

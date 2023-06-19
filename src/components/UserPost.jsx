import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersProvider";
import {
  deletePostService,
  dislikePostService,
  likePostService,
} from "../services/postServices";
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
import {
  bookmarkPostService,
  followUserService,
  removeBookmarkPostService,
  unfollowUserService,
} from "../services/userServices";
import Modal from "./Modal";
import CreatePost from "./CreatePost";
import Button from "./Button";

export default function UserPost({ userPost }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { token, userDetails },
    },
    authDispatch,
  } = useAuth();
  const { postsDispatch } = usePosts();
  const {
    usersData: { users },
  } = useUsers();
  const { _id, content, username, likes, createdAt } = userPost;
  const [showLikedBy, setShowLikedBy] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const user = users.find((user) => user.username === username);

  const handlePostLike = async (serviceFn, postId, token) => {
    try {
      const { data, status } = await serviceFn(postId, token);
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostBookmark = async (serviceFn, postId, token) => {
    try {
      const { data, status } = await serviceFn(postId, token);
      if (status === 200) {
        authDispatch({ type: AUTH.SET_BOOKMARKS, payload: data.bookmarks });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostDelete = async (postId, token) => {
    try {
      const { data, status } = await deletePostService(postId, token);
      if (status === 201) {
        postsDispatch({
          type: POSTS.INITIALISE,
          payload: data.posts.reverse(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const followUnfollowHandler = async (serviceFn, id, token) => {
    try {
      const { data, status } = await serviceFn(id, token);
      if (status === 200) {
        authDispatch({ type: AUTH.USER_FOLLOW, payload: data.user });
        // setUserProfile(data.followUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clickHandler = (e, func) => {
    e.stopPropagation();
    func;
  };

  return (
    <section
      className="cursor-pointer"
      onClick={() => navigate(`/post/${_id}`)}
    >
      <section className="relative m-2 grid grid-cols-[auto_1fr] gap-2 rounded-md border-[1px] p-2">
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
                    {<CreatePost edit postId={_id} />}
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
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs">@{username}</p>
          </div>
          <p className="text-xs">{createdAt}</p>
          <div>
            <p className={`text-sm`}>{content}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p
              className="cursor-pointer"
              onClick={(e) =>
                clickHandler(
                  e,
                  setShowLikedBy((prev) => !prev)
                )
              }
            >
              likes {likes?.likeCount}
            </p>
            <p>comments 0</p>
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
              <Button
                onClick={(e) =>
                  clickHandler(
                    e,
                    handlePostLike(dislikePostService, _id, token)
                  )
                }
              >
                <FontAwesomeIcon icon={faThumbsUpFilled} />
              </Button>
            ) : (
              <Button
                onClick={(e) =>
                  clickHandler(e, handlePostLike(likePostService, _id, token))
                }
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </Button>
            )}
            <Button>
              <FontAwesomeIcon icon={faComment} />
            </Button>

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
    </section>
  );
}

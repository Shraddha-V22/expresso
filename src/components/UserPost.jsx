import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../contexts/UsersProvider";
import { dislikePostService, likePostService } from "../services/postServices";
import { useAuth } from "../contexts/AuthProvider";
import { usePosts } from "../contexts/PostsProvider";
import { AUTH, POSTS } from "../common/reducerTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpFilled } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkFilled } from "@fortawesome/free-solid-svg-icons";
import {
  bookmarkPostService,
  removeBookmarkPostService,
} from "../services/userServices";

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
  const [readMore, setReadMore] = useState(false);
  const [showLikedBy, setShowLikedBy] = useState(false);

  const user = users.find((user) => user.username === username);

  const handlePostLike = async (serviceFn, postId, token) => {
    try {
      const { data, status } = await serviceFn(postId, token);
      console.log(data.posts);
      if (status === 201) {
        postsDispatch({ type: POSTS.INITIALISE, payload: data.posts });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostBookmark = async (serviceFn, postId, token) => {
    try {
      const { data, status } = await serviceFn(postId, token);
      console.log(data.bookmarks);
      if (status === 200) {
        authDispatch({ type: AUTH.SET_BOOKMARKS, payload: data.bookmarks });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="m-2 grid grid-cols-[auto_1fr] gap-2 border-2 p-2">
      <div
        onClick={() => navigate(`/${user?._id}`)}
        className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px]"
      >
        <img
          src={user?.profileImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p>@{username}</p>
          <p className="text-xs">{createdAt}</p>
        </div>
        <div>
          <p className={`${readMore ? "" : "line-clamp-3"} text-sm`}>
            {content}
          </p>
          {/* <button
            onClick={() => setReadMore((prev) => !prev)}
            className="text-sm text-blue-500 underline"
          >
            {readMore ? "read less" : "read more"}
          </button> */}
        </div>
        <div className="flex justify-between text-sm">
          <p
            className="cursor-pointer"
            onClick={() => setShowLikedBy((prev) => !prev)}
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
              onClick={() => setShowLikedBy(false)}
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
        <div className="flex w-full justify-evenly gap-2">
          {likes?.likedBy.find(({ _id }) => _id === userDetails._id) ? (
            <button
              className="w-full border-[1px]"
              onClick={() => handlePostLike(dislikePostService, _id, token)}
            >
              <FontAwesomeIcon icon={faThumbsUpFilled} />
            </button>
          ) : (
            <button
              className="w-full border-[1px]"
              onClick={() => handlePostLike(likePostService, _id, token)}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
          )}
          <button className="w-full border-[1px]">Comment</button>

          {userDetails?.bookmarks.find((postId) => postId === _id) ? (
            <button
              className="w-full border-[1px]"
              onClick={() =>
                handlePostBookmark(removeBookmarkPostService, _id, token)
              }
            >
              <FontAwesomeIcon icon={faBookmarkFilled} />
            </button>
          ) : (
            <button
              className="w-full border-[1px]"
              onClick={() =>
                handlePostBookmark(bookmarkPostService, _id, token)
              }
            >
              <FontAwesomeIcon icon={faBookmark} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

// {
//   _id: uuid(),
//   content:
//     "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
//   likes: {
//     likeCount: 0,
//     likedBy: [],
//     dislikedBy: [],
//   },
//   username: "shubhamsoni",
//   createdAt: formatDate(),
//   updatedAt: formatDate(),
// },

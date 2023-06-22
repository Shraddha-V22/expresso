import { usePosts } from "../contexts/PostsProvider";
import Modal from "../components/Modal";
import CreatePost from "../components/CreatePost";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { useEffect } from "react";
import UserPost from "../components/UserPost";

export default function Home() {
  const {
    postsData: { posts, userFeed },
    postsDispatch,
  } = usePosts();
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();

  const getUserFeed = () => {
    const feedPosts = posts?.filter(
      (post) =>
        userDetails?.following?.find(
          ({ username }) => username === post?.username
        ) || post.username === userDetails?.username
    );
    postsDispatch({ type: POSTS.SET_USER_FEED, payload: feedPosts });
  };

  useEffect(() => {
    getUserFeed();
  }, [posts, userDetails]);

  return (
    <section className="w-full">
      {/* <h1>home</h1> */}
      <CreatePost />
      <section className="mt-2 flex flex-col gap-2">
        {userFeed?.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))}
      </section>
    </section>
  );
}

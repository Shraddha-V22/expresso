import { useMemo } from "react";
import UserPost from "../components/UserPost";
import { usePosts } from "../contexts/PostsProvider";
import { useAuth } from "../contexts/AuthProvider";

export default function Explore() {
  const {
    postsData: { posts },
  } = usePosts();
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();

  const explorePosts = useMemo(() => {
    return posts.filter(({ username }) => username !== userDetails?.username);
  }, [posts, userDetails]);

  return (
    <section>
      {/* <h1>Explore</h1> */}
      <section className="flex flex-col gap-2 py-2">
        {explorePosts?.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))}
      </section>
    </section>
  );
}

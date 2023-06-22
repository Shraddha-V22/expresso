import UserPost from "../components/UserPost";
import { usePosts } from "../contexts/PostsProvider";

export default function Explore() {
  const {
    postsData: { posts },
  } = usePosts();

  return (
    <section>
      {/* <h1>Explore</h1> */}
      <section className="flex flex-col gap-2">
        {posts?.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))}
      </section>
    </section>
  );
}

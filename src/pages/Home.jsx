import UserPost from "../components/UserPost";
import { usePosts } from "../contexts/PostsProvider";

export default function Home() {
  const {
    postsData: { posts },
  } = usePosts();

  return (
    <section>
      <h1>home</h1>
      <p>No Posts</p>
      {/* {posts?.map((post) => (
        <UserPost key={post._id} userPost={post} />
      ))} */}
    </section>
  );
}

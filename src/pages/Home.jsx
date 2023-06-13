import { usePosts } from "../contexts/PostsProvider";
import Modal from "../components/Modal";
import CreatePost from "../components/CreatePost";

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
      <Modal />
      <CreatePost />
    </section>
  );
}

import UserPost from "../components/UserPost";
import { useAuth } from "../contexts/AuthProvider";

export default function Bookmarks() {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();

  return (
    <section>
      <h1>Bookmarks</h1>
      {userDetails?.bookmarks?.length > 0 ? (
        userDetails?.bookmarks.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))
      ) : (
        <h4>There are no bookmarks</h4>
      )}
    </section>
  );
}

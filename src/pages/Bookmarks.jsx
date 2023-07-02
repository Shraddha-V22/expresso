import { useEffect } from "react";
import UserPost from "../components/UserPost";
import { useAuth } from "../contexts/AuthProvider";
import { usePosts } from "../contexts/PostsProvider";
import { useState } from "react";

export default function Bookmarks() {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const {
    postsData: { posts },
  } = usePosts();

  const getUserBookmarks = (bookmarkIdsArr, posts) => {
    const bookmarks = [];
    for (let i = 0; i < bookmarkIdsArr.length; i++) {
      bookmarks.push(posts?.find((post) => post._id === bookmarkIdsArr[i]));
    }
    setBookmarks(bookmarks);
  };

  useEffect(() => {
    getUserBookmarks(userDetails?.bookmarks, posts);
  }, [posts, userDetails]);

  return (
    <section className="w-full max-w-[500px] py-2">
      {/* <h1>Bookmarks</h1> */}
      {bookmarks?.length > 0 ? (
        <section className="flex flex-col gap-2">
          {bookmarks.map((post) => (
            <UserPost key={post._id} userPost={post} />
          ))}
        </section>
      ) : (
        <div className="grid min-h-[100px] place-items-center">
          <h4>There are no bookmarks</h4>
        </div>
      )}
    </section>
  );
}

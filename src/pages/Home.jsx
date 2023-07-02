import { usePosts } from "../contexts/PostsProvider";
import Modal from "../components/Modal";
import CreatePost from "../components/CreatePost";
import { useAuth } from "../contexts/AuthProvider";
import { POSTS } from "../common/reducerTypes";
import { useEffect } from "react";
import UserPost from "../components/UserPost";
import { useState } from "react";

export default function Home() {
  const {
    postsData: { sortedFeed, sortBy },
    postsDispatch,
  } = usePosts();
  const [showSorts, setShowSorts] = useState(false);

  const handleSort = (e) => {
    e.stopPropagation();
    const { value } = e.target;
    postsDispatch({ type: POSTS.SORT_USER_FEED, payload: value });
    setShowSorts(false);
  };

  useEffect(() => {
    showSorts &&
      document.body.addEventListener("click", () => setShowSorts(false));
    () =>
      showSorts &&
      document.body.removeEventListener("click", () => setShowSorts(false));
  }, []);

  return (
    <section className="mb-2 mt-2 flex w-full flex-col items-center gap-2">
      <CreatePost />
      {sortedFeed?.length ? (
        <>
          <section className="relative flex w-full items-center gap-1">
            <div className="h-[0.5px] flex-grow bg-sanJuanLight"></div>
            <p className="text-xs capitalize">{sortBy}</p>
            <button
              className="text-[10px]"
              onClick={(e) => {
                e.stopPropagation();
                setShowSorts((prev) => !prev);
              }}
            >
              ▼
            </button>
            {showSorts && (
              <ul className="absolute right-0 top-4 z-10 flex w-[80px] flex-col gap-2 bg-gray-100 px-2 py-1 text-sm">
                <div>
                  <input
                    value="top"
                    className="hidden"
                    type="radio"
                    id="top"
                    name="sort"
                    onChange={handleSort}
                  />
                  <label
                    className="cursor-pointer hover:text-gray-600"
                    htmlFor="top"
                  >
                    Top
                  </label>
                </div>
                <div>
                  <input
                    value="latest"
                    className="hidden"
                    type="radio"
                    id="latest"
                    name="sort"
                    onChange={handleSort}
                  />
                  <label
                    className="cursor-pointer hover:text-gray-600"
                    htmlFor="latest"
                  >
                    Latest
                  </label>
                </div>
                <div>
                  <input
                    value="oldest"
                    className="hidden"
                    type="radio"
                    id="oldest"
                    name="sort"
                    onChange={handleSort}
                  />
                  <label
                    className="cursor-pointer hover:text-gray-600"
                    htmlFor="oldest"
                  >
                    Oldest
                  </label>
                </div>
              </ul>
            )}
          </section>
          <section className="flex w-full flex-col gap-2">
            {sortedFeed?.map((post) => (
              <UserPost key={post._id} userPost={post} />
            ))}
          </section>
        </>
      ) : (
        <h4 className="mt-4 text-center">
          Follow people to get feed as per your taste.
        </h4>
      )}
    </section>
  );
}

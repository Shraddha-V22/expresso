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
    const { value } = e.target;
    setShowSorts(false);
    postsDispatch({ type: POSTS.SORT_USER_FEED, payload: value });
  };

  return (
    <section className="flex w-full flex-col gap-2">
      <CreatePost />
      <section className="relative flex items-center gap-1">
        <hr className="flex-grow" />
        <p className="text-xs capitalize">{sortBy}</p>
        <button
          className="text-[10px]"
          onClick={() => setShowSorts((prev) => !prev)}
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
      <section className="mt-2 flex flex-col gap-2">
        {sortedFeed?.map((post) => (
          <UserPost key={post._id} userPost={post} />
        ))}
      </section>
    </section>
  );
}

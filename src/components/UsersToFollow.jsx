import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { followUserService } from "../services/userServices";
import { usePosts } from "../contexts/PostsProvider";

export default function UsersToFollow({ user, forSearch }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { token },
    },
  } = useAuth();
  const { followUnfollowHandler } = usePosts();

  return (
    <section
      onClick={() => navigate(`/${user?._id}`)}
      className="flex min-w-[250px] cursor-pointer items-center gap-2 border-b p-2 last:border-b-0"
    >
      <div className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px]">
        <img
          src={user?.profileImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="leading-5">
        <p className="text-sm">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs">@{user?.username}</p>
      </div>
      {!forSearch && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            followUnfollowHandler(followUserService, user?._id, token);
          }}
          className="ml-auto rounded-full border-[1px] px-2 py-1 text-sm"
        >
          + follow
        </button>
      )}
    </section>
  );
}
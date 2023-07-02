import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { followUserService } from "../services/userServices";
import { usePosts } from "../contexts/PostsProvider";
import Avatar from "./Avatar";
import { useTheme } from "../contexts/ThemeProvider";

export default function UsersToFollow({ user, forSearch }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { token },
    },
  } = useAuth();
  const { theme } = useTheme();
  const { followUnfollowHandler } = usePosts();

  return (
    <section
      onClick={() => navigate(`/${user?._id}`)}
      className="grid w-[250px] cursor-pointer grid-cols-[1fr_auto] items-center gap-2 border-b border-sanJuanLighter p-2 last:border-b-0"
    >
      <div className="flex gap-2">
        <Avatar onClick={() => {}} profileUrl={user?.profileImg} />
        <div className="leading-5">
          <p className="line-clamp-1 text-sm">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="line-clamp-1 text-xs">@{user?.username}</p>
        </div>
      </div>
      {!forSearch && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            followUnfollowHandler(followUserService, user?._id, token);
          }}
          className={`ml-auto w-[70px] rounded-full ${
            theme === "dark"
              ? "bg-japnicaDark text-sanJuanDark hover:bg-japnica active:bg-japnicaDarker"
              : "border bg-japnica"
          } border-sanJuanLight px-2 py-1 text-sm`}
        >
          + follow
        </button>
      )}
    </section>
  );
}

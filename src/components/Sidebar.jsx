import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthProvider";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../contexts/ThemeProvider";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar({ showMenu, setShowMenu }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { userDetails },
    },
    signOut,
  } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const goToUserProfile = (userId) => {
    navigate(`/${userId}`);
    setShowMenu(false);
  };

  return (
    <section
      onClick={() => setShowMenu(false)}
      className={`${
        showMenu ? "left-0" : "-left-[100vw]"
      } absolute top-0 z-10 w-full duration-300 min-[350px]:hidden`}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`flex h-[100vh] w-[70vw] flex-col gap-4 bg-black p-6 text-white`}
      >
        <section className="flex flex-col gap-2 border-b-[1px] pb-4">
          <div className="flex items-start justify-between">
            <Avatar
              onClick={(e) => {
                e.stopPropagation();
                goToUserProfile(`/${userDetails?._id}`);
              }}
              profileUrl={userDetails?.profileImg}
            />
            <button onClick={() => setShowMenu(false)} className="">
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>
          <p
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              goToUserProfile(userDetails?._id);
            }}
          >
            @{userDetails?.username}
          </p>
          <p className="text-xs">
            {userDetails?.following?.length} Following{" "}
            {userDetails?.followers?.length} Followers
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <div
            onClick={(e) => {
              e.stopPropagation();
              goToUserProfile(userDetails?._id);
            }}
            className="flex cursor-pointer items-center gap-4"
          >
            <FontAwesomeIcon icon={faUser} />
            <p>Profile</p>
          </div>
          {theme === "dark" ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="flex cursor-pointer items-center gap-4"
            >
              <FontAwesomeIcon icon={faSun} />
              <p>Light mode</p>
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="flex cursor-pointer items-center gap-4"
            >
              <FontAwesomeIcon icon={faMoon} />
              <p>Dark mode</p>
            </button>
          )}
          <div
            className="flex cursor-pointer items-center gap-4"
            onClick={signOut}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <p>Logout</p>
          </div>
        </section>
      </aside>
    </section>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthProvider";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ showMenu, setShowMenu }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();

  const goToUserProfile = (userId) => {
    navigate(`/${userId}`);
    setShowMenu(false);
  };

  return (
    <aside
      className={`${
        showMenu ? "left-0" : "-left-[80vw]"
      } absolute top-0 z-10 flex h-[100vh] w-[80vw] flex-col gap-4 bg-black p-6 text-white duration-300`}
    >
      <section className="flex flex-col gap-2 border-b-[1px] pb-4">
        <div className="flex items-start justify-between">
          <div
            onClick={() => goToUserProfile(userDetails?._id)}
            className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px] bg-white"
          >
            <img
              src={userDetails?.profileImg}
              alt=""
              className="h-full w-full"
            />
          </div>
          <button onClick={() => setShowMenu(false)} className="">
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <p
          className="cursor-pointer"
          onClick={() => goToUserProfile(userDetails?._id)}
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
          onClick={() => goToUserProfile(userDetails?._id)}
          className="flex items-center gap-4"
        >
          <FontAwesomeIcon icon={faUser} />
          <p>Profile</p>
        </div>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p>Logout</p>
        </div>
      </section>
    </aside>
  );
}

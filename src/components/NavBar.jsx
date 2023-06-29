import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../contexts/AuthProvider";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const activeStyle = ({ isActive }) => {
    return { color: isActive ? "black" : "black" };
  };

  return (
    <nav className="fixed bottom-0 z-[5] flex w-full justify-evenly border-[1px] bg-white py-1">
      <NavLink style={activeStyle} to="/">
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
      <NavLink style={activeStyle} to="/search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </NavLink>
      <NavLink style={activeStyle} to="/explore">
        <FontAwesomeIcon icon={faCompass} />
      </NavLink>
      <NavLink style={activeStyle} to="/bookmarks">
        <FontAwesomeIcon icon={faBookmark} />
      </NavLink>
    </nav>
  );
}

export function SideNavBar() {
  const {
    userData: {
      user: { userDetails },
    },
    signOut,
  } = useAuth();
  const activeStyle = ({ isActive }) => {
    return { color: isActive ? "black" : "black" };
  };
  return (
    <nav className="flex h-full w-auto flex-col items-start justify-start gap-4 border-r bg-white px-2 pt-4 max-[500px]:items-center">
      <NavLink
        style={activeStyle}
        to="/"
        className="flex w-full items-center gap-2  rounded-full px-2 py-1 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faHouse} className="w-[20px]" />
        <p className="max-[768px]:hidden">Home</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to={`/${userDetails?._id}`}
        className="flex w-full items-center gap-2  rounded-full px-2 py-1 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faUser} className="w-[20px]" />
        <p className="max-[768px]:hidden">Profile</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/explore"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faCompass} className="w-[20px]" />
        <p className="max-[768px]:hidden">Explore</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/bookmarks"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
      >
        <FontAwesomeIcon icon={faBookmark} className="w-[20px]" />
        <p className="max-[768px]:hidden">Bookmarks</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/search"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100 sm:hidden"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[20px]" />
        <p className="max-[768px]:hidden">Search</p>
      </NavLink>
      <div
        className="flex w-full cursor-pointer items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-100"
        onClick={signOut}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-[20px]" />
        <p className="max-[768px]:hidden">Logout</p>
      </div>
    </nav>
  );
}

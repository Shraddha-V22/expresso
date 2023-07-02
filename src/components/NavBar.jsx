import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../contexts/AuthProvider";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";
import { useState } from "react";
import CreatePost from "./CreatePost";

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
    return {
      backgroundColor: isActive ? "#5B7F9990" : "",
    };
  };

  const [open, setOpen] = useState(false);

  return (
    <nav className="flex h-full w-auto flex-col items-start justify-start gap-4 px-2 pt-4 max-[500px]:items-center">
      <NavLink
        style={activeStyle}
        to="/"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-sanJuanLighter/40 "
      >
        <FontAwesomeIcon icon={faHouse} className="w-[20px]" />
        <p className="max-[768px]:hidden">Home</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to={`/${userDetails?._id}`}
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-sanJuanLighter/40 "
      >
        <FontAwesomeIcon icon={faUser} className="w-[20px]" />
        <p className="max-[768px]:hidden">Profile</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/explore"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-sanJuanLighter/40 "
      >
        <FontAwesomeIcon icon={faCompass} className="w-[20px]" />
        <p className="max-[768px]:hidden">Explore</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/bookmarks"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-sanJuanLighter/40 "
      >
        <FontAwesomeIcon icon={faBookmark} className="w-[20px]" />
        <p className="max-[768px]:hidden">Bookmarks</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/search"
        className="flex w-full items-center gap-2 rounded-full px-2 py-1 hover:bg-sanJuanLighter/40  sm:hidden"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[20px]" />
        <p className="max-[768px]:hidden">Search</p>
      </NavLink>
      <div
        className="flex w-full cursor-pointer items-center gap-2 rounded-full px-2 py-1 hover:bg-sanJuanLighter/40  "
        onClick={signOut}
      >
        <FontAwesomeIcon icon={faRightFromBracket} className="w-[20px]" />
        <p className="max-[768px]:hidden">Logout</p>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        modalFor={
          <div className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-sanJuanLight bg-sanJuanLight px-2 py-1 text-white duration-200 hover:bg-white hover:text-sanJuan min-[768px]:pr-4">
            <FontAwesomeIcon icon={faPlus} className="w-[20px]" />
            <p className="max-[768px]:hidden">Create</p>
          </div>
        }
      >
        <CreatePost setOpen={setOpen} modal />
      </Modal>
    </nav>
  );
}

{
  /* <Modal
                    className="px-2"
                    open={open}
                    setOpen={setOpen}
                    modalFor={"Edit"} */
}

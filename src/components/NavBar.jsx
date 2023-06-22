import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { faCompass } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const activeStyle = ({ isActive }) => {
    return { color: isActive ? "black" : "black" };
  };

  return (
    <nav className="fixed bottom-0 z-10 flex w-full justify-evenly border-[1px] bg-white py-1">
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
  const activeStyle = ({ isActive }) => {
    return { color: isActive ? "black" : "black" };
  };
  return (
    <nav className="flex h-full w-auto flex-col items-start justify-start gap-4 border-r bg-white px-4 pt-4 max-[500px]:items-center">
      <NavLink style={activeStyle} to="/" className="flex items-center gap-2">
        <FontAwesomeIcon icon={faHouse} className="w-[20px]" />
        <p className="max-[500px]:hidden">Home</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/explore"
        className="flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faCompass} className="w-[20px]" />
        <p className="max-[500px]:hidden">Explore</p>
      </NavLink>
      <NavLink
        style={activeStyle}
        to="/bookmarks"
        className="flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faBookmark} className="w-[20px]" />
        <p className="max-[500px]:hidden">Bookmarks</p>
      </NavLink>
    </nav>
  );
}

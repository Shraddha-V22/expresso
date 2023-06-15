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

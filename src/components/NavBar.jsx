import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { NavLink } from "react-router-dom";
import { faCompass } from "@fortawesome/free-regular-svg-icons";

export default function NavBar() {
  return (
    <nav className="fixed bottom-0 z-10 flex w-full justify-evenly border-[1px] bg-white">
      <NavLink to="/">
        <FontAwesomeIcon icon={faHouse} />
      </NavLink>
      <NavLink to="/search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </NavLink>
      <NavLink to="/explore">
        <FontAwesomeIcon icon={faCompass} />
      </NavLink>
      <NavLink to="/bookmarks">
        <FontAwesomeIcon icon={faBookmark} />
      </NavLink>
    </nav>
  );
}

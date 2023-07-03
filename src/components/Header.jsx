import { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthProvider";
import EXPRESSO from "../assets/EXPRESSO.webp";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeProvider";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`fixed top-0 z-10 flex w-full items-center justify-between border-b border-sanJuanLight ${
        theme === "dark" ? "bg-sanJuan" : "bg-white"
      } px-2 py-1`}
    >
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px] min-[350px]:hidden"
      >
        <img
          src={userDetails?.profileImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </button>
      <div className="w-4 max-[350px]:hidden"></div>
      <Link to="/">
        <img
          src={EXPRESSO}
          alt=""
          className="h-[40px] w-[200px] object-cover max-[350px]:w-[100px]"
        />
      </Link>
      <div className="w-4 min-[350px]:hidden"></div>
      <button
        onClick={(e) => {
          toggleTheme();
        }}
        className="mr-2 flex cursor-pointer items-center justify-items-end gap-4 max-[350px]:hidden"
      >
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
  );
}

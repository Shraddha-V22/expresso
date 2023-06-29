import { useState } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthProvider";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-white px-2 py-1 min-[350px]:justify-center">
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
      <h1 className="text-xl">Expresso</h1>
      <div className="w-4 min-[350px]:hidden"></div>
      <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
    </header>
  );
}

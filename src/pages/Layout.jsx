import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar, { SideNavBar } from "../components/NavBar";
import FollowSuggestions from "../components/FollowSuggestions";
import { DesktopSearch } from "./Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../contexts/ThemeProvider";

export default function Layout() {
  const { theme } = useTheme();
  return (
    <section
      className={`${
        theme === "dark" && "bg-mineShaftDark text-gray-300"
      } relative h-[100vh] gap-2 pt-1 font-karla min-[390px]:flex min-[390px]:justify-center`}
    >
      <Header />
      <section className="min-[390px]:hidden">
        <NavBar />
      </section>
      <aside className="mt-[40px] border-r border-mineShaftLight pt-2 max-[390px]:hidden">
        <SideNavBar />
      </aside>
      <main
        className={`${
          theme === "dark" && "bg-mineShaftDark text-gray-300"
        } mt-[50px] max-w-[500px] flex-grow overflow-y-auto pb-[50px]`}
      >
        <Outlet />
      </main>
      <section className="mt-[40px] border-l border-mineShaftLight pt-2 max-[600px]:hidden">
        <DesktopSearch />
        <FollowSuggestions />
      </section>
    </section>
  );
}

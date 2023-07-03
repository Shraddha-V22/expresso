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
        theme === "dark" && "bg-sanJuanDark text-gray-300"
      } relative h-[100vh] gap-2 pt-1 font-karla min-[350px]:flex min-[350px]:justify-center`}
    >
      <Header />
      <section className="min-[350px]:hidden">
        <NavBar />
      </section>
      <aside className="mt-[50px] border-r border-sanJuanLight max-[350px]:hidden">
        <SideNavBar />
      </aside>
      <main
        className={`${
          theme === "dark" && "bg-sanJuanDark text-gray-300"
        } mt-[50px] max-w-[500px] flex-grow overflow-y-auto pb-[50px]`}
      >
        <Outlet />
      </main>
      <section className="mt-[50px] border-l border-sanJuanLight max-[600px]:hidden">
        <DesktopSearch />
        <FollowSuggestions />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </section>
  );
}

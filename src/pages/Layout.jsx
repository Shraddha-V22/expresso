import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar, { SideNavBar } from "../components/NavBar";
import FollowSuggestions from "../components/FollowSuggestions";
import { DesktopSearch } from "./Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  return (
    <section className="relative gap-2 min-[350px]:flex min-[350px]:justify-center">
      <Header />
      <section className="min-[350px]:hidden">
        <NavBar />
      </section>
      <aside className="mt-[60px] max-[350px]:hidden">
        <SideNavBar />
      </aside>
      <main className="mt-[60px] max-w-[500px] flex-grow">
        <Outlet />
      </main>
      <section className="mt-[60px] border-x max-[600px]:hidden">
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

import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar, { SideNavBar } from "../components/NavBar";
import FollowSuggestions from "../components/FollowSuggestions";
import { DesktopSearch } from "./Search";

export default function Layout() {
  return (
    <section className="relative gap-2 min-[350px]:flex min-[350px]:justify-center">
      <Header />
      <section className="min-[350px]:hidden">
        <NavBar />
      </section>
      <aside className="mt-[70px] max-[350px]:hidden">
        <SideNavBar />
      </aside>
      <main className="mt-[70px] max-w-[500px] flex-grow">
        <Outlet />
      </main>
      <section className="mt-[70px] border-x max-[768px]:hidden">
        <DesktopSearch />
        <FollowSuggestions />
      </section>
    </section>
  );
}

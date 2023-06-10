import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function Layout() {
  return (
    <section className="relative">
      <Header />
      <Outlet />
      <NavBar />
    </section>
  );
}

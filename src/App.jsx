import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import AuthProvider from "./contexts/AuthProvider";
import RequiredAuth from "./components/RequiredAuth";
import Home from "./pages/Home";
import PostsProvider from "./contexts/PostsProvider";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import UsersProvider from "./contexts/UsersProvider";
import Explore from "./pages/Explore";

function AppRouter() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/:userId" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

function App() {
  return (
    <AuthProvider>
      <UsersProvider>
        <PostsProvider>
          <AppRouter />
        </PostsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;

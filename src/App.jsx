import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useAuth } from "./contexts/AuthProvider";
import RequiredAuth from "./components/RequiredAuth";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Bookmarks from "./pages/Bookmarks";
import Post from "./pages/Post";
import ProfileSetup from "./pages/ProfileSetup";
import { Navigate } from "react-router-dom";

function AppRouter() {
  const {
    userData: {
      user: { token },
    },
  } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/:userId" element={<Profile />} />
            <Route path="/post/:postId" element={<Post />} />
          </Route>
          <Route path="/profile-setup" element={<ProfileSetup />} />
        </Route>
        {token === "" ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/registration" element={<Navigate to="/" replace />} />
          </>
        )}
      </>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

function App() {
  return <AppRouter />;
}

export default App;

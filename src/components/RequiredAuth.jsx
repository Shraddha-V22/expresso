import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequiredAuth() {
  const location = useLocation();
  const {
    userData: { isLoggedIn },
  } = useAuth();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

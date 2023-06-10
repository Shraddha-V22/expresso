import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginCreds, setLoginCreds] = useState({ username: "", password: "" });
  const {
    signIn,
    userData: { isLoggedIn },
  } = useAuth();

  const credsChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginCreds((prev) => ({ ...prev, [name]: value }));
  };

  const userSignIn = (e, creds) => {
    e.preventDefault();
    signIn(creds);
  };

  useEffect(() => {
    isLoggedIn && navigate(location?.state?.from?.pathname);
  }, [isLoggedIn]);

  return (
    <section>
      <form className="m-1 flex flex-col gap-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border-[1px]"
          onChange={credsChangeHandler}
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          className="border-[1px]"
          onChange={credsChangeHandler}
        />
        <button
          className="border-[1px]"
          onClick={(e) => userSignIn(e, loginCreds)}
        >
          Sign In
        </button>
      </form>
      <p>
        Not registered? <Link to="/registration">Sign Up</Link>
      </p>
    </section>
  );
}

import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import FormInput from "../components/FormInput";
import AuthContainer from "../components/AuthContainer";

export default function Login() {
  const navigate = useNavigate();
  const [loginCreds, setLoginCreds] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  return (
    <AuthContainer>
      <h1 className="mb-4 text-2xl capitalize">sign in</h1>
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <FormInput
            name="username"
            placeholder="Username"
            onChange={credsChangeHandler}
          />
          <FormInput
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={credsChangeHandler}
          />
        </div>
        <div className="mb-2 ml-1 flex items-center gap-1">
          <input
            type="checkbox"
            name=""
            id="show-pass"
            className="cursor-pointer"
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <label className="text-xs" htmlFor="show-pass">
            Show Password
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="h-8 rounded-md border-[1px] px-2 text-sm"
            onClick={(e) => userSignIn(e, loginCreds)}
          >
            Sign In
          </button>
          <button
            className="h-8 rounded-md border-[1px] px-2 text-sm outline-none"
            onClick={(e) =>
              userSignIn(e, {
                username: "shraddha__22",
                password: "password@123",
              })
            }
          >
            Sign In as guest
          </button>
        </div>
      </form>
      <p className="text-sm">
        Not registered?{" "}
        <Link className="text-blue-500" to="/registration">
          Sign Up
        </Link>
      </p>
    </AuthContainer>
  );
}

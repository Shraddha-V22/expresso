import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import AuthContainer from "../components/AuthContainer";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "../common/validatorFns";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const location = useLocation();
  const [signUpCreds, setSignUpCreds] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const {
    signUp,
    userData: {
      isLoggedIn,
      user: { userDetails },
    },
  } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const credsChangeHandler = (e) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setSignUpCreds((prev) => ({ ...prev, [name]: value }));
  };

  const userSignUp = (e, creds) => {
    e.preventDefault();
    if (!validateName(signUpCreds.firstName)) {
      setErrorMsg("Invalid Firstname!");
      return;
    }
    if (!validateName(signUpCreds.lastName)) {
      setErrorMsg("Invalid Lastname!");
      return;
    }
    if (!validateEmail(signUpCreds.email)) {
      setErrorMsg("Please enter a valid email!");
      return;
    }
    if (!validateUsername(signUpCreds.username)) {
      setErrorMsg("Please enter a username!");
      return;
    }
    if (!validatePassword(signUpCreds.password)) {
      setErrorMsg("Password: 1 number, 1 letter, 1 unique character (!#$%&?)");
      return;
    }
    if (
      signUpCreds.confirmPassword !== signUpCreds.password &&
      signUpCreds.password !== signUpCreds.confirmPassword
    ) {
      setErrorMsg("Password does not match!");
      return;
    }
    signUp(creds);
  };

  useEffect(() => {
    isLoggedIn && navigate("/profile-setup", { replace: true });
  }, [isLoggedIn]);

  return (
    <AuthContainer>
      <h1 className="text-2xl capitalize">Sign up</h1>
      <form className="m-1 flex flex-col gap-2">
        <FormInput
          name="firstName"
          placeholder="Firstname"
          onChange={credsChangeHandler}
        />
        <FormInput
          name="lastName"
          placeholder="Lastname"
          onChange={credsChangeHandler}
        />
        <FormInput
          name="email"
          placeholder="Email"
          onChange={credsChangeHandler}
        />
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
        <FormInput
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={credsChangeHandler}
        />
        <div className="mb-2 ml-1 flex items-center gap-1">
          {showPassword ? (
            <button type="button" onClick={() => setShowPassword(false)}>
              <FontAwesomeIcon icon={faSquareCheck} />
            </button>
          ) : (
            <button type="button" onClick={() => setShowPassword(true)}>
              <FontAwesomeIcon icon={faSquare} />
            </button>
          )}
          <p className="text-xs">Show Password</p>
        </div>
        {errorMsg && (
          <p className="max-w-[200px] text-xs text-red-500">{errorMsg}</p>
        )}
        <button
          className="h-8 rounded-md border-[1px] px-2 text-sm"
          type="button"
          onClick={(e) => userSignUp(e, signUpCreds)}
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm">
        Already registered?{" "}
        <Link className="text-blue-500" to="/login">
          Sign In
        </Link>
      </p>
    </AuthContainer>
  );
}

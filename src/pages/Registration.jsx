import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import FormInput from "../components/FormInput";
import AuthContainer from "../components/AuthContainer";
import { useNavigate } from "react-router-dom";
import { validateName, validatePassword } from "../common/validatorFns";

export default function Registration() {
  const navigate = useNavigate();
  const [signUpCreds, setSignUpCreds] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  const credsChangeHandler = (e) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setSignUpCreds((prev) => ({ ...prev, [name]: value }));
  };

  // console.log(errorMsg);
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
    if (!validatePassword(signUpCreds.password)) {
      setErrorMsg(
        "Password: 8 characters, 1 number, 1 letter, 1 unique character (!#$%&?)"
      );
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
    navigate("/profile-setup");
  };

  return (
    <AuthContainer>
      <h1>Sign up</h1>
      <form className="m-1 flex flex-col gap-2">
        {/* <div className="flex flex-col gap-2"> */}
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
          name="username"
          placeholder="Username"
          onChange={credsChangeHandler}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          onChange={credsChangeHandler}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={credsChangeHandler}
        />
        {/* </div> */}
        {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
        {/* <div></div> */}
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

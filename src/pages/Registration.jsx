import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";

export default function Registration() {
  const [signUpCreds, setSignUpCreds] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const { signUp } = useAuth();

  const credsChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpCreds((prev) => ({ ...prev, [name]: value }));
  };

  const userSignUp = (e, creds) => {
    e.preventDefault();
    signUp(creds);
  };

  return (
    <section>
      <form className="m-1 flex flex-col gap-2">
        <input
          type="text"
          name="firstName"
          placeholder="Firstname"
          className="border-[1px]"
          onChange={credsChangeHandler}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Lastname"
          className="border-[1px]"
          onChange={credsChangeHandler}
        />
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
          onClick={(e) => userSignUp(e, signUpCreds)}
        >
          Sign Up
        </button>
      </form>
      <p>
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
}

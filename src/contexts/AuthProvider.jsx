import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { loginService, signUpService } from "../services/authServices";
import {
  bookmarkPostService,
  removeBookmarkPostService,
} from "../services/userServices";
import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { AUTH } from "../common/reducerTypes";

const AuthContext = createContext();
const initialUser = {
  user: {
    userDetails: {},
    token: "",
  },
  isLoggedIn: false,
};

export default function AuthProvider({ children }) {
  const [userData, authDispatch] = useReducer(authReducer, initialUser);

  const signUp = async (creds) => {
    try {
      const request = await signUpService(creds);
      const { createdUser, encodedToken } = request.data;
      if (request.status === 201) {
        authDispatch({
          type: AUTH.SIGN_UP,
          payload: { createdUser, encodedToken },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async (creds) => {
    try {
      const request = await loginService(creds);
      const { foundUser, encodedToken } = request.data;
      if (request.status === 200) {
        authDispatch({
          type: AUTH.SIGN_IN,
          payload: { foundUser, encodedToken },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    authDispatch({ type: AUTH.SIGN_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        signIn,
        signUp,
        signOut,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

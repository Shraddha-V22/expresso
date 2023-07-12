import { useContext } from "react";
import { createContext } from "react";
import { loginService, signUpService } from "../services/authServices";
import { useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { AUTH } from "../common/reducerTypes";
import { toast } from "react-toastify";

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
      if (error.response.status === 422) {
        toast.error("User already exists! Do you want to login instead?");
      } else {
        toast.error("Something went wrong!");
      }
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
      if (error.response.status === 401) {
        toast.error("Invalid Email or Password entered!");
      } else if (error.response.status === 404) {
        toast.error("User not fuond. Please Sign Up first!");
      } else {
        toast.error("Something went wrong!");
      }
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

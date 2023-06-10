import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { loginService, signUpService } from "../services/authServices";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [userData, setUserData] = useState({ user: {}, isLoggedIn: false });

  const signUp = async (creds) => {
    try {
      const request = await signUpService(creds);
      const { createdUser, encodedToken } = request.data;
      if (request.status === 201) {
        setUserData({
          user: { userDetails: createdUser, token: encodedToken },
          isLoggedIn: true,
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
        setUserData({
          user: { userDetails: foundUser, token: encodedToken },
          isLoggedIn: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    setUserData({ user: {}, isLoggedIn: false });
  };

  return (
    <AuthContext.Provider value={{ userData, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

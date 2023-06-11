import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { loginService, signUpService } from "../services/authServices";
import {
  bookmarkPostService,
  removeBookmarkPostService,
} from "../services/userServices";

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

  const bookmarkPost = async (postId, token) => {
    try {
      const { data, status } = await bookmarkPostService(postId, token);
      if (status === 200) {
        setUserData((prev) => ({
          ...prev,
          user: {
            ...userData.user,
            userDetails: {
              ...userData.user.userDetails,
              bookmarks: data.bookmarks,
            },
          },
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const removeBookmarkPost = async (postId, token) => {
    try {
      const { data, status } = await removeBookmarkPostService(postId, token);
      if (status === 200) {
        setUserData((prev) => ({
          ...prev,
          user: {
            ...userData.user,
            userDetails: {
              ...userData.user.userDetails,
              bookmarks: data.bookmarks,
            },
          },
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        signIn,
        signUp,
        signOut,
        bookmarkPost,
        removeBookmarkPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

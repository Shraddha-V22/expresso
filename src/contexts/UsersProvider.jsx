import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllUsersService } from "../services/userServices";
import { useReducer } from "react";
import { usersReducers } from "../reducers/usersReducers";
import { USERS } from "../common/reducerTypes";
import { useAuth } from "./AuthProvider";

const UsersContext = createContext();

const initialUsers = {
  users: [],
};

export default function UsersProvider({ children }) {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const [usersData, usersDispatch] = useReducer(usersReducers, initialUsers);

  const getAllUsers = async () => {
    try {
      const { data, status } = await getAllUsersService();
      if (status === 200) {
        usersDispatch({ type: USERS.INITIALISE, payload: data.users });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [userDetails]);

  return (
    <UsersContext.Provider value={{ usersData, usersDispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);

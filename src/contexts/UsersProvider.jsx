import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllUsersService } from "../services/userServices";

const UsersContext = createContext();

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      const { data, status } = await getAllUsersService();
      if (status === 200) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users }}>{children}</UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);

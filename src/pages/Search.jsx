import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useUsers } from "../contexts/UsersProvider";
import { useMemo } from "react";
import UsersToFollow from "../components/UsersToFollow";
import FollowSuggestions from "../components/FollowSuggestions";
import { useTheme } from "../contexts/ThemeProvider";

const useToggleOnFocus = (initialState = false) => {
  const [show, setShow] = useState(initialState);

  const eventHandlers = useMemo(
    () => ({
      onFocus: () => setShow(true),
      // onBlur: () => setShow(false),
    }),
    []
  );

  return [show, eventHandlers];
};

export default function Search() {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const {
    usersData: { users },
  } = useUsers();
  const [show, eventHandlers] = useToggleOnFocus();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");

  const getUsersToFollow = useMemo(
    () =>
      users?.filter(
        (user) =>
          !userDetails?.following?.find(({ _id }) => _id === user._id) &&
          user._id !== userDetails?._id
      ),
    [users, userDetails]
  );

  const searchSuggestions = useMemo(
    () =>
      searchText.length > 0 &&
      users?.filter(
        ({ username, firstName, lastName }) =>
          username !== userDetails?.username &&
          (username.toLowerCase().includes(searchText.toLowerCase()) ||
            firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            lastName.toLowerCase().includes(searchText.toLowerCase()))
      ),
    [searchText]
  );

  return (
    <section className="flex flex-col items-center px-2 py-2">
      <div className="w-full border-b pb-2">
        <input
          type="text"
          placeholder="search user"
          {...eventHandlers}
          onChange={(e) => setSearchText(e.target.value)}
          className={`${
            theme === "dark" ? "bg-sanJuanDark" : ""
          } w-full rounded-full border p-1 indent-2 outline-none`}
        />
      </div>
      {!show ? (
        <FollowSuggestions />
      ) : searchSuggestions.length ? (
        searchSuggestions?.map((user) => (
          <UsersToFollow key={user._id} user={user} forSearch />
        ))
      ) : searchText.length ? (
        <p className="w-full py-2 text-center">No user found</p>
      ) : (
        <p className="w-full py-2 text-center">search user</p>
      )}
    </section>
  );
}

export function DesktopSearch() {
  const {
    usersData: { users },
  } = useUsers();
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");

  const searchSuggestions = useMemo(
    () =>
      searchText.length > 0 &&
      users?.filter(
        ({ username, firstName, lastName }) =>
          username !== userDetails?.username &&
          (username.toLowerCase().includes(searchText.toLowerCase()) ||
            firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            lastName.toLowerCase().includes(searchText.toLowerCase()))
      ),
    [searchText]
  );

  return (
    <div className="relative w-full border-b border-sanJuanLight px-2 py-2">
      <input
        type="text"
        placeholder="search user"
        onChange={(e) => setSearchText(e.target.value)}
        className={`${
          theme === "dark" ? "bg-sanJuanDark" : ""
        } w-full rounded-full border border-sanJuanLight p-1 indent-2 text-sm outline-none placeholder:text-sm`}
      />
      {searchText && (
        <section
          className={`${
            theme === "dark" ? "bg-sanJuan" : ""
          } absolute max-h-[350px] w-[250px] overflow-y-auto rounded-md border bg-white`}
        >
          {searchSuggestions?.length ? (
            searchSuggestions?.map((user) => (
              <UsersToFollow key={user._id} user={user} forSearch />
            ))
          ) : (
            <p className="h-fit w-full p-1 text-sm">No user found</p>
          )}
        </section>
      )}
    </div>
  );
}

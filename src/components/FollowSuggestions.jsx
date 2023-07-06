import { useMemo } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useUsers } from "../contexts/UsersProvider";
import UsersToFollow from "./UsersToFollow";
import { useState } from "react";
import { useTheme } from "../contexts/ThemeProvider";

export default function FollowSuggestions({ isSuggestion }) {
  const {
    userData: {
      user: { userDetails },
    },
  } = useAuth();
  const {
    usersData: { users },
  } = useUsers();
  const { theme } = useTheme();

  const getUsersToFollow = useMemo(
    () =>
      users
        ?.filter(
          (user) =>
            !userDetails?.following?.find(({ _id }) => _id === user._id) &&
            user._id !== userDetails?._id
        )
        .slice(0, 4),
    [users, userDetails]
  );

  return (
    <section className={`px-2 ${theme === "dark" ? "" : ""}`}>
      {getUsersToFollow?.map((user) => (
        <UsersToFollow key={user._id} user={user} isSuggestion={isSuggestion} />
      ))}
    </section>
  );
}

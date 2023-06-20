import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { useUsers } from "../contexts/UsersProvider";
import { useMemo } from "react";
import { AUTH } from "../common/reducerTypes";
import { followUserService } from "../services/userServices";
import { useNavigate } from "react-router-dom";

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
    <section>
      <input
        type="text"
        placeholder="search user"
        {...eventHandlers}
        onChange={(e) => setSearchText(e.target.value)}
        className="rounded-full border-[1px] p-1 indent-2 outline-none"
      />
      {!show ? (
        getUsersToFollow?.map((user) => (
          <UsersToFollow key={user._id} user={user} />
        ))
      ) : searchSuggestions.length ? (
        searchSuggestions?.map((user) => (
          <UsersToFollow key={user._id} user={user} forSearch />
        ))
      ) : searchText.length ? (
        <p>No user found</p>
      ) : (
        <p>search user</p>
      )}
    </section>
  );
}

function UsersToFollow({ user, forSearch }) {
  const navigate = useNavigate();
  const {
    userData: {
      user: { token },
    },
    authDispatch,
  } = useAuth();

  const followUnfollowHandler = async (serviceFn, id, token) => {
    try {
      const { data, status } = await serviceFn(id, token);
      if (status === 200) {
        authDispatch({ type: AUTH.USER_FOLLOW, payload: data.user });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section
      onClick={() => navigate(`/${user?._id}`)}
      className="flex w-full cursor-pointer items-center gap-2 border-b-[1px] p-2"
    >
      <div className="h-[40px] w-[40px] cursor-pointer overflow-hidden rounded-full border-[1px]">
        <img
          src={user?.profileImg}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="leading-5">
        <p>
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-sm">@{user?.username}</p>
      </div>
      {!forSearch && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            followUnfollowHandler(followUserService, user?._id, token);
          }}
          className="ml-auto rounded-full border-[1px] px-2 py-1 text-sm"
        >
          + follow
        </button>
      )}
    </section>
  );
}

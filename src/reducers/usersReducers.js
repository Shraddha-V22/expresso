import { USERS } from "../common/reducerTypes";

export const usersReducers = (state, { type, payload }) => {
  switch (type) {
    case USERS.INITIALISE:
      return {
        ...state,
        users: payload,
      };
    case USERS.USER_FOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
    default:
      return state;
  }
};

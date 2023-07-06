import { AUTH } from "../common/reducerTypes";

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case AUTH.SIGN_UP:
      return {
        ...state,
        user: {
          userDetails: {
            ...payload.createdUser,
            profileBg: "https://i.redd.it/gocxo6n16m871.png",
            profileImg:
              "	https://tse2.mm.bing.net/th?id=OIP.r-l3mhddNzm7351sOrTNjgHaHa&pid=Api&P=0&h=180",
          },
          token: payload.encodedToken,
        },
        isLoggedIn: true,
      };
    case AUTH.SIGN_IN:
      return {
        ...state,
        user: {
          userDetails: payload.foundUser,
          token: payload.encodedToken,
        },
        isLoggedIn: true,
      };
    case AUTH.SIGN_OUT:
      return {
        ...state,
        user: {
          userDetails: {},
          token: "",
        },
        isLoggedIn: false,
      };
    case AUTH.SET_BOOKMARKS:
      return {
        ...state,
        user: {
          ...state.user,
          userDetails: { ...state.user.userDetails, bookmarks: payload },
        },
      };
    case AUTH.USER_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          userDetails: payload,
        },
      };
    case AUTH.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          userDetails: payload,
        },
      };
    default:
      return state;
  }
};

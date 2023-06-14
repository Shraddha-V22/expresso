import { POSTS } from "../common/reducerTypes";

export const postReducers = (state, { type, payload }) => {
  switch (type) {
    case POSTS.INITIALISE:
      return {
        ...state,
        posts: payload,
      };
    case POSTS.SET_USER_FEED:
      return {
        ...state,
        userFeed: payload,
      };
    default:
      return state;
  }
};

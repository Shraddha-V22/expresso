import { POSTS } from "../common/reducerTypes";

export const postReducers = (state, { type, payload }) => {
  switch (type) {
    case POSTS.INITIALISE:
      return {
        ...state,
        posts: payload,
      };
    default:
      return state;
  }
};

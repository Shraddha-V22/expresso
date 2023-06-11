import { POSTS } from "../common/reducerTypes";

export const postReducers = (state, { type, payload }) => {
  switch (type) {
    case POSTS.INITIALISE:
      return {
        ...state,
        posts: payload,
      };
    case POSTS.CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    default:
      return state;
  }
};

import { POSTS } from "../common/reducerTypes";

export const postReducers = (state, { type, payload }) => {
  switch (type) {
    case POSTS.INITIALISE:
      state = {
        ...state,
        posts: payload,
      };
      break;
    case POSTS.SET_USER_FEED:
      state = {
        ...state,
        userFeed: payload,
        sortedFeed: payload,
      };
      break;
    case POSTS.SORT_USER_FEED:
      state = {
        ...state,
        sortBy: payload,
      };
      break;
    case POSTS.IS_LOADING:
      state = {
        ...state,
        postsLoading: payload,
      };
      break;
    default:
      break;
  }

  let feed;
  switch (state.sortBy) {
    case "oldest":
      feed = [...state.userFeed].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      break;
    case "latest":
      feed = [...state.userFeed].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "top":
      feed = [...state.userFeed].sort(
        (a, b) =>
          b.likes.likeCount - a.likeCount ||
          b.comments.length - a.comments.length
      );
      break;
    default:
      break;
  }
  state = {
    ...state,
    sortedFeed: feed,
  };

  return state;
};

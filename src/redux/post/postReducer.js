import * as postTypes from "./postTypes";

const initialState = {
  loading: false,
  posts: [],
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true
      };
    case postTypes.FETCH_POST_SUCCESS:
      return {
        loading: false,
        posts: action.payload,
        error: ""
      };
    case postTypes.FETCH_POST_FAILURE:
      return {
        loading: false,
        posts: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

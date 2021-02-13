import * as petTypes from "./petTypes";

const initialState = {
  loading: false,
  pets: [],
  error: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case petTypes.FETCH_PETS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case petTypes.FETCH_PETS_SUCCESS:
      return {
        loading: false,
        pets: action.payload,
        error: ""
      };
    case petTypes.FETCH_PETS_FAILURE:
      return {
        loading: false,
        pets: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

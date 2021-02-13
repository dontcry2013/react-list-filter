import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import postReducer from "./post/postReducer";
import petReducer from "./pet/petReducer";

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  pet: petReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import { authReducer } from "./auth";
import loadingReducer from "./loading";

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
});

export default rootReducer;

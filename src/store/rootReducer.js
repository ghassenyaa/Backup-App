import { combineReducers } from "@reduxjs/toolkit";

import { reducer as userReducer } from "../slices/user";
import { reducer as formReducer } from "../slices/form";
import { reducer as backupReducer } from "../slices/backupService";

const combinedReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  services: backupReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export default rootReducer;

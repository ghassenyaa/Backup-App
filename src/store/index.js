import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import axios from "../utilities/axios";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axios,
      },
      serializableCheck: false,
    }),
  devTools: process.env.ENABLE_REDUX_DEV_TOOLS,
});
export const useSelector = useReduxSelector;
export const useDispatch = () => useReduxDispatch();
export default store;

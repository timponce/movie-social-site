import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import listReducer from "../features/lists/listSlice";
import filmReducer from "../features/films/filmSlice";

export const store = configureStore({
  reducer: { auth: authReducer, lists: listReducer, films: filmReducer },
});

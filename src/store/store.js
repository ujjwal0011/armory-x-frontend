import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  profileReducer,
  passwordResetReducer,
} from "./slice/userSlice";
import { snippetReducer } from "./slice/snippetSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    passwordReset: passwordResetReducer,
    snippet: snippetReducer,
  },
});

export default store;

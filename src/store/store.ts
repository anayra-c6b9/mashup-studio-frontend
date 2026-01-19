import { configureStore } from "@reduxjs/toolkit";
import someReducer from "./reducerSlice";

export const store = configureStore({
  reducer: {
    some: someReducer,
  },
});

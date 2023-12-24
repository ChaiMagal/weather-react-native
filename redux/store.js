import { configureStore } from "@reduxjs/toolkit";
import localReducer from "./local/localSlice";

export const store = configureStore({
  reducer: {
    local: localReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

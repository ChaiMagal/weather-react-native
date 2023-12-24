import { configureStore } from "@reduxjs/toolkit";
import localReducer from "./local/localSlice";
import weatherReducer from "./weather/weatherSlice";

export const store = configureStore({
  reducer: {
    local: localReducer,
    weather: weatherReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

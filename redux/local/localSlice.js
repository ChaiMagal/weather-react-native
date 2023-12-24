import { createSlice } from "@reduxjs/toolkit";
import { GENERAL } from "../../utils/constants";

const initialState = {
  theme: GENERAL.THEME.LIGHT,
  temperature: GENERAL.TEMPERATURE.CELSIUS,
};

export const localSlice = createSlice({
  name: "local",
  initialState,
  reducers: {
    //change the theme LIGHT/DARK
    toggleTheme: (state, { payload }) => {
      state.theme = payload;
    },
    // change the temperature CELSIUS/FAHRENHEIT
    toggleTemperature: (state, { payload }) => {
      state.temperature = payload;
    },
  },
});

export const { toggleTheme, toggleTemperature } = localSlice.actions;

export default localSlice.reducer;

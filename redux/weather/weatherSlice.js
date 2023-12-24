import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCU_WEATHER_API, GENERAL, STATUS } from "../../utils/constants";
import axios from "axios";
import { getAccuWeatherRandomApiKey } from "../../utils";

//@GET - dataservice.accuweather.com/locations/v1/topcities/50?apikey=
export const accuWatherTopCities = createAsyncThunk(
  ACCU_WEATHER_API.TOP_CITIES_URL,
  async (data, { rejectWithValue }) => {
    try {
      const apiKey = getAccuWeatherRandomApiKey();
      return await axios.get(
        ACCU_WEATHER_API.TOP_CITIES_URL + apiKey, // apikey
        {}
      );
    } catch (e) {
      alert(e?.response?.data?.message || e?.message);
      return rejectWithValue(e?.response?.data?.message || e?.message);
    }
  }
);

const initialState = {
  search: GENERAL.EMPTY_STRING,
  weatherData: GENERAL.EMPTY_STRING,
  current: GENERAL.EMPTY_STRING,
  status: {
    accuWatherTopCities: GENERAL.EMPTY_STRING,
  },
};

export const localSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    //set search
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    //@GET - dataservice.accuweather.com/locations/v1/topcities/50?apikey=
    builder.addCase(accuWatherTopCities.pending, (state) => {
      state.status.accuWatherTopCities = STATUS.LOADING;
    });
    builder.addCase(accuWatherTopCities.fulfilled, (state, { payload }) => {
      state.status.accuWatherTopCities = STATUS.SUCCESS;
      state.weatherData = payload?.data;
    });
    builder.addCase(accuWatherTopCities.rejected, (state) => {
      state.status.accuWatherTopCities = STATUS.FAIL;
    });
  },
});

export const { setSearch } = localSlice.actions;

export default localSlice.reducer;

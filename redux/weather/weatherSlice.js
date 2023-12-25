import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCU_WEATHER_API, GENERAL, STATUS } from "../../utils/constants";
import axios from "axios";
import {
  getAccuWeatherRandomApiKey,
  sortAtoZ,
  sortLocations,
  sortZtoA,
} from "../../utils";
import { IMAGES_OF_CITIES } from "../../utils/dummyData";

//@GET - http://dataservice.accuweather.com/currentconditions/v1/topcities/150?apikey=
export const accuWatherTopCities = createAsyncThunk(
  ACCU_WEATHER_API.TOP_CITIES_URL,
  async (data, { rejectWithValue }) => {
    try {
      const apiKey = getAccuWeatherRandomApiKey();
      return await axios.get(
        ACCU_WEATHER_API.TOP_CITIES_URL + apiKey // apikey
      );
    } catch (e) {
      alert(e?.response?.data?.message || e?.message);
      return rejectWithValue(e?.response?.data?.message || e?.message);
    }
  }
);

const initialState = {
  search: GENERAL.EMPTY_STRING,
  searchData: GENERAL.EMPTY_STRING,
  weatherData: GENERAL.EMPTY_STRING,
  current: GENERAL.EMPTY_STRING,
  sortAlphabetically: GENERAL.EMPTY_STRING,
  sortDistance: GENERAL.EMPTY_STRING,
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
      state.sortAlphabetically = GENERAL.EMPTY_STRING;
      state.searchData = state.weatherData.filter((item) => {
        return (
          item?.EnglishName?.toLowerCase()?.includes(payload?.toLowerCase()) ||
          item?.Country?.EnglishName?.toLowerCase()?.includes(
            payload?.toLowerCase()
          )
        );
      });
    },
    //set current
    setCurrent: (state, { payload }) => {
      state.current = payload;
    },
    //set sort alphabetically
    setSortAlphabetically: (state, { payload }) => {
      // Sort A to Z
      if (payload === GENERAL.SORT.AZ) {
        state.searchData = sortAtoZ(state.searchData);
        state.weatherData = sortAtoZ(state.weatherData);
      }
      // Sort A to Z
      if (payload === GENERAL.SORT.ZA) {
        state.searchData = sortZtoA(state.searchData);
        state.weatherData = sortZtoA(state.weatherData);
      }
      state.sortAlphabetically = payload;
      state.sortDistance = GENERAL.EMPTY_STRING;
    },
    //set by distance
    setSortDistance: (state, { payload }) => {
      state.weatherData = sortLocations(state.weatherData, payload);
      state.searchData = sortLocations(state.searchData, payload);
      state.sortDistance = payload;
      state.sortAlphabetically = GENERAL.EMPTY_STRING;
    },
  },
  extraReducers: (builder) => {
    //@GET - http://dataservice.accuweather.com/currentconditions/v1/topcities/150?apikey=
    builder.addCase(accuWatherTopCities.pending, (state) => {
      state.status.accuWatherTopCities = STATUS.LOADING;
    });
    builder.addCase(accuWatherTopCities.fulfilled, (state, { payload }) => {
      state.status.accuWatherTopCities = STATUS.SUCCESS;
      //accuWeather returning an array of objects of data without images
      //IMAGES_OF_CITIES was structured by taking image links from a free API called teleport - https://api.teleport.org/api/urban_areas/
      //In order to show an image for every city, we need to check witch cities have images and then return an array containing the new image URL
      const data = payload?.data
        ?.map((data) => {
          const findImage = IMAGES_OF_CITIES.find(
            (image) => image.name === data?.EnglishName
          );
          if (findImage) {
            return {
              ...data,
              image: findImage?.imageLink,
            };
          }
          return null;
        })
        ?.filter((item) => item !== null);
      //init data
      state.weatherData = sortAtoZ(data);
      //init search with entire data
      state.searchData = sortAtoZ(data);
      state.sortAlphabetically = GENERAL.SORT.AZ;
    });
    builder.addCase(accuWatherTopCities.rejected, (state) => {
      state.status.accuWatherTopCities = STATUS.FAIL;
    });
  },
});

export const { setSearch, setCurrent, setSortAlphabetically, setSortDistance } =
  localSlice.actions;

export default localSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCU_WEATHER_API, GENERAL, STATUS } from "../../utils/constants";
import axios from "axios";
import { getAccuWeatherRandomApiKey } from "../../utils";
import { IMAGES_OF_CITIES, WEATHER_DUMMY_DATA } from "../../utils/dummyData";

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
  searchData: WEATHER_DUMMY_DATA,
  weatherData: WEATHER_DUMMY_DATA,
  current: GENERAL.EMPTY_STRING,
  sortAlphabetically: GENERAL.EMPTY_STRING,
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
    //set current
    setSortAlphabetically: (state, { payload }) => {
      // Sort A to Z
      if (payload === GENERAL.SORT.AZ) {
        state.searchData = state.searchData?.sort((a, b) => {
          let nameA = a?.EnglishName?.toLowerCase();
          let nameB = b?.EnglishName?.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
      // Sort A to Z
      if (payload === GENERAL.SORT.ZA) {
        state.searchData = state.searchData?.sort((a, b) => {
          let nameA = a?.EnglishName?.toLowerCase();
          let nameB = b?.EnglishName?.toLowerCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
      }
      state.sortAlphabetically = payload;
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
      state.weatherData = data;
      //init search with entire data
      state.searchData = data;
    });
    builder.addCase(accuWatherTopCities.rejected, (state) => {
      state.status.accuWatherTopCities = STATUS.FAIL;
    });
  },
});

export const { setSearch, setCurrent, setSortAlphabetically } =
  localSlice.actions;

export default localSlice.reducer;

import { ACCU_WEATHER_API } from "./constants";

export const getAccuWeatherRandomApiKey = () => {
  return ACCU_WEATHER_API.KEYS[
    Math.floor(Math.random() * ACCU_WEATHER_API.KEYS.length)
  ];
};

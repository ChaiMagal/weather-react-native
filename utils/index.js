import { ACCU_WEATHER_API } from "./constants";

export const getAccuWeatherRandomApiKey = () => {
  return ACCU_WEATHER_API.KEYS[
    Math.floor(Math.random() * ACCU_WEATHER_API.KEYS.length)
  ];
};

export const accuWeatherImageIcon = (number) => {
  return `https://developer.accuweather.com/sites/default/files/${
    number >= 10 ? number : "0" + number
  }-s.png`;
};

export const dateToTimeStringNoSeconds = (dateString) => {
  const date = new Date(dateString?.toString());
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return [
    hours > 9 ? hours : "0" + hours,
    minutes > 9 ? minutes : "0" + minutes,
  ].join(":");
};

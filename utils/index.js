import { ACCU_WEATHER_API } from "./constants";
import { Dimensions } from "react-native";

export const DEVICE_WIDTH = Dimensions.get("window").width;

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

export const convertISOToDayDateTime = (isoString) => {
  const isoStringWithoutOffset = isoString.substring(0, 19);
  const date = new Date(isoStringWithoutOffset);

  // Get hours, minutes, date, day, and month
  const hours = date.getUTCHours(); // Get hours in UTC
  const minutes = date.getUTCMinutes(); // Get minutes in UTC
  const day = date.getUTCDate(); // Get day in UTC
  const month = date.getUTCMonth() + 1; // Get month in UTC (0-indexed, so add 1)
  const weekDay = date.getUTCDay(); // Get day of the week in UTC (0 for Sunday, 6 for Saturday)

  // Formatting to ensure double digits for hours, minutes, and day
  const calcHours = hours < 10 ? "0" + hours : hours.toString();
  const calcMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
  const calcDay = day < 10 ? "0" + day : day.toString();
  const calcMonth = month < 10 ? "0" + month : month.toString();

  // Array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekDayName = weekdays[weekDay];

  return `${weekDayName} ${calcMonth}/${calcDay} ${calcHours}:${calcMinutes}`;
};

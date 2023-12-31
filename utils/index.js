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

export const sortAtoZ = (data) => {
  return data.sort((a, b) => {
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
};

export const sortZtoA = (data) => {
  return data.sort((a, b) => {
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
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  // The Haversine formula is used to calculate the great-circle distance between two points on a sphere given their longitudes and latitudes. This is important because the Earth is approximately spherical, so we can't use simple Euclidean distance.
  const R = 6371; // Radius of the Earth in km
  // difference between latitudes, converted to radians. difference is multiplied by Math.PI / 180. This is because one degree is equivalent to π/180 radians.
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  // difference between longitudes, converted to radians. difference is multiplied by Math.PI / 180. This is because one degree is equivalent to π/180 radians.
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  // a is the square of half the chord length between the points
  // calculates a value based on the sine and cosine of the latitudes and longitudes. This is part of the Haversine formula and accounts for the curvature of the Earth.
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  // c calculates the angular distance in radians between the two points.
  // another part of the formula that computes the angular distance in radians.
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Arc Length = Radius × Central Angle
  return R * c; // Distance in km
}

export function sortLocations(locations, selectedEnglishName) {
  //calculateDistance is a function that calculates the distance between two latitude/longitude pairs using the Haversine formula.
  //sortLocations is the main function that sorts the array. It finds the selected location based on EnglishName, then sorts the rest of the locations by their distance to this selected location.
  // // Find the selected location
  const selectedLocation = locations.find(
    (loc) => loc.EnglishName === selectedEnglishName
  );
  const { Latitude: lat1, Longitude: lon1 } = selectedLocation.GeoPosition;
  // Sort the locations by distance to the selected location
  return locations.sort((a, b) => {
    const { Latitude: lat2, Longitude: lon2 } = a.GeoPosition;
    const { Latitude: lat3, Longitude: lon3 } = b.GeoPosition;
    const distanceA = calculateDistance(lat1, lon1, lat2, lon2);
    const distanceB = calculateDistance(lat1, lon1, lat3, lon3);
    return distanceA - distanceB;
  });
}

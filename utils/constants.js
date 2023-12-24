export const GENERAL = {
  EMPTY_STRING: "",
  THEME: {
    LIGHT: "light",
    DARK: "dark",
  },
  TEMPERATURE: {
    CELSIUS: "°C",
    FAHRENHEIT: "°F",
  },
};

export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  FAIL: "fail",
  CANCEL: "cancel",
};

export const ROUTES = {
  WEATHER: {
    NAVIGATOR: "weather-navigator",
    MAIN: "weather-main",
    INFO: "weather-info",
  },
  SETTINGS: {
    NAVIGATOR: "settings-navigator",
    MAIN: "settings-main",
  },
};

export const ICONS = {
  THEME: "theme-light-dark",
  FILTER: "tune",
  CHEVRON: { DOWN: "chevron-down" },
  WEATHER: { FILLED: "weather-windy-variant", OUTLINE: "weather-cloudy" },
  COG: { FILLED: "cog", OUTLINE: "cog-outline" },
};

export const ACCU_WEATHER_API = {
  TOP_CITIES_URL:
    "http://dataservice.accuweather.com/currentconditions/v1/topcities/150?apikey=",
  // keys should be in .env file, for this project it is in constants to not have to create one
  KEYS: [
    "WJ9kOJdwSpEsVz3E6l5ULWiPpX8JoJL0",
    "rYBVyyZFhtZkPwiQI6eQWaIYipiGFVma",
    "8MIzGGl33vxvfOwRUAaO7amkjot7RP42",
    "yPu77kXYByuhCrrRLTdrrNqPQmJKi1WO",
    "FKwlSoqGXQpxkE9rsEAW9hUU15KQxmAG",
    "O9AFzM6d6HAnPRzuuq1XvGAsCdGNMMgh",
    "PyDoAhvagvVRatEbkpAC6NS64Qqw7KIP",
    "b1rtH1c7YGAGM5oe3z8xmeRuenABGxtA",
    "RYPnuZM3IIH78UxZPGZwy9OOlyklRl98",
  ],
};

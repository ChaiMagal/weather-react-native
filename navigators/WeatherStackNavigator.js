import React from "react";
import { ROUTES } from "../utils/constants";
import { EN } from "../utils/text";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherGridScreen from "../screens/weather/WeatherGridScreen";
import WeatherInfoScreen from "../screens/weather/WeatherInfoScreen";

const Stack = createNativeStackNavigator();

const WeatherStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.WEATHER.MAIN}>
      <Stack.Screen
        name={ROUTES.WEATHER.MAIN}
        component={WeatherGridScreen}
        options={{ headerTitle: EN.weather.title }}
      />
      <Stack.Screen
        name={ROUTES.WEATHER.INFO}
        component={WeatherInfoScreen}
        options={{ headerTitle: EN.weather.title }}
      />
    </Stack.Navigator>
  );
};

export default WeatherStackNavigator;

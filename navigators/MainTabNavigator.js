import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ICONS, ROUTES } from "../utils/constants";
import { EN } from "../utils/text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeatherStackNavigator from "./WeatherStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.WEATHER.NAVIGATOR}
      screenOptions={() => ({ headerShown: false })}
    >
      <Tab.Screen
        name={ROUTES.WEATHER.NAVIGATOR}
        component={WeatherStackNavigator}
        options={{
          tabBarLabel: EN.weather.title,
          headerTitle: EN.weather.title,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? ICONS.WEATHER.FILLED : ICONS.WEATHER.OUTLINE}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS.NAVIGATOR}
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: EN.settings.title,
          headerTitle: EN.settings.title,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? ICONS.COG.FILLED : ICONS.COG.OUTLINE}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;

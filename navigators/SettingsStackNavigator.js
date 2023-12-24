import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ROUTES } from "../utils/constants";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { EN } from "../utils/text";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.SETTINGS.MAIN}>
      <Stack.Screen
        name={ROUTES.SETTINGS.MAIN}
        component={SettingsScreen}
        options={{ headerTitle: EN.settings.title }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;

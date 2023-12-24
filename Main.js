import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import { themeColors } from "./utils/theme";
import { StatusBar } from "expo-status-bar";
import { GENERAL } from "./utils/constants";
import { NavigationContainer } from "@react-navigation/native";
import { IconComponentProvider } from "@react-native-material/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainTabNavigator from "./navigators/MainTabNavigator";

const lightTheme = {
  ...MD3LightTheme,
  colors: themeColors.lightTheme,
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: themeColors.darkTheme,
};

const Main = () => {
  const { theme } = useSelector((state) => state.local);

  const renderTheme = useMemo(() => {
    switch (theme) {
      case GENERAL.THEME.LIGHT:
        return lightTheme;
      case GENERAL.THEME.DARK:
        return darkTheme;
      default:
        return lightTheme;
    }
  }, [theme]);

  return (
    <>
      <StatusBar style={theme} />
      <PaperProvider theme={renderTheme}>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <NavigationContainer theme={renderTheme}>
            <MainTabNavigator />
          </NavigationContainer>
        </IconComponentProvider>
      </PaperProvider>
    </>
  );
};

export default Main;

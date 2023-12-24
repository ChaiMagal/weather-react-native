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

  const renderThemeApp = useMemo(() => {
    return theme === GENERAL.THEME.LIGHT ? lightTheme : darkTheme;
  }, [theme]);

  const renderThemeStatusBar = useMemo(() => {
    return theme === GENERAL.THEME.LIGHT ? darkTheme : lightTheme;
  }, [theme]);

  return (
    <>
      <StatusBar style={renderThemeStatusBar} />
      <PaperProvider theme={renderThemeApp}>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <NavigationContainer theme={renderThemeApp}>
            <MainTabNavigator />
          </NavigationContainer>
        </IconComponentProvider>
      </PaperProvider>
    </>
  );
};

export default Main;

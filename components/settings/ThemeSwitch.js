import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Switch, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { GENERAL, ICONS } from "../../utils/constants";
import { toggleTheme } from "../../redux/local/localSlice";
import { EN } from "../../utils/text";
import CustomSurface from "../common/CustomSurface";

const ThemeSwitch = () => {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.local);

  const isDarkTheme = useMemo(() => {
    return theme === GENERAL.THEME.DARK;
  }, [theme]);

  const handleToggleTheme = useCallback(() => {
    if (isDarkTheme) {
      dispatch(toggleTheme(GENERAL.THEME.LIGHT));
    } else {
      dispatch(toggleTheme(GENERAL.THEME.DARK));
    }
  }, [dispatch, isDarkTheme]);

  return (
    <CustomSurface>
      <View style={styles.container}>
        <View style={styles.label}>
          <IconButton icon={ICONS.THEME} />
          <Text>{EN.settings.themeSwitch}</Text>
        </View>
        <Switch value={isDarkTheme} onValueChange={handleToggleTheme} />
      </View>
    </CustomSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThemeSwitch;

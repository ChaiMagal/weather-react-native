import React from "react";
import SearchAndFilterContainer from "../../components/weather/SearchAndFilterContainer";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const WeatherGridScreen = () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <SearchAndFilterContainer />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    paddingTop: StatusBar.currentHeight,
  },
});

export default WeatherGridScreen;

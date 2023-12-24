import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

const CustomSafeAreaView = ({ children }) => {
  return <SafeAreaView style={styles.safeAreaView}>{children}</SafeAreaView>;
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});

export default CustomSafeAreaView;

import React from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

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

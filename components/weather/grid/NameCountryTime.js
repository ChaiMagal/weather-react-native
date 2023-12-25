import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { convertISOToDayDateTime } from "../../../utils";

const NameCountryTime = ({
  children,
  cityName,
  countryName,
  time,
  cityNameVariant = "headlineMedium",
  countryNameVariant = "titleMedium",
  timeVariant = "titleSmall",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text variant={cityNameVariant} style={[styles.text, styles.title]}>
            {cityName}
          </Text>
          <Text variant={countryNameVariant} style={[styles.text]}>
            {countryName}
          </Text>
        </View>
      </View>
      <View style={styles.item}>{children}</View>
      <View style={styles.innerContainer}>
        <View style={styles.item} />
        <View style={styles.textContainer}>
          <Text variant={timeVariant} style={styles.text}>
            {convertISOToDayDateTime(time)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { flex: 1 },
  title: {
    fontWeight: "bold",
  },
  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    width: "100%",
  },
  text: {
    textAlign: "center",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
});

export default NameCountryTime;

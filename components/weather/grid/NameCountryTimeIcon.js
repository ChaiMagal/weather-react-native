import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { convertISOToDayDateTime } from "../../../utils";

const NameCountryTimeIcon = ({
  cityName,
  countryName,
  icon,
  time,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text variant={"displaySmall"} style={[styles.text, styles.title]}>
          {cityName}
        </Text>
        <Text variant={"headlineSmall"} style={styles.text}>
          {countryName}
        </Text>
      </View>
      {children}
      <View style={styles.time}>
        <Image source={{ uri: icon }} style={styles.iconImage} />
        <View style={styles.item} />
        <Text variant={"titleSmall"} style={styles.text}>
          {convertISOToDayDateTime(time)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 8 },
  item: { flex: 1 },
  title: {
    fontWeight: "bold",
  },
  text: {
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  time: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 50,
    height: 50,
  },
});

export default NameCountryTimeIcon;

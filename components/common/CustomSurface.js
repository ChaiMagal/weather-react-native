import React from "react";
import { Surface, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const CustomSurface = ({
  children,
  mode = "flat",
  elevation = 1,
  title,
  caption,
}) => {
  return (
    <Surface style={styles.surface} elevation={elevation} mode={mode}>
      {title && (
        <View style={styles.container}>
          <Text variant="labelSmall" style={{ fontWeight: "bold" }}>
            {title}
          </Text>
          {caption && <Text variant="bodySmall">{caption}</Text>}
        </View>
      )}
      {children}
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    margin: 16,
    padding: 16,
    borderRadius: 5,
  },
  container: {
    paddingBottom: 16,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default CustomSurface;

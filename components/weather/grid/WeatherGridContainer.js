import React from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, View } from "react-native";
import WeatherGridItem from "./WeatherGridItem";
import { Text } from "react-native-paper";

const WeatherGridContainer = () => {
  const { searchData } = useSelector((state) => state.weather);
  return (
    <>
      <FlatList
        data={searchData}
        renderItem={({ item }) => <WeatherGridItem item={item} />}
        ListEmptyComponent={() => (
          <View style={styles.container}>
            <Text variant={"displaySmall"}>No Results Found</Text>
          </View>
        )}
        keyExtractor={(item) => item?.Key}
        numColumns={2}
        extraData={searchData}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WeatherGridContainer;

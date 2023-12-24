import React from "react";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";
import WeatherGridItem from "./WeatherGridItem";

const WeatherGridContainer = () => {
  const { weatherData } = useSelector((state) => state.weather);
  return (
    <>
      <FlatList
        data={weatherData}
        renderItem={({ item }) => <WeatherGridItem item={item} />}
        keyExtractor={(item) => item?.Key}
        numColumns={2}
      />
    </>
  );
};

export default WeatherGridContainer;

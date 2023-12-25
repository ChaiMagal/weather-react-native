import React from "react";
import { useSelector } from "react-redux";
import { FlatList } from "react-native";
import WeatherGridItem from "./WeatherGridItem";

const WeatherGridContainer = () => {
  const { searchData } = useSelector((state) => state.weather);
  return (
    <>
      <FlatList
        data={searchData}
        renderItem={({ item }) => <WeatherGridItem item={item} />}
        keyExtractor={(item) => item?.Key}
        numColumns={2}
        extraData={searchData}
      />
    </>
  );
};

export default WeatherGridContainer;

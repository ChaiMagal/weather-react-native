import React from "react";
import SearchAndFilterContainer from "../../components/weather/searchAndFilter/SearchAndFilterContainer";
import CustomSafeAreaView from "../../components/common/CustomSafeAreaView";
import WeatherGridContainer from "../../components/weather/grid/WeatherGridContainer";

const WeatherGridScreen = () => {
  return (
    <CustomSafeAreaView>
      <SearchAndFilterContainer />
      <WeatherGridContainer />
    </CustomSafeAreaView>
  );
};

export default WeatherGridScreen;

import React from "react";
import SearchAndFilterContainer from "../../components/weather/SearchAndFilterContainer";
import CustomSafeAreaView from "../../components/common/CustomSafeAreaView";

const WeatherGridScreen = () => {
  return (
    <CustomSafeAreaView>
      <SearchAndFilterContainer />
    </CustomSafeAreaView>
  );
};

export default WeatherGridScreen;

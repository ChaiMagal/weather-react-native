import React, { useEffect } from "react";
import SearchAndFilterContainer from "../../components/weather/searchAndFilter/SearchAndFilterContainer";
import CustomSafeAreaView from "../../components/common/CustomSafeAreaView";
import WeatherGridContainer from "../../components/weather/grid/WeatherGridContainer";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-native-paper";
import { accuWatherTopCities } from "../../redux/weather/weatherSlice";
import { STATUS } from "../../utils/constants";

const WeatherGridScreen = () => {
  const dispatch = useDispatch();

  const {
    status: { accuWatherTopCities: status },
  } = useSelector((state) => state.weather);

  useEffect(() => {
    dispatch(accuWatherTopCities());
  }, [dispatch]);

  return (
    <CustomSafeAreaView>
      <SearchAndFilterContainer />
      {status === STATUS.LOADING ? (
        <ProgressBar indeterminate />
      ) : (
        <WeatherGridContainer />
      )}
    </CustomSafeAreaView>
  );
};

export default WeatherGridScreen;

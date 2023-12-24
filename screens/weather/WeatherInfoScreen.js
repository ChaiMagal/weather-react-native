import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../redux/weather/weatherSlice";
import { GENERAL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "react-native";

const WeatherInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { current } = useSelector((state) => state.weather);
  // const { temperature } = useSelector((state) => state.local);

  // const currentTemperature = useMemo(() => {
  //   const { Metric, Imperial } = item?.Temperature;
  //   if (temperature === GENERAL.TEMPERATURE.CELSIUS) {
  //     return Metric;
  //   } else {
  //     return Imperial;
  //   }
  // }, [item?.Temperature, temperature]);

  // const weatherText = item?.WeatherText;

  useEffect(() => {
    //make header the city name
    navigation.setOptions({
      headerTitle: current?.EnglishName,
    });
    // reset current when user exits screen
    return () => dispatch(setCurrent(GENERAL.EMPTY_STRING));
  }, [current?.EnglishName, dispatch, navigation]);
  return <ImageBackground source={{ uri: current?.image }}></ImageBackground>;
};

export default WeatherInfoScreen;

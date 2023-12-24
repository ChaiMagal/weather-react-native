import React, { useCallback, useMemo } from "react";
import { Surface, TouchableRipple } from "react-native-paper";
import { ImageBackground, StyleSheet, View } from "react-native";
import { accuWeatherImageIcon, DEVICE_WIDTH } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../../redux/weather/weatherSlice";
import NameCountryTimeIcon from "./NameCountryTimeIcon";

const WeatherGridItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const getIcon = useMemo(() => {
    const iconNumber = item?.WeatherIcon;
    return accuWeatherImageIcon(iconNumber);
  }, [item?.WeatherIcon]);

  const handleWeatherPress = useCallback(() => {
    dispatch(setCurrent(item));
    navigation.navigate(ROUTES.WEATHER.INFO);
  }, [dispatch, item, navigation]);

  return (
    <View style={styles.container}>
      <Surface>
        <TouchableRipple onPress={handleWeatherPress}>
          <ImageBackground
            source={{
              uri: item?.image,
            }}
            style={styles.imageBackground}
          >
            <NameCountryTimeIcon
              time={item?.LocalObservationDateTime}
              countryName={item?.Country?.EnglishName}
              cityName={item?.EnglishName}
              icon={getIcon}
            />
          </ImageBackground>
        </TouchableRipple>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  imageBackground: {
    width: "100%",
    minHeight: DEVICE_WIDTH / 1.5,
  },
});

export default WeatherGridItem;

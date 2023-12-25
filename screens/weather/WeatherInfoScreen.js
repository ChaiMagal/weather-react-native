import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../redux/weather/weatherSlice";
import { GENERAL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import NameCountryTime from "../../components/weather/grid/NameCountryTime";
import { accuWeatherImageIcon } from "../../utils";
import { Text } from "react-native-paper";

const WeatherInfoScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { current } = useSelector((state) => state.weather);
  const { temperature } = useSelector((state) => state.local);

  const currentTemperature = useMemo(() => {
    const { Metric, Imperial } = current?.Temperature;
    if (temperature === GENERAL.TEMPERATURE.CELSIUS) {
      return { value: Metric?.Value, unit: GENERAL.TEMPERATURE.CELSIUS };
    } else {
      return { value: Imperial?.Value, unit: GENERAL.TEMPERATURE.FAHRENHEIT };
    }
  }, [current?.Temperature, temperature]);

  const getIcon = useMemo(() => {
    const iconNumber = current?.WeatherIcon;
    return accuWeatherImageIcon(iconNumber);
  }, [current?.WeatherIcon]);

  useEffect(() => {
    //make header the city name
    navigation.setOptions({
      headerTitle: current?.EnglishName,
    });
    // reset current when user exits screen
    return () => dispatch(setCurrent(GENERAL.EMPTY_STRING));
  }, [current?.EnglishName, dispatch, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: current?.image }}
        style={styles.imageBackground}
      >
        <NameCountryTime
          time={current?.LocalObservationDateTime}
          countryName={current?.Country?.EnglishName}
          cityName={current?.EnglishName}
          icon={getIcon}
          cityNameVariant={"displayLarge"}
          countryNameVariant={"headlineLarge"}
          timeVariant={"titleLarge"}
        >
          <View style={styles.itemContainer}>
            <View style={styles.item}>
              <View style={styles.temperatureContainer}>
                <Image source={{ uri: getIcon }} style={styles.iconImage} />
                <View style={styles.temperature}>
                  <Text variant={"displayLarge"} style={styles.title}>
                    {currentTemperature?.value}
                  </Text>
                  <Text variant={"headlineSmall"} style={styles.title}>
                    {currentTemperature?.unit}
                  </Text>
                </View>
              </View>
              <Text variant={"headlineLarge"} style={styles.title}>
                {current?.WeatherText}
              </Text>
            </View>
          </View>
        </NameCountryTime>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  item: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 16,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
  temperatureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
  },
  title: {
    fontWeight: "bold",
    color: "rgb(252, 252, 255)",
    textShadowColor: "rgb(26, 28, 30)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  iconImage: {
    width: 100,
    height: 100,
    margin: 16,
    borderRadius: 100,
  },
});

export default WeatherInfoScreen;

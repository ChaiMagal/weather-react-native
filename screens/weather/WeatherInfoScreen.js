import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrent } from "../../redux/weather/weatherSlice";
import { GENERAL } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import NameCountryTimeIcon from "../../components/weather/grid/NameCountryTimeIcon";
import { accuWeatherImageIcon } from "../../utils";
import { Text, useTheme } from "react-native-paper";

const WeatherInfoScreen = () => {
  const { colors } = useTheme();
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
        <NameCountryTimeIcon
          time={current?.LocalObservationDateTime}
          countryName={current?.Country?.EnglishName}
          cityName={current?.EnglishName}
          icon={getIcon}
        >
          <View style={styles.itemContainer}>
            <View
              style={[styles.item, { backgroundColor: colors.partialOpacity }]}
            >
              <View style={styles.temperatureContainer}>
                <Image source={{ uri: getIcon }} style={styles.iconImage} />
                <View style={styles.temperature}>
                  <Text variant={"displayLarge"} style={styles.title}>
                    {currentTemperature?.value}
                  </Text>
                  <Text variant={"headlineSmall"}>
                    {currentTemperature?.unit}
                  </Text>
                </View>
              </View>
              <Text variant={"headlineLarge"}>{current?.WeatherText}</Text>
            </View>
          </View>
        </NameCountryTimeIcon>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  },
  iconImage: {
    width: 100,
    height: 100,
  },
});

export default WeatherInfoScreen;

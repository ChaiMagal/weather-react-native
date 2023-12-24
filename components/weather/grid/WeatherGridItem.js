import React, { useMemo } from "react";
import { Surface, Text, useTheme } from "react-native-paper";
import { Image, ImageBackground, View } from "react-native";
import {
  accuWeatherImageIcon,
  dateToTimeStringNoSeconds,
} from "../../../utils";

const WeatherGridItem = ({ item }) => {
  const { colors } = useTheme();
  // const { temperature } = useSelector((state) => state.local);

  // const currentTemperature = useMemo(() => {
  //   const { Metric, Imperial } = item?.Temperature;
  //   if (temperature === GENERAL.TEMPERATURE.CELSIUS) {
  //     return Metric;
  //   } else {
  //     return Imperial;
  //   }
  // }, [item?.Temperature, temperature]);

  const getIcon = useMemo(() => {
    const iconNumber = item?.WeatherIcon;
    return accuWeatherImageIcon(iconNumber);
  }, [item?.WeatherIcon]);

  const cityName = item?.EnglishName;
  const countryName = item?.Country?.EnglishName;
  const time = item?.LocalObservationDateTime;
  // const weatherText = item?.WeatherText;
  const image = item?.image;

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <Surface>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={{
            width: "100%",
            minHeight: 250,
          }}
        >
          <View
            style={{
              flex: 1,
              padding: 8,
              backgroundColor: colors.partialOpacity,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                variant={"displaySmall"}
                style={{ fontWeight: "bold" }}
                theme={{ colors: { onSurface: colors.background } }}
              >
                {cityName}
              </Text>
              <Text
                variant={"headlineSmall"}
                theme={{ colors: { onSurface: colors.background } }}
              >
                {countryName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: getIcon }}
                style={{ width: 50, height: 50 }}
              />
              <View style={{ flex: 1 }} />
              <Text
                variant={"titleSmall"}
                theme={{ colors: { onSurface: colors.background } }}
              >
                {dateToTimeStringNoSeconds(time)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </Surface>
    </View>
  );
};

export default WeatherGridItem;

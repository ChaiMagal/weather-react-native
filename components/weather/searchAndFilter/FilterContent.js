import React, { useCallback, useMemo, useState } from "react";
import { Button, Chip, Text } from "react-native-paper";
import { GENERAL } from "../../../utils/constants";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortAlphabetically,
  setSortDistance,
} from "../../../redux/weather/weatherSlice";
import { EN } from "../../../utils/text";

const FilterContent = ({ handleSort }) => {
  const dispatch = useDispatch();

  const { sortAlphabetically, searchData, sortDistance } = useSelector(
    (state) => state.weather
  );

  const [alphabetic, setAlphabetic] = useState(sortAlphabetically);
  const [distance, setDistance] = useState(sortDistance);

  //sort by name
  //sort by distance to a location
  const handlePress = useCallback(() => {
    if (alphabetic) dispatch(setSortAlphabetically(alphabetic));
    if (distance) dispatch(setSortDistance(distance));

    handleSort();
  }, [alphabetic, dispatch, distance, handleSort]);

  const handleSortAlphabetically = useCallback((alp) => {
    setAlphabetic(alp);
    setDistance(GENERAL.EMPTY_STRING);
  }, []);

  const handleSortDistance = useCallback((dis) => {
    setAlphabetic(GENERAL.EMPTY_STRING);
    setDistance(dis);
  }, []);

  const renderApplyButton = useMemo(() => {
    if (alphabetic !== sortAlphabetically || distance !== sortDistance) {
      return <Button onPress={handlePress}>{EN.weather.sort.apply}</Button>;
    }
    return <></>;
  }, [alphabetic, distance, handlePress, sortAlphabetically, sortDistance]);

  return (
    <>
      <View style={styles.container}>
        <Text variant={"labelSmall"}>{EN.weather.sort.alphabitically}</Text>
        <View style={styles.sortName}>
          <Chip
            style={styles.chip}
            onPress={() => handleSortAlphabetically(GENERAL.SORT.AZ)}
            mode={alphabetic === GENERAL.SORT.AZ ? "flat" : "outlined"}
          >
            {GENERAL.SORT.AZ}
          </Chip>
          <Chip
            style={styles.chip}
            onPress={() => handleSortAlphabetically(GENERAL.SORT.ZA)}
            mode={alphabetic === GENERAL.SORT.ZA ? "flat" : "outlined"}
          >
            {GENERAL.SORT.ZA}
          </Chip>
        </View>
        <View>
          <Text variant={"labelSmall"}>{EN.weather.sort.distance}</Text>
          <ScrollView
            style={{ maxHeight: 150 }}
            contentContainerStyle={styles.scroll}
          >
            {searchData?.map((obj) => {
              const { Key, EnglishName } = obj;
              return (
                <Chip
                  key={Key}
                  style={styles.chip}
                  onPress={() => handleSortDistance(EnglishName)}
                  mode={distance === EnglishName ? "flat" : "outlined"}
                >
                  {EnglishName}
                </Chip>
              );
            })}
          </ScrollView>
        </View>
      </View>
      {renderApplyButton}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  sortName: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  scroll: {
    flexDirection: "row",
    paddingVertical: 8,
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
});

export default FilterContent;

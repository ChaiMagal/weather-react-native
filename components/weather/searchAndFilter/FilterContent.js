import React, { useCallback, useMemo, useState } from "react";
import { Button, Chip, Text } from "react-native-paper";
import { GENERAL } from "../../../utils/constants";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSortAlphabetically } from "../../../redux/weather/weatherSlice";
import { EN } from "../../../utils/text";

const FilterContent = ({ handleSort }) => {
  const dispatch = useDispatch();

  const { sortAlphabetically } = useSelector((state) => state.weather);

  const [alphabetic, setAlphabetic] = useState(sortAlphabetically);

  //sort by name
  //sort by distance to a location
  const handlePress = useCallback(() => {
    dispatch(setSortAlphabetically(alphabetic));
    handleSort();
  }, [alphabetic, dispatch, handleSort]);

  const handleSortAlphabetically = useCallback((alp) => {
    setAlphabetic(alp);
  }, []);

  const renderApplyButton = useMemo(() => {
    if (alphabetic !== sortAlphabetically) {
      return <Button onPress={handlePress}>{EN.weather.sort.apply}</Button>;
    }
    return <></>;
  }, [alphabetic, handlePress, sortAlphabetically]);

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
  chip: {
    marginHorizontal: 2,
  },
});

export default FilterContent;

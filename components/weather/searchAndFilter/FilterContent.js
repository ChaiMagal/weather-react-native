import React, { useCallback, useMemo, useState } from "react";
import { Button, Chip, Text } from "react-native-paper";
import { GENERAL } from "../../../utils/constants";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../redux/weather/weatherSlice";

const FilterContent = ({ handleSort }) => {
  const dispatch = useDispatch();

  const {
    sort: { byName, distanceTo },
  } = useSelector((state) => state.weather);

  const [alphabetic, setAlphabetic] = useState(byName);

  //sort by name
  //sort by distance to a location
  const handlePress = useCallback(() => {
    dispatch(setSort({ byName: alphabetic, distanceTo }));
    handleSort();
  }, [alphabetic, dispatch, distanceTo, handleSort]);

  const handleSOrtName = useCallback((name) => {
    setAlphabetic(name);
  }, []);

  const renderApplyButton = useMemo(() => {
    if (alphabetic !== byName) {
      return <Button onPress={handlePress}>Apply Sort</Button>;
    }
    return <></>;
  }, [alphabetic, byName, handlePress]);

  return (
    <>
      <View style={styles.container}>
        <Text variant={"labelSmall"}>Sort Alphabetically</Text>
        <View style={styles.sortName}>
          {GENERAL.SORT.ARRAY.map((name) => (
            <Chip
              key={name}
              style={styles.chip}
              onPress={() => handleSOrtName(name)}
              mode={alphabetic === name ? "flat" : "outlined"}
            >
              {name}
            </Chip>
          ))}
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

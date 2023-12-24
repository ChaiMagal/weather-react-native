import React, { useCallback } from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../../redux/weather/weatherSlice";
import { EN } from "../../../utils/text";
import FilterButton from "./FilterButton";

const SearchAndFilterContainer = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.weather);

  const onChangeSearch = useCallback(
    (value) => {
      dispatch(setSearch(value?.toLowerCase()?.trim()));
    },
    [dispatch]
  );

  return (
    <>
      <View style={styles.container}>
        <Searchbar
          style={styles.search}
          placeholder={EN.weather.search}
          onChangeText={onChangeSearch}
          value={search}
        />
        <FilterButton />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
  },
  search: {
    display: "flex",
    flex: 1,
  },
});

export default SearchAndFilterContainer;

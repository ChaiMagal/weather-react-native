import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const FilterContent = () => {
  //sort by name
  //sort by distance to a location
  return (
    <View style={{ paddingVertical: 32 }}>
      <View style={{ flex: 1 }} />
      <Button>Apply FIlters</Button>
    </View>
  );
};

export default FilterContent;

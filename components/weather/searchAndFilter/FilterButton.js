import React, { useCallback, useRef, useState } from "react";
import { IconButton } from "react-native-paper";
import FilterContent from "./FilterContent";
import { ICONS } from "../../../utils/constants";
import CustomBottomSheet from "../../common/CustomBottomSheet";

const FilterButton = () => {
  const [index, setIndex] = useState(-1);
  //BottomSheet
  // ref
  const bottomSheetRef = useRef(null);
  const toggleBottomSheet = useCallback(() => {
    index >= 0
      ? bottomSheetRef.current?.close()
      : bottomSheetRef.current?.expand();
  }, [index]);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    setIndex(index);
  }, []);

  return (
    <>
      <IconButton icon={ICONS.FILTER} onPress={toggleBottomSheet} />
      <CustomBottomSheet
        ref={bottomSheetRef}
        handleSheetChanges={handleSheetChanges}
      >
        <FilterContent />
      </CustomBottomSheet>
    </>
  );
};

export default FilterButton;

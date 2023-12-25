import React, { useCallback, useRef, useState } from "react";
import { IconButton } from "react-native-paper";
import FilterContent from "./FilterContent";
import { ICONS } from "../../../utils/constants";
import CustomBottomSheet from "../../common/CustomBottomSheet";

const FilterButton = () => {
  //BottomSheet
  // ref
  const bottomSheetRef = useRef(null);
  const [show, setShow] = useState(false);
  const toggleBottomSheet = useCallback(() => {
    setShow(true);
  }, []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index < 0) setShow(false);
  }, []);
  const handleSort = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <>
      <IconButton icon={ICONS.FILTER} onPress={toggleBottomSheet} />
      {show && (
        <CustomBottomSheet
          ref={bottomSheetRef}
          handleSheetChanges={handleSheetChanges}
        >
          <FilterContent handleSort={handleSort} />
        </CustomBottomSheet>
      )}
    </>
  );
};

export default FilterButton;

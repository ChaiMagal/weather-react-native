import React, { useCallback, useState } from "react";
import { Dialog, IconButton, Portal } from "react-native-paper";
import FilterContent from "./FilterContent";
import { ICONS } from "../../../utils/constants";

const FilterButton = () => {
  const [show, setShow] = useState(false);
  const toggleShow = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  return (
    <>
      <IconButton icon={ICONS.FILTER} onPress={toggleShow} />
      {show && (
        <Portal>
          <Dialog visible={show} onDismiss={toggleShow}>
            <Dialog.Content>
              <FilterContent handleSort={toggleShow} />
            </Dialog.Content>
          </Dialog>
        </Portal>
      )}
    </>
  );
};

export default FilterButton;

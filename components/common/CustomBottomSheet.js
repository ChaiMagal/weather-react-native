import React, { forwardRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { IconButton, Portal, useTheme } from "react-native-paper";
import { ICONS } from "../../utils/constants";

// ref should be passed from the parent, so forwardRef(props,ref) is defined
// propes passed are destructured
const CustomBottomSheet = forwardRef(
  ({ points = ["75%"], handleSheetChanges, children }, ref) => {
    const { colors } = useTheme();
    const backgroundColor = useMemo(
      () => colors.background,
      [colors.background]
    );
    const color = useMemo(() => colors.onBackground, [colors.onBackground]);
    // variables
    const snapPoints = useMemo(() => points, [points]);
    return (
      <Portal>
        <BottomSheet
          ref={ref}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          index={-1}
          onChange={handleSheetChanges}
          style={{ color }}
          handleComponent={() => (
            <View style={styles.handle}>
              <IconButton icon={ICONS.CHEVRON.DOWN} />
            </View>
          )}
          backgroundStyle={{
            backgroundColor,
            shadowColor: color,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}
        >
          <View style={[styles.contentContainer, { backgroundColor, color }]}>
            {children}
          </View>
        </BottomSheet>
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  handle: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomBottomSheet;

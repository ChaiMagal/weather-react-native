import React, { forwardRef, useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import { IconButton, Portal, useTheme } from "react-native-paper";
import { ICONS } from "../../utils/constants";

// ref should be passed from the parent, so forwardRef(props,ref) is defined
// propes passed are destructured
const CustomBottomSheet = forwardRef(
  ({ points = ["85%"], handleSheetChanges, children }, ref) => {
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
        <View style={[styles.backdrop, { backgroundColor: colors.backdrop }]}>
          <BottomSheet
            ref={ref}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            index={0}
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
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          >
            <View style={[styles.contentContainer, { backgroundColor, color }]}>
              {children}
            </View>
          </BottomSheet>
        </View>
      </Portal>
    );
  }
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
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

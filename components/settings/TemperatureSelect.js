import React, { useCallback } from "react";
import CustomSurface from "../common/CustomSurface";
import { useDispatch, useSelector } from "react-redux";
import { EN } from "../../utils/text";
import { SegmentedButtons } from "react-native-paper";
import { GENERAL } from "../../utils/constants";
import { toggleTemperature } from "../../redux/local/localSlice";

const TemperatureSelect = () => {
  const dispatch = useDispatch();
  const { temperature } = useSelector((state) => state.local);

  const handleTemperature = useCallback(
    (value) => {
      dispatch(toggleTemperature(value));
    },
    [dispatch]
  );

  return (
    <CustomSurface title={EN.settings.temperature}>
      <SegmentedButtons
        buttons={[
          {
            value: GENERAL.TEMPERATURE.CELSIUS,
            label: GENERAL.TEMPERATURE.CELSIUS,
          },
          {
            value: GENERAL.TEMPERATURE.FAHRENHEIT,
            label: GENERAL.TEMPERATURE.FAHRENHEIT,
          },
        ]}
        value={temperature}
        onValueChange={handleTemperature}
        density="small"
      />
    </CustomSurface>
  );
};

export default TemperatureSelect;

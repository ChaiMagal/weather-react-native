import React from "react";
import ThemeSwitch from "../../components/settings/ThemeSwitch";
import TemperatureSelect from "../../components/settings/TemperatureSelect";

const SettingsScreen = () => {
  return (
    <>
      <ThemeSwitch />
      <TemperatureSelect />
    </>
  );
};

export default SettingsScreen;

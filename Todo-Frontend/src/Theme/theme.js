import { extendTheme } from "@chakra-ui/react";
import ColorModeSwitcher from "./ColorModeSwitcher";

const config = {
  // System sets initial value.
  // App subscribes to system color mode changes.
  initialColorMode: "system", // "light" | "dark" | "system"
  useSystemColorMode: true, // true | false
};

const theme = extendTheme({ config });

export default theme;

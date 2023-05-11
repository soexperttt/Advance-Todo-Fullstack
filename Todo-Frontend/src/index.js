import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import {
  ChakraProvider,
  ColorModeProvider,
  ColorModeScript,
  useColorMode,
} from "@chakra-ui/react";
import theme from "./Theme/theme";
import ColorModeSwitcher from "./Theme/ColorModeSwitcher";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
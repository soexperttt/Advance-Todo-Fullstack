import "./App.css";

import { BrowserRouter } from "react-router-dom";
import AnimationRoutes from "./AnimationRoutes";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./Theme/theme";
import ColorModeSwitcher from "./Theme/ColorModeSwitcher";

function App() {
  console.warn = console.error = () => {};

  return (
    <div>
      <BrowserRouter>
           <AnimationRoutes />
       </BrowserRouter>
    </div>
  );
}

export default App;
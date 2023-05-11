import React, { useEffect } from "react";
import { useColorMode, useColorModeValue, IconButton, Switch } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import light from "../images/light.png";
import dark from "../images/dark.png";
 
const ColorModeSwitcher = (props) => {
  const text = useColorModeValue("light", "dark");
  // const { isLogged } = useContext(AuthContext);
  // const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const { toggleColorMode } = useColorMode();
  const img = document.getElementsByClassName("images");
  // const loginBg = document.getElementsByClassName("Login_form");
  useEffect(() => {
    console.log("colormode: ", text);

    // Light mode
    if (text === "light") {
    
      document.body.style.color = "black";
      document.body.style.borderColor = "black";
      for (let i = 0; i < img.length; i++) {
        img[i].style.filter =
          "invert(0%) sepia(0%) saturate(0%) hue-rotate(320deg) brightness(96%) contrast(104%)";
      }
      // for (let i = 0; i < loginBg.length; i++) {
      //   loginBg[i].style.background =
      //     "linear-gradient(145deg, #ffffff, #e0e0e0)";
      // }
    }
    // Dark mode
    if (text === "dark") {
      document.body.style.color = "white";
      document.body.style.border = "white";
      for (let i = 0; i < img.length; i++) {
        img[i].style.filter =
          "invert(100%) sepia(7%) saturate(27%) hue-rotate(327deg) brightness(109%) contrast(106%)";
      }
      // for (let i = 0; i < loginBg.length; i++) {
      //   loginBg[i].style.background =
      //     "linear-gradient(145deg, #212938, #151b26)";
      // }
    }
  }, [text]);




  return (
    <>
    {/* <img src={ text === "dark" ? light : dark } style={{ width: "30px" }} /> */}


  {/* <Switch
      onChange={toggleColorMode}
      value={text}
      size="md"
      aria-label={`Switch to ${text} mode`}
      variant="none"
      icon={<FaMoon />}
      isChecked={text === "dark"}
      colorScheme="blue"
      mr={2}
    />  */}
     <a
        className="images"
        size="md"
        aria-label={`Switch to ${text} mode`}
        variant="none"
        onClick={toggleColorMode}

        // icon={<SwitchIcon />}
      >
        {text === "dark" ? (
          <img src={light} style={{ width: "30px" }} />
        ) : (
          <img src={dark} style={{ width: "30px" }} />
        )}
      </a> 
    </>
  );
};
export default ColorModeSwitcher;

// filter: invert(0%) sepia(0%) saturate(0%) hue-rotate(320deg) brightness(96%) contrast(104%); // black
// filter: invert(100%) sepia(7%) saturate(27%) hue-rotate(327deg) brightness(109%) contrast(106%); // waite
import { motion } from "framer-motion";
import { React, useState } from "react";
import { Button, Center, Divider } from "@chakra-ui/react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
import ColorModeSwitcher from "../Theme/ColorModeSwitcher";
const Nav = () => {
  return (
    <div className="nav-comp">
      <a className="">
        <ColorModeSwitcher />
      </a>

      <>
        <Center height="30px">
          <Divider orientation="vertical" />
        </Center>
        {/* <hr className="nav-separate" /> */}
      </>
      <a>
        <Logout />
      </a>
    </div>
  );
};

export default Nav;

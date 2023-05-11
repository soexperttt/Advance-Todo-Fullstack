import { React, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  useToast,
  InputRightElement,
  background,
} from "@chakra-ui/react";

import ".././Components/CSS/Login.css";
import hidePass from "../images/hide.png";
import showPass from "../images/show.png";
import { motion } from "framer-motion";
import { errorToast, successToast } from "../Components/Toast";
import RandomPic from "../Components/RandomPic";
import AuthContext from "../Components/Auth/AuthContext";
const Login = () => {
   const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const { login,  btnLoading } = useContext(AuthContext);
  const loginBtn = async () => {

    login(username, password);
  };

  const register = () => {
    nav("/register");
  };

  const passwordBtn = () => {
    if (show) {
      return "text";
    } else {
      return "password";
    }
  };
  // Randomly select a picture from the array

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="Login_Components">
        <div className="login_Header">
          <div className="login_Header_img">
            <RandomPic />
          </div>
        </div>
        <div className="Login_form">
          <form>
            <input
              placeholder="Username"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              required
              className="todo-title login"
            />
            <InputGroup size="md">
              <input
                required
                // type={show ? "text" : "password"}
                type={passwordBtn()}
                placeholder="Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                className="todo-title login"
              />
              <InputRightElement width="4.5rem">
                <a size="sm" onClick={handleClick}>
                  {password === null || password === "" ? (
                    <></>
                  ) : (
                    <>
                      {show ? (
                        <img src={hidePass} className="password-img" />
                      ) : (
                        <img src={showPass} className="password-img" />
                      )}
                    </>
                  )}
                </a>
              </InputRightElement>
            </InputGroup>
            <div className="loginFooter">
              {btnLoading ? (
                <Button
                  type="submit"
                  className="loginbtn loading"
                  onClick={loginBtn}
                  isLoading
                  // spinner={<BeatLoader size={8} color="#00f2ff" />}
                  w={100}
                ></Button>
              ) : (
                <Button
                  type="submit"
                  className="loginbtn"
                  onClick={loginBtn}
                  w={100}
                >
                  Login
                </Button>
              )}

              <p className="signUpNow">
                Need an account? &nbsp;
                <a>
                  <span onClick={register} className="signUpNow goLink">
                    Sign up now!
                  </span>
                </a>
              </p>
            </div>{" "}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;

import React from "react";
import { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";
import ".././Components/CSS/Login.css";
import { useNavigate } from "react-router-dom";
import hidePass from "../images/hide.png";
import showPass from "../images/show.png";
import { errorToast, successToast } from "../Components/Toast";
import { motion } from "framer-motion";
import RandomPic from "../Components/RandomPic";

const Register = () => {
  const nav = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const register = async () => {
    setBtnLoading(true);
    const request = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await request.json();
    if (!username || !password || username === " " || password === "") {
      setBtnLoading(false);
      toast(errorToast("Please fill in all fields"));
    }
    if (request.status === 201) {
      console.log(request.status);
      setBtnLoading(false);
      toast(successToast("Account created successfully"));
      nav("/login");
    }

    if (request.status === 400) {
      setBtnLoading(false);
      toast(errorToast("Username already exists"));
    }
  };
  const login = () => {
    nav("/login");
  };
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
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              type="text"
              required
              className="todo-title login"
            />
            <InputGroup size="md">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                  onClick={register}
                  isLoading
                  w={100}
                ></Button>
              ) : (
                <Button type="submit" className="loginbtn" onClick={register}>
                  Register
                </Button>
              )}
              <p className="signUpNow">
                Already signed up? &nbsp;
                <a>
                  <span onClick={login} className="signUpNow goLink">
                    login!
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

export default Register;

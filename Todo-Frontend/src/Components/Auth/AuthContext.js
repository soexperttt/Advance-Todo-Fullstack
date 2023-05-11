import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { errorToast, successToast } from "../Toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const toast = useToast();
  const [isLogged, setIsLogged] = useState(localStorage.getItem("isLogged"));

  const login = async (username, password, btnLoading) => {
    setBtnLoading(true);
    const request = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        authorization: "Basic " + btoa(username + ":" + password),
      },
    });
    const data = await request.json();
    if (request.status === 200) {
      setBtnLoading(false);
      setIsLogged(1);
      localStorage.setItem("isLogged", 1);
      toast(successToast(`Welcome back ${username}!`));
      nav("/");
    }
    else if (request.status === 401) {
      setBtnLoading(false);
      toast(errorToast("Incorrect username or password"));
    } else {
      setBtnLoading(false);
      toast(errorToast("Something went wrong"));
    }
  };

  return (
    <AuthContext.Provider value={{ login, btnLoading, isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;

import React, { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { isLogged } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      const request = await fetch("/api/v1/auth/check");
      if (request.status === 401) {
        localStorage.removeItem("loggedIn");
        Navigate("/login");
      }
    };
    checkAuth();
  }, [isLogged]);

  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default RequireAuth;

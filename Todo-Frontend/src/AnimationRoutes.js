import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import NotFound404 from "./Pages/NotFound404";
 import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./Components/Auth/AuthContext";
import RequireAuth from "./Components/Auth/RequireAuth";

const AnimationRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        <AuthProvider>
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="todo/:id" element={<Home />} />
              <Route path="*" element={<NotFound404 />} />
             </Route>
          </Routes>{" "}
        </AuthProvider>
      </AnimatePresence>{" "}
    </div>
  );
};

export default AnimationRoutes;

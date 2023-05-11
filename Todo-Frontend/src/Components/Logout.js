import { Button } from "@chakra-ui/react";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import exit from "../images/logout.png";
const Logout = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  const nav = useNavigate();
  const logout = async () => {
    setBtnLoading(true);
    const request = await fetch("/api/v1/auth/logout");
    if (request.status === 204) {
      setBtnLoading(false);
      localStorage.removeItem("loggedIn");
      nav("/login");
    }
    setBtnLoading(false);
  };

  return (
    <div>
      {btnLoading ? (
        <Button
          className="loginbtn loading"
          onClick={logout}
          isLoading
          variant="none"
          ></Button>
      ) : (
        <a onClick={logout}>
          <img src={exit} className="images" />{" "}
        </a>
      )}
    </div>
  );
};

export default Logout;

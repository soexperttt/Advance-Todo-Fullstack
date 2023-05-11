import React, { useEffect, useState } from "react";
import pic1 from "../images/login/1.png";
import pic2 from "../images/login/2.png";
import pic3 from "../images/login/3.png";
import pic4 from "../images/login/4.png";
import pic5 from "../images/login/5.png";
 import ".././Components/CSS/Login.css";

const RandomPic = () => {
  const [pic, setPic] = useState();
  const pics = [pic1, pic2, pic3, pic4, pic5];

  useEffect(() => {
    const randomPic = pics[Math.floor(Math.random() * pics.length)];
    setPic(randomPic);
  }, []);
  return (
    <div>
      <img src={pic} className="login_img" />
    </div>
  );
};

export default RandomPic;

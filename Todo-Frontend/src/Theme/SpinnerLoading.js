import React from "react";
import { Spinner } from "@chakra-ui/react";
const SpinnerLoading = () => {
  return (
    <div className="">
      <Spinner
        style={{ color: "rgb(8, 217, 214)" }}
        className="Loader"
        size="lg"
        thickness="0.15rem"
        speed=".45s"
        // emptyColor="green.300"
        // color="blue.500"
      />
    </div>
  );
};

export default SpinnerLoading;

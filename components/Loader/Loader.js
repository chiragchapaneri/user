import React from "react";
import { Bars } from "react-loader-spinner";

const Loder = () => {
  return (
    // <div className="absolute top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-[#00000030]">
    <div className="z-[100] top-[50%] left-[50%] loader-cnter bg-transparent">
      <Bars
        height="80"
        width="80"
        color="#0090E1"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
};

export default Loder;

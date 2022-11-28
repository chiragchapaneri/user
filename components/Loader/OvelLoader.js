import React from "react";
import { Oval } from "react-loader-spinner";

const OvelLoader = () => {
  return (
    <div>
      <div className="z-30 flex ml-[500px] mt-100">
        <Oval
          color="#ADD8E6"
          height={35}
          width={35}
          secondaryColor="#23c5ff"
          strokeWidth={10}
          strokeWidthSecondary={10}
        />
      </div>
    </div>
  );
};
export default OvelLoader;

import React from "react";
import { Oval } from "react-loader-spinner";
import classNames from "classnames";

const CustomButtonWol = ({ buttonStyle, children, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "font-medium rounded-5 box-border",
        buttonStyle,
        props.width
      )}
    >
      {children}
    </button>
  );
};

export default CustomButtonWol;

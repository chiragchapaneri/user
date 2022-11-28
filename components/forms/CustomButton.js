import React from "react";
import { Oval } from "react-loader-spinner";
import classNames from "classnames";

const CustomButton = ({ buttonStyle, children, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(
        "font-medium rounded-5 box-border ",
        buttonStyle,
        props.width
      )}
      // disabled={props.hide}
    >
      {props.disabled && (
        <Oval
          color="#FFFFFF"
          height={25}
          width={25}
          secondaryColor="#FAFAFA"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      )}
      {children}
    </button>
  );
};

export default CustomButton;

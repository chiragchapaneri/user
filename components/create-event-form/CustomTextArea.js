import React, { useState } from "react";
import { useField } from "formik";
import classNames from "classnames";

const CustomTextArea = ({ lable, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <p className="font-400 text-sm text-black">{lable}</p>
      <textarea
        className={classNames(
          "border-1 border-solid rounded-5 outline-none ",
          meta.touched && meta.error ? "border-red-600 " : props.borderstyle,
          props.componentstyle
        )}
        {...field}
        {...props}
        autoComplete="off"
        type="text"
        rows={props.rows}
        cols={props.cols}
        placeholder={props.placeholder}
      />
      {meta.touched && meta.error && (
        <div className="error ml-5 mt-1">
          <p className="text-sm text-red-600">{meta.error}</p>
        </div>
      )}
    </div>
  );
};
export default CustomTextArea;

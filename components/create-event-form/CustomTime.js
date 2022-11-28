import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import classNames from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const CustomTime = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        className={classNames(
          "rounded-5",
          meta.touched && meta.error
            ? "border-red-600 border-0.5 border-solid"
            : props.borderstyle,
          props.componentstyle
        )}
        placeholderText={props.placeholder}
        selected={(field.value && new Date(field.value)) || ""}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        autoComplete="off"
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={5}
        timeCaption="Time"
        dateFormat="hh:mm aa"
      />
      {meta.touched && meta.error && (
        <div className="error ml-5 mt-1">
          <p className="text-sm text-red-600">{meta.error}</p>
        </div>
      )}
    </div>
  );
};
export default CustomTime;

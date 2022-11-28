import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import classNames from "classnames";

const Datepicker = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <DatePicker
        className={classNames(
          "rounded-5",
          meta.touched && meta.error
            ? "border-red-600 border-0.5 border-solid"
            : props.borderstyle,
          props.componentstyle
        )}
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        placeholderText={props.placeholder}
        autoComplete="off"
      />
      {meta.touched && meta.error && (
        <div className="error ml-5 mt-1">
          <p className="text-sm text-red-600">{meta?.error}</p>
        </div>
      )}
    </>
  );
};
export default Datepicker;

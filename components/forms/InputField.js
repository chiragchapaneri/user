import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import classNames from "classnames";

const InputField = ({ lable, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {}, [showPassword]);
  return (
    <div className={`relative ${props.name == "password" && "flex flex-col"}`}>
      <div
        className={classNames(
          "rounded-5 flex items-center justify-center",
          meta.touched && meta.error ? "border-red-600" : props.borderstyle,
          props.disabled ? "bg-disable" : "bg-transperent",
          props.componentstyle
        )}
      >
        <div
          className={classNames("flex min-w-15", !props.starticon && "hidden")}
        >
          {props.starticon}
        </div>
        <input
          {...field}
          {...props}
          className={classNames(
            "text-input border-0 w-full border-solid bg-transparent max-h-20",
            props.inputstyle
          )}
          autoComplete="off"
          type={
            props?.type === "password"
              ? showPassword
                ? "password"
                : "text"
              : props.type
          }
        />
        {props.type === "password" && (
          <div
            className="flex items-center justify-center min-w-15 cursor-grab"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <BsFillEyeSlashFill size={17} />
            ) : (
              <BsFillEyeFill size={17} />
            )}
          </div>
        )}
      </div>
      {meta.touched && meta.error && (
        <div className="error ml-5 mt-1">
          <p className="text-sm text-red-600">{meta.error}</p>
        </div>
      )}
    </div>
  );
};

export default InputField;

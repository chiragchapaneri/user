import React, { useEffect, useState } from "react";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import tagImage from "../../assets/img/tag.svg";
import { useField, useFormikContext } from "formik";

const SelectTag = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [tags, setTags] = useState();

  const handleSelected = (e) => {
    setFieldValue(props.name, e);
  };

  useEffect(() => {
    props?.eventTags &&
      setTags(
        props?.eventTags.map((tag) => ({
          value: tag.value,
          label: tag.name,
        }))
      );
  }, []);

  return (
    <div className="relative w-full mt-6">
      <CreatableSelect
        {...field}
        {...props}
        isMulti
        styles={{
          control: (style) => ({
            ...style,
            paddingLeft: "10px",
            outline:
              meta.touched && meta.error ? "1px solid red" : "1px bordergrey",
            "::placeholder": "font-size: 14px;",
            "::-webkit-input-placeholder": "font-size: 14px;",
          }),
        }}
        options={tags}
        components={{ IndicatorSeparator: () => null }}
        noOptionsMessage={() => "Nothing Found..."}
        isOptionDisabled={() => field?.value?.length >= 10}
        onChange={(e) => handleSelected(e)}
        value={field.value}
      />
      {meta.touched && meta.error && (
        <div className="error ml-5 mt-1">
          <p className="text-sm text-red-600">{meta.error}</p>
        </div>
      )}
    </div>
  );
};
export default SelectTag;

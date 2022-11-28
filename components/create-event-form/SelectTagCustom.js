import React from "react";
import Select from "react-select";

const SelectTagCustom = ({ data }) => {
  const dataa = data?.map((parant, index) => {
    return {
      lable: parant.name,
      value: parant.name,
      childCategories: parant?.childCategories.map((childdata, childindex) => {
        return {
          lable: childdata.name,
          value: childdata.name,
        };
      }),
    };
  });

  const formatGroupLabel = (GroupedOption) => (
    <div>
      <span>{CatagoryOptions.label}</span>
      <span>{GroupedOption.options}</span>
    </div>
  );

  const finalOp = data?.map((parant, index) => {
    return (
      <>
        <span className="text-gray-500 text-base">{parant.name}</span>
        <br />
        {parant?.childCategories.map((childdata, childindex) => {
          return (
            <>
              <span>{childdata.name}</span>
              <br />
            </>
          );
        })}
        <br />
      </>
    );
  });

  return (
    <div>
      <p>
        Composing a display label from the label property and rating property in
        the options object
      </p>
      {data?.map((parant, index) => {
        return (
          <>
            <span className="text-gray-500 text-base">{parant.name}</span>
            <br />
            {parant?.childCategories.map((childdata, childindex) => {
              return (
                <>
                  <span>{childdata.name}</span>
                  <br />
                </>
              );
            })}
            <br />
          </>
        );
      })}
      <Select options={finalOp} />
    </div>
  );
};
export default SelectTagCustom;

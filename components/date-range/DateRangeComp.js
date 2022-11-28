import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DateRangeComp = (props) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end)
      props.onChange([start, end]);
  };
  useEffect(() => {
    if (props.clearDate === true) {
      setStartDate(null)
      setEndDate(null)
      props.changeHandler(false)
    }
  }, [props.clearDate])
  return (
    <DatePicker
      className="border-1 border-solid border-bordergrey h-42 text-sm text-[#ced4da] leading-9 px-13 rounded-5 focus:outline-none focus:border-sky-500"
      selected={startDate}
      placeholderText="Search date range"
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      isClearable={false}
    />
  );
};

export default DateRangeComp;

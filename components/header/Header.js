import React, { useState } from "react";
import Image from "next/image";
import inputLocation from "../../assets/img/input_location.svg";
import inputDate from "../../assets/img/input_date.svg";
import inputSearch from "../../assets/img/input_search.svg";
import buttonSearch from "../../assets/img/button_search.svg";
import { Form, Formik } from "formik";
import InputField from "../forms/InputField";
import CustomButton from "../forms/CustomButton";
import toast from "react-hot-toast";
import { getDateArray } from "../../utils/helper";
import { DropDown } from "../../components/dropdown/DropDown";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import moment from "moment";
import classNames from "classnames";
import ReactDatePicker from "react-datepicker";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";
const date = getDateArray();
const Header = ({ showDatePicker, setshowDatepicker }) => {
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: "",
    dt: "",
    dateType: "",
  });
  const { push } = useRouter();

  const onChange = (dates) => {
    const [start, end] = dates;
    setDateRange({
      startDate: start,
      endDate: end,
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const submitDate = () => {
    push(
      `/event/search?startDate=${dateRange?.startDate}&endDate=${dateRange?.endDate}&dt=CUSTOM&dateType=Custom`
    );
    setDateRange({
      ...dateRange,
      dt: "CUSTOM",
    });
  };
  const changedate = (e) => {
    if (e.value == "Custom") {
      setshowDatepicker(true);
    } else {
      push(
        `/event/search?startDate=${e?.startDate}&endDate=${e?.endDate}&dt=${e?.dt}&dateType=${e.name}`
      );
    }
  };

  const selectsearch = (e) => {
    push(
      `/event/search?location=${e?.address_components[0]?.long_name.toLowerCase()}&locationName=${
        e?.formatted_address
      }&placeId=${e?.place_id}`
    );
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_ApiKey,
    onPlaceSelected: (place) => {
      selectsearch(place);
    },

    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "my" },
    },
  });

  const submit = () => {
    if (search) {
      push(`/event/search?search=${search}`);
    }
  };
  return (
    <>
      {showDatePicker && (
        <div className=" ">
          <div className="fixed datepicker opacity-100 ">
            <div className="flex justify-between">
              <div> Select Range</div>
              <div>
                <AiOutlineClose
                  size={15}
                  onClick={() => {
                    setDateRange();
                    setshowDatepicker(false);
                  }}
                />
              </div>
            </div>
            <div className="">
              {dateRange?.startDate &&
                moment(dateRange?.startDate).format("D/M/YYYY")}
              -
              {dateRange?.endDate &&
                moment(dateRange?.endDate).format("D/M/YYYY")}
            </div>
            <ReactDatePicker
              selected={dateRange?.startDate}
              onChange={onChange}
              startDate={dateRange?.startDate}
              endDate={dateRange?.endDate}
              selectsRange
              inline
            />
            <div className={classNames("text-center mt-[10px] ")}>
              <button
                className={classNames(
                  "p-10  text-white bg-[#855FA7] ",
                  dateRange?.startDate && dateRange?.endDate
                    ? "opacity-100 cursor-pointer pointer-events-auto  "
                    : "pointer-events-none  opacity-50 "
                )}
                onClick={submitDate}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`h-550 w-auto sm:max-h-400 max-h-350 lg:max-h-550 md:max-h-550 backdrop-blur-42 bg-header-background-img bg-no-repeat bg-cover bg-center px-20  ${
          showDatePicker && "opacity-25"
        }`}
      >
        <div className="flex flex-col items-center gap-35 gap- sm:gap-35 md:gap-65">
          <div className="mt-100 lg:mt-200 md:mt-200 text-white flex flex-col items-center md:gap-12">
            <div className=" text-14 leading-7 sm:text-xl md:text-2xl font-medium items-center">
              <h1>Let&apos;s Make Live Happen</h1>
            </div>
            <div className="font-light text-10  text-center sm:text-center sm:text-xs md:text-center md:text-base md:leading-27 lg:text-18 ">
              Shop Millions of live events and discover can&apos;t-miss
              concerts, games, theater and more.
            </div>
          </div>
          <Formik initialValues={{ City: "", Search: "" }} onSubmit={submit}>
            {(formik) => (
              <Form
                onSubmit={formik.handleSubmit}
                className="sm:flex sm:flex-col sm:gap-14 lg:flex lg:flex-row flex flex-col gap-14"
              >
                <div className="flex gap-14 z-50">
                  <div className="relative bg-white flex  items-center px-4 gap-10  rounded-5">
                    {/* <ReactGoogleAutocomplete
                      apiKey={process.env.NEXT_PUBLIC_ApiKey}
                      options={{
                        types: ["geocode", "establishment"],
                      }}
                      onPlaceSelected={selectsearch}
                      className="outline-none  lg:w-[203px] md:w-[265px] ms:w-[138px] text-18 pl-15"
                    /> */}

                    <input
                      ref={ref}
                      // style={{ width: "90%" }}
                      // defaultValue="Amsterdam"
                      placeholder="City or zip code"
                      className="outline-none  lg:w-[203px] md:w-[265px] ms:w-[138px] text-18 pl-15"
                    />
                    <div className="w-20 pt-5">
                      <Image
                        src={inputLocation}
                        height={20}
                        width={16}
                        alt="none"
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <div className='"h-43 text-14 rounded-5 outline-none w-full lg:min-w-235  md:min-w-300 sm:text-base md:text-18 leading-27 font-light backdrop-blur-42 sm:min-w-200 ms:min-w-[138px]'>
                      <DropDown
                        data={date}
                        selected={""}
                        placeholder="Date"
                        handleChange={changedate}
                        textStyle="text-black-lightgray text-18 pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      placeholder="Search by events &#38; organizers"
                      className=" w-full rounded-none rounded-l-5 outline-none h-43  md:min-w-480 pl-40 sm:pl-49  text-18 leading-27 lg:min-w-369 text-black font-light backdrop-blur-42 bg-white border-none"
                      value={search}
                      onChange={handleSearch}
                    />
                    <div className="absolute top-13 left-16 flex items-center justify-center  ">
                      <Image
                        src={inputSearch}
                        height={15}
                        width={15}
                        alt="none"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <CustomButton
                      color="text-black"
                      buttonStyle="px-10 sm:px-0 text-base rounded-none rounded-r-5 sm:min-w-135 h-43 bg-blue-bgcomman backdrop-blur-42 sm:text-18 leading-7 font-normal  pr-30 sm:pr-16"
                      onClick={submit}
                    >
                      Search
                    </CustomButton>
                    <div className="absolute top-0 sm:right-16 right-6 bottom-0 flex items-center justify-center">
                      <Image
                        src={buttonSearch}
                        height={15}
                        width={15}
                        alt="none"
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default Header;

import Image from "next/image";
import React from "react";
import CustomTime from "../create-event-form/CustomTime";
import Datepicker from "../date-picker/Datepicker";
import calender from "../../assets/img/calender.svg";
import clock from "../../assets/img/clock.svg";

const DateTime = ({ edit, startDate, setStartDate, formik }) => {
  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-15 sm:gap-10 ms:gap-8">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image
            src={calender}
            alt="Picture of an text"
            width={34}
            height={34}
          />
          <p className="font-500 text-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-black text-center">
            Date and Time
          </p>
        </div>
        <div className="flex gap-30 flex-row ms:flex-col ms:gap-20 ms:items-center">
          <div className="flex flex-col gap-20">
            <div className="">
              <p className="font-400 text-sm text-black">Start date</p>
              <div className="relative">
                <Datepicker
                  name="startDate"
                  placeholder="Start date"
                  componentstyle="pl-48 py-9 w-screen max-w-199 disabled:cursor-not-allowed focus:outline-sky-500"
                  borderstyle="border-0.5 border-solid "
                  minDate={new Date()}
                  disabled={edit}
                  setStartDate={setStartDate}
                />
                <div className="absolute top-13 left-15">
                  <Image
                    src={calender}
                    alt="Picture of an text"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <p className="font-400 text-sm text-black">End date</p>
              <div className="relative">
                <Datepicker
                  name="endDate"
                  placeholder="Last date"
                  componentstyle="pl-48 py-9 w-screen max-w-199 disabled:cursor-not-allowed focus:outline-sky-500"
                  borderstyle="border-0.5 border-solid"
                  minDate={new Date()}
                  disabled={!formik.values.startDate || edit}
                />
                <div className="absolute top-13 left-15">
                  <Image
                    src={calender}
                    alt="Picture of an text"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-20">
            <div className="">
              <p className="font-400 text-sm text-black">Start time</p>
              <div className="relative">
                <CustomTime
                  name="startTime"
                  componentstyle="pl-48 border-0.5 border-solid rounded-5 py-9 w-screen max-w-199 h-44 disabled:cursor-not-allowed focus:outline-sky-500"
                  placeholder="Start time"
                  disabled={edit}
                />
                <div className="absolute top-13 left-15">
                  <Image
                    src={clock}
                    alt="Picture of an text"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            </div>
            <div className="">
              <p className="font-400 text-sm text-black">End time</p>
              <div className="relative">
                <CustomTime
                  name="endTime"
                  componentstyle="pl-48 border-0.5 border-solid rounded-5 py-9 w-screen max-w-199 h-44 disabled:cursor-not-allowed focus:outline-sky-500"
                  placeholder="End time"
                  disabled={!formik.values.startTime || edit}
                />
                <div className="absolute top-13 left-15">
                  <Image
                    src={clock}
                    alt="Picture of an text"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTime;

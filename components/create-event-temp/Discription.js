import React from "react";
import CustomTexeEditor from "../create-event-form/CustomTexeEditor";
import CustomTextArea from "../create-event-form/CustomTextArea";
import discription from "../../assets/img/discription.svg";
import Image from "next/image";

const Discription = () => {
  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-15 sm:gap-10 ms:gap-8">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image
            src={discription}
            alt="Picture of an text"
            width={34}
            height={34}
          />
          <p className="font-500 text-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-black text-center">
            Description
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <CustomTextArea
            id="shortDescription"
            name="shortDescription"
            lable="Enter description"
            borderstyle="rounded-5 outline-none outline-offset-0 resize-none"
            componentstyle="px-16 py-7 placeholder:font-400 placeholder:text-sm text-sm w-full mt-5 focus-within:border-sky-500"
            placeholder="Short description"
            rows="4"
            cols="79"
          />
          <div className="flex flex-col">
            <p className="font-400 text-sm text-black">About the event</p>
            <CustomTexeEditor
              id="description"
              name="description"
              height="134"
              componentstyle="mt-7 mb-25 w-full focus-within:outline-sky-500"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-400 text-sm text-black">Terms & Conditions</p>
            <CustomTexeEditor
              id="termsConditions"
              name="termsConditions"
              height="134"
              width="659"
              componentstyle="mt-7 mb-25"
            />
          </div>
          <div className="flex flex-col">
            <p className="font-400 text-sm text-black">
              Order Message (Will be shown on Confirmation Screen)
            </p>
            <CustomTexeEditor
              id="orderMessage"
              name="orderMessage"
              height="134"
              width="659"
              componentstyle="mt-7 mb-25"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discription;

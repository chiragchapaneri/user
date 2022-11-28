import React from "react";
import InputField from "../forms/InputField";
import contact from "../../assets/img/contact.svg";
import Image from "next/image";

const OrgContactDetail = ({ setFieldValue }) => {
  const handleChange = (e, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(e.target.name, value);
  };
  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-15 sm:gap-10 ms:gap-8">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image
            src={contact}
            alt="Picture of an text"
            width={34}
            height={34}
          />
          <p className="font-500 text-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-black text-center">
            Organizer Contact Details
          </p>
        </div>
        <div className="flex flex-col gap-16 w-full max-w-548 ">
          <div className="flex flex-col">
            <p className="font-400 text-sm text-black">Contact name</p>
            <InputField
              id="contactDetails.name"
              name="contactDetails.name"
              type="text"
              componentstyle="w-full max-w-548 gap-20 px-10 py-6 mt-1 border-0.5 focus-within:border-sky-500"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-5"
            />
          </div>
          <div className="flex justify-between ms:flex-col ms:gap-20">
            <div className="flex flex-col">
              <p className="font-400 text-sm text-black">Phone number</p>
              <InputField
                maxLength={10}
                onChange={(e) => handleChange(e, setFieldValue)}
                id="contactDetails.phone"
                name="contactDetails.phone"
                type="text"
                placeholder="Enter phone number"
                starticon="+91"
                componentstyle="w-full max-w-250 gap-5 px-10 py-5 mt-1 border-0.5 focus-within:border-sky-500"
                inputstyle="block w-full focus:outline-none disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-5"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-400 text-sm text-black">Email</p>
              <InputField
                id="contactDetails.email"
                name="contactDetails.email"
                type="email"
                componentstyle="w-screen max-w-250 gap-5 px-10 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                inputstyle="block w-full focus:outline-none disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgContactDetail;

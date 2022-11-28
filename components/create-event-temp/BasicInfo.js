import Image from "next/image";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import SelectOption from "../create-event-form/SelectOption";
import SelectTag from "../create-event-form/SelectTag";
import InputField from "../forms/InputField";
import text from "../../assets/img/text.svg";

const BasicInfo = ({
  type,
  categories,
  childCategories,
  getSlug,
  edit,
  eventTags,
  setFieldValue,
}) => {
  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-8 sm:gap-5 ms:gap-4">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image src={text} alt="Picture of an text" width={34} height={34} />
          <p className="font-500 text-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-black">
            Basic Info
          </p>
        </div>
        <div className="flex flex-col gap-15">
          <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
            Name your event and tell event-goers why they should come. Add
            details that highlight what makes it unique.
          </p>
          <div className="flex flex-col">
            <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
              Event Title
            </p>
            <InputField
              id="name"
              name="name"
              type="text"
              componentstyle="w-full max-w-659 gap-20 px-10 py-6 mt-1 border-0.5 focus:outline-none focus-within:border-sky-500"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 disabled:cursor-not-allowed"
              disabled={edit}
            />
          </div>
          <div className="flex flex-col xxl:flex-row xl:flex-row lg:flex-row md:flex-col sm:flex-col ms:flex-col justify-between">
            <div className="flex flex-col w-full">
              <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
                Event Type
              </p>
              {type && (
                <SelectOption
                  id="eventTypeId"
                  name="eventTypeId"
                  dropDownList={type}
                  componentstyle="w-full max-w-232 py-7 gap-25 text-xs"
                  borderstyle="border-0.5 border-solid focus:outline-none focus-within:border-sky-500"
                  icon={<IoIosArrowDown size={16} />}
                  placeHolder="Pick one"
                  dropDownHeight="h-250"
                />
              )}
            </div>
            <div className="flex flex-col w-full">
              <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
                Category
              </p>
              {categories && (
                <SelectOption
                  id="parentCategoryId"
                  name="parentCategoryId"
                  dropDownList={categories}
                  componentstyle="w-full max-w-232 py-7 gap-25 text-xs"
                  borderstyle="border-0.5 border-solid focus:outline-none focus-within:border-sky-500"
                  icon={<IoIosArrowDown size={16} />}
                  placeHolder="Pick one"
                  dropDownHeight="h-250"
                />
              )}
            </div>
            {getSlug && (
              <div className="flex flex-col w-full">
                <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
                  Sub category
                </p>
                <SelectOption
                  id="categoryId"
                  name="categoryId"
                  dropDownList={childCategories}
                  componentstyle="w-full max-w-232 py-7 gap-25 text-xs"
                  borderstyle="border-0.5 border-solid focus:outline-none focus-within:border-sky-500"
                  icon={<IoIosArrowDown size={16} />}
                  placeHolder="Pick one"
                  dropDownHeight="h-105"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col pt-7">
            <p className="font-500 font-semibold text-base xxl:text-base md:text-base sm:text-sm ms:text-sm text-black">
              Tags
            </p>
            <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
              This profile describes a unique organizer and shows all of the
              events on one page. View Organizer Info
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
              Press Enter to add a tag
            </p>
            <div>
              <SelectTag
                name="tags"
                componentstyle="focus-within:border-sky-500"
                borderstyle="outline-black "
                setValues={setFieldValue}
                eventTags={eventTags}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;

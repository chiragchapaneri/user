import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { AiOutlineClose } from "react-icons/ai";
import classNames from "classnames";

export const CatagoryListDropdown = (props) => {
  return (
    <Listbox value={props?.selected} onChange={props.handleChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-[4px] bg-white  px-10 text-left shadow-md  focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm border h-[42px] ">
          <span className="block truncate">
            {props?.selected?.name ? props?.selected.name : props.placeholder}
          </span>
          <span
            className={classNames(
              "pointer-events-none absolute inset-y-0 right-11 flex items-center ",
              props?.style && props?.style
            )}
          >
            {!props.selected?.name && (
              <HiOutlineChevronUpDown size={15} className="cursor-pointer" />
            )}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-100 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-99">
            {props?.data?.map((person, personIdx) => (
              <div key={personIdx}>
                <span className={`block truncate  'font-normal'`}>
                  {person.name}
                </span>
                {person.childCategories?.map((list, index) => (
                  <Listbox.Option
                    key={personIdx + list.name}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4`
                    }
                    value={list}
                  >
                    <span
                      className={`block truncate hover:bg-bg-blue'font-normal'`}
                    >
                      {list.name}
                    </span>
                  </Listbox.Option>
                ))}
              </div>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import classNames from "classnames";

const SelectOption = (props) => {
  const [showAbove, setShowAbove] = useState(false);
  const [selected, setSelected] = useState(props?.value || "");
  useEffect(() => {
    Object.keys(props).includes("value") && setSelected(props?.value);
  }, [props?.value]);
  return (
    <div className="">
      <Listbox value={selected} onChange={props?.changeHandler || setSelected}>
        <div className="relative mt-1">
          <Listbox.Button
            onClick={(e) => {
              const temp = e.target.getBoundingClientRect();
              const checkBellow = window.innerHeight - temp.bottom;
              setShowAbove(checkBellow < 250);
            }}
            className={classNames(
              props.style
                ? props.style
                : " relative w-full cursor-default border-1 border-[#ced4da] h-42 text-sm leading-9 pl-13 pr-13 rounded-5 focus:outline-none focus:border-sky-500"
            )}
          >
            <span className="flex justify-between items-center truncate rounded-5 border-dropdown text-bordergrey">
              <div className=" text-gray-400">
                {selected || props.placeholder}
              </div>
              <BsChevronExpand size={16} />
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 "></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={classNames(
                showAbove && "bottom-full",
                "max-h-145 absolute mt-1 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-99 flex flex-col gap-10 cursor-pointer  p-10"
              )}
            >
              {props.option?.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) => {
                    classNames(
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900",
                      "relative cursor-default select-none py-2 pl-10 pr-4"
                    );
                  }}
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? "font-medium" : "font-normal",
                          "block truncatey  hover:bg-light-grey"
                        )}
                      >
                        {person.name === "" ? "select any one" : person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default SelectOption;

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import classNames from "classnames";


const FormSelectOption = ({ setValues, ...props }) => {
  const [showAbove, setShowAbove] = useState(false);
  const [selected, setSelected] = useState();
  const [field, meta] = useField(props.name);
  const handleSelect = (val) => {
    setSelected(val);
    setValues(props.name, val);
  };

  useEffect(() => {
    setSelected(field.value)
    setValues(props.name, field.value);
  }, [field.value, props.selected]
  )

  return (
    <div className="w-full">
      <Listbox value={String(field.value)} onChange={handleSelect} >
        <div className="relative ">
          <Listbox.Button
            onClick={(e) => {
              const temp = e.target.getBoundingClientRect();
              const checkBellow = window.innerHeight - temp.bottom;
              setShowAbove(checkBellow < 250);
            }}
            className="relative w-full cursor-default rounded-lg bg-white text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span
              className={classNames(
                props.componentstyle
                  ? props.componentstyle
                  : "flex items-center justify-between truncate pl-23 pr-11 w-screen",
                meta.touched && meta.error
                  ? "border-red-600 border-0.5 border-solid"
                  : props.borderstyle,
                "rounded-5 font-500 text-black"
              )}
            >
              {selected ? (
                selected.name
              ) : (
                <p className="font-400 text-xs text-dropdownplaceholder"></p>
              )}
              {props.icon}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
          </Listbox.Button>
          {meta.touched && meta.error && (
            <div className="error ml-5 mt-1">
              <p className="text-sm text-red-600">{meta.error}</p>
            </div>
          )}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`${showAbove && "bottom-full max-h-290"
                } max-h-200 absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-99`}
            >
              {props?.option?.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-normal" : "font-normal"
                          }`}
                      >
                        {person.name}
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

export default FormSelectOption;

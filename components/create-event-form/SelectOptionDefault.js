import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useField } from "formik";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createEventChildCategories } from "../../Redux/event/createEventSlice";
import { useEffect } from "react";

const SelectOptionDefault = ({ setValues, ...props }) => {
  const dispatch = useDispatch();
  const { getSlug } = useSelector((state) => ({
    getSlug: state.createEventSlice.getSlug,
  }));
  const [people, setPeople] = useState(props.dropDownList);
  const [showAbove, setShowAbove] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedItem, setSelectedItem] = useState(props.dropDownList[0]);
  const [field, meta, helpers] = useField(props);
  const handleSelect = (val) => {
    setSelectedItem(val);
  };

  useEffect(() => {
    helpers.setValue(selectedItem.id);
  }, [selectedItem]);

  return (
    <div className="w-full">
      {people?.length > 0 && (
        <Listbox name={props.name} onChange={handleSelect} defaultValue>
          <div className="relative mt-1 w-max">
            <Listbox.Button
              onClick={(e) => {
                const temp = e.target.getBoundingClientRect();
                const checkBellow = window.innerHeight - temp.bottom;
                setShowAbove(checkBellow < 250);
              }}
              className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            >
              <span
                className={classNames(
                  "flex items-center justify-between truncate pl-23 pr-11 w-screen rounded-5  font-500 text-black",
                  meta.touched && meta.error
                    ? "border-red-600 border-0.5 border-solid"
                    : props.borderstyle,
                  props.componentstyle
                )}
              >
                {!selectedItem?.name == "" ? (
                  selectedItem?.name
                ) : (
                  <p className="font-400 text-xs text-dropdownplaceholder">
                    {props.placeHolder}
                  </p>
                )}
                {props?.icon}
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
                className={`${
                  showAbove && "bottom-full"
                } absolute mt-1 z-[3] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
                  props.dropDownHeight
                }`}
              >
                {people?.map((person, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-blue-bgcomman text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    <span
                      className={`block truncate ${
                        selected ? "font-normal" : "font-normal"
                      }`}
                    >
                      {person.name}
                    </span>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      )}
    </div>
  );
};
export default SelectOptionDefault;

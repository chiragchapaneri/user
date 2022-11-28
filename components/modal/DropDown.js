import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import classNames from "classnames";

const DropDown = (props) => {
  const [showAbove, setShowAbove] = useState(false);
  const [selected, setSelected] = useState(0);
  const people = [
    { value: 0, name: props.name, price: props.price, id: props.id },
    { value: 1, name: props.name, price: props.price, id: props.id },
    { value: 2, name: props.name, price: props.price, id: props.id },
    { value: 3, name: props.name, price: props.price, id: props.id },
    { value: 4, name: props.name, price: props.price, id: props.id },
    { value: 5, name: props.name, price: props.price, id: props.id },
    { value: 6, name: props.name, price: props.price, id: props.id },
    { value: 7, name: props.name, price: props.price, id: props.id },
    { value: 8, name: props.name, price: props.price, id: props.id },
    { value: 9, name: props.name, price: props.price, id: props.id },
    { value: 10, name: props.name, price: props.price, id: props.id },
  ];

  const onChange = (e) => {
    setSelected(e.value);
    props.onChange(e);
  };

  return (
    <div key={props?.index}>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button
            onClick={(e) => {
              const temp = e.target.getBoundingClientRect();
              const checkBellow = window.innerHeight - temp.bottom;
              setShowAbove(checkBellow < 250);
            }}
            className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="flex items-center justify-between truncate pl-8 pr-8 max-w-50 rounded-5 border-1 border-solid border-dropdown font-500 text-lg text-black">
              {selected}
              <BsChevronExpand size={16} />
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"></span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={classNames(
                "absolute mt-1 w-full max-w-[60px] overflow-auto rounded-md bg-white py-1 z-99 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ms:max-h-[200px] px-15",
                showAbove && "bottom-full"
              )}
            >
              {people.map(
                (person, personIdx) =>
                  personIdx <= props?.quantity && (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) => {
                        classNames(
                          "relative cursor-default select-none py-2 text-center pr-4 z-99",
                          active
                            ? "bg-blue-bgcomman text-white"
                            : "text-gray-900"
                        );
                      }}
                      value={person}
                    >
                      {({ selected }) => (
                        <div key={personIdx}>
                          <span
                            className={classNames(
                              "block truncate cursor-pointer",
                              selected ? "font-medium" : "font-normal"
                            )}
                          >
                            {person.value}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                          ) : null}
                        </div>
                      )}
                    </Listbox.Option>
                  )
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default DropDown;

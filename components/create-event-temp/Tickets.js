import { Form, Formik, FieldArray } from "formik";
import Image from "next/image";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Ticket from "../../assets/img/Tickets.svg";
import CustomTextArea from "../create-event-form/CustomTextArea";
import CustomTime from "../create-event-form/CustomTime";
import SelectOption from "../create-event-form/SelectOption";
import Datepicker from "../date-picker/Datepicker";
import CustomButton from "../forms/CustomButton";
import InputField from "../forms/InputField";
import calender from "../../assets/img/calender.svg";
import clock from "../../assets/img/clock.svg";
import { BsCalendarCheck } from "react-icons/bs";
import SelectOptionDefault from "../create-event-form/SelectOptionDefault";

const Tickets = ({ formik, edit, setFieldValue }) => {
  const addNewTicketsRow = (e, values, setValues) => {
    const ticket = [...values.tickets];
    ticket.push({
      name: "",
      price: e.target.id == "free" ? 0 : "",
      quantity: "",
      type: e.target.id == "free" ? "FREE" : "PAID",
      action: "CREATE",
    });
    setValues({ ...values, tickets: ticket });
  };

  const handleRemoveTicketsRow = (e, values, setValues) => {
    const ticket = [...values.tickets];
    ticket.splice(e.target.id, 1);
    setValues({ ...values, tickets: ticket });
    // console.log(values);
  };

  const handleChange = (e, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(e.target.name, value);
  };

  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-15 sm:gap-10 ms:gap-8">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image
            src={Ticket}
            alt="Picture of an text"
            ticket
            width={34}
            height={34}
          />
          <p className="font-500 text-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-center text-black">
            Add Tickets
          </p>
        </div>
        <div className="flex flex-col gap-30">
          <div className="flex flex-col">
            <p className="font-400 text-sm text-black">
              Please be sure to add taxes on top of ticket prices after this
              event has been created.
            </p>
          </div>
          <div className="flex gap-30 max-w-352">
            <CustomButton
              name="paid"
              id="paid"
              type="button"
              buttonStyle={`text-black px-44 flex gap-10 items-center justify-center rounded-5 text-base bg-blue-bgcomman border-none py-7 w-full`}
              onClick={(e) =>
                addNewTicketsRow(e, formik.values, formik.setValues)
              }
            >
              Paid
            </CustomButton>
            <CustomButton
              name="free"
              id="free"
              type="button"
              buttonStyle={`text-black px-44 flex gap-10 items-center justify-center rounded-5 text-base bg-blue-bgcomman border-none py-7 w-full`}
              onClick={(e) =>
                addNewTicketsRow(e, formik.values, formik.setValues)
              }
            >
              Free
            </CustomButton>
          </div>
          <div>
            {typeof formik.errors.tickets === "string" &&
              formik.errors.tickets &&
              formik.touched.tickets && (
                <div className="error">
                  <p className="text-sm text-red-600">
                    {JSON.stringify(formik.errors.tickets).replace(/"/g, "")}
                  </p>
                </div>
              )}
          </div>
          <FieldArray name="tickets">
            {() =>
              formik.values?.tickets?.map((tik, i) => {
                return (
                  <div
                    key={i}
                    className="border-0.5 border-solid rounded-5 w-full max-w-659 px-20 "
                  >
                    <div className="relative flex flex-col gap-15 px-25 py-35">
                      <div className="flex gap-15 flex-col xxl:flex-row xl:flex-row lg:flex-row">
                        <div className="flex flex-col gap-3">
                          <p className="font-400 text-sm text-black">
                            Tickets Name
                          </p>
                          <InputField
                            id="name"
                            name={`tickets.${i}.name`}
                            type="text"
                            disabled={edit}
                            componentstyle="w-full max-w-659 gap-20 px-10 py-8 mt-1 border-0.5"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 disabled:cursor-not-allowed"
                          />
                        </div>
                        <div className="flex gap-20 ms:flex-col">
                          <div className="flex flex-col gap-3">
                            <p className="font-400 text-sm text-black">
                              Regular Price
                            </p>
                            <InputField
                              id="price"
                              name={`tickets.${i}.price`}
                              type="number"
                              min="0"
                              placeholder="Price"
                              starticon="RM"
                              disabled={
                                formik.values?.tickets[i]?.type === "FREE"
                              }
                              componentstyle="w-full max-w-300 gap-5 px-10 pt-6 pb-5 mt-1 border-0.5 disabled:cursor-not-allowed focus-within:border-sky-500"
                              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-base placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-10 disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="flex flex-col gap-3">
                            <p className="font-400 text-sm text-black">
                              Tickets Available
                            </p>
                            <InputField
                              id="quantity"
                              onChange={(e) => handleChange(e, setFieldValue)}
                              name={`tickets.${i}.quantity`}
                              type="text"
                              starticon={
                                <BsCalendarCheck size={18} fill="#23C5FF" />
                              }
                              disabled={edit}
                              componentstyle="w-full max-w-300 gap-5 px-10 py-8 mt-1 border-0.5 focus-within:border-sky-500"
                              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-5 disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-15 flex-col xxl:flex-row xl:flex-row lg:flex-row">
                        <div className="flex flex-col gap-3">
                          <p className="font-400 text-sm text-black">
                            Start date
                          </p>
                          <div className="relative">
                            <Datepicker
                              name={`tickets.${i}.startDate`}
                              placeholder="Start date"
                              minDate={new Date()}
                              showError="true"
                              disabled={edit}
                              componentstyle="pl-48 border-0.5 border-solid rounded-5 py-5 w-full max-w-300 disabled:cursor-not-allowed focus:outline-sky-500"
                            />
                            <div className="absolute top-9 left-15">
                              <Image
                                src={calender}
                                alt="Picture of an text"
                                width={18}
                                height={18}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <p className="font-400 text-sm text-black">
                            Start time
                          </p>
                          <div className="relative">
                            <CustomTime
                              name={`tickets.${i}.startTime`}
                              ticketStartDate
                              disabled={edit}
                              componentstyle="pl-48 border-0.5 border-solid rounded-5 py-5 w-full max-w-300 h-35 disabled:cursor-not-allowed focus:outline-sky-500"
                              placeholder="Start time"
                            />
                            <div className="absolute top-9 left-15">
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
                      <div className="flex gap-15 flex-col xxl:flex-row xl:flex-row lg:flex-row">
                        <div className="flex flex-col gap-3">
                          <p className="font-400 text-sm text-black">
                            End date
                          </p>
                          <div className="relative">
                            <Datepicker
                              name={`tickets.${i}.endDate`}
                              placeholder="End date"
                              minDate={new Date()}
                              showError="true"
                              disabled={edit}
                              componentstyle="pl-48 border-0.5 border-solid rounded-5 py-5 w-full max-w-300 disabled:cursor-not-allowed focus:outline-sky-500"
                            />
                            <div className="absolute top-9 left-15">
                              <Image
                                src={calender}
                                alt="Picture of an text"
                                width={18}
                                height={18}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5">
                          <p className="font-400 text-sm text-black">
                            End time
                          </p>
                          <div className="relative">
                            <CustomTime
                              name={`tickets.${i}.endTime`}
                              disabled={edit}
                              componentstyle="pl-48 border-0.5 border-solid rounded-5 py-5 w-full max-w-300 h-35 disabled:cursor-not-allowed focus:outline-sky-500"
                              placeholder="End time"
                            />
                            <div className="absolute top-9 left-15">
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
                      <div className="flex flex-col w-full">
                        <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
                          Status
                        </p>
                        <SelectOptionDefault
                          name={`tickets.${i}.status`}
                          dropDownList={[
                            {
                              id: "ACTIVE",
                              name: "Active",
                            },
                            {
                              id: "INACTIVE",
                              name: "In Active",
                            },
                          ]}
                          componentstyle="w-full max-w-232 py-7 gap-25 text-xs"
                          borderstyle="border-0.5 border-solid "
                          icon={<IoIosArrowDown size={16} />}
                          placeHolder="Pick one"
                          dropDownHeight="h-50"
                        />
                      </div>
                      <CustomTextArea
                        name={`tickets.${i}.description`}
                        borderstyle="rounded-5 outline-none outline-offset-0 resize-none"
                        componentstyle="px-28 py-7 placeholder:font-400 placeholder:text-xs text-xs w-full mt-7 focus-within:border-sky-500"
                        placeholder="Short description"
                        rows="3"
                        cols="79"
                      />
                      <div
                        className="absolute top-10 right-12"
                        id={i}
                        onClick={(e) => {
                          handleRemoveTicketsRow(
                            e,
                            formik.values,
                            formik.setValues
                          );
                        }}
                      >
                        {!edit && <FaTrash size={15} fill="#c92a2a" />}
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </FieldArray>
        </div>
      </div>
    </div>
  );
};

export default Tickets;

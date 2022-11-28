import { Form, Formik, useField } from "formik";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import closelineicon from "../../assets/img/closelineicon.svg";
import { OrganizationFormValidationSchema } from "../../utils/FormValidations";
import CustomButton from "../forms/CustomButton";
import InputField from "../forms/InputField";
import FormSelectOption from "../dropdown/FormSelectOption.js";
import updown from "../../assets/img/updown.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrganizationData,
  setShowForm,
  editOrganizationData,
} from "../../Redux/admin/organizationSlice";
import countryNameList from "country-codes-list";
import CustomSelectTag from "../dropdown/CustomSelectTag";
import { Toaster } from "react-hot-toast";

const initialState = {
  userFirstName: "",
  userLastName: "",
  email: "",
  phone: "",
  addLine1: "",
  area: "",
  addLine2: "",
  areaCode: "",
  city: "",
  country: "",
  state: "",
  area: "",
  name: "",
  picName: "",
  coRegNo: "",
  picContact: "",
  picEmail: "",
  paymentTerms: "",
  commission: "",
  eventTypeIds: "",
};

const CreateOrganizationForm = (props) => {
  const {
    organizationFormSubmit,
    organizationFormEditSubmit,
    eventsData,
    showForm,
  } = useSelector((state) => ({
    organizationFormSubmit: state.organizationSlice.organizationFormSubmit,
    eventsData: state.organizationSlice.eventsList,
    showForm: state.organizationSlice.showForm,
    organizationFormEditSubmit:
      state.organizationSlice.organizationFormEditSubmit,
  }));

  const [initialData, setInitialData] = useState(initialState);
  useEffect(() => {
    const temp = {
      ...props?.formdata,
      data: {
        ...props?.formdata?.data,
        eventTypeIds: props?.formdata?.data?.eventTypeIds
          ? eventsData.filter(
            (e) => e.id === props?.formdata?.data?.eventTypeIds[0]
          )[0]?.name
          : "",
      },
    };
    if (props?.formdata) setInitialData(getFilledData(temp));
  }, [eventsData]);
  const getFilledData = (formdata) => ({
    userFirstName: formdata?.data?.users[0]?.firstName || "",
    userLastName: formdata?.data?.users[0]?.lastName || "",
    email: formdata?.data?.users[0]?.email || "",
    phone: formdata?.data?.phone || "",
    addLine1: formdata?.data?.addLine1 || "",
    area: formdata?.data?.area || "",
    addLine2: formdata?.data?.addLine2 || "",
    areaCode: formdata?.data?.areaCode || "",
    city: formdata?.data?.city || "",
    country: formdata?.data?.country
      ? {
        name: countryNameList.findOne("countryCode", formdata?.data?.country)
          ?.countryNameEn,
      }
      : "",
    state: formdata?.data?.state || "",
    area: formdata?.data?.area || "",
    name: formdata?.data?.name || "",
    picName: formdata?.data?.picName || "",
    coRegNo: formdata?.data?.coRegNo || "",
    picContact: formdata?.data?.picContact || "",
    picEmail: formdata?.data?.picEmail || "",
    paymentTerms: formdata?.data?.paymentTerms
      ? { name: formdata?.data?.paymentTerms }
      : "",
    commission: formdata?.data?.commission || "",
    eventTypeIds: formdata?.data?.eventTypeIds
      ? [
        {
          label: eventsData.filter(
            (e) => e.id === props?.formdata?.data?.eventTypeIds[0]
          )[0]?.name,
          value: eventsData.filter(
            (e) => e.id === props?.formdata?.data?.eventTypeIds[0]
          )[0]?.id,
        },
      ]
      : "",
  });

  const paymentOption = [
    { value: "7 days", name: "7 days" },
    { value: "14 days", name: "14 days" },
    { value: "30 days", name: "30 days" },
    { value: "45 days", name: "45 days" },
    { value: "60 days", name: "60 days" },
  ];

  const handleChange = (e, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(e.target.name, value);
  };

  const countryOption = countryNameList.customArray();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={initialData}
      validationSchema={OrganizationFormValidationSchema}
      validateOnBlur={false}
      validateOnChange={false}
      enableReinitialize
      onSubmit={(values) => {
        const formValues = {
          "userFirstName": values.userFirstName,
          "userLastName": values.userLastName,
          "name": values.name,
          "coRegNo": values.coRegNo,
          "addLine1": values.addLine1,
          "addLine2": values.addLine2,
          "country": values.country.value,
          "state": values.state,
          "area": values.area,
          "areaCode": values.areaCode,
          "city": values.city,
          "phone": values.phone,
          "email": values.email,
          "picName": values.picName,
          "picContact": values.picContact,
          "picEmail": values.picEmail,
          "commission": Number(values.commission),
          "paymentTerms": values.paymentTerms.value,
          "eventTypeIds": values?.eventTypeIds?.map((eventType) => {
            return eventType?.value;
          }),
        };
        const formData = {
          ...values,
          commission: Number(values.commission),
          country: values.country.value,
          paymentTerms: values.paymentTerms.value,
          eventTypeIds: values?.tags?.map((eventType) => {
            return eventType?.value;
          }),
        };
        props.formdata?.data?.users[0]
          ? dispatch(
            editOrganizationData({ data: formData, id: props.formdata?.id })
          )
          : dispatch(addOrganizationData(formValues));
        showForm === false && dispatch(setShowForm(false));
      }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <div className="w-full min-h-screen flex justify-center items-center bg-light absolute top-0 left-0 ">
          <div className="my-55 mx-20 flex justify-center bg-white z-10 rounded-5">
            <div className="p-23">
              <div className="flex justify-between items-center mb-20">
                <div className="text-20 font-bold">Add Organization</div>
                <div>
                  <Image
                    onClick={() => dispatch(setShowForm(false))}
                    src={closelineicon}
                    height={16}
                    width={16}
                    alt=""
                  />
                </div>
              </div>
              <Form>
                <div className="flex">
                  <div className="pr-20 pl-10 border-r-1 border-solid border-bordergrey flex flex-col gap-10">
                    <div className="text-base font-bold">Personal Details</div>
                    <div className="flex gap-10">
                      <div>
                        <label className="text-sm">First Name</label>
                        <div>
                          <InputField
                            id="firstName"
                            name="userFirstName"
                            type="firstName"
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm "
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 px-12 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm">Last Name</label>
                        <div>
                          <InputField
                            id="lastName"
                            name="userLastName"
                            type="lastName"
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 px-12"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Phone Number</label>
                      <div>
                        <InputField
                          maxLength={10}
                          onChange={(e) => handleChange(e, setFieldValue)}
                          id="phoneNo"
                          name="phone"
                          type="text"
                          starticon={
                            <span className="text-sm p-5 text-dark-grey">
                              +60
                            </span>
                          }
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm text-sm pl-10"
                          componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Email </label>
                      <div>
                        <InputField
                          disabled={
                            props?.formdata?.data?.users[0]?.email && true
                          }
                          id="email"
                          name="email"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm disabled:cursor-not-allowed"
                          componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm ">Address Line 1 </label>
                      <div>
                        <InputField
                          id="add1"
                          name="addLine1"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                          componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Address Line 2 </label>
                      <div>
                        <InputField
                          id="add2"
                          name="addLine2"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                          componentstyle="border-1 border-solid border-[bordergrey] rounded-5 min-h-[36px] pl-12"
                        />
                      </div>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        <label className="text-sm">Area </label>
                        <div>
                          <InputField
                            id="areaa"
                            name="area"
                            type="text"
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 px-12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm">Area Code</label>
                        <div>
                          <InputField
                            id="areacode"
                            name="areaCode"
                            type="text"
                            onChange={(e) => handleChange(e, setFieldValue)}
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 px-12"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">City </label>
                      <div>
                        <InputField
                          id="city"
                          name="city"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                          componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 px-12"
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-between gap-10">
                      <div className="basis-1/2">
                        <label className="text-sm">Country </label>
                        <div>
                          <FormSelectOption
                            option={countryOption}
                            id="country"
                            setValues={setFieldValue}
                            name="country"
                            componentstyle="w-full border-1 border-solid border-bordergrey min-h-36 rounded-5 pr-12 max-w-300 flex  justify-between  items-center p-5"
                            borderstyle="border-0.5 border-solid "
                            icon={
                              <Image
                                src={updown}
                                height={16}
                                width={16}
                                alt=""
                              />
                            }
                          />
                        </div>
                      </div>
                      <div className="basis-1/2">
                        <label className="text-sm">State</label>
                        <div>
                          <InputField
                            id="state"
                            name="state"
                            type="text"
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 pl-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pr-10 pl-20 flex flex-col gap-10">
                    <div className="text-base font-bold">
                      Organization Details
                    </div>
                    <div>
                      <label className="text-sm">Organizer Name</label>
                      <div>
                        <InputField
                          id="organizer"
                          name="name"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                          componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 pl-12"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Person Incharge Name</label>
                      <div>
                        <InputField
                          id="person"
                          name="picName"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                          componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 pl-12"
                        />
                      </div>
                    </div>
                    <div className="flex gap-10">
                      <div>
                        <label className="text-sm">
                          Company Registration Number{" "}
                        </label>
                        <div>
                          <InputField
                            id="company"
                            name="coRegNo"
                            type="text"
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 pl-12"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm">
                          Person Incharge Contact
                        </label>
                        <div>
                          <InputField
                            maxLength={10}
                            onChange={(e) => handleChange(e, setFieldValue)}
                            id="personincharge"
                            name="picContact"
                            starticon={
                              <span className="text-sm pl-5 pr-10 text-dark-grey">
                                +60
                              </span>
                            }
                            type="text"
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm pl-5 text-sm "
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm">Person Incharge Email </label>
                      <div>
                        <InputField
                          id="personinchargeemail"
                          name="picEmail"
                          type="text"
                          inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                          componentstyle="border-1 border-solid border-[bordergrey] rounded-5 min-h-36 pl-12"
                        />
                      </div>
                    </div>
                    <div className="flex w-full justify-between gap-10">
                      <div className="basis-1/2">
                        <label className="text-sm">Select Payment Terms </label>
                        <div>
                          <FormSelectOption
                            option={paymentOption}
                            id="paymentTerms"
                            setValues={setFieldValue}
                            name="paymentTerms"
                            componentstyle="w-full border-1 border-solid border-bordergrey min-h-36 rounded-5 pr-12 max-w-300 flex justify-between  items-center p-5"
                            borderstyle="border-0.5 border-solid "
                            icon={
                              <Image
                                src={updown}
                                height={16}
                                width={16}
                                alt=""
                              />
                            }
                          />
                        </div>
                      </div>
                      <div className="basis-1/2 relative">
                        <label className="text-sm">Commission</label>
                        <div>
                          <InputField
                            id="commission"
                            name="commission"
                            type="text"
                            onChange={(e) => handleChange(e, setFieldValue)}
                            inputstyle="outline-none placeholder:placeholder-light-grey placeholder:text-sm"
                            componentstyle="border-1 border-solid border-bordergrey rounded-5 min-h-36 px-10"
                          />
                        </div>
                        <div className="absolute top-[28px] right-10">%</div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm ">Event Types </label>
                      <div>
                        {/* <FormSelectOption
                          option={eventsData?.map((e) => ({ value: e.id, name: e.name }))}
                          id="eventCategory"
                          setValues={setFieldValue}
                          name="eventTypeIds"
                          componentstyle="w-full border-1 border-solid border-bordergrey min-h-36 rounded-5 pr-12 flex justify-between  items-center p-5 min-h-36"
                          icon={<Image src={updown} height={16} width={16} alt="" />}
                        /> */}
                        <CustomSelectTag
                          name="eventTypeIds"
                          id="eventCategory"
                          setValues={setFieldValue}
                          componentstyle="w-full border-1 border-solid border-bordergrey min-h-36 rounded-5 pr-12 flex justify-between  items-center p-5 min-h-36 "
                          borderstyle="outline-black "
                          eventTags={eventsData?.map((e) => ({
                            value: e?.id,
                            name: e?.name,
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-30 flex justify-center">
                  <CustomButton
                    disabled={
                      organizationFormSubmit || organizationFormEditSubmit
                    }
                    onClick={handleSubmit}
                    type="submit"
                    buttonStyle="text-white px-4 flex gap-10 items-center justify-center rounded-5 text-base text-white bg-blue-bgcomman
                  disabled:bg-dark-blue py-7 w-full max-w-100"
                  >
                    Submit
                  </CustomButton>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default CreateOrganizationForm;

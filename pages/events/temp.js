import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Form, Formik, FieldArray } from "formik";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import {
  createEventsFormValidation,
  CreateEventValidationSchema,
  eventsSaveAsDraftValidation,
} from "../../utils/FormValidations";
import CustomButton from "../../components/forms/CustomButton";
import { useEffect } from "react";
import {
  createEventCategories,
  createEventChildCategories,
  createEventFetchAPi,
  createEventTags,
  createEventType,
} from "../../Redux/event/createEventSlice";
import toast, { Toaster } from "react-hot-toast";
import { FaSave } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import BasicInfo from "../../components/create-event-temp/BasicInfo";
import Location from "../../components/create-event-temp/Location";
import DateTime from "../../components/create-event-temp/DateTime";
import EventCoverImge from "../../components/create-event-temp/EventCoverImge";
import Discription from "../../components/create-event-temp/Discription";
import Tickets from "../../components/create-event-temp/Tickets";
import OrgContactDetail from "../../components/create-event-temp/OrgContactDetail";
import ImageCropModal from "../../components/create-event-temp/ImageCropModal";
import { useRouter } from "next/router";
import { AiOutlineConsoleSql } from "react-icons/ai";

const Create = () => {
  const { replace } = useRouter();
  const {
    categories,
    type,
    getSlug,
    childCategories,
    isLoading,
    createEventLoading,
    eventTags,
  } = useSelector((state) => ({
    categories: state.createEventSlice.categories,
    childCategories: state.createEventSlice.childCategories,
    type: state.createEventSlice.type,
    isLoading: state.createEventSlice.isLoading,
    createEventLoading: state.createEventSlice.createEventLoading,
    getSlug: state.createEventSlice.getSlug,
    eventTags: state.createEventSlice.eventTags,
  }));

  const dispatch = useDispatch();
  const [location, setlocation] = useState({});
  const [showMap, setShowMap] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [activeEventsTab, setActiveEventsTab] = useState({
    tab: 1,
    isVirtual: false,
  });
  const [image, setImage] = useState();
  const [schema, setSchema] = useState(createEventsFormValidation);
  // const [schema, setSchema] = useState(
  //   Yup.object().shape({
  //     ...CreateEventValidationSchema,
  //     connectionDetails: Yup.string(),
  //     location: Yup.string().required("Please search your events location"),
  //     venueName: Yup.string().required("Please search your events location"),
  //     address: Yup.string().required("Address is Required"),
  //     city: Yup.string().required("City is Required"),
  //     state: Yup.string().required("State is Required"),
  //     postalCode: Yup.string()
  //       .required("Postal code is Required")
  //       .matches(/^\d+$/, "Postal Code digits only"),
  //     country: Yup.string().required("Country is Required"),
  //   })
  // );

  // const handleSave = (values, setValues) => {
  //   setSchema(
  //     Yup.object({
  //       name: Yup.string().required("Event Title is Required").trim(),
  //     })
  //   );

  //   setValues({ ...values, status: "DRAFT" });
  // };

  const handleChangeSchema = () => {
    const tempSchema = createEventsFormValidation;
    delete tempSchema.fields.searchLocation;

    setSchema(tempSchema);
  };

  const handleSave = (values, setValues) => {
    setSubmitStatus("DRAFT");
    setValues({ ...values, status: "DRAFT" });
  };
  const handleEventOnSubmit = (values, setValues) => {
    setSubmitStatus("PUBLISHED");
    setValues({ ...values, status: "PUBLISHED" });
  };

  useEffect(() => {
    !categories && dispatch(createEventCategories());
    !type && dispatch(createEventType());
    !eventTags && dispatch(createEventTags());
  }, [childCategories, location, submitStatus, eventTags]);

  const getCombineISODate = (date, time) => {
    const startDate = new Date(date);
    const startTime = new Date(time);

    const startTimeString =
      startTime.getHours() + ":" + startTime.getMinutes() + ":00";
    const startDateString =
      startDate.getFullYear() +
      "-" +
      (startDate.getMonth() + 1) +
      "-" +
      startDate.getDate();

    return new Date(startDateString + " " + startTimeString);
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <HeaderTransparentevent
        headerStyle="bg-bg-blue fixed"
        textStyle="text-black"
      />
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          name: "",
          eventTypeId: "",
          categoryId: "",
          parentCategoryId: "",
          tags: [],
          shortDescription: "",
          description: "",
          termsConditions: "",
          orderMessage: "",
          connectionDetails: "",
          searchLocation: "",
          venueName: "",
          coverImage: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          contactDetails: {
            name: "",
            phone: "",
            email: "",
          },
          tickets: [],
          address: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          location: "",
          status: "PUBLISHED",
          isVirtual: false,
        }}
        validationSchema={
          submitStatus === "PUBLISHED"
            ? createEventsFormValidation
            : eventsSaveAsDraftValidation
        }
        onSubmit={(values) => {
          const formData = {
            ...values,
            startDate:
              values.startDate && values.startTime
                ? getCombineISODate(values.startDate, values.startTime)
                : "",
            endDate:
              values.endDate && values.endTime
                ? getCombineISODate(values.endDate, values.endTime)
                : "",
            tickets: values.tickets.map((ticket) => ({
              ...ticket,
              startDate:
                ticket.startDate && ticket.startTime
                  ? getCombineISODate(ticket.startDate, ticket.startTime)
                  : "",
              endDate:
                ticket.endDate && ticket.endTime
                  ? getCombineISODate(ticket.endDate, ticket.endTime)
                  : "",
            })),
          };

          activeEventsTab.tab === 1
            ? (formData.connectionDetails =
                "" && delete formData.connectionDetails)
            : (formData.venueName = "" && delete formData.venueName) &&
              (formData.address = "" && delete formData.address) &&
              (formData.city = "" && delete formData.city) &&
              (formData.state = "" && delete formData.state) &&
              (formData.postalCode = "" && delete formData.postalCode) &&
              (formData.country = "" && delete formData.country) &&
              (formData.latitude = "" && delete formData.latitude) &&
              (formData.longitude = "" && delete formData.longitude) &&
              (formData.location = "" && delete formData.location) &&
              (formData.placeId = "" && delete formData.placeId);
          // &&
          // formData.searchLocation == "" &&
          // delete formData.searchLocation;
          formData.connectionDetails == "" && delete formData.connectionDetails;
          formData.venueName == "" && delete formData.venueName;
          formData.address == "" && delete formData.address;
          formData.city == "" && delete formData.city;
          formData.state == "" && delete formData.state;
          formData.postalCode == "" && delete formData.postalCode;
          formData.country == "" && delete formData.country;
          formData.latitude == "" && delete formData.latitude;
          formData.longitude == "" && delete formData.longitude;
          formData.placeId == "" && delete formData.placeId;
          formData.shortDescription == "" && delete formData.shortDescription;
          formData.eventTypeId == "" && delete formData.eventTypeId;
          formData.categoryId == "" && delete formData.categoryId;
          formData.parentCategoryId == "" && delete formData.parentCategoryId;
          formData.description == "" && delete formData.description;
          formData.orderMessage == "" && delete formData.orderMessage;
          formData.termsConditions == "" && delete formData.termsConditions;
          formData.coverImage == "" && delete formData.coverImage;
          formData.startDate == "" && delete formData.startDate;
          formData.endDate == "" && delete formData.endDate;
          formData.coverImage == "" && delete formData.coverImage;
          formData.searchLocation == "" && delete formData.searchLocation;
          formData.isVirtual == undefined && delete formData.isVirtual;
          formData.contactDetails.name == "" &&
            delete formData.contactDetails.name;
          formData.contactDetails.phone == "" &&
            delete formData.contactDetails.phone;
          formData.contactDetails.email == "" &&
            delete formData.contactDetails.email;

          delete formData.startTime;
          delete formData.endTime;
          delete formData.location;
          formData.tickets.forEach((object) => {
            delete object["startTime"];
            delete object["endTime"];
          });
          formData.tags.forEach((object) => {
            delete object["label"];
            delete object["__isNew__"];
          });

          const fData = new FormData();
          image?.file &&
            fData.append("coverImage", image?.file, image?.file?.name);
          location?.lat &&
            fData.append(
              "latitude",
              activeEventsTab.tab === 2 ? "" : location?.lat || ""
            );
          location?.lng &&
            fData.append(
              "longitude",
              activeEventsTab.tab === 2 ? "" : location?.lng || ""
            );
          location?.placeId &&
            fData.append(
              "placeId",
              activeEventsTab.tab === 2 ? "" : location?.placeId || ""
            );
          Object.entries(formData).map((field) => {
            if (field[0] === "tickets") {
              formData.tickets.forEach((ticket) => {
                fData.append("tickets[]", JSON.stringify(ticket));
              });
            } else if (field[0] === "tags") {
              formData.tags.forEach((tag) => {
                fData.append("tags[]", tag.value);
              });
            } else if (field[0] === "contactDetails") {
              if (
                formData.contactDetails.name ||
                formData.contactDetails.phone ||
                formData.contactDetails.email
              )
                fData.append(
                  "contactDetails",
                  JSON.stringify(formData.contactDetails)
                );
            } else {
              fData.append(field[0], field[1] || "");
            }
          });

          dispatch(createEventFetchAPi(fData));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="py-81 px-139 xxl:px-139 xl:px-139 lg:px-90 md:px-5 sm:px-10 ms:px-10 mb-25">
              <div className="py-55 px-0 xxl:px-0 md:px-40 sm:px-10 ms:px-10 border-1 border-solid rounded-5">
                <div className="flex flex-col">
                  <BasicInfo
                    type={type}
                    categories={categories}
                    childCategories={childCategories?.childCategories}
                    eventTags={eventTags}
                    getSlug={getSlug}
                    setFieldValue={formik.setFieldValue}
                  />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <Location
                    activeEventsTab={activeEventsTab}
                    setActiveEventsTab={setActiveEventsTab}
                    location={location}
                    setlocation={setlocation}
                    showMap={showMap}
                    setShowMap={setShowMap}
                    formik={formik}
                    handleChangeSchema={handleChangeSchema}
                  />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak "></div>
                  <DateTime />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <EventCoverImge image={image} setImage={setImage} />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <Discription />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <Tickets
                    formik={formik}
                    setFieldValue={formik.setFieldValue}
                  />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <OrgContactDetail setFieldValue={formik.setFieldValue} />
                  <div>
                    <ImageCropModal image={image} setImage={setImage} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center py-20 border-y border-solid border-sectionbraek fixed bottom-0 w-full bg-white z-10">
              <div className="md:flex hidden justify-between max-w-640 w-full">
                <CustomButton
                  name="saveAsDraft"
                  type="submit"
                  disabled={
                    formik.values.status === "DRAFT" && createEventLoading
                  }
                  onClick={() => handleSave(formik.values, formik.setValues)}
                  buttonStyle="text-white px-4 flex gap-10 items-center
                  justify-center rounded-5 text-base text-white bg-blue-bgcomman
                  disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  Save as Draft
                </CustomButton>
                <CustomButton
                  name="Publish"
                  type="submit"
                  onClick={() =>
                    handleEventOnSubmit(formik.values, formik.setValues)
                  }
                  disabled={
                    formik.values.status === "PUBLISHED" && createEventLoading
                  }
                  buttonStyle="text-white px-4 flex gap-10 items-center justify-center rounded-5 text-base text-white bg-blue-bgcomman disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  Publish
                </CustomButton>
                <CustomButton
                  type="button"
                  onClick={() => replace("/")}
                  buttonStyle="px-4 flex gap-10 items-center justify-center rounded-5 text-base text-black border-1 border-solid border-light-blue disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  Cancel
                </CustomButton>
              </div>
              <div className="md:hidden flex justify-between max-w-640 w-full">
                <CustomButton
                  name="saveAsDraft"
                  type="submit"
                  disabled={
                    formik.values.status === "DRAFT" && createEventLoading
                  }
                  onClick={() => handleSave(formik.values, formik.setValues)}
                  buttonStyle="px-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  <FaSave fill="green" size={25} />
                </CustomButton>
                <CustomButton
                  name="Publish"
                  type="submit"
                  onClick={() =>
                    handleEventOnSubmit(formik.values, formik.setValues)
                  }
                  disabled={
                    formik.values.status === "PUBLISHED" && createEventLoading
                  }
                  buttonStyle="px-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  <RiSendPlaneFill fill="#23c5ff" size={25} />
                </CustomButton>
                <CustomButton
                  type="button"
                  buttonStyle="px-4 flex gap-10 ipx-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue py-7 w-full max-w-200"
                  onClick={() => replace("/")}
                >
                  <MdCancel fill="red" size={25} />
                </CustomButton>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;
  if (token && role === "ORGANIZATION") {
  } else {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { token: token },
  };
}

export default Create;

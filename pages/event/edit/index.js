import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import BasicInfo from "../../../components/create-event/BasicInfo";
import DateTime from "../../../components/create-event/DateTime";
import Discription from "../../../components/create-event/Discription";
import EventCoverImge from "../../../components/create-event/EventCoverImge";
import ImageCropModal from "../../../components/create-event/ImageCropModal";
import Location from "../../../components/create-event/Location";
import OrgContactDetail from "../../../components/create-event/OrgContactDetail";
import CustomButton from "../../../components/forms/CustomButton";
import HeaderTransparentevent from "../../../components/header/HeaderTransparentevent";
import ApiMiddleware from "../../../utils/ApiMiddleware";
import {
  createEventsFormValidation,
  CreateEventValidationSchema,
  editEventValidationSchema,
  editPublishedEventValidationSchema,
  eventsSaveAsDraftValidation,
} from "../../../utils/FormValidations";
import * as Yup from "yup";
import Tickets from "../../../components/create-event/Tickets";
import { FaSave } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import {
  createEventCategories,
  createEventChildCategories,
  createEventFetchAPi,
  createEventTags,
  createEventType,
} from "../../../Redux/event/createEventSlice";
import moment from "moment";
import { editEventData } from "../../../Redux/event/manageEventSlice";
import CustomButtonWol from "../../../components/forms/CustomButtonWol";

const EditEvent = () => {
  const { query } = useRouter();
  const [formData, setFormData] = useState();
  const { replace } = useRouter();
  const {
    categories,
    type,
    getSlug,
    childCategories,
    isLoading,
    editIsLoading,
    eventTags,
  } = useSelector((state) => ({
    categories: state.createEventSlice.categories,
    childCategories: state.createEventSlice.childCategories,
    type: state.createEventSlice.type,
    isLoading: state.createEventSlice.isLoading,
    getSlug: state.createEventSlice.getSlug,
    eventTags: state.createEventSlice.eventTags,
    editIsLoading: state.manageEventSlice.editIsLoading,
  }));

  const dispatch = useDispatch();
  const [submitStatus, setSubmitStatus] = useState("");
  const [showMap, setShowMap] = useState(false);

  // const [locationOptions, setlocationOptions] = useState(
  //   formData?.isVirtual === true ? false : true
  // );
  const [activeEventsTab, setActiveEventsTab] = useState({
    tab: formData?.isVirtual === true ? 1 : 2,
    isVirtual: formData?.isVirtual,
  });
  const [location, setlocation] = useState({
    lat: formData?.latitude || null,
    lng: formData?.longitude || null,
    placeId: formData?.placeId,
  });

  const [image, setImage] = useState();
  const [edit, setEdit] = useState(true);
  const [schema, setSchema] = useState(createEventsFormValidation);
  // const [schema, setSchema] = useState(
  //   formData?.status === "PUBLISHED"
  //     ? Yup.object().shape({
  //         ...editPublishedEventValidationSchema,
  //         connectionDetails: Yup.string(),
  //       })
  //     : // formData?.isVirtual ===  ?
  //       Yup.object().shape({
  //         ...CreateEventValidationSchema,
  //         // connectionDetails: Yup.string(),
  //         // location: Yup.string().required("Please search your events location"),
  //         // venueName: Yup.string().required(
  //         //   "Please search your events location"
  //         // ),
  //         // address: Yup.string().required("Address is Required"),
  //         // city: Yup.string().required("City is Required"),
  //         // state: Yup.string().required("State is Required"),
  //         // postalCode: Yup.string()
  //         //   .required("Postal code is Required")
  //         //   .matches(/^\d+$/, "Postal Code digits only"),
  //         // country: Yup.string().required("Country is Required"),
  //       })
  // );
  // console.log(formData.connectionDetails);

  // const handleSave = (values, setValues) => {
  //   setSchema(
  //     Yup.object({
  //       name: Yup.string().required("Event Title is Required"),
  //     })
  //   );

  //   setValues({ ...values, status: "DRAFT" });
  // };

  const handleChangeSchema = () => {
    const tempSchema = createEventsFormValidation;
    delete tempSchema.fields.searchLocation;
    // console.log(tempSchema, "tmp");
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
    !formData &&
      query?.slug &&
      (async () => {
        const res = await ApiMiddleware.get(
          `${process.env.NEXT_PUBLIC_baseURL}/organization/events/${query?.slug}`
        );
        setFormData(res?.data?.data);
        setActiveEventsTab({
          tab: res?.data?.data?.isVirtual === true ? 2 : 1,
          isVirtual: res?.data?.data?.isVirtual,
        });
      })([edit]);
    !categories && dispatch(createEventCategories());
    !type && dispatch(createEventType());
    !eventTags && dispatch(createEventTags());
    formData?.length > 0 &&
      !childCategories &&
      dispatch(createEventChildCategories(formData?.parentCategory?.slug));

    setEdit(formData?.status == "DRAFT" ? false : true);
    setlocation({
      lat: formData?.latitude || null,
      lng: formData?.longitude || null,
      placeId: formData?.placeId,
    });
  }, [childCategories, schema, image, formData, edit]);

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
        enableReinitialize={true}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          name: formData?.name || "",
          eventTypeId: formData?.eventTypeId || "",
          parentCategoryId: formData?.parentCategoryId || "",
          categoryId: formData?.categoryId || "",
          connectionDetails: formData?.connectionDetails || "",
          tags:
            formData?.tags.length > 0
              ? formData?.tags.map((tag) => ({ value: tag, label: tag }))
              : [],
          isVirtual: formData?.isVirtual || false,
          searchLocation: "",
          venueName: formData?.venueName || "",
          address: formData?.address || "",
          latitude: formData?.latitude || "",
          longitude: formData?.longitude || "",
          placeId: formData?.placeId || "",
          city: formData?.city || "",
          state: formData?.state || "",
          country: formData?.country || "",
          postalCode: formData?.postalCode || "",
          startDate: formData?.startDate
            ? moment(formData?.startDate).toDate()
            : null,
          startTime: formData?.startDate
            ? moment(formData?.startDate).format("YYYY-MM-DD h:mm A")
            : null,
          endDate: formData?.endDate
            ? moment(formData?.endDate).toDate()
            : null,
          endTime: formData?.endDate
            ? moment(formData?.endDate).format("YYYY-MM-DD h:mm A")
            : null,
          coverImage: formData?.coverImage,
          shortDescription: formData?.shortDescription,
          description: formData?.description,
          termsConditions: formData?.termsConditions,
          tickets: formData?.EventTicket || [],
          status: formData?.status,
          orderMessage: formData?.orderMessage || "",
          contactDetails: {
            name: formData?.contactDetails?.name,
            phone: formData?.contactDetails?.phone || null,
            email: formData?.contactDetails?.email,
          },
        }}
        // validationSchema={
        //   submitStatus === "PUBLISHED"
        //     ? createEventsFormValidation
        //     : eventsSaveAsDraftValidation
        // }
        onSubmit={(values) => {
          // console.log(values);
          // setSchema(Yup.object().shape(CreateEventValidationSchema));
          const filledData = {
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
                  : ticket.startDate,
              endDate:
                ticket.endDate && ticket.endTime
                  ? getCombineISODate(ticket.endDate, ticket.endTime)
                  : ticket.endDate,
              // action: edit ? "UPDATE" : "CREATE",
            })),
          };

          activeEventsTab.tab === 1
            ? (filledData.connectionDetails =
                "" && delete filledData.connectionDetails)
            : (filledData.venueName = "" && delete filledData.venueName) &&
              (filledData.address = "" && delete filledData.address) &&
              (filledData.city = "" && delete filledData.city) &&
              (filledData.state = "" && delete filledData.state) &&
              (filledData.postalCode = "" && delete filledData.postalCode) &&
              (filledData.country = "" && delete filledData.country) &&
              (filledData.latitude = "" && delete filledData.latitude) &&
              (filledData.longitude = "" && delete filledData.longitude) &&
              (filledData.location = "" && delete filledData.location) &&
              (filledData.placeId = "" && delete filledData.placeId);
          filledData.connectionDetails == "" &&
            delete filledData.connectionDetails;
          filledData.venueName == "" && delete filledData.venueName;
          filledData.address == "" && delete filledData.address;
          filledData.city == "" && delete filledData.city;
          filledData.state == "" && delete filledData.state;
          filledData.postalCode == "" && delete filledData.postalCode;
          filledData.country == "" && delete filledData.country;
          filledData.latitude == "" && delete filledData.latitude;
          filledData.longitude == "" && delete filledData.longitude;
          filledData.placeId == "" && delete filledData.placeId;
          filledData.shortDescription == "" &&
            delete filledData.shortDescription;
          filledData.eventTypeId == "" && delete filledData.eventTypeId;
          filledData.categoryId == "" && delete filledData.categoryId;
          filledData.parentCategoryId == "" &&
            delete filledData.parentCategoryId;
          filledData.description == "" && delete filledData.description;
          filledData.orderMessage == "" && delete filledData.orderMessage;
          filledData.termsConditions == "" && delete filledData.termsConditions;
          filledData.coverImage == null && delete filledData.coverImage;
          filledData.startDate == "" && delete filledData.startDate;
          filledData.endDate == "" && delete filledData.endDate;
          filledData.coverImage == "" && delete filledData.coverImage;
          filledData.searchLocation == "" && delete filledData.searchLocation;
          filledData.isVirtual == undefined && delete filledData.isVirtual;
          filledData.contactDetails.name == "" &&
            delete filledData.contactDetails.name;
          filledData.contactDetails.phone == "" &&
            delete filledData.contactDetails.phone;
          filledData.contactDetails.email == "" &&
            delete filledData.contactDetails.email;

          delete filledData.startTime;
          delete filledData.endTime;
          delete filledData.location;
          filledData.tickets.forEach((object) => {
            delete object["startTime"];
            delete object["endTime"];
          });

          const fData = new FormData();
          image?.file &&
            fData.append("coverImage", image?.file, image?.file?.name);
          if (filledData.status === "DRAFT") {
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
          }
          Object.entries(filledData).map((field) => {
            if (field[0] === "tickets") {
              filledData.tickets.forEach((ticket) => {
                fData.append("tickets[]", JSON.stringify({ ...ticket }));
              });
            } else if (field[0] === "tags") {
              filledData.tags.forEach((tag) => {
                fData.append("tags[]", tag.value);
              });
            } else if (field[0] === "contactDetails") {
              if (
                filledData.contactDetails.name ||
                filledData.contactDetails.phone ||
                filledData.contactDetails.email
              )
                fData.append(
                  "contactDetails",
                  JSON.stringify(filledData.contactDetails)
                );
            } else {
              fData.append(field[0], field[1] || "");
            }
          });
          dispatch(editEventData({ slug: query.slug, data: fData }));
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="py-81 px-139 xxl:px-139 xl:px-139 lg:px-90 md:px-5 sm:px-10 ms:px-10 mb-25">
              <div className="py-55 px-0 xxl:px-0 md:px-40 sm:px-10 ms:px-10 border-1 border-solid rounded-5">
                {/* <span>{JSON.stringify(formik.errors, null, 2)}</span> */}
                <div className="flex flex-col">
                  <BasicInfo
                    type={type}
                    categories={categories}
                    childCategories={childCategories?.childCategories}
                    eventTags={eventTags}
                    getSlug={getSlug}
                    edit={formData?.status == "DRAFT" ? true : true}
                  />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <Location
                    activeEventsTab={activeEventsTab}
                    setActiveEventsTab={setActiveEventsTab}
                    setSchema={setSchema}
                    location={location}
                    setlocation={setlocation}
                    showMap={showMap}
                    setShowMap={setShowMap}
                    CreateEventValidationSchema={CreateEventValidationSchema}
                    formik={formik}
                    handleChangeSchema={handleChangeSchema}
                    edit={formData?.status == "DRAFT" ? false : true}
                    isVirtual={formData?.isVirtual === true ? true : false}
                  />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak "></div>
                  <DateTime edit={formData?.status == "DRAFT" ? false : true} />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <EventCoverImge
                    image={image}
                    setImage={setImage}
                    imageAtEdit={formData?.coverImage}
                  />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <Discription />
                  <div className="mx-72 xxl:mx-72 md:mx-5 sm:mx-5 ms:mx-5 my-50 border-b-0.25 border-solid border-sectionbreak"></div>
                  <Tickets
                    formik={formik}
                    edit={formData?.status == "DRAFT" ? false : true}
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
                {formik.values.status === "DRAFT" ? (
                  <CustomButton
                    name="saveAsDraft"
                    type="submit"
                    disabled={formik.values.status === "DRAFT" && editIsLoading}
                    onClick={() => handleSave(formik.values, formik.setValues)}
                    buttonStyle="text-white px-4 flex gap-10 items-center
                  justify-center rounded-5 text-base text-white bg-blue-bgcomman
                  disabled:bg-dark-blue disabled:cursor-not-allowed py-7 w-full max-w-200"
                  >
                    Update Draft
                  </CustomButton>
                ) : (
                  <CustomButtonWol
                    name="saveAsDraft"
                    type="submit"
                    disabled={edit}
                    onClick={() => handleSave(formik.values, formik.setValues)}
                    buttonStyle="text-white px-4 flex gap-10 items-center
                  justify-center rounded-5 text-base text-white bg-blue-bgcomman
                  disabled:bg-dark-blue disabled:cursor-not-allowed py-7 w-full max-w-200"
                  >
                    Update Draft
                  </CustomButtonWol>
                )}
                <CustomButton
                  name="Publish"
                  type="submit"
                  onClick={() =>
                    handleEventOnSubmit(formik.values, formik.setValues)
                  }
                  disabled={
                    formik.values.status === "PUBLISHED" && editIsLoading
                  }
                  buttonStyle="text-white px-4 flex gap-10 items-center justify-center rounded-5 text-base text-white bg-blue-bgcomman disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  Update
                </CustomButton>
                <CustomButtonWol
                  type="button"
                  onClick={() => replace("/events/manage")}
                  buttonStyle="px-4 flex gap-10 items-center justify-center rounded-5 text-base text-black border-1 border-solid border-light-blue disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  Cancel
                </CustomButtonWol>
              </div>
              <div className="md:hidden flex justify-between max-w-640 w-full">
                {formik.values.status === "DRAFT" ? (
                  <CustomButton
                    name="saveAsDraft"
                    type="submit"
                    disabled={formik.values.status === "DRAFT" && editIsLoading}
                    onClick={() => handleSave(formik.values, formik.setValues)}
                    buttonStyle="px-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue disabled:cursor-not-allowed py-7 w-full max-w-200"
                  >
                    <FaSave fill="green" size={25} />
                  </CustomButton>
                ) : (
                  <CustomButtonWol
                    name="saveAsDraft"
                    type="submit"
                    disabled={edit}
                    onClick={() => handleSave(formik.values, formik.setValues)}
                    buttonStyle="px-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue disabled:cursor-not-allowed py-7 w-full max-w-200"
                  >
                    <FaSave fill="green" size={25} />
                  </CustomButtonWol>
                )}
                <CustomButton
                  name="Publish"
                  type="submit"
                  onClick={() =>
                    handleEventOnSubmit(formik.values, formik.setValues)
                  }
                  disabled={
                    formik.values.status === "PUBLISHED" && editIsLoading
                  }
                  buttonStyle="px-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue py-7 w-full max-w-200"
                >
                  <RiSendPlaneFill fill="#23c5ff" size={25} />
                </CustomButton>
                <CustomButtonWol
                  type="button"
                  buttonStyle="px-4 flex gap-10 ipx-4 flex gap-10 items-center
                  justify-center
                  disabled:bg-dark-blue py-7 w-full max-w-200"
                  onClick={() => replace("/events/manage")}
                >
                  <MdCancel fill="red" size={25} />
                </CustomButtonWol>
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
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token: token },
  };
}

export default EditEvent;

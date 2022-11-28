import React, { useEffect } from "react";
import location_form from "../../assets/img/location_form.svg";
import inputSearch from "../../assets/img/input_search.svg";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";
import * as Yup from "yup";
import Image from "next/image";
import InputField from "../forms/InputField";
import CustomButton from "../forms/CustomButton";
import { Map } from "../../components/google/Map";
import classNames from "classnames";
import { MarkerF } from "@react-google-maps/api";
import CustomButtonWol from "../forms/CustomButtonWol";

const Location = ({
  activeEventsTab,
  setActiveEventsTab,
  setlocation,
  location,
  showMap,
  setShowMap,
  locationOptions,
  setlocationOptions,
  CreateEventValidationSchema,
  formik,
  edit,
  isVirtual,
  handleChangeSchema,
}) => {
  const handleselect = (e) => {
    handleChangeSchema();
    setlocation({
      lat: parseFloat(e.geometry?.location?.lat()),
      lng: parseFloat(e.geometry?.location?.lng()),
      placeId: e.place_id,
    });

    formik.setFieldValue(
      `country`,
      e?.address_components?.find((data) => data.types.includes("country"))
        ?.long_name
    );
    formik.setFieldValue(
      `state`,
      e?.address_components?.find((data) =>
        data.types.includes("administrative_area_level_1")
      )?.long_name
    );
    formik.setFieldValue(
      `postalCode`,
      e?.address_components?.find((data) => data.types.includes("postal_code"))
        ?.long_name
    );
    formik.setFieldValue(
      `city`,
      e?.address_components?.find((data) => data.types.includes("locality"))
        ?.long_name
    );
    // {
    //   e.place_id
    //     ? setSchema(
    //         Yup.object().shape({
    //           ...CreateEventValidationSchema,
    //           location: Yup.string(),
    //         })
    //       )
    //     : setSchema(
    //         Yup.object().shape({
    //           ...CreateEventValidationSchema,
    //           location: Yup.string().when("isVirtual", {
    //             is: false,
    //             then: Yup.string().required(
    //               "Please search your events location"
    //             ),
    //           }),
    //         })
    //       );
    // }
    // setShowMap(true);
  };
  const isEditable = !edit || formik.values.status === "DRAFT";
  // const { ref } = usePlacesWidget({
  //   onPlaceSelected: (e) => {
  //     setlocation({
  //       lat: null,
  //       lng: null,
  //       placeId: null,
  //     });
  //     setlocation({
  //       lat: parseFloat(e.geometry?.location?.lat()),
  //       lng: parseFloat(e.geometry?.location?.lng()),
  //       placeId: e.place_id,
  //     });
  //     console.log(e, "test");

  //     formik.setFieldValue(
  //       `country`,
  //       e?.address_components?.find((data) => data.types.includes("country"))
  //         ?.long_name
  //     );
  //     formik.setFieldValue(
  //       `state`,
  //       e?.address_components?.find((data) =>
  //         data.types.includes("administrative_area_level_1")
  //       )?.long_name
  //     );
  //     formik.setFieldValue(
  //       `postalCode`,
  //       e?.address_components?.find((data) =>
  //         data.types.includes("postal_code")
  //       )?.long_name
  //     );
  //     formik.setFieldValue(
  //       `city`,
  //       e?.address_components?.find((data) => data.types.includes("locality"))
  //         ?.long_name
  //     );
  //     formik.setFieldValue("isVirtual", false);
  //   },
  //   options: {
  //     types: ["establishment", "geocode"],
  //     componentRestrictions: { country: "my" },
  //   },
  // });

  const handleChange = (e, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(e.target.name, value);
  };

  const handleMap = () => {
    setlocation({ lat: null, lng: null });
    formik.setFieldValue(`address`, "");
    formik.setFieldValue(`venueName`, "");
    formik.setFieldValue(`country`, "");
    formik.setFieldValue(`state`, "");
    formik.setFieldValue(`postalCode`, "");
    formik.setFieldValue(`city`, "");
    formik.setFieldValue("searchLocation", "");
    formik.setFieldValue("isVirtual", undefined);
  };

  // useEffect(() => {
  //   if (ref.current) {
  //     const mapListener = google.maps.event.addDomListener(
  //       ref.current,
  //       "keydown",
  //       function (e) {
  //         const pacContainer = document.querySelectorAll(".pac-container");
  //         if (e.code == "Enter" && pacContainer.length > 0) {
  //           e.preventDefault();
  //         }
  //       }
  //     );
  //     return () => {
  //       google.maps.event.removeListener(mapListener);
  //     };
  //   }
  // }, [ref]);
  useEffect(() => {
    // console.log(location, activeEventsTab);
  }, [activeEventsTab, location]);

  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-15 sm:gap-10 ms:gap-8 disabled:cursor-not-allowed">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image
            src={location_form}
            alt="Picture of an text"
            width={34}
            height={34}
          />
          <p className="font-500 text-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-black">
            Location
          </p>
        </div>
        <div className="flex flex-col gap-15 w-full">
          <div className="flex gap-30 max-w-352">
            <div
              onClick={() => {
                if (isEditable) {
                  setActiveEventsTab({ tab: 1, isVirtual: false });
                  formik.setFieldValue("connectionDetails", "");
                  formik.setFieldValue("isVirtual", false);
                }
              }}
              className={classNames(
                "text-black flex gap-10 items-center justify-center rounded-5 text-base px-12 py-3 w-full cursor-pointer xxl:px-44 xxl:py-7 xl:px-44 xl:py-7 lg:px-44 lg:py-7 md:px-20 md:py-7 sm:px-15 sm:py-7 ms:px-12 ms:py-7",
                activeEventsTab.tab === 2
                  ? "border-1 border-solid border-light-blue"
                  : "bg-blue-bgcomman border-none"
                // edit ? "pointer-events-none" : ""
              )}
            >
              Venue
            </div>
            <div
              onClick={() => {
                if (isEditable) {
                  setActiveEventsTab({ tab: 2, isVirtual: true });
                  setlocation({ lat: null, lng: null });
                  formik.setFieldValue(`address`, "");
                  formik.setFieldValue(`venueName`, "");
                  formik.setFieldValue(`country`, "");
                  formik.setFieldValue(`state`, "");
                  formik.setFieldValue(`postalCode`, "");
                  formik.setFieldValue(`city`, "");
                  formik.setFieldValue("searchLocation", "");
                  formik.setFieldValue("isVirtual", true);
                }
              }}
              className={classNames(
                "text-black flex gap-10 items-center justify-center rounded-5 text-base  whitespace-nowrap  px-12 py-3 w-full cursor-pointer xxl:px-44 xxl:py-7 xl:px-44 xl:py-7 lg:px-44 lg:py-7 md:px-20 md:py-7 sm:px-15 sm:py-7 ms:px-12 ms:py-7",
                activeEventsTab.tab === 2
                  ? "bg-blue-bgcomman border-none"
                  : "border-1 border-solid border-light-blue"
                // edit ? "pointer-events-none" : ""
              )}
            >
              Online events
            </div>
          </div>
          <div>
            {activeEventsTab.tab === 2 && (
              <div className="flex flex-col">
                <p className="font-400 text-base text-black leading-1">Link</p>
                <InputField
                  id="connectionDetails"
                  name="connectionDetails"
                  type="text"
                  placeholder="Please enter URL"
                  disabled={!isEditable}
                  componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 gap-20 px-10 py-6 mt-1 border-0.5 disabled:cursor-not-allowed focus-within:border-sky-500"
                  inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-5"
                />
              </div>
            )}
            {activeEventsTab.tab === 1 && (
              <div className="">
                {!location.lat && !location.lng && (
                  <>
                    <div
                      className={`flex items-center gap-[10px] py-3 border-0.5 rounded-5 px-10 ${
                        formik.errors.searchLocation &&
                        formik.touched.searchLocation
                          ? "border-red-600"
                          : "border-0.5"
                      }  `}
                    >
                      <Image
                        src={inputSearch}
                        height={15}
                        width={15}
                        alt="none"
                      />
                      <ReactGoogleAutocomplete
                        id="searchLocation"
                        name="searchLocation"
                        apiKey={process.env.NEXT_PUBLIC_ApiKey}
                        options={{
                          types: ["geocode", "establishment"],
                          componentRestrictions: { country: "my" },
                        }}
                        placeholder="Search Venue"
                        className="outline-none w-full disabled:cursor-not-allowed focus-within:border-sky-500"
                        onPlaceSelected={handleselect}
                        disabled={edit}
                      />
                    </div>
                    <div>
                      {typeof formik.errors.searchLocation === "string" &&
                        formik.errors.searchLocation &&
                        formik.touched.searchLocation && (
                          <div className="error">
                            <p className="text-sm text-red-600">
                              {JSON.stringify(
                                formik.errors.searchLocation
                              ).replace(/"/g, "")}
                            </p>
                          </div>
                        )}
                    </div>
                  </>
                )}
                {/* <InputField
                  id="searchLocation"
                  name="searchLocation"
                  type="text"
                  placeholder="Search Venue"
                  ref={ref}
                  startIcon={
                    <Image
                      src={inputSearch}
                      height={15}
                      width={15}
                      alt="none"
                    />
                  }
                  componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                  inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                /> */}
                {location.lat && location.lng && (
                  <div>
                    <div className="my-20">
                      <Map
                        zoom={7}
                        center={location}
                        mapContainerStyle={{
                          height: "400px",
                          width: "100%",
                        }}
                      >
                        <MarkerF position={location} />
                      </Map>
                    </div>
                    <div className="">
                      <p className="font-400 text-sm text-black">Venue name</p>
                      <InputField
                        id="venueName"
                        name="venueName"
                        type="text"
                        disabled={!isEditable}
                        placeholder="Venue name"
                        componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                        inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                      />
                    </div>
                    <div className="">
                      <div className="my-15">
                        <p className="font-800 font-bold text-base text-black">
                          Venue name
                        </p>
                      </div>
                      <div className="">
                        <p className="font-400 text-sm text-black">Address</p>
                        <InputField
                          id="address"
                          name="address"
                          type="text"
                          disabled={!isEditable}
                          placeholder="Address"
                          componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                          inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                        />
                      </div>
                      <div className="flex gap-10 my-10 flex-col ms:flex-col sm:flex-row">
                        <div>
                          <p className="font-400 text-sm text-black">City</p>
                          <InputField
                            id="city"
                            name="city"
                            type="text"
                            disabled={!isEditable}
                            placeholder="City"
                            componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                            inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                          />
                        </div>
                        <div>
                          <p className="font-400 text-sm text-black">State</p>
                          <InputField
                            id="state"
                            name="state"
                            type="text"
                            disabled={!isEditable}
                            placeholder="State"
                            componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                            inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                          />
                        </div>
                        <div>
                          <p className="font-400 text-sm text-black">
                            Postal code
                          </p>
                          <InputField
                            id="postalCode"
                            name="postalCode"
                            maxLength={6}
                            onChange={(e) =>
                              handleChange(e, formik.setFieldValue)
                            }
                            type="text"
                            disabled={!isEditable}
                            placeholder="Postal code"
                            componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                            inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-400 text-sm text-black">Country</p>
                        <InputField
                          id="country"
                          name="country"
                          type="text"
                          disabled={!isEditable}
                          placeholder="Country"
                          componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                          inputstyle="block w-full focus:outline-none disabled:cursor-not-allowed disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-15">
                      <CustomButtonWol
                        name="Clear"
                        id="Clear"
                        type="button"
                        disabled={!isEditable}
                        buttonStyle={`text-black px-44 flex gap-10 items-center justify-center rounded-5 text-base bg-blue-bgcomman border-none py-7 w-full max-w-85 disabled:bg-dark-blue disabled:cursor-not-allowed disabled:text-white`}
                        onClick={handleMap}
                      >
                        Clear
                      </CustomButtonWol>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;

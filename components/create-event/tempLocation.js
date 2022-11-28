import React, { useEffect } from "react";
import location_form from "../../assets/img/location_form.svg";
import inputSearch from "../../assets/img/input_search.svg";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import * as Yup from "yup";
import Image from "next/image";
import InputField from "../forms/InputField";
import CustomButton from "../forms/CustomButton";
import { Map } from "../../components/google/Map";
import classNames from "classnames";
import { MarkerF } from "@react-google-maps/api";

const Location = ({
  setSchema,
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
}) => {
  const handleselect = (e) => {
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
    {
      e.place_id
        ? setSchema(
            Yup.object().shape({
              ...CreateEventValidationSchema,
              location: Yup.string(),
            })
          )
        : setSchema(
            Yup.object().shape({
              ...CreateEventValidationSchema,
              location: Yup.string().when("isVirtual", {
                is: false,
                then: Yup.string().required(
                  "Please search your events location"
                ),
              }),
            })
          );
    }
    setShowMap(true);
  };

  const handleChange = (e, setFieldValue) => {
    const value = e.target.value.replace(/\D/g, "");
    setFieldValue(e.target.name, value);
  };

  const handleMap = () => {
    setShowMap(false);
    setlocation({ lat: null, lng: null });
    formik.setFieldValue(`address`, "");
    formik.setFieldValue(`venueName`, "");
    formik.setFieldValue(`country`, "");
    formik.setFieldValue(`state`, "");
    formik.setFieldValue(`postalCode`, "");
    formik.setFieldValue(`city`, "");
    formik.setFieldValue("searchLocation", "");
    formik.setFieldValue("isVirtual", false);
  };
  useEffect(() => {
    edit && isVirtual && setShowMap(true);
  }, []);

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
                setlocationOptions(false);
                formik.setFieldValue(`isVirtual`, false);
                formik.setValues({ ...formik.values, isVirtual: false });
              }}
              className={classNames(
                "text-black flex gap-10 items-center justify-center rounded-5 text-base px-12 py-3 w-full cursor-pointer xxl:px-44 xxl:py-7 xl:px-44 xl:py-7 lg:px-44 lg:py-7 md:px-20 md:py-7 sm:px-15 sm:py-7 ms:px-12 ms:py-7",
                locationOptions
                  ? "border-1 border-solid border-light-blue"
                  : "bg-blue-bgcomman border-none"
                // edit ? "pointer-events-none" : ""
              )}
            >
              Venue
            </div>
            <div
              onClick={() => {
                setlocationOptions(true);
                formik.setValues({ ...formik.values, isVirtual: true });
                formik.setFieldValue(`address`, "");
                formik.setFieldValue(`venueName`, "");
                formik.setFieldValue(`country`, "");
                formik.setFieldValue(`state`, "");
                formik.setFieldValue(`postalCode`, "");
                formik.setFieldValue(`city`, "");
                formik.setFieldValue("searchLocation", "");
                formik.setFieldValue(`isVirtual`, true);
              }}
              className={classNames(
                "text-black flex gap-10 items-center justify-center rounded-5 text-base  whitespace-nowrap  px-12 py-3 w-full cursor-pointer xxl:px-44 xxl:py-7 xl:px-44 xl:py-7 lg:px-44 lg:py-7 md:px-20 md:py-7 sm:px-15 sm:py-7 ms:px-12 ms:py-7",
                locationOptions
                  ? "bg-blue-bgcomman border-none"
                  : "border-1 border-solid border-light-blue"
                // edit ? "pointer-events-none" : ""
              )}
            >
              Online events
            </div>
          </div>
          <div>
            {locationOptions ? (
              <div className="flex flex-col">
                <p className="font-400 text-base text-black leading-1">Link</p>
                <InputField
                  id="connectionDetails"
                  name="connectionDetails"
                  type="text"
                  placeholder="Please enter URL"
                  disabled={edit}
                  componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 gap-20 px-10 py-6 mt-1 border-0.5 disabled:cursor-not-allowed focus-within:border-sky-500"
                  inputstyle="block w-full focus:outline-none disabled:text-brand-disabled placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent px-5"
                />
              </div>
            ) : (
              <div className="">
                <div
                  className={`flex items-center gap-[10px] py-3 border-0.5 rounded-5 px-10 ${
                    formik.errors.location && formik.touched.location
                      ? "border-red-600"
                      : "border-0.5"
                  }  `}
                >
                  <Image src={inputSearch} height={15} width={15} alt="none" />
                  <ReactGoogleAutocomplete
                    id="location"
                    name="location"
                    apiKey={process.env.NEXT_PUBLIC_ApiKey}
                    options={{
                      types: ["geocode", "establishment"],
                    }}
                    placeholder="Search Venue"
                    className="outline-none w-full disabled:cursor-not-allowed focus-within:border-sky-500"
                    onPlaceSelected={handleselect}
                    disabled={edit}
                  />
                </div>
                <div>
                  {typeof formik.errors.location === "string" &&
                    formik.errors.location &&
                    formik.touched.location && (
                      <div className="error">
                        <p className="text-sm text-red-600">
                          {JSON.stringify(formik.errors.location).replace(
                            /"/g,
                            ""
                          )}
                        </p>
                      </div>
                    )}
                </div>
                {showMap && (
                  <div>
                    <div className="my-20">
                      {location && (
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
                      )}
                    </div>
                    <div className="">
                      <p className="font-400 text-sm text-black">Venue name</p>
                      <InputField
                        id="venueName"
                        name="venueName"
                        type="text"
                        placeholder="Venue name"
                        componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                        inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
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
                          placeholder="Address"
                          componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                        />
                      </div>
                      <div className="flex gap-10 my-10 flex-col ms:flex-col sm:flex-row">
                        <div>
                          <p className="font-400 text-sm text-black">City</p>
                          <InputField
                            id="city"
                            name="city"
                            type="text"
                            placeholder="City"
                            componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                          />
                        </div>
                        <div>
                          <p className="font-400 text-sm text-black">State</p>
                          <InputField
                            id="state"
                            name="state"
                            type="text"
                            placeholder="State"
                            componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
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
                            placeholder="Postal code"
                            componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-400 text-sm text-black">Country</p>
                        <InputField
                          id="country"
                          name="country"
                          type="text"
                          placeholder="Country"
                          componentstyle="w-full sm:max-w-400 ms:max-w-300 lg:max-w-659 xl:max-w-659 px-10 gap-5 py-6 mt-1 border-0.5 focus-within:border-sky-500"
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-dropdownplaceholder placeholder:text-xs placeholder:font-normal placeholder:tracking-tight placeholder:bg-transparent"
                        />
                      </div>
                    </div>
                    <div className="mt-15">
                      <CustomButton
                        name="Clear"
                        id="Clear"
                        type="button"
                        buttonStyle={`text-black px-44 flex gap-10 items-center justify-center rounded-5 text-base bg-blue-bgcomman border-none py-7 w-full max-w-85`}
                        onClick={handleMap}
                      >
                        Clear
                      </CustomButton>
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

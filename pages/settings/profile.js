import React, { useEffect } from "react";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import Image from "next/image";

import inputSearch from "../../assets/img/input_search.svg";

import dropdownArrow from "../../assets/img/dropdownArrow.svg";
import userprofile from "../../assets/img/headerprofile.png";
import CustomButton from "../../components/forms/CustomButton";
import { Form, Formik } from "formik";
import InputField from "../../components/forms/InputField";
import closeIcon from "../../assets/img/closelineicon.svg";

import {
  locationvalidation,
  profilevalidation,
} from "../../utils/FormValidations";

import { FiSearch } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { HiChevronUpDown } from "react-icons/hi2";

import Select from "react-select";
import { HiMenu } from "react-icons/hi";
import makeAnimated from "react-select/animated";
import { useState } from "react";
import Link from "next/link";
import ProfileNavbar from "../../components/navabar/ProfileNavbar";
import {
  getAccessToken,
  getRole,
  lsitForDropdown,
  userSelectedData,
} from "../../utils/helper";

const animatedComponents = makeAnimated();
const options = [
  { value: "Educators", label: "Educators" },
  { value: "Auto", label: "Auto" },
  { value: "Air", label: "Air" },
];
import { Dialog } from "@headlessui/react";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserDataApi,
  changeUserLocation,
  upadeIntrestApi,
  userDetails,
  userImageUploadApi,
} from "../../Redux/settings/profileSlice";
import { Toaster } from "react-hot-toast";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";
import classNames from "classnames";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { CatagoryListDropdown } from "../../components/dropdown/CatagoryListDropdown";
import SelectTagCustom from "../../components/create-event-form/SelectTagCustom";
import { Oval } from "react-loader-spinner";
import { useRef } from "react";
import Multiselect from "multiselect-react-dropdown";

function Profile(props) {
  const refSelect = useRef();
  const [intrest, setIntrest] = useState([]);
  const [selected, setSelected] = useState();
  const listData = lsitForDropdown(props?.categoryList);
  const {
    isLoading,
    imageLoding,
    locationLoading,
    userImage,
    intrestLoading,
    userIntrest,
  } = useSelector((state) => ({
    // userimage: te.profileSlice.userimage,
    isLoading: state.profileSlice.isLoading,
    imageLoding: state.profileSlice.imageLoding,
    locationLoading: state.profileSlice.locationLoading,
    userImage: state.profileSlice.image,
    intrestLoading: state.profileSlice.intrestLoading,
    userIntrest: state.profileSlice.userIntrest,
  }));
  const [token, setToken] = useState();
  const user = useRef();
  const [location, setLocation] = useState();
  const dispatch = useDispatch();
  const [url, setUrl] = useState();
  const [role, setRole] = useState();
  const [userPhoto, setUserPhoto] = useState();
  const [show, setShow] = useState(false);
  const [showbutton, SetButton] = useState(false);

  const handleName = (e) => {
    if (
      e.firstName === localStorage.firstname &&
      e.lastName === localStorage.lastname
    ) {
      SetButton(false);
    } else {
      SetButton(true);
    }
  };
  const changgUserName = (values) => {
    dispatch(changeUserDataApi(values));
    localStorage.setItem("firstname", values.firstName);
    localStorage.setItem("lastname", values.lastName);
    SetButton(false);
  };
  const onImageChange = (e) => {
    setUserPhoto(URL?.createObjectURL(e.target.files[0]));
    setUrl(e.target.files[0]);
  };

  const handlePlaceSelect = (e) => {
    setLocation({
      city: e.address_components[0].long_name,
      country: e.address_components[2].long_name,
      state: e.address_components[1].long_name,
      placeId: e.place_id,
      latitude: e.geometry.location.lat(),
      longitude: e.geometry.location.lng(),
    });
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_ApiKey,
    onPlaceSelected: (e) => {
      setLocation({
        city: e.address_components[0].long_name,
        country: e.address_components[2].long_name,
        state: e.address_components[1].long_name,
        placeId: e.place_id,
        latitude: e.geometry.location.lat(),
        longitude: e.geometry.location.lng(),
      });
    },
    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "my" },
    },
  });

  const handleCategory = (e) => {
    // setSelected(e);
    console.log("ref", refSelect);
    const intrestdata = e.map((reduce) => {
      return reduce.id;
    });

    setIntrest(intrestdata);
  };
  const handleLocation = () => {
    setLocation();
    dispatch(changeUserLocation(location));
  };
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("avatar", values.avtar);
    dispatch(userImageUploadApi(formData));
    // localStorage.setItem("avatar", userPhoto);
    setUrl();
  };
  const { userData } = useSelector((state) => ({
    userData: state.loginSlice.userData,
  }));
  const showmore = () => {
    setShow(!show);
  };

  useEffect(() => {
    if (localStorage?.token) {
      setToken(getAccessToken());
      setRole(getRole());
      setUserPhoto(localStorage?.avatar);
    }
  }, []);

  useEffect(() => {}, [role, token, showbutton, userPhoto, intrest]);
  useEffect(() => {
    if (!userIntrest.length == intrest?.length) {
      const newIntrest = userSelectedData(listData, userIntrest);
      refSelect.current.state.selectedValues = newIntrest;
      setIntrest(newIntrest);
    }
    dispatch(userDetails());
  }, [userImage]);
  return (
    <div className="mx-auto max-w-2xl w-full  z-10 ">
      <div className="sticky top-0 z-50">
        <HeaderTransparentevent
          headerStyle="bg-bg-blue relative"
          textStyle="text-black"
        />
      </div>
      <div className=" pl-20 mt-10  sm:block md:hidden">
        <HiMenu onClick={showmore} size={24} />
      </div>

      {show && (
        <div className=" w-screen top-60 left-0 bg-[#00000050] h-full z-50  fixed ">
          <div className=" flex flex-col  bg-white  gap-10 p-20">
            <ProfileNavbar page="profile" padding="pl-10" />
            <div className="absolute right-20">
              <Image
                onClick={showmore}
                src={closeIcon}
                height={12}
                width={12}
                alt="blank"
              />
            </div>
          </div>
        </div>
      )}
      <div
        className={`mt-20 mx-20 sm:flex sm:gap-20    ${
          show && "h-screen overflow-hidden"
        }`}
      >
        <div className="flex gap-20 flex-col">
          <div className="hidden md:block">
            <ProfileNavbar
              page="profile"
              navbarStyle="lg:pt-44 lg:px-63 h-screen md:pt-44 md:px-40 bg-[#FAFAFA]"
            />
          </div>
        </div>

        <div className=" flex flex-col  gap-26 max-w-681  w-full ">
          <div className="flex flex-col gap-12 border border-border-white  py-10 px-10  items-center">
            <div className=" self-start">
              <p className="font-medium text-22 leading-33 text-black">
                Update your profile
              </p>
            </div>
            <Formik
              initialValues={{
                avtar: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form
                  className="flex flex-col gap-30 items-center"
                  encType="multipart/form-data"
                >
                  <div className=" ">
                    <input
                      type="file"
                      onChange={(e) => {
                        onImageChange(e);
                        setFieldValue("avtar", e.currentTarget.files[0]);
                      }}
                      name="avtar"
                      className="filetype hidden"
                      id="profile"
                    />
                    {token && (
                      <label htmlFor="profile">
                        {localStorage?.avatar == "" && !userPhoto ? (
                          <div className=" h-80 w-80 rounded-[50%] whitespace-nowrap bg-[#E3FAFC] text-[#78D0F6]  text-[30px] flex justify-center items-center">
                            {localStorage?.firstname.charAt(0).toUpperCase()}
                            {localStorage?.lastname.charAt(0).toUpperCase()}
                          </div>
                        ) : !userImage == "" ? (
                          <Image
                            src={userPhoto ? userPhoto : userImage}
                            height={100}
                            width={100}
                            className="cursor-pointer rounded-full overflow-hidden"
                            alt="image not found"
                          />
                        ) : (
                          <Oval
                            color="black"
                            height={20}
                            width={20}
                            secondaryColor="#FAFAFA"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                          />
                        )}
                      </label>
                    )}
                  </div>

                  <div className="self-end">
                    <button
                      disabled={url ? false : true}
                      className={classNames(
                        "px-30 py-7 bg-bg-blue flex gap-10  disabled:bg-dark-blue text-black rounded-5 disabled:text-white",
                        imageLoding && " bg-dark-blue"
                      )}
                    >
                      <div className="flex gap-10">
                        {imageLoding && (
                          <Oval
                            color="#FFFFFF"
                            height={20}
                            width={20}
                            secondaryColor="#FAFAFA"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                          />
                        )}
                      </div>
                      Save Changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="border-2 border-border-white  max-w-681  w-full p-17 flex flex-col gap-26">
            <div className="font-medium text-22 leading-33 text-black">
              Profile Settings
            </div>
            {role && (
              <Formik
                initialValues={{
                  firstName: localStorage.firstname || "",
                  lastName: localStorage.lastname || "",
                }}
                validateOnBlur={false}
                validationSchema={profilevalidation}
                validateOnChange={false}
                onSubmit={changgUserName}
              >
                {({ setFieldValue, values }) => (
                  <Form
                    // onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-30 "
                  >
                    <div className="flex  sm:flex-col lg:flex-row ms:flex-col lg:gap-30 max-w-660">
                      <div className="w-full">
                        <label className="font-normal text-sm">
                          First Name
                        </label>
                        <InputField
                          name="firstName"
                          type="text"
                          placeholder=""
                          componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                          onChange={(e) => {
                            setFieldValue("firstName", e.target.value),
                              handleName({
                                ...values,
                                firstName: e.target.value,
                              });
                          }}
                          inputstyle=" focus:outline-none disabled:text-brand-disabled px-5"
                          // onChange={checkFirstName}
                        />
                      </div>
                      <div className="w-full">
                        <label className="font-normal text-sm">Last Name</label>
                        <InputField
                          name="lastName"
                          type="text"
                          placeholder=""
                          onChange={(e) => {
                            setFieldValue("lastName", e.target.value),
                              handleName({
                                ...values,
                                lastName: e.target.value,
                              });
                          }}
                          componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle=" focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        className={classNames(
                          "px-30 py-7 bg-bg-blue flex gap-10  disabled:bg-dark-blue text-black rounded-5  disabled:text-white items-center",
                          isLoading && "bg-dark-blue text-white"
                        )}
                        type="submit"
                        disabled={showbutton ? false : true}
                      >
                        {isLoading && (
                          <Oval
                            color="#FFFFFF"
                            height={20}
                            width={20}
                            secondaryColor="#FAFAFA"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                          />
                        )}
                        Save Changes
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
          <div className="border-2 border-border-white  max-w-681 p-17 flex flex-col gap-26">
            <div className="font-medium text-22 leading-33 text-black">
              My Interests
            </div>
            <div className="flex flex-col gap-7">
              <span>My Preferences</span>
              <div className="w-314">
                {/* <CatagoryListDropdown
                  data={props.categoryList}
                  selected={selected}
                  placeholder="Pick One"
                  handleChange={handleCategory}
                /> */}
                <Multiselect
                  ref={refSelect}
                  displayValue="key"
                  groupBy="cat"
                  customCloseIcon={<IoCloseOutline />}
                  placeholder={intrest?.length > 0 ? "" : "Pick One"}
                  onRemove={handleCategory}
                  onSelect={handleCategory}
                  options={listData}
                  className="cursor-pointer"
                  customArrow={<HiChevronUpDown />}
                  showArrow
                  // customArrow=
                ></Multiselect>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="px-30 py-7 bg-bg-blue flex gap-10  disabled:bg-dark-blue text-black rounded-5 disabled:text-white"
                disabled={intrest?.length > 0 ? false : true}
                onClick={() => {
                  dispatch(upadeIntrestApi(intrest)), setIntrest();
                }}
              >
                {intrestLoading && (
                  <Oval
                    color="#FFFFFF"
                    height={20}
                    width={20}
                    secondaryColor="#FAFAFA"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                )}
                Save Changes
              </button>
            </div>
          </div>

          <div className="border-2 border-border-white  max-w-681 p-17 flex flex-col gap-26">
            <div className="font-medium text-22 leading-33 text-black">
              Location Settings
            </div>

            <Formik
              initialValues={{ location: "" }}
              validateOnBlur={false}
              validationSchema={locationvalidation}
              validateOnChange={false}
              onSubmit={handleLocation}
            >
              {(formik) => (
                <Form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-30 "
                >
                  <div className="flex gap-10 ">
                    <div className="w-314 border-0.5 border-eventcreate px-10 py-2">
                      <div className="flex gap-10">
                        <Image
                          src={inputSearch}
                          height={15}
                          width={15}
                          alt="none"
                        />

                        <input
                          ref={ref}
                          // defaultValue={location?.locationName || ""}
                          // style={{ width: "90%" }}
                          // defaultValue="Amsterdam"
                          placeholder="Search venue"
                          className="outline-none  lg:w-[203px] md:w-[265px] ms:w-[138px] text-18 "
                        />
                        {/* <ReactGoogleAutocomplete
                          apiKey={process.env.NEXT_PUBLIC_ApiKey}
                          options={{
                            types: ["geocode", "establishment"],
                          }}
                          // ref={inputElement}
                          onPlaceSelected={handlePlaceSelect}
                          className="outline-none"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end ">
                    <button
                      className={classNames(
                        "px-30 py-7 bg-bg-blue flex gap-10 items-center disabled:bg-dark-blue text-black rounded-5 disabled:text-white "
                      )}
                      disabled={location?.city ? false : true}
                      onClick={handleLocation}
                    >
                      {locationLoading && (
                        <Oval
                          color="#FFFFFF"
                          height={20}
                          width={20}
                          secondaryColor="#FAFAFA"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      )}
                      Save Changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;
  if (token) {
    const apidata = await ApiMiddleware.get("/dropdown/categories");

    return {
      props: {
        categoryList: apidata?.data?.data,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default Profile;

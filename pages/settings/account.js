import React, { useEffect, useState } from "react";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import CustomButton from "../../components/forms/CustomButton";
import { Form, Formik } from "formik";
import InputField from "../../components/forms/InputField";
import {
  ForgotValidationSchema,
  changepassword,
} from "../../utils/FormValidations";
import closeIcon from "../../assets/img/closelineicon.svg";
import makeAnimated from "react-select/animated";
import Image from "next/image";
import Link from "next/link";
import ProfileNavbar from "../../components/navabar/ProfileNavbar";
import {
  getAccessToken,
  getlocalStorageData,
  getRole,
} from "../../utils/helper";
import { HiMenu } from "react-icons/hi";
import Footer from "../../components/footer/Footer";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { changePasswordApi } from "../../Redux/settings/profileSlice";
import Cookies from "js-cookie";
const Account = () => {
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  const [show, setShow] = useState(false);
  const [localStorageData, setlocalStorageData] = useState();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => ({
    isLoading: state.profileSlice.isLoading,
  }));
  const showmore = () => {
    setShow(!show);
  };

  useEffect(() => {
    const role = getAccessToken();
    if (!token) {
      setToken(getAccessToken());
    }
  }, []);
  return (
    <>
      {token && (
        <div className="mx-auto max-w-2xl w-full">
          <div className="sticky top-0 z-50">
            <HeaderTransparentevent
              headerStyle="bg-bg-blue relative"
              textStyle="text-black"
            />
            <Toaster />
          </div>
          <div className=" pl-20 mt-10  md:hidden ">
            <div onClick={showmore}>
              <HiMenu size={24} />
            </div>
          </div>
          {show && (
            <div className=" w-screen top-60 left-0 bg-[#00000050] h-full z-50  fixed ">
              <div className=" flex flex-col  bg-white p-20  gap-10 ">
                <ProfileNavbar page="account" padding="pl-10" />
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
            className={classNames(
              "mt-20 sm:ml-20 sm:flex sm:gap-20  ms:mx-20 ",
              show && "h-screen"
            )}
          >
            <div className="hidden md:block">
              <ProfileNavbar
                page="account"
                navbarStyle="lg:pt-44 lg:px-63 h-screen md:pt-44 md:px-40 bg-[#FAFAFA]"
              />
            </div>
            <div className=" flex flex-col gap-26 w-full">
              <div className="border-2 border-border-white max-w-681  w-full p-17 flex flex-col gap-26">
                <div className="font-medium text-22 leading-33 text-black">
                  {/* General Account Settings
                   */}
                </div>
                <Formik
                  initialValues={{ email: localStorage?.email || "" }}
                  validateOnBlur={false}
                  validationSchema={ForgotValidationSchema}
                  validateOnChange={false}
                >
                  {(formik) => (
                    <Form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-30  w-full "
                    >
                      <div className="flex flex-col gap-3 max-w-540 w-full">
                        <label className="font-normal text-sm">Email</label>
                        <InputField
                          name="email"
                          type="email"
                          placeholder=""
                          componentstyle="py-7 border-0.5 border-eventcreate w-full max-w-514"
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                      <div className="flex justify-end">
                        <CustomButton
                          buttonStyle="px-30 py-7 bg-bg-blue"
                          color="text-black"
                          type="submit"
                        >
                          Save Changes
                        </CustomButton>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="border-2 border-border-white max-w-681  w-full p-17 flex flex-col gap-26">
                <div className="font-medium text-22 leading-33 text-black">
                  Change Password
                </div>
                <Formik
                  initialValues={{
                    oldpassword: "",
                    newpassword: "",
                    confirmpassword: "",
                  }}
                  validateOnBlur={false}
                  validationSchema={changepassword}
                  validateOnChange={false}
                  onSubmit={(values) => {
                    dispatch(changePasswordApi(values));
                  }}
                >
                  {(formik) => (
                    <Form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-30 "
                    >
                      <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                        <div className="flex flex-col gap-3">
                          <label className="font-normal text-sm">
                            Current Password
                          </label>
                          <InputField
                            name="oldpassword"
                            type="password"
                            placeholder=""
                            componentstyle="py-7 border-0.5 border-eventcreate lg:w-314 flex-none pr-10 pl-5"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                          />
                        </div>
                      </div>
                      <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                        <div className="flex flex-col gap-3">
                          <label> New Password</label>
                          <InputField
                            name="newpassword"
                            type="password"
                            placeholder=""
                            componentstyle="py-7 border-0.5 border-eventcreate lg:w-314 flex-none pl-5 pr-10"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <label>Confirm new Password</label>
                          <InputField
                            name="confirmpassword"
                            type="password"
                            placeholder=""
                            componentstyle="py-7 border-0.5 border-eventcreate lg:w-314 flex-none pl-5 pr-10"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <CustomButton
                          buttonStyle="px-30 py-7 bg-bg-blue flex gap-5  disabled:bg-dark-blue disabled:text-white flex item-center"
                          color="text-black"
                          type="submit"
                          disabled={isLoading}
                        >
                          Save Changes
                        </CustomButton>
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
      )}
    </>
  );
};
export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;
  if (token) {
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

export default Account;

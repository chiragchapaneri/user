import React from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/forms/CustomButton";
import { FiLock } from "react-icons/fi";
import { Formik, Form } from "formik";
import { ResetValidationSchema } from "../../utils/FormValidations";
import { resetFetchAPi } from "../../Redux/auth/resetSlice";
import { useDispatch } from "react-redux";

import axios from "axios";
function Reset(props) {
  const dispatch = useDispatch();
  return (
    <AuthLayout
      changeDesign="true"
      page="reset password"
      linkPath="/auth/register"
      link="Signup"
      linkContent="Don't have an account?"
      pageTitle="Reset Your Password"
    >
      <Formik
        initialValues={{ password: "", cpassword: "" }}
        validationSchema={ResetValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          dispatch(resetFetchAPi({ token: props.token, ...values }));
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-30 justify-center items-center w-full mx-auto"
          >
            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="New Password"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
              componentstyle=" px-20 sm:w-400 ms:w-300 gap-20 py-15 border-1 border-solid border-black"
              starticon={<FiLock size={17} />}
            />
            <InputField
              id="password"
              name="cpassword"
              type="password"
              placeholder="Confirm Password"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
              componentstyle=" px-20 sm:w-400 ms:w-300 gap-20 py-15 border-1 border-solid border-black"
              starticon={<FiLock size={17} />}
            />
            <CustomButton
              type="submit"
              buttonStyle="px-4 flex gap-10 items-center justify-center  rounded-5   text-base bg-blue-dark disabled:bg-dark-blue text-white py-11 w-full bg-blue-dark bg-blue-dark"
            >
              Change password
            </CustomButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  if (query.token) {
    try {
      await axios.post("https://virulapi.infynno.com/auth/verify", {
        token: query.token,
      });
    } catch (er) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: { token: query.token },
  };
}

export default Reset;

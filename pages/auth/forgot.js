import React from "react";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/forms/CustomButton";
import { FiMail } from "react-icons/fi";
import AuthLayout from "../../components/layout/AuthLayout";
import { Form, Formik } from "formik";
import { ForgotValidationSchema } from "../../utils/FormValidations";
import { forgotFetchAPi } from "../../Redux/auth/forgotSlice";
import { useDispatch } from "react-redux";

const Forgot = () => {
  const dispatch = useDispatch();
  return (
    <AuthLayout
      changeDesign="true"
      page="forgot password"
      linkPath="/auth/register"
      link="Signup"
      linkContent="Don't have an account?"
      pageTitle=" Forgot your password?"
      showLink="true"
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={ForgotValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          dispatch(forgotFetchAPi(values));
        }}
      >
        {(formik) => (
          <Form className="flex flex-col gap-30 justify-center items-center w-full mx-auto">
            <InputField
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              componentstyle="px-20  sm:w-400 ms:w-300 gap-20 py-15 border-1 border-solid border-black"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
              starticon={<FiMail />}
            />
            <CustomButton
              type="submit"
              width="sm:w-400 ms:w-300"
              buttonStyle=" text-white px-4 flex gap-10 items-center text-white justify-center  rounded-5   text-base bg-blue-dark disabled:bg-dark-blue  py-11 w-full bg-blue-dark"
            >
              Send password reset link
            </CustomButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Forgot;

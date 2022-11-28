import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/forms/CustomButton";
import AuthLayout from "../../components/layout/AuthLayout";
import { RegisterValidationSchema } from "../../utils/FormValidations";
import { useSelector } from "react-redux";
import { registerFetchAPi } from "../../Redux/auth/registerSlice";

const Register = () => {
  const { isLoading } = useSelector((state) => ({
    isLoading: state.registerSlice.isLoading,
  }));
  const dispatch = useDispatch();
  return (
    <AuthLayout
      showLink="true"
      pageTitle="Sign Up"
      page="Sign Up"
      linkPath="/auth/login"
      linkContent="Already have an account?"
      link="Sign In"
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validationSchema={RegisterValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          dispatch(registerFetchAPi(values));
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-30 justify-center items-center w-full mx-auto"
          >
            <div className="flex justify-between w-full ms:flex-col ms:gap-30">
              <InputField
                id="firstName"
                name="firstName"
                type="firstName"
                placeholder="First Name"
                inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
                componentstyle="px-20 gap-3 sm:w-190 ms:w-300 py-15 border-1 border-solid border-black"
                starticon={<FaRegUser size={15} />}
              />

              <InputField
                id="lastName"
                name="lastName"
                type="lastName"
                placeholder="Last Name"
                inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
                componentstyle="px-20 gap-3 sm:w-190 ms:w-300 py-15 border-1 border-solid border-black"
                starticon={<FaRegUser size={15} />}
              />
            </div>
            <InputField
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
              componentstyle="px-20 sm:w-400 ms:w-300 py-15 border-1 gap-20 border-1 border-solid border-black"
              starticon={<FiMail size={17} />}
            />

            <InputField
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
              componentstyle="px-20 sm:w-400 ms:w-300 py-15 border-1 gap-20 border-1 border-solid border-black"
              starticon={<FiLock size={17} />}
            />

            <CustomButton
              type="submit"
              disabled={isLoading}
              buttonStyle="px-4 flex gap-10 items-center justify-center  rounded-5   text-base bg-blue-dark disabled:bg-dark-blue text-white py-11 w-full bg-blue-dark"
            >
              Register
            </CustomButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;

import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FiLock, FiMail } from "react-icons/fi";
import InputField from "../../components/forms/InputField";
import CustomButton from "../../components/forms/CustomButton";
import { LoginValidationSchema } from "../../utils/FormValidations";
import { loginFetchAPi } from "../../Redux/auth/loginSlice";
import Link from "next/link";
import AuthLayout from "../../components/layout/AuthLayout";

const Login = () => {
  const { isLoading, allData } = useSelector((state) => ({
    isLoading: state.loginSlice.isLoading,
    allData: state.loginSlice.allData,
  }));
  const dispatch = useDispatch();

  return (
    <AuthLayout
      page="Login"
      linkPath="/auth/register"
      link="Signup"
      showLink="true"
      linkContent="Don't have an account?"
      pageTitle="Login"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          dispatch(loginFetchAPi(values));
        }}
      >
        {(formik) => (
          <Form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-30 justify-center items-center mx-auto"
          >
            <InputField
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              componentstyle="px-20 sm:w-400 ms:w-300 gap-20 py-15 border-1 border-solid border-black"
              inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 placeholder:placeholder-black"
              starticon={<FiMail />}
            />
            <div className="relative">
              <InputField
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 w-356 placeholder:placeholder-black"
                componentstyle="px-20 sm:w-400 ms:w-300 gap-20 py-15 border-1 border-solid border-black"
                starticon={<FiLock size={17} />}
              />
              <Link href="/auth/forgot">
                <a className="text-black cursor-pointer pl-3 absolute flex justify-end right-0">
                  Forgot Password?
                </a>
              </Link>
            </div>
            <CustomButton
              disabled={isLoading}
              type="submit"
              buttonStyle="text-white px-4 flex gap-10 items-center justify-center rounded-5 text-base disabled:bg-dark-blue py-11 w-full bg-blue-dark"
            >
              Login
            </CustomButton>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;

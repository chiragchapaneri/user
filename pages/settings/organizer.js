import React, { useEffect } from 'react';
import HeaderTransparentevent from '../../components/header/HeaderTransparentevent';
import Image from 'next/image';
import CustomButton from '../../components/forms/CustomButton';
import { Form, Formik } from 'formik';
import InputField from '../../components/forms/InputField';
import closeIcon from '../../assets/img/closelineicon.svg';
import {
  addressvalidation,
  organizervalidation,
  personvalidation,
} from '../../utils/FormValidations';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import TextEditor from '../../components/tetxt-editor/TextEditor';
import CustomTexeEditor from '../../components/tetxt-editor/TextEditor';
import ProfileNavbar from '../../components/navabar/ProfileNavbar';
import Footer from '../../components/footer/Footer';

const Organizer = () => {
  const [organizer, setOrganizer] = useState();
  const [conditions, setConditions] = useState();
  const [policy, setPolicy] = useState();
  const [show, setShow] = useState(false);
  const showmore = () => {
    setShow(!show);
  };

  setPolicy;
  useEffect(() => {}, [organizer, conditions, policy]);
  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-0 z-50">
        <HeaderTransparentevent
          headerStyle="bg-bg-blue relative"
          textStyle="text-black"
          login="true"
        />
      </div>
      <div className=" pl-20 mt-10  sm:block lg:hidden">
        <div onClick={showmore}>
          <HiMenu size={24} />
        </div>
      </div>
      {show && (
        <div className=" w-screen top-60 left-0 bg-[#00000050] h-full z-50  fixed ">
          <div className=" flex flex-col  bg-white gap-10 p-20">
            <ProfileNavbar page="organizer" padding="pl-10" />
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
        className={`mt-20 sm:ml-20 sm:flex sm:gap-20  ms:mx-20  ${
          show && 'h-screen'
        }`}
      >
        <div className="hidden lg:block">
          <ProfileNavbar
            page="organizer"
            navbarStyle="lg:pt-44 lg:px-63 h-screen  md:pt-44 md:px-40 bg-[#FAFAFA]"
          />
        </div>
        <div>
          <div className=" flex flex-col gap-26  max-w-681  w-full">
            <div className="border-2 border-border-white  p-17 flex flex-col gap-26">
              <div className="font-medium text-22 leading-33 text-black">
                Organizer
              </div>
              <Formik
                initialValues={{
                  description: '',
                  organizername: '',
                  events: '',
                }}
                validateOnBlur={false}
                validationSchema={organizervalidation}
                validateOnChange={false}
                onSubmit={(values) => {}}
              >
                {(formik) => (
                  <Form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-30 "
                  >
                    <div className="flex flex-col gap-10">
                      <label className="font-normal text-sm ">
                        Organizer Name
                      </label>
                      <InputField
                        name="organizername"
                        type="text"
                        placeholder=""
                        componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                        inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                      />
                    </div>
                    <div className="flex flex-col gap-10">
                      <label className="font-normal text-sm">Event Types</label>
                      <InputField
                        name="events"
                        type="text"
                        placeholder=""
                        componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                        inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                      />
                    </div>
                    <TextEditor height={134} changeData={setOrganizer} />
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
            <div className="border-2 border-border-white max-w-896 p-17 flex flex-col gap-26">
              <div className="font-medium text-22 leading-33 text-black">
                Organizer Address
              </div>
              <Formik
                initialValues={{
                  addressline1: '',
                  country: '',
                  state: '',
                  city: '',
                  areacode: '',
                }}
                validateOnBlur={false}
                validationSchema={addressvalidation}
                validateOnChange={false}
                onSubmit={(values) => {}}
              >
                {(formik) => (
                  <Form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-30 "
                  >
                    <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Address Line 1
                        </label>
                        <InputField
                          name="addressline1"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Address Line 2
                        </label>
                        <InputField
                          name="addressline2"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                    </div>
                    <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm"> Country</label>
                        <InputField
                          name="country"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">State</label>
                        <InputField
                          name="state"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                    </div>
                    <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">City</label>
                        <InputField
                          name="city"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">Area</label>
                        <InputField
                          name="area"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                    </div>
                    <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                      <div>
                        <label className="font-normal text-sm">Area Code</label>
                        <InputField
                          name="city"
                          type="text"
                          placeholder=""
                          componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
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
            <div className=" flex flex-col gap-26">
              <div className="border-2 border-border-white max-w-896 p-17 flex flex-col gap-26">
                <div className="font-medium text-22 leading-33 text-black">
                  Person Incharge Details
                </div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                  }}
                  validateOnBlur={false}
                  validationSchema={personvalidation}
                  validateOnChange={false}
                  onSubmit={(values) => {}}
                >
                  {(formik) => (
                    <Form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-30 "
                    >
                      <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col ">
                        <div className="flex flex-col gap-10">
                          <label className="font-normal text-sm">
                            Person Incharge Name
                          </label>
                          <InputField
                            name="name"
                            type="text"
                            placeholder=""
                            componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5 "
                          />
                        </div>
                        <div className="flex flex-col gap-10">
                          <label className="font-normal text-sm">
                            Person Incharge Contact
                          </label>
                          <InputField
                            name="number"
                            type="text"
                            placeholder=""
                            componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate px-3"
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                          />
                        </div>
                      </div>
                      <div className="flex gap-10 sm:flex-col lg:flex-row ms:flex-col">
                        <div className="flex flex-col gap-10">
                          <label className="font-normal text-sm">
                            Person Incharge Email
                          </label>
                          <InputField
                            name="email"
                            type="text"
                            placeholder=""
                            componentstyle="lg:w-314 flex-none py-7 border-0.5 border-eventcreate "
                            inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                          />
                        </div>
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
            </div>
            <div className=" flex flex-col gap-26">
              <div className="border-2 border-border-white max-w-896 p-17 flex flex-col gap-26">
                <div className="font-medium text-22 leading-33 text-black">
                  Person Incharge Details
                </div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                  }}
                  validateOnBlur={false}
                  validationSchema={personvalidation}
                  validateOnChange={false}
                  onSubmit={(values) => {}}
                >
                  {(formik) => (
                    <Form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-30 "
                    >
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Terms & ConditionsL
                        </label>
                        <CustomTexeEditor
                          height={130}
                          changeData={setConditions}
                        />
                      </div>
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Privacy Policy
                        </label>
                        <CustomTexeEditor height={130} changeData={setPolicy} />
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
            </div>
            <div className=" flex flex-col gap-26">
              <div className="border-2 border-border-white max-w-896 p-17 flex flex-col gap-26">
                <div className="font-medium text-22 leading-33 text-black">
                  Display your social channels
                </div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                  }}
                  validateOnBlur={false}
                  validationSchema={personvalidation}
                  validateOnChange={false}
                  onSubmit={(values) => {}}
                >
                  {(formik) => (
                    <Form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-30 "
                    >
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Website URL
                        </label>
                        <InputField
                          name="name"
                          type="text"
                          placeholder=""
                          componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>

                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Facebook URL
                        </label>
                        <InputField
                          name="name"
                          type="text"
                          placeholder=""
                          componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Twitter URL
                        </label>
                        <InputField
                          name="name"
                          type="text"
                          placeholder=""
                          componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
                          inputstyle="block w-full focus:outline-none disabled:text-brand-disabled px-5"
                        />
                      </div>
                      <div className="flex flex-col gap-10">
                        <label className="font-normal text-sm">
                          Instagram URL
                        </label>
                        <InputField
                          name="name"
                          type="text"
                          placeholder=""
                          componentstyle=" flex-none py-7 border-0.5 border-eventcreate "
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
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};
export default Organizer;

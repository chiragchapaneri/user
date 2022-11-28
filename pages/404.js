import Image from "next/image";
import Link from "next/link";
import React from "react";
import Footer from "../components/footer/Footer";
import CustomButton from "../components/forms/CustomButton";
import HeaderTransparentevent from "../components/header/HeaderTransparentevent";
import notfound from "../assets/img/404.png";

const notFound = () => {
  return (
    <div>
      <div className="bg-bg-blue ">
        <HeaderTransparentevent
          headerStyle="bg-bg-blue relative"
          textStyle="text-black"
        />
      </div>
      <div className="ms:flex ms:flex-col-reverse ms:justify-center ms:items-center ms:gap-40 sm:flex sm:flex-col-reverse sm:justify-center sm:items-center sm:gap-40 md:flex md:gap-80 md:flex-row pt-145 pb-50 mx-auto justify-center p-20">
        <div className="flex flex-col gap-20">
          <div className="ms:text-center sm:text-center md:text-left text-32 font-black">
            Something is not right...
          </div>
          <div className="ms:text-center sm:text-center md:text-left text-[#868e96] text-20 md:max-w-400">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL.
          </div>
          <div>
            <Link href="/">
              <a>
                <CustomButton buttonStyle="h-40 lg:h-35 border-none md:border-solid md:border-2 border-light-blue md:text-14 lg:text-base font-medium rounded-5 sm:w-full ms:w-full md:max-w-[220px] box-border backdrop-blur-42  bg-bg-blue">
                  Get back to home page
                </CustomButton>
              </a>
            </Link>
          </div>
        </div>
        <div>
          <Image src={notfound} height={250} width={400} alt="blank" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default notFound;

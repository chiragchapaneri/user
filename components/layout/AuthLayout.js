import React from "react";
import facebook from "../../assets/img/facebook.png";
import instagram from "../../assets/img/instagram.png";
import linkedin from "../../assets/img/linkedin.png";
import twitter from "../../assets/img/twitter.png";
import title from "../../assets/img/title.png";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

const AuthLayout = ({
  pageTitle,
  children,
  showLink,
  link,
  linkPath,
  linkContent,
  changeDesign,
  page,
}) => {
  return (
    <div className="h-full min-h-screen w-auto bg-auth-background-img bg-no-repeat bg-cover">
      <div
        className={classNames(
          "max-w-2xl mx-auto sm:flex sm:justify-center lg:flex-none lg:block font-poppins relative",
          changeDesign ? "sm:py-45" : "sm:py-85"
        )}
      >
        <div
          className={classNames(
            "hidden shadow z-0 rounded-15 absolute mt-125  xxl:left-115 backdrop-blur-21 bg-blue-back-gradiant xl:left-90 xl:right-90 lg:inline-flex justify-end items-center xxl:max-w-1170 xl:max-w-1110 lg:left-60 lg:right-60 lg:min-w-904 lg:pr-50 lg:max-w-1010",
            changeDesign ? "h-390 xl:pr-115 xxl:pr-65" : "h-578 xl:pr-65"
          )}
        >
          <div className="lg:max-w-175 xl:max-w-240 xxl:max-w-296">
            <Image src={title} height={146} width={296} alt="not found" />
          </div>
        </div>
        <div
          className={classNames(
            "z-1 rounded-15 relative px-20 flex flex-col items-center bg-blue-gradient backdrop-blur-42 xxl:left-194 xl:left-145 xxl:w-700 lg:pt-99 sm:w-468 md:w-568 md:pt-20 md:gap-20 sm:gap-20 sm:pt-10 ms:rounded-none ms:gap-15 ms:pt-10 lg:left-115 lg:w-600",
            changeDesign ? "lg:gap-30 xl:w-600" : "lg:gap-45 xl:w-700"
          )}
        >
          <div className="flex flex-col items-center gap-35">
            <div className="flex flex-col items-center xxl:gap-40 md:gap-30 sm:gap-20 ms:gap-20">
              <div className="ms:block ms:w-170 md:w-170 md:h-100 sm:w-140 sm:h-70 lg:hidden mr-35">
                <Image src={title} height={146} width={296} alt="not found" />
              </div>
              <div className="flex flex-col items-center">
                <span
                  className={classNames(
                    "font-semibold text-2xl text-black-solid",
                    changeDesign && "hidden"
                  )}
                >
                  Welcome
                </span>
                <span
                  className={classNames(
                    "text-xl",
                    changeDesign ? "text-black" : "text-black-light"
                  )}
                >
                  {pageTitle}
                </span>
              </div>
              {children}
            </div>
            <div
              className={classNames(
                "flex items-center gap-17 ms:px-3 ms:w-300 sm:w-400",
                page == "verify" && "hidden"
              )}
            >
              <div className="w-full h-1 bg-black"></div>
              <span>Or</span>
              <div className="w-full h-1 bg-black"></div>
            </div>
            <div
              className={classNames(
                "flex flex-col justify-center items-center md:gap-20 ms:gap-18 sm:gap-18",
                changeDesign ? "lg:gap-20" : "lg:gap-32"
              )}
            >
              <span className="sm:text-16 sm:font-medium ms:text-base text-black">
                Connect with us on Social Media
              </span>
              <div className="flex items-center gap-16">
                <Image
                  src={facebook}
                  height={26}
                  width={26}
                  alt="not found"
                  className="icon-gradient"
                />
                <Image
                  src={twitter}
                  height={26}
                  width={26}
                  alt="not found"
                  className="icon-gradient"
                />
                <Image
                  src={instagram}
                  height={26}
                  width={26}
                  alt="not found"
                  className="icon-gradient"
                />
                <Image
                  src={linkedin}
                  height={26}
                  width={26}
                  alt="not found"
                  className="icon-gradient"
                />
              </div>
              <span
                className={classNames(
                  showLink
                    ? "text-base font-normal flex justify-center gap-2"
                    : "hidden"
                )}
              >
                {linkContent}
                <Link href={linkPath ? linkPath : ""}>
                  <a className="text-white cursor-pointer pl-3">{link}</a>
                </Link>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-8 py-15 border-t-0.4 w-full border-black-medium justify-center">
            <div className="flex justify-center">
              <span className="text-sm text-black font-normal">
                ©2022 Yadvrtta All Right Reserved
              </span>
            </div>
            <div className="flex justify-center gap-20">
              <span className="text-sm text-black font-normal">Privacy</span>
              <span className="text-sm text-black font-normal">Terms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;

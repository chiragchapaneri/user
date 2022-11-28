import React from "react";
import Image from "next/image";
import footerLogo from "../../assets/img/footer_logo.svg";
import fbLogo from "../../assets/img/footer_fb_logo.svg";
import linkdinLogo from "../../assets/img/footer_linkdin_logo.svg";
import twitterLogo from "../../assets/img/footer_twitter_logo.svg";
import instaLogo from "../../assets/img/footer_insta_logo.svg";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-bg-light-blue sm:px-20 px-20">
      <div className="lg:flex xxl:pr-56 justify-between lg:px-20">
        <div className="pt-20 sm:pt-20 md:pt-20">
          <div className=" xxl:pl-85 lg:pl-20">
            <Link href="/">
              <a>
                <Image src={footerLogo} height={104} width={198} alt="blank" />
              </a>
            </Link>
          </div>
          <div className="xxl:pl-109 lg:px-20 ">
            <div className="text-xs leading-6 sm:text-base sm:leading-27 md:text-18  font-light text-solid-blue sm:mt-10 md:mt-25 lg:max-w-468">
              Lorem Ipsum has been the industry&apos;s standard dummy text ever
              since the 1500s, when an unknown printer took a galley of type and
              scrambled.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-18 sm:flex sm:gap-30 lg:flex lg:flex-row lg:pt-99 sm:pt-30 pt-30  ">
          <div>
            <div className="text-18 leading-6 tracking-wide font-semibold text-solid-blue whitespace-nowrap">
              Customer Services
            </div>
            <div className="text-14 md:text-18 font-light leading-8 flex flex-col sm:pt-18 pt-10 text-solid-blue ">
              <Link href="/help" className="cursor-pointer">
                <a>
                  <span> Terms and Conditions</span>
                </a>
              </Link>
              {/* <Link href="/termsConditions" className="cursor-pointer"> */}
              <a>
                <span>Refund Policy</span>
              </a>
              {/* </Link> */}
              {/* <Link href="/termsConditions" className="cursor-pointer"> */}
              <a>
                <span>Privacy Policy and GDPR </span>
              </a>
              {/* </Link> */}
              {/* <Link href="/termsConditions" className="cursor-pointer"> */}
              <a>
                <span>Compliance</span>
              </a>
              {/* </Link> */}
            </div>
          </div>
          <div>
            <div className="text-18 leading-6 tracking-wide font-semibold text-solid-blue whitespace-nowrap">
              About Us
            </div>

            <Link href="/termsConditions" className="cursor-pointer">
              <div className="text-14 md:text-18 font-light leading-6 sm:pt-18 pt-10 text-solid-blue">
                <a href="blank"> Contacts</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-28  mt-30 lg:px-40 xxl:pl-127">
          <Link href="/">
            <a>
              <Image src={fbLogo} height={16} width={8.3} alt="blank" />
            </a>
          </Link>
          <Image src={linkdinLogo} height={16} width={16} alt="blank" />
          <Image src={twitterLogo} height={14.22} width={17.49} alt="blank" />
          <Image src={instaLogo} height={16} width={16} alt="blank" />
        </div>
      </div>
      <div className="w-full bg-grey mt-25 h-1 lg:mt-65 sm:mt-25 md:mt-34"></div>
      <div className="sm:flex sm:justify-between flex justify-center items-center text-xs leading-6 py-22 xxl:pl-94 lg:pl-20 sm:text-xs md:text-base  tracking-wide text-solid-blue">
        <div>© 2022 Yadvrtta All rights reserved.</div>
        <div className="sm:flex sm:gap-10 xxl:pr-116 lg:pr-20 hidden">
          <div> Terms of Service </div>
          <div>| </div>
          <div>Privacy Policy</div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

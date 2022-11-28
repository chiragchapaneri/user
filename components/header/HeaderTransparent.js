import React, { useState } from 'react';
import Image from 'next/image';
import headerLogo from '../../assets/img/header_logo.svg';
import Link from 'next/link';
import sidebarMenu from '../../assets/img/sidebarmenu.svg';
import closeIcon from '../../assets/img/closelineicon.svg';
import footerLogo from '../../assets/img/footer_logo.svg';
import CustomButton from '../forms/CustomButton';
import { useRouter } from 'next/router';

const HeaderTransparent = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const sidebar = () => {
    setShow(!show);
  };
  return (
    <navbar>
      <div className="absolute z-10 top-0 flex items-center w-full justify-between max-w-2xl pt-15 ms:px-20 md:px-20 lg:px-65 xxl:px-65 px-20">
        <div className="md:hidden">
          <Image
            onClick={sidebar}
            src={sidebarMenu}
            height={24}
            width={24}
            alt="blank"
          />
        </div>
        {show && (
          <div className="h-screen w-screen absolute top-0 left-0 bg-white z-99 ">
            <div className="flex justify-between px-10 py-10">
              <Link href="/">
                <a>
                  <Image src={footerLogo} height={60} width={120} alt="blank" />
                </a>
              </Link>
              <Image
                onClick={sidebar}
                src={closeIcon}
                height={10}
                width={10}
                alt="blank"
              />
            </div>
            <div className="h-1 max-w-full bg-gray mx-10 "></div>
            <div className="flex flex-col text-black text-14 font-normal px-30 py-20 gap-10">
              <Link href="#">
                <a>Find events</a>
              </Link>
              <Link href="#">
                <a>Help</a>
              </Link>
            </div>
          </div>
        )}
        <div className="items-center hidden md:block ">
          <Image
            src={headerLogo}
            height={104}
            width={198}
            alt="blank"
            onClick={() => {
              router.push('/');
            }}
          />
        </div>
        <div className="md:hidden">
          <Image
            src={headerLogo}
            height={60}
            width={150}
            alt="blank"
            className=""
          />
        </div>
        <div className="flex items-center gap-18 ">
          <div className="hidden text-white text-base font-medium md:flex md:gap-18">
            <Link href="#" className="">
              <a>Find events</a>
            </Link>
            <Link href="#" className="">
              <a>Help</a>
            </Link>
          </div>
          <Link href="/auth/login">
            <a>
              <CustomButton
                buttonStyle="text-white md:h-30 lg:h-35 border-none md:border-solid md:border-2 border-light-blue md:text-14 lg:text-base
                        font-medium rounded-5 lg:px-34 md:px-20 box-border backdrop-blur-42"
              >
                Log in
              </CustomButton>
            </a>
          </Link>
          <Link href="/auth/register">
            <a>
              <div className="hidden md:block">
                <CustomButton
                  buttonStyle="hidden md:block md:h-30 lg:h-35 text-solid-blue md:text-14 lg:text-base leading-6 font-medium rounded-5 
                            lg:px-26 md:px-16 box-border backdrop-blur-42 bg-blue-bgcomman"
                >
                  Sign Up
                </CustomButton>
              </div>
            </a>
          </Link>
        </div>
      </div>
    </navbar>
  );
};
export default HeaderTransparent;

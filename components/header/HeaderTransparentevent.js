import React, { useState, Fragment } from "react";
import Image from "next/image";
import headerLogo from "../../assets/img/header_logo.svg";
import Link from "next/link";
import sidebarmenu from "../../assets/img/sidebarmenu.svg";
import closelineIcon from "../../assets/img/closelineicon.svg";
import footerLogo from "../../assets/img/footer_logo.svg";
import { BiSearch, BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import profileimage from "../../assets/img/headerprofile.png";
import { Menu, Transition } from "@headlessui/react";
import { useEffect } from "react";
import { getAccessToken, getRole } from "../../utils/helper";
import { useRouter } from "next/router";
import classNames from "classnames";
import Cookies from "js-cookie";
import { LogoutModal } from "../modal/LogoutModal";

const HeaderTransparentevent = (props) => {
  const [search, setSearch] = useState("");
  const { replace, push } = useRouter();
  const [token, setToken] = useState();
  const [show, setShow] = useState(false);
  const [searchOpen, setvSearchOpen] = useState(false);
  const [role, setRole] = useState();
  const [reset, setReset] = useState();
  const [dropdown, setDropdown] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("avatar");
    localStorage.removeItem("email");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    Cookies.remove("token");
    Cookies.remove("role");
    setShowLogoutModal(false);
    replace("/");
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const submit = () => {
    if (search) {
      push(`/event/search?search=${search}`);
    }
  };
  const showmore = () => {
    setShow(!show);
  };
  useEffect(() => {
    const role = getAccessToken();
    setToken(getAccessToken());
    setRole(getRole());
  }, [showLogoutModal]);

  return (
    <div
      className={classNames(
        "z-10 h-60 flex items-center w-full max-w-2xl xl:px-pl-20 sm:px-20 ms:px-10",
        router.route !== "/" ? "justify-between" : "justify-between",
        props.headerStyle,
        props.textStyle
      )}
    >
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        logout={logout}
      />

      <div className="lg:hidden sm:block cursor-pointer">
        <Image
          onClick={showmore}
          src={sidebarmenu}
          height={15}
          width={15}
          alt="blank"
        />
      </div>

      <div className="hidden lg:block lg:h-60 ">
        <Link href="/" className="cursor-pointer">
          <a>
            <Image src={headerLogo} height={60} width={100} alt="blank" />
          </a>
        </Link>
      </div>
      {show && (
        <div className="h-screen w-screen top-0 left-0 bg-white z-50 fixed ">
          <div className="flex justify-between px-10 py-10 relative">
            <a>
              <Image src={footerLogo} height={60} width={60} alt="blank" />
            </a>
            <div className="absolute top-31 right-26">
              <Image
                onClick={showmore}
                src={closelineIcon}
                height={15}
                width={15}
                alt="blank"
              />
            </div>
          </div>
          <div className="h-1 max-w-full bg-gray mx-10"></div>
          <div className="flex flex-col text-black text-sm font-normal px-30 py-20 gap-10">
            <Link href="/event/search">
              <a>Find events</a>
            </Link>

            {token && role === "ORGANIZATION" && (
              <>
                <Link href="/events/create">
                  <a>Host events</a>
                </Link>
                <Link href="/events/manage">
                  <a>Manage events</a>
                </Link>
              </>
            )}
            <Link href="/help">
              <a>Help</a>
            </Link>
          </div>
        </div>
      )}
      <div>
        {router.route !== "/" && (
          <div className="flex">
            <div
              className={classNames(
                "md:block lg:hidden xl:hidden ",
                searchOpen ? "hidden" : "block"
              )}
            >
              <Image
                src={headerLogo}
                height={60}
                width={150}
                alt="blank"
                className=""
                onClick={() => router.push("/")}
              />
            </div>
            <div
              className={classNames(
                "flex justify-between items-center ml-5 mr-10 cursor-pointer rounded-5 pl-5 lg:backdrop-blur-42 text-lg ms:text-10 md:text-base lg:text-22 xl:text-xl ms:w-212",
                searchOpen
                  ? "block md:flex lg:flex xl:flex"
                  : "hidden md:flex lg:flex xl:flex",
                !token && "md:hidden"
              )}
            >
              <div className="px-12 ms:px-6 bg-white flex py-4 items-center gap-2 w-[280px] rounded-l-5 ms:py-0 ">
                <BiSearch fill="#23C5FF" className="px-1 pt-1" size={20} />
                <input
                  className=" w-full outline-none md:text-14 md:leading-[26px] leading-27 text-lightgray font-light  sm:text-sm text-black placeholder:text-[15px] placeholder:leading-33 xxl:placeholder:text-base xxl:placeholder:leading-33 xl:placeholder:text-base xl:placeholder:leading-33 lg:placeholder:text-base lg:placeholder:leading-33 md:placeholder:text-base md:placeholder:leading-33 sm:placeholder:text-base sm:placeholder:leading-33 ms:placeholder:text-xs "
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search by events &#38; organizers"
                />
              </div>

              <div className="bg-blue-bgcomman flex gap-8 ms:gap-2 rounded-r-5 px-19 ms:px-5 sm:py-5 ms:pt-2 ms:pb-1 justify-center items-center">
                <p
                  className="font-400 font-poppins  text-xs xxl:text-base xl:text-base lg:text-base md:text-sm sm:text-xs sm:text-18  leading-24 text-black"
                  onClick={submit}
                >
                  Search
                </p>
                <BiRightArrowAlt fill="#FFFFFF" />
              </div>
            </div>
          </div>
        )}
      </div>
      {router.route === "/" && (
        <div className="flex gap-25">
          <div
            className={`flex items-center gap-14 ${
              token && role === "ORGANIZATION" ? "block" : "hidden"
            } `}
          >
            <div className="hidden text-white text-base leading-6 font-medium lg:flex md:gap-18">
              <Link href="/event/search">
                <a className={classNames("whitespace-nowrap", props.textStyle)}>
                  Find events
                </a>
              </Link>
              <Link href="/events/create">
                <a className={classNames("whitespace-nowrap", props.textStyle)}>
                  Host events
                </a>
              </Link>
              <Link href="/events/manage">
                <a className={classNames("whitespace-nowrap", props.textStyle)}>
                  Manage events
                </a>
              </Link>
              <Link href="/help">
                <a className={classNames(props.textStyle)}>Help</a>
              </Link>
            </div>
          </div>
          {!token && (
            <div className={"flex gap-10 items-center"}>
              <span
                className=" sm:text-sm lg:text-base leading-24 font-medium cursor-pointer sm:hidden lg:block ms:hidden"
                onClick={() => replace("/event/search")}
              >
                <Link href="/event/search">
                  <a>Find events</a>
                </Link>
              </span>
              <button
                className="text-white whitespace-nowrap sm:h-30 lg:h-35  border-solid border-2 border-eventbox-br md:text-sm lg:text-base leading-24 font-medium rounded-5 lg:px-34 sm:px-20 box-border backdrop-blur-42  ms:px-20"
                onClick={() => replace("/auth/login")}
              >
                Log in
              </button>

              <button
                className="  whitespace-nowrap sm:h-30 lg:h-35 text-darkblue border-eventbox-br sm:text-sm lg:text-base leading-24 font-medium rounded-5 lg:px-26 sm:px-16 box-border backdrop-blur-42 bg-blue-bgcomman ms:px-20 hidden md:block "
                onClick={() => replace("/auth/register")}
              >
                Sign up
              </button>
            </div>
          )}
          {token && (
            <div className="flex items-center gap-10">
              <div
                className={classNames(
                  "flex gap-10",
                  role == "ORGANIZATION" ? "hidden" : "block"
                )}
              >
                <span
                  className={`${props.textStyle} text-base leading-6 font-medium cursor-pointer sm:hidden ms:hidden lg:block`}
                  onClick={() => replace("/event/search")}
                >
                  Find Events
                </span>

                <span
                  className={`${props.textStyle} text-base leading-6 font-medium  cursor-pointer sm:hidden ms:hidden lg:block`}
                  onClick={() => replace("/help")}
                >
                  Help
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                {/* <div
                  onClick={() => setvSearchOpen(!searchOpen)}
                  className="sm:block ms:block  md:hidden ml-2"
                >
                  <div
                    className={classNames(
                      "rounded-full p-3 border-1 border-solid ",
                      searchOpen ? "hidden" : "block"
                    )}
                  >
                    <BiSearch fill="#FFFFFF" size={20} />
                  </div>
                </div> */}

                <Menu as="div" className="relative inline-block">
                  <div>
                    <Menu.Button
                      className="inline-flex w-full justify-center   rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center  gap-12"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      {localStorage?.avatar == "" ? (
                        <div className="h-[45px] w-[45px] flex items-center justify-center rounded-full overflow-hidden whitespace-nowrap bg-[#E3FAFC] text-[#78D0F6]">
                          {localStorage?.firstname.charAt(0).toUpperCase()}
                          {localStorage?.lastname.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <div className="rounded-[50%]">
                          <Image
                            src={
                              localStorage?.avatar
                                ? localStorage?.avatar
                                : headerLogo
                            }
                            width={44}
                            height={44}
                            alt="profile image not found"
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <span
                        className={classNames(
                          "whitespace-nowrap flex sm:hidden md:block ms:hidden text-base leading-6 font-medium",
                          props.textStyle
                        )}
                      >
                        {`${
                          localStorage?.firstname?.charAt(0).toUpperCase() +
                          localStorage?.firstname?.slice(1)
                        }
                 
                    
                    ${localStorage?.lastname?.charAt(0).toUpperCase()}`}
                      </span>
                      {dropdown ? (
                        <AiOutlineUp
                          className={`sm:hidden md:block ms:hidden pt-3 ${props.textStyle}`}
                        />
                      ) : (
                        <AiOutlineDown
                          className={`sm:hidden md:block ms:hidden pt-3 ${props.textStyle}`}
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-[9999] right-0 mt-2 w-200 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-15 py-15 w-200">
                        {role == "ADMIN" && (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                  active
                                    ? "bg-blue-bgcomman text-white"
                                    : "text-gray-900"
                                )}
                                onClick={() => replace("/admin")}
                              >
                                Admin Panel
                              </button>
                            )}
                          </Menu.Item>
                        )}
                        {role == "ORGANIZATION" && (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                    active
                                      ? "bg-blue-bgcomman text-white"
                                      : "text-gray-900"
                                  )}
                                  onClick={() => replace("/events/create")}
                                >
                                  Create Events
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                    active
                                      ? "bg-blue-bgcomman text-white"
                                      : "text-gray-900"
                                  )}
                                  onClick={() => replace("/events/manage")}
                                >
                                  Manage Events
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => replace("/event/bookmark")}
                            >
                              Bookmarked Events
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => replace("/booking")}
                            >
                              My Bookings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => replace("/settings/profile")}
                            >
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => setShowLogoutModal(true)}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          )}
        </div>
      )}
      {router.route !== "/" && (
        <div className="flex gap-25">
          <div
            className={`flex items-center gap-14 ${
              token && role === "ORGANIZATION" ? "block" : "hidden"
            } `}
          >
            <div className="hidden text-white text-base leading-6 font-medium lg:flex md:gap-18">
              <Link href="/event/search">
                <a className={classNames("whitespace-nowrap", props.textStyle)}>
                  Find events
                </a>
              </Link>
              <Link href="/events/create">
                <a className={classNames("whitespace-nowrap", props.textStyle)}>
                  Host events
                </a>
              </Link>
              <Link href="/events/manage">
                <a className={classNames("whitespace-nowrap", props.textStyle)}>
                  Manage events
                </a>
              </Link>
              <Link href="/help">
                <a className={classNames(props.textStyle)}>Help</a>
              </Link>
            </div>
          </div>
          {!token && (
            <div className={"flex gap-10 items-center"}>
              <span
                className=" sm:text-sm lg:text-base leading-24 font-medium cursor-pointer sm:hidden lg:block ms:hidden"
                onClick={() => replace("/event/search")}
              >
                Find Events
              </span>
              <button
                className="text-white whitespace-nowrap sm:h-30 lg:h-35  border-solid border-2 border-eventbox-br md:text-sm lg:text-base leading-24 font-medium rounded-5 lg:px-34 sm:px-20 box-border backdrop-blur-42  ms:px-20"
                onClick={() => replace("/auth/login")}
              >
                Log in
              </button>

              <button
                className="  whitespace-nowrap sm:h-30 lg:h-35 text-darkblue border-eventbox-br sm:text-sm lg:text-base leading-24 font-medium rounded-5 lg:px-26 sm:px-16 box-border backdrop-blur-42 bg-blue-bgcomman ms:px-20 hidden md:block "
                onClick={() => replace("/auth/register")}
              >
                Sign up
              </button>
            </div>
          )}
          {token && (
            <div className="flex items-center gap-10">
              <div
                className={classNames(
                  "flex gap-10",
                  role == "ORGANIZATION" ? "hidden" : "block"
                )}
              >
                <span
                  className={`${props.textStyle}  text-base leading-6 font-medium cursor-pointer sm:hidden ms:hidden lg:block`}
                  onClick={() => replace("/event/search")}
                >
                  Find Events
                </span>

                <span
                  className={`${props.textStyle} text-base leading-6 font-medium cursor-pointer sm:hidden ms:hidden lg:block`}
                  onClick={() => replace("/help")}
                >
                  Help
                </span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div
                  onClick={() => setvSearchOpen(!searchOpen)}
                  className="sm:block ms:block  md:hidden ml-2"
                >
                  <div
                    className={classNames(
                      "rounded-full p-3 border-1 border-solid ",
                      searchOpen ? "hidden" : "block"
                    )}
                  >
                    <BiSearch fill="#FFFFFF" size={20} />
                  </div>
                </div>

                <Menu as="div" className="relative inline-block">
                  <div>
                    <Menu.Button
                      className="inline-flex w-full justify-center   rounded-md bg-opacity-20 px-4 py-2 text-sm  text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 items-center  gap-12"
                      onClick={() => setDropdown(!dropdown)}
                    >
                      {localStorage?.avatar == "" ? (
                        <div className="h-[45px] w-[45px] flex items-center justify-center rounded-full whitespace-nowrap bg-[#E3FAFC] text-[#78D0F6]">
                          {localStorage?.firstname.charAt(0).toUpperCase()}
                          {localStorage?.lastname.charAt(0).toUpperCase()}
                        </div>
                      ) : (
                        <div className="rounded-[50%]">
                          <Image
                            src={
                              localStorage?.avatar
                                ? localStorage?.avatar
                                : headerLogo
                            }
                            width={44}
                            height={44}
                            alt="profile image not found"
                            className="rounded-full"
                          />
                        </div>
                      )}
                      <span
                        className={classNames(
                          "whitespace-nowrap flex sm:hidden md:block ms:hidden text-base leading-6 font-medium",
                          props.textStyle
                        )}
                      >
                        {`${
                          localStorage?.firstname?.charAt(0).toUpperCase() +
                          localStorage?.firstname?.slice(1)
                        } 
                    ${localStorage?.lastname?.charAt(0).toUpperCase()}`}
                      </span>
                      {dropdown ? (
                        <AiOutlineUp
                          className={`sm:hidden md:block ms:hidden pt-3 ${props.textStyle}`}
                        />
                      ) : (
                        <AiOutlineDown
                          className={`sm:hidden md:block ms:hidden pt-3 ${props.textStyle}`}
                        />
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-[9999] right-0 mt-2 w-200 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-15 py-15 w-200">
                        {role == "ADMIN" && (
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                  active
                                    ? "bg-blue-bgcomman text-white"
                                    : "text-gray-900"
                                )}
                                onClick={() => replace("/admin")}
                              >
                                Admin Panel
                              </button>
                            )}
                          </Menu.Item>
                        )}
                        {role == "ORGANIZATION" && (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                    active
                                      ? "bg-blue-bgcomman text-white"
                                      : "text-gray-900"
                                  )}
                                  onClick={() => replace("/events/create")}
                                >
                                  Create Events
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                    active
                                      ? "bg-blue-bgcomman text-white"
                                      : "text-gray-900"
                                  )}
                                  onClick={() => replace("/events/manage")}
                                >
                                  Manage Events
                                </button>
                              )}
                            </Menu.Item>
                          </>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => replace("/event/bookmark")}
                            >
                              Bookmarked Events
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => replace("/booking")}
                            >
                              My Bookings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => replace("/settings/profile")}
                            >
                              Settings
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                "group flex w-full items-center rounded-md px-5 py-5 text-sm",
                                active
                                  ? "bg-blue-bgcomman text-white"
                                  : "text-gray-900"
                              )}
                              onClick={() => setShowLogoutModal(true)}
                            >
                              Logout
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderTransparentevent;

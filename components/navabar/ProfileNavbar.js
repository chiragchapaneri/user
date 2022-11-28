import React from "react";
import Link from "next/link";
import { getAccessToken, getRole } from "../../utils/helper";
import { useState } from "react";
import { useEffect } from "react";
import classNames from "classnames";

const ProfileNavbar = ({ page, navbarStyle, padding }) => {
  const [role, setRole] = useState();
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(getAccessToken());
    setRole(getRole());
  }, [token]);
  return (
    <div
      className={classNames(
        "relative flex flex-col gap-4 bg-white pb-20",
        navbarStyle
      )}
    >
      <span className="py-2 px-7 cursor-pointer lg:text-30 font-semibold lg:leading-45 sm:text-28 sm:leading-29  ms:text-25">
        Settings
      </span>
      <div className={classNames("flex flex-col gap-15", padding)}>
        <Link href="/settings/account">
          <a
            className={classNames(
              "py-2 px-7 cursor-pointer lg:leading-30 lg:text-20 sm:text-base font-normal",
              page == "account" && " text-cmnblue"
            )}
          >
            Account
          </a>
        </Link>
        <Link href="/settings/profile">
          <a
            className={classNames(
              "py-2 px-7 cursor-pointer sm:leading-30 lg:text-20 sm:text-base font-normal",
              page == "profile" && " text-cmnblue"
            )}
          >
            Profile
          </a>
        </Link>
        {/* {role === 'ORGANIZATION' && (
          <>
            <Link href="/settings/bill">
              <a
                className={classNames(
                  'py-2 px-7 cursor-pointer sm:leading-30 lg:text-20 sm:text-base font-normal',
                  page == 'profile' && ' text-cmnblue'
                )}
              >
                Billing & Payments
              </a>
            </Link>

            <Link href="/settings/organizer">
              <a
                className={classNames(
                  'py-2 px-7 cursor-pointer sm:leading-30 lg:text-20 sm:text-base font-normal',
                  page == 'profile' && ' text-cmnblue'
                )}
              >
                Organizer
              </a>
            </Link>
          </>
        )} */}
      </div>
    </div>
  );
};
export default ProfileNavbar;

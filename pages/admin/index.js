import React, { useState } from "react";
import bookings from "../../assets/img/bookings.svg";
import CustomButton from "../../components/forms/CustomButton";
import { useRouter } from "next/router";

const Admin = () => {
  const router = useRouter();
  const button = [
    { name: "Organization", link: "/admin/organization" },
    { name: "Customers", link: "/admin/customers" },
    { name: "Events", link: "/admin/events" },
    { name: "Bookings", icon: bookings, link: "/admin/bookings" },
  ];

  return (
    <div className="h-100v h-screen w-screen p-16 bg-light-grey">
      <div className="bg-white h-full p-10">
        <div className="p-10 text-xl border-b-1 border-bordergrey">
          Dashboard
        </div>
        <div className="mt-40 flex gap-10 ">
          {button.map((tab, i) => {
            return (
              <CustomButton
                onClick={() => router.push(tab.link)}
                key={i}
                buttonStyle="text-20 hover:shadow-[0_0px_5px_0px] !text-bold-grey font-bold py-10 px-25 border-1 rounded-10 max-w-1/4 basis-1/4 text-left "
              >
                {tab.name}
              </CustomButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;
  if (token && role === "ADMIN") {
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { token: token },
  };
}

export default Admin;

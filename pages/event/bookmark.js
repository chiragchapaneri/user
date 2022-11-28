import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import Card from "../../components/homecard/Card";
import { eventForMeApi } from "../../Redux/bookmarked/eventForMe";
import ApiMiddleware from "../../utils/ApiMiddleware";

const Bookmark = (props) => {
  const dispatch = useDispatch();

  const { Bookmarkdata, bookid } = useSelector((state) => ({
    Bookmarkdata: state.eventForMeSlice.bookMarkedData,
    bookid: state.eventForMeSlice.bookid,
  }));

  useEffect(() => {
    !Bookmarkdata && dispatch(eventForMeApi());
  }, [Bookmarkdata]);
  return (
    <div className="relative mx-auto max-w-2xl w-full">
      <div className="sticky top-0 z-[100]">
        <HeaderTransparentevent
          headerStyle="bg-bg-blue absolute"
          textStyle="text-black"
        />
      </div>

      <div className="pt-[100px] flex flex-col gap-10 mx-30">
        <span className="text-32 font-bold">Bookmarks</span>
        <div className="flex justify-center items-center ">
          <div className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4">
            {Bookmarkdata?.map((data, index) => (
              <div key={index}>
                <Card data={data} index={index} bookMarkedEvents={bookid} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;
  if (token) {
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
export default Bookmark;

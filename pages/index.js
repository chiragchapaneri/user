import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import viewallAero from "../assets/img/viewall_aero.svg";
import Image from "next/image";
import Footer from "../components/footer/Footer";
import Card from "../components/homecard/Card";
import EventsCategory from "../components/explore_events_category/EventsCategory";
import Header from "../components/header/Header";
import ApiMiddleware from "../utils/ApiMiddleware";
import HeaderTransparentevent from "../components/header/HeaderTransparentevent";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Map, NewComponent } from "../components/google/Map";
import { eventForMeApi } from "../Redux/bookmarked/eventForMe";
import { AiOutlineArrowRight } from "react-icons/ai";
import "react-datepicker/dist/react-datepicker.css";
import { resetSearchData } from "../Redux/event/searchEvent";
import classNames from "classnames";
import { replace } from "formik";
import { checktoken } from "../components/checktoken";
import { getAccessToken } from "../utils/helper";
const Home = (props) => {
  const token = getAccessToken();
  const [bookMarkedEvents, setBookMarkdataEvents] = useState([]);
  const [showDatePicker, setshowDatepicker] = useState(false);
  const [trandingEvent, setTrandingEvent] = useState(props.trending);
  const [upComeingEvent, setUpComeing] = useState(props.upcoming);
  const [weekEndEvent, setWeekEndEvent] = useState(props.weekend);
  const dispatch = useDispatch();
  const router = useRouter();
  const { Bookmarkdata, bookid, serachData } = useSelector((state) => ({
    Bookmarkdata: state.eventForMeSlice.bookMarkedData,
    bookid: state.eventForMeSlice.bookid,
    serachData: state.searchEventSlice.serachData,
  }));

  useEffect(() => {
    if (token) {
      dispatch(eventForMeApi());
    }
    serachData?.length > 0 && dispatch(resetSearchData());
  }, []);

  return (
    <div className="max-w-2xl mx-auto font-poppins">
      <HeaderTransparentevent
        headerStyle="bg-transperent absolute"
        textStyle="text-white"
      />
      <Header
        showDatePicker={showDatePicker}
        setshowDatepicker={setshowDatepicker}
      />

      <div
        className={classNames(
          "w-full flex flex-col items-center px-20 gap-20",
          showDatePicker && "opacity-20"
        )}
      >
        <div className="mt-30 lg:mt-55 sm:mt-30 relative">
          <div className="flex justify-between items-center ">
            <div className="text-black  lg:text-32 text-20 leading-10 sm:text-20 sm:leading-10 md:text-28 md:leading-48 font-medium">
              Upcoming Events
            </div>
            {/* <a href="blank"> */}
            <div
              className="flex items-center justify-center gap-7 text-base leading-8 sm:text-base sm:leading-8  md:text-20 md:leading-8 font-normal text-black cursor-pointer"
              onClick={() => router.replace("/event/search")}
            >
              <div>View all</div>

              <AiOutlineArrowRight />
              {/* <Image src={viewallAero} width={14} height={14} alt="none" /> */}
            </div>
            {/* </a> */}
          </div>
          <div className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4 mt-10 ms:grid-cols-1">
            {upComeingEvent?.map((data, index) => (
              <div key={index + data.id}>
                <Card
                  heading="Upcoming Events"
                  showbutton={true}
                  data={data}
                  index={index}
                  bookMarkedEvents={bookid}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-30 lg:mt-55 sm:mt-30 relative">
          <div className="flex justify-between items-center ">
            <div className="text-black  lg:text-32 text-20 leading-10 sm:text-20 sm:leading-10 md:text-28 md:leading-48 font-medium">
              Events This Weekend
            </div>
          </div>
          <div
            className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4 ms:grid-cols-1"
            key={1}
          >
            {weekEndEvent?.map((data, index) => (
              <div key={index + data.id}>
                <Card data={data} index={index} bookMarkedEvents={bookid} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-30 lg:mt-55 sm:mt-30 relative">
          <div className="flex justify-between items-center ">
            <div className="text-black  lg:text-32 text-20 leading-10 sm:text-20 sm:leading-10 md:text-28 md:leading-48 font-medium">
              Trending Events
            </div>
          </div>
          <div
            className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4 ms:grid-cols-1"
            key={2}
          >
            {trandingEvent?.map((data, index) => (
              <div key={index + data.id}>
                <Card data={data} index={index} bookMarkedEvents={bookid} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-20">
        <EventsCategory />
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;

  const apidata = await Promise.all([
    ApiMiddleware.get("/event/upcoming?limit=8"),
    ApiMiddleware.get("/event/this-weekend?limit=8"),
    ApiMiddleware.get("/event/trending?limit=8"),
  ]);

  return {
    props: {
      upcoming: apidata[0]?.data?.data,
      weekend: apidata[1]?.data?.data,
      trending: apidata[2]?.data?.data,
    },
  };
}

export default Home;

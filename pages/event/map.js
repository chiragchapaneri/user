import React from "react";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import inputSearch from "../../assets/img/input_search.svg";
import inputLocation from "../../assets/img/input_location.svg";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { useState } from "react";
import Card from "../../components/homecard/Card";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchData, searchEventApi } from "../../Redux/event/searchEvent";
import moment from "moment";
import { getDateArray } from "../../utils/helper";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { DropDown } from "../../components/dropdown/dropdown";
import classNames from "classnames";
import { useRef } from "react";
import {
  AiFillFilter,
  AiOutlineCalendar,
  AiOutlineClose,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { FaMapMarker } from "react-icons/fa";
import { Bars } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { Map } from "../../components/google/Map";
import {
  InfoBox,
  InfoWindow,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";
import { headerLogo } from "../../assets/img/header_logo.svg";
import Footer from "../../components/footer/Footer";
import FillterModel from "../../components/modal/FillterModel";
import { eventForMeApi } from "../../Redux/bookmarked/eventForMe";
import { CiFaceMeh } from "react-icons/ci";

const SearchMap = (props) => {
  const { replace, push, route } = useRouter();
  const [found, setFound] = useState();
  const [mapCenter, setMapCenter] = useState({
    lat: 3.0042,
    lng: 101.4134,
  });
  const dispatch = useDispatch();
  const {
    serachData,
    totalPages,
    isLoading,
    bookid,
    markerData,
    totalRecodes,
  } = useSelector((state) => ({
    serachData: state.searchEventSlice.serachData,
    totalPages: state.searchEventSlice.totalPages,
    isLoading: state.searchEventSlice.isLoading,
    isdata: state.searchEventSlice.isdata,
    bookid: state.eventForMeSlice.bookid,
    markerData: state.searchEventSlice.markerData,
    totalRecodes: state.searchEventSlice.totalRecords,
  }));
  const scrolldata = useRef(null);
  const [totalPage, setTotalPage] = useState(props?.totalPage);
  const [event, setEvent] = useState(props?.event);
  const [selected, setSelected] = useState();
  const [slectCategory, setSelectCategory] = useState();
  const [subCategoryList, setsubCategoryList] = useState();
  const [slectSubCategory, setSelectSubCategory] = useState();
  const [showDatepicker, setshowDatepicker] = useState();
  const [datePlaceHolder, setDatePlaceHolder] = useState();
  const [search, setSearch] = useState(props?.slug?.search);
  const inputElement = useRef();
  const [dateRange, setDateRange] = useState({
    startDate: props?.slug?.startDate ? props.slug?.startDate : new Date(),
    endDate: props?.slug?.endDate,
    dt: props?.slug?.dt,
  });
  const [location, setLocation] = useState({
    location: props?.slug?.location,
    locationName: props?.slug?.locationName,
    placeId: props?.slug?.locationName,
  });
  const [currentPage, setCurrentPage] = useState();

  const setMarkerData = (id, index, data) => {
    const top = scrolldata.current.children[index].offsetTop;
    if (index == 0) {
      scrolldata.current.scrollTop = 0;
    } else {
      scrolldata.current.scrollTop = top;
    }
    setFound(id);
    setMapCenter({ lng: data?.longitude, lat: data?.latitude });
  };
  const [custom, setCustom] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    setDateRange({
      startDate: start,
      endDate: end,
    });
  };

  const submitDate = () => {
    setDateRange({
      ...dateRange,
      dt: "CUSTOM",
    });
    setDatePlaceHolder({
      name: `${moment(dateRange?.startDate).format("D/M/YYYY")} -  ${moment(
        dateRange?.endDate
      ).format("D/M/YYYY")} `,
    });
    setshowDatepicker(false);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: slectSubCategory?.id,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        limit: 100,
      })
    );

    setCustom(false);
  };

  const clearEvent = () => {
    setCurrentPage(0);
    setSelected("");
    dispatch(
      searchEventApi({
        etid: "",
        pcid: slectCategory?.id,
        cid: slectSubCategory?.id,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        limit: 100,
      })
    );
  };

  const clearCategory = () => {
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: "",
        cid: "",
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        limit: 100,
      })
    );
    setSelectCategory("");
    setSelectSubCategory("");
    setsubCategoryList([]);
    setCurrentPage(0);
  };

  const clearSubCategory = () => {
    setCurrentPage(0);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: "",
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        limit: 100,
      })
    );
    setsubCategoryList([]);
    setSelectSubCategory("");
  };
  const clearSelectedDate = () => {
    setCurrentPage(0);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: slectSubCategory?.id,
        startDate: "",
        endDate: "",
        dt: "",
      })
    );
    setDateRange({ startDate: "", endDate: "" });
    setDatePlaceHolder("");
  };
  const clearSearch = () => {
    setCurrentPage(0);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: slectSubCategory?.id,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        limit: 100,
      })
    );
    setSearch("");
  };

  const date = getDateArray();

  const changedate = (e) => {
    if (e.value == "Custom") {
      setCustom(true);
      setDateRange();
      setshowDatepicker(true);
    } else {
      if (datePlaceHolder?.name == e?.name) {
        clearSelectedDate();
      } else {
        setDatePlaceHolder(e);
        setDateRange({
          startDate: e?.startDate,
          endDate: e?.endDate,
          dt: e?.dt,
        });
        dispatch(
          searchEventApi({
            etid: selected?.id,
            pcid: slectCategory?.id,
            cid: slectSubCategory?.id,
            startDate: e?.startDate,
            endDate: e?.endDate,
            dt: e?.dt,
          })
        );
      }
    }
  };
  const handelSubCategory = (e) => {
    if (slectSubCategory?.name == e?.name) {
      clearSubCategory();
    } else {
      setSelectSubCategory(e);
      dispatch(
        searchEventApi({
          etid: selected?.id,
          pcid: slectCategory?.id,
          cid: e?.id,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
          limit: 100,
        })
      );
    }
  };
  const handleType = (e) => {
    if (selected?.name == e.name) {
      clearEvent();
    } else {
      dispatch(
        searchEventApi({
          etid: e?.id,
          pcid: slectCategory?.id,
          cid: slectSubCategory?.id,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
          limit: 100,
        })
      );
      setSelected(e);
    }
  };

  const clearDate = () => {
    setSelectCategory();
    setSelectSubCategory();
    setSelected();
    setDatePlaceHolder();
    setCurrentPage(0);
    setDateRange({
      startDate: "",
      endDate: "",
      dt: "",
    });

    dispatch(
      searchEventApi({
        page: 1,
      })
    );
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: slectSubCategory?.id,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        limit: 100,
        page: event.selected + 1,
      })
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const submitSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(
        searchEventApi({
          etid: selected?.id,
          pcid: slectCategory?.id,
          cid: slectSubCategory?.id,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
          limit: 100,
        })
      );
    }
  };
  const closeCustomDate = () => {
    setshowDatepicker(false);
    setCustom(false);
    setDateRange({ startDate: "", endDate: "" });
    setDatePlaceHolder("");
  };
  const handleCategory = (e) => {
    if (e?.name == slectCategory?.name) {
      clearCategory();
    } else {
      const sub = props.eventCategory?.filter(
        (data) => data.id == e.id && data
      );
      setSelectCategory(e);
      dispatch(
        searchEventApi({
          etid: selected?.id,
          pcid: e?.id,
          cid: "",
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
          limit: 100,
        })
      );
      setSelectSubCategory();
      setsubCategoryList(sub[0]?.childCategories);
    }
  };
  useEffect(() => {
    if (totalPages) {
      setEvent(serachData);
      setTotalPage(totalPages);
    }
  }, [
    slectCategory,
    showDatepicker,
    serachData,
    dateRange,
    custom,
    totalPages,
  ]);

  useEffect(() => {
    dispatch(
      searchEventApi({
        ...location,
        ...dateRange,
        limit: 300,
      })
    );
  }, []);

  return (
    <div>
      {showDatepicker && (
        <div className=" fixed datepicker opacity-100 ">
          <div className="flex justify-between">
            <div> Select Range</div>
            <div className="cursor-pointer">
              <AiOutlineClose
                size={15}
                onClick={closeCustomDate}
                className="absolute top-[10px] right-[10px] cursor-pointer bg-white"
              />
            </div>
          </div>
          <div>
            {dateRange?.startDate &&
              moment(dateRange?.startDate).format("D/M/YYYY")}
            -
            {dateRange?.endDate &&
              moment(dateRange?.endDate).format("D/M/YYYY")}
          </div>
          <DatePicker
            selected={dateRange?.startDate}
            onChange={onChange}
            startDate={dateRange?.startDate}
            endDate={dateRange?.endDate}
            selectsRange
            inline
          />
          <div className={classNames("text-center mt-[10px] ")}>
            <button
              className={classNames(
                "p-10 disabled:opacity-25   text-white bg-[#855FA7] ",
                !dateRange?.startDate == "" && !dateRange?.endDate == ""
                  ? "opacity-100 cursor-pointer pointer-events-auto "
                  : "pointer-events-none cursor-no-drop opacity-25"
              )}
              onClick={submitDate}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className=" z-[100] top-[50%] left-[50%] loader-cnter">
          <Bars
            height="80"
            width="80"
            color="#0090E1"
            ariaLabel="bars-loading"
            visible={true}
          />
        </div>
      )}
      <div
        className={classNames(
          "mx-auto max-w-2xl ",
          custom ? "opacity-20" : "opacity-100",
          isLoading && "opacity-30"
        )}
      >
        <Toaster />
        <div className="sticky top-0 z-10">
          <HeaderTransparentevent
            headerStyle="bg-bg-blue relative"
            textStyle="text-black"
          />
        </div>
        <div className="pt-[30px] flex justify-between px-10">
          <div className=" lg:flex lg:flex-col  lg:gap-10  hidden">
            <span className="text-xl font-medium leading-6">Filter Events</span>
            <div className=" lg:flex lg:flex-col  lg:gap-10  hidden">
              <div className="relative min-w-[170px]">
                <DropDown
                  data={props.eventTypes}
                  selected={selected}
                  placeholder="Selcet Event"
                  handleChange={handleType}
                  zindex="z-[7]"
                />
                {selected?.name && (
                  <AiOutlineClose
                    size={15}
                    onClick={clearEvent}
                    className="absolute top-[9px] right-[10px] cursor-pointer bg-white h-[30px]"
                  />
                )}
              </div>
              <div className="relative min-w-[170px]">
                <DropDown
                  data={props?.eventCategory}
                  selected={slectCategory}
                  placeholder="Selcet Category"
                  zindex="z-[6]"
                  handleChange={handleCategory}
                />
                {slectCategory?.name && (
                  <AiOutlineClose
                    size={15}
                    onClick={clearCategory}
                    className="absolute top-[9px] right-[10px] cursor-pointer bg-white h-[30px]"
                  />
                )}
              </div>
              {subCategoryList?.length > 0 && (
                <div className="relative min-w-[170px]">
                  <DropDown
                    data={subCategoryList}
                    selected={slectSubCategory}
                    placeholder="Select Sub Category"
                    handleChange={handelSubCategory}
                    zindex="z-[5]"
                  />
                  {slectSubCategory?.name && (
                    <AiOutlineClose
                      size={15}
                      onClick={clearSubCategory}
                      className="absolute top-[9px] right-[10px] cursor-pointer bg-white h-[30px]"
                    />
                  )}
                </div>
              )}
              <div className="relative min-w-[170px]">
                <DropDown
                  data={date}
                  selected={datePlaceHolder}
                  placeholder={"Select Date"}
                  handleChange={changedate}
                  zindex="z-[4]"
                />
                {datePlaceHolder && (
                  <AiOutlineClose
                    size={15}
                    onClick={clearSelectedDate}
                    className="absolute top-[9px] right-[10px] cursor-pointer bg-white h-[30px]"
                  />
                )}
              </div>
              <div className="flex items-center ">
                <span
                  className="cursor-pointer text-[#87DFFF]"
                  onClick={() => clearDate()}
                >
                  Clear Fillters
                </span>
              </div>
            </div>
          </div>
          <div
            className="lg:grid sm:grid-cols-1 gap-[10px]  h-[80vh] overflow-y-auto scroll-smooth max-w-[560px] w-full pl-[6px] pr-[10px]  sm:hidden ms:hidden "
            ref={scrolldata}
          >
            <span>Found {totalRecodes} Event</span>
            {totalRecodes > 0 &&
              event?.map((data, index) => (
                <div
                  key={index}
                  className={classNames(
                    " flex justify-between bg-[#E0F7FF] cursor-pointer m-[3px] hover:shadow-2xl hover:shadow-cyan-500/50",
                    found == data.id && "shadow-2xl shadow-cyan-500/50"
                  )}
                  onClick={() => {
                    push(`/event/${data.slug}`);
                  }}
                >
                  <div className="flex flex-col gap-5 py-10 px-10">
                    <div className="cut-text">{data?.name}</div>
                    <div className="text-[#23C5FF]">{data?.type?.name}</div>
                    <div className="flex items-center text-[#23C5FF] ">
                      <AiOutlineCalendar />
                      {moment(data?.startDate).format("Do MMM  YYYY hh:mm")}
                    </div>
                    <div>{data?.category?.name}</div>
                  </div>
                  <div className="flex flex-col ">
                    <div style={{ height: "70px", width: "140px" }}>
                      <Image
                        src={data?.coverImage ? data?.coverImage : headerLogo}
                        height={70}
                        width={140}
                        alt="not found"
                      />{" "}
                      <span className="text-[#23C5FF]">View Event</span>
                    </div>
                  </div>
                </div>
              ))}

            {totalRecodes == 0 && !isLoading && (
              <div className="w-full flex justify-center my-30">
                <div className="flex flex-col items-center gap-5">
                  <CiFaceMeh size={50} />
                  <span className="text-20 leading-5 text-black font-bold">
                    We couldn&apos;t find anything
                  </span>
                  <span className="text-18 leading-6 text-black ">
                    Adjust your filters and try again
                  </span>
                </div>
              </div>
            )}
          </div>

          {markerData && (
            <div className="">
              <Map
                center={!markerData[0]?.lat ? mapCenter : markerData[0]}
                height="md:h-[100px]"
                mapid="custom"
                mapContainerStyle={{
                  height: "530px",
                  width: "500px",
                }}
                zoom={10}
              >
                {markerData &&
                  markerData.map((data, index) => {
                    return (
                      <>
                        {data.id == found && (
                          <InfoWindowF position={data}>
                            <div className="lg:hidden">
                              <div
                                style={{
                                  opacity: 0.75,
                                  padding: 1,
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div style={{ width: "270px", height: "80px" }}>
                                  <Image
                                    src={
                                      data?.coverImage
                                        ? data?.coverImage
                                        : headerLogo
                                    }
                                    alt="not found"
                                    height={80}
                                    width={270}
                                  />
                                </div>
                                <div
                                  style={{
                                    padding: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "270px",
                                    overflow: "hidden",
                                  }}
                                  className="cursor-pointer"
                                  onClick={() =>
                                    replace(`/event/${data?.slug}`)
                                  }
                                >
                                  <div
                                    className="translate"
                                    style={{ width: "270px" }}
                                  >
                                    {data?.name}
                                  </div>
                                  <div>
                                    {moment(data?.startDate).format("Do MMM ")}
                                  </div>
                                </div>
                              </div>
                              <div className="absolute top-[10px] right-[14px]  cursor-pointer lg:hidden">
                                <AiOutlineClose
                                  size={25}
                                  onClick={() => setFound()}
                                />
                              </div>
                            </div>
                          </InfoWindowF>
                        )}
                        <MarkerF
                          position={data}
                          className="hover:text-black"
                          // onClick={(e) => console.log("e", e)}
                          onClick={(e) => setMarkerData(data?.id, index)}
                        />
                      </>
                    );
                  })}
              </Map>

              <FillterModel
                eventTypes={props.eventTypes}
                eventCategory={props?.eventCategory}
              />
            </div>
          )}
        </div>
        <div
          className="textcenter flex gap-10 bg-transparent items-center z-[4]"
          onClick={() => replace("/event/search")}
        >
          <AiOutlineUnorderedList /> Open List View
        </div>
        <Footer />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query;

  const dateType = slug?.dateType ? "Select Date" : "Select Date";

  const apidata = await Promise.all([
    ApiMiddleware.get("/dropdown/event-types"),
    ApiMiddleware.get("/dropdown/categories"),
  ]);

  return {
    props: {
      eventTypes: apidata[0]?.data?.data,
      eventCategory: apidata[1]?.data?.data,
      slug: slug,
      dateType: dateType,
    },
  };
}

export default SearchMap;

import React from "react";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import inputSearch from "../../assets/img/input_search.svg";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { useState } from "react";
import Card from "../../components/homecard/Card";
import { useDispatch, useSelector } from "react-redux";
import { searchEventApi } from "../../Redux/event/searchEvent";
import moment from "moment";
import { getDateArray } from "../../utils/helper";
import ReactGoogleAutocomplete, {
  usePlacesWidget,
} from "react-google-autocomplete";
import { DropDown } from "../../components/dropdown/dropdown";
import classNames from "classnames";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Bars } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import { eventForMeApi } from "../../Redux/bookmarked/eventForMe";
import { CiFaceMeh } from "react-icons/ci";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Categories = (props) => {
  const dispatch = useDispatch();
  const { serachData, totalPages, isLoading, bookid, totalRecords } =
    useSelector((state) => ({
      serachData: state.searchEventSlice.serachData,
      totalPages: state.searchEventSlice.totalPages,
      isLoading: state.searchEventSlice.isLoading,
      isdata: state.searchEventSlice.isdata,
      bookid: state.eventForMeSlice.bookid,
      totalRecords: state.searchEventSlice.totalRecords,
    }));

  const [totalPage, setTotalPage] = useState(props?.totalPage);
  const [event, setEvent] = useState(props?.event);
  const [selected, setSelected] = useState();

  const [slectCategory, setSelectCategory] = useState();
  const [subCategoryList, setsubCategoryList] = useState();
  const [slectSubCategory, setSelectSubCategory] = useState();
  const [showDatepicker, setshowDatepicker] = useState();
  const [datePlaceHolder, setDatePlaceHolder] = useState();
  const [search, setSearch] = useState();
  const inputElement = useRef();
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
    dt: "",
  });
  const [location, setLocation] = useState({
    location: "",
    locationName: "",
    placeId: "",
  });
  const [currentPage, setCurrentPage] = useState();
  const [custom, setCustom] = useState(false);
  const { ref } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_ApiKey,
    onPlaceSelected: (e) => {
      setLocation({
        location: e?.address_components[0]?.long_name.toLowerCase(),
        locationName: e?.formatted_address,
        placeId: e?.place_id,
      });
      dispatch(
        searchEventApi({
          search: search || "",
          etid: selected?.id || "",
          pcid: slectCategory?.id || "",
          cid: slectSubCategory?.id || "",
          startDate: dateRange?.startDate || "",
          endDate: dateRange?.endDate || "",
          dt: dateRange?.dt || "",
          location: e?.address_components[0]?.long_name.toLowerCase(),
          locationName: e?.formatted_address,
          placeId: e?.place_id,
        })
      );
    },
    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "my" },
    },
  });
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
    setCurrentPage(0);
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
        cid: props.categoryid,
        search: search,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
      })
    );

    setCustom(false);
  };
  const clearLocation = () => {
    setCurrentPage(0);
    ref.current.value = null;
    setLocation();

    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: props.categoryid,
        search: search,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,

        location: "",
        locationName: "",
        placeId: "",
      })
    );
  };

  const clearEvent = () => {
    setCurrentPage(0);
    setSelected("");
    dispatch(
      searchEventApi({
        etid: "",
        pcid: slectCategory?.id,
        cid: props.categoryid,
        search: search,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
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
        location: props?.slug?.location,
        locationName: props?.slug?.locationName,
        placeId: props?.slug?.placeId,
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
        search: search,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
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
        cid: props.categoryid,
        search: search,
        startDate: "",
        endDate: "",
        dt: "",
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
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
        cid: props.categoryid,
        search: "",
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
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
        setCurrentPage(0);

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
            cid: props.categoryid,
            search: search,
            startDate: e?.startDate,
            endDate: e?.endDate,
            dt: e?.dt,
            location: location?.location,
            locationName: location?.locationName,
            placeId: location?.placeId,
          })
        );
      }
    }
  };
  const handelSubCategory = (e) => {
    setSelectSubCategory(e);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: e?.id,
        search: search,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
      })
    );
  };
  const handleType = (e) => {
    if (selected?.name == e.name) {
      clearEvent();
    } else {
      setCurrentPage(0);

      dispatch(
        searchEventApi({
          etid: e?.id,
          pcid: slectCategory?.id,
          cid: props.categoryid,
          search: search,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
          location: location?.location,
          locationName: location?.locationName,
          placeId: location?.placeId,
        })
      );
      setSelected(e);
    }
  };

  const clearDate = () => {
    setSelected();
    setDatePlaceHolder();
    setCurrentPage(0);
    setDateRange({
      startDate: "",
      endDate: "",
      dt: "",
    });
    ref.current.value = null;
    dispatch(
      searchEventApi({
        cid: props.categoryid,
        page: 1,
      })
    );
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    dispatch(
      searchEventApi({
        search: search,
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: props.categoryid,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        page: event.selected + 1,
        location: location?.location,
        locationName: location?.locationName,
        placeId: location?.placeId,
      })
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const submitSearch = (e) => {
    if (e.key === "Enter") {
      setCurrentPage(0);

      dispatch(
        searchEventApi({
          search: e.target.value,
          etid: selected?.id,
          pcid: slectCategory?.id,
          cid: props.categoryid,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
          location: location?.location,
          locationName: location?.locationName,
          placeId: location?.placeId,
        })
      );
    }
  };
  const selectsearch = (e) => {
    setLocation({
      location: e?.address_components[0]?.long_name.toLowerCase(),
      locationName: e?.formatted_address,
      placeId: e?.place_id,
    });
    dispatch(
      searchEventApi({
        search: search,
        etid: selected?.id,
        pcid: slectCategory?.id,
        cid: props.categoryid,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
        location: e?.address_components[0]?.long_name.toLowerCase(),
        locationName: e?.formatted_address,
        placeId: e?.place_id,
      })
    );
  };

  const handleCategory = (e) => {
    const sub = props.eventCategory?.filter((data) => data.id == e.id && data);
    setSelectCategory(e);
    dispatch(
      searchEventApi({
        etid: selected?.id,
        pcid: e?.id,
        cid: "",
        search: search,
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate,
        dt: dateRange?.dt,
      })
    );
    setSelectSubCategory();
    setsubCategoryList(sub[0]?.childCategories);
  };
  useEffect(() => {
    if (serachData) {
      setEvent(serachData);
      // setTotalPage(totalPages);
    }
    if (localStorage.getItem("token")) {
      !bookid && dispatch(eventForMeApi());
    }

    !serachData &&
      dispatch(
        searchEventApi({
          ...location,
          ...dateRange,
          search: search,
          cid: props.categoryid,
        })
      );
  }, [
    slectCategory,
    showDatepicker,
    serachData,
    dateRange,
    custom,
    totalPages,
  ]);

  return (
    <div>
      {showDatepicker && (
        <div className="datepicker opacity-100 ">
          <div className="flex justify-between">
            <div> Select Range</div>
            <div>
              <AiOutlineClose
                size={15}
                onClick={() => {
                  setshowDatepicker(false);
                  setCustom(false);
                }}
                className="absolute top-[14px] right-[14px] cursor-pointer"
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
                "p-10  text-white bg-[#855FA7] ",
                dateRange?.startDate && dateRange?.endDate
                  ? "opacity-100 cursor-pointer pointer-events-auto "
                  : "pointer-events-none opacity-25  "
              )}
              onClick={submitDate}
            >
              Apply
            </button>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="z-[100] top-[50%] left-[50%] loader-cnter">
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
        <div className="sticky top-0 z-50">
          <HeaderTransparentevent
            headerStyle="bg-bg-blue relative"
            textStyle="text-black"
          />
        </div>
        <div className=" flex gap-20 flex-col ">
          <div
            className={`h-550 w-auto sm:max-h-[250px]  backdrop-blur-42 bg-header-background-img bg-no-repeat bg-cover bg-center  `}
          >
            <div className="text-white mt-[100px] ml-[50px] flex gap-10 flex-col">
              <span className="text-xl font-medium">
                {props?.categorydata?.name}
              </span>
              <span className="text-base font-medium">
                {props?.categorydata?.description}
              </span>
              {/* <div>{props?.categorydata?.parentCategory?.image}</div> */}
            </div>
          </div>
          <div className="mx-10">
            <div className="flex flex-col  gap-10">
              <div className="grid sm:grid-cols-2 gap-15 lg:grid-cols-4 ms:grid-cols-1 ms:gap-15">
                <div className="flex justify-between px-10 borader border-1  border-[#E5E7EB] rounded-[4px] items-center h-[42px] ">
                  <div className="flex gap-10">
                    <Image
                      src={inputSearch}
                      height={15}
                      width={15}
                      alt="none"
                    />
                    {/* <ReactGoogleAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_ApiKey}
                    options={{
                      types: ["geocode", "establishment"],
                    }}
                    ref={inputElement}
                    onPlaceSelected={selectsearch}
                    className="outline-none"
                    defaultValue={props?.slug?.locationName}
                  /> */}

                    <input
                      ref={ref}
                      placeholder="City or zip code"
                      className="outline-none  lg:w-[184px] md:w-[265px] ms:w-[138px] text-18 "
                    />
                  </div>
                  {location?.locationName && (
                    <AiOutlineClose
                      size={15}
                      onClick={clearLocation}
                      className="cursor-pointer"
                    />
                  )}
                </div>
                <div className="relative ">
                  <DropDown
                    data={props.eventTypes}
                    selected={selected}
                    placeholder="Select Event"
                    handleChange={handleType}
                    zindex="z-[9]"
                  />
                  {selected?.name && (
                    <AiOutlineClose
                      size={15}
                      onClick={clearEvent}
                      className="absolute top-[14px] right-[14px] cursor-pointer"
                    />
                  )}
                </div>
                <div className="relative">
                  <DropDown
                    data={date}
                    selected={datePlaceHolder}
                    placeholder={"Select Date"}
                    handleChange={changedate}
                    zindex="z-[8]"
                  />
                  {datePlaceHolder && (
                    <AiOutlineClose
                      size={15}
                      onClick={clearSelectedDate}
                      className="absolute top-[14px] right-[14px] cursor-pointer"
                    />
                  )}
                </div>
                <div className="flex gap-10 px-10 borader border-1  border-[#E5E7EB] rounded-[4px] h-[42px] items-center ">
                  {!search && (
                    <Image
                      src={inputSearch}
                      height={15}
                      width={15}
                      alt="none"
                    />
                  )}
                  <input
                    type="text"
                    className="outline-none w-full"
                    placeholder="Search by event"
                    onChange={handleSearch}
                    value={search}
                    onKeyDown={submitSearch}
                  />
                  {search && (
                    <AiOutlineClose
                      size={15}
                      onClick={clearSearch}
                      className="cursor-pointer"
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
          </div>

          <div className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4 ms:grid-cols-1 mx-10">
            {totalRecords > 0 &&
              event?.map((data, index) => (
                <div key={index}>
                  <Card data={data} index={index} bookMarkedEvents={bookid} />
                </div>
              ))}
          </div>
          {totalRecords == 0 && !isLoading && (
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
          {event?.length >= 1 && totalPages >= 1 && (
            <div className="flex justify-center">
              <ReactPaginate
                previousLabel={<MdArrowBackIosNew size={15} />}
                nextLabel={<MdArrowForwardIos size={15} />}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={4}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                containerClassName={
                  "flex py-[64px] justify-center gap-x-[24px]"
                }
                pageClassName={
                  "flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
                }
                previousClassName={
                  " prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
                }
                nextClassName={
                  "next-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
                }
                pageLinkClassName={
                  "flex items-center justify-center h-full w-full"
                }
                previousLinkClassName={
                  "flex items-center justify-center h-full w-full px-9 rounded-[6px] border-1 border-solid border-[#E4E4EB] disabled:bg-gray"
                }
                nextLinkClassName={
                  "flex items-center justify-center h-full w-full px-9 rounded-[6px] border-1 border-solid border-[#E4E4EB] disabled:bg-gray"
                }
                breakClassName={
                  "flex items-center justify-center w-[36px] bg-[#FFFFFF] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
                }
                activeLinkClassName={"text-blue"}
                activeClassName={
                  "border-sky-500 border-[2px] bg-[#FFFFFF] text-[#FF8800]"
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query;
  const dateType = slug?.dateType ? slug?.dateType : "Select Date";
  const apidata = await Promise.all([
    ApiMiddleware.get("/dropdown/event-types"),
    ApiMiddleware.get("/dropdown/categories"),
    ApiMiddleware.get(`/category/${slug?.slug.toLowerCase()}`),
  ]);

  return {
    props: {
      eventTypes: apidata[0]?.data?.data,
      eventCategory: apidata[1]?.data?.data,
      categoryid: apidata[2]?.data?.data?.id,
      categorydata: apidata[2]?.data?.data,
      slug: slug?.slug,
      dateType: dateType,
    },
  };
}

export default Categories;

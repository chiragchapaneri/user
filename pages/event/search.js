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
import { getAccessToken, getDateArray } from "../../utils/helper";
import { DropDown } from "../../components/dropdown/dropdown";
import classNames from "classnames";
import { useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Bars } from "react-loader-spinner";
import { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import Footer from "../../components/footer/Footer";
import { eventForMeApi } from "../../Redux/bookmarked/eventForMe";
import { CiFaceMeh } from "react-icons/ci";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Search = (props) => {
  const { replace } = useRouter();
  const token = getAccessToken();
  const dispatch = useDispatch();
  const {
    serachData,
    totalPages,
    isLoading,
    bookid,
    markerData,
    totalRecords,
  } = useSelector((state) => ({
    serachData: state.searchEventSlice.serachData,
    totalPages: state.searchEventSlice.totalPages,
    isLoading: state.searchEventSlice.isLoading,
    isdata: state.searchEventSlice.isdata,
    bookid: state.eventForMeSlice.bookid,
    markerData: state.searchEventSlice.bookid,
    totalRecords: state.searchEventSlice.totalRecords,
  }));

  const [totalPage, setTotalPage] = useState(props?.totalPage);
  const [event, setEvent] = useState(props?.event);
  const [selected, setSelected] = useState();
  const [slectCategory, setSelectCategory] = useState();
  const [subCategoryList, setsubCategoryList] = useState();
  const [slectSubCategory, setSelectSubCategory] = useState();
  const [showDatepicker, setshowDatepicker] = useState();
  const [datePlaceHolder, setDatePlaceHolder] = useState({
    name: props?.dateType,
  });
  const [search, setSearch] = useState(props?.slug?.search);

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
  const [custom, setCustom] = useState(false);

  const onChange = (dates) => {
    const [start, end] = dates;
    setDateRange({
      startDate: start,
      endDate: end,
    });
  };

  const submitDate = () => {
    setCurrentPage(0);

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
        etid: selected?.id || "",
        pcid: slectCategory?.id || "",
        cid: slectSubCategory?.id || "",
        search: search || "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
        location: location?.location || "",
        locationName: location?.locationName || "",
        placeId: location?.placeId || "",
      })
    );

    setCustom(false);
  };
  const clearLocation = () => {
    setCurrentPage(0);
    ref.current.value = null;

    setLocation({
      location: "",
      locationName: "",
      placeId: "",
    });

    dispatch(
      searchEventApi({
        etid: selected?.id || "",
        pcid: slectCategory?.id || "",
        cid: slectSubCategory?.id || "",
        search: search || "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
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
        pcid: slectCategory?.id || "",
        cid: slectSubCategory?.id || "",
        search: search || "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
        location: location?.location || "",
        locationName: location?.locationName || "",
        placeId: location?.placeId || "",
      })
    );
  };
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
  const clearCategory = () => {
    dispatch(
      searchEventApi({
        etid: selected?.id || "",
        pcid: "",
        cid: "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
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
        etid: selected?.id || "",
        pcid: slectCategory?.id || "",
        cid: "",
        search: search || "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
        location: location?.location || "",
        locationName: location?.locationName || "",
        placeId: location?.placeId || "",
      })
    );
    setsubCategoryList([]);
    setSelectSubCategory("");
  };
  const clearSelectedDate = () => {
    setCurrentPage(0);
    dispatch(
      searchEventApi({
        etid: selected?.id || "",
        pcid: slectCategory?.id || "",
        cid: slectSubCategory?.id || "",
        search: search || "",
        startDate: "",
        endDate: "",
        dt: "",
        location: location?.location || "",
        locationName: location?.locationName || "",
        placeId: location?.placeId || "",
      })
    );
    setDateRange({ startDate: "", endDate: "" });
    setDatePlaceHolder("");
  };
  const clearSearch = () => {
    setCurrentPage(0);
    dispatch(
      searchEventApi({
        etid: selected?.id || "",
        pcid: slectCategory?.id || "",
        cid: slectSubCategory?.id || "",
        search: "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
        location: location?.location || "",
        locationName: location?.locationName || "",
        placeId: location?.placeId || "",
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
        setCurrentPage(0);
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
            etid: selected?.id || "",
            pcid: slectCategory?.id || "",
            cid: slectSubCategory?.id || "",
            search: search || "",
            startDate: e?.startDate,
            endDate: e?.endDate,
            dt: e?.dt,
            location: location?.location || "",
            locationName: location?.locationName || "",
            placeId: location?.placeId || "",
          })
        );
      }
    }
  };
  const handelSubCategory = (e) => {
    if (slectSubCategory?.name == e?.name) {
      clearSubCategory();
    } else {
      setCurrentPage(0);
      setSelectSubCategory(e);
      dispatch(
        searchEventApi({
          etid: selected?.id || "",
          pcid: slectCategory?.id || "",
          cid: e?.id,
          search: search || "",
          startDate: dateRange?.startDate || "",
          endDate: dateRange?.endDate || "",
          dt: dateRange?.dt || "",
          location: location?.location || "",
          locationName: location?.locationName || "",
          placeId: location?.placeId || "",
        })
      );
    }
  };
  const handleType = (e) => {
    if (selected?.name == e.name) {
      clearEvent();
    } else {
      setCurrentPage(0);
      dispatch(
        searchEventApi({
          etid: e?.id,
          pcid: slectCategory?.id || "",
          cid: slectSubCategory?.id || "",
          search: search || "",
          startDate: dateRange?.startDate || "",
          endDate: dateRange?.endDate || "",
          dt: dateRange?.dt || "",
          location: location?.location || "",
          locationName: location?.locationName || "",
          placeId: location?.placeId || "",
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
    ref.current.value = null;
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
        search: search || "",
        etid: selected?.id || "",
        pcid: slectCategory?.id || "",
        cid: slectSubCategory?.id || "",
        startDate: dateRange?.startDate || "",
        endDate: dateRange?.endDate || "",
        dt: dateRange?.dt || "",
        page: event.selected + 1,
        location: location?.location || "",
        locationName: location?.locationName || "",
        placeId: location?.placeId || "",
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
          search: e.target.value.toString(),
          etid: selected?.id || "",
          pcid: slectCategory?.id || "",
          cid: slectSubCategory?.id || "",
          startDate: dateRange?.startDate || "",
          endDate: dateRange?.endDate || "",
          dt: dateRange?.dt || "",
          location: location?.location || "",
          locationName: location?.locationName || "",
          placeId: location?.placeId || "",
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
  };

  const handleCategory = (e) => {
    if (e?.name == slectCategory?.name) {
      clearCategory();
    } else {
      setCurrentPage(0);
      const sub = props.eventCategory?.filter(
        (data) => data.id == e.id && data
      );
      setSelectCategory(e);
      dispatch(
        searchEventApi({
          etid: selected?.id || "",
          pcid: e?.id,
          cid: "",
          search: search || "",
          startDate: dateRange?.startDate || "",
          endDate: dateRange?.endDate || "",
          dt: dateRange?.dt || "",
        })
      );
      setSelectSubCategory();
      setsubCategoryList(sub[0]?.childCategories);
    }
  };

  const closeCustomDate = () => {
    setshowDatepicker(false);
    setCustom(false);
    setDateRange({ startDate: "", endDate: "" });
    setDatePlaceHolder("");
  };

  useEffect(() => {
    if (totalPages) {
      setEvent(serachData);
      setTotalPage(totalPages);
    }
    if (token) {
      !bookid && dispatch(eventForMeApi());
    }

    !serachData &&
      dispatch(
        searchEventApi({
          ...location,
          ...dateRange,
          search: search || "",
        })
      );
  }, [
    slectCategory,
    showDatepicker,
    serachData,
    dateRange,
    custom,
    totalPages,
    location,
    totalRecords,
    currentPage,
  ]);

  return (
    <div>
      {showDatepicker && (
        <div className="fixed  datepicker z-100 opacity-100 ">
          <div className="flex justify-between">
            <div> Select Range</div>
            <div className="cursor-pointer">
              <AiOutlineClose
                size={15}
                onClick={closeCustomDate}
                className="absolute top-[14px] right-[14px]"
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
                "p-10  text-white bg-[#855FA7]",
                dateRange?.startDate && dateRange?.endDate
                  ? "opacity-100 cursor-pointer pointer-events-auto  "
                  : "pointer-events-none  opacity-25 "
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
        <div className="sticky top-0 z-50">
          <HeaderTransparentevent
            headerStyle="bg-bg-blue relative"
            textStyle="text-black"
          />
        </div>
        <div className="pt-[30px] flex gap-10 flex-col px-10">
          <span className=" text-xl font-medium leading-6">Search Events</span>
          <div className="flex flex-col  gap-10 mt-10">
            <div className="grid sm:grid-cols-2 gap-15 lg:grid-cols-4 ms:grid-cols-1 ms:gap-15">
              <div className="flex justify-between px-10 borader border-1   border-[#E5E7EB] items-center rounded-[4px]">
                <div className="flex gap-10 ms:h-[38px]  ">
                  <Image src={inputSearch} height={15} width={15} alt="none" />
                  {/* <ReactGoogleAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_ApiKey}
                    options={{
                      types: ["geocode", "establishment"],
                      componentRestrictions: { country: "my" },
                    }}
                    ref={inputElement}
                    onPlaceSelected={selectsearch}
                    className="outline-none "
                    defaultValue={location?.locationName || ""}
                  /> */}
                  <input
                    ref={ref}
                    defaultValue={location?.locationName || ""}
                    placeholder="City or zip code"
                    // style={{ width: "90%" }}
                    // defaultValue="Amsterdam"
                    className="outline-none  lg:w-[203px] md:w-[265px] ms:w-[138px] text-18 "
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
                  data={props?.eventCategory}
                  selected={slectCategory}
                  placeholder="Select Category"
                  handleChange={handleCategory}
                  zindex="z-[8]"
                />
                {slectCategory?.name && (
                  <AiOutlineClose
                    size={15}
                    onClick={clearCategory}
                    className="absolute top-[14px] right-[14px] cursor-pointer"
                  />
                )}
              </div>
              {subCategoryList?.length > 0 && (
                <div className="relative">
                  <DropDown
                    data={subCategoryList}
                    selected={slectSubCategory}
                    placeholder="Select Sub Category"
                    handleChange={handelSubCategory}
                    zindex="z-[7]"
                  />
                  {slectSubCategory?.name && (
                    <AiOutlineClose
                      size={15}
                      onClick={clearSubCategory}
                      className="absolute top-[14px] right-[14px] cursor-pointer"
                    />
                  )}
                </div>
              )}
              <div className="relative">
                <DropDown
                  data={date}
                  selected={datePlaceHolder}
                  placeholder={"Select Date"}
                  handleChange={changedate}
                  zindex="z-[6]"
                />
                {datePlaceHolder?.name && (
                  <AiOutlineClose
                    size={15}
                    onClick={clearSelectedDate}
                    className="absolute top-[14px] right-[14px] cursor-pointer"
                  />
                )}
              </div>
              <div className="flex gap-10 px-10 borader border-1  h-[38px] items-center  border-[#E5E7EB] rounded-[4px]">
                {!search && (
                  <Image src={inputSearch} height={15} width={15} alt="none" />
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

          {totalRecords > 0 && (
            <div className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4 ms:grid-cols-1">
              {event?.map((data, index) => (
                <div key={index}>
                  <Card data={data} index={index} bookMarkedEvents={bookid} />
                </div>
              ))}
            </div>
          )}
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
          {totalRecords > 0 && (
            <div
              className="textcenter flex gap-10 bg-transparent z-[4]"
              onClick={() => replace("/event/map")}
            >
              <Image src={inputLocation} height={20} width={16} alt="none" />
              Open Map View
            </div>
          )}
          {event?.length >= 1 && totalPage >= 1 && totalRecords > 0 && (
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

        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query;

  const dateType = slug?.dateType || "";

  const apidata = await Promise.all([
    ApiMiddleware.get("/dropdown/event-types"),
    ApiMiddleware.get("/dropdown/categories"),
    // ApiMiddleware.get(`/event`),
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

export default Search;

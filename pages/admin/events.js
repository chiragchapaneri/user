import CustomButton from "../../components/forms/CustomButton.js";
import Image from "next/image";
import eye from "../../assets/img/eye.svg";
import React, { useCallback, useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import input_search from "../../assets/img/input_search.svg";
import DateRangeComp from "../../components/date-range/DateRangeComp.js";
import SelectOption from "../../components/dropdown/SelectOption.js";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrganizationsData,
  fetchEventsData,
} from "../../Redux/admin/eventsSlice.js";
import Autocomplete from "react-google-autocomplete";
import Switch from "react-switch";
import Link from "next/link";
import OvelLoader from "../../components/Loader/OvelLoader.js";
import ReactPaginate from "react-paginate";
import { CgSmileNeutral } from "react-icons/cg";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const Events = () => {
  const {
    isLoading,
    isLoadingOrganization,
    eventsList,
    allOrganizations,
    currentPage,
    totalPages,
    totalRecords,
    limit,
  } = useSelector(({ eventsSlice }) => eventsSlice);

  const dispatch = useDispatch();
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [searchStr, setSearchStr] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [clearDate, setClearDate] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handlePageClick = (selectedPageObj) => {
    setCurrentPageLocal(selectedPageObj.selected + 1);
  };

  const handleClick = () => {
    setSearchStr("");
    setSelectedLocation("");
    setLocationFilter("");
    setOrganizationFilter("");
    setClearDate(true);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleDateChange = (value) => {
    setClearDate(value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleOrganizationChange = (event) => {
    setOrganizationFilter(event.name);
    dispatch(fetchEventsData({ organizationId: event.value }));
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleLocationChange = (event) => {
    setLocationFilter(event.target.value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleLocationSelected = (event) => {
    setSelectedLocation(event.target.value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleInputChange = (event) => {
    setSearchStr(event.target.value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Organizer",
        id: "selectOrganization",
        accessor: "organization.name",
      },
      {
        Header: "Event Title",
        accessor: "name",
      },
      {
        Header: "Event Venue",
        id: "eventVenue",
        accessor: function (row) {
          const { venueName, city, state, country } = row;
          return venueName || city || state || country
            ? `${venueName},
                   ${city},
                    ${state}
                    ${country}`
            : "";
        },
      },
      {
        Header: "Price Range",
        accessor: function (row) {
          const { EventTicket } = row;
          return EventTicket[0]?.price === 0
            ? "Free"
            : `${"Starts from RM" + EventTicket[0]?.price + ".00"}`;
        },
      },
      {
        Header: "Duration",
        accessor: function (row) {
          const { startDate, endDate } = row;
          return `${new Date(startDate).toLocaleDateString("en-GB")} ${new Date(
            startDate
          ).toLocaleTimeString("en-IN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}-${new Date(endDate).toLocaleDateString("en-GB")} ${new Date(
            endDate
          ).toLocaleTimeString("en-IN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}`;
        },
      },
      {
        Header: "Created At",
        accessor: (row) =>
          `${new Date(row.createdAt).toLocaleDateString("en-GB")} ${new Date(
            row.createdAt
          ).toLocaleTimeString("en-IN", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}`,
      },
      {
        Header: "Visit Page",
        accessor: (row) => (
          <Link href={`/event/${row?.slug}`}>
            <a className="pl-20" target="_blank">
              <Image src={eye} height={20} width={20} alt="blank" />
            </a>
          </Link>
        ),
      },
    ],
    []
  );
  const {
    headerGroups,
    rows,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: eventsList,
      initialState: { pageSize: 20 },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    dispatch(allOrganizationsData());
  }, [eventsList]);

  useEffect(() => {
    dispatch(
      fetchEventsData({
        limit: pageSize,
        page: currentPageLocal,
        startDate: clearDate[0] ? new Date(clearDate[0]).toISOString() : "",
        endDate: clearDate[1] ? new Date(clearDate[1]).toISOString() : "",
        organizationId: allOrganizations?.filter(
          (organization) => organization.name === organizationFilter
        )[0]?.id,
        location: selectedLocation
          .split(",")[0]
          .toLocaleLowerCase()
          .replace(" ", "+"),
        search: searchStr,
      })
    );
    // dispatch(allOrganizationsData());
  }, [
    pageSize,
    currentPageLocal,
    clearDate,
    organizationFilter,
    selectedLocation,
    searchStr,
  ]);

  return (
    <div className="w-screen overflow-hidden p-14 bg-light-grey">
      <div className="p-10 bg-white">
        <div className="flex flex-row justify-between border-b-1 border-[#dee2e6] p-10">
          <div className=" text-xl ">Events</div>
        </div>
        <div className="p-10">
          <div className="flex items-center justify-between">
            <div>
              <CustomButton
                onClick={handleClick}
                buttonStyle="hidden md:block md:h-30 lg:h-35 text-solid-blue md:text-14 lg:text-base leading-6 font-medium rounded-5 
                            lg:px-26 md:px-16 box-border backdrop-blur-42 bg-blue-bgcomman whitespace-nowrap"
              >
                Clear Filters
              </CustomButton>
            </div>
            <div className="p-10 flex gap-5">
              <div className="w-full ">
                <DateRangeComp
                  clearDate={clearDate}
                  onChange={handleDateChange}
                  changeHandler={setClearDate}
                />
              </div>
              <SelectOption
                option={allOrganizations?.map((event) => ({
                  value: event?.id,
                  name: event?.name,
                }))}
                placeholder="Search organization"
                value={organizationFilter}
                changeHandler={handleOrganizationChange}
                style="w-full max-w-150 border-1 border-solid border-bordergrey min-h-42 min-w-200 rounded-5 px-12 text-sm text-black-bold  leading-9 focus:outline-none focus:border-sky-500"
              />
              <div className="relative w-full">
                <Autocomplete
                  placeholder="Search location"
                  value={locationFilter}
                  onChange={handleLocationChange}
                  onCompositionEndCapture={handleLocationSelected}
                  apiKey={process.env.NEXT_PUBLIC_ApiKey}
                  options={{
                    types: ["geocode", "establishment"],
                  }}
                  onPlaceSelected={(event) => {
                    dispatch(
                      fetchEventsData({
                        location: event.address_components[0].long_name
                          .toLocaleLowerCase()
                          .replace(" ", "+"),
                        organizationId: allOrganizations?.filter(
                          (organization) =>
                            organization?.name === organizationFilter
                        )[0]?.id,
                        search: searchStr,
                      })
                    );
                    setLocationFilter(event?.formatted_address || "");
                    setSelectedLocation(event?.formatted_address || "");
                  }}
                  className="outline-none border-1 border-solid border-bordergrey h-42 text-sm  leading-9 pl-42 pr-13 rounded-5 focus:outline-none focus:border-sky-500"
                />
                <div className="absolute top-13 left-16 flex items-center justify-center ">
                  <Image src={input_search} height={15} width={15} alt="none" />
                </div>
              </div>
              <div className="relative w-full">
                <input
                  className="border-1 border-solid border-bordergrey h-42 text-sm leading-9 pl-42 pr-13 rounded-5 focus:outline-none focus:border-sky-500"
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search by name, email"
                  autoComplete="off"
                  autoCorrect="off"
                  value={searchStr}
                  onChange={handleInputChange}
                />
                <div className="absolute top-13 left-16 flex items-center justify-center ">
                  <Image src={input_search} height={15} width={15} alt="none" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full overflow-auto min-h-420 max-h-[calc(100vh-258px)] pt-10">
            <table>
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, i) => (
                      <th
                        className="border-b-1 border-solid text-left border-bordergrey text-black-bold text py-8 pl-12 pr-80 w-153 text-sm font-bold whitespace-nowrap"
                        key={i}
                        {...column.getHeaderProps()}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                    <th className="border-b-1 border-solid text-left border-bordergrey text-bold text py-8 pl-12 pr-80 w-153 text-sm font-bold whitespace-nowrap">
                      Feature Event
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {!isLoading ? (
                  eventsList.length > 0 ? (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr key={i} {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  className="text-left border-b-1 border-solid border-bordergrey text-black-bold text-sm py-20 px-12 w-153  whitespace-nowrap"
                                  key={i}
                                  {...cell.getCellProps()}
                                >
                                  <span>{cell.render("Cell")}</span>
                                </td>
                              );
                            })}
                            <td className="border-b-1 border-solid border-bordergrey pl-40 ">
                              <Switch
                                checked={false}
                                disabled
                                uncheckedIcon={false}
                                height={20}
                                width={38}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <tr>
                        <td colSpan={11}>
                          <div className="flex flex-col mt-100 ml-290">
                            <div className="ml-80">
                              <CgSmileNeutral size={50} fill="black" />
                            </div>
                            <div className="font-bold text-25 whitespace-nowrap">
                              No records found
                            </div>
                          </div>
                        </td>
                      </tr>
                    </>
                  )
                ) : (
                  <tr>
                    <td colSpan={11}>
                      <OvelLoader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {eventsList?.length > 0 && (
          <div className="p-13 flex justify-end items-center gap-12">
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <button
                  className="disabled:opacity-60"
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  <div className="border border-solid border-bordergrey min-w-30 px-10 h-33 rounded-5 flex justify-center items-center">
                    <MdArrowForwardIos size={15} />
                  </div>
                </button>
              }
              forcePage={currentPageLocal - 1}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={totalPages}
              previousLabel={
                <button
                  className="disabled:opacity-60"
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  <div className="border border-solid border-bordergrey min-w-30 px-10 h-33 rounded-5 flex justify-center items-center">
                    <MdArrowBackIosNew size={15} />
                  </div>
                </button>
              }
              renderOnZeroPageCount={1}
              containerClassName={"flex justify-center gap-x-[24px]"}
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
export default Events;

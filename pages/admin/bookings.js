import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../../components/forms/CustomButton.js";
import Image from "next/image";
import eye from "../../assets/img/eye.svg";
import { useTable, usePagination } from "react-table";
import input_search from "../../assets/img/input_search.svg";
import SelectOption from "../../components/dropdown/SelectOption.js";
import DateRangeComp from "../../components/date-range/DateRangeComp.js";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsData } from "../../Redux/admin/bookingsSlice.js";
import OvelLoader from "../../components/Loader/OvelLoader.js";
import ReactPaginate from "react-paginate";
import closelineicon from "../../assets/img/closelineicon.svg";
import Link from "next/link.js";
import { CgSmileNeutral } from "react-icons/cg";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const genderOption = [
  { value: "Male", name: "Male" },
  { value: "Female", name: "Female" },
  { value: "Other", name: "Other" },
];
const Bookings = () => {
  const {
    isLoading,
    bookingsList,
    allOrganizations,
    currentPage,
    totalPages,
    totalRecords,
    limit,
  } = useSelector(({ bookingsSlice }) => bookingsSlice);
  const dispatch = useDispatch();

  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [searchStr, setSearchStr] = useState("");
  const [organizationFilter, setOrganizationFilter] = useState("");
  const [clearDate, setClearDate] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const handlePageClick = (selectedPageObj) => {
    setCurrentPageLocal(selectedPageObj.selected + 1);
  };

  const create = (id) => {
    setData(bookingsList[id]);
    setShow(!show);
  };

  const handleClick = () => {
    setSearchStr("");
    setOrganizationFilter("");
    setClearDate(true);
  };

  const handleDateChange = (value) => {
    setClearDate(value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleOrganizationChange = (event) => {
    setOrganizationFilter(event.name);
    dispatch(fetchBookingsData({ organizationId: event.value }));
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleInputChange = (event) => {
    setSearchStr(event.target.value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Ref No",
        id: "RefNo",
        accessor: function (row) {
          const { refNo } = row;
          return `${"#" + refNo}`;
        },
      },
      {
        Header: "User",
        id: "User",
        accessor: "user.firstName",
      },
      {
        Header: "Event Title",
        accessor: (row) => (
          <Link href={`/event/${row.event?.slug}`}>
            <a target="_blank">{row.event.name}</a>
          </Link>
        ),
      },
      {
        Header: "Organizer",
        id: "selectOrganization",
        accessor: "event.organization.name",
      },
      {
        Header: "Total Amount",
        accessor: function (row) {
          const { totalAmount } = row;
          if (totalAmount === 0) {
            return `${totalAmount.toLocaleString()}`;
          } else {
            return `${"RM" + totalAmount.toLocaleString()}`;
          }
        },
      },
      {
        Header: "Total Count",
        accessor: "totalCount",
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
      data: bookingsList,
      initialState: { pageSize: 20 },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    dispatch(
      fetchBookingsData({
        limit: pageSize,
        page: currentPageLocal,
        startDate: clearDate[0] ? new Date(clearDate[0]).toISOString() : "",
        endDate: clearDate[1] ? new Date(clearDate[1]).toISOString() : "",
        page: currentPageLocal,
        search: searchStr,
        organizationId: allOrganizations?.filter(
          (organization) => organization?.name === organizationFilter
        )[0]?.id,
      })
    );
  }, [pageSize, currentPageLocal, searchStr, organizationFilter, clearDate]);

  return (
    <div className="w-screen overflow-hidden p-14 bg-light-grey">
      <div className="p-10 bg-white">
        <div className="flex flex-row justify-between border-b-1 border-bordergrey p-10">
          <div className=" text-xl">Events</div>
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
            <div className="p-10 flex gap-5 ">
              <div className="w-full">
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
                style="w-full border-1 border-solid border-bordergrey min-h-42 min-w-200 rounded-5 px-12 text-sm text-black-bold  leading-9 focus:outline-none focus:border-sky-500"
              />
              <div className="relative w-full">
                <input
                  className="border-1 border-solid border-bordergrey h-42 text-sm leading-9 pl-42 pr-13 rounded-5 focus:outline-none focus:border-sky-500"
                  id="search"
                  name="search"
                  type="text"
                  placeholder="Search by refNO, event"
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
                  <tr
                    className=" "
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                  >
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
                      Actions
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {!isLoading ? (
                  bookingsList.length > 0 ? (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr
                            className="bg-[#f8f9fa"
                            key={i}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  className="text-left border-b-1 border-solid border-bordergrey text-black-bold text-sm py-20 px-12 w-153  whitespace-nowrap"
                                  key={i}
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                            <td className="border-b-1 border-solid border-bordergrey px-30">
                              <button onClick={() => create(row.id)}>
                                <Image
                                  src={eye}
                                  height={20}
                                  width={20}
                                  alt="blank"
                                />
                              </button>
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
            {show && (
              <div className="w-screen min-h-screen flex justify-center items-center bg-light absolute top-0 left-0">
                <div className="flex rounded-5 bg-white z-10 p-22">
                  <div className="flex flex-col">
                    <div className="flex justify-between mb-20 items-end">
                      <div className="text-20 font-bold">
                        Transaction details
                      </div>
                      <div>
                        <Image
                          onClick={create}
                          src={closelineicon}
                          height={16}
                          width={16}
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="border-t text-base">
                        <div className="mt-20">Order id :{data?.refNo}</div>
                        <div>Transaction id :</div>
                        <div>Transaction date :{data?.createdAt}</div>
                        <div>Booked by:Super Admin</div>
                      </div>
                      <table>
                        <thead>
                          <tr className="border-b text-left text-[#495057] text-base">
                            <th className="py-20 px-12">Ticket type</th>
                            <th className=" px-12">Price</th>
                            <th className=" px-12">Quantity</th>
                            <th className=" px-12">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.bookedTickets?.map((d) => {
                            return (
                              <>
                                {" "}
                                <tr className="border-b  text-base">
                                  <td className="py-20 px-12">
                                    {d?.eventTicket?.name}
                                  </td>
                                  <td className=" px-12">
                                    RM{d?.eventTicket?.price}.00
                                  </td>
                                  <td className=" px-12">{d?.quantity}</td>
                                  <td className=" px-12">
                                    RM{d?.totalPrice}.00
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          <tr className="text-25 font-semibold">
                            <td className="py-20 px-12">Total</td>
                            <td className="px-12">
                              RM{data?.totalAmount.toLocaleString()}.00
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {bookingsList?.length > 0 && (
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
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: { token: token },
  };
}
export default Bookings;

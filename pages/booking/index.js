import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import { BiSearch } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";
// import buttonSearch from "../../assets/img/book_user.svg";
import buttonSearch from "../../assets/img/footer_logo.svg";
import eye from "../../assets/img/dots.svg";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import { matchSorter } from "match-sorter";
import { useDispatch, useSelector } from "react-redux";
import { myBookingApi } from "../../Redux/bookmarked/myyBooking";
import moment from "moment";
import CustomButton from "../../components/forms/CustomButton";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import { getAccessToken, getRole } from "../../utils/helper";
import router from "next/router";
import { CheckToken } from "../../components/checktoken";
const filters = ["Orderid"];
const Index = () => {
  const token = getAccessToken();
  const role = getRole();

  const [filter, setFilter] = useState("");
  const columns = React.useMemo(
    () => [
      {
        Header: "Order id",
        accessor: "refNo",
        width: "w-[255px]",
      },
      {
        Header: "Event",
        accessor: function (row) {
          return (
            <div className="flex gap-30">
              <div
                className="rounded-full relative"
                style={{ height: "35px", width: "35px" }}
              >
                <Image
                  className="rounded-full"
                  src={row?.event?.coverImage || buttonSearch}
                  height={56}
                  width={56}
                  alt="test"
                />
              </div>
              <div className="min-w-50 max-w-352 flex flex-col text-ellipsis overflow-hidden whitespace-nowrap">
                <p className="font-medium text-sm text-black">
                  {row?.event?.name}
                </p>
                <p className="font-normal text-xs text-black">
                  {row?.event?.parentCategory?.name}
                </p>
                <p className="font-normal text-xs text-black">
                  {moment(row?.createdAt).format("DD/MM/YYYY HH:mm")}-
                  {moment(row?.event.endDate).format("DD/MM/YYYY HH:mm")}
                </p>
              </div>
            </div>
          );
        },
      },

      {
        Header: "Price",
        accessor: function (row) {
          const { totalAmount } = row;
          // const data = totalAmount.toFixed(2);
          return `RM${totalAmount.toLocaleString() + ".00"}`;
        },
        width: "w-[255px]",
      },

      {
        Header: "Action",
        accessor: (row) => {
          return (
            <div className="">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                    <HiDotsVertical fill="black" size={15} />
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
                  <Menu.Items className="absolute w-125 right-15 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-5 py-5 ">
                      <Menu.Item disabled={row.status === "DRAFT"}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-bg-blue text-white"
                                : "text-gray-900 disabled:bg-black-lightgray disabled:text-black"
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-5`}
                          >
                            <Link href={`/booking/${row?.refNo}`}>
                              <a
                                className="group flex w-full items-center rounded-md px-2 py-2 text-sm gap-5"
                                target="_blank"
                              >
                                View Order
                              </a>
                            </Link>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          );
        },
      },
    ],
    []
  );

  const { isLoading, bookingData, currenPage, totalPages, notFoound } =
    useSelector((state) => ({
      isLoading: state.myBookingSlice.isLoading,
      bookingData: state.myBookingSlice.bookingData,
      currenPage: state.myBookingSlice.page,
      totalPages: state.myBookingSlice.totalPages,
      notFoound: state.myBookingSlice.notFoound,
    }));

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const submitSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(myBookingApi({ search: filter }));
    }
  };

  const ourGlobalFilterFunction = useCallback((rows, ids, query) => {
    return matchSorter(rows, query, {
      keys: filters.map((columnName) => `values.${columnName}`),
    });
  }, []);

  const {
    headerGroups,
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
      data: bookingData,
      globalFilter: ourGlobalFilterFunction,
    },
    useGlobalFilter,
    usePagination
  );

  const loadData = () => {
    setPageSize(100);
    dispatch(myBookingApi({ page: currenPage + 1 }));
  };
  useEffect(() => {
    dispatch(myBookingApi({ search: filter }));
  }, [filter]);

  return (
    <div className="mx-auto max-w-2xl w-full">
      <CheckToken />
      <div className="sticky top-0 z-50">
        <HeaderTransparentevent
          headerStyle="bg-bg-blue relative"
          textStyle="text-black"
        />
      </div>

      <div className=" overflow-hidden p-16 bg-light-grey">
        <div className="p-10 bg-white">
          <div className="flex flex-row justify-between  p-10">
            <div className=" text-xl">My Bookings</div>
          </div>
          <div className="relative w-full border-1 border-solid border-bordergrey flex items-center max-w-[413px] pl-13 gap-4">
            <BiSearch fill="#23C5FF" className="px-1" size={20} />
            <input
              className=" h-42 text-sm leading-9  pr-13 rounded-5 focus:outline-none focus:border-sky-500 w-full"
              id="search"
              name="search"
              type="text"
              placeholder="Search bookings"
              autoComplete="off"
              autoCorrect="off"
              value={filter}
              onChange={handleInputChange}
              onKeyDown={submitSearch}
            />
          </div>
          <div className="p-10">
            <div className="w-full overflow-auto  pt-10">
              <table className="w-full">
                <thead>
                  {headerGroups?.map((headerGroup, i) => (
                    <tr
                      className=" "
                      key={i}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers?.map((column, i) => (
                        <th
                          className={`border-b-1 border-solid text-left border-bordergrey text-black-bold text py-8 pl-12 pr-80 ${column.width} text-sm font-bold whitespace-nowrap`}
                          key={i}
                          {...column.getHeaderProps()}
                        >
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {page?.map((row, i) => {
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
                        {/* <td className="border-b-1 border-solid border-bordergrey px-30 ">
                          <button>
                            <Image
                              src={eye}
                              height={20}
                              width={20}
                              alt="blank"
                              className="rotate-90"
                            />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center ">
            {totalPages > 2 && currenPage < totalPages ? (
              <CustomButton
                disabled={isLoading}
                type="submit"
                buttonStyle={
                  "text-white flex gap-10 items-center justify-center rounded-5 text-base disabled:bg-dark-blue  p-10  bg-blue-dark "
                }
                onClick={loadData}
              >
                Load More
              </CustomButton>
            ) : (
              <button
                className="text-white flex gap-10 items-center justify-center rounded-5 text-base disabled:bg-dark-blue  p-10  bg-blue-dark "
                disabled
              >
                Load More
              </button>
            )}
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

export default Index;

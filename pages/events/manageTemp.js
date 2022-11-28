import React, {
  useCallback,
  useEffect,
  useState,
  Fragment,
  useRef,
} from "react";
import moment from "moment";
import Footer from "../../components/footer/Footer";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import headerLogo from "../../assets/img/header_logo.svg";
import { useRouter } from "next/router";
import { useTable, usePagination } from "react-table";
import Link from "next/link";
import Image from "next/image";
import input_search from "../../assets/img/input_search.svg";
import { useSelector, useDispatch } from "react-redux";
import { createEventType } from "../../Redux/event/createEventSlice";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoRadioButtonOn } from "react-icons/io5";
import { CgSmileNeutral } from "react-icons/cg";
import { HiDotsVertical } from "react-icons/hi";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoCopy, IoEye } from "react-icons/io5";
import { monthNames } from "../../utils/commonHelper";
import leftPagination from "../../assets/img/leftpagination.svg";
import rightPagination from "../../assets/img/rightpagination.svg";
import ReactPaginate from "react-paginate";
import {
  deleteEventData,
  fetchManageEventData,
  setDeleteShowModal,
} from "../../Redux/event/manageEventSlice";
import { Oval } from "react-loader-spinner";
import SelectOption from "../../components/dropdown/SelectOption";
import { Menu, Transition, Dialog } from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";
import DeleteEventModal from "../../components/modal/DeleteEventModal";
import SelectOptionClear from "../../components/dropdown/SelectOptionClear";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const eventStatusOptions = [
  { name: "Published", value: "PUBLISHED" },
  { name: "Draft", value: "DRAFT" },
  { name: "Completed", value: "COMPLETED" },
  { name: "Canceled", value: "CANCELED" },
];
const ManageTemp = (props) => {
  const [filter, setFilter] = useState();
  const [deleteById, setDeleteById] = useState();
  const [eventByName, setEventByName] = useState();
  const [eventByStatus, setEventByStatus] = useState();
  const [currentPageLocal, setCurrentPageLocal] = useState(1);

  const handleInputChange = (event) => {
    setEventByName(event.target.value);
  };
  const handlePageClick = (event) => {
    setCurrentPageLocal(event.selected + 1);
  };

  const handleDropDownChange = (event) => {
    setEventByStatus(event.value);
  };

  const ourGlobalFilterFunction = useCallback((rows, ids, query) => {
    return matchSorter(rows, query, {
      keys: filters.map((columnName) => `values.${columnName}`),
    });
  }, []);
  const dispatch = useDispatch();
  const { replace } = useRouter();
  const { type } = useSelector((state) => ({
    type: state.createEventSlice.type,
  }));
  const { eventList, totalPages, isLoading, deleteIsLoading, deleteShowModal } =
    useSelector((state) => ({
      eventList: state.manageEventSlice.eventList,
      totalPages: state.manageEventSlice.totalPages,
      isLoading: state.manageEventSlice.isLoading,
      deleteIsLoading: state.manageEventSlice.deleteIsLoading,
      deleteShowModal: state.manageEventSlice.deleteShowModal,
    }));

  const handleProgressCount = (data) => {
    return data?.length > 0
      ? data
          ?.map((data) => ({
            available: data.availableQuantity,
            total: data.quantity,
            status: data.status,
          }))
          .reduce((a, b) => {
            return {
              available:
                (a.status === "ACTIVE" ? a.available : 0) +
                (b.status === "ACTIVE" ? b.available : 0),
              total:
                (a.status === "ACTIVE" ? a.total : a.total - a.available) +
                (b.status === "ACTIVE" ? b.total : b.total - b.available),
              status: "ACTIVE",
            };
          })
      : {
          total: 0,
          available: 0,
        };
  };

  const progressBar = (data) => {
    const a = handleProgressCount(data);
    return 100 - (a.available / a.total) * 100;
  };

  const formatDateTime = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm");
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Events",
        id: "eventDetails",
        accessor: function (row) {
          return (
            <div className="flex gap-30">
              <div className="bg-white rounded-5 min-w-50 flex flex-col items-center justify-center">
                <p className="font-medium text-base text-center text-black">
                  {monthNames[new Date(row?.endDate).getMonth()]}
                </p>
                <p className="font-medium text-base text-center text-black">
                  {new Date(row?.endDate).getDate()}
                </p>
              </div>
              <div className="rounded-full h-56 w-56 overflow-hidden relative">
                <Image
                  src={row?.coverImage ? row?.coverImage : headerLogo}
                  layout="fill"
                  alt="test"
                />
              </div>
              <div className="min-w-50 max-w-352 flex flex-col text-ellipsis overflow-hidden whitespace-nowrap">
                <p className="font-medium text-sm text-black">{row.name}</p>
                <p className="font-normal text-xs text-black">
                  {row.category?.name}
                </p>
                <p className="font-normal text-xs text-black">
                  {row?.startDate && row?.endDate
                    ? `${formatDateTime(row?.startDate)}` +
                      "-" +
                      `${formatDateTime(row?.endDate)}`
                    : "- -"}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        Header: "Sold",
        id: "ticketsAvailable",
        accessor: (row) => {
          return (
            <div className="h-56 w-56">
              <CircularProgressbar
                value={progressBar(row?.EventTicket)}
                text={
                  `${
                    handleProgressCount(row?.EventTicket)?.total -
                    handleProgressCount(row?.EventTicket)?.available
                  }` +
                  "/" +
                  `${handleProgressCount(row?.EventTicket)?.total}`
                }
              />
            </div>
          );
        },
      },
      {
        Header: "Ticket Status",
        id: "ticketStatus",
        accessor: (row) => {
          return (
            <div className="flex gap-15 items-center">
              <div
                className={` ${
                  row.EventTicket.length !== 0
                    ? progressBar(row.EventTicket) < 100
                      ? "text-[#12DF1A]"
                      : "text-orange-600"
                    : "text-red-600"
                }`}
              >
                <IoRadioButtonOn size={15} />
              </div>
              <p className="font-medium text-sm text-black whitespace-nowrap">
                {row.EventTicket.length !== 0
                  ? progressBar(row.EventTicket) < 100
                    ? "On sale"
                    : "Sold out"
                  : "No Tickets"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Event Status",
        id: "eventStatus",
        accessor: (row) => {
          return (
            <div className="rounded-25 bg-[#70f3b533] px-28 py-3 ">
              <p className={`font-medium text-sm text-[#11C003] text-center`}>
                {row.status}
              </p>
            </div>
          );
        },
      },
      {
        Header: "",
        id: "eventId",
        accessor: (row) => {
          return (
            <div className="flex items-center justify-center">
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
                  <Menu.Items className="absolute w-200 right-15 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-10 py-10 ">
                      <Menu.Item disabled={row.status === "DRAFT"}>
                        {({ active }) => (
                          <button
                            disabled={row.status === "DRAFT"}
                            className={`${
                              active
                                ? "bg-bg-blue text-white"
                                : "text-gray-900 disabled:bg-black-lightgray disabled:text-black disabled:cursor-not-allowed"
                            } group flex w-full items-center rounded-md px-5 py-5 text-sm gap-5`}
                          >
                            <Link href={`/event/${row?.slug}`}>
                              <a
                                disabled={row.status === "DRAFT"}
                                className="group flex w-full items-center rounded-md px-2 py-2 text-sm gap-5 pointer-events-none"
                                target="_blank"
                              >
                                {active ? (
                                  <>
                                    <IoEye size={21} />
                                  </>
                                ) : (
                                  <>
                                    <IoEye size={21} />
                                  </>
                                )}
                                View
                              </a>
                            </Link>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            disabled={row.status === "CANCELED"}
                            className={`${
                              active
                                ? "bg-bg-blue text-white"
                                : "text-gray-900 disabled:bg-black-lightgray disabled:text-black disabled:cursor-not-allowed"
                            } group flex w-full items-center rounded-md px-5 py-5 text-sm gap-7`}
                          >
                            <Link href={`/event/edit/${row.id}`}>
                              <a
                                className="flex gap-8 w-full pointer-events-none"
                                disabled={row.status === "CANCELED"}
                              >
                                {active ? (
                                  <>
                                    <MdEdit size={22} />
                                  </>
                                ) : (
                                  <>
                                    <MdEdit size={22} />
                                  </>
                                )}
                                Edit
                              </a>
                            </Link>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              toast.success("Copied");
                              navigator.clipboard.writeText(
                                `${process.env.NEXT_PUBLIC_WEB_APP_URL}/event/${row.slug}`
                              );
                            }}
                            disabled={row.status === "DRAFT"}
                            className={`${
                              active
                                ? "bg-bg-blue text-white"
                                : "text-gray-900 disabled:bg-black-lightgray disabled:text-black disabled:cursor-not-allowed"
                            } group flex w-full items-center rounded-md px-5 py-5 text-sm gap-10`}
                          >
                            {active ? (
                              <>
                                <IoCopy size={20} />
                              </>
                            ) : (
                              <>
                                <IoCopy size={20} />
                              </>
                            )}
                            Copy URL
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-10 py-10">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              dispatch(setDeleteShowModal(true));
                              setDeleteById(row.id);
                            }}
                            disabled={
                              row.status === "CANCELED" ||
                              row.status === "COMPLETED" ||
                              row.EventTicket.filter(
                                (ticket) =>
                                  ticket.availableQuantity < ticket.quantity
                              ).length > 0
                            }
                            className={`${
                              active
                                ? "bg-bg-blue text-white"
                                : "text-gray-900 disabled:bg-black-lightgray disabled:text-black disabled:cursor-not-allowed"
                            } group flex w-full items-center rounded-md px-5 py-5 text-sm gap-5`}
                          >
                            {active ? (
                              <>
                                <MdDelete size={25} />
                              </>
                            ) : (
                              <>
                                <MdDelete size={25} />
                              </>
                            )}
                            Delete
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
      data: eventList,
      initialState: { pageSize: 4 },
      globalFilter: ourGlobalFilterFunction,
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    if (currentPageLocal === 1) {
      dispatch(
        fetchManageEventData({
          search: eventByName,
          status: eventByStatus,
          page: currentPageLocal,
        })
      );
    } else setCurrentPageLocal(1);
  }, [totalPages, eventByName, eventByStatus]);

  useEffect(() => {
    dispatch(
      fetchManageEventData({
        search: eventByName,
        status: eventByStatus,
        page: currentPageLocal,
      })
    );
  }, [currentPageLocal]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <HeaderTransparentevent
        headerStyle="bg-bg-blue fixed"
        textStyle="text-black"
      />
      <div className="flex justify-between pt-100 px-100 ms:px-20 sm:px-20 md:px-30 lg:px-40 xl:px-100 xxl:px-100">
        <div className="">
          <p className="font-600 text-30 leading-45 text-black">Events</p>
        </div>
        <div className="flex items-center">
          <Link href="/events/create">
            <a>
              <div className="text-black whitespace-normal flex gap-10 items-center justify-center rounded-5 text-base px-12 py-3 w-full cursor-pointer xxl:px-30 xxl:py-7 xl:px-30 xl:py-7 lg:px-30 lg:py-7 md:px-20 md:py-7 sm:px-15 sm:py-7 ms:px-12 ms:py-7 bg-blue-bgcomman border-none">
                Create event
              </div>
            </a>
          </Link>
        </div>
      </div>
      <div className="flex justify-between pt-40 px-100 ms:px-20 sm:px-20 md:px-30 lg:px-40 xl:px-100 xxl:px-100">
        <div className="flex w-full flex-col gap-15 lg:flex-row lg:gap-35 xl:flex-row xl:gap-35 xxl:flex-row xxl:gap-35">
          <div className="flex flex-col">
            <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
              Event Title
            </p>
            <div className="relative mt-5 w-full">
              <input
                className="border-1 border-solid w-full lg:max-w-307 border-bordergrey h-38 text-sm leading-9 pl-42 pr-13 rounded-5 focus:outline-none focus:border-sky-500"
                id="search"
                name="search"
                type="text"
                placeholder="Search by name, email"
                autoComplete="off"
                autoCorrect="off"
                onChange={handleInputChange}
              />
              <div className="absolute top-10 left-16 flex items-center justify-center ">
                <Image src={input_search} height={17} width={17} alt="none" />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
              Status
            </p>
            <div className="relative mt-5 w-full">
              <SelectOptionClear
                placeholder="Pick one"
                option={eventStatusOptions}
                value={eventByStatus}
                setClear={setEventByStatus}
                changeHandler={handleDropDownChange}
                style="w-full border-1 border-solid border-bordergrey min-h-30 min-w-200 rounded-5 px-12 text-sm  leading-9 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-100 ms:px-20 sm:px-20 md:px-30 lg:px-40 xl:px-100 xxl:px-100">
        <div className="w-full overflow-auto min-h-[680px] max-h-[calc(100vh-258px)]">
          {/* {eventList?.length > 0 ? ( */}
          <table className="border-separate border-spacing-y-40 w-full">
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
                </tr>
              ))}
            </thead>
            {!isLoading ? (
              <tbody>
                {eventList.length > 0 ? (
                  <>
                    {page.map((row, i) => {
                      prepareRow(row);
                      return (
                        <tr
                          className="py-39 rounded-5 shadow-lg hover:shadow-cyan-500/20"
                          key={i}
                          {...row.getRowProps()}
                        >
                          {row.cells.map((cell) => {
                            return (
                              <td
                                key={i}
                                {...cell.getCellProps()}
                                className={`text-left my-20 border-bordergrey first:rounded-tl-5 first:rounded-bl-5 last:rounded-tr-5 last:rounded-br-5 text-black-bold text-sm py-20 px-12 w-153 whitespace-nowrap 
                                   bg-[#87dfff33]`}
                              >
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <tr className="w-screen h-screen max-h-[680px] flex justify-center items-center">
                      <td className="flex flex-col gap-15">
                        <div className="flex justify-center items-center">
                          <CgSmileNeutral size={50} fill="black" />
                        </div>
                        <p className="font-bold text-25 text-center">
                          No records found
                        </p>
                        <p className="font-normal text-18 text-center">
                          Try changing filters or create new event
                        </p>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            ) : (
              <tbody>
                <tr className="w-screen h-screen max-h-[680px] flex justify-center items-center">
                  <td>
                    <Oval
                      color="#ADD8E6"
                      height={50}
                      width={50}
                      secondaryColor="#23c5ff"
                      strokeWidth={5}
                      strokeWidthSecondary={5}
                    />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      {eventList?.length > 0 && (
        <div className="flex justify-center pb-20 items-center gap-12">
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <button
                className="disabled:opacity-60"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <div className="border border-solid disabled:bg-black-medium disabled:cursor-not-allowed border-bordergrey min-w-30 px-10 h-35 rounded-5 flex justify-center items-center">
                  <MdArrowForwardIos size={15} />
                </div>
              </button>
            }
            forcePage={currentPageLocal - 1}
            onPageChange={handlePageClick}
            pageRangeDisplayed={1}
            pageCount={totalPages}
            previousLabel={
              <button
                className="disabled:opacity-60"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <div className="border border-solid border-bordergrey min-w-30 px-10 h-35 rounded-5 flex justify-center items-center">
                  <MdArrowBackIosNew size={15} />
                </div>
              </button>
            }
            renderOnZeroPageCount={1}
            containerClassName={"flex py-[64px] justify-center gap-x-[24px]"}
            pageClassName={
              "flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
            }
            previousClassName={
              "prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
            }
            nextClassName={
              "next-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB]"
            }
            pageLinkClassName={"flex items-center justify-center h-full w-full"}
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
      <Footer />
      <div>
        <Transition appear show={deleteShowModal} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => {
              dispatch(setDeleteShowModal(false));
              setDeleteById(null);
            }}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-300 p-20 transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Are you sure you delete this event ?
                    </Dialog.Title>

                    <div className="mt-20 flex gap-10 justify-end">
                      <button
                        disabled={deleteIsLoading}
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-bgcomman disabled:opacity-3 disabled:bg-dark-blue disabled:cursor-not-allowed px-6 py-4 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          dispatch(deleteEventData({ eventId: deleteById }));
                        }}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border-1 border-solid border-light-blue px-6 py-4 text-sm font-medium disabled:cursor-not-allowed text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => {
                          dispatch(setDeleteShowModal(false));
                          setDeleteById(null);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};
export async function getServerSideProps({ req }) {
  const { token, role } = req.cookies;
  if (token && role === "ORGANIZATION") {
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
export default ManageTemp;

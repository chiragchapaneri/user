import React, { Fragment, useEffect, useMemo, useState } from "react";
import CustomButton from "../../components/forms/CustomButton.js";
import Image from "next/image";
import edit from "../../assets/img/edit.svg";
import deleteicon from "../../assets/img/delete.svg";
import { Toaster } from "react-hot-toast";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { CgSmileNeutral } from "react-icons/cg";

import {
  useTable,
  usePagination,
  userFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
} from "react-table";
import CreateOrganizationForm from "../../components/adminpanel/CreateOrganizationForm.js";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrganizationData,
  setShowForm,
  fetchEventsData,
  fetchOrganizationData,
} from "../../Redux/admin/organizationSlice.js";
import OvelLoader from "../../components/Loader/OvelLoader.js";
import ReactPaginate from "react-paginate";
import { Dialog, Transition } from "@headlessui/react";

const Organization = () => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [deleteById, setDeleteById] = useState();
  const [show, setShow] = useState(false);
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [searchStr, setSearchStr] = useState("");
  const [formdata, setFormData] = useState(null);

  const handleInputChange = (event) => {
    setSearchStr(event.target.value);
    if (currentPage !== 1) setCurrentPageLocal(1);
  };

  const handleDelete = (id) => {
    setIsOpen(true);
    setDeleteById(id);
  };
  const {
    isLoading,
    showForm,
    organizationList,
    currentPage,
    totalPages,
    totalRecords,
    limit,
    eventsList,
  } = useSelector(({ organizationSlice }) => organizationSlice);

  const handlePageClick = (selectedPageObj) => {
    setCurrentPageLocal(selectedPageObj.selected + 1);
  };

  const create = (organizationData) => {
    if (organizationData)
      setFormData({
        data: organizationList.filter(
          (organization) => organization.id === organizationData.original.id
        )[0],
        id: organizationData.original.id,
      });
    dispatch(setShowForm(true));
    dispatch(fetchEventsData());
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "users[0].firstName",
      },
      {
        Header: "Last Name",
        accessor: "users[0].lastName",
      },
      {
        Header: "Phone",
        accessor: function (row) {
          const { phone } = row;
          return `${"+60" + " " + phone.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2 $3")}`
        }
      },
      {
        Header: "Email",
        accessor: "users[0].email",
      },
      {
        Header: "Company Name",
        accessor: "name",
      },
      {
        Header: "Company Reg. No.",
        accessor: "coRegNo",
      },
      {
        Header: "PIC(Name)",
        accessor: "picName",
      },
      {
        Header: "PIC(Contact)",
        accessor: function (row) {
          const { picContact } = row;
          return `${"+60" + " " + picContact.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2 $3")}`
        }
      },
      {
        Header: "PIC(Email)",
        accessor: "picEmail",
      },
      {
        Header: "Commission",
        accessor: "commission",
      },
      {
        Header: "Payment Terms",
        accessor: "paymentTerms",
      },
    ],
    []
  );
  const {
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    rows,
    prepareRow,
    pageOptions,
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
    state: { pageIndex, pageSize },
    setPageSize,
  } = useTable(
    {
      columns,
      data: organizationList,
      initialState: { pageSize: 20 },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => { }, [organizationList, eventsList]);
  useEffect(() => {
    if (!showForm) setFormData(null);
  }, [showForm]);

  useEffect(() => {
    dispatch(
      fetchOrganizationData({
        limit: pageSize,
        page: currentPageLocal,
        search: searchStr,
      })
    );
  }, [pageSize, currentPageLocal, searchStr]);

  return (
    <div className="w-screen overflow-hidden p-14 bg-light-grey">
      <div className="p-10 bg-white">
        <div className="flex flex-row justify-between border-b-1 border-bordergrey p-10">
          <Toaster />
          <div className=" text-xl">Organization</div>
          <CustomButton
            onClick={() => create()}
            buttonStyle="hidden md:block md:h-30 lg:h-35 text-solid-blue md:text-14 lg:text-base leading-6 font-medium rounded-5 lg:px-26 md:px-16 box-border backdrop-blur-42 bg-blue-bgcomman"
          >
            Create
          </CustomButton>
          {showForm && (
            <CreateOrganizationForm setShow={setShow} formdata={formdata} />
          )}
        </div>
        <div className="p-10 ">
          <div className="flex items-center justify-end">
            <input
              className="focus:outline-none focus:border-sky-500  border-1 border-solid border-bordergrey h-35 text-sm px-12 rounded-5"
              id="search"
              name="search"
              type="text"
              placeholder="Search"
              autoComplete="off"
              autoCorrect="off"
              value={searchStr}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full overflow-auto min-h-420 max-h-[calc(100vh-258px)]">
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
                      Action
                    </th>
                  </tr>
                ))}
              </thead>
              <tbody>
                {!isLoading ? (
                  organizationList.length > 0 ? (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr key={i} {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td
                                  className="text-left border-b-1 border-solid border-bordergrey text-black-bold text-sm py-20 px-12 w-153 whitespace-nowrap"
                                  key={i}
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                            <td className="border-b-1 border-solid border-bordergrey">
                              <button onClick={() => create(row)}>
                                <Image
                                  src={edit}
                                  height={20}
                                  width={20}
                                  alt="blank"
                                />
                              </button>
                              <button
                                onClick={() => handleDelete(row.original.id)}
                              >
                                <Image
                                  src={deleteicon}
                                  height={20}
                                  width={50}
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
          </div>
        </div>
        <div>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => {
                setIsOpen(false);
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
                        Are sure you want to delete organization ?
                      </Dialog.Title>

                      <div className="mt-20 flex gap-10 justify-end">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-bgcomman disabled:opacity-3 px-6 py-4 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            dispatch(
                              deleteOrganizationData({ id: deleteById })
                            );
                            setIsOpen(false);
                          }}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border-1 border-solid border-light-blue px-6 py-4 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            setIsOpen(false);
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
        {organizationList?.length > 0 && (
          <div className="p-28 flex justify-end items-center gap-12">
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
export default Organization;

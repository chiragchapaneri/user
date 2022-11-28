import React, { useCallback, useEffect, useState } from "react";
import CustomButton from "../../components/forms/CustomButton.js";
import Image from "next/image";
import { useTable, usePagination, useFilters } from "react-table";
import input_search from "../../assets/img/input_search.svg";
import SelectOption from "../../components/dropdown/SelectOption.js";
import { useGlobalFilter } from "react-table/dist/react-table.development.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomersData } from "../../Redux/admin/customersSlice.js";
import Autocomplete from "react-google-autocomplete";
import OvelLoader from "../../components/Loader/OvelLoader.js";
import ReactPaginate from "react-paginate";
import { CgSmileNeutral } from "react-icons/cg";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const genderOption = [
  { value: "Male", name: "Male" },
  { value: "Female", name: "Female" },
  { value: "Other", name: "Other" },
];
const Customers = () => {
  const {
    isLoading,
    customersList,
    currentPage,
    totalPages,
    totalRecords,
    limit,
  } = useSelector(({ customersSlice }) => customersSlice);
  const dispatch = useDispatch();

  const [genderFilter, setGenderFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [currentPageLocal, setCurrentPageLocal] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handlePageClick = (selectedPageObj) => {
    setCurrentPageLocal(selectedPageObj.selected + 1);
  };

  const handleClick = () => {
    setGenderFilter("");
    setSearchStr("");
    setSelectedLocation("");
    setLocationFilter("");
  };

  const handleGenderChange = (event) => {
    setGenderFilter(event.value);
    dispatch(fetchCustomersData({ gender: event.value.toUpperCase() }));
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
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Location",
        accessor: function (row) {
          const { locationCity, locationCountry, locationState } = row;
          return locationCity || locationCountry || locationState
            ? `${locationCity[0]?.toUpperCase() + locationCity?.substring(1)},
                             ${
                               locationState[0]?.toUpperCase() +
                               locationState?.substring(1)
                             },
                              ${
                                locationCountry[0]?.toUpperCase() +
                                locationCountry?.substring(1)
                              }`
            : "";
        },
      },
      {
        Header: " Registered On",
        accessor: function (row) {
          const createdAtDate = new Date(row.createdAt);
          return createdAtDate.toLocaleDateString("en-GB");
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
      data: customersList,
      initialState: { pageSize: 20 },
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {}, [customersList]);

  useEffect(() => {
    dispatch(
      fetchCustomersData({
        limit: pageSize,
        page: currentPageLocal,
        gender: genderFilter.toUpperCase(),
        location: selectedLocation
          .split(",")[0]
          .toLocaleLowerCase()
          .replace(" ", "+"),
        search: searchStr,
      })
    );
  }, [pageSize, currentPageLocal, searchStr, genderFilter, selectedLocation]);

  return (
    <div className="w-screen overflow-hidden p-14 bg-light-grey">
      <div className="p-10 bg-white">
        <div className="flex flex-row justify-between border-b-1 border-bordergrey  p-10">
          <div className=" text-xl">Customers</div>
        </div>
        <div className="p-10">
          <div className="flex items-center justify-between">
            <div>
              <CustomButton
                onClick={handleClick}
                buttonStyle="hidden md:block md:h-30 lg:h-35 text-solid-blue md:text-14 lg:text-base leading-6 font-medium rounded-5  lg:px-26 md:px-16 box-border backdrop-blur-42 bg-blue-bgcomman "
              >
                Clear Filters
              </CustomButton>
            </div>
            <div className="p-10 flex gap-5">
              <SelectOption
                placeholder="Search gender"
                value={genderFilter}
                option={genderOption}
                changeHandler={handleGenderChange}
                style="w-full border-1 border-solid border-bordergrey min-h-42 min-w-200 rounded-5 px-12 text-sm  leading-9 focus:outline-none focus:border-sky-500"
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
                      fetchCustomersData({
                        location: event?.address_components[0].long_name
                          .toLocaleLowerCase()
                          .replace(" ", "+"),
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
                  </tr>
                ))}
              </thead>
              <tbody>
                {!isLoading ? (
                  customersList.length > 0 ? (
                    <>
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr key={i} {...row.getRowProps()}>
                            {row.cells.map((cell, id) => {
                              return (
                                <td
                                  className="text-left border-b-1 border-solid border-bordergrey text-black-bold text-sm py-20 px-12 w-153  whitespace-nowrap"
                                  key={id}
                                  {...cell.getCellProps()}
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
        {customersList?.length > 0 && (
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
export default Customers;

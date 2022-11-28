import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { HiArrowLeft } from "react-icons/hi";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { usePagination, useTable } from "react-table";
import { CheckToken } from "../../components/checktoken";
import HeaderTransparentevent from "../../components/header/HeaderTransparentevent";
import { orderDetailsApi } from "../../Redux/order/orderSlice";
import { jsPDF } from "jspdf";
import buttonSearch from "../../assets/img/footer_logo.svg";

const Orderpage = ({ id }) => {
  const { replace, push } = useRouter();

  const downloadTicket = (id) => {
    const input = document.getElementById("imagelogo");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "px",
      format: "letter",
    });
    pdf.addImage(
      "https://res.cloudinary.com/chirag12/image/upload/v1669362249/logoyad_n0ltmb.png",
      "JPEG",
      10,
      20,
      100,
      100
    );
    pdf.addImage(id, "JPEG", 150, 160, 114, 204);

    let width = 1000;
    // pdf
    //   .html(input, {
    //     autoPaging: "text",
    //     html2canvas: { scale: 0.57 },
    //     margin: [40, 40, 40, 40],
    //     width: width,
    //     windowWidth: width,

    //     fontFaces: [
    //       {
    //         family: "sans-serif",
    //         style: "normal",
    //       },
    //     ],
    //   })
    //   .then(() => {
    //     pdf.save("invoice.pdf");
    //   });
    pdf.save();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Ticket Type",
        accessor: "eventTicket.name",
        width: "w-[255px]",
      },

      {
        Header: "Price",
        accessor: function (row) {
          const { eventTicket } = row;
          return `RM${eventTicket.price.toFixed(2)}`;
        },
        width: "w-[255px]",
      },

      {
        Header: "Quantity",
        accessor: "quantity",
        width: "w-[255px]",
      },
      {
        Header: "Total",

        accessor: function (row) {
          const { totalPrice } = row;
          return `RM${totalPrice.toFixed(2)}`;
        },
      },
    ],
    []
  );

  const { orderData, isLoading, tableOrderData } = useSelector((state) => ({
    orderData: state.orderSlice.orderData,
    tableOrderData: state.orderSlice.tableOrderData,
    isLoading: state.orderSlice.isLoading,
  }));

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
      data: tableOrderData,
    },
    usePagination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetailsApi(id));
  }, []);
  return tableOrderData.length > 0 ? (
    <div className="mx-auto max-w-2xl w-full">
      <div className="sticky top-0 z-50">
        <HeaderTransparentevent
          headerStyle="bg-bg-blue relative"
          textStyle="text-black"
        />
      </div>
      <CheckToken />
      <div className="flex flex-col gap-30 mt-10 p-20 ">
        <div className="flex flex-col gap-10">
          <span className="text-[#23C5FF] flex items-center gap-5">
            <HiArrowLeft size={18} />
            <span
              className=" text-18 leading-6 cursor-pointer"
              onClick={() => {
                replace("/booking");
              }}
            >
              Go back to my bookings
            </span>
          </span>
          <span className="font-medium text-32 leading-6">Your Orders</span>
          <span className="text-18 leading-6 ">
            Review and manage your order, including downloading, transferring
            and editing your tickets.
          </span>
        </div>
        <div className="flex flex-col border-1 ">
          <div className=" flex justify-between  border-b-1  sm:flex-col lg:flex-row ms:flex-col">
            <div className="relative w-full  lg:max-w-[349px] h-[250px] ">
              <Image
                src={orderData?.event?.coverImage || buttonSearch}
                layout="fill"
              />
            </div>
            <div style={{ height: "250px" }} className="py-10 px-20">
              <div className="flex flex-col gap-10">
                <span className="text-20 leading-6 font-semibold truncate w-full max-w-[397px]">
                  {orderData?.event?.name}
                </span>
                <div className="flex flex-col gap-10">
                  <span className="text-18 leading-6 ">
                    {orderData?.event?.category?.name}
                    {orderData?.event?.parentCategory?.name}
                  </span>
                  <span className="flex gap-5 items-center  text-18 leading-6 ">
                    <AiOutlineCalendar className="text-[#23C5FF]" />
                    {moment(orderData?.event?.startDate).format(
                      "Do MMM  YYYY hh:mm"
                    )}
                  </span>
                  <span className="flex gap-5 items-center text-18 leading-6 ">
                    <GoLocation className="text-[#23C5FF]" />
                    <span>
                      {orderData?.event?.address},{orderData?.event?.city},
                      {orderData?.event?.state},{orderData?.event?.country}
                    </span>
                  </span>
                </div>
                <span
                  className="text-18 leading-6 text-[#23C5FF]  cursor-pointer"
                  onClick={() => push(`/event/${orderData?.event?.slug}  `)}
                >
                  View event
                </span>
              </div>
            </div>
            <div className="relative   h-[250px]  py-20 px-[68px] flex flex-col items-center justify-between bg-[#F1F3F5]">
              <div className="relative w-full max-w-[128px] h-[128px]">
                <Image
                  src={orderData?.qrCodeURL}
                  layout="fill"
                  alt="not found"
                />
              </div>
              <span
                onClick={() => downloadTicket(orderData?.qrCodeURL)}
                className="text-18 leading-6 bg-[#23C5FF] p-10 rounded-5 whitespace-nowrap cursor-pointer"
              >
                Download Tickets
              </span>
            </div>
          </div>
          <div className="p-15 ">
            <span className="text-20 font-medium leading-6 ml-10">
              Payment Information
            </span>
            <table className="w-full mt-10 px-10">
              <thead>
                {headerGroups?.map((headerGroup, i) => (
                  <tr
                    className=" "
                    key={i}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers?.map((column, i) => (
                      <th
                        className={`border-b-1 border-solid text-left border-bordergrey text-black leading-6 text py-8 pl-12 pr-80 ${column.width} text-sm font-medium whitespace-nowrap`}
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
                      className="bg-[#f8f9fa] "
                      key={i}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="text-left border-b-1 border-solid border-bordergrey text-black text-base py-20 px-12 w-153  whitespace-nowrap"
                            key={i}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between pl-10 pr-143 py-10">
              <span className="text-25 font-semibold">Total</span>
              <span className="text-25 font-semibold">
                RM{orderData?.totalAmount?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="absolute top-0 left-0 z-50 w-screen h-screen flex justify-center items-center ">
      <Bars
        height="80"
        width="80"
        color="#0090E1"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
};

export async function getServerSideProps({ query, req }) {
  const { slug } = query;
  const { token, role } = req.cookies;
  if (token) {
    return {
      props: { token: "token", id: slug },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

export default Orderpage;

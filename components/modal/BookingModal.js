import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { eventBookApi } from "../../Redux/event/eventBook";
import CustomButton from "../forms/CustomButton";
import { showModelData } from "../../Redux/event/eventBook";
import DropDown from "./DropDown";
import classNames from "classnames";

const BookingModal = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { isLoading, showModel, status } = useSelector((state) => ({
    isLoading: state.eventBookApiSlice.isLoading,
    showModel: state.eventBookApiSlice.showModel,
    status: state.eventBookApiSlice.status,
  }));

  const [totalPrice, SetTotalPrice] = useState();
  const [ticketBook, setTicketBook] = useState([]);
  const { replace } = useRouter();
  const onChange = (e) => {
    const ticketData = [...ticketBook];

    if (ticketData.length <= 0) {
      if (e?.value > 0) {
        setShowMessage(false);
        ticketData.push({
          name: e.name,
          price: e.price,
          totalPrice: e.value * e.price,
          id: e.id,
          index: ticketData.length,
          count: e.value,
        });
        const sum = ticketData.reduce(
          (previous, current) => previous + current.totalPrice,
          0
        );
        SetTotalPrice(sum);
        setTicketBook(ticketData);
      }
    } else {
      const find = ticketData?.filter((data, index) => {
        return data.id === e.id && data;
      });

      if (find.length >= 1) {
        setShowMessage(false);
        if (e?.value > 0) {
          ticketData[find[0].index].totalPrice = e.value * e.price;
          ticketData[find[0].index].count = e.value;
          setTicketBook(ticketData);
          const sum = ticketData.reduce(
            (previous, current) => previous + current.totalPrice,
            0
          );
          SetTotalPrice(sum);
        } else {
          ticketData.splice(find[0].index, 1);
          const sum = ticketData.reduce(
            (previous, current) => previous + current.totalPrice,
            0
          );
          SetTotalPrice(sum);
          setTicketBook(ticketData);
        }
      } else {
        setShowMessage(false);
        if (e?.value > 0) {
          ticketData.push({
            name: e.name,
            price: e.price,
            totalPrice: e.value * e.price,
            id: e.id,
            index: ticketData.length,
            count: e.value,
          });
          const sum = ticketData.reduce(
            (previous, current) => previous + current.totalPrice,
            0
          );
          SetTotalPrice(sum);
          setTicketBook(ticketData);
        }
      }
    }
  };

  const bookTicketData = () => {
    if (localStorage?.token) {
      if (ticketBook.length > 0) {
        dispatch(eventBookApi({ eventid: props?.id, tickets: ticketBook }));
        SetTotalPrice();
      } else {
        setShowMessage(true);
      }
    } else {
      replace("/auth/login");
    }
  };

  const closeModal = () => {
    setShowMessage();
    setTicketBook([]);
    SetTotalPrice();
    dispatch(showModelData(false));
  };

  function openModal() {
    dispatch(showModelData(true));
  }

  useEffect(() => {
    if (status) {
      setTicketBook([]);
      dispatch(showModelData(false));
    }
  }, [ticketBook, showMessage, showModel, status, totalPrice]);

  useEffect(() => {
    // return ()=>

    SetTotalPrice();
    // };
  }, []);
  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={() => openModal()}
          className={classNames(
            "flex cursor-pointer whitespace-nowrap px-30 ms:px-10 py-5 bg-blue-bgcomman font-400 font-poppins text-18 leading-27 text-black rounded-5 backdrop-blur-42 ",
            props?.EventTicket?.length > 0
              ? "opacity-100 pointer-events-auto"
              : "opacity-25 pointer-events-none"
          )}
        >
          <div className="flex items-center gap-2">Book Tickets</div>
        </button>
      </div>

      <Transition appear show={showModel} as={Fragment}>
        <Dialog as="div" className="relative z-99" onClose={() => closeModal()}>
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
            <div className="flex  items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-auto rounded-5 bg-white text-left align-middle shadow-xl transition-all h-max mx-[10vw] mt-[10vh] p-15 ms:px-15 ms:py-30 sm:px-20 sm:py-30 md:p-25 lg:p-30">
                  <div className="flex flex-col justify-between lg:flex-row ">
                    <div className="flex flex-col gap-28 max-h-[560px] overflow-auto ">
                      <div className="">
                        <Dialog.Title
                          as="h3"
                          className="font-poppins font-600 text-20 leading-7 sm:text-25 sm:leading-7 ms:text-20 ms:leading-7 md:text-25 md:leading-10 lg:text-30 lg:leading-15 xl:text-30 xl:leading-15  text-black"
                        >
                          <div className="cut-text2 flex items-center">
                            {props?.data?.name}
                          </div>
                          <p className="mt-4 font-poppins font-400 text-15 ms:text-15 sm:text-18 md:text-22 lg:text-25 xl:text-26 xxl:text-28 text-black">
                            {moment(props?.data?.startDate).format(
                              "dddd MMM Do YYYY"
                            )}
                          </p>

                          {showMessage && (
                            <p className="mt-4 font-poppins font-400  text-black bg-[#FFF5F5]  p-[10px]">
                              <p className="text-red-600  ms:text-[15px] sm:text-18 md:text-22 lg:text-25 xl:text-26 xxl:text-28">
                                Warning!
                              </p>
                              <p className=" sm:text-16 md:text-18 truncate ms:text-[15px]">
                                Please choose a ticket type to continue.!
                              </p>
                            </p>
                          )}
                        </Dialog.Title>
                      </div>
                      <div>
                        <table className="min-w-full">
                          <thead className="border-b border-t">
                            <tr>
                              <th
                                scope="col"
                                className="font-poppins font-400 text-lg text-black px-18 py-12 text-left ms:text-base"
                              >
                                Details
                              </th>
                              <th
                                scope="col"
                                className="font-poppins font-400 text-lg text-black px-18 py-12 text-left ms:text-base"
                              >
                                Quantity
                              </th>
                              <th
                                scope="col"
                                className="font-poppins font-400 text-lg text-black px-18 py-12 text-left ms:text-base"
                              >
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {props?.EventTicket?.map((data, index) => (
                              <tr className="border-b" key={index}>
                                <td className="px-18 py-33 font-poppins font-500 text-12 ms:text-12 sm:text-18 md:text-22 lg:text-25 xl:text-26 xxl:text-28 leading-30 text-black ms:text-sm">
                                  {data?.name}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-18 py-30 whitespace-nowrap  ms:text-sm">
                                  <DropDown
                                    onChange={onChange}
                                    name={data?.name}
                                    price={data?.price}
                                    id={data?.id}
                                    index={index}
                                    quantity={data?.quantity}
                                  />
                                </td>
                                <td className="font-poppins font-400 text-20 text-12 ms:text-12 sm:text-18 md:text-22 lg:text-25 xl:text-26 xxl:text-28 leading-30 text-cmnblue whitespace-nowrap  ms:text-sm">
                                  RM
                                  {data?.price
                                    ?.toFixed(2)
                                    ?.toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="mt-35">
                      <div className="rounded-5 bg-blue-modalcart px-28 py-50 max-h-[520px] overflow-y-auto">
                        <div className=" overflow-y-auto">
                          <table className="min-w-full">
                            <thead className="border-b-1 border-solid border-tableborder">
                              <tr>
                                <th
                                  scope="col"
                                  className="pb-31 font-poppins font-500 text-22 leading-38 text-black text-left whitespace-nowrap"
                                >
                                  Order summary
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {ticketBook?.map((key, index) => {
                                return (
                                  <tr
                                    key={index}
                                    className="border-b-1 border-solid "
                                  >
                                    <td className="py-10  font-poppins font-400 text-18 leading-38 text-black flex flex-wrap w-[160px]">
                                      {key.count} X {key.name}
                                    </td>
                                    <td className="py-10 font-poppins font-400 text-20 leading-30 text-cmnblue ">
                                      RM
                                      {key.totalPrice
                                        ?.toFixed(2)
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr className="border-b-1 border-solid ">
                                <td className="pt-20 pb-20 whitespace-nowrap font-poppins font-400 text-25 leading-38 text-black">
                                  Total
                                </td>
                                <td className="pt-20 pb-20 font-poppins font-400 text-20 leading-30 text-cmnblue whitespace-nowrap">
                                  RM
                                  {totalPrice
                                    ? totalPrice
                                        ?.toFixed(2)
                                        ?.toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                    : "0.00"}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="flex justify-center items-center">
                          <CustomButton
                            disabled={isLoading}
                            type="button"
                            onClick={(e) => bookTicketData(e)}
                            buttonStyle="w-full py-10 bg-cmnblue inline-flex justify-center rounded-5 border border-transparent bg-blue-100 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2  disabled:bg-dark-blue disabled:text-white flex items-center gap-[5px]"
                          >
                            Book
                          </CustomButton>
                        </div>
                      </div>
                    </div>
                    <div
                      className="fixed right-3 top-3 cursor-pointer"
                      onClick={() => closeModal()}
                    >
                      <IoCloseSharp size={30} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default BookingModal;

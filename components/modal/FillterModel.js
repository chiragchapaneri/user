import { Dialog, Transition } from "@headlessui/react";
import { set } from "date-fns";
import { Fragment, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiFillFilter, AiOutlineClose } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { eventBookApi } from "../../Redux/event/eventBook";
import { searchEventApi } from "../../Redux/event/searchEvent";
import { getDateArray } from "../../utils/helper";
import { DropDown } from "../dropdown/dropdown";
import CustomButton from "../forms/CustomButton";

const date = getDateArray().filter((data, index) => {
  return index < 5;
});
const FillterModel = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => ({
    isLoading: state.eventBookApiSlice.isLoading,
  }));

  const [totalPrice, SetTotalPrice] = useState();
  const [ticketBook, setTicketBook] = useState([]);

  const [selectEventTyoe, setSelectEventTyoe] = useState();
  const [selectCategory, setSelectCategory] = useState();
  const [subCategoryList, setsubCategoryList] = useState();
  const [selectSubCategory, setSelectSubCategory] = useState();
  const [dateRange, setDateRange] = useState({
    startDate: props?.slug?.startDate ? props.slug?.startDate : new Date(),
    endDate: props?.slug?.endDate,
    dt: props?.slug?.dt,
  });
  const [datePlaceHolder, setDatePlaceHolder] = useState();
  const [custom, setCustom] = useState(false);

  const handleType = (e) => {
    if (e.name == selectEventTyoe?.name) {
      setSelectEventTyoe();
    } else {
      setSelectEventTyoe(e);
    }
  };

  const handleCategory = (e) => {
    if (e.name === selectCategory?.name) {
      setSelectCategory();
      setSelectSubCategory();
      setsubCategoryList([]);
    } else {
      const sub = props.eventCategory?.filter(
        (data) => data.id == e.id && data
      );

      setSelectCategory(e);
      setsubCategoryList(sub[0]?.childCategories);
      setSelectSubCategory();
    }
  };

  const handleSubCategory = (e) => {
    if (e.name == selectSubCategory?.name) {
      setSelectSubCategory();
    } else {
      setSelectSubCategory(e);
    }
  };

  const handleDate = (e) => {
    if (e.name == datePlaceHolder.name) {
      setDatePlaceHolder();
      setDateRange({
        startDate: "",
        endDate: "",
        dt: "",
      });
    } else {
      setDatePlaceHolder(e);
      setDateRange({
        startDate: e?.startDate,
        endDate: e?.endDate,
        dt: e?.dt,
      });
    }
  };

  const onSubmit = () => {
    if (selectCategory || selectSubCategory || selectEventTyoe) {
      dispatch(
        searchEventApi({
          etid: selectEventTyoe?.id,
          pcid: selectCategory?.id,
          cid: selectSubCategory?.id,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
          dt: dateRange?.dt,
        })
      );
    }
  };

  const ClearFilter = () => {
    setSelectCategory();
    setSelectEventTyoe();
    setSelectSubCategory();
    setDatePlaceHolder();
    setDateRange({});
  };
  function closeModal() {
    if (ticketBook.length > 0) {
      dispatch(eventBookApi({ eventid: props?.id, tickets: ticketBook }));
    }
  }

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {}, [selectEventTyoe]);

  return (
    <>
      <div className="bg-white lg:hidden cursor-pointer absolute bottom-[50px] left-[35px] p-10">
        <AiFillFilter size={20} onClick={openModal} />
      </div>

      <Toaster />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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

          <div className="fixed inset-0 ">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-x-0"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform  rounded-5 bg-white sm:px-10 sm:py-45 ms:px-10 ms:py-45 text-left align-middle shadow-xl transition-all h-full   absolute right-0 w-[250px] top-0 z-20">
                  <div className="flex flex-col justify-between lg:flex-row ">
                    <div className="flex flex-col gap-28 ">
                      <div className="">
                        <Dialog.Title
                          as="h3"
                          className="font-poppins font-600 text-30 leading-45 text-black flex items-center justify-between px-10"
                        >
                          <div>Filter Events</div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              ClearFilter();
                              setIsOpen(false);
                            }}
                          >
                            <IoCloseSharp size={20} />
                          </div>
                        </Dialog.Title>
                      </div>
                      <div className="flex flex-col gap-10">
                        <div className="relative">
                          <DropDown
                            data={props.eventTypes}
                            selected={selectEventTyoe}
                            placeholder="Select Event"
                            handleChange={handleType}
                            zindex="z-[7]"
                          />
                          {selectEventTyoe && (
                            <AiOutlineClose
                              size={15}
                              onClick={() => {
                                setSelectEventTyoe();
                              }}
                              className="absolute top-[15px] right-[14px] cursor-pointer bg-white "
                            />
                          )}
                        </div>
                        <div className="relative">
                          <DropDown
                            data={props?.eventCategory}
                            selected={selectCategory}
                            placeholder="Select Category"
                            handleChange={handleCategory}
                            zindex="z-[6]"
                          />
                          {selectCategory && (
                            <AiOutlineClose
                              size={15}
                              onClick={() => {
                                setSelectCategory();
                              }}
                              className="absolute top-[15px] right-[14px] cursor-pointer"
                            />
                          )}
                        </div>
                        <div className="relative">
                          <DropDown
                            data={subCategoryList}
                            selected={selectSubCategory}
                            placeholder="Select Sub Category"
                            handleChange={handleSubCategory}
                            zindex="z-[5]"
                          />
                          {selectSubCategory && (
                            <AiOutlineClose
                              size={15}
                              onClick={() => {
                                setSelectSubCategory();
                              }}
                              className="absolute top-[15px] right-[14px] cursor-pointer"
                            />
                          )}
                        </div>
                        <div className="relative">
                          <DropDown
                            data={date}
                            selected={datePlaceHolder}
                            placeholder="Select Date"
                            handleChange={handleDate}
                            zindex="z-[4]"
                          />
                          {datePlaceHolder && (
                            <AiOutlineClose
                              size={15}
                              onClick={() => {
                                setDatePlaceHolder();
                                setDateRange();
                              }}
                              className="absolute top-[15px] right-[14px] cursor-pointer"
                            />
                          )}
                        </div>
                        <div className="flex gap-10">
                          <div
                            className="bg-[#23C5FF] text-black text-center p-10 w-full cursor-pointer"
                            onClick={ClearFilter}
                          >
                            ClearFilter
                          </div>
                          <div
                            className="bg-[#23C5FF] text-black  text-center p-10 w-full cursor-pointer"
                            onClick={onSubmit}
                          >
                            Apply
                          </div>
                        </div>
                      </div>
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

export default FillterModel;

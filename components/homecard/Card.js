import Image from "next/image";
import cardGroup from "../../assets/img/card_Group.svg";
import cardDate from "../../assets/img/card_date.svg";
import cardLocation from "../../assets/img/card_location.svg";
import moment from "moment";
import { useRouter } from "next/router";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookMarkedApi } from "../../Redux/bookmarked/bookMarkedSlice";
import { eventForMeApi } from "../../Redux/bookmarked/eventForMe";
import { Oval } from "react-loader-spinner";
import headerLogo from "../../assets/img/header_logo.svg";
import { getAccessToken } from "../../utils/helper";
import { useEffect } from "react";

export const Card = ({ data, index, eventForMe, bookMarkedEvents }) => {
  const minPrice = data?.EventTicket?.reduce(
    (prev, curr) => (prev.price < curr.price ? prev : curr),
    0
  );
  const [token, setToken] = useState();

  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoding, id } = useSelector((state) => ({
    id: state.bookMarkedSlice.id,
    isLoding: state.bookMarkedSlice.isLoading,
  }));
  const chnageBookmark = (event, id, values) => {
    event.stopPropagation();

    dispatch(bookMarkedApi({ id: id, marked: values }));
  };

  useEffect(() => {
    if (localStorage?.token) {
      setToken(getAccessToken());
    }
  }, []);

  return (
    <div
      className=" relative rounded-5 bg-bg-light-blue cursor-pointer hover:shadow-2xl hover:shadow-cyan-500/50"
      key={index + data?.id}
      onClick={() => router.push(`/event/${data?.slug}  `)}
    >
      {token && (
        <div className="absolute z-[1] right-10 top-10 cursor-pointer bg-[#7F7F7F] p-3">
          {isLoding && id === data.id ? (
            <Oval
              color="#FFFFFF"
              height={14}
              width={25}
              secondaryColor="#FAFAFA"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : bookMarkedEvents?.includes(data.id) ? (
            <AiFillHeart
              color="#23C5FF"
              size={20}
              onClick={(e) => chnageBookmark(e, data.id, false)}
            />
          ) : (
            <AiOutlineHeart
              color="white"
              size={20}
              onClick={(e) => chnageBookmark(e, data.id, true)}
            />
          )}
        </div>
      )}
      <div className="relative h-181 w-full rounded-t-5 overflow-hidden">
        <Image
          src={data?.coverImage ? data?.coverImage || headerLogo : headerLogo}
          alt="Event Image"
          layout="fill"
          objectFit="cover"
        />
        {/* <button className="absolute text-10 leading-5 font-normal px-11 rounded-5 top-127 sm:top-145 md:top-145 lg:top-145 right-15 lg:text-xs sm:text-10 sm:leading-5 sm:font-normal lg:h-22 lg:px-22 sm:px-10 bg-light-blue ">
          Screening
        </button> */}
      </div>
      <div className=" px-22 pt-18">
        <div
          className="text-base lg:text-base sm:text-14 sm:leading-6 sm:font-medium truncate 
"
        >
          {data?.name}
        </div>
        <div className="text-14 md:text-xs mt-16 flex flex-col gap-11 font-normal lg:text-14 sm:text-14 sm:leading-5 sm:mt-16">
          <div className="flex gap-26 ">
            <Image
              src={cardGroup ? cardGroup : headerLogo}
              height={18}
              width={18}
              alt="none"
            />
            <div className="cut-text1 text-base-input">
              {data?.parentCategory?.name}
            </div>
          </div>
          <div className="flex gap-26 ">
            <Image
              src={cardDate ? cardDate : headerLogo}
              height={18}
              width={18}
              alt="none"
            />
            <div className="cut-text1 text-base-input">
              {moment(data?.startDate).format("Do MMMM")}
            </div>
          </div>
          <div className="flex gap-26">
            <Image src={cardLocation} height={20} width={18} alt="none" />
            <div className="truncate text-base-input">
              {data?.venueName},{data?.city}
            </div>
          </div>
        </div>
      </div>
      <div className="h-1 bg-bg-dark-blue sm:mx-11 lg:mt-40 sm:mt-34 mt-34"></div>
      <div className="sm:py-11 text-base py-11 text-center">
        {data?.EventTicket?.length > 0
          ? minPrice.price == 0
            ? "Free"
            : `RM${minPrice.price}`
          : "Free"}
      </div>
    </div>
  );
};
export default Card;

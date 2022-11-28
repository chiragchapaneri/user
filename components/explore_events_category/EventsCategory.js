import React from "react";
import eventsFundraiser from "../../assets/img/events_fundraiser.svg";
import eventsClimb from "../../assets/img/events_climb.svg";
import eventsCity from "../../assets/img/events_city.svg";
import Image from "next/image";
import { useRouter } from "next/router";
const EventsCategory = () => {
  const router = useRouter();
  return (
    <div className="mb-55 ">
      <div className="text-xl leading-48 py-20  font-medium sm:text-xl sm:py-30 md:text-28 lg:text-32 lg:py-55">
        Explore Events In Category
      </div>
      <div
        className="grid sm:grid-cols-2 gap-30 md:grid-cols-3 lg:grid-cols-4"
        key={2}
      >
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/latin")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/music.svg"
            height={22}
            width={19}
            alt="none"
          />
          <div className="text-18 leading-7 font-medium">Latin</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/djdance")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/music.svg"
            height={24}
            width={26}
            alt="none"
          />
          <div className="text-18 leading-7 font-medium">Dj/Dance</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/citytown")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/community-and-culture.svg"
            height={26}
            width={20}
            alt="none"
          />
          <div className="text-18 leading-7  font-medium">City/Town</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/climbing")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/travel-and-outdoor.svg"
            height={22}
            width={19}
            alt="none"
          />
          <div className="text-18 leading-7  font-medium">Climbing</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/hinduism")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/religion-and-spirituality.svg"
            height={24}
            width={26}
            alt="none"
          />
          <div className="text-18 leading-7  font-medium">Hinduism</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/st-patricks-day")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/seasonal-and-holiday.svg"
            height={26}
            width={20}
            alt="none"
          />
          <div className="text-18 leading-7  font-medium">St Patricks Day</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/christmas")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/seasonal-and-holiday.svg"
            height={26}
            width={20}
            alt="none"
          />
          <div className="text-18 leading-7  font-medium">Christmas</div>
        </div>
        <div
          className="rounded-5 flex h-50 border-1 border-solid border-border-blue items-center min-w-200 justify-start pl-18 gap-24 cursor-pointer"
          onClick={() => router.push("/categories/auto")}
        >
          <Image
            src="https://virul-dev.s3.us-east-2.amazonaws.com/public/categories/icons/auto-boat-and-air.svg"
            height={26}
            width={20}
            alt="none"
          />
          <div className="text-18 leading-7  font-medium">Auto</div>
        </div>
      </div>
    </div>
  );
};
export default EventsCategory;

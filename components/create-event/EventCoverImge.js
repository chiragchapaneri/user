import Image from "next/image";
import React from "react";
import DropZone from "../create-event-form/DropZone";
import mainevent from "../../assets/img/mainevent.svg";

const EventCoverImge = ({ image, setImage, imageAtEdit }) => {
  return (
    <div>
      <div className="flex xxl:flex flex-col xl:flex-row lg:flex-col md:flex-col sm:flex-col ms:flex-col md:gap-15 sm:gap-10 ms:gap-8">
        <div className="w-full max-w-200 flex flex-row xxl:flex-col xxl:gap-0 xl:flex-col xl:gap-0 lg:flex lg:gap-15 md:flex md:gap-10 items-center xxl:items-center md:items-center sm:items-center ms:items-center sm:gap-5 ms:gap-5 justify-start">
          <Image
            src={mainevent}
            alt="Picture of an text"
            width={34}
            height={34}
          />
          <p className="font-500 text-lgtext-lg xxl:text-lg md:text-base sm:text-sm ms:text-xs text-black text-center">
            Main Event Image
          </p>
        </div>
        <div className="flex flex-col">
          <p className="font-400 text-sm xxl:text-sm md:text-sm sm:text-xs ms:text-xs text-black">
            This is the first image attendees will see at the top of your
            listing. Use a high quality image: 2160x1080px (2:1 ratio)
          </p>
          <div className="mt-36 border-2 border-dashed h-screen max-h-217 w-full max-w-651 flex justify-center items-center bg-dragdrop">
            <DropZone
              name="coverImage"
              setImage={setImage}
              image={image}
              imageAfterCrop={image && image?.url}
              imageAtEdit={imageAtEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCoverImge;

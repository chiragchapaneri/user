import Image from 'next/image';
import React from 'react';
import HeaderTransparentevent from '../../components/header/HeaderTransparentevent';
import Footer from '../../components/footer/Footer';
import eventbg from '../../assets/img/eventbg.svg';
import smallEvent from '../../assets/img/smalleventbg.svg';
import proimg from '../../assets/img/proimg.svg';
import BookingModal from '../../components/modal/BookingModal';
import {
  IoPricetag,
  IoCalendarOutline,
  IoLocationOutline,
  IoShareSocialOutline,
} from 'react-icons/io5';
import {
  RiFacebookFill,
  RiLinkedinLine,
  RiTwitterFill,
  RiInstagramFill,
  RiHeart3Line,
} from 'react-icons/ri';

const singleevent = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <HeaderTransparentevent
        headerStyle="bg-transperent absolute"
        textStyle="text-white"
      />
      <div className="relative w-full max-w-screen-xxl mx-auto">
        <div className="relative ">
          <Image
            src={eventbg}
            alt="Picture of an event"
            width={1440}
            height={522}
            sizes="60px"
            className="-z-10"
            layout="responsive"
          />
          <div className="h-full -top-6 w-full absolute bg-event-background-img ms:hidden sm:hidden"></div>
        </div>
        <div className="px-80 md:px-20 lg:px-80 xxl:px-80 2xl:px-80 lg:flex-row md:flex-col-reverse flex gap-34 lg:gap-34 xxl:gap-34 2xl:gap-34 md:gap-0 sm:gap-0 ms:flex-col-reverse ms:px-20 sm:flex-col-reverse sm:px-20 ">
          <div className="flex flex-col gap-25 ms:rounded-5 sm:rounded-5 md:rounded-5 lg:rounded-b-5 xxl:rounded-b-5 2xl:rounded-b-5 lg:rounded-t-none xxl:rounded-t-none 2xl:rounded-t-none bg-blue-eventbox  ms:bg-transparent lg:max-w-392 xxl:max-w-392 2xl:max-w-392 md:w-full relative backdrop-blur-37.5 ms:backdrop-blur-0 drop-shadow-eventBox">
            <div className="absolute w-full bottom-full h-232 w-392 ms:hidden sm:hidden md:hidden lg:block xxl:block 2xl:block">
              <Image
                src={smallEvent}
                alt="Picture of an event"
                width={392}
                height={232}
                sizes="60px"
                layout="responsive"
              />
            </div>
            <div className="px-62 md:px-20 ms:px-20 pt-25 md:pb-25 flex flex-col gap-25">
              <div className="flex gap-17">
                <div className="flex mt-5">
                  <IoPricetag size={20} />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-500 font-poppins text-lg text-black">
                    Price
                  </p>
                  <p className="font-400 font-poppins text-sm text-black">
                    Starts from RM299.00
                  </p>
                </div>
              </div>
              <div className="flex gap-17">
                <div className="flex mt-5">
                  <IoCalendarOutline size={20} />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-500 font-poppins text-lg text-black">
                    Date and Time
                  </p>
                  <p className="font-400 font-poppins text-sm text-black md:w-full lg:max-w-190 xxl:max-w-190 2xl:max-w-190">
                    Thu, Sep 22, 2022 5:59 PM - Tue, Sep 27, 2022 1:06 PM
                  </p>
                </div>
              </div>
              <div className="flex gap-17">
                <div className="flex mt-5">
                  <IoLocationOutline size={20} />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-500 font-poppins text-lg text-black">
                    Location
                  </p>
                  <p className="font-400 font-poppins text-sm text-black md:w-full lg:max-w-231 xxl:max-w-231 2xl:max-w-231">
                    Suite 223, Temp, Klang, Selangor, Malaysia
                  </p>
                </div>
              </div>
              <div className="flex gap-17">
                <div className="flex mt-5">
                  <IoShareSocialOutline size={20} />
                </div>
                <div className="flex flex-col gap-13">
                  <p className="font-500 font-poppins text-lg text-black">
                    Share with friends
                  </p>
                  <div className="flex gap-30">
                    <RiFacebookFill
                      size={16}
                      fill="#003F89"
                      className="cursor-pointer"
                    />
                    <RiLinkedinLine
                      size={16}
                      fill="#003F89"
                      className="cursor-pointer"
                    />
                    <RiTwitterFill
                      size={16}
                      fill="#003F89"
                      className="cursor-pointer"
                    />
                    <RiInstagramFill
                      size={16}
                      fill="#003F89"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-29 mb-16 border-solid border-t-0.8 border-eventbox-br md:hidden lg:block 2xl:block xxl:block">
              <div className="pt-16 flex justify-center items-center">
                <div className="flex gap-26">
                  <Image
                    src={proimg}
                    alt="Picture of an event"
                    width={60}
                    height={60}
                  />
                  <div>
                    <p className="font-500 font-poppins text-lg text-black">
                      Organized By:
                    </p>
                    <p className="font-400 font-poppins text-sm text-black">
                      DDC2799
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-full lg:max-w-800 xxl:max-w-800 2xl:max-w-800 relative">
            <div className="flex justify-between absolute bottom-full w-full pb-37 ms:pb-5 ms:relative ms:flex-col">
              <div className="flex flex-col md:gap-5 w-54 ms:w-full">
                <p className="font-500 font-poppins text-sm text-white ms:text-black">
                  Thursday, September 22nd, 2022
                </p>
                <p className="font-600 font-poppins text-22 leading-33 text-white ms:w-full ms:text-black ms:overflow-hidden ms:text-ellipsis ms:truncate sm:overflow-hidden sm:text-ellipsis sm:truncate xxl:overflow-hidden xxl:text-ellipsis xxl:truncate 2xl:overflow-hidden 2xl:text-ellipsis 2xl:truncate truncate ">
                  Alley Tala lavender Balboa Dominica
                </p>
                <div className="hidden ms:hidden sm:hidden md:block lg:hidden xxl:hidden 2xl:hidden">
                  <div className="flex gap-20">
                    <Image
                      src={proimg}
                      alt="Picture of an event"
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="font-500 font-poppins text-lg text-white">
                        Organized By:
                      </p>
                      <p className="font-400 font-poppins text-sm text-white">
                        DDC2799
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-30 ms:gap-15 sm:gap-15 xs:gap-15 lg:gap-30 xl:gap-30 xxl:gap-30 justify-end items-end ms:flex-row-reverse ms:py-5 md:items-center lg:items-end xxl:items-end 2xl:items-end w-35">
                <div className="p-5 rounded-full cursor-pointer border-1 border-solid border-likebtn ms:border-black">
                  <RiHeart3Line
                    size={25}
                    className="text-cmnblue ms:text-black"
                  />
                </div>
                <div className="" onClick={(event) => event.stopPropagation()}>
                  <BookingModal />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-25 ms:gap-16 py-33 ms:py-5">
              <p className="font-500 ms:font-bold font-poppins text-30 ms:text-20 leading-45 text-black">
                About this event
              </p>
              <p className="font-300 font-poppins text-base text-black">
                Quasi expedita non quibusdam omnis voluptatem porro sunt quia.
                Non dolorem vitae deserunt et. Quod ipsum libero libero
                pariatur. Repellendus quia aut est ipsam dolore doloremque quo.
                Optio voluptas fuga distinctio cumque aliquam odio ex. Odio ut
                eveniet aliquam assumenda neque a deleniti eaque. Fugiat
                reprehenderit alias adipisci tenetur aliquam asperiores velit
                perspiciatis quae. Excepturi quas velit labore expedita aut nisi
                sapiente ut. Dolor accusamus quis aut vel maiores sed ducimus.
                Dolor magni velit modi quas neque sequi omnis. Nihil autem et ut
                esse odio inventore beatae aut quis. Animi laboriosam quis
                voluptas quam voluptas numquam expedita quibusdam. Sint et
                placeat velit et expedita. Molestiae ut est rem quia. Maxime
                voluptatibus numquam rerum et. Dicta corporis reprehenderit in.
                Neque vero eum quis nesciunt. Expedita enim neque facere sunt
                qui doloremque corrupti. Aut veniam quibusdam commodi. Aliquam
                aut aspernatur aliquam soluta. Minima commodi rem eius
                reprehenderit est nostrum.
              </p>
            </div>
          </div>
        </div>
        <div className="px-80 md:px-20 ms:px-20 sm:px-20 lg:px-80 xxl:px-80 2xl:px-80 pt-59 lg:pt-59 xxl:pt-59 2xl:pt-59 md:py-30 ms:py-20 sm:py-20 lg:pb-85 xxl:pb-85 2xl:pb-85 ">
          <p className="font-300 font-poppins text-base text-black">
            Nihil autem et ut esse odio inventore beatae aut quis. Animi
            laboriosam quis voluptas quam voluptas numquam expedita quibusdam.
            Sint et placeat velit et expedita. Molestiae ut est rem quia. Maxime
            voluptatibus numquam rerum et. Dicta corporis reprehenderit in.
            Neque vero eum quis nesciunt. Expedita enim neque facere sunt qui
            doloremque corrupti. Aut veniam quibusdam commodi. Aliquam aut
            aspernatur aliquam soluta. Minima commodi rem eius reprehenderit est
            nostrum. Et occaecati officia non nisi est unde enim incidunt porro.
            Minima necessitatibus et ut quia omnis rerum ut. In dolorum voluptas
            amet ipsa incidunt sed in sequi qui. Nihil voluptatem aut earum
            commodi odio corporis. Quia suscipit impedit quasi. Rem et
            voluptatum placeat. Et possimus hic ullam qui magnam quis dolores
            ipsam voluptas. Illum cumque velit iure perspiciatis sit doloremque.
            Architecto praesentium porro magnam beatae eius neque et. Omnis
            corporis numquam laboriosam. Tempora ipsam provident dolor quia
            adipisci vel. Quia repudiandae atque possimus ut quae. Distinctio
            occaecati impedit velit consequatur aut. Libero et quod. Corrupti ut
            amet voluptas ut ea voluptas pariatur. Natus inventore reprehenderit
            quo. Earum porro vel. Expedita unde voluptas. Sint blanditiis quidem
            placeat occaecati omnis sit mollitia in consequatur. Laborum fuga
            veniam. Quasi expedita non quibusdam omnis voluptatem porro sunt
            quia. Non dolorem vitae deserunt et. Quod ipsum libero libero
            pariatur. Repellendus quia aut est ipsam dolore doloremque quo.
            Optio voluptas fuga distinctio cumque aliquam odio ex. Odio ut
            eveniet aliquam assumenda neque a deleniti eaque. Fugiat
            reprehenderit alias adipisci tenetur aliquam asperiores velit
            perspiciatis quae. Excepturi quas velit labore expedita aut nisi
            sapiente ut. Dolor accusamus quis aut vel maiores sed ducimus. Dolor
            magni velit modi quas neque sequi omnis. Nihil autem et ut esse odio
            inventore beatae aut quis. Animi laboriosam quis voluptas quam
            voluptas numquam expedita quibusdam. Sint et placeat velit et
            expedita. Molestiae ut est rem quia. Maxime voluptatibus numquam
            rerum et.
          </p>
        </div>
        <div className="ms:pb-20 sm:pb-20 md:pb-20 lg:pb-50 2xl:pb-50 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.541273494732!2d72.53908525085517!3d23.113882584832883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9ddd5e24dcd1%3A0xdf5c3d5463cdece5!2sInfynno%20Solutions%20%7C%20Expert%20in%20Laravel%2C%20React%20and%20Node%20Apps!5e0!3m2!1sen!2sin!4v1664264425766!5m2!1sen!2sin"
            width="600"
            height="450"
            className="w-full"
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default singleevent;

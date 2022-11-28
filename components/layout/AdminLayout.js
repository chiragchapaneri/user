import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import footerLogo from '../../assets/img/footer_logo.svg';
import dashboard from '../../assets/img/dashboard.svg';
import organization from '../../assets/img/organization.svg';
import Customers from '../../assets/img/customers.svg';
import events from '../../assets/img/events.svg';
import bookings from '../../assets/img/bookings.svg';
import homepage from '../../assets/img/homepage.svg';
import { useRouter } from 'next/router';
import classNames from 'classnames';

const tabs = [
  { name: 'Dashboard', icon: dashboard, link: '/admin' },
  { name: 'Organization', icon: organization, link: '/admin/organization' },
  { name: 'Customers', icon: Customers, link: '/admin/customers' },
  { name: 'Events', icon: events, link: '/admin/events' },
  { name: 'Bookings ', icon: bookings, link: '/admin/bookings' },
  { name: 'Go to Homepage', icon: homepage, link: '/' },
];

export const AdminLayout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex">
      <nav className=" min-w-300">
        <div className="bor border-b-1 border-bordergrey flex justify-center mx-20 pt-20">
          <Image src={footerLogo} height={70} width={170} alt="blank" />
        </div>
        <div className="py-28 text-sm flex flex-col ">
          {tabs.map((tab, i) => {
            return (
              <Link href={tab.link} key={i}>
                <a>
                  <div
                    className={classNames(
                      'flex items-center gap-20 hover:bg-light-grey px-20 py-12',
                      router.pathname === tab.link && 'bg-light-grey'
                    )}
                  >
                    <div className="w-30 h-30 min-w-30 min-h-30 bg-cmnblue rounded-5 flex justify-center items-center">
                      <Image
                        src={tab.icon}
                        height={16}
                        width={16}
                        alt="blank"
                      />
                    </div>
                    <div>{tab.name}</div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
      {children}
    </div>
  );
};

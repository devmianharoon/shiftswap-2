'use client';
import IconCalendar from '@/components/icon/icon-calendar';
import IconClock from '@/components/icon/icon-clock';
import IconCoffee from '@/components/icon/icon-coffee';
import IconCreditCard from '@/components/icon/icon-credit-card';
import IconDribbble from '@/components/icon/icon-dribbble';
import IconGithub from '@/components/icon/icon-github';
import IconMail from '@/components/icon/icon-mail';
import IconMapPin from '@/components/icon/icon-map-pin';
import IconPencilPaper from '@/components/icon/icon-pencil-paper';
import IconPhone from '@/components/icon/icon-phone';
import IconShoppingBag from '@/components/icon/icon-shopping-bag';
import IconTag from '@/components/icon/icon-tag';
import IconTwitter from '@/components/icon/icon-twitter';
import ComponentsUsersProfilePaymentHistory from '@/components/users/profile/components-users-profile-payment-history';
import { Metadata } from 'next';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

// export const metadata: Metadata = {
//     title: 'Profile',
// };

const Profile: React.FC = () => {
    const userData = localStorage.getItem('user_data');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    console.log(parsedUserData);
    const [tooltipContent, setTooltipContent] = useState<string>('Copy');

    const handleCopy = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setTooltipContent('Copied');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    // Reset tooltip content back to "Copy" after 2 seconds
    useEffect(() => {
        if (tooltipContent === 'Copied') {
            const timer = setTimeout(() => {
                setTooltipContent('Copy');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [tooltipContent]);

    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link href="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="mb-5 flex flex-col w-full gap-5">
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Profile</h5>
                            <Link href="/users/user-account-settings" className="btn btn-primary rounded-full p-2 ltr:ml-auto rtl:mr-auto">
                                <IconPencilPaper />
                            </Link>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src={`https://drupal-shift-swap.asdev.tech/sites/default/files/${parsedUserData?.logo}`} alt="img" className="mb-5 h-24 w-24 rounded-full object-cover" />
                                <p className="text-xl font-semibold text-primary uppercase">{parsedUserData?.field_full_name}</p>
                            </div>
                            <div className="flex">
                                <ul className="m-auto mt-5 flex flex-col space-y-4 font-semibold text-white-dark">
                                    {parsedUserData?.account_type && (
                                        <li className="flex items-center gap-2 capitalize">
                                            <IconCoffee className="shrink-0" /> Account Type: {parsedUserData.account_type}
                                        </li>
                                    )}
                                    {parsedUserData?.business_name && (
                                        <li className="flex items-center gap-2 capitalize">
                                            <IconCalendar className="shrink-0" />
                                            Business Name: {parsedUserData.business_name}
                                        </li>
                                    )}
                                    {parsedUserData?.business_type?.name && (
                                        <li className="flex items-center gap-2 capitalize">
                                            <IconMapPin className="shrink-0" />
                                            <span>Business Type: {parsedUserData.business_type.name}</span>
                                        </li>
                                    )}
                                    <li>
                                        <button className="flex items-center gap-2">
                                            <IconMail className="h-5 w-5 shrink-0" />
                                            Email:
                                            <span className="truncate text-primary"> {parsedUserData?.email}</span>
                                        </button>
                                    </li>
                                </ul>
                                <ul className="m-auto mt-5 flex flex-col space-y-4 font-semibold text-white-dark">
                                    <li className="flex items-center gap-2 capitalize">
                                        <IconPhone /> Phone:
                                        <span className="whitespace-nowrap" dir="ltr">
                                            {parsedUserData?.phone}
                                        </span>
                                    </li>
                                    {parsedUserData?.secret_key && (
                                        <li className="flex items-center gap-2">
                                            <IconMapPin className="shrink-0" />
                                            <span>Secret Key: {parsedUserData.secret_key}</span>
                                            <Tippy content={tooltipContent} trigger="mouseenter focus click" hideOnClick={false} interactive={true}>
                                                <Copy className="ml-2 cursor-pointer hover:text-primary outline-none" size={16} onClick={() => handleCopy(parsedUserData.secret_key)} />
                                            </Tippy>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <ul className="mt-7 flex items-center justify-center gap-2">
                                <li>
                                    <button className="btn btn-info flex h-10 w-10 items-center justify-center rounded-full p-0">
                                        <IconTwitter className="h-5 w-5" />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-danger flex h-10 w-10 items-center justify-center rounded-full p-0">
                                        <IconDribbble />
                                    </button>
                                </li>
                                <li>
                                    <button className="btn btn-dark flex h-10 w-10 items-center justify-center rounded-full p-0">
                                        <IconGithub />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

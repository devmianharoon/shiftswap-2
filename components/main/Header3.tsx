import React from 'react';
// import Nav from "./Nav";
import Link from 'next/link';
import Image from 'next/image';
// import LanguageSelect from "./LanguageSelect";
import { socialLinks } from '@/data/socials';

const Header3: React.FC = () => {
    return (
        <header className="relative wrapper !bg-[#ffffff]">
            <div className="bg-[rgba(63,120,224)] !text-white font-bold text-[.75rem] !mb-2">
                <div className="container py-2 xl:!flex lg:!flex md:!flex xl:!flex-row lg:!flex-row md:!flex-row">
                    <div className="flex flex-row items-center">
                        <div className="icon !text-white !text-[1.1rem] !mt-[.25rem] !mr-[.5rem]">
                            <i className="uil uil-location-pin-alt" />
                        </div>
                        <address className="!mb-0 not-italic !leading-[inherit] block">Moonshine St. 14/05 Light City</address>
                    </div>
                    <div className="flex flex-row items-center me-6 ms-auto">
                        <div className="icon !text-white !text-[1.1rem] !mt-[.25rem] !mr-[.5rem]">
                            <i className="uil uil-phone-volume" />
                        </div>
                        <p className="!mb-0">00 (123) 456 78 90</p>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="icon !text-white !text-[1.1rem] !mt-[.25rem] !mr-[.5rem]">
                            <i className="uil uil-message" />
                        </div>
                        <p className="!mb-0">
                            <a href="mailto:sandbox@email.com" className="hover !text-white hover:!text-white">
                                sandbox@email.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg center-nav transparent navbar-light">
                <div className="flex justify-center container xl:!flex-row lg:!flex-row !flex-nowrap items-center">
                    <div className="navbar-brand w-full">
                        <Link href="/">
                            <Image src="/assets/images/logo.png" alt="image" width={134} height={26} />
                        </Link>
                    </div>
                    <div className="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
                        <div className="offcanvas-header xl:!hidden lg:!hidden flex items-center justify-between flex-row p-6">
                            <h3 className="!text-white xl:!text-[1.5rem] !text-[calc(1.275rem_+_0.3vw)] !mb-0">Sandbox</h3>
                            <button
                                type="button"
                                className="btn-close btn-close-white !mr-[-0.75rem] m-0 p-0 leading-none !text-[#343f52] transition-all duration-[0.2s] ease-in-out border-0 motion-reduce:transition-none before:text-[1.05rem] before:text-white before:content-['\ed3b'] before:w-[1.8rem] before:h-[1.8rem] before:leading-[1.8rem] before:shadow-none before:transition-[background] before:duration-[0.2s] before:ease-in-out before:!flex before:justify-center before:items-center before:m-0 before:p-0 before:rounded-[100%] hover:no-underline bg-inherit before:bg-[rgba(255,255,255,.08)] before:font-Unicons hover:before:bg-[rgba(0,0,0,.11)]"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            />
                        </div>
                        <div className="offcanvas-body xl:!ml-auto lg:!ml-auto flex flex-col !h-full">{/* <Nav color="rgba(63,120,224)" /> */}</div>
                    </div>
                    <div className="navbar-other w-full !flex !ml-auto">
                        <ul className="navbar-nav !flex-row !items-center !ml-auto flex gap-1">
                            {/* Uncomment to include social links */}
                            {/* {socialLinks.map((elm, i) => (
                <li key={i} className="nav-item">
                  <a
                    className="!text-[1rem] transition-all duration-[0.2s] ease-in-out translate-y-0 motion-reduce:transition-none hover:translate-y-[-0.15rem]"
                    href={elm.href}
                  >
                    <i className={`uil ${elm.icon}`} style={{ color: elm.color }} />
                  </a>
                </li>
              ))} */}
                            <li className="nav-item hidden xl:block lg:block md:block">
                                <Link
                                    href="/signin"
                                    className="btn py-[0.4rem] px-4 btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] !rounded-[50rem] hover:translate-y-[-0.15rem] hover:shadow-[0_0.25rem_0.75rem_rgba(30,34,40,0.15)]"
                                >
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item hidden xl:block lg:block md:block">
                                <Link
                                    href="/signup"
                                    className="btn py-[0.4rem] px-4 btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] !rounded-[50rem] hover:translate-y-[-0.15rem] hover:shadow-[0_0.25rem_0.75rem_rgba(30,34,40,0.15)]"
                                />
                                Register
                            </li>
                            <li className="nav-item xl:!hidden lg:!hidden">
                                <button className="hamburger offcanvas-nav-btn">
                                    <span />
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header3;

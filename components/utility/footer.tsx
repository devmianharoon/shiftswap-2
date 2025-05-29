'use client';
import React from 'react';
import Image from 'next/image';
const socialLinks = [
    { icon: 'uil-twitter', unicode: '\\ed59', color: '#5daed5', href: '#' },
    { icon: 'uil-facebook-f', unicode: '\\eae2', color: '#4470cf', href: '#' },
    { icon: 'uil-dribbble', unicode: '\\eaa2', color: '#e94d88', href: '#' },
    { icon: 'uil-instagram', unicode: '\\eb9c', color: '#d53581', href: '#' },
    { icon: 'uil-youtube', unicode: '\\edb5', color: '#c8312b', href: '#' },
];

const footerLinks = [
    { text: 'About Us', href: '/about' },
    { text: 'Our Story', href: '/blog' },
    { text: 'Projects', href: '/projects' },
    { text: 'Terms of Use', href: '/terms' },
    { text: 'Privacy Policy', href: '/terms' },
];

const footerLinks2 = [
    { text: 'Support', href: '/services' },
    { text: 'Get Started', href: '/docs/intro' },
    { text: 'Documantation', href: '/docs/intro' },
    { text: 'Contact', href: '/contact' },
];

import Link from 'next/link';
export default function Footer({ hasMarginTop = true }) {
    return (
        <footer className={`bg-[#21262c] opacity-100 !text-[#cacaca] ${hasMarginTop ? '!mt-5 xl:!mt-24 lg:!mt-24 md:!mt-24' : ''} `}>
            <div className="container py-16 xl:!py-20 lg:!py-20 md:!py-20">
                <div className="flex flex-wrap mx-[-15px] !mt-[-30px] xl:!mt-0 lg:!mt-0">
                    <div className="md:w-4/12 xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget !text-[#cacaca]">
                            <Image
                                className="!mb-4"
                                alt="image"
                                src="/assets/img/logo-light.png"
                                width={134}
                                height={26}
                            />
                            <p className="!mb-4">
                                © {new Date().getFullYear()} Sandbox.
                                <br className="hidden xl:block lg:block !text-[#cacaca]" />
                                All rights reserved.
                            </p>
                            <nav className="nav social social-white">
                                {socialLinks.map((elm, i) => (
                                    <a
                                        key={i}
                                        className="!text-[#cacaca] text-[1rem] transition-all duration-[0.2s] ease-in-out translate-y-0 motion-reduce:transition-none hover:translate-y-[-0.15rem] m-[0_.7rem_0_0]"
                                        href={elm.href}
                                    >
                                        <i className={`uil ${elm.icon} before:content-[${elm.unicode}] !text-white text-[1rem]`} />
                                    </a>
                                ))}
                            </nav>
                            {/* /.social */}
                        </div>
                        {/* /.widget */}
                    </div>
                    {/* /column */}
                    <div className="md:w-4/12 xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget !text-[#cacaca]">
                            <h4 className="widget-title !text-white !mb-3">Get in Touch</h4>
                            <address className="xl:!pr-20 xxl:!pr-28 not-italic !leading-[inherit] block !mb-4">Moonshine St. 14/05 Light City, London, United Kingdom</address>
                            <a className="!text-[#cacaca] hover:!text-[#3f78e0]" href="mailto:first.last@email.com">
                                info@email.com
                            </a>
                            <br />
                            00 (123) 456 78 90
                        </div>
                        {/* /.widget */}
                    </div>
                    {/* /column */}
                    <div className="md:w-4/12 xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget !text-[#cacaca]">
                            <h4 className="widget-title !text-white !mb-3">Learn More</h4>
                            <ul className="pl-0 list-none !mb-0">
                                {footerLinks.map((elm, i) => (
                                    <li className={i != 0 ? '!mt-[0.35rem]' : ''} key={i}>
                                        <Link className="!text-[#cacaca] hover:!text-[#3f78e0]" href={elm.href}>
                                            {elm.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* /.widget */}
                    </div>
                    {/* /column */}
                    <div className="md:w-full xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget !text-[#cacaca]">
                            <h4 className="widget-title !text-white !mb-3">Our Newsletter</h4>
                            <p className="!mb-5">Subscribe to our newsletter to get our news &amp; deals delivered to you.</p>
                            <div className="newsletter-wrapper">
                                {/* Begin Mailchimp Signup Form */}
                                <div id="mc_embed_signup2">
                                    <form id="mc-embedded-subscribe-form2" name="mc-embedded-subscribe-form" className="validate dark-fields" onSubmit={(e) => e.preventDefault()}>
                                        <div id="mc_embed_signup_scroll2">
                                            <div className="!text-left input-group form-floating !relative flex flex-wrap items-stretch w-full">
                                                <input
                                                    type="email"
                                                    defaultValue=""
                                                    name="EMAIL"
                                                    className="required email form-control block w-full text-[12px] font-medium !leading-[1.7] appearance-none bg-clip-padding shadow-[0_0_1.25rem_rgba(30,34,40,0.04)] px-4 py-[0.6rem] rounded-[0.4rem] motion-reduce:transition-none focus:shadow-[0_0_1.25rem_rgba(30,34,40,0.04),unset] disabled:bg-[#aab0bc] disabled:opacity-100 file:!mt-[-0.6rem] file:mr-[-1rem] file:!mb-[-0.6rem] file:ml-[-1rem] file:!text-[#60697b] file:bg-[#fefefe] file:pointer-events-none file:transition-all file:duration-[0.2s] file:ease-in-out file:px-4 file:py-[0.6rem] file:rounded-none motion-reduce:file:transition-none placeholder:!text-[#959ca9] placeholder:opacity-100 border border-solid !border-[rgba(255,255,255,0.1)] !text-[#cacaca] bg-[rgba(255,255,255,.03)] focus-visible:!border-[rgba(63,120,224,0.5)]"
                                                    placeholder=""
                                                    id="mce-EMAIL2"
                                                />
                                                <label
                                                    className="!ml-[0.05rem] !text-[#959ca9] text-[.75rem] absolute z-[2] h-full overflow-hidden text-start text-ellipsis whitespace-nowrap pointer-events-none origin-[0_0] px-4 py-[0.6rem] left-0 top-0"
                                                    htmlFor="mce-EMAIL2"
                                                >
                                                    Email Address
                                                </label>
                                                <input
                                                    type="submit"
                                                    defaultValue="Join"
                                                    name="subscribe"
                                                    id="mc-embedded-subscribe2"
                                                    className="btn btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] !relative z-[2] focus:z-[5] hover:!transform-none hover:!translate-none border-0"
                                                />
                                            </div>
                                            <div id="mce-responses2" className="clear">
                                                <div className="response" id="mce-error-response2" style={{ display: 'none' }} />
                                                <div className="response" id="mce-success-response2" style={{ display: 'none' }} />
                                            </div>
                                            {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                                            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                                <input type="text" name="b_ddc180777a163e0f9f66ee014_4b1bcfa0bc" tabIndex={-1} defaultValue="" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                    </form>
                                </div>
                                {/*End mc_embed_signup*/}
                            </div>
                            {/* /.newsletter-wrapper */}
                        </div>
                        {/* /.widget */}
                    </div>
                    {/* /column */}
                </div>
                {/*/.row */}
            </div>
            {/* /.container */}
        </footer>
    );
}

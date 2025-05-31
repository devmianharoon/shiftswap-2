'use client';
import React from 'react';
import Image from 'next/image';
import { socialLinks } from '@/data/socials';
import { footerLinks } from '@/data/footerLinks';
import Link from 'next/link';

interface SocialLink {
    href: string;
    icon: string;
    unicode: string;
    color?: string;
}

interface FooterLink {
    href: string;
    text: string;
}

const Footer2: React.FC = () => {
    return (
        <footer className="!bg-[#ffffff]">
            <div className="container py-16 xl:!py-20 lg:!py-20 md:!py-20">
                <div className="flex flex-wrap mx-[-15px] !mt-[-30px] xl:!mt-0 lg:!mt-0">
                    <div className="md:w-4/12 xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget">
                            <Image className="!mb-4" src="/assets/images/logo-dark.png" alt="image" width={134} height={26} srcSet="/assets/images/logo-dark@2x.png 2x" />
                            <p className="!mb-4">
                                © {new Date().getFullYear()} Sandbox. <br className="hidden xl:block lg:block" />
                                All rights reserved.
                            </p>
                            <nav className="nav social">
                                {socialLinks.map((elm: SocialLink, i: number) => (
                                    <a
                                        key={i}
                                        className="!text-[1rem] transition-all duration-[0.2s] ease-in-out translate-y-0 motion-reduce:transition-none hover:translate-y-[-0.15rem] m-[0_.7rem_0_0]"
                                        href={elm.href}
                                    >
                                        <i className={`uil ${elm.icon} before:content-[${elm.unicode}] !text-[${elm.color}] text-[1rem]`} />
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>
                    <div className="md:w-4/12 xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget">
                            <h4 className="widget-title !mb-3">Get in Touch</h4>
                            <address className="xl:!pr-20 xxl:!pr-28 not-italic !leading-[inherit] block !mb-4">Moonshine St. 14/05 Light City, London, United Kingdom</address>
                            <a className="!text-[#60697b] hover:!text-[#60697b]" href="mailto:first.last@email.com">
                                info@email.com
                            </a>
                            <br />
                            00 (123) 456 78 90
                        </div>
                    </div>
                    <div className="md:w-4/12 xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget">
                            <h4 className="widget-title !mb-3">Learn More</h4>
                            <ul className="pl-0 list-none !mb-0">
                                {footerLinks.map((elm: FooterLink, i: number) => (
                                    <li className={i !== 0 ? '!mt-[0.35rem]' : ''} key={i}>
                                        <Link className="!text-[#60697b] hover:!text-[#3f78e0]" href={elm.href}>
                                            {elm.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="md:w-full xl:w-3/12 lg:w-3/12 w-full flex-[0_0_auto] !px-[15px] max-w-full xl:!mt-0 lg:!mt-0 !mt-[30px]">
                        <div className="widget">
                            <h4 className="widget-title !mb-3">Our Newsletter</h4>
                            <p className="!mb-5">Subscribe to our newsletter to get our news & deals delivered to you.</p>
                            <div className="newsletter-wrapper">
                                <div id="mc_embed_signup2">
                                    <form onSubmit={(e: React.FormEvent) => e.preventDefault()} id="mc-embedded-subscribe-form2" name="mc-embedded-subscribe-form" className="validate dark-fields">
                                        <div id="mc_embed_signup_scroll2">
                                            <div className="!text-left input-group form-floating !relative flex flex-wrap items-stretch w-full">
                                                <input
                                                    type="email"
                                                    defaultValue=""
                                                    name="EMAIL"
                                                    className="required form-control relative block w-full text-[.75rem] font-medium !text-[#60697b] bg-[#fefefe] bg-clip-padding border shadow-[0_0_1.25rem_rgba(30,34,40,0.04)] rounded-[0.4rem] border-solid border-[rgba(8,60,130,0.07)] transition-[border-color] duration-[0.15s] ease-in-out focus:shadow-[0_0_1.25rem_rgba(30,34,40,0.04),unset] focus-visible:!border-[rgba(63,120,224,0.5)] placeholder:!text-[#959ca9] placeholder:opacity-100 m-0 !pr-9 p-[.6rem_1rem] h-[calc(2.5rem_+_2px)] min-h-[calc(2.5rem_+_2px)] !leading-[1.25]"
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
                                            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                                <input type="text" name="b_ddc180777a163e0f9f66ee014_4b1bcfa0bc" tabIndex={-1} defaultValue="" />
                                            </div>
                                            <div className="clear" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer2;

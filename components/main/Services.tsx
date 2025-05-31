'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ModalVideo from '@/components/common/ModalVideo';
import Rellax from 'rellax';

const Services: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const rellax = new Rellax('.rellax', { speed: 0 });
            return () => {
                rellax.destroy();
            };
        }
    }, []);

    return (
        <>
            <div className="flex flex-wrap mx-[-15px] max-sm:!mt-[-50px] !mt-[-80px] xl:mx-[-7.5px] lg:mx-[-7.5px] items-center !mb-[4.5rem] md:!mb-[7rem] lg:!mb-[9rem] xl:!mb-[9rem]">
                <div className="md:w-8/12 lg:w-6/12 xl:w-6/12 w-full flex-[0_0_auto] xl:!px-[7.5px] lg:!px-[7.5px] !px-[15px] max-w-full !relative !mt-[80px]">
                    <a
                        className="btn btn-circle btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] btn-play ripple !mx-auto !mb-5 !absolute xl:!text-[2.3rem] !text-[calc(1.355rem_+_1.26vw)] w-[3.5rem] h-[3.5rem] !inline-flex !items-center !justify-center !leading-none !p-0 !rounded-[100%] before:content-[''] before:block before:absolute before:opacity-80 before:animate-[ripple-1_2s_infinite_ease-in-out] before:z-[-1] before:rounded-[50%] before:inset-0 before:bg-[#3f78e0] after:opacity-60 after:animate-[ripple-2_2s_infinite_ease-in-out] after:content-[''] after:block after:absolute after:z-[-1] after:rounded-[50%] after:inset-0 after:bg-[#3f78e0] after:[animation-delay:.5s]"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 3,
                        }}
                        onClick={() => setIsOpen(true)}
                    >
                        <i className="icn-caret-right !ml-[0.15rem] !relative z-[2] before:content-['\e900'] !text-[calc(1.355rem_+_1.26vw)]" />
                    </a>
                    <div
                        className="shape !rounded-[.4rem] !bg-[#edf2fc] rellax xl:block lg:block md:block !absolute z-[1]"
                        data-rellax-speed={0}
                        style={{
                            bottom: '-1.8rem',
                            right: '-1.5rem',
                            width: '85%',
                            height: '90%',
                        }}
                    />
                    <figure className="!rounded-[.4rem] relative z-[2]">
                        <Image className="!rounded-[.4rem]" src="/assets/img/photos/about12.jpg" alt="image" width={650} height={520} />
                    </figure>
                </div>
                <div className="xl:w-5/12 lg:w-5/12 w-full flex-[0_0_auto] xl:!px-[7.5px] lg:!px-[7.5px] !px-[15px] max-w-full xl:!ml-[8.33333333%] lg:!ml-[8.33333333%] !mt-[80px]">
                    <h2 className="!text-[.75rem] uppercase !text-[#aab0bc] !mb-3 !tracking-[0.02rem] !leading-[1.35]">Who Are We?</h2>
                    <h3 className="!text-[calc(1.325rem_+_0.9vw)] !font-normal font-DMSerif xl:!text-[2rem] !leading-[1.2] !mb-6">Company that believes in the power of creative strategy.</h3>
                    <p className="!mb-6">
                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et.
                    </p>
                    <div className="flex flex-wrap mx-[-15px] !mt-[-15px] xl:mx-[-20px]">
                        <div className="xl:w-6/12 w-full flex-[0_0_auto] !mt-[15px] xl:!px-[20px] !px-[15px] max-w-full">
                            <ul className="pl-0 list-none bullet-bg bullet-soft-primary !mb-0">
                                <li className="relative !pl-6">
                                    <span>
                                        <i className="uil uil-check w-4 h-4 text-[0.8rem] leading-none !tracking-[normal] !text-center flex justify-center items-center bg-[#dce7f9] !text-[#3f78e0] rounded-[100%] top-[0.2rem] before:content-['\e9dd'] before:align-middle before:table-cell absolute left-0" />
                                    </span>
                                    <span>Aenean eu leo quam ornare curabitur blandit tempus.</span>
                                </li>
                                <li className="relative !pl-6 !mt-3">
                                    <span>
                                        <i className="uil uil-check w-4 h-4 text-[0.8rem] leading-none !tracking-[normal] !text-center flex justify-center items-center bg-[#dce7f9] !text-[#3f78e0] rounded-[100%] top-[0.2rem] before:content-['\e9dd'] before:align-middle before:table-cell absolute left-0" />
                                    </span>
                                    <span>Nullam quis risus eget urna mollis ornare donec elit.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="xl:w-6/12 w-full flex-[0_0_auto] !mt-[15px] xl:!px-[20px] !px-[15px] max-w-full">
                            <ul className="pl-0 list-none bullet-bg bullet-soft-primary !mb-0">
                                <li className="relative !pl-6">
                                    <span>
                                        <i className="uil uil-check w-4 h-4 text-[0.8rem] leading-none !tracking-[normal] !text-center flex justify-center items-center bg-[#dce7f9] !text-[#3f78e0] rounded-[100%] top-[0.2rem] before:content-['\e9dd'] before:align-middle before:table-cell absolute left-0" />
                                    </span>
                                    <span>Etiam porta sem malesuada magna mollis euismod.</span>
                                </li>
                                <li className="relative !pl-6 !mt-3">
                                    <span>
                                        <i className="uil uil-check w-4 h-4 text-[0.8rem] leading-none !tracking-[normal] !text-center flex justify-center items-center bg-[#dce7f9] !text-[#3f78e0] rounded-[100%] top-[0.2rem] before:content-['\e9dd'] before:align-middle before:table-cell absolute left-0" />
                                    </span>
                                    <span>Fermentum massa vivamus faucibus amet euismod.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ModalVideo isOpen={isOpen} setIsOpen={setIsOpen} src="/assets/media/movie.mp4" />
        </>
    );
};

export default Services;

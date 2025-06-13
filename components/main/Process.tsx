'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Rellax from 'rellax';

const Process: React.FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const rellax = new Rellax('.rellax', { speed: 1 });
            return () => {
                rellax.destroy();
            };
        }
    }, []);

    return (
        <div className="flex flex-wrap mx-[-15px] max-sm:!mt-[-50px] !mt-[-80px] xl:mx-[-7.5px] lg:mx-[-7.5px] items-center !mb-[4.5rem] md:!mb-[7rem] lg:!mb-[9rem] xl:!mb-[9rem]">
            <div className="md:w-8/12 lg:w-6/12 xl:w-6/12 w-full flex-[0_0_auto] xl:!px-[7.5px] lg:!px-[7.5px] !px-[15px] max-w-full !relative !mt-[80px]">
                <div
                    className="shape bg-line red !rounded-[50%] rellax !w-[8rem] !h-[8rem] absolute z-[1] opacity-50 bg-[radial-gradient(#3f78e0_2px,transparent_2.5px)]"
                    data-rellax-speed={1}
                    style={{ top: '-2.2rem', left: '-2.4rem' }}
                />
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
                    <Image className="!rounded-[.4rem]" src="/assets/images/photos/about9.jpg" alt="image" width={575} height={550} />
                </figure>
            </div>
            <div className="lg:w-5/12 xl:w-4/12 xl:!ml-[8.33333333%] lg:!ml-[8.33333333%] w-full flex-[0_0_auto] xl:!px-[7.5px] lg:!px-[7.5px] !px-[15px] max-w-full !mt-[80px]">
                <h2 className="h1 !text-[calc(1.325rem_+_0.9vw)] xl:!text-[2rem] !leading-[1.2] !mb-3 font-DMSerif !font-normal">How It Works?</h2>
                <p className="lead text-[1.05rem] !leading-[1.6] !mb-6">So here are three working steps why our valued customers choose us.</p>
                <div className="flex flex-row !mb-6">
                    <div>
                        <span className="icon btn btn-circle btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] pointer-events-none !mr-5 w-[2.2rem] h-[2.2rem] !inline-flex !items-center !justify-center !text-[1rem] !leading-none !p-0 !rounded-[100%]">
                            <span className="number text-[0.9rem] table-cell text-center align-middle font-bold mx-auto my-0">1</span>
                        </span>
                    </div>
                    <div>
                        <h4 className="!mb-1">Setup Your Team</h4>
                        <p className="!mb-0">Create teams by department, skill, or role. Define shift policies and invite employees.</p>
                    </div>
                </div>
                <div className="flex flex-row !mb-6">
                    <div>
                        <span className="icon btn btn-circle btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] pointer-events-none !mr-5 w-[2.2rem] h-[2.2rem] !inline-flex !items-center !justify-center !text-[1rem] !leading-none !p-0 !rounded-[100%]">
                            <span className="number text-[0.9rem] table-cell text-center align-middle font-bold mx-auto my-0">2</span>
                        </span>
                    </div>
                    <div>
                        <h4 className="!mb-1">Post & Manage Shifts</h4>
                        <p className="!mb-0">Easily create, publish, and assign shifts. Allow eligible team members to request changes.</p>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div>
                        <span className="icon btn btn-circle btn-primary !text-white !bg-[#3f78e0] border-[#3f78e0] hover:text-white hover:bg-[#3f78e0] hover:!border-[#3f78e0] active:text-white active:bg-[#3f78e0] active:border-[#3f78e0] disabled:text-white disabled:bg-[#3f78e0] disabled:border-[#3f78e0] pointer-events-none !mr-5 w-[2.2rem] h-[2.2rem] !inline-flex !items-center !justify-center !text-[1rem] !leading-none !p-0 !rounded-[100%]">
                            <span className="number text-[0.9rem] table-cell text-center align-middle font-bold mx-auto my-0">3</span>
                        </span>
                    </div>
                    <div>
                        <h4 className="!mb-1">Swap & Approve</h4>
                        <p className="!mb-0">Employees request swaps. Managers get notified instantly and can approve or reject with a click.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Process;

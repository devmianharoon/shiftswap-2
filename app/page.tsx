import Footer2 from '@/components/main/Footer2';
import Header3 from '@/components/main/Header3';
import Brands from '@/components/main/Brands';
import Features from '@/components/main/Features';
import Hero from '@/components/main/Hero';
import Process from '@/components/main/Process';
import Services from '@/components/main/Services';
import React from 'react';

export const metadata: { title: string; description: string } = {
    title: 'Sandbox - Modern & Multipurpose React Template with Tailwind CSS',
    description: 'Sandbox - Modern & Multipurpose React Template with Tailwind CSS',
};

const Page: React.FC = () => {
    return (
        <div className="font-dm overflow-hidden">
            <div className="grow shrink-0">
                <Header3 />
                <section className="wrapper !bg-[#ffffff]">
                    <div className="container pt-8 xl:pt-[4.5rem] lg:pt-[4.5rem] md:pt-[4.5rem]">
                        <Hero />
                        <Features />
                        <Process />
                    </div>
                    <Brands />
                    <div className="container">
                        <Services />
                    </div>
                </section>
                <Footer2 />
            </div>
        </div>
    );
};

export default Page;

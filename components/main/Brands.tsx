import React from 'react';
import Image from 'next/image';
import { brands } from '@/data/brands';

interface Brand {
    src: string;
    width: number;
    height: number;
}



const Brands: React.FC = () => {
    return (
        <div className="xl:!px-[1.25rem] lg:!px-[1.25rem] !mb-[4.5rem] xl:!mb-[7rem] lg:!mb-[7rem] md:!mb-[7rem]">
            <div className="flex flex-wrap mx-0 md:mx-[-20px] lg:mx-[-20px] xl:mx-[-35px] !mt-[-40px] items-center">
                {brands.slice(0, 6).map((elm: Brand, i: number) => (
                    <div key={i} className="w-4/12 xl:w-2/12 lg:w-2/12 md:w-2/12 flex-[0_0_auto] !px-[15px] md:!px-[20px] lg:!px-[20px] xl:!px-[35px] !mt-[40px] max-w-full">
                        <figure className="px-5 md:!px-0 lg:!px-2 xl:!px-3 xxl:!px-4">
                            <Image alt="image" width={elm.width} height={elm.height} src={elm.src} />
                        </figure>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brands;

'use client';
import React from 'react';

import { useState } from 'react';
const data = [
    {
        id: 102,
        requested_by: 'John Smith',
        original_shift: '12 June, 9am–5pm',
        requested_shift: '14 June, 9am–5pm',
        status: 'Pending',
    },
    {
        id: 103,
        requested_by: 'Sarah Wilson',
        original_shift: '15 June, 2pm–10pm',
        requested_shift: '16 June, 9am–5pm',
        status: 'Approved',
    },
    {
        id: 104,
        requested_by: 'Mike Johnson',
        original_shift: '18 June, 6am–2pm',
        requested_shift: '20 June, 10pm–6am',
        status: 'Rejected',
    },
    {
        id: 105,
        requested_by: 'Emma Davis',
        original_shift: '22 June, 9am–5pm',
        requested_shift: '24 June, 2pm–10pm',
        status: 'Pending',
    },
    {
        id: 102,
        requested_by: 'John Smith',
        original_shift: '12 June, 9am–5pm',
        requested_shift: '14 June, 9am–5pm',
        status: 'Pending',
    },
    {
        id: 103,
        requested_by: 'Sarah Wilson',
        original_shift: '15 June, 2pm–10pm',
        requested_shift: '16 June, 9am–5pm',
        status: 'Approved',
    },
    {
        id: 104,
        requested_by: 'Mike Johnson',
        original_shift: '18 June, 6am–2pm',
        requested_shift: '20 June, 10pm–6am',
        status: 'Rejected',
    },
    {
        id: 105,
        requested_by: 'Emma Davis',
        original_shift: '22 June, 9am–5pm',
        requested_shift: '24 June, 2pm–10pm',
        status: 'Pending',
    },
    {
        id: 102,
        requested_by: 'John Smith',
        original_shift: '12 June, 9am–5pm',
        requested_shift: '14 June, 9am–5pm',
        status: 'Pending',
    },
    {
        id: 103,
        requested_by: 'Sarah Wilson',
        original_shift: '15 June, 2pm–10pm',
        requested_shift: '16 June, 9am–5pm',
        status: 'Approved',
    },
    {
        id: 104,
        requested_by: 'Mike Johnson',
        original_shift: '18 June, 6am–2pm',
        requested_shift: '20 June, 10pm–6am',
        status: 'Rejected',
    },
    {
        id: 105,
        requested_by: 'Emma Davis',
        original_shift: '22 June, 9am–5pm',
        requested_shift: '24 June, 2pm–10pm',
        status: 'Pending',
    },
];

const page = () => {
    const [filters, setFilters] = useState({
        date: '',
        shiftType: '',
        status: '',
        search: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <>
            <div className="w-full">
                <div className="flex justify-between py-4 items-center  border-b">
                    <h2 className="text-[28px]">Swap Requests</h2>
                    <button type="button" className="btn btn-info">
                        + Create Group
                    </button>
                </div>
                {/* filter section */}
                <div className="w-full p-2 bg-white rounded border flex flex-wrap gap-1 justify-between items-center">
                    <div className="flex flex-col w-[23%]">
                        <label htmlFor="date" className="text-sm text-gray-500 mb-1">
                            Filter by Date
                        </label>
                        <input type="date" name="date" id="date" value={filters.date} onChange={handleChange} className="border rounded px-2 py-2 text-sm w-full" />
                    </div>

                    <div className="flex flex-col w-[23%]">
                        <label htmlFor="shiftType" className="text-sm text-gray-500 mb-1">
                            Shift Type
                        </label>
                        <input type="text" name="shiftType" id="shiftType" value={filters.shiftType} onChange={handleChange} placeholder="" className="border rounded px-2 py-2 text-sm w-full" />
                    </div>

                    <div className="flex flex-col w-[23%]">
                        <label htmlFor="status" className="text-sm text-gray-500 mb-1">
                            Status
                        </label>
                        <input type="text" name="status" id="status" value={filters.status} onChange={handleChange} placeholder="" className="border rounded px-2 py-2 text-sm " />
                    </div>

                    <div className="flex flex-col w-[23%]">
                        <label htmlFor="search" className="text-sm text-gray-500 mb-1">
                            Search
                        </label>
                        <input type="text" name="search" id="search" value={filters.search} onChange={handleChange} placeholder="Search by name/shift" className="border rounded px-2 py-2 text-sm " />
                    </div>
                </div>

                {/*cards section */}

                <div className="mb-5 py-[22px] flex items-center justify-start flex-wrap w-full gap-6">
                    {data.map((item, index) => {
                        return (
                            <div className="max-w-[20rem] w-[33%] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none p-5 " key={index}>
                                <div className="text-[#515365] dark:text-white-light">
                                    <h5 className="text-[#3b3f5c] text-[20px] font-bold mb-1.5 dark:text-white-light pb-[16px]">Swap Request {item.id}</h5>
                                    <div className="flex">
                                        <div className="flex-1">
                                            <p className="text-white-dark mb-1.5">
                                                {' '}
                                                Requested By : <span className="text-[#3b3f5c]">{item.requested_by} </span>
                                            </p>
                                            <p className="text-white-dark mb-1.5">
                                                {' '}
                                                Original Shift : <span className="text-[#3b3f5c]"> {item.original_shift}</span>
                                            </p>
                                            <p className="text-white-dark mb-1.5">
                                                {' '}
                                                Requested Shift : <span className="text-[#3b3f5c]">{item.requested_shift} </span>
                                            </p>
                                            <p className="text-white-dark mb-1.5">
                                                {' '}
                                                Status : <span className="text-[#3b3f5c] rounded-[32px] bg-gray-200 px-[6px] py-[3px]"> {item.status}</span>
                                            </p>
                                            <div className="flex justify-start items-center text-[#e2a03f] gap-3 pt-[12px] ">
                                                <button type="button" className="btn btn-primary px-[8px] py-[6px]">
                                                    View
                                                </button>
                                                <button type="button" className="btn btn-outline-primary px-[8px] py-[6px]">
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-outline-primary px-[8px] py-[6px]">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default page;

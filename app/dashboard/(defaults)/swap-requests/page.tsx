'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import DummyFormComp from './Swap-Request';

const data = [
    { id: 102, requested_by: 'John Smith', original_shift: '12 June, 9am–5pm', requested_shift: '14 June, 9am–5pm', status: 'Pending' },
    { id: 103, requested_by: 'Sarah Wilson', original_shift: '15 June, 2pm–10pm', requested_shift: '16 June, 9am–5pm', status: 'Approved' },
    { id: 104, requested_by: 'Mike Johnson', original_shift: '18 June, 6am–2pm', requested_shift: '20 June, 10pm–6am', status: 'Rejected' },
    { id: 105, requested_by: 'Emma Davis', original_shift: '22 June, 9am–5pm', requested_shift: '24 June, 2pm–10pm', status: 'Pending' },
    { id: 106, requested_by: 'David Lee', original_shift: '25 June, 6am–2pm', requested_shift: '27 June, 2pm–10pm', status: 'Pending' },
    { id: 107, requested_by: 'Olivia Brown', original_shift: '28 June, 9am–5pm', requested_shift: '30 June, 10pm–6am', status: 'Approved' },
    { id: 108, requested_by: 'James White', original_shift: '1 July, 6am–2pm', requested_shift: '3 July, 2pm–10pm', status: 'Rejected' },
    { id: 109, requested_by: 'Linda Green', original_shift: '4 July, 9am–5pm', requested_shift: '6 July, 10pm–6am', status: 'Pending' },
    { id: 110, requested_by: 'Robert Hall', original_shift: '7 July, 6am–2pm', requested_shift: '9 July, 2pm–10pm', status: 'Approved' },
    { id: 111, requested_by: 'Sophia Scott', original_shift: '10 July, 9am–5pm', requested_shift: '12 July, 2pm–10pm', status: 'Pending' },
    { id: 112, requested_by: 'Henry King', original_shift: '13 July, 6am–2pm', requested_shift: '15 July, 9am–5pm', status: 'Rejected' },
];

const Page = () => {
    const [filters, setFilters] = useState({ date: '', shiftType: '', status: '', search: '' });
    const [modal2, setModal2] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 on filter change
    }, [filters]);

    // Filtered Data
    const filteredData = data.filter((item) => item.requested_by.toLowerCase().includes(filters.search.toLowerCase()) && item.status.toLowerCase().includes(filters.status.toLowerCase()));

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full p-4">
            {/* Header + Create Shift Button */}
            <div className="flex justify-between py-4 items-center border-b">
                <h2 className="text-[28px]">Swap Requests</h2>
                <button type="button" onClick={() => setModal2(true)} className="btn btn-info">
                    + Create Swap Request
                </button>
            </div>

            {/* Modal */}
            <Transition appear show={modal2} as={Fragment}>
                <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3 border border-b">
                                        <h5 className="font-bold text-lg">Create New Shift</h5>
                                        <XMarkIcon className="w-5 h-5 cursor-pointer hover:text-red-500" onClick={() => setModal2(false)} />
                                    </div>
                                    <div className="p-5">
                                        <DummyFormComp />
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Filters */}
            <div className="w-full mt-4 p-4 bg-white rounded border flex flex-wrap gap-4 justify-between">
                <input type="date" name="date" value={filters.date} onChange={handleChange} className="w-[23%] border rounded px-2 py-2 text-sm" />
                <input type="text" name="shiftType" placeholder="Shift Type" value={filters.shiftType} onChange={handleChange} className="w-[23%] border rounded px-2 py-2 text-sm" />
                <input type="text" name="status" placeholder="Status" value={filters.status} onChange={handleChange} className="w-[23%] border rounded px-2 py-2 text-sm" />
                <input type="text" name="search" placeholder="Search" value={filters.search} onChange={handleChange} className="w-[23%] border rounded px-2 py-2 text-sm" />
            </div>

            {/* Cards */}
            <div className="mt-6 mb-4 py-4 flex flex-wrap gap-6">
                {paginatedData.length === 0 ? (
                    <p>No results found.</p>
                ) : (
                    paginatedData.map((item, index) => (
                        <div key={index} className="w-[32%] max-w-[20rem] bg-white shadow rounded border p-5 dark:bg-[#191e3a]">
                            <h5 className="text-lg font-bold mb-3">Swap Request #{item.id}</h5>
                            <p>
                                Requested By : <strong>{item.requested_by} </strong>
                            </p>
                            <p>
                                Original Shift : <strong>{item.original_shift}</strong>
                            </p>
                            <p>
                                Requested Shift : <strong>{item.requested_shift}</strong>
                            </p>
                            <p>
                                Status : <strong></strong> <span className="bg-gray-100 rounded-[34px] px-2 py-1 inline-block">{item.status}</span>
                            </p>
                            <div className="flex gap-2 mt-4">
                                <button className="btn btn-primary text-sm ">Claim</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1 mt-6">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`px-4 py-2 rounded ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                            {page}
                        </button>
                    ))}

                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page;

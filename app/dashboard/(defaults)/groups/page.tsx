'use client';
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { MessageCircle } from 'lucide-react';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { useState, Fragment } from 'react';
import FormComp from './FormComp';

const tableData = [
    {
        id: 1,
        name: 'Front Desk Team',
        type: 'Role',
    },
    {
        id: 2,
        name: 'kitchen Staff',
        type: 'Role',
    },
    {
        id: 3,
        name: 'Senior Managers',
        type: 'Role',
    },
];

const table = () => {
    const [modal2, setModal2] = useState(false);
    return (
        <div className="table-responsive mb-5">
            {/*  button row with popup*/}
            <div className=" Button-Row flex justify-between items-center py-[28px]">
                <h2 className="text-[28px]">Groups</h2>
                <div className="mb-5">
                    <div className="flex items-center justify-center">
                        <button type="button" onClick={() => setModal2(true)} className="btn btn-info">
                            + Create Group
                        </button>
                    </div>
                    <Transition appear show={modal2} as={Fragment}>
                        <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
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
                                        <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3 border border-b">
                                                <h5 className="font-bold text-lg">Create New Group</h5>
                                                <button type="button" className="text-white-dark hover:text-dark" onClick={() => setModal2(false)}>
                                                    <XMarkIcon className="w-5 h-5 cursor-pointer hover:text-red-500" title="Close" />
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <div>
                                                    <FormComp />
                                                </div>
                                                <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                                        Discard
                                                    </button>
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal2(false)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>

            {/* table */}
            <table>
                <thead>
                    <tr>
                        <th>Group title</th>
                        <th>Group Type</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>
                                    <div className="whitespace-nowrap">{data.name}</div>
                                </td>
                                <td>{data.type}</td>

                                {/* <td>
                            <div
                                className={`whitespace-nowrap ${
                                    data.status === 'completed'
                                        ? 'text-success'
                                        : data.status === 'Pending'
                                        ? 'text-secondary'
                                        : data.status === 'In Progress'
                                        ? 'text-info'
                                        : data.status === 'Canceled'
                                        ? 'text-danger'
                                        : 'text-success'
                                }`}
                            >
                                {data.status}
                            </div>
                        </td> */}
                                <td className="text-center p-3 ">
                                    <Tippy content="Chat">
                                        <button type="button" className="px-2">
                                            <MessageCircle className="w-[20px] h-[20px] cursor-pointer " />
                                        </button>
                                    </Tippy>
                                    <Tippy content="Edit">
                                        <button type="button" className="px-2">
                                            <PencilIcon className="w-[20px] h-[20px] cursor-pointer " />
                                        </button>
                                    </Tippy>
                                    <Tippy content="Delete">
                                        <button type="button" className="px-2">
                                            <TrashIcon className="w-[20px] h-[20px] cursor-pointer " />
                                        </button>
                                    </Tippy>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default table;

'use client';
import React, { useEffect, useState, Fragment } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { MessageCircle } from 'lucide-react';
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, AppDispatch } from '@/store';
import FormComp from './FormComp';
import { fetchGroups } from '@/store/GetGroupSlice';
import { deleteGroup, resetDeleteState } from '@/store/DeleteGroup';
import { resetGroupState } from '@/store/CreateGroup';
import { Group } from '@/data/types/GetGroupTypes';
import { Popconfirm, Alert } from 'antd';
import { Pagination } from 'antd';

const GroupTable = () => {
    const [modal2, setModal2] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<any>(null); // State to hold group data for editing
    const [currentPage, setCurrentPage] = useState<number>(1);

    const [alertInfo, setAlertInfo] = useState<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
        visible: boolean;
    }>({ message: '', type: 'success', visible: false });
    // Redux hooks to dispatch actions and select state
    const dispatch = useDispatch<AppDispatch>();
    const { data: groupData, loading, error } = useSelector((state: IRootState) => state.getgroups);
    const { success: deleteSuccess, error: deleteError } = useSelector((state: IRootState) => state.deleteGroup);
    const { success, error: saveError } = useSelector((state: IRootState) => state.createGroup);

    useEffect(() => {
        if (success) {
            setModal2(false); // Close modal on successful save
            setSelectedGroup(null); // Clear selected group
            dispatch(resetGroupState()); // Reset group state
        }
    }, [success, dispatch]);
    // Fetch groups when the component mounts
    // and when the user data changes
    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
            console.error('No user data found in localStorage');
            return;
        }
        try {
            const user = JSON.parse(userData);
            if (!user?.uid) {
                console.error('Invalid user data: missing uid');
                return;
            }
            dispatch(fetchGroups({ companyId: user.business_id, page: currentPage }));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }, [dispatch ,currentPage]);
    // Handle delete group actions
    const handleDeleteGroup = async (node_id: string) => {
        try {
            await dispatch(deleteGroup({ node_id }));
            const userData = localStorage.getItem('user_data');
            if (userData) {
                const user = JSON.parse(userData);
                if (user?.business_id) {
                    dispatch(fetchGroups({ companyId: user.business_id, page: currentPage }));
                }
            }
        } catch (error) {
            console.error('Delete failed', error);
        }
    };
    // alert for delete confirmation
    useEffect(() => {
        if (deleteSuccess) {
            setAlertInfo({
                message: 'Group deleted successfully',
                type: 'success',
                visible: true,
            });
            dispatch(resetDeleteState());
        }

        if (deleteError) {
            setAlertInfo({
                message: deleteError,
                type: 'error',
                visible: true,
            });
            dispatch(resetDeleteState());
        }
    }, [deleteSuccess, deleteError, dispatch]);

    // Handle update group actions
    const handleUpdateGroup = (node_id: string) => {
        const group = groupData.groups.find((group) => group.id === node_id);
        if (group) {
            setSelectedGroup(group); // Set the group to edit
            setModal2(true); // Open the modal
        }
    };

    // Handle create group action
    const handleCreateGroup = () => {
        setSelectedGroup(null); // Clear selected group for create mode
        setModal2(true); // Open the modal
    };
    // Show alert after successful create or update
    useEffect(() => {
        if (success) {
            setAlertInfo({
                message: selectedGroup ? 'Group updated successfully' : 'Group created successfully',
                type: 'success',
                visible: true,
            });

            setModal2(false);
            setSelectedGroup(null);
            dispatch(resetGroupState());
        }
    }, [success, dispatch, selectedGroup]);
    return (
        <div className="table-responsive mb-5">
            {/* Alerts  */}
            {alertInfo.visible && <Alert message={alertInfo.message} type={alertInfo.type} closable onClose={() => setAlertInfo((prev) => ({ ...prev, visible: false }))} className="mb-4" showIcon />}
            {/* Header & Create Group Button */}
            <div className="Button-Row flex justify-between items-center py-[28px]">
                <h2 className="text-[28px]">Groups</h2>
                <div className="mb-5">
                    <div className="flex items-center justify-center">
                        <button type="button" onClick={handleCreateGroup} className="btn btn-info">
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
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                            <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3 border border-b">
                                                <h5 className="font-bold text-lg">{selectedGroup ? 'Update Group' : 'Create New Group'}</h5>
                                                <button type="button" onClick={() => setModal2(false)}>
                                                    <XMarkIcon className="w-5 h-5 cursor-pointer hover:text-red-500" title="Close" />
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <FormComp groupToEdit={selectedGroup} onClose={() => setModal2(false)} />
                                                {/* <div className="flex justify-end items-center mt-8">
                                                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={() => setModal2(false)}>
                                                        Close
                                                    </button>
                                                </div> */}
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>

            {/* Table */}
            {loading && <p>Loading...</p>}
            {!loading && !error && (
                <table>
                    <thead>
                        <tr>
                            <th>Group title</th>
                            <th>Group Type</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groupData.groups.map((data: Group, idx) => (
                            <tr key={idx}>
                                <td>
                                    <div className="whitespace-nowrap">{data.title}</div>
                                </td>
                                <td>{data.group_type}</td>
                                <td className="text-center p-3">
                                    <Tippy content="Chat">
                                        <button type="button" className="px-2">
                                            <MessageCircle className="w-[20px] h-[20px] cursor-pointer " />
                                        </button>
                                    </Tippy>
                                    <Tippy content="Edit">
                                        <button type="button" className="px-2" onClick={() => handleUpdateGroup(data.id)}>
                                            <PencilIcon className="w-[20px] h-[20px] cursor-pointer " />
                                        </button>
                                    </Tippy>
                                    <Tippy content="Delete">
                                        <span>
                                            <Popconfirm title="Are you sure to delete this group?" onConfirm={() => handleDeleteGroup(data.id)} okText="Yes" cancelText="No">
                                                <button type="button" className="px-2">
                                                    <TrashIcon className="w-[20px] h-[20px] cursor-pointer" />
                                                </button>
                                            </Popconfirm>
                                        </span>
                                    </Tippy>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div>
                <Pagination current={currentPage} total={groupData.total} showSizeChanger={false} pageSize={50} className="mt-4" onChange={(page) => setCurrentPage(page)} />
            </div>
        </div>
    );
};

export default GroupTable;

'use client';

import IconPlus from '@/components/icon/icon-plus';
import IconX from '@/components/icon/icon-x';
import { Transition, Dialog, DialogBackdrop, TransitionChild, DialogPanel } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useDispatch, useSelector } from 'react-redux';
import { ALLOWED_ROLES, fetchShifts } from '@/store/GetShiftsSlice';
import { IRootState, AppDispatch } from '@/store';
import { createOrUpdateShift } from '@/store/CreateOrUpdateShiftSlice';
import Select from 'react-select';
import { fetchCompanyMembers } from '@/store/MembersSlice';
import { Popconfirm } from 'antd';
import { fetchGroups } from '@/store/GetGroupSlice';

const ComponentsAppsCalendar = () => {
    const now = new Date();
    const getMonth = (dt: Date, add: number = 0) => {
        let month = dt.getMonth() + 1 + add;
        const str = (month < 10 ? '0' + month : month).toString();
        return str;
    };

    const dispatch = useDispatch<AppDispatch>();
    const { shifts } = useSelector((state: IRootState) => state.getShifts);
    const [events, setEvents] = useState<any[]>([]);
    const [isAddEventModal, setIsAddEventModal] = useState(false);
    const [minStartDate, setMinStartDate] = useState<any>('');
    const [minEndDate, setMinEndDate] = useState<any>('');
    const [assignmentType, setAssignmentType] = useState<'group' | 'user'>('group');
    const [showButtoms, setShowButtoms] = useState(false);
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const { members } = useSelector((state: IRootState) => state.members);
    const { data: groupData } = useSelector((state: IRootState) => state.getgroups);
    const defaultParams = {
        id: null,
        title: '',
        start: '',
        end: '',
        type: 'primary',
    };
    const [params, setParams] = useState<any>(defaultParams);

    // Fetch Shifts on Mount
    useEffect(() => {
        const month = now.toISOString().slice(0, 7); // Format: YYYY-MM
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
            const userRoles: string[] = user.roles || [];
            const hasAllowedRole = userRoles.some((role: string) => ALLOWED_ROLES.includes(role));
            if (hasAllowedRole) {
                setShowButtoms(true);
            } else {
                setShowButtoms(false);
            }
            dispatch(fetchShifts({ month }));
            dispatch(fetchCompanyMembers({ companyId: user.business_id, page: 1 }));
            dispatch(fetchGroups({ companyId: user.business_id, page: 1 }));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }, [dispatch]);

    const handleMonthChange = (arg: any) => {
        const newDate = new Date(arg.start);
        const month = newDate.toISOString().slice(0, 7); // YYYY-MM

        const userData = localStorage.getItem('user_data');
        if (!userData) {
            console.error('No user data found in localStorage');
            return;
        }

        try {
            const user = JSON.parse(userData);
            if (!user?.uid || !user?.business_id) {
                console.error('Invalid user data');
                return;
            }

            dispatch(fetchShifts({ month }));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    };

    // Convert Shifts to FullCalendar Event Format
    useEffect(() => {
        if (shifts && shifts.length > 0) {
            const mapped = shifts.map((shift) => ({
                id: shift.id,
                title: shift.title,
                start: shift.field_shift_start_date,
                end: shift.field_shift_end_date,
                className: 'primary',
            }));
            setEvents(mapped);
        }
    }, [shifts]);

    const dateFormat = (dt: any) => {
        dt = new Date(dt);
        const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
        const date = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
        const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
        const mins = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
        return dt.getFullYear() + '-' + month + '-' + date + 'T' + hours + ':' + mins;
    };

    const editEvent = (data: any = null) => {
        let params = JSON.parse(JSON.stringify(defaultParams));
        setParams(params);
        setAssignmentType('group'); // Default to 'group'
        setSelectedUserIds([]); // Reset selected IDs

        if (data) {
            let obj = JSON.parse(JSON.stringify(data.event));
            // Find the shift data from the shifts array
            const shift = shifts.find((s) => s.id === obj.id);
            if (shift) {
                setParams({
                    id: obj.id,
                    title: obj.title,
                    start: dateFormat(obj.start),
                    end: dateFormat(obj.end),
                    type: obj.classNames?.[0] || 'primary',
                });
                // Set assignment type and selected IDs
                const assignTo = (shift.field_shift_assign_to as 'group' | 'user') || 'group';
                setAssignmentType(assignTo);
                if (assignTo === 'group' && shift.field_groups) {
                    // Map field_groups to extract numeric IDs
                    setSelectedUserIds(shift.field_groups.map((group: { id: string }) => parseInt(group.id)));
                } else if (assignTo === 'user' && shift.field_users) {
                    // Map field_users to extract numeric IDs
                    setSelectedUserIds(shift.field_users.map((user: { id: string }) => parseInt(user.id)));
                }
                setMinStartDate(new Date());
                setMinEndDate(dateFormat(obj.start));
            }
        } else {
            setMinStartDate(new Date());
            setMinEndDate(new Date());
        }
        setIsAddEventModal(true);
    };

    const editDate = (data: any) => {
        let obj = {
            event: {
                start: data.start,
                end: data.end,
            },
        };
        editEvent(obj);
    };

    // create or update shift
    const saveEvent = async () => {
        if (!params.title || !params.start || !params.end) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        const userData = localStorage.getItem('user_data');
        if (!userData) {
            showMessage('User not found', 'error');
            return;
        }
        const user = JSON.parse(userData);
        const payload: any = {
            content_type: 'shift',
            operation: params.id ? 'update' : 'create',
            ...(params.id && { node_id: parseInt(params.id) }),
            node_data: {
                title: params.title,
                field_company: parseInt(user.business_id),
                field_groups: assignmentType === 'group' ? selectedUserIds : [],
                field_shift_assign_to: assignmentType,
                field_shift_start_date: params.start,
                field_shift_end_date: params.end,
                field_users: assignmentType === 'user' ? selectedUserIds : [], // you can expand to multiple users
            },
        };

        try {
            await dispatch(createOrUpdateShift(payload)).unwrap();
            showMessage(`Shift ${params.id ? 'updated' : 'created'} successfully.`);

            const month = new Date(params.start).toISOString().slice(0, 7);
            dispatch(fetchShifts({ month }));

            setIsAddEventModal(false);
        } catch (error: any) {
            showMessage(error || 'Shift operation failed', 'error');
        }
    };
    const startDateChange = (event: any) => {
        const dateStr = event.target.value;
        if (dateStr) {
            setMinEndDate(dateFormat(dateStr));
            setParams({ ...params, start: dateStr, end: '' });
        }
    };
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    // delete event
    const deleteEvent = async () => {
        if (!params.id) return;
        const month = new Date(params.start).toISOString().slice(0, 7);
        const payload = {
            content_type: 'shift',
            operation: 'delete' as const,
            node_id: parseInt(params.id),
        };
        try {
            await dispatch(createOrUpdateShift(payload)).unwrap();
            showMessage('Shift deleted successfully.');

            // ✅ Re-fetch from backend
            const refreshed = await dispatch(fetchShifts({ month })).unwrap();

            // ✅ Manually update local state from refreshed shifts
            const mapped = refreshed.map((shift: any) => ({
                id: shift.id,
                title: shift.title,
                start: shift.field_shift_start_date,
                end: shift.field_shift_end_date,
                className: 'primary',
            }));
            setEvents(mapped);

            setIsAddEventModal(false);
        } catch (error: any) {
            showMessage(error || 'Shift deletion failed', 'error');
        }
    };
    return (
        <div>
            <div className="panel mb-5">
                <div className="mb-4 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                        <div className="text-center text-lg font-semibold">Calendar</div>
                        <div className="mt-2 flex flex-wrap justify-center sm:justify-start">
                            {[
                                { label: 'Assigned', color: 'bg-primary' },
                                { label: 'Open', color: 'bg-info' },
                                { label: 'Swap', color: 'bg-success' },
                                { label: 'Rejected', color: 'bg-danger' },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center mr-4">
                                    <div className={`h-2.5 w-2.5 rounded-sm ${item.color} mr-2`}></div>
                                    <div>{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {showButtoms && (
                        <button type="button" className="btn btn-primary" onClick={() => editEvent()}>
                            <IconPlus className="mr-2" />
                            Create Shift
                        </button>
                    )}
                </div>
                <div className="calendar-wrapper">
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay',
                        }}
                        editable={true}
                        selectable={true}
                        eventClick={(event: any) => editEvent(event)}
                        select={(event: any) => editDate(event)}
                        events={events}
                        datesSet={handleMonthChange}
                    />
                </div>
            </div>

            {/* Modal */}
            <Transition appear show={isAddEventModal} as={Fragment}>
                <Dialog as="div" onClose={() => setIsAddEventModal(false)} open={isAddEventModal} className="relative z-50">
                    <TransitionChild
                        as={Fragment}
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogBackdrop className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="duration-300 ease-out"
                                enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100"
                                leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100"
                                leave-to="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600" onClick={() => setIsAddEventModal(false)}>
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium px-5 dark:bg-[#121c2c]">{params.id ? 'Edit Shift' : 'Add Shift'}</div>
                                    <div className="p-5">
                                        <form className="space-y-5">
                                            <div>
                                                <label htmlFor="title">Shift Title :</label>
                                                <input id="title" type="text" className="form-input" value={params.title || ''} onChange={changeValue} />
                                            </div>
                                            <div>
                                                <label htmlFor="start">From :</label>
                                                <input id="start" type="datetime-local" className="form-input" value={params.start || ''} min={minStartDate} onChange={startDateChange} />
                                            </div>
                                            <div>
                                                <label htmlFor="end">To :</label>
                                                <input id="end" type="datetime-local" className="form-input" value={params.end || ''} min={minEndDate} onChange={changeValue} />
                                            </div>
                                            <div>
                                                <label htmlFor="assignmentType">Assign To :</label>
                                                <select
                                                    id="assignmentType"
                                                    className="form-select mt-1"
                                                    value={assignmentType}
                                                    onChange={(e) => {
                                                        setAssignmentType(e.target.value as 'group' | 'user');
                                                        setSelectedUserIds([]);
                                                    }}
                                                >
                                                    <option value="group">Group</option>
                                                    <option value="user">User</option>
                                                </select>
                                            </div>
                                            {assignmentType === 'user' && (
                                                <div>
                                                    <label>Select Users :</label>
                                                    <Select
                                                        isMulti
                                                        options={members.members.map((m) => ({ value: m.uid, label: m.name }))}
                                                        onChange={(selectedOptions) => {
                                                            setSelectedUserIds(selectedOptions.map((opt) => opt.value));
                                                        }}
                                                        value={members.members.filter((m) => selectedUserIds.includes(m.uid)).map((m) => ({ value: m.uid, label: m.name }))}
                                                        placeholder="Select users..."
                                                    />
                                                </div>
                                            )}
                                            {assignmentType === 'group' && (
                                                <div>
                                                    <label>Select Groups :</label>
                                                    <Select
                                                        isMulti
                                                        options={groupData.groups.map((g: any) => ({ value: g.id, label: g.title }))}
                                                        value={groupData.groups.filter((g: any) => selectedUserIds.includes(parseInt(g.id))).map((g: any) => ({ value: g.id, label: g.title }))}
                                                        onChange={(selectedOptions) => {
                                                            setSelectedUserIds(selectedOptions.map((opt) => parseInt(opt.value)));
                                                        }}
                                                        placeholder="Select groups..."
                                                    />
                                                </div>
                                            )}

                                            <div className="flex justify-end space-x-3">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddEventModal(false)}>
                                                    Cancel
                                                </button>
                                                {showButtoms && (
                                                    <button type="button" onClick={saveEvent} className="btn btn-primary">
                                                        {params.id ? 'Update Shift' : 'Create Shift'}
                                                    </button>
                                                )}
                                                {params.id && showButtoms && (
                                                    <Popconfirm title="Are you sure you want to delete this shift?" onConfirm={deleteEvent} okText="Yes" cancelText="No">
                                                        <button type="button" className="btn btn-outline-danger">
                                                            Delete
                                                        </button>
                                                    </Popconfirm>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ComponentsAppsCalendar;

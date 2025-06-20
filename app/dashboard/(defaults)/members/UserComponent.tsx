'use client';
import IconFacebook from '@/components/icon/icon-facebook';
import IconInstagram from '@/components/icon/icon-instagram';
import IconLayoutGrid from '@/components/icon/icon-layout-grid';
import IconLinkedin from '@/components/icon/icon-linkedin';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import IconTwitter from '@/components/icon/icon-twitter';
import IconUser from '@/components/icon/icon-user';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';
import { fetchCompanyMembers } from '@/store/MembersSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, Dialog, TransitionChild, DialogPanel } from '@headlessui/react';
import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AppDispatch, IRootState } from '@/store';

interface Contact {
    uid: number;
    name: string;
    email: string;
    phone: string;
    roles: string[];
    profile?: string;
}

interface Params {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    roles: string;
}

interface Role {
    id: string;
    label: string;
}

const UserComponent: React.FC = () => {
    const [addContactModal, setAddContactModal] = useState<boolean>(false);
    const [assignRoleModal, setAssignRoleModal] = useState<boolean>(false);
    const [value, setValue] = useState<'list' | 'grid'>('list');
    const userData = localStorage.getItem('user_data');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const { members } = useSelector((state: IRootState) => state.members);
    console.log('Members:', members.members);
    
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (parsedUserData?.business_id) {
            dispatch(fetchCompanyMembers(parsedUserData.business_id));
        }
    }, [dispatch, parsedUserData?.business_id]);

    const [defaultParams] = useState<Params>({
        id: null,
        name: '',
        email: '',
        phone: '',
        roles: '',
    });
    const [params, setParams] = useState<Params>(JSON.parse(JSON.stringify(defaultParams)));
    const [search, setSearch] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [roles, setRoles] = useState<Role[]>([]);
    const [loadingRoles, setLoadingRoles] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filteredItems, setFilteredItems] = useState<Contact[]>(members.members);
    const [assigningRoles, setAssigningRoles] = useState<boolean>(false);

    // Update filteredItems when members or search changes
    useEffect(() => {
        setFilteredItems(() => members.members.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())));
    }, [search, members]);

    // Fetch roles from API on component mount
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                setLoadingRoles(true);
                
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/allowed_roles`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: Role[] = await response.json();
                setRoles(data);
                setError(null);
            } catch (err: any) {
                setError('Failed to fetch roles. Please try again later.');
                showMessage('Failed to fetch roles.', 'error');
                setRoles([]);
            } finally {
                setLoadingRoles(false);
            }
        };

        fetchRoles();
    }, []);

    // Assign roles to selected members
    const assignRoles = async () => {
        if (!selectedRole) {
            showMessage('Please select a role.', 'error');
            return;
        }

        if (selectedItems.length === 0) {
            showMessage('Please select at least one member.', 'error');
            return;
        }

        try {
            setAssigningRoles(true);

            const rawToken = Cookies.get('current_user_tt');
            const parsed = rawToken ? JSON.parse(rawToken) : null;
            const token = parsed?.token;

            const cleanUserIds = selectedItems.map((id) => Number(id)).filter(Boolean);

            for (const userId of cleanUserIds) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/role_assignment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        user_id: userId, // ✅ one user at a time
                        roles: [selectedRole],
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`API error for user ${userId}: ${response.status} – ${errorText}`);
                }
            }

            // ✅ Update UI roles
            setFilteredItems((prev) => prev.map((item) => (cleanUserIds.includes(item.uid) ? { ...item, roles: [selectedRole] } : item)));

            showMessage('Roles assigned successfully.', 'success');
            setSelectedItems([]);
            setSelectedRole('');
            setAssignRoleModal(false);
        } catch (err: any) {
            console.error('Assign Roles Error:', err);
            showMessage('Failed to assign roles. Please try again.', 'error');
        } finally {
            setAssigningRoles(false);
        }
    };

    const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const saveUser = () => {
        if (!params.name) {
            showMessage('Name is required.', 'error');
            return;
        }
        if (!params.email) {
            showMessage('Email is required.', 'error');
            return;
        }
        if (!params.phone) {
            showMessage('Phone is required.', 'error');
            return;
        }
        if (!params.roles) {
            showMessage('Role is required.', 'error');
            return;
        }

        if (params.id) {
            // Update user
            setFilteredItems((prev) =>
                prev.map((user) =>
                    user.uid === params.id
                        ? {
                              ...user,
                              name: params.name,
                              email: params.email,
                              phone: params.phone,
                              roles: [params.roles],
                          }
                        : user,
                ),
            );
        } else {
            // Add user
            const maxUserId = filteredItems.length ? Math.max(...filteredItems.map((item) => item.uid)) : 0;
            const newUser: Contact = {
                uid: maxUserId + 1,
                name: params.name,
                email: params.email,
                phone: params.phone,
                roles: [params.roles],
            };
            setFilteredItems([newUser, ...filteredItems]);
        }

        showMessage('User has been saved successfully.');
        setAddContactModal(false);
    };

    const editUser = (user: Contact | null = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams)) as Params;
        setParams(json);
        if (user) {
            setParams({
                id: user.uid,
                name: user.name,
                email: user.email,
                phone: user.phone,
                roles: user.roles[0] || '',
            });
        }
        setAddContactModal(true);
    };

    const deleteUser = (user: Contact) => {
        setFilteredItems(filteredItems.filter((d) => d.uid !== user.uid));
        setSelectedItems(selectedItems.filter((id) => id !== user.uid));
        showMessage('User has been deleted successfully.');
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
    };

    const showMessage = (msg: string = '', type: 'success' | 'error' = 'success') => {
        const toast = Swal.mixin({
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

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Contacts</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        {selectedItems.length > 0 && (
                            <div>
                                <button type="button" className="btn btn-primary" onClick={() => setAssignRoleModal(true)}>
                                    Assign Role
                                </button>
                            </div>
                        )}
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Add Contact
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div>
                        <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'grid' && 'bg-primary text-white'}`} onClick={() => setValue('grid')}>
                                <IconLayoutGrid />
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Contacts"
                            className="peer form-input py-2 ltr:pr-11 rtl:pl-11"
                            value={search}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role Type</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((member) => (
                                    <tr key={member.uid}>
                                        <td>
                                            <div className="flex w-max items-center">
                                                {member.name && (
                                                    <div className="w-max">
                                                        <img
                                                            src={`${process.env.NEXT_PUBLIC_BE_URL}/sites/default/files${member.profile}`}
                                                            className="h-8 w-8 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                                            alt="avatar"
                                                        />
                                                    </div>
                                                )}
                                                {!member.name && (
                                                    <div className="rounded-full border border-gray-300 p-2 ltr:mr-2 rtl:ml-2 dark:border-gray-800">
                                                        <IconUser className="h-4.5 w-4.5" />
                                                    </div>
                                                )}
                                                <div>{member.name}</div>
                                            </div>
                                        </td>
                                        <td>{member.email}</td>
                                        <td className="whitespace-nowrap">
                                            {member.roles.length > 1
                                                ? member.roles
                                                      .slice(1)
                                                      .map((role) => role.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()))
                                                      .join(', ')
                                                : 'Member'}
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-center gap-4">
                                                <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(member)}>
                                                    Edit
                                                </button>
                                                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(member)}>
                                                    Delete
                                                </button>
                                                <input type="checkbox" checked={selectedItems.includes(member.uid)} onChange={() => handleCheckboxChange(member.uid)} className="form-checkbox" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {value === 'grid' && (
                <div className="mt-5 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {filteredItems.map((member) => (
                        <div className="relative overflow-hidden rounded-md bg-white text-center shadow dark:bg-[#1c232f]" key={member.uid}>
                            <div className="rounded-t-md bg-white/40 bg-[url('/assets/images/notification-bg.png')] bg-cover bg-center p-6 pb-0">
                                <div className="mx-auto h-40 w-40 rounded-full bg-primary text-4xl font-semibold text-white flex items-center justify-center">
                                    {member.name.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <div className="relative -mt-10 px-6 pb-24">
                                <div className="rounded-md bg-white px-2 py-4 shadow-md dark:bg-gray-900">
                                    <div className="text-xl">{member.name}</div>
                                    <div className="text-white-dark">{member.roles.join(', ')}</div>
                                    <div className="mt-4">
                                        <ul className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
                                            <li>
                                                <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                    <IconFacebook />
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                    <IconInstagram />
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                    <IconLinkedin />
                                                </button>
                                            </li>
                                            <li>
                                                <button type="button" className="btn btn-outline-primary h-7 w-7 rounded-full p-0">
                                                    <IconTwitter />
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                                    <div className="flex items-center">
                                        <div className="flex-none ltr:mr-2 rtl:ml-2">Email :</div>
                                        <div className="truncate text-white-dark">{member.email}</div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-none ltr:mr-2 rtl:ml-2">Phone :</div>
                                        <div className="text-white-dark">{member.phone}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-0 mt-6 flex w-full gap-4 p-6 ltr:left-0 rtl:right-0">
                                <button type="button" className="btn btn-outline-primary w-1/2" onClick={() => editUser(member)}>
                                    Edit
                                </button>
                                <button type="button" className="btn btn-outline-danger w-1/2" onClick={() => deleteUser(member)}>
                                    Delete
                                </button>
                                <input type="checkbox" checked={selectedItems.includes(member.uid)} onChange={() => handleCheckboxChange(member.uid)} className="form-checkbox" />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Contact Modal */}
            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-50">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        {params.id ? 'Edit Contact' : 'Add Contact'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Name</label>
                                                <input id="name" type="text" placeholder="Enter Name" className="form-input" value={params.name} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="email">Email</label>
                                                <input id="email" type="email" placeholder="Enter Email" className="form-input" value={params.email} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="number">Phone Number</label>
                                                <input id="phone" type="text" placeholder="Enter Phone Number" className="form-input" value={params.phone} onChange={changeValue} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="roles">Role</label>
                                                <input id="roles" type="text" placeholder="Enter Role" className="form-input" value={params.roles} onChange={changeValue} />
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Update' : 'Add'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Assign Role Modal */}
            <Transition appear show={assignRoleModal} as={Fragment}>
                <Dialog as="div" open={assignRoleModal} onClose={() => setAssignRoleModal(false)} className="relative z-50">
                    <TransitionChild as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="panel w-full max-w-md overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAssignRoleModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">Assign Role</div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label className="block mb-2">Select Role</label>
                                                {loadingRoles ? (
                                                    <p>Loading roles...</p>
                                                ) : error ? (
                                                    <p className="text-red-500">{error}</p>
                                                ) : roles.length === 0 ? (
                                                    <p>No roles available.</p>
                                                ) : (
                                                    <div className="flex flex-col gap-4">
                                                        {roles.map((role) => (
                                                            <label key={role.id} className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    name="role"
                                                                    value={role.id}
                                                                    checked={selectedRole === role.id}
                                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                                    className="form-radio"
                                                                />
                                                                <span className="ltr:ml-2 rtl:mr-2">{role.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAssignRoleModal(false)}>
                                                    Cancel
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={assignRoles} disabled={assigningRoles}>
                                                    {assigningRoles ? 'Assigning...' : 'Confirm'}
                                                </button>
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

export default UserComponent;

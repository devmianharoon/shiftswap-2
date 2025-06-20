import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '@/store/skillsSlice';
import { AppDispatch, IRootState } from '@/store';
import { fetchCompanyMembers } from '@/store/MembersSlice';
import { createGroup } from '@/store/CreateGroup';
import { getBusinessTypeTid } from '@/data/lib/helperFunction';

interface Option {
    id: string | number;
    label: string;
}

interface OptionMap {
    [key: string]: Option[];
}

export default function FormComp() {
    const dispatch = useDispatch<AppDispatch>();
    const { skills, skillsLoading, skillsError } = useSelector((state: IRootState) => state.skills);
    const members = useSelector((state: IRootState) => state.members.members);

    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [groupType, setGroupType] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>([]);
    const [roles, setRoles] = useState<Option[]>([]);
    const [rolesLoading, setRolesLoading] = useState(false);
    const [rolesError, setRolesError] = useState<string | null>(null);

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
            dispatch(fetchSkills(user.business_type.tid));
            dispatch(fetchCompanyMembers(user.business_id));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchRoles = async () => {
            setRolesLoading(true);
            try {
                const res = await fetch('https://drupal-shift-swap.asdev.tech/api/allowed_roles');
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data: Option[] = await res.json();
                setRoles(data);
            } catch (error) {
                console.error('Error fetching roles:', error);
                setRolesError('Failed to load roles');
            } finally {
                setRolesLoading(false);
            }
        };

        fetchRoles();
    }, [dispatch]);

    const handleGroupTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setGroupType(e.target.value);
        setSelectedOptions([]);
    };

    const handleSelectChange = (selected: any) => {
        const values = selected ? selected.map((item: any) => item.value) : [];
        setSelectedOptions(values);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const payload: any = {
            title: groupName,
            field_group_type: groupType,
            body : description,
            field_users: groupType === 'user' ? selectedOptions : [],
            field_company: getBusinessTypeTid(), // Assuming company ID is 1 for now

        };

        if (groupType === 'role') payload.roles = selectedOptions as string[];
        else if (groupType === 'skill') payload.skills = selectedOptions as string[];
        else if (groupType === 'user') payload.users = selectedOptions as number[];
          dispatch(createGroup(payload
        //     {
        //     title: payload.title,
        //     field_group_type: payload.groupType,
        //     field_users: payload.users || [],
        //     field_company: getBusinessTypeTid(), // Assuming company ID is 1 for now
        //     body : payload.description,
        // }
    ))
    };

    // ✅ Create userOptions dynamically from Redux members
    const userOptions: Option[] = members.map((user) => ({
        id: user.uid,
        label: user.name,
    }));

    const groupTypeOptions: OptionMap = {
        user: userOptions,
        skill: skills.map((skill) => ({ id: skill.id, label: skill.name })),
        role: roles,
    };

    const currentOptions = groupType ? groupTypeOptions[groupType] : [];
    const reactSelectOptions = currentOptions.map((opt) => ({
        value: opt.id,
        label: opt.label,
    }));

    const selectedReactOptions = reactSelectOptions.filter((opt) => selectedOptions.includes(opt.value));

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 w-full max-w-xl">
            <div>
                <label className="block text-sm font-medium">Group Name *</label>
                <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Group Type *</label>
                <select
                    value={groupType}
                    onChange={handleGroupTypeChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                >
                    <option value="">Select type</option>
                    <option value="skill">Skills</option>
                    <option value="role">Role</option>
                    <option value="user">Users</option>
                </select>
            </div>

            {groupType && (
                <div>
                    <label className="block text-sm font-medium capitalize">Select {groupType}</label>
                    {groupType === 'skill' && skillsLoading ? (
                        <p className="text-sm text-gray-500 mt-2">Loading skills...</p>
                    ) : groupType === 'skill' && skillsError ? (
                        <p className="text-sm text-red-500 mt-2">{skillsError}</p>
                    ) : groupType === 'role' && rolesLoading ? (
                        <p className="text-sm text-gray-500 mt-2">Loading roles...</p>
                    ) : groupType === 'role' && rolesError ? (
                        <p className="text-sm text-red-500 mt-2">{rolesError}</p>
                    ) : (
                        <div className="mt-2">
                            <Select
                                isMulti
                                options={reactSelectOptions}
                                value={selectedReactOptions}
                                onChange={handleSelectChange}
                                placeholder={`Select ${groupType}s...`}
                            />
                        </div>
                    )}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                    placeholder="Enter group description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create Group
                </button>
            </div>
        </form>
    );
}

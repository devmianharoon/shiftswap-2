import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '@/store/skillsSlice';
import { fetchCompanyMembers } from '@/store/MembersSlice';
import { resetGroupState, saveGroup } from '@/store/CreateGroup';
import { getBusinessTypeTid } from '@/data/lib/helperFunction';
import { AppDispatch, IRootState } from '@/store';

interface Option {
    id: string | number;
    label: string;
}

interface OptionMap {
    [key: string]: Option[];
}

interface FormCompProps {
    groupToEdit?: any; // Group data for editing
    onClose: () => void; // Callback to close the modal
}

export default function FormComp({ groupToEdit, onClose }: FormCompProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { skills, skillsLoading, skillsError } = useSelector((state: IRootState) => state.skills);
    const { members } = useSelector((state: IRootState) => state.members);
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [groupType, setGroupType] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>([]);
    const [roles, setRoles] = useState<Option[]>([]);
    const [rolesLoading, setRolesLoading] = useState(false);
    const [rolesError, setRolesError] = useState<string | null>(null);
    const [companyId, setCompanyId] = useState<string>('');
    const { success, error: saveError, loading: saveLoading } = useSelector((state: IRootState) => state.createGroup);

    // Pre-fill form with groupToEdit data
    useEffect(() => {
        if (groupToEdit) {
            setGroupName(groupToEdit.title || '');
            setDescription(groupToEdit.body || '');
            setGroupType(groupToEdit.group_type || '');
            if (groupToEdit.group_type === 'user') {
                setSelectedOptions(groupToEdit.field_users || []);
            } else if (groupToEdit.group_type === 'skill') {
                setSelectedOptions(groupToEdit.feild_skills || []);
            } else if (groupToEdit.group_type === 'role') {
                setSelectedOptions(groupToEdit.roles || []);
            }
        } else {
            // Reset form for create mode
            setGroupName('');
            setDescription('');
            setGroupType('');
            setSelectedOptions([]);
        }
    }, [groupToEdit]);

    useEffect(() => {
        const userData = localStorage.getItem('user_data');
        if (!userData) {
            console.error('No user data found in localStorage');
            return;
        }
        try {
            const user = JSON.parse(userData);
            if (!user?.uid || !user?.business_id) {
                console.error('Invalid user data: missing uid or business_id');
                return;
            }
            setCompanyId(user.business_id);
            dispatch(fetchSkills(user.business_type.tid));
            dispatch(fetchCompanyMembers({ companyId: user.business_id , page: 1 }));
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }, [dispatch]);
    useEffect(() => {
        if (success) {
            setGroupName('');
            setDescription('');
            setGroupType('');
            setSelectedOptions([]);
            onClose();
            dispatch(resetGroupState());
        }
    }, [success, onClose, dispatch]);
    useEffect(() => {
        const fetchRoles = async () => {
            setRolesLoading(true);
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/allowed_roles`);
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
    }, []);

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
            body: description,
            field_company: getBusinessTypeTid(),
        };

        if (groupType === 'role') payload.roles = selectedOptions as string[];
        else if (groupType === 'skill') payload.feild_skills = selectedOptions as string[];
        else if (groupType === 'user') payload.field_users = selectedOptions as number[];

        if (groupToEdit) {
            payload.node_id = groupToEdit.id;
        }

        try {
            await dispatch(saveGroup(payload)).unwrap();
        } catch (error) {
            console.error('Failed to save group:', error);
        }
    };

    const userOptions: Option[] = members.members.map((user) => ({
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
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label className="block text-sm font-medium">Group Type *</label>
                <select
                    value={groupType}
                    onChange={handleGroupTypeChange}
                    className="mt-1 block w-full border rounded px-3 py-2"
                    required
                    disabled={!!groupToEdit} // Disable group type change in edit mode
                >
                    <option value="">Select type</option>
                    <option value="skill">Skills</option>
                    <option value="role">Role</option>
                    <option value="user">Users</option>
                </select>
            </div>
            {saveError && <p className="text-red-500">{saveError}</p>}
            {success && <p className="text-green-500">Group saved successfully!</p>}
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
                            <Select isMulti options={reactSelectOptions} value={selectedReactOptions} onChange={handleSelectChange} placeholder={`Select ${groupType}s...`} />
                        </div>
                    )}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea placeholder="Enter group description..." value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>

            <div className="flex justify-end gap-5">
                 <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={onClose}>
                    Close
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" disabled={saveLoading}>
                    {saveLoading ? 'Saving...' : groupToEdit ? 'Update Group' : 'Create Group'}
                </button>
               
            </div>
        </form>
    );
}

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkills } from '@/store/skillsSlice'; // Import the skills action
import { AppDispatch, IRootState } from '@/store';

interface Option {
    id: string | number;
    label: string;
}

interface OptionMap {
    [key: string]: Option[];
}

const staticGroupTypeOptions: OptionMap = {
    role: [
        { id: 'sub_admin', label: 'Sub-admin' },
        { id: 'marketing_manager', label: 'Marketing Manager' },
    ],
    user: [
        { id: 101, label: 'John Doe' },
        { id: 102, label: 'Jane Smith' },
        { id: 103, label: 'Alice' },
        { id: 104, label: 'Bob' },
    ],
};

export default function FormComp() {
    const dispatch = useDispatch<AppDispatch>();
    const { skills, skillsLoading, skillsError } = useSelector((state: IRootState) => state.skills);
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [groupType, setGroupType] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>([]);

    useEffect(() => {
        // Fetch skills when component mounts
        dispatch(fetchSkills());
    }, [dispatch]);

    const handleGroupTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setGroupType(e.target.value);
        setSelectedOptions([]);
    };

    const toggleOption = (id: string | number) => {
        setSelectedOptions((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const payload: any = {
            title: groupName,
            uid: 1, // Replace with actual user ID
            group_type: groupType,
            description,
        };

        if (groupType === 'role') {
            payload.roles = selectedOptions as string[];
        } else if (groupType === 'skill') {
            payload.skills = selectedOptions as string[]; // API expects string IDs for skills
        } else if (groupType === 'user') {
            payload.users = selectedOptions as number[];
        }

        try {
            const res = await fetch('https://drupal-shift-swap.asdev.tech/api/business/group', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log('API Response:', data);

            if (data.status === 'success') {
                alert('Group created successfully!');
                setGroupName('');
                setDescription('');
                setGroupType('');
                setSelectedOptions([]);
            } else {
                alert('Failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Request failed.');
        }
    };
    console.log(skills);

    // Dynamically create groupTypeOptions with skills from Redux
    const groupTypeOptions: OptionMap = {
        ...staticGroupTypeOptions,
        skill: skills.map((skill) => ({
            id: skill.id,
            label: skill.name,
        })),
    };
    console.log(groupTypeOptions);

    const currentOptions = groupType ? groupTypeOptions[groupType] : [];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 w-full max-w-xl">
            <div>
                <label className="block text-sm font-medium">Group Name *</label>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter group name" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label className="block text-sm font-medium">Group Type *</label>
                <select value={groupType} onChange={handleGroupTypeChange} className="mt-1 block w-full border rounded px-3 py-2" required>
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
                    ) : currentOptions.length > 0 ? (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                            {currentOptions.map(({ id, label }) => (
                                <div
                                    key={id}
                                    onClick={() => toggleOption(id)}
                                    className={`cursor-pointer border rounded px-3 py-2 text-sm ${selectedOptions.includes(id) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                                >
                                    {label}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 mt-2">No {groupType} available</p>
                    )}
                </div>
            )}

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea placeholder="Enter group description..." value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>

            <div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Create Group
                </button>
            </div>
        </form>
    );
}

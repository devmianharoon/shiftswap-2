import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Option {
    id: string | number;
    label: string;
}

interface OptionMap {
    [key: string]: Option[];
}

const groupTypeOptions: OptionMap = {
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
    skill: [
        { id: 201, label: 'Doctor' },
        { id: 202, label: 'Nurse' },
        { id: 203, label: 'Pharmacist' },
        { id: 204, label: 'Lab Technician' },
        { id: 205, label: 'Radiologist' },
        { id: 206, label: 'Surgeon' },
        { id: 207, label: 'Paramedic' },
        { id: 208, label: 'Medical Receptionist' },
    ],
};

export default function dummyFormComp() {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [groupType, setGroupType] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<(string | number)[]>([]);

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
            payload.skills = selectedOptions as number[];
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

    const currentOptions = groupType ? groupTypeOptions[groupType] : [];

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 w-full max-w-xl">
            <div>
                <label className="block text-sm font-medium">Original Shift *</label>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label className="block text-sm font-medium">Desired Swap Date</label>
                <input type="date" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label className="block text-sm font-medium">Desired Shift Time</label>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            {/* <div>
                <label className="block text-sm font-medium">Group Type *</label>
                <select value={groupType} onChange={handleGroupTypeChange} className="mt-1 block w-full border rounded px-3 py-2" required>
                    <option value="">Select type</option>
                    <option value="skill">Skills</option>
                    <option value="role">Role</option>
                    <option value="user">Users</option>
                </select>
            </div> */}

            <div>
                <label className="block text-sm font-medium">
                    Reason for Swap <span style={{ color: 'grey' }}>(Optional)</span>
                </label>
                <textarea
                    placeholder="Please provide the a brief reason for the swap request..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full border rounded px-3 py-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Swap With</label>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Attach Note or Document <span style={{ color: 'grey' }}>(Optional)</span>
                </label>
                <input type="file" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="" className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>

            <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-11 py-2 rounded hover:bg-blue-700">
                    Submit Request
                </button>
                <button type="submit" className=" text-black px-11 py-2 rounded border border-gray-200">
                    Submit Request
                </button>
            </div>
        </form>
    );
}

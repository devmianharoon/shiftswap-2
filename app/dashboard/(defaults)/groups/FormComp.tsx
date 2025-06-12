import React, { useState, ChangeEvent } from 'react';

interface GroupTypeOptions {
    [key: string]: string[];
}

const groupTypeOptions: GroupTypeOptions = {
    role: ['Sub-admin', 'Manager'],
    users: ['John Doe', 'Jane Smith', 'Alice', 'Bob'],
    skills: ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician', 'Radiologist', 'Surgeon', 'Paramedic', 'Medical Receptionist'],
};

export default function FormComp() {
    const [groupType, setGroupType] = useState<string>('');
    const [subOptions, setSubOptions] = useState<string[]>([]);
    const [selectedSubOptions, setSelectedSubOptions] = useState<string[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const handleGroupTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selected = e.target.value;
        setGroupType(selected);
        setSubOptions(groupTypeOptions[selected] || []);
        setSelectedSubOptions([]);
        if (selected !== 'users') {
            setSelectedUsers([]);
        }
    };

    const toggleUser = (user: string) => {
        setSelectedUsers((prev) => (prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]));
    };

    const toggleCheckboxOption = (option: string) => {
        setSelectedSubOptions((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
    };

    const removeUser = (user: string) => {
        setSelectedUsers((prev) => prev.filter((u) => u !== user));
    };

    return (
        <form className="space-y-6 p-6 w-full max-w-xl">
            <div>
                <label className="block text-sm font-medium">Group Name *</label>
                <input type="text" placeholder="Enter group name" className="mt-1 block w-full border rounded px-3 py-2" />
            </div>

            <div>
                <label className="block text-sm font-medium">Group Type *</label>
                <select value={groupType} onChange={handleGroupTypeChange} className="mt-1 block w-full border rounded px-3 py-2">
                    <option value="">Select type</option>
                    <option value="skills">Skills</option>
                    <option value="role">Role</option>
                    <option value="users">Users</option>
                </select>
            </div>

            {groupType && subOptions.length > 0 && (
                <div>
                    <label className="block text-sm font-medium capitalize">Select {groupType}</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {groupType === 'users'
                            ? subOptions.map((user) => (
                                  <div
                                      key={user}
                                      onClick={() => toggleUser(user)}
                                      className={`cursor-pointer border rounded px-3 py-2 text-sm ${selectedUsers.includes(user) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
                                  >
                                      {user}
                                  </div>
                              ))
                            : subOptions.map((option) => (
                                  <label key={option} className="flex items-center space-x-2">
                                      <input type="checkbox" checked={selectedSubOptions.includes(option)} onChange={() => toggleCheckboxOption(option)} />
                                      <span>{option}</span>
                                  </label>
                              ))}
                    </div>
                </div>
            )}

            <div>
                <label className="block text-sm font-medium">Team Members</label>
                <div className="flex flex-wrap gap-2 border rounded p-2 min-h-[44px]">
                    {selectedUsers.length > 0 ? (
                        selectedUsers.map((user) => (
                            <span key={user} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center space-x-1">
                                <span>{user}</span>
                                <button type="button" onClick={() => removeUser(user)} className="ml-1 text-red-500 font-bold hover:text-red-700">
                                    ×
                                </button>
                            </span>
                        ))
                    ) : (
                        <input disabled placeholder="Add team members..." className="flex-1 px-2 py-1 outline-none bg-transparent" />
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea placeholder="Enter group description..." className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
        </form>
    );
}

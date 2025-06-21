export interface Shift {
    id: string;
    created: number;
    title: string;
    published: boolean;
    company: {
        id: string;
        name: string;
    };
    field_groups?: {
        id: string;
        title: string;
    }[];
    field_shift_assign_to: string; // e.g., "users"
    field_shift_start_date: string; // ISO timestamp
    field_shift_end_date: string; // ISO timestamp
    field_users?: {
        id: string;
        name: string;
    }[];
    type: string; // e.g., "shift"
    path: string;
}

// Example usage
export interface UserFilter {
    uid: string; // User ID
    skill_id: string; // Skill ID
}

export interface FetchShiftsPayload {
    companyId: string;
    month?: string; // Format: YYYY-MM
    user?: UserFilter;
}

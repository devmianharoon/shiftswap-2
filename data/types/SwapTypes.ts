// src/types/swapTypes.ts

// Create Swap Payload
export interface CreateSwapPayload {
  title: string;
  field_shift_claimed_ref: string;
  field_shift_end_date: string; // format: YYYY-MM-DDTHH:MM:SS
  field_shift_owner_ref: string;
  field_shift_reference: number;
  field_shift_start_date: string; // format: YYYY-MM-DDTHH:MM:SS
  field_swap_status: string[]; // e.g., ["pending"], ["approved"]
}

// Update Swap Payload
export interface UpdateSwapPayload {
  node_id: string;
  updates: Partial<Omit<CreateSwapPayload, 'title' | 'field_shift_reference' | 'field_shift_owner_ref'>>;
}

// API Response Type (if known, or use any if unknown)
export interface SwapResponse {
  success: boolean;
  message?: string;
  data?: any;
}

// Slice State
export interface SwapState {
  loading: boolean;
  error: string | null;
  swapData: any; // or use SwapResponse["data"] if available
}

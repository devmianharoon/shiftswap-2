import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Member {
  uid: number;
  name: string;
  email: string;
  phone: string;
  roles: string[];
  status: boolean;
  profile: string;
  account_type: string;
  company: {
    id: string;
    name: string;
    secret_key: string;
  };
  skills: { tid: string; name: string }[];
  business_name: string | null;
  secret_key: string | null;
  business_type: string | null;
  logo: string | null;
  company_info: any | null;
}
interface MemberData {
  members : Member[];
  total: string;
}
interface CompanyMembersState {
  members: MemberData;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyMembersState = {
  members: {
    members: [],
    total: "0",
  },
  loading: false,
  error: null,
};

// Async thunk to fetch company members
export const fetchCompanyMembers = createAsyncThunk(
  "companyMembers/fetchCompanyMembers",
  async (companyId: string, { rejectWithValue }) => {
    try {
        console.log("Fetching members for company ID:", companyId);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BE_URL}/company/${companyId}/members`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch company members");
    }
  }
);

const companyMembersSlice = createSlice({
  name: "companyMembers",
  initialState,
  reducers: {
    clearMembers: (state) => {
      state.members = { members: [], total: "0" };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.members = action.payload;
      })
      .addCase(fetchCompanyMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMembers } = companyMembersSlice.actions;
export default companyMembersSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Lead } from '@/types';

interface LeadsState {
  list: Lead[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LeadsState = {
  list: [],
  status: 'idle',
  error: null,
};

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setLeads(state, action: PayloadAction<Lead[]>) {
      state.list = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    clearLeads(state) {
      state.list = [];
      state.status = 'idle';
      state.error = null;
    },
    leadsLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
    leadsFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addLead(state, action: PayloadAction<Lead>) {
      state.list.push(action.payload);
      state.status = 'succeeded';
    },
    updateLead(state, action: PayloadAction<Lead>) {
      const index = state.list.findIndex(l => l.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
      state.status = 'succeeded';
    },
    removeLead(state, action: PayloadAction<string>) {
      state.list = state.list.filter(l => l.id !== action.payload);
      state.status = 'succeeded';
    },
  },
});

export const {
  setLeads,
  clearLeads,
  leadsLoading,
  leadsFailed,
  addLead,
  updateLead,
  removeLead,
} = leadsSlice.actions;
export default leadsSlice.reducer;
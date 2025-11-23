import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOption } from './marketSlice';

interface UiState {
  sortBy: SortOption;
  selectedTokenId: string | null;
  isModalOpen: boolean;
}

const initialState: UiState = {
  sortBy: 'marketCap', // Changed to marketCap to allow reordering
  selectedTokenId: null,
  isModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    },
    openTokenModal(state, action: PayloadAction<string>) {
      state.selectedTokenId = action.payload;
      state.isModalOpen = true;
    },
    closeTokenModal(state) {
      state.selectedTokenId = null;
      state.isModalOpen = false;
    }
  },
});

export const { setSortBy, openTokenModal, closeTokenModal } = uiSlice.actions;
export default uiSlice.reducer;
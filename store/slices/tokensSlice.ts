import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Token, TokenUpdate, Category } from '../../types';

export type SortOption = 'age' | 'marketCap' | 'volume' | 'liquidity';

interface TokensState {
  items: Token[];
  status: 'idle' | 'loading' | 'succeeded';
  sortBy: SortOption;
}

const initialState: TokensState = {
  items: [],
  status: 'loading',
  sortBy: 'age', // default
};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<Token[]>) {
      state.items = action.payload;
      state.status = 'succeeded';
    },
    updateToken(state, action: PayloadAction<TokenUpdate>) {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        const currentToken = state.items[index];
        // Destructure security to handle partial updates separately
        const { security, ...restPayload } = action.payload;

        state.items[index] = {
          ...currentToken,
          ...restPayload,
          // Merge partial security update with existing security data
          security: security ? {
            ...currentToken.security,
            ...security
          } : currentToken.security,
          lastUpdate: Date.now(),
        };
      }
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.sortBy = action.payload;
    }
  },
});

export const { setTokens, updateToken, setSortBy } = tokensSlice.actions;

// Base selector
const selectTokensState = (state: { tokens: TokensState }) => state.tokens;

export const selectAllTokens = createSelector(
    selectTokensState,
    (tokensState) => tokensState.items
);

export const selectTokensStatus = createSelector(
    selectTokensState,
    (tokensState) => tokensState.status
);

export const selectSortBy = createSelector(
    selectTokensState,
    (tokensState) => tokensState.sortBy
);

// Helper sort function
const sortTokens = (tokens: Token[], sortBy: SortOption) => {
  // Create a shallow copy to sort
  const sorted = [...tokens];
  switch (sortBy) {
    case 'marketCap':
      return sorted.sort((a, b) => b.marketCap - a.marketCap);
    case 'volume':
      return sorted.sort((a, b) => b.volume - a.volume);
    case 'liquidity':
      return sorted.sort((a, b) => b.liquidity - a.liquidity);
    case 'age':
    default:
      // For age, we usually want newest first (larger timestamp)
      // but "createdAt" is a timestamp. Newest = highest timestamp.
      return sorted.sort((a, b) => b.createdAt - a.createdAt);
  }
};

// Memoized selectors for each category with sorting applied
export const selectNewPairs = createSelector(
  [selectAllTokens, selectSortBy],
  (tokens, sortBy) => sortTokens(tokens.filter((t) => t.category === Category.NEW_PAIRS), sortBy)
);

export const selectFinalStretch = createSelector(
  [selectAllTokens, selectSortBy],
  (tokens, sortBy) => sortTokens(tokens.filter((t) => t.category === Category.FINAL_STRETCH), sortBy)
);

export const selectMigrated = createSelector(
  [selectAllTokens, selectSortBy],
  (tokens, sortBy) => sortTokens(tokens.filter((t) => t.category === Category.MIGRATED), sortBy)
);

export default tokensSlice.reducer;
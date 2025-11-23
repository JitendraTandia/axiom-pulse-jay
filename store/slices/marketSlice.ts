import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Token, TokenUpdate, Category } from '../../types';

// Types
export type SortOption = 'age' | 'marketCap' | 'volume' | 'liquidity';

interface MarketState {
  items: Token[];
  lastSocketUpdate: number;
}

const initialState: MarketState = {
  items: [],
  lastSocketUpdate: 0,
};

const marketSlice = createSlice({
  name: 'market',
  initialState,
  reducers: {
    setInitialData(state, action: PayloadAction<Token[]>) {
      state.items = action.payload;
    },
    processSocketUpdate(state, action: PayloadAction<TokenUpdate>) {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        const currentToken = state.items[index];
        state.items[index] = {
          ...currentToken,
          ...action.payload,
          security: action.payload.security ? {
             ...currentToken.security,
             ...action.payload.security
          } : currentToken.security,
          lastUpdate: Date.now(),
        };
        state.lastSocketUpdate = Date.now();
      }
    },
  },
});

export const { setInitialData, processSocketUpdate } = marketSlice.actions;

// Selectors
// Define minimal state shape required for these selectors
interface RootStateLike {
    market: MarketState;
    ui: { sortBy: SortOption };
}

const selectMarket = (state: RootStateLike) => state.market;
const selectUi = (state: RootStateLike) => state.ui;

export const selectAllTokens = createSelector(
    [selectMarket], 
    (market): Token[] => market.items
);

// Memoized Sort Selector
const selectSortedTokens = createSelector(
  [selectAllTokens, selectUi],
  (tokens, ui): Token[] => {
    const sorted = [...tokens];
    const { sortBy } = ui;
    
    switch (sortBy) {
      case 'marketCap':
        return sorted.sort((a, b) => b.marketCap - a.marketCap);
      case 'volume':
        return sorted.sort((a, b) => b.volume - a.volume);
      case 'liquidity':
        return sorted.sort((a, b) => b.liquidity - a.liquidity);
      case 'age':
      default:
        return sorted.sort((a, b) => b.createdAt - a.createdAt);
    }
  }
);

// Category Selectors
export const selectNewPairs = createSelector(
  [selectSortedTokens],
  (tokens): Token[] => tokens.filter((t) => t.category === Category.NEW_PAIRS)
);

export const selectFinalStretch = createSelector(
  [selectSortedTokens],
  (tokens): Token[] => tokens.filter((t) => t.category === Category.FINAL_STRETCH)
);

export const selectMigrated = createSelector(
  [selectSortedTokens],
  (tokens): Token[] => tokens.filter((t) => t.category === Category.MIGRATED)
);

export default marketSlice.reducer;
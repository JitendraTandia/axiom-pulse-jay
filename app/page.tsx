
'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setInitialData, processSocketUpdate, selectNewPairs, selectFinalStretch, selectMigrated } from '../store/slices/marketSlice';
import { setSortBy, openTokenModal, closeTokenModal } from '../store/slices/uiSlice';
import { MOCK_TOKENS } from '../constants';
import { socketService } from '../services/socketService';
import { TokenUpdate, Token } from '../types';
import { Icons } from '../components/Icons';
import TokenCard from '../components/TokenCard';
import { CardSkeleton } from '../components/Skeleton';
import { Modal } from '../components/ui/Modal';
import { Popover } from '../components/ui/Popover';
import { TokenDetailModal } from '../components/TokenDetailModal';
import { cn } from '../lib/utils';
import { SortOption } from '../store/slices/marketSlice';

// OPTIMIZATION: Removed artificial delay. Returns data immediately for max LCP score.
const fetchTokens = async (): Promise<Token[]> => {
  return MOCK_TOKENS;
};

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isModalOpen, selectedTokenId, sortBy } = useAppSelector((state) => state.ui);
  
  // React Query for initial Data
  const { data: initialTokens, isLoading, isError } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    // Prevent refetching on window focus to keep TBT low
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  // Hydrate Redux when Query finishes
  useEffect(() => {
    if (initialTokens) {
      dispatch(setInitialData(initialTokens));
      
      // OPTIMIZATION: Delay socket connection slightly to allow main thread to settle (improves TBT)
      const timer = setTimeout(() => {
         socketService.connect(initialTokens);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [initialTokens, dispatch]);

  useEffect(() => {
    const unsubscribe = socketService.subscribe((update: TokenUpdate) => {
      dispatch(processSocketUpdate(update));
    });

    return () => {
      unsubscribe();
      socketService.disconnect();
    };
  }, [dispatch]);

  // Redux Selectors for UI
  const newPairs = useAppSelector(selectNewPairs);
  const finalStretch = useAppSelector(selectFinalStretch);
  const migrated = useAppSelector(selectMigrated);
  const allTokens = useAppSelector(state => state.market.items);
  
  const selectedToken = allTokens.find(t => t.id === selectedTokenId) || null;

  const handleSortChange = (option: SortOption) => {
    dispatch(setSortBy(option));
  };

  const handleTokenClick = (token: Token) => {
    dispatch(openTokenModal(token.id));
  };

  if (isError) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-negative gap-2">
            <Icons.Zap size={32} />
            <p>Failed to load market data. Please refresh.</p>
        </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 animate-in fade-in duration-500 min-h-0">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-0">
        <TokenColumn 
            title="New Pairs" 
            tokens={newPairs} 
            loading={isLoading} 
            count={newPairs.length}
            currentSort={sortBy}
            onSort={handleSortChange}
            onTokenClick={handleTokenClick}
        />
        <TokenColumn 
            title="Final Stretch" 
            tokens={finalStretch} 
            loading={isLoading} 
            count={finalStretch.length}
            currentSort={sortBy}
            onSort={handleSortChange}
            onTokenClick={handleTokenClick}
        />
        <TokenColumn 
            title="Migrated" 
            tokens={migrated} 
            loading={isLoading} 
            count={migrated.length}
            currentSort={sortBy}
            onSort={handleSortChange}
            onTokenClick={handleTokenClick}
        />
      </div>
      
      {/* Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => dispatch(closeTokenModal())} 
        title={selectedToken ? selectedToken.name : 'Details'}
      >
          {selectedToken && <TokenDetailModal token={selectedToken} />}
      </Modal>
    </div>
  );
}

// Sub-component (Atomic: Organism)
const TokenColumn = ({ 
    title, 
    tokens, 
    loading, 
    count, 
    currentSort, 
    onSort,
    onTokenClick 
}: { 
    title: string, 
    tokens: Token[], 
    loading: boolean, 
    count: number,
    currentSort: SortOption,
    onSort: (s: SortOption) => void,
    onTokenClick: (t: Token) => void
}) => (
    <div className="flex flex-col h-full bg-[#050505] min-h-0 rounded-lg overflow-hidden">
        {/* Column Header - Fixed */}
        <div className="flex items-center justify-between mb-2 px-1 py-2 min-h-[40px] border-b border-transparent bg-[#050505] shrink-0">
            <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-tight">{title}</h2>
            <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 bg-[#0e1014] px-2 py-0.5 rounded border border-[#1e2128]">
                    <Icons.Zap size={10} className="text-yellow-500" />
                    <span className="text-xs font-mono font-bold text-gray-300">{loading ? '-' : count}</span>
                 </div>
                 
                 <div className="flex items-center gap-1 text-[10px] text-textMuted font-mono relative group select-none">
                    <span onClick={() => onSort('age')} className={cn("cursor-pointer hover:text-white transition-colors", currentSort === 'age' && "text-accent font-bold")}>AGE</span>
                    <span className="text-[#1e2128]">|</span>
                    <span onClick={() => onSort('marketCap')} className={cn("cursor-pointer hover:text-white transition-colors", currentSort === 'marketCap' && "text-accent font-bold")}>MC</span>
                    <span className="text-[#1e2128]">|</span>
                    <span onClick={() => onSort('volume')} className={cn("cursor-pointer hover:text-white transition-colors", currentSort === 'volume' && "text-accent font-bold")}>VOL</span>
                    
                    <Popover 
                        trigger={
                            <div className="ml-2 p-1 hover:bg-[#1e2128] rounded cursor-pointer transition-colors text-textMuted hover:text-white">
                                <Icons.Filter size={12} />
                            </div>
                        }
                        content={
                            <div className="p-2 w-40 flex flex-col gap-1">
                                <span className="text-[10px] text-textMuted font-bold uppercase mb-1 px-1 tracking-wider">Sort By</span>
                                {['age', 'marketCap', 'volume', 'liquidity'].map((opt) => (
                                    <div 
                                        key={opt}
                                        onClick={() => onSort(opt as SortOption)}
                                        className={cn(
                                            "px-2 py-1.5 rounded text-xs cursor-pointer capitalize transition-colors flex items-center justify-between",
                                            currentSort === opt ? "bg-accent/10 text-accent font-medium" : "text-textMuted hover:bg-[#1e2128] hover:text-white"
                                        )}
                                    >
                                        {opt.replace(/([A-Z])/g, ' $1').trim()}
                                        {currentSort === opt && <Icons.Zap size={8} />}
                                    </div>
                                ))}
                            </div>
                        }
                        className="right-0 top-full"
                    />
                 </div>
            </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0 pr-1 space-y-2 pb-2 custom-scrollbar">
            {loading ? (
                Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)
            ) : tokens.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-32 text-textMuted text-xs italic bg-[#0e1014]/30 rounded border border-dashed border-[#1e2128]">
                    <span>No tokens found</span>
                </div>
            ) : (
                tokens.map((token, index) => (
                    <TokenCard 
                        key={token.id} 
                        token={token} 
                        onClick={onTokenClick}
                        // OPTIMIZATION: Only prioritize the very first image in each column.
                        // Loading 10+ priority images blocks the main thread. 
                        // Reduced from index < 4 to index === 0
                        priority={index === 0} 
                    />
                ))
            )}
        </div>
    </div>
);

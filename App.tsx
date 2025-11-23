import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import TokenCard from './components/TokenCard';
import { CardSkeleton } from './components/Skeleton';
import { Icons } from './components/Icons';
import { Modal } from './components/ui/Modal';
import { TokenDetailModal } from './components/TokenDetailModal';
import { MOCK_TOKENS } from './constants';
import { socketService } from './services/socketService';
import { TokenUpdate, Token } from './types';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { 
  setInitialData, 
  processSocketUpdate, 
  selectNewPairs, 
  selectFinalStretch, 
  selectMigrated, 
  SortOption
} from './store/slices/marketSlice';
import { setSortBy } from './store/slices/uiSlice';

function App() {
  const dispatch = useAppDispatch();
  // Using local loading state as marketSlice does not track status like tokensSlice did
  const [loading, setLoading] = useState(true);
  
  const currentSort = useAppSelector((state) => state.ui.sortBy);
  
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  // Memoized selectors automatically update when store changes
  const newPairs = useAppSelector(selectNewPairs);
  const finalStretch = useAppSelector(selectFinalStretch);
  const migrated = useAppSelector(selectMigrated);

  // Initialize data and socket
  useEffect(() => {
    // Simulate initial fetch delay
    setTimeout(() => {
        dispatch(setInitialData(MOCK_TOKENS));
        setLoading(false);
        socketService.connect(MOCK_TOKENS);
    }, 1500);

    const unsubscribe = socketService.subscribe((update: TokenUpdate) => {
        dispatch(processSocketUpdate(update));
    });

    return () => {
        unsubscribe();
        socketService.disconnect();
    };
  }, [dispatch]);

  const handleSortChange = (option: SortOption) => {
    dispatch(setSortBy(option));
  };

  const ColumnHeader = ({ title, count }: { title: string, count: number }) => (
    <div className="flex items-center justify-between mb-4 px-1 min-h-[32px]">
        <h2 className={`text-base font-bold text-white flex items-center gap-2`}>
            {title}
        </h2>
        <div className="flex items-center gap-3">
             <div className="flex items-center gap-1 bg-[#0e1014] px-2 py-0.5 rounded border border-[#1e2128]">
                <Icons.Zap size={10} className="text-yellow-500" />
                <span className="text-xs font-mono font-bold">{count}</span>
             </div>
             
             {/* Sort/Filter Controls */}
             <div className="flex items-center gap-1 text-[10px] text-textMuted font-mono relative group">
                <span 
                    onClick={() => handleSortChange('age')}
                    className={`cursor-pointer hover:text-white transition-colors ${currentSort === 'age' ? 'text-accent' : ''}`}
                    title="Sort by Age"
                >
                    AGE
                </span>
                <span className="text-[#1e2128]">|</span>
                <span 
                    onClick={() => handleSortChange('marketCap')}
                    className={`cursor-pointer hover:text-white transition-colors ${currentSort === 'marketCap' ? 'text-accent' : ''}`}
                    title="Sort by Market Cap"
                >
                    MC
                </span>
                <span className="text-[#1e2128]">|</span>
                 <span 
                    onClick={() => handleSortChange('volume')}
                    className={`cursor-pointer hover:text-white transition-colors ${currentSort === 'volume' ? 'text-accent' : ''}`}
                    title="Sort by Volume"
                >
                    VOL
                </span>
                
                <div className="ml-2 p-1 hover:bg-[#1e2128] rounded cursor-pointer transition-colors">
                     <Icons.Filter size={12} />
                </div>
             </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col text-textMain selection:bg-accent/30 font-sans">
      <Header />

      <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1800px] mx-auto">
            
            {/* Column 1: New Pairs */}
            <div className="flex flex-col">
                <ColumnHeader title="New Pairs" count={loading ? 0 : newPairs.length} />
                <div className="flex flex-col h-full gap-2">
                    {loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        newPairs.map(token => (
                            <TokenCard 
                                key={token.id} 
                                token={token} 
                                onClick={setSelectedToken}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Column 2: Final Stretch */}
            <div className="flex flex-col">
                <ColumnHeader title="Final Stretch" count={loading ? 0 : finalStretch.length} />
                 <div className="flex flex-col h-full gap-2">
                    {loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        finalStretch.map(token => (
                            <TokenCard 
                                key={token.id} 
                                token={token} 
                                onClick={setSelectedToken}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Column 3: Migrated */}
            <div className="flex flex-col">
                <ColumnHeader title="Migrated" count={loading ? 0 : migrated.length} />
                <div className="flex flex-col h-full gap-2">
                    {loading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : (
                        migrated.map(token => (
                            <TokenCard 
                                key={token.id} 
                                token={token} 
                                onClick={setSelectedToken}
                            />
                        ))
                    )}
                </div>
            </div>

        </div>
      </main>

       {/* Sticky Footer / Status Bar */}
       <div className="fixed bottom-0 left-0 w-full h-8 bg-[#0e1014] border-t border-[#1e2128] flex items-center justify-between px-4 text-[10px] font-mono text-textMuted z-40">
           <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400">
                    <Icons.Filter size={10} />
                    <span>PRESET 1</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                    <Icons.Wallet size={12} />
                    <span>Wallet</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                    <Icons.Twitter size={12} />
                    <span>Twitter</span>
                </div>
           </div>
           
           <div className="hidden md:flex items-center gap-6">
               <span className="text-orange-400 flex items-center gap-1"><Icons.Solana className="w-3 h-3"/> $86.0K</span>
               <span className="text-blue-400">$2,815</span>
               <span className="text-green-500">$129.62</span>
           </div>

           <div className="flex items-center gap-2">
               <div className="flex items-center gap-1 text-green-500">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="hidden sm:inline">Connection Stable</span>
               </div>
               <span className="uppercase text-[#1e2128]">|</span>
               <span className="uppercase text-xs font-bold text-gray-500">v1.0.4</span>
           </div>
       </div>

       {/* Token Detail Modal */}
       <Modal 
         isOpen={!!selectedToken} 
         onClose={() => setSelectedToken(null)}
         title="Token Details"
       >
          {selectedToken && <TokenDetailModal token={selectedToken} />}
       </Modal>
    </div>
  );
}

export default App;
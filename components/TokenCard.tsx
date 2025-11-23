import React, { memo, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Token, Category } from '../types';
import { Icons } from './Icons';
import { cn, formatCurrency, formatTimeAgo } from '../lib/utils';

interface TokenCardProps {
  token: Token;
  onClick?: (token: Token) => void;
  priority?: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, onClick, priority = false }) => {
  const prevMcRef = useRef(token.marketCap);
  const [flashClass, setFlashClass] = useState('');

  useEffect(() => {
    if (token.marketCap > prevMcRef.current) {
      setFlashClass('animate-flash-green');
    } else if (token.marketCap < prevMcRef.current) {
      setFlashClass('animate-flash-red');
    }
    
    if (token.marketCap !== prevMcRef.current) {
        const timer = setTimeout(() => setFlashClass(''), 500);
        prevMcRef.current = token.marketCap;
        return () => clearTimeout(timer);
    }
  }, [token.marketCap]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(token);
    }
  };

  if (!token) return null;

  // Dynamic colors for badges
  const top10Color = token.security.top10 > 30 ? 'text-[#f87171]' : 'text-[#10b981]'; 
  const sniperColor = token.security.sniperScore > 50 ? 'text-[#f87171]' : 'text-[#10b981]'; 
  const blueChipColor = token.security.blueChip > 0 ? 'text-[#3b82f6]' : 'text-[#6b7280]';

  return (
    <div 
        onClick={() => onClick?.(token)}
        onKeyDown={handleKeyDown}
        className={cn(
            "group relative flex w-full bg-[#0b0c0f] hover:bg-[#13161b] border border-transparent hover:border-[#2a2e37] rounded-lg p-2 gap-3 transition-all duration-300 cursor-pointer overflow-hidden select-none",
            flashClass
        )}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${token.name}`}
    >
      {/* Left Column: Image & Hover Actions */}
      <div className="relative shrink-0 w-[72px] h-[72px]">
         <div className="absolute -left-3 top-0 flex flex-col gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button aria-label="Hide token" className="bg-[#1a1d24] hover:bg-[#2a2e37] p-1 rounded-r-md border border-l-0 border-[#2a2e37] text-gray-500 hover:text-white">
                <Icons.EyeOff size={12} />
            </button>
             <button aria-label="Set alert" className="bg-[#1a1d24] hover:bg-[#2a2e37] p-1 rounded-r-md border border-l-0 border-[#2a2e37] text-gray-500 hover:text-white">
                <Icons.Bell size={12} />
            </button>
         </div>

         <div className="w-full h-full rounded-md overflow-hidden bg-[#1a1d24] border border-[#2a2e37] relative">
            <Image 
                src={token.imageUrl} 
                alt={`${token.symbol} logo`} 
                width={72}
                height={72}
                className="object-cover"
                priority={priority}
                unoptimized // Since we use external SVGs, this avoids server processing overhead while keeping lazy load
            />
            {/* Bottom Right Green Pill */}
            <div className="absolute bottom-0 right-0 p-[2px]">
                <div className="bg-black/80 rounded-full p-[2px]">
                   <Icons.Pill size={10} className="text-[#10b981] fill-[#10b981]" aria-hidden="true" />
                </div>
            </div>
         </div>
         <div className="absolute -bottom-1 left-0 w-full text-center">
             <span className="text-[9px] text-gray-500 font-mono">{token.address.slice(0, 4)}...pump</span>
         </div>
      </div>

      {/* Right Column: Data Grid */}
      <div className="flex-1 flex flex-col min-w-0 justify-between">
        
        {/* Row 1: Header + MC */}
        <div className="flex items-start justify-between leading-none">
            <div className="flex items-baseline gap-1.5 overflow-hidden">
                <h3 className="text-[15px] font-bold text-gray-100 truncate">{token.symbol}</h3>
                <span className="text-[13px] text-[#6b7280] truncate max-w-[100px]">{token.name}</span>
                <button aria-label="Copy address" className="text-[#4b5563] hover:text-white cursor-pointer">
                    <Icons.Copy size={12} />
                </button>
            </div>
            <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                    <span className="text-[10px] text-[#6b7280] font-bold">MC</span>
                    <span className="text-[15px] font-mono font-bold text-[#38bdf8] tracking-tight">
                        {formatCurrency(token.marketCap)}
                    </span>
                </div>
            </div>
        </div>

        {/* Row 2: Metrics */}
        <div className="flex items-center justify-between mt-0.5">
            <div className="flex items-center gap-2.5">
                <span className="text-[13px] font-mono text-[#10b981]">{formatTimeAgo(token.createdAt)}</span>
                
                {/* Social/Status Icons */}
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center text-[#9ca3af] gap-0.5 hover:text-white transition-colors" title="Links">
                       <Icons.Users size={12} aria-hidden="true" />
                       <Icons.Pill size={12} className="rotate-45" aria-hidden="true" />
                       <Icons.Search size={12} aria-hidden="true" />
                    </div>
                    
                    <div className="flex items-center gap-1 text-[#9ca3af]" title="Holders">
                        <Icons.Users size={12} aria-hidden="true" />
                        <span className="text-[11px] font-mono font-bold text-white">{token.holders}</span>
                    </div>

                    <div className="flex items-center gap-0.5 text-[#6b7280]" title="Streak">
                        <Icons.Flame size={12} aria-hidden="true" />
                        <span className="text-[11px] font-mono font-bold text-white">2</span>
                    </div>
                </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-1">
                <span className="text-[10px] text-[#6b7280] font-bold">V</span>
                <span className="text-[13px] font-mono font-bold text-white tracking-tight">
                    {formatCurrency(token.volume)}
                </span>
            </div>
        </div>

        {/* Row 3: TX & Fees */}
        <div className="flex justify-between items-end mt-1">
             {/* Left: Security Pills */}
             <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar mask-gradient-r">
                <BadgePill icon={<Icons.Users size={10} />} value={`${token.security.top10}%`} color={top10Color} label="Top 10 Holders" />
                <BadgePill icon={<Icons.ChefHat size={10} />} value="DS" color="text-[#6366f1]" bg="bg-[#6366f1]/10" label="Dev Status" />
                <BadgePill icon={<Icons.Target size={10} />} value={`${token.security.sniperScore}%`} color={sniperColor} label="Sniper Score" />
                <BadgePill icon={<Icons.Ghost size={10} />} value={`${token.security.blueChip}%`} color={blueChipColor} label="Blue Chip Holders" />
                <BadgePill icon={<Icons.Box size={10} />} value="0%" color="text-[#10b981]" label="Box" />
             </div>

             {/* Right: TX/Fee + Button */}
             <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                 <div className="flex items-center gap-2 text-[10px] font-mono">
                     <div className="flex items-center gap-0.5 text-gray-400">
                        <span className="text-[#6b7280] font-bold">F</span>
                        <Icons.Solana size={8} className="text-[#c084fc]" aria-hidden="true" /> 
                        <span className="text-white">0.018</span>
                     </div>
                     <div className="flex items-center gap-0.5">
                        <span className="text-[#6b7280] font-bold">TX</span>
                        <span className="text-white">{token.txCount}</span>
                        {/* Little red/green bar */}
                        <div className="flex h-1 w-3 gap-[1px]" role="presentation">
                            <div className="h-full w-full bg-[#10b981] rounded-l-sm"></div>
                            <div className="h-full w-1/3 bg-[#f87171] rounded-r-sm"></div>
                        </div>
                     </div>
                 </div>

                 <button 
                    onClick={(e) => { e.stopPropagation(); }}
                    aria-label="Quick Buy"
                    className="group/btn relative flex items-center gap-1.5 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 py-1 rounded-full transition-all active:scale-95"
                 >
                    <Icons.Zap size={12} fill="currentColor" aria-hidden="true" />
                    <span className="text-[12px] font-bold font-mono">0 SOL</span>
                 </button>
             </div>
        </div>
      </div>
    </div>
  );
};

// Helper for the pill badges
const BadgePill = ({ icon, value, color, bg = "bg-transparent", label }: { icon: React.ReactNode, value: string, color: string, bg?: string, label?: string }) => (
    <div 
        className={cn("flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] border border-[#1e2128] shrink-0 transition-colors duration-300", bg)}
        title={label}
        aria-label={label}
    >
        <span className={color} aria-hidden="true">{icon}</span>
        <span className={cn("text-[10px] font-mono font-medium transition-colors duration-300", color)}>{value}</span>
    </div>
);

export default memo(TokenCard, (prev, next) => {
    return (
        prev.token.id === next.token.id &&
        prev.token.marketCap === next.token.marketCap &&
        prev.token.volume === next.token.volume &&
        prev.token.txCount === next.token.txCount &&
        prev.token.lastUpdate === next.token.lastUpdate &&
        prev.token.security.top10 === next.token.security.top10 &&
        prev.token.security.sniperScore === next.token.security.sniperScore &&
        prev.priority === next.priority
    );
});
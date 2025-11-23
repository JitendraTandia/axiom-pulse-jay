import React from 'react';
import { Token } from '../types';
import { Icons } from './Icons';

interface TokenDetailModalProps {
  token: Token;
}

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({ token }) => {
  return (
    <div className="flex flex-col">
      {/* Top Banner Info */}
      <div className="p-6 bg-gradient-to-b from-[#13161b] to-[#0e1014]">
        <div className="flex gap-4">
            <img 
                src={token.imageUrl} 
                alt={token.symbol} 
                className="w-20 h-20 rounded-lg shadow-lg border border-[#1e2128]" 
            />
            <div className="flex flex-col justify-between py-1">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        {token.name} 
                        <span className="text-base text-textMuted font-normal">({token.symbol})</span>
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded border border-accent/20">
                            {token.category.replace('_', ' ')}
                        </span>
                        {token.badges.map(b => (
                            <span key={b} className="text-xs bg-[#1e2128] text-textMuted px-2 py-0.5 rounded border border-[#2a2e37]">
                                {b}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                     <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2128] hover:bg-[#2a2e37] text-xs text-white rounded transition-colors border border-[#2a2e37]">
                         <Icons.Twitter size={12} /> Twitter
                     </button>
                     <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2128] hover:bg-[#2a2e37] text-xs text-white rounded transition-colors border border-[#2a2e37]">
                         <Icons.Telegram size={12} /> Telegram
                     </button>
                     <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1e2128] hover:bg-[#2a2e37] text-xs text-white rounded transition-colors border border-[#2a2e37]">
                         <Icons.Website size={12} /> Website
                     </button>
                </div>
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 border-t border-[#1e2128]">
         <div className="p-4 border-r border-b border-[#1e2128]">
             <div className="text-[10px] text-textMuted uppercase mb-1">Market Cap</div>
             <div className="text-lg font-mono font-bold text-gold">${token.marketCap.toLocaleString()}</div>
         </div>
         <div className="p-4 border-b border-[#1e2128]">
             <div className="text-[10px] text-textMuted uppercase mb-1">Volume (24h)</div>
             <div className="text-lg font-mono font-bold text-white">${token.volume.toLocaleString()}</div>
         </div>
         <div className="p-4 border-r border-[#1e2128]">
             <div className="text-[10px] text-textMuted uppercase mb-1">Liquidity</div>
             <div className="text-base font-mono font-bold text-white">${token.liquidity.toFixed(2)}k</div>
         </div>
         <div className="p-4">
             <div className="text-[10px] text-textMuted uppercase mb-1">Holders</div>
             <div className="text-base font-mono font-bold text-white">{token.holders}</div>
         </div>
      </div>

      {/* Contract Address */}
      <div className="p-4 bg-[#050505] border-t border-[#1e2128] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-xs text-textMuted">CA:</span>
              <code className="text-xs text-gray-400 font-mono truncate">{token.address}</code>
          </div>
          <button className="text-accent hover:text-white transition-colors">
              <Icons.Copy size={14} />
          </button>
      </div>

      {/* Action Button */}
      <div className="p-4">
          <button className="w-full py-3 bg-accent hover:bg-blue-600 text-white font-bold rounded-lg transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20">
              Quick Buy (Mock)
          </button>
      </div>
    </div>
  );
};
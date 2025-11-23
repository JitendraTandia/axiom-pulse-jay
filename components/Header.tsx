import React from 'react';
import { Icons } from './Icons';

export const Header = () => {
  return (
    <header className="flex flex-col w-full bg-[#050505] border-b border-[#1e2128] z-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 h-[50px] w-full">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 select-none cursor-pointer">
                {/* Logo Pyramid shape */}
                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[14px] border-b-white border-r-[8px] border-r-transparent"></div>
                <span className="font-bold text-lg tracking-tight text-white">AXIOM <span className="text-[#6b7280] font-normal text-sm">Pro</span></span>
            </div>
            
            <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#9ca3af]">
                <a href="#" className="hover:text-white transition-colors">Discover</a>
                <a href="#" className="text-[#3b82f6] hover:text-[#3b82f6]/80 transition-colors">Pulse</a>
                <a href="#" className="hover:text-white transition-colors">Trackers</a>
                <a href="#" className="hover:text-white transition-colors">Perpetuals</a>
                <a href="#" className="hover:text-white transition-colors">Yield</a>
                <a href="#" className="hover:text-white transition-colors">Vision</a>
                <a href="#" className="hover:text-white transition-colors">Portfolio</a>
            </nav>
         </div>

         <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center relative">
                <Icons.Search className="absolute left-3 text-[#6b7280]" size={14} aria-hidden="true" />
                <input 
                    type="text" 
                    placeholder="Search by token or CA..." 
                    aria-label="Search tokens"
                    className="bg-[#0e1014] border border-[#1e2128] rounded-full pl-9 pr-10 py-1.5 text-[12px] w-[280px] focus:outline-none focus:border-[#3b82f6] text-white placeholder:text-[#4b5563] transition-colors"
                />
                <span className="absolute right-3 text-[#6b7280] text-[10px] border border-[#374151] rounded px-1.5 py-0.5">/</span>
            </div>

            <button aria-label="Select Network" className="flex items-center gap-2 bg-[#0e1014] border border-[#1e2128] px-3 py-1.5 rounded-full text-[12px] font-medium text-white hover:border-[#3b82f6]/50 transition-colors group">
                <Icons.Solana className="w-3 h-3 text-[#3b82f6]" aria-hidden="true" />
                <span>SOL</span>
                <Icons.ChevronDown className="text-gray-500 group-hover:text-white" size={12} aria-hidden="true" />
            </button>

            <button className="bg-[#3b82f6] text-white px-5 py-1.5 rounded-full text-[13px] font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                Deposit
            </button>
            
            <div className="flex items-center gap-4 text-[#9ca3af] ml-2">
                <button aria-label="Favorites" className="hover:text-white cursor-pointer transition-colors">
                    <Icons.Star size={18} aria-hidden="true" />
                </button>
                <button aria-label="Notifications" className="hover:text-white cursor-pointer transition-colors">
                    <Icons.Bell size={18} aria-hidden="true" />
                </button>
                <button aria-label="Wallet" className="flex items-center gap-2 border border-[#1e2128] bg-[#0e1014] rounded px-3 py-1.5 text-xs hover:border-[#374151] cursor-pointer transition-colors">
                    <Icons.Wallet size={14} className="text-[#3b82f6]" aria-hidden="true" />
                    <div className="flex flex-col leading-none">
                        <span className="font-bold text-white">0</span>
                    </div>
                     <Icons.ChevronDown size={12} aria-hidden="true" />
                </button>
                 <button aria-label="Profile" className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 cursor-pointer border border-white/10"></button>
            </div>
         </div>
      </div>

      {/* Sub Header (Pulse specific) */}
      <div className="flex items-center justify-between px-4 h-[44px] bg-[#050505] w-full border-b border-[#1e2128]/50">
         <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white tracking-tight">Pulse</h1>
            <div className="flex items-center bg-[#0e1014] rounded-md border border-[#1e2128] p-0.5">
                <button aria-label="List View" className="w-7 h-6 rounded-[4px] bg-[#3b82f6]/20 flex items-center justify-center text-[#3b82f6] cursor-pointer">
                    <Icons.Menu size={14} aria-hidden="true" />
                </button>
                 <button aria-label="Grid View" className="w-7 h-6 rounded-[4px] bg-transparent flex items-center justify-center text-[#6b7280] hover:text-white hover:bg-[#1e2128] cursor-pointer transition-colors">
                    <Icons.Box size={14} aria-hidden="true" />
                </button>
            </div>
         </div>

         <div className="flex items-center gap-4 text-[#9ca3af] text-xs">
             <button aria-label="Help" className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
                <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">?</div>
             </button>
             <button aria-label="Display Settings" className="flex items-center gap-2 bg-[#0e1014] border border-[#1e2128] px-3 py-1.5 rounded-md text-white hover:bg-[#1e2128] transition-colors font-medium">
                <Icons.Grid size={14} aria-hidden="true" />
                <span>Display</span>
                <Icons.ChevronDown size={12} className="text-gray-500" aria-hidden="true" />
             </button>
             <div className="w-[1px] h-4 bg-[#1e2128]"></div>
             <button aria-label="Users" className="hover:text-white cursor-pointer"><Icons.Users size={16} aria-hidden="true" /></button>
             <button aria-label="Layout" className="hover:text-white cursor-pointer"><Icons.Grid size={16} aria-hidden="true" /></button>
             <button aria-label="Settings" className="hover:text-white cursor-pointer"><Icons.Settings size={16} aria-hidden="true" /></button>
             
             <div className="flex items-center gap-2 ml-2 bg-[#0e1014] border border-[#1e2128] rounded px-2 py-1">
                 <Icons.Box size={14} aria-hidden="true" />
                 <span className="font-mono">1</span>
                 <Icons.Menu size={14} aria-hidden="true" />
                 <span className="font-mono">0</span>
                 <Icons.ChevronDown size={12} aria-hidden="true" />
             </div>
         </div>
      </div>
    </header>
  );
};
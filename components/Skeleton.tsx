import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="w-full bg-card rounded-md p-3 mb-0 border border-transparent">
       <div className="flex gap-3">
         <div className="w-14 h-14 bg-[#1a1d24] rounded-md animate-pulse" />
         <div className="flex-1 flex flex-col justify-between py-1">
            <div className="h-3 w-16 bg-[#1a1d24] rounded animate-pulse" />
            <div className="h-2.5 w-24 bg-[#1a1d24] rounded animate-pulse" />
         </div>
         <div className="w-20 flex flex-col items-end gap-2 py-1">
            <div className="h-3.5 w-16 bg-[#1a1d24] rounded animate-pulse" />
            <div className="h-2.5 w-12 bg-[#1a1d24] rounded animate-pulse" />
         </div>
       </div>
       <div className="h-[1px] w-full bg-[#1e2128] my-2.5" />
       <div className="flex justify-between items-center">
          <div className="h-2.5 w-10 bg-[#1a1d24] rounded animate-pulse" />
          <div className="h-4 w-14 bg-[#1a1d24] rounded animate-pulse" />
       </div>
    </div>
  );
};
import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
            className={`absolute z-50 px-2 py-1 text-[10px] font-medium text-white bg-black border border-[#1e2128] rounded shadow-xl whitespace-nowrap pointer-events-none transform -translate-x-1/2 left-1/2 ${
                position === 'top' ? '-top-8' : 'top-full mt-2'
            }`}
        >
          {content}
          <div 
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-black border-l border-b border-[#1e2128] transform rotate-45 ${
                position === 'top' ? 'bottom-[-5px]' : 'top-[-5px] border-l-0 border-b-0 border-r border-t'
            }`}
          />
        </div>
      )}
    </div>
  );
};
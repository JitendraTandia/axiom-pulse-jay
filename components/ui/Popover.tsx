import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({ trigger, content, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className={cn(
            "absolute z-50 mt-2 w-48 rounded-md border border-[#1e2128] bg-[#0e1014] shadow-xl animate-in fade-in zoom-in-95 duration-100",
            className
        )}>
          {content}
        </div>
      )}
    </div>
  );
};

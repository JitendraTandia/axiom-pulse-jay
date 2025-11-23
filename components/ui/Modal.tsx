import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '../Icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg mx-4 bg-[#0e1014] border border-[#1e2128] rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e2128] bg-[#13161b]">
          <h3 id="modal-title" className="text-sm font-bold text-white uppercase tracking-wide">{title || 'Details'}</h3>
          <button 
            onClick={onClose}
            aria-label="Close modal"
            className="text-textMuted hover:text-white transition-colors p-1 rounded hover:bg-[#1e2128]"
          >
            <div className="w-4 h-4 flex items-center justify-center" aria-hidden="true">✕</div>
          </button>
        </div>

        {/* Content */}
        <div className="p-0">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
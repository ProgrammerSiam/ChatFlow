'use client';

import React from 'react';

interface CoolTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  shortcut?: string;
  className?: string;
  delayMs?: number;
}

export default function CoolTooltip({
  children,
  content,
  side = 'top',
  shortcut,
  className = '',
}: CoolTooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }[side];

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-100 border-x-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-100 border-x-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-100 border-y-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-100 border-y-transparent border-l-transparent',
  }[side];

  return (
    <div className={`relative inline-flex items-center group/tooltip ${className}`}>
      {children}

      {/* Floating Animated Tooltip Pill */}
      <div
        role="tooltip"
        className={`absolute z-50 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 text-[11px] font-medium shadow-xl border border-white/10 dark:border-slate-800/10 backdrop-blur-md whitespace-nowrap opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 ease-out ${positionClasses}`}
      >
        <span>{content}</span>
        {shortcut && (
          <kbd className="px-1 py-0.2 rounded bg-white/20 dark:bg-slate-200 text-[9px] font-mono opacity-90">
            {shortcut}
          </kbd>
        )}

        {/* Tiny Triangular Arrow */}
        <span
          className={`absolute w-0 h-0 border-4 ${arrowClasses}`}
        />
      </div>
    </div>
  );
}

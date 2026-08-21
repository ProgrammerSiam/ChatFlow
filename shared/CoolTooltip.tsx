'use client';

import React from 'react';

interface CoolTooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'center' | 'start' | 'end';
  shortcut?: string;
  className?: string;
}

export default function CoolTooltip({
  children,
  content,
  side = 'top',
  align = 'center',
  shortcut,
  className = '',
}: CoolTooltipProps) {
  let positionClasses = '';
  let arrowClasses = '';

  if (side === 'top') {
    positionClasses = align === 'end'
      ? 'bottom-full right-0 mb-2'
      : align === 'start'
      ? 'bottom-full left-0 mb-2'
      : 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    arrowClasses = align === 'end'
      ? 'top-full right-3 border-t-slate-900 dark:border-t-slate-100 border-x-transparent border-b-transparent'
      : align === 'start'
      ? 'top-full left-3 border-t-slate-900 dark:border-t-slate-100 border-x-transparent border-b-transparent'
      : 'top-full left-1/2 -translate-x-1/2 border-t-slate-900 dark:border-t-slate-100 border-x-transparent border-b-transparent';
  } else if (side === 'bottom') {
    positionClasses = align === 'end'
      ? 'top-full right-0 mt-2'
      : align === 'start'
      ? 'top-full left-0 mt-2'
      : 'top-full left-1/2 -translate-x-1/2 mt-2';
    arrowClasses = align === 'end'
      ? 'bottom-full right-3 border-b-slate-900 dark:border-b-slate-100 border-x-transparent border-t-transparent'
      : align === 'start'
      ? 'bottom-full left-3 border-b-slate-900 dark:border-b-slate-100 border-x-transparent border-t-transparent'
      : 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-900 dark:border-b-slate-100 border-x-transparent border-t-transparent';
  } else if (side === 'left') {
    positionClasses = 'right-full top-1/2 -translate-y-1/2 mr-2';
    arrowClasses = 'left-full top-1/2 -translate-y-1/2 border-l-slate-900 dark:border-l-slate-100 border-y-transparent border-r-transparent';
  } else if (side === 'right') {
    positionClasses = 'left-full top-1/2 -translate-y-1/2 ml-2';
    arrowClasses = 'right-full top-1/2 -translate-y-1/2 border-r-slate-900 dark:border-r-slate-100 border-y-transparent border-l-transparent';
  }

  return (
    <div className={`relative inline-flex items-center group/tooltip ${className}`}>
      {children}

      {/* Floating Animated Tooltip Pill with Highest Z-Index */}
      <div
        role="tooltip"
        className={`absolute z-[9999] pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/95 dark:bg-white text-white dark:text-slate-900 text-[11px] font-medium shadow-2xl border border-white/15 dark:border-slate-800/15 backdrop-blur-md whitespace-nowrap opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 ease-out ${positionClasses}`}
      >
        <span>{content}</span>
        {shortcut && (
          <kbd className="px-1 py-0.2 rounded bg-white/20 dark:bg-slate-200 text-[9px] font-mono opacity-90">
            {shortcut}
          </kbd>
        )}

        {/* Triangular Arrow Pointer */}
        <span className={`absolute w-0 h-0 border-4 ${arrowClasses}`} />
      </div>
    </div>
  );
}

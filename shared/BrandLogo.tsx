'use client';

import React from 'react';

interface BrandLogoProps {
  prefix?: string;
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({
  prefix = 'Chat',
  suffix = 'Flow',
  className = '',
  size = 'md',
}: BrandLogoProps) {
  const sizeClasses = {
    sm: { box: 'h-7 w-7 rounded-[9px]', svg: 22, text: 'text-lg' },
    md: {
      box: 'h-8.5 w-8.5 rounded-[11px]',
      svg: 27,
      text: 'text-[22px] sm:text-[24px]',
    },
    lg: { box: 'h-10 w-10 rounded-[13px]', svg: 32, text: 'text-2xl' },
  }[size];

  return (
    <div
      className={`flex items-center gap-2.5 group cursor-pointer border-0 outline-none select-none ${className}`}
    >
      {/* Purple Gradient Squircle Icon with Maximum Icon Fill (Minimal Edge Padding) */}
      <div
        className={`relative flex shrink-0 items-center justify-center bg-gradient-to-tr from-[#725CFF] via-[#856FFE] to-[#B5A6FF] text-white shadow-xs group-hover:scale-105 transition-transform duration-200 overflow-hidden ${sizeClasses.box}`}
      >
        <svg
          width={sizeClasses.svg}
          height={sizeClasses.svg}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="translate-x-[0.5px] translate-y-[0.5px]"
        >
          {/* Large Chat Speech Bubble (Edge-to-Edge Fill) */}
          <path
            d="M3 11.5C3 6.8 6.8 3 11.5 3C16.2 3 20 6.8 20 11.5C20 16.2 16.2 20 11.5 20C9.9 20 8.4 19.5 7.1 18.7L3 20L4.3 16.2C3.5 14.8 3 13.2 3 11.5Z"
            fill="white"
          />
          {/* 3 Chat Conversation Dots */}
          <circle cx="8" cy="11.5" r="1.3" fill="#725CFF" />
          <circle cx="11.5" cy="11.5" r="1.3" fill="#725CFF" />
          <circle cx="15" cy="11.5" r="1.3" fill="#725CFF" />
          {/* Top-Right Sparkle Diamond */}
          <path
            d="M19.5 1L20.2 3.2L22.4 3.9L20.2 4.6L19.5 6.8L18.8 4.6L16.6 3.9L18.8 3.2L19.5 1Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Typography: Bold Prefix (Chat) + Muted Gray Suffix (Flow) */}
      <div className="flex items-baseline tracking-[-0.6px] leading-none">
        <span
          className={`font-medium text-slate-900 dark:text-white ${sizeClasses.text}`}
        >
          {prefix}
        </span>
        <span
          className={`font-medium text-slate-400 dark:text-slate-500 ${sizeClasses.text}`}
        >
          {suffix}
        </span>
      </div>
    </div>
  );
}

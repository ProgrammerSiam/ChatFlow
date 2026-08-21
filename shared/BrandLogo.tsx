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
    sm: { box: 'h-6.5 w-6.5 rounded-[8px]', svg: 21, text: 'text-lg' },
    md: {
      box: 'h-8 w-8 rounded-[10px]',
      svg: 26,
      text: 'text-[21px] sm:text-[23px]',
    },
    lg: { box: 'h-9.5 w-9.5 rounded-[12px]', svg: 30, text: 'text-2xl' },
  }[size];

  return (
    <div
      className={`flex items-center gap-2 group cursor-pointer border-0 outline-none select-none ${className}`}
    >
      {/* Softer, Reduced Purple Gradient Squircle */}
      <div
        className={`relative flex shrink-0 items-center justify-center bg-gradient-to-tr from-[#8E7CFF] via-[#A293FF] to-[#D5CCFF] text-white shadow-xs overflow-hidden ${sizeClasses.box}`}
      >
        {/* Chat SVG Scales on Hover */}
        <svg
          width={sizeClasses.svg}
          height={sizeClasses.svg}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="translate-x-[0.5px] translate-y-[0.5px] transition-transform duration-200 ease-out group-hover:scale-110"
        >
          {/* Large Chat Speech Bubble */}
          <path
            d="M3 11.5C3 6.8 6.8 3 11.5 3C16.2 3 20 6.8 20 11.5C20 16.2 16.2 20 11.5 20C9.9 20 8.4 19.5 7.1 18.7L3 20L4.3 16.2C3.5 14.8 3 13.2 3 11.5Z"
            fill="white"
          />
          {/* 3 Chat Conversation Dots */}
          <circle cx="8" cy="11.5" r="1.3" fill="#8E7CFF" />
          <circle cx="11.5" cy="11.5" r="1.3" fill="#8E7CFF" />
          <circle cx="15" cy="11.5" r="1.3" fill="#8E7CFF" />
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

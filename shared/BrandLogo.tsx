'use client';

import React from 'react';

interface BrandLogoProps {
  name?: string;
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function BrandLogo({
  name = 'ChatFlow',
  suffix = '.AI',
  className = '',
  size = 'md',
}: BrandLogoProps) {
  const sizeClasses = {
    sm: { box: 'h-9 w-9 rounded-[11px]', svg: 24, text: 'text-xl' },
    md: { box: 'h-12 w-12 rounded-[15px]', svg: 30, text: 'text-[26px] sm:text-[28px]' },
    lg: { box: 'h-14 w-14 rounded-[18px]', svg: 36, text: 'text-3xl' },
  }[size];

  return (
    <div className={`flex items-center gap-3 group cursor-pointer border-0 outline-none select-none ${className}`}>
      {/* Purple Gradient Squircle Mascot Icon (Matches Screenshot Exactly) */}
      <div
        className={`relative flex shrink-0 items-center justify-center bg-gradient-to-tr from-[#725CFF] via-[#856FFE] to-[#B5A6FF] text-white shadow-xs group-hover:scale-105 transition-transform duration-200 ${sizeClasses.box}`}
      >
        <svg
          width={sizeClasses.svg}
          height={sizeClasses.svg}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Distinct Chat Speech Bubble */}
          <path
            d="M5 13.5C5 8.80558 8.80558 5 13.5 5C18.1944 5 22 8.80558 22 13.5C22 18.1944 18.1944 22 13.5 22C11.75 22 10.15 21.48 8.8 20.6L5 21.8L6.25 18.15C5.45 16.78 5 15.2 5 13.5Z"
            fill="white"
          />
          {/* 3 Conversation Dots */}
          <circle cx="9.75" cy="13.5" r="1.3" fill="#725CFF" />
          <circle cx="13.5" cy="13.5" r="1.3" fill="#725CFF" />
          <circle cx="17.25" cy="13.5" r="1.3" fill="#725CFF" />
          {/* Top-Right Sparkle Diamond */}
          <path
            d="M21.5 2.5L22.2 4.6L24.3 5.3L22.2 6.0L21.5 8.1L20.8 6.0L18.7 5.3L20.8 4.6L21.5 2.5Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Typography: Bold Width + Muted Gray Suffix */}
      <div className="flex items-baseline tracking-[-0.6px] leading-none">
        <span className={`font-bold text-slate-900 dark:text-white ${sizeClasses.text}`}>
          {name}
        </span>
        <span className={`font-normal text-slate-400 dark:text-slate-500 ml-0.5 ${sizeClasses.text}`}>
          {suffix}
        </span>
      </div>
    </div>
  );
}

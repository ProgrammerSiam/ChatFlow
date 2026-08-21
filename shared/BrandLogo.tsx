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
    sm: { box: 'h-7 w-7 rounded-[9px]', svg: 18, text: 'text-lg' },
    md: { box: 'h-8.5 w-8.5 rounded-[11px]', svg: 22, text: 'text-xl' },
    lg: { box: 'h-10 w-10 rounded-[13px]', svg: 26, text: 'text-2xl' },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Mascot Squircle Icon (Matches User Screenshot) */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-tr from-[#725CFF] via-[#8C76FF] to-[#B8AAFF] text-white shadow-sm shadow-[#725CFF]/20 group-hover:scale-105 transition-transform ${sizeClasses.box}`}
      >
        <svg
          width={sizeClasses.svg}
          height={sizeClasses.svg}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mascot Body */}
          <path
            d="M6 14C6 9.58172 9.58172 6 14 6C17.3137 6 20.1508 8.01947 21.3658 10.9023C21.7828 11.8916 22 12.9234 22 14C22 15.5 22 17.5 20.5 19C19 20.5 17.5 20.5 15.5 20.5C14.5 20.5 13.5 21 12.5 21.5C11 22.25 8.5 21.5 7.5 20C6.5 18.5 6 16.5 6 14Z"
            fill="white"
          />
          {/* Left Eye */}
          <ellipse cx="11.5" cy="13.5" rx="1.2" ry="2" fill="#725CFF" />
          {/* Right Eye */}
          <ellipse cx="16.5" cy="13.5" rx="1.2" ry="2" fill="#725CFF" />
          {/* Sparkle on Head */}
          <path
            d="M21 4L22.2 7.2L25 8L22.2 8.8L21 12L19.8 8.8L17 8L19.8 7.2L21 4Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Typography: Bold Name + Muted Suffix */}
      <span className={`font-bold tracking-tight text-slate-900 dark:text-white leading-none ${sizeClasses.text}`}>
        {name}
        <span className="font-medium text-slate-400 dark:text-slate-500">{suffix}</span>
      </span>
    </div>
  );
}

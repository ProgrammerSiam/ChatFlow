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
    <div className={`flex items-center gap-2.5 group cursor-pointer border-0 outline-none ${className}`}>
      {/* Purple Gradient Squircle Icon with Chat Bubble */}
      <div
        className={`relative flex items-center justify-center bg-gradient-to-tr from-[#725CFF] via-[#8C76FF] to-[#B8AAFF] text-white shadow-xs group-hover:scale-105 transition-transform ${sizeClasses.box}`}
      >
        <svg
          width={sizeClasses.svg}
          height={sizeClasses.svg}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rounded Chat Speech Bubble */}
          <path
            d="M4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C10.55 19.5 9.2 19.08 8.08 18.35L4.5 19.5L5.65 15.92C4.92 14.8 4.5 13.45 4.5 12Z"
            fill="white"
          />
          {/* Left Chat Eye */}
          <circle cx="10" cy="12" r="1.15" fill="#725CFF" />
          {/* Right Chat Eye */}
          <circle cx="14" cy="12" r="1.15" fill="#725CFF" />
          {/* Top-Right Sparkle Diamond */}
          <path
            d="M18.5 2.5L19.2 4.5L21.2 5.2L19.2 5.9L18.5 7.9L17.8 5.9L15.8 5.2L17.8 4.5L18.5 2.5Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Typography: Bold Name + Muted Suffix */}
      <span className={`font-bold tracking-tight text-slate-900 dark:text-white leading-none ${sizeClasses.text}`}>
        {name}
        <span className="font-normal text-slate-400 dark:text-slate-500">{suffix}</span>
      </span>
    </div>
  );
}

'use client';

import React from 'react';

interface BadgePillProps {
  label: string;
  className?: string;
}

export default function BadgePill({ label, className = '' }: BadgePillProps) {
  const gradientId0 = React.useId().replace(/:/g, '_');
  const gradientId1 = React.useId().replace(/:/g, '_');

  return (
    <div
      className={`border-slate-200/50 dark:border-border/40 bg-white dark:bg-card relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-lg border-[0.5px] p-1 pe-3  ${className}`}
    >
      {/* Mini Icon Box */}
      <div className="border-slate-100/70 dark:border-border/30 bg-white/90 dark:bg-muted/80 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-[0.5px] shadow-2xs">
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.12058 1L2 9.54014H6.87942V15L13 6.45986H8.12058V1Z"
            fill={`url(#${gradientId0})`}
            stroke={`url(#${gradientId1})`}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient
              id={gradientId0}
              x1="9.5634"
              y1="15.7486"
              x2="5.81146"
              y2="0.704719"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#725CFF" />
              <stop offset="0.5" stopColor="#C9C1FF" />
              <stop offset="1" stopColor="#F8F7FF" />
            </linearGradient>
            <linearGradient
              id={gradientId1}
              x1="9.5634"
              y1="15.7486"
              x2="5.81146"
              y2="0.704719"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#725CFF" />
              <stop offset="0.5" stopColor="#C9C1FF" />
              <stop offset="1" stopColor="#F8F7FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Badge Text */}
      <p className="text-slate-600 dark:text-slate-400 text-sm font-normal leading-none">
        {label}
      </p>

      {/* Atmospheric Glow Underlay */}
      <div
        className="absolute -bottom-4 -left-5 -z-10 h-[38px] w-[38px] -rotate-12 rounded-2xl blur-[10px] pointer-events-none"
        style={{
          background:
            'linear-gradient(347deg, #725CFF 1.7%, #C9C1FF 46.45%, #F8F7FF 90.62%)',
        }}
      />
    </div>
  );
}

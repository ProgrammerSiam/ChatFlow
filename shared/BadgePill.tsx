'use client';

import React from 'react';

interface BadgePillProps {
  label: string;
  showAvatars?: boolean;
  className?: string;
}

export default function BadgePill({
  label,
  showAvatars = false,
  className = '',
}: BadgePillProps) {
  const gradientId0 = React.useId().replace(/:/g, '_');
  const gradientId1 = React.useId().replace(/:/g, '_');

  return (
    <div
      className={`border-slate-200/80 dark:border-border/60 bg-white dark:bg-card relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-lg border-[0.5px] p-1 pe-3.5 shadow-2xs ${className}`}
    >
      {/* Overlapping Avatars or Mini Lightning Icon */}
      {showAvatars ? (
        <div className="flex -space-x-1.5 items-center pl-0.5">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="User 1"
            className="size-5.5 rounded-full object-cover ring-1.5 ring-white dark:ring-card shadow-2xs"
          />
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
            alt="User 2"
            className="size-5.5 rounded-full object-cover ring-1.5 ring-white dark:ring-card shadow-2xs"
          />
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
            alt="User 3"
            className="size-5.5 rounded-full object-cover ring-1.5 ring-white dark:ring-card shadow-2xs"
          />
        </div>
      ) : (
        <div className="border-slate-100 dark:border-border bg-white/80 dark:bg-card/80 flex size-5.5 items-center justify-center rounded-md border-[0.5px]">
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
      )}

      {/* Badge Text */}
      <p className="text-slate-600 dark:text-slate-300 text-xs font-medium leading-none">
        {label}
      </p>

      {/* Atmospheric Glow Underlay */}
      <div
        className="absolute -bottom-4 -left-5 -z-10 size-9.5 -rotate-12 rounded-2xl blur-[10px] pointer-events-none"
        style={{
          background:
            'linear-gradient(347deg, #725CFF 1.7%, #C9C1FF 46.45%, #F8F7FF 90.62%)',
        }}
      />
    </div>
  );
}

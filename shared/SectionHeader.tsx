'use client';

import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mx-auto mb-12 max-w-2xl ${
        isCenter
          ? 'text-center flex flex-col items-center'
          : 'text-left flex flex-col items-start'
      } ${className}`}
    >
      {/* Reusable Glowing Pill Badge */}
      {badge && (
        <div className="relative z-10 inline-flex items-center gap-2.5 overflow-hidden rounded-lg border border-slate-200/80 dark:border-border/80 bg-white/90 dark:bg-card/90 p-1 pe-3.5 shadow-sm backdrop-blur-md">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-purple-200/60 dark:border-purple-800/40 bg-white dark:bg-muted shadow-xs">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M8.12058 1L2 9.54014H6.87942V15L13 6.45986H8.12058V1Z"
                fill="url(#section_hdr_bolt_grad)"
                stroke="url(#section_hdr_bolt_grad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="section_hdr_bolt_grad"
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
          <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300">
            {badge}
          </p>
          <div
            className="absolute -bottom-4 -left-5 -z-10 h-10 w-10 -rotate-12 rounded-2xl blur-[10px]"
            style={{
              background:
                'linear-gradient(347deg, #725CFF 1.7%, #C9C1FF 46.45%, #F8F7FF 90.62%)',
            }}
          />
        </div>
      )}

      {/* Main Section Headline */}
      <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-1.5px] text-foreground leading-[1.15]">
        {title}
      </h2>

      {/* Subtitle / Paragraph */}
      {description && (
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}

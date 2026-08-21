'use client';

import React from 'react';
import BadgePill from '@/shared/BadgePill';

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
      {/* Reusable Glowing Pill Badge (Matches User Exact Code) */}
      {badge && <BadgePill label={badge} />}

      {/* Main Section Headline */}
      <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-1.5px] text-foreground leading-[1.15]">
        {title}
      </h2>

      {/* Subtitle */}
      {description && (
        <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}

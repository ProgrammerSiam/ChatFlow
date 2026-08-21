'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Carousel({ className, children, ...props }: CarouselProps) {
  return (
    <div className={cn('relative w-full overflow-hidden', className)} {...props}>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2">
        {children}
      </div>
    </div>
  );
}

export function CarouselItem({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('min-w-0 shrink-0 grow-0 basis-full snap-center', className)}
      {...props}
    >
      {children}
    </div>
  );
}

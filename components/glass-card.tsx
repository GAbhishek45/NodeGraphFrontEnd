'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function GlassCard({
  children,
  className,
  animate = true,
}: GlassCardProps) {
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={cn(
          'relative overflow-hidden',
          'bg-white/30',
          'NodeGraph-blur-xl',
          'border border-white/40',
          'shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]',
          'rounded-2xl',
          className
        )}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-white/30',
        'NodeGraph-blur-xl',
        'border border-white/40',
        'shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]',
        'rounded-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}

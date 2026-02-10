'use client';

import React from 'react';
import { Check, Loader2, Circle } from 'lucide-react';

interface ConversionStepProps {
  number: number;
  title: string;
  description: string;
  isActive: boolean;
  isComplete: boolean;
}

const ConversionStep = ({
  number,
  title,
  description,
  isActive,
  isComplete,
}: ConversionStepProps) => {
  return (
    <div
      className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-500 group ${
        isActive
          ? 'bg-white/60 border-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.15)] scale-[1.02]'
          : isComplete
          ? 'bg-emerald-50/50 border-emerald-200/50 opacity-90'
          : 'bg-white/20 border-white/20 opacity-60 hover:opacity-80'
      }`}
    >
      {/* Connector Line (visual aid for steps) */}
      <div 
        className={`absolute left-[31px] -top-6 h-8 w-0.5 -z-10 transition-colors duration-500 ${
           isComplete ? 'bg-emerald-300' : 'bg-slate-200' 
        } ${number === 1 ? 'hidden' : 'block'}`} 
      />

      {/* Icon Circle */}
      <div className="relative flex-shrink-0">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm ${
            isComplete
              ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-emerald-200'
              : isActive
              ? 'bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-violet-200 scale-110'
              : 'bg-slate-100 text-slate-400 border border-slate-200'
          }`}
        >
          {isComplete ? (
            <Check className="w-5 h-5" strokeWidth={3} />
          ) : isActive ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span className="font-mono font-bold text-sm">{number}</span>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-0.5">
          <h4
            className={`font-bold text-base transition-colors ${
              isActive ? 'text-slate-800' : isComplete ? 'text-emerald-900' : 'text-slate-500'
            }`}
          >
            {title}
          </h4>
          
          {/* Status Badge */}
          {isActive && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-600 bg-violet-100 rounded-full animate-pulse">
              Processing
            </span>
          )}
        </div>
        
        <p
          className={`text-sm truncate transition-colors ${
            isActive ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          {description}
        </p>
      </div>

      {/* Active State Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-violet-400/20 pointer-events-none" />
      )}
    </div>
  );
};

export default ConversionStep;
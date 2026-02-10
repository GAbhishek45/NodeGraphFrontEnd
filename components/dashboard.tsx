'use client';

import React, { useState, useCallback } from 'react';
import {
  UploadCloud,
  CheckCircle,
  Loader2,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './glass-card';

import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';


type UploadStatus = 'idle' | 'scanning' | 'success';

export function Dashboard() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [dragActive, setDragActive] = useState(false);

  
  // const { credits } = CreaditContextProvider();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        setStatus('scanning');
        // Simulate API call
        setTimeout(() => {
          setStatus('success');
        }, 2000);
      }
    },
    []
  );

  const handleReset = () => {
    setStatus('idle');
  };

  return (
    <div className="p-8 ml-64 min-h-screen flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Generate Backend</h2>
          <p className="text-slate-500 text-sm">
            Transform diagrams into production code.
          </p>
        </div>
        <GlassCard className="px-4 py-2 flex items-center gap-2" animate={false}>
          <Zap size={18} className="text-yellow-500" />
          <span className="text-slate-700 font-medium">3 Credits Remaining</span>
        </GlassCard>
      </div>

      {/* Main Drop Zone */}
      <GlassCard
        className={cn(
          'flex-1 min-h-[500px] flex items-center justify-center',
          'border-2 border-dashed',
          dragActive
            ? 'border-blue-400 bg-blue-50/10'
            : 'border-slate-300 hover:border-violet-400',
          'transition-all duration-300 cursor-pointer group'
        )}
        animate={false}
      >
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className="w-full h-full flex flex-col items-center justify-center p-10 relative"
        >
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <UploadCloud size={40} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-slate-700">
                  Drop your diagram here
                </h3>
                <p className="text-slate-500 mt-2">or click to browse files</p>
              </motion.div>
            )}

            {status === 'scanning' && (
              <motion.div
                key="scanning"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative w-full max-w-md"
              >
                {/* Scanning Beam Animation */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-sm"
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <div className="text-center">
                  <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700">
                    Analyzing Database Structure...
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Identifying models and relationships
                  </p>
                </div>
              </motion.div>
            )}

            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">
                  Backend Ready!
                </h3>
                <p className="text-slate-500 mt-2">
                  Your code has been generated and is ready for download.
                </p>
                <div className="flex gap-3 mt-6 justify-center">
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 font-medium">
                    Download .ZIP
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 bg-white/40 text-slate-800 rounded-xl shadow-md hover:bg-white/60 transition-all font-medium"
                  >
                    Upload Another
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}




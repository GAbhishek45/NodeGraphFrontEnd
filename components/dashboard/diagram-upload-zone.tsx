'use client';

import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Upload, CheckCircle, Loader2, Check, FileCode, ArrowRight, Zap, FileJson, Layers, Lock, X, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

// --- Sub-Component: Limit Reached Modal ---
const LimitModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-card border border-red-500/20 rounded-3xl shadow-2xl p-8 overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-red-500/10 blur-3xl rounded-full pointer-events-none" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-red-500/20 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]">
            <Lock className="w-10 h-10 text-red-500" />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-2">Limit Reached</h3>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            You have used all your available credits. <br/>
            Upgrade your plan to generate more code.
          </p>

          <button 
            onClick={onClose} // You can change this to router.push('/pricing')
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 text-white font-bold shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            Upgrade Plan <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Component: Conversion Step (Glass Style) ---
const ConversionStep = ({
  number,
  title,
  description,
  isActive,
  isComplete
}: {
  number: number,
  title: string,
  description: string,
  isActive: boolean,
  isComplete: boolean
}) => {
  return (
    <div className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-500 ${isActive
        ? 'bg-card border-violet-500/50 shadow-[0_0_30px_-10px_rgba(139,92,246,0.3)] scale-[1.02] z-10'
        : isComplete
          ? 'bg-emerald-500/5 border-emerald-500/20 opacity-80'
          : 'bg-muted/30 border-transparent opacity-40 blur-[0.5px]'
      }`}>
      {/* Glowing Connector Line */}
      {number !== 1 && (
        <div className={`absolute left-[28px] -top-6 h-8 w-0.5 -z-10 transition-colors duration-500 ${isComplete ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-muted'
          }`} />
      )}

      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isComplete
          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
          : isActive
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20 scale-110'
            : 'bg-muted text-muted-foreground'
        }`}>
        {isComplete ? <Check className="w-4 h-4" /> : isActive ? <Loader2 className="w-4 h-4 animate-spin" /> : <span className="text-xs font-bold">{number}</span>}
      </div>

      <div className="min-w-0">
        <h4 className={`text-sm font-bold transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h4>
        <p className={`text-xs truncate transition-colors ${isActive ? 'text-violet-500 dark:text-violet-400' : 'text-muted-foreground/60'}`}>{description}</p>
      </div>

      {/* Active Pulse Dot */}
      {isActive && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500"></span>
        </span>
      )}
    </div>
  );
};

// --- Main Component ---
export default function DiagramUploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [fileName, setFileName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [showLimitModal, setShowLimitModal] = useState(false); // <--- NEW STATE
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user, setUser } = useAuth();

  // --- Drag & Drop Handlers ---
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) handleFileSelect(files[0]);
  };

  const ReduceCredits = async () => {
    let oldUser = await localStorage.getItem('user');
    if(oldUser) {
        let parsedUser = JSON.parse(oldUser);
        parsedUser.credits -= 1;
        setUser({ ...parsedUser })
        await localStorage.setItem('user', JSON.stringify(parsedUser));
    }
  }

  const handleFileSelect = async (file: File) => {
    // 1. --- CHECK CREDITS BEFORE PROCEEDING ---
    if (user?.credits <= 0) {
        setShowLimitModal(true);
        return; // Stop execution
    }

    console.log("file name", file.name)
    setFileName(file.name);
    setStatus('processing');
    setCurrentStep(1);

    try {
      // 2. Prepare Data
      const formData = new FormData();
      formData.append('image', file); 

      // 3. Call the API
      const response = await axios.post('/api/generation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          if (percent < 30) setCurrentStep(2);
          else if (percent < 60) setCurrentStep(3);
          else if (percent < 90) setCurrentStep(5);
        }
      });

      // 4. Handle Success
      setCurrentStep(6); 

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `NodeGraph-Project-${Date.now()}.zip`);
      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setTimeout(() => setStatus('success'), 500);

      await ReduceCredits();

    } catch (error: any) {
      console.error("Generation Failed:", error);
      setStatus('idle'); 

      if (error.response && error.response.data instanceof Blob) {
        const errorText = await error.response.data.text();
        try {
          const errorJson = JSON.parse(errorText);
          alert(errorJson.error || "Generation failed. Please try again.");
        } catch (e) {
          alert("Server error occurred.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <>
      {/* --- Render Limit Modal --- */}
      {showLimitModal && <LimitModal onClose={() => setShowLimitModal(false)} />}

      {/* --- Rest of your UI --- */}
      {status === 'success' ? (
        // Success View
        <div className="w-full max-w-xl animate-in fade-in zoom-in duration-500">
          <div className="relative bg-card/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-emerald-500/20 text-center overflow-hidden group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10 w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-500/20 shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]">
              <CheckCircle className="w-12 h-12 text-emerald-500 drop-shadow-sm" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2 tracking-tight">System Online</h3>
            <p className="text-muted-foreground mb-8 text-lg">
              <span className="font-semibold text-emerald-500">{fileName}</span> has been compiled successfully.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => { setStatus('idle'); setFileName(''); }}
                className="px-6 py-3 rounded-xl bg-muted/50 text-muted-foreground font-semibold hover:bg-muted transition-colors border border-border"
              >
                New Upload
              </button>
              <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/30 hover:scale-105 transition-transform flex items-center gap-2 group/btn">
                Download Code <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ) : status === 'processing' ? (
        // Processing View
        <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-card/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/10 dark:border-slate-800">
            <div className="text-center mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
                <span className="relative z-10 bg-card px-4 text-xs font-bold uppercase tracking-widest text-violet-500">
                Compiling Neural Architecture
                </span>
            </div>

            <div className="space-y-1">
                <ConversionStep number={1} title="Parsing Diagram" description="OCR & Entity Recognition" isActive={currentStep === 1} isComplete={currentStep > 1} />
                <ConversionStep number={2} title="Detecting Relationships" description="Identifying 1:N & M:N Links" isActive={currentStep === 2} isComplete={currentStep > 2} />
                <ConversionStep number={3} title="Generating Models" description="Writing Mongoose Schemas" isActive={currentStep === 3} isComplete={currentStep > 3} />
                <ConversionStep number={4} title="Building Controllers" description="Creating CRUD Logic" isActive={currentStep === 4} isComplete={currentStep > 4} />
                <ConversionStep number={5} title="Configuring Routes" description="Mapping API Endpoints" isActive={currentStep === 5} isComplete={currentStep > 5} />
                <ConversionStep number={6} title="Finalizing App" description="Preparing .env & server.js" isActive={currentStep === 6} isComplete={currentStep > 6} />
            </div>
            </div>
        </div>
      ) : (
        // Idle View (Upload)
        <div className="w-full max-w-2xl">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`relative group cursor-pointer rounded-3xl border border-dashed transition-all duration-500 p-12 overflow-hidden
              ${isDragging
                ? 'border-violet-500 bg-violet-500/10 shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)]'
                : 'border-slate-300 dark:border-slate-700 bg-card/30 hover:bg-card/60 hover:border-violet-400 dark:hover:border-violet-500/50 hover:shadow-xl'
              }
            `}
          >
            {/* --- Scanning Beam Animation --- */}
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-sm transition-opacity duration-300 ${isDragging || status === 'processing' ? 'opacity-100 animate-scan-vertical' : 'opacity-0 group-hover:opacity-50 group-hover:animate-scan-vertical'}`} />

            {/* --- Grid Background --- */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] pointer-events-none" style={{ backgroundSize: '20px 20px' }} />

            <div className="relative z-20 flex flex-col items-center justify-center text-center">

              {/* Animated Icon Container */}
              <div className={`w-24 h-24 rounded-3xl mb-8 flex items-center justify-center transition-all duration-500 shadow-xl ring-1 ring-white/20
                ${isDragging
                  ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white scale-110 rotate-3 shadow-violet-500/30'
                  : 'bg-gradient-to-br from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 text-violet-500 dark:text-violet-400 group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-violet-500/20'
                }
              `}>
                <Upload className="w-10 h-10" strokeWidth={1.5} />
              </div>

              <h3 className={`text-3xl font-bold mb-3 transition-colors duration-300 tracking-tight ${isDragging ? 'text-violet-500' : 'text-foreground'}`}>
                Upload Architecture
              </h3>

              <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed text-sm">
                Drag & drop your ERD image here. <br />
                <span className="text-violet-500 font-semibold">Credits: {user?.credits || 0}</span>
              </p>

              {/* Supported Badges */}
              <div className="flex gap-2 justify-center">
                <Badge icon={<FileCode className="w-3 h-3" />} text="PNG" />
                <Badge icon={<FileCode className="w-3 h-3" />} text="JPG" />
                <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600/10 to-blue-600/10 text-xs font-bold text-violet-600 dark:text-violet-400 border border-violet-500/20 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 fill-current" />
                  AI Powered
                </span>
              </div>
            </div>

            {/* --- Background Gradient Decoration --- */}
            <div className={`absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 z-0 ${isDragging ? 'opacity-100' : 'group-hover:opacity-100'}`} />
          </div>

          {/* Bottom Features Info */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <FeatureCard icon={<Layers className="w-4 h-4" />} title="Smart Schema" />
            <FeatureCard icon={<FileJson className="w-4 h-4" />} title="Auto CRUD" />
            <FeatureCard icon={<ArrowRight className="w-4 h-4" />} title="REST API" />
          </div>

          <style jsx>{`
            @keyframes scan-vertical {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
            .animate-scan-vertical {
              animation: scan-vertical 2s linear infinite;
            }
          `}</style>
        </div>
      )}
    </>
  );
}

// Helper Components
function Badge({ icon, text }: { icon: any, text: string }) {
  return (
    <span className="px-3 py-1.5 rounded-lg bg-muted/50 text-xs font-bold text-muted-foreground border border-border flex items-center gap-1.5">
      {icon} {text}
    </span>
  );
}

function FeatureCard({ icon, title }: { icon: any, title: string }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl bg-card/30 border border-border/50 shadow-sm backdrop-blur-sm hover:bg-card/60 transition-colors">
      <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-2">
        {icon}
      </div>
      <span className="text-xs font-bold text-muted-foreground">{title}</span>
    </div>
  );
}
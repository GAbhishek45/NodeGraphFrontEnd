'use client';

import React from 'react';
import { Zap, UploadCloud, Download, PlayCircle, Terminal, CheckCircle2, Server } from 'lucide-react';

export default function QuickStartPage() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 relative">
      
      {/* --- Ambient Background Glow (Cool Blue/Violet) --- */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50" />

      {/* --- Header --- */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold tracking-wider text-xs uppercase bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800">
          <Zap className="w-3 h-3" />
          Tutorial
        </span>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Quick Start
          </span> Guide
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Go from a static diagram to a running backend API in under 2 minutes. 
          Follow this timeline to build your first NodeGraph project.
        </p>
      </div>

      {/* --- Timeline Steps --- */}
      <div className="not-prose space-y-12 relative pl-4 md:pl-0">
        
        {/* Vertical Connector Line (Blue to Violet Gradient) */}
        <div className="absolute left-6 md:left-8 top-8 bottom-32 w-0.5 bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-transparent z-0" />

        {/* Step 1 */}
        <StepCard 
          number="1"
          title="Prepare your Diagram"
          desc="Draw a simple ER diagram. Ensure you have clear boxes for Entities (e.g., User, Product) and lines connecting them."
          icon={<Zap className="w-5 h-5 text-cyan-500" />}
          tip="We support standard Crow's Foot notation and simple box-and-line sketches."
          color="group-hover:border-cyan-500/30"
          ring="group-hover:ring-cyan-500/10"
        />

        {/* Step 2 */}
        <StepCard 
          number="2"
          title="Upload to Dashboard"
          desc="Navigate to your dashboard workspace. Drag your image file (PNG/JPG) into the drop zone."
          icon={<UploadCloud className="w-5 h-5 text-blue-500" />}
          color="group-hover:border-blue-500/30"
          ring="group-hover:ring-blue-500/10"
        />

        {/* Step 3 */}
        <StepCard 
          number="3"
          title="AI Processing"
          desc="Wait a few seconds while NodeGraph scans your image. It detects text labels, data types, and relationship cardinality (1:N)."
          icon={<Server className="w-5 h-5 text-indigo-500" />}
          color="group-hover:border-indigo-500/30"
          ring="group-hover:ring-indigo-500/10"
        />

        {/* Step 4: Download & Run (Hero Card) */}
        <div className="relative flex flex-col md:flex-row gap-6 z-10 pt-4">
          
          {/* Number Bubble (Highlight) */}
          <div className="hidden md:flex w-16 h-16 shrink-0 rounded-full bg-foreground text-background border-4 border-background flex items-center justify-center font-bold text-xl shadow-xl ring-4 ring-blue-500/20 z-20">
            4
          </div>

          {/* Special Terminal Card */}
          <div className="flex-1 overflow-hidden bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-800 dark:border-slate-700 relative group">
            {/* Glow behind terminal (Blue/Cyan) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-700" />
            
            {/* Terminal Header */}
            <div className="relative bg-[#1e293b] px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono ml-2 opacity-70">
                <Terminal className="w-3 h-3" />
                server-start.sh
              </div>
            </div>

            <div className="relative p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl shrink-0 border border-blue-500/20">
                  <PlayCircle className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Download & Run</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Your code is ready. Unzip the file and run these commands to start your local server:
                  </p>
                </div>
              </div>

              {/* Code Block */}
              <div className="font-mono text-sm bg-black/40 p-4 rounded-xl border border-white/5 space-y-3 shadow-inner">
                <CommandRow cmd="npm install" />
                <CommandRow cmd="cp .env.example .env" />
                <CommandRow cmd="npm run dev" />
                
                <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-cyan-400 text-xs animate-pulse">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Server started on http://localhost:5000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

function StepCard({ number, title, desc, icon, tip, color, ring }: any) {
  return (
    <div className="relative flex flex-col md:flex-row gap-4 md:gap-6 group z-10">
      
      {/* Number Bubble */}
      <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full border-4 border-background bg-card flex items-center justify-center font-bold text-lg md:text-xl text-foreground shadow-sm ring-4 ring-transparent transition-all duration-300 ${ring}`}>
        {number}
      </div>

      {/* Content Card */}
      <div className={`flex-1 p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 ${color}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/5 transition-colors">
            {icon}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-foreground">{title}</h3>
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">
          {desc}
        </p>

        {tip && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800/30 flex gap-2 items-start">
            <span className="shrink-0 mt-0.5">💡</span>
            <span>{tip}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CommandRow({ cmd }: { cmd: string }) {
  return (
    <div className="flex gap-3 items-center group/cmd cursor-pointer hover:bg-white/5 p-1 -mx-1 rounded transition-colors">
      <span className="text-slate-500 select-none">$</span>
      <span className="text-cyan-400 font-bold group-hover/cmd:text-cyan-300 transition-colors">{cmd}</span>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { Box, Server, Package, Check, Copy, Terminal, DownloadCloud } from 'lucide-react';

export default function InstallationPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* --- 1. Header Section --- */}
      <div className="relative">
        {/* Background Glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        
        <span className="relative inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold tracking-wider text-xs uppercase bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800 mb-6">
          <DownloadCloud className="w-3 h-3" />
          Setup Guide
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Installation
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          NodeGraph generates a standard, unopinionated Node.js project. 
          It runs anywhere Node.js runs—from your local machine to AWS Lambda.
        </p>
      </div>

      {/* --- 2. Prerequisites (Glass Cards) --- */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-500" />
          System Requirements
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4 not-prose">
          <ReqCard 
            icon={<Box className="w-6 h-6 text-green-500" />} 
            title="Node.js" 
            desc="v18.0.0 or higher" 
            sub="Required for runtime"
            color="bg-green-500/10"
            borderColor="hover:border-green-500/50"
          />
          <ReqCard 
            icon={<Server className="w-6 h-6 text-emerald-500" />} 
            title="MongoDB" 
            desc="v4.0+ or Atlas" 
            sub="Database connection"
            color="bg-emerald-500/10"
            borderColor="hover:border-emerald-500/50"
          />
          <ReqCard 
            icon={<Package className="w-6 h-6 text-red-500" />} 
            title="Package Manager" 
            desc="NPM, Yarn, or PNPM" 
            sub="Dependency handling"
            color="bg-red-500/10"
            borderColor="hover:border-red-500/50"
          />
        </div>
      </section>

      {/* --- 3. Terminal Setup (With Glow) --- */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-500" />
          Quick Setup
        </h2>
        
        <div className="relative group">
          {/* Dynamic Glow Behind Terminal */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          {/* Terminal Window */}
          <div className="relative not-prose rounded-xl overflow-hidden bg-[#1e1e1e] shadow-2xl border border-slate-800 dark:border-slate-700">
            {/* Title Bar */}
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono opacity-50">
                <Terminal className="w-3 h-3" />
                bash — 80x24
              </div>
            </div>
            
            {/* Code Body */}
            <div className="p-6 font-mono text-sm space-y-6">
              <StepBlock cmd="unzip NodeGraph-project.zip" comment="# 1. Extract the downloaded project" />
              <StepBlock cmd="cd NodeGraph-project" comment="# 2. Enter the directory" />
              <StepBlock cmd="npm install" comment="# 3. Install dependencies" />
              <StepBlock cmd="cp .env.example .env" comment="# 4. Setup environment variables" />
              <StepBlock cmd="npm run dev" comment="# 5. Start the development server" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- Helper Components ---

function ReqCard({ icon, title, desc, sub, color, borderColor }: any) {
  return (
    <div className={`p-4 rounded-xl bg-card border border-border shadow-sm flex items-start gap-4 transition-all duration-300 ${borderColor}`}>
      <div className={`p-2.5 rounded-lg shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-foreground">{title}</h3>
        <p className="text-sm font-semibold text-foreground/80">{desc}</p>
        <p className="text-xs text-muted-foreground mt-1">{sub}</p>
      </div>
    </div>
  );
}

function StepBlock({ cmd, comment }: { cmd: string, comment: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative pl-4 border-l-2 border-slate-700 hover:border-slate-500 transition-colors">
      <div className="text-slate-500 select-none mb-1 italic">{comment}</div>
      <div className="flex items-center gap-3 text-slate-300">
        <span className="text-blue-400 select-none font-bold">$</span>
        <span className="group-hover:text-white transition-colors">{cmd}</span>
      </div>
      <button 
        onClick={handleCopy}
        className="absolute right-0 top-1 opacity-0 group-hover:opacity-100 transition-all p-1.5 hover:bg-white/10 rounded-md text-slate-400 hover:text-white"
        title="Copy command"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
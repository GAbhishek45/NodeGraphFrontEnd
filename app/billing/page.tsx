'use client';

import React, { useState } from 'react';
import { Check, Zap, Shield, CreditCard, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BillingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-full w-full p-6 lg:p-10 space-y-12 animate-in fade-in zoom-in duration-500">
      
      {/* --- Header Section --- */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-3 py-1 rounded-full bg-violet-100/50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-lg shadow-violet-500/10">
            Pricing Plans
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-600 dark:from-violet-400 dark:to-blue-400">Backend</span>
          </h1>
          <p className="text-muted-foreground text-lg pt-4">
            Choose the plan that fits your development cycle. Upgrade anytime.
          </p>
        </motion.div>

        {/* --- Toggle Switch (Violet Glow) --- */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-8 rounded-full bg-muted p-1 transition-all hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-background shadow-inner"
          >
            <div 
              className={`w-6 h-6 rounded-full bg-background border border-border shadow-md shadow-violet-500/20 transition-transform duration-300 ${
                isYearly ? 'translate-x-6' : 'translate-x-0'
              }`} 
            />
          </button>
          <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
            Yearly <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full ml-1 shadow-sm shadow-emerald-500/20">-20%</span>
          </span>
        </div>
      </div>

      {/* --- Pricing Cards Grid --- */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
        
        {/* === Plan 1: Starter (Subtle Violet Shadow) === */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="relative p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-md border border-border flex flex-col h-full shadow-2xl shadow-violet-500/5 dark:shadow-none transition-all duration-300 hover:shadow-violet-500/10"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-muted-foreground mb-4">Starter</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-foreground">$0</span>
            </div>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
              Perfect for hobbyists trying out the platform.
            </p>
          </div>

          <div className="space-y-4 mb-8 flex-1">
            <FeatureItem text="3 Generations / day" />
            <FeatureItem text="Standard Node.js Export" />
            <FeatureItem text="7-day History Retention" />
            <FeatureItem text="Community Support" />
          </div>

          <button className="w-full py-4 rounded-2xl border-2 border-border text-muted-foreground font-bold bg-card/50 hover:bg-card hover:text-foreground hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all">
            Current Plan
          </button>
        </motion.div>


        {/* === Plan 2: Pro (Strong Violet Glow) === */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="relative p-1 rounded-[2.5rem] bg-gradient-to-b from-violet-400 to-blue-400 dark:from-violet-600 dark:to-blue-600 shadow-2xl shadow-violet-600/20 dark:shadow-violet-900/40"
        >
          {/* Floating Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 z-20 shadow-lg shadow-violet-600/20">
            <Sparkles className="w-3 h-3 text-yellow-300" /> Recommended
          </div>

          <div className="h-full bg-card/95 backdrop-blur-xl rounded-[2.3rem] p-8 flex flex-col relative overflow-hidden">
            {/* Inner Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="mb-6 relative z-10">
              <h3 className="text-lg font-bold text-violet-600 dark:text-violet-400 mb-4">Professional</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-foreground">
                  ${isYearly ? '24' : '29'}
                </span>
                <span className="text-muted-foreground font-medium">/mo</span>
              </div>
              <p className="text-muted-foreground mt-4 text-sm font-medium">
                For developers building production-ready apps.
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-1 relative z-10">
              <FeatureItem text="Unlimited Generations" highlight />
              <FeatureItem text="TypeScript + Docker Support" highlight />
              <FeatureItem text="Priority AI Processing" highlight />
              <FeatureItem text="Lifetime History" />
              <FeatureItem text="Commercial License" />
            </div>

            <button className="relative z-10 w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 fill-white" />
              Upgrade to Pro
            </button>
          </div>
        </motion.div>

      </div>

      {/* --- Enterprise Banner (Blue Glow) --- */}
      <div className="max-w-5xl mx-auto mt-12">
        <div className="p-8 rounded-3xl bg-slate-900 dark:bg-black text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 dark:border-slate-800 shadow-2xl shadow-blue-900/20">
          {/* Abstract BG */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Need an Enterprise Solution?</h3>
            <p className="text-slate-400 max-w-md">
              Custom AI models trained on your company's specific architecture patterns and style guides.
            </p>
          </div>
          <button className="relative z-10 px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 transition-colors rounded-xl font-bold whitespace-nowrap shadow-lg shadow-white/10">
            Contact Sales
          </button>
        </div>
      </div>

      {/* --- FAQ / Trust --- */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto pt-8 border-t border-border/60">
        <TrustItem 
          icon={<Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          title="Secure Payment"
          desc="Encrypted via Stripe 256-bit SSL."
        />
        <TrustItem 
          icon={<HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          title="24/7 Support"
          desc="Direct access to our engineering team."
        />
        <TrustItem 
          icon={<CreditCard className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
          title="Cancel Anytime"
          desc="No hidden fees or lock-in contracts."
        />
      </div>

    </div>
  );
}

// --- Sub Components ---

function FeatureItem({ text, highlight = false }: { text: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
        highlight 
          ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300' 
          : 'bg-muted text-muted-foreground'
      }`}>
        <Check className="w-3.5 h-3.5" />
      </div>
      <span className={`text-sm ${highlight ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
        {text}
      </span>
    </div>
  );
}

function TrustItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-card/60 transition-colors border border-transparent hover:border-border hover:shadow-lg hover:shadow-violet-500/5">
      <div className="mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-foreground text-sm">{title}</h4>
        <p className="text-xs text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}
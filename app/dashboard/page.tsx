'use client';

import { useEffect, useState } from 'react';
// ⚠️ CRITICAL: Must import from 'next/navigation' in App Router, NOT 'next/router'
import { useRouter } from 'next/navigation'; 
import { useAuth } from '@/contexts/auth-context';
import DiagramUploadZone from '@/components/dashboard/diagram-upload-zone';
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Sparkles, 
  Code, 
  CheckCircle2,
  BrainCircuit
} from 'lucide-react';

// --- Constants ---
const MAX_CREDITS = 3; 

// --- Simulation Data ---
const TERMINAL_LOGS = [
  "> Initializing NodeGraph Environment...",
  "> Loading OCR Engine v2.4...",
  "> Connecting to Mongoose Schema Generator...",
  "> System Ready. Waiting for ER Diagram input.",
];

const DEV_TIPS = [
  "Tip: Ensure your relationships (1:N) are clearly drawn for best accuracy.",
  "Tip: We automatically handle Mongoose 'virtuals' for you.",
  "Tip: Export your code as a zip to keep your folder structure clean.",
];

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth(); // Assuming useAuth provides isLoading
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [currentTip, setCurrentTip] = useState('');

  // 1. Mount Check (Prevents Hydration Mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Auth Protection Effect
  useEffect(() => {
    if (mounted && !isLoading && !user) {
       router.push('/login');
    }
  }, [user, isLoading, mounted, router]);

  // 3. Terminal Simulation Effect
  useEffect(() => {
    if (!mounted) return;
    
    let delay = 0;
    TERMINAL_LOGS.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, delay);
      delay += 800; 
    });

    setCurrentTip(DEV_TIPS[Math.floor(Math.random() * DEV_TIPS.length)]);
  }, [mounted]);

  // --- Loading State (Before Client Mount or Auth Check) ---
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="font-mono text-sm text-muted-foreground">Booting Dashboard...</p>
        </div>
      </div>
    );
  }

  // If we are mounted and not loading, but no user, return null (effect will redirect)
  if (!user) return null;

  // --- 1. DYNAMIC CREDIT CALCULATION ---
  const currentCredits = user?.credits || 0;
  const creditPercentage = Math.min(100, Math.max(0, (currentCredits / MAX_CREDITS) * 100));

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      
      {/* --- Vibrant Animated Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-pink-500/10 dark:bg-pink-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-10" style={{ backgroundSize: '30px 30px' }}></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 relative z-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full flex flex-col p-6 lg:p-10">
          
          {/* --- Header Section --- */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 animate-fade-in">
            <div>
              <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 mb-2">
                <Cpu className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">Workspace Active</span>
              </div>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">
                New Generation
              </h1>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Upload your schema. We build the <span className="font-semibold text-foreground">Models & CRUD</span>. You focus on the <span className="font-semibold text-violet-600 dark:text-violet-400">Business Logic</span>.
              </p>
            </div>

            {/* Credits / Status Card */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:block text-right">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">System Status</p>
                <div className="flex items-center justify-end gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">
                   <span className="relative flex h-2 w-2">
                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                     <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                   <span className="text-xs font-bold">Online</span>
                </div>
              </div>

              {/* --- 2. DYNAMIC CREDITS CARD --- */}
              <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800 p-4 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none min-w-[180px]">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase">Credits</span>
                    <Zap className={`w-4 h-4 fill-current ${currentCredits > 0 ? 'text-yellow-500' : 'text-slate-400'}`} />
                 </div>
                 
                 <div className="flex items-end gap-1 mb-2">
                    <span className={`text-3xl font-bold ${currentCredits === 0 ? 'text-red-500' : 'text-foreground'}`}>
                        {currentCredits}
                    </span>
                    <span className="text-sm text-muted-foreground mb-1">/ {MAX_CREDITS} free</span>
                 </div>
                 
                 {/* Dynamic Progress Bar */}
                 <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ease-out ${
                            currentCredits === 0 ? 'bg-red-500' : 'bg-gradient-to-r from-yellow-400 to-orange-500'
                        }`}
                        style={{ width: `${creditPercentage}%` }} 
                    />
                 </div>
              </div>
            </div>
          </div>

          {/* --- Main Workspace (Upload + Pipeline) --- */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              
             {/* Left Column: Context/Pipeline */}
             <div className="lg:col-span-1 space-y-6 animate-fade-in animation-delay-200">
                {/* Value Prop Card */}
                <div className="bg-gradient-to-br from-violet-600 to-blue-600 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-white/20 transition-all duration-500" />
                   
                   <BrainCircuit className="w-8 h-8 mb-4 text-white/80" />
                   <h3 className="text-xl font-bold mb-2">The "No-Boring-Stuff" Promise</h3>
                   <p className="text-violet-100 text-sm leading-relaxed mb-6">
                      Don't waste time writing `mongoose.Schema` or basic CRUD controllers again.
                   </p>
                   
                   {/* Mini Pipeline Viz */}
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm bg-white/10 p-2 rounded-lg border border-white/10">
                         <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                         <span>Generate Models</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm bg-white/10 p-2 rounded-lg border border-white/10">
                         <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                         <span>Generate Routes</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm bg-white/90 dark:bg-slate-900 text-violet-900 dark:text-violet-200 p-2 rounded-lg font-bold shadow-lg transform translate-x-2">
                         <Code className="w-4 h-4" />
                         <span>You Write Business Logic</span>
                      </div>
                   </div>
                </div>

                {/* Simulated Terminal */}
                <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 font-mono text-xs shadow-xl">
                   <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                      <Terminal className="w-3 h-3 text-slate-500" />
                      <span className="text-slate-500">System Activity</span>
                   </div>
                   <div className="space-y-2 h-[120px] overflow-hidden">
                      {logs.map((log, i) => (
                         <div key={i} className="text-emerald-400 animate-in fade-in slide-in-from-left-2 duration-300">
                            {log}
                         </div>
                      ))}
                      <div className="flex items-center gap-2 text-slate-500 animate-pulse">
                         <span>_</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right Column: Upload Zone */}
             <div className="lg:col-span-2 animate-fade-in animation-delay-300 h-full">
                <div className="h-full flex flex-col">
                   <DiagramUploadZone />
                   
                   {/* Tip Footer */}
                   <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-white/40 dark:bg-black/20 p-3 rounded-full border border-white/50 dark:border-white/10 backdrop-blur-sm self-center">
                      <Sparkles className="w-4 h-4 text-violet-500" />
                      <span>{currentTip}</span>
                   </div>
                </div>
             </div>

          </div>

        </div>
      </main>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 10s infinite; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}
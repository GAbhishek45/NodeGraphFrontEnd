'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { 
  Mail, 
  Lock, 
  Loader2, 
  ArrowRight, 
  AlertCircle, 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  BrainCircuit,
  Fingerprint
} from 'lucide-react';

const SYSTEM_MESSAGES = [
  "Optimizing runtime performance...",
  "Git history looks clean today.",
  "Syntactic sugar levels: High.",
  "Ready to ship to production?",
  "Zero merge conflicts detected.",
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mood, setMood] = useState<'idle' | 'typing' | 'secure' | 'success' | 'processing'>('idle');
  const [systemMessage, setSystemMessage] = useState('');

  useEffect(() => {
    setSystemMessage(SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setMood('processing');

    try {
      await login(email, password);
      setMood('success'); 
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsLoading(false);
      setMood('idle');
    } 
  };

  const renderAiCore = () => {
    switch (mood) {
      case 'typing':
        return (
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse-fast" />
            <Terminal className="w-16 h-16 text-blue-500 relative z-10 transition-all duration-300" />
            <div className="absolute -bottom-2 right-0 w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          </div>
        );
      case 'secure':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20" />
            <ShieldCheck className="w-16 h-16 text-violet-500 relative z-10 animate-pulse" />
            <Fingerprint className="w-6 h-6 text-violet-400 absolute bottom-0 right-0 animate-ping" />
          </div>
        );
      case 'processing':
        return (
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-30" />
             <Cpu className="w-16 h-16 text-indigo-500 relative z-10 animate-spin-slow" />
          </div>
        );
      case 'success':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-40" />
            <Zap className="w-16 h-16 text-emerald-500 relative z-10 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-bounce" />
          </div>
        );
      default: // idle
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-slate-400 blur-2xl opacity-10" />
            <BrainCircuit className="w-16 h-16 text-muted-foreground relative z-10" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-foreground py-10">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full mix-blend-screen filter blur-[96px] opacity-40 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full mix-blend-screen filter blur-[96px] opacity-40 animate-blob animation-delay-2000" />
        {/* Grid Pattern with Dark Mode support */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-10" style={{ backgroundSize: '30px 30px' }}></div>
      </div>

      {/* --- Main Card --- */}
      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        
        {/* The AI Core Container */}
        <div className="absolute -top-14 left-0 right-0 flex justify-center z-20 pointer-events-none">
           <div className="relative w-28 h-28 rounded-2xl border border-border shadow-2xl bg-card flex items-center justify-center transition-all duration-500 ring-1 ring-border group">
             {renderAiCore()}
           </div>
        </div>

        <div className="relative bg-card border border-border rounded-3xl p-8 pt-20 shadow-2xl shadow-black/5 dark:shadow-black/50 ring-1 ring-border">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Developer Access
            </h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium">
              Authenticate to initialize workspace
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
                Identity
              </label>
              <div className="relative group transition-all duration-300">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  id="email"
                  type="email"
                  placeholder="dev@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setMood('typing')}
                  onBlur={() => setMood('idle')}
                  disabled={isLoading}
                  className="h-12 pl-10 bg-muted/50 border-input focus:border-blue-500 rounded-xl font-medium text-foreground"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label htmlFor="password" className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Key Phrase
                </label>
                <Link href="#" className="text-xs text-blue-500 hover:text-blue-400 font-semibold transition-colors">
                  Reset Key?
                </Link>
              </div>
              <div className="relative group transition-all duration-300">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-violet-500 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setMood('secure')} 
                  onBlur={() => setMood('idle')}
                  disabled={isLoading}
                  className="h-12 pl-10 bg-muted/50 border-input focus:border-violet-500 rounded-xl font-medium text-foreground"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className={`w-full h-12 mt-2 font-bold tracking-wide rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]
                ${mood === 'success' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/20' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20'
                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : mood === 'success' ? (
                <div className="flex items-center gap-2">
                  <span>Access Granted</span>
                  <Zap className="w-5 h-5 fill-current animate-bounce" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Initialize Session</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-[10px] font-mono mb-2 uppercase tracking-wider">
              <Terminal className="w-3 h-3" />
              <span>System Status</span>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              {">"} {systemMessage}
            </p>
          </div>

          <p className="text-center text-muted-foreground mt-6 text-sm">
            No access token?{' '}
            <Link href="/signup" className="text-foreground font-bold hover:underline transition-all">
              Request Access
            </Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 10s infinite; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .animate-pulse-fast { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
}
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Loader2, 
  ShieldCheck, 
  Cpu, 
  Fingerprint, 
  AlertCircle,
  KeyRound,
  ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '@/contexts/auth-context';

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || "";
  
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [visualState, setVisualState] = useState<'idle' | 'scanning' | 'authorized'>('idle');
  const {user,setUser} = useAuth();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setVisualState('scanning');

    try {
      // Replace with your actual API endpoint
      const res = await axios.post('/api/auth/verify-otp', { email, otp });
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.status === 200) {

        setVisualState('authorized');
        toast.success("Identity Confirmed");
        setTimeout(() => {
          router.push('/dashboard');
        }, 500);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid verification code");
      setIsLoading(false);
      setVisualState('idle');
    }
  };

  const renderHologram = () => {
    switch (visualState) {
      case 'scanning':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
            <Fingerprint className="w-16 h-16 text-blue-500 relative z-10 animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-400 opacity-50 animate-scan" />
          </div>
        );
      case 'authorized':
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20" />
            <ShieldCheck className="w-16 h-16 text-emerald-500 relative z-10 scale-110 transition-transform" />
          </div>
        );
      default:
        return (
          <div className="relative">
            <KeyRound className="w-16 h-16 text-muted-foreground relative z-10" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-foreground">
      {/* Background Grid - Matching Signup */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[80px] animate-blob" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" style={{ backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        {/* Visualizer Card */}
        <div className="absolute -top-14 left-0 right-0 flex justify-center z-20">
          <div className="relative w-28 h-28 rounded-2xl border border-border bg-card flex items-center justify-center shadow-2xl ring-1 ring-border">
            {renderHologram()}
          </div>
        </div>

        <div className="relative bg-card border border-border rounded-3xl p-8 pt-20 shadow-2xl ring-1 ring-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Decrypt OTP</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Sent to <span className="text-foreground font-mono">{email}</span>
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Access Code</label>
              <div className="relative group transition-transform focus-within:scale-[1.01]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500">
                  <Cpu className="w-5 h-5" />
                </div>
                <Input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="h-14 pl-12 text-2xl tracking-[0.5em] font-mono rounded-xl bg-muted/50 border-input focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className={`w-full h-12 font-bold rounded-xl transition-all ${
                visualState === 'authorized' ? 'bg-emerald-600' : 'bg-primary'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Verify Identity</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button 
              type="button"
              className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
              onClick={() => toast.success("New code dispatched")}
            >
              Request New Link
            </button>
          </div>
        </div>
      </div>
      
      {/* Re-use your global styles from Signup for consistency */}
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
      <VerifyContent />
    </Suspense>
  );
}
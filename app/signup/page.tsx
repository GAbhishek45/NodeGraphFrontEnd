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
  User, 
  Loader2, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles,
  Rocket,
  ScanFace,
  ShieldCheck,
  Cpu,
  Network
} from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [visualState, setVisualState] = useState<'idle' | 'identity' | 'connection' | 'encryption' | 'deploying'>('idle');

  useEffect(() => {
    const pwd = formData.password;
    let score = 0;
    if (pwd.length > 5) score += 1;
    if (pwd.length > 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    setPasswordStrength(score);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setVisualState('deploying');
    
    let newFieldErrors = { name: false, email: false, password: false, confirmPassword: false };
    let hasError = false;

    if (!formData.name) { newFieldErrors.name = true; hasError = true; }
    if (!formData.email) { newFieldErrors.email = true; hasError = true; }
    if (!formData.password) { newFieldErrors.password = true; hasError = true; }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      newFieldErrors.password = true;
      newFieldErrors.confirmPassword = true;
      hasError = true;
    } else if (formData.password.length < 6) {
      setError('Password is too short (min 6 chars)');
      newFieldErrors.password = true;
      hasError = true;
    }

    if (hasError) {
      setFieldErrors(newFieldErrors);
      setIsLoading(false);
      setVisualState('encryption');
      if (!error) setError("Please check the highlighted fields.");
      return;
    }

    try {
      // 1. Trigger the signup (which now sends an OTP in the backend)
      await signup(formData.email, formData.password, formData.name);
      
      // 2. Transition to verification instead of direct dashboard access
      setTimeout(() => {
        router.push(`/signup/verify?email=${encodeURIComponent(formData.email)}`);
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      setIsLoading(false);
      setVisualState('idle');
    }
  };

  const renderHologram = () => {
    switch (visualState) {
      case 'identity': 
        return (
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
            <ScanFace className="w-16 h-16 text-blue-500 relative z-10 transition-all duration-500" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400 opacity-50 animate-scan" />
          </div>
        );
      case 'connection': 
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-violet-500 blur-2xl opacity-20" />
            <Network className="w-16 h-16 text-violet-500 relative z-10 animate-pulse" />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-violet-400 rounded-full animate-ping" />
          </div>
        );
      case 'encryption': 
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20" />
            <ShieldCheck className={`w-16 h-16 relative z-10 transition-colors duration-300 ${passwordStrength > 2 ? 'text-emerald-500' : 'text-indigo-500'}`} />
            {passwordStrength > 2 && <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-emerald-400 animate-spin-slow" />}
          </div>
        );
      case 'deploying': 
        return (
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-40" />
            <Rocket className="w-16 h-16 text-emerald-500 relative z-10 animate-launch" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-400 blur-xl opacity-80 animate-pulse" />
          </div>
        );
      default: 
        return (
          <div className="relative">
             <div className="absolute inset-0 bg-slate-400 blur-2xl opacity-10" />
             <Cpu className="w-16 h-16 text-muted-foreground relative z-10" />
             <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          </div>
        );
    }
  };

  const getInputClass = (fieldName: keyof typeof fieldErrors, focusColor: string) => {
    const hasError = fieldErrors[fieldName];
    return `h-11 pl-10 rounded-xl font-medium transition-all outline-none focus-visible:ring-0 focus:ring-0
      ${hasError 
        ? 'bg-destructive/10 border-destructive text-destructive placeholder:text-destructive/50 focus:border-destructive' 
        : `bg-muted/50 border-input text-foreground focus:border-${focusColor}-500`
      }`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background text-foreground py-10">
      
      {/* --- Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-background">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full mix-blend-screen filter blur-[80px] opacity-40 animate-blob animation-delay-2000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-10" style={{ backgroundSize: '30px 30px' }}></div>
      </div>

      {/* --- Main Container --- */}
      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in mt-12">
        
        {/* Visualizer */}
        <div className="absolute -top-14 left-0 right-0 flex justify-center z-20 pointer-events-none">
           <div className="relative w-28 h-28 rounded-2xl border border-border shadow-2xl bg-card flex items-center justify-center transition-all duration-500 ring-1 ring-border group">
             {renderHologram()}
           </div>
        </div>

        <div className="relative bg-card border border-border rounded-3xl p-8 pt-20 shadow-2xl shadow-black/5 dark:shadow-black/50 ring-1 ring-border">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Initialize Profile</h1>
            <p className="text-muted-foreground mt-2 text-sm font-medium">Join the new standard of backend engineering.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-xl flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              <p className="text-destructive text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Identity</label>
              <div className="relative group transition-transform duration-300 focus-within:scale-[1.01]">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.name ? 'text-destructive' : 'text-muted-foreground group-focus-within:text-blue-500'}`}>
                  <User className="w-5 h-5" />
                </div>
                <Input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setVisualState('identity')}
                  onBlur={() => setVisualState('idle')}
                  className={getInputClass('name', 'blue')}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Comms Link</label>
              <div className="relative group transition-transform duration-300 focus-within:scale-[1.01]">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.email ? 'text-destructive' : 'text-muted-foreground group-focus-within:text-violet-500'}`}>
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  name="email"
                  type="email"
                  placeholder="dev@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setVisualState('connection')}
                  onBlur={() => setVisualState('idle')}
                  className={getInputClass('email', 'violet')}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Encryption</label>
              <div className="relative group transition-transform duration-300 focus-within:scale-[1.01]">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.password ? 'text-destructive' : 'text-muted-foreground group-focus-within:text-indigo-500'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setVisualState('encryption')}
                  onBlur={() => setVisualState('idle')}
                  className={getInputClass('password', 'indigo')}
                />
              </div>
              
              <div className="flex items-center gap-2 mt-2 px-1">
                <div className="flex-1 flex gap-1 h-1.5">
                  {[1, 2, 3, 4].map((step) => (
                    <div 
                      key={step}
                      className={`flex-1 rounded-full transition-all duration-500 ${
                        passwordStrength >= step 
                          ? step <= 2 ? 'bg-destructive/70' : step === 3 ? 'bg-amber-400' : 'bg-emerald-500'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground w-16 text-right">
                    {passwordStrength === 0 ? 'Null' : passwordStrength < 3 ? 'Weak' : 'Secure'}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm Encryption</label>
              <div className="relative group transition-transform duration-300 focus-within:scale-[1.01]">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.confirmPassword ? 'text-destructive' : 'text-muted-foreground group-focus-within:text-indigo-500'}`}>
                  <CheckCircle2 className={`w-5 h-5 transition-colors ${
                    formData.confirmPassword && formData.password === formData.confirmPassword && !fieldErrors.confirmPassword ? 'text-emerald-500' : ''
                  }`} />
                </div>
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setVisualState('encryption')}
                  onBlur={() => setVisualState('idle')}
                  className={getInputClass('confirmPassword', 'indigo')}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-12 mt-4 font-bold tracking-wide rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99]
                ${visualState === 'deploying' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/20'
                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Provisioning Account...</span>
                </div>
              ) : visualState === 'deploying' ? (
                <div className="flex items-center gap-2">
                  <span>Launching Workspace</span>
                  <Rocket className="w-5 h-5 animate-launch" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Initialize Account</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
             <div className="w-full h-px bg-border" />
             <p className="text-sm text-muted-foreground">
               Already initialized?{' '}
               <Link href="/login" className="text-foreground font-bold hover:underline transition-all">
                 Authenticate here
               </Link>
             </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 2s linear infinite; }

        @keyframes launch {
          0% { transform: translate(0, 0); }
          50% { transform: translate(2px, -2px); }
          100% { transform: translate(-2px, -4px); }
        }
        .animate-launch { animation: launch 0.5s ease-in-out infinite alternate; }

        @keyframes spin-slow {
           from { transform: rotate(0deg); }
           to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }

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
      `}</style>
    </div>
  );
}
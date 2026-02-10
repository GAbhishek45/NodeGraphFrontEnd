'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context'; 
import Sidebar from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // --- Auth Check ---
  useEffect(() => {
    setMounted(true);
    if (!user && mounted) {
      router.push('/login');
    }
  }, [user, mounted, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!mounted) return null;

  return (
    // CHANGE 1: Added 'text-foreground' and 'transition-colors' for smooth theme switching
    <div className="flex h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
      
      {/* --- 1. Global Background (Theme Aware) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* Blob 1: Violet (Top Left) 
            - Light: bg-violet-500/10 + mix-blend-multiply (Soft watercolor effect)
            - Dark:  bg-violet-900/10 + mix-blend-screen (Glowing light effect)
        */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-500/10 dark:bg-violet-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
        
        {/* Blob 2: Blue (Top Right) */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
        
        {/* Blob 3: Pink (Bottom) */}
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-pink-500/10 dark:bg-pink-900/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000" />
        
        {/* Grid Pattern: Reduced opacity in Dark Mode (0.2 -> 0.05) to be subtle */}
        <div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 dark:opacity-5 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" 
          style={{ backgroundSize: '30px 30px' }} 
        />
        
      </div>

      {/* --- 2. Sidebar --- */}
      <Sidebar user={user} onLogout={handleLogout} />

      {/* --- 3. The Page Content Area --- */}
      <main className="flex-1 relative z-10 overflow-y-auto h-full">
        {children}
      </main>

      {/* --- 4. Global Animations --- */}
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
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle'; 
import { 
  LayoutDashboard, 
  FolderGit2, 
  CreditCard, 
  BookOpen, 
  LogOut, 
  Zap,
  ChevronRight,
  Waypoints // <--- Imported the Logo Icon from Landing Page
} from 'lucide-react';

interface SidebarProps {
  user: any;
  onLogout: () => void;
}

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Workspace', href: '/dashboard' },
  { icon: FolderGit2, label: 'My Projects', href: '/dashboard/projects' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
];

export default function Sidebar({ user, onLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    // 1. Theme-Aligned Background
    // Light: Glassy white | Dark: Deep Slate/Blue glass
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-border bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl shadow-sm z-30 transition-colors duration-300">
      
      {/* --- Logo Area (Matches Landing Page) --- */}
      <div className="p-6 pb-2">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          {/* Logo Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 dark:bg-white rounded-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-600/40 transition-all duration-300 group-hover:-rotate-3">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-20 rounded-xl"></div>
            {/* Swapped colors for contrast: White icon on dark bg (light mode), Dark icon on white bg (dark mode) */}
            <Waypoints className="w-6 h-6 text-violet-400 dark:text-violet-600 transition-colors duration-300" />
          </div>

          {/* Logo Text */}
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              Node<span className="text-violet-600 dark:text-violet-400">Graph</span>
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
              Beta v1.0
            </span>
          </div>
        </Link>
      </div>

      {/* --- Navigation --- */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
          Menu
        </p>
        
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                ${isActive 
                  ? 'bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-500/10 dark:to-blue-500/10 text-violet-700 dark:text-violet-300 shadow-sm ring-1 ring-violet-200 dark:ring-violet-500/30' 
                  : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-foreground'
                }
              `}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-violet-600 dark:bg-violet-400 rounded-r-full" />
              )}

              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-violet-600 dark:text-violet-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
              <span>{item.label}</span>
              
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-violet-400" />}
            </Link>
          );
        })}

        <div className="mt-8 space-y-1">
           <p className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
             Resources
           </p>
           <Link 
             href="/docs"
             className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-foreground transition-all text-sm font-medium"
           >
             <BookOpen className="w-5 h-5 text-slate-400" />
             <span>Documentation</span>
           </Link>
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div className="p-4 border-t border-border bg-white/50 dark:bg-slate-900/50">
        
        {/* Theme Toggle Row */}
        <div className="flex items-center justify-between px-2 mb-4">
           <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
             Appearance
           </span>
           <ThemeToggle />
        </div>

        {/* Pro Banner (Matching the "Violet/Blue" Brand) */}
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 dark:from-slate-950 dark:via-black dark:to-slate-950 text-white shadow-xl shadow-violet-900/10 relative overflow-hidden group cursor-pointer border border-white/10">
          {/* Animated Glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl -translate-y-6 translate-x-6 group-hover:translate-x-4 transition-transform duration-500" />
          
          <div className="flex items-start justify-between relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3 border border-white/10">
              <Zap className="w-4 h-4 text-yellow-300 fill-current" />
            </div>
            <span className="text-[10px] font-bold bg-violet-600 px-2 py-0.5 rounded text-white shadow-sm">PRO</span>
          </div>
          
          <h4 className="font-bold text-sm relative z-10">Upgrade Plan</h4>
          <p className="text-xs text-slate-300 mt-1 relative z-10 font-medium">Get unlimited generations.</p>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors group border border-transparent hover:border-border">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-100 to-blue-100 dark:from-violet-900 dark:to-blue-900 border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center text-violet-700 dark:text-violet-300 font-bold">
            {user?.name?.[0] || 'D'}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{user?.name || 'Developer'}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || 'dev@local'}</p>
          </div>

          <button 
            onClick={onLogout}
            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
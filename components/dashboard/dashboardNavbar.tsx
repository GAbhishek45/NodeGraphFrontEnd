'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Settings, 
  CreditCard, 
  Code2, 
  LogOut, 
  Zap,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Workspace', href: '/dashboard' },
  { icon: FolderGit2, label: 'Projects', href: '/dashboard/projects' },
  { icon: Code2, label: 'API', href: '/dashboard/api' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
];

export default function DashboardNavbar({ user, onLogout }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 NodeGraph-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* --- Left: Logo --- */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
                BD
              </div>
              <span className="font-bold text-slate-800 tracking-tight text-xl hidden md:block">
                NodeGraph
              </span>
            </Link>

            {/* --- Center: Desktop Navigation --- */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-xl border border-white/50">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${isActive 
                        ? 'bg-white text-violet-700 shadow-sm ring-1 ring-slate-200' 
                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/60'
                      }
                    `}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-violet-600' : 'text-slate-400'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* --- Right: User & Actions --- */}
          <div className="flex items-center gap-4">
            
            {/* Pro Upgrade Button (Hidden on small mobile) */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white text-xs font-bold rounded-lg shadow-lg hover:scale-105 transition-transform">
              <Zap className="w-3 h-3 text-yellow-300 fill-current" />
              <span>UPGRADE</span>
            </button>

            {/* User Dropdown Trigger */}
            <div className="relative group">
              <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/50 transition-colors border border-transparent hover:border-white/60">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-800 leading-none">{user?.name || 'Developer'}</p>
                  <p className="text-[10px] text-slate-500 font-medium leading-none mt-1">Free Plan</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-200 to-pink-200 border-2 border-white shadow-sm flex items-center justify-center text-violet-700 font-bold">
                  {user?.name?.[0] || 'D'}
                </div>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 NodeGraph-blur-xl rounded-xl shadow-xl border border-white/50 p-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all transform origin-top-right scale-95 group-hover:scale-100">
                <Link href="/dashboard/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-violet-50 hover:text-violet-700 transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </Link>
                <div className="h-px bg-slate-100 my-1" />
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 NodeGraph-blur-xl px-4 py-4 space-y-2 animate-in slide-in-from-top-5">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 text-slate-700 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
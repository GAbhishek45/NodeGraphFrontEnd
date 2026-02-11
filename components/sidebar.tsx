'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Clock,
  Settings,
  LogOut,
  Waypoints,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  label: string;
}

import { ThemeToggle } from "@/components/theme-toggle";

function NavItem({ href, icon: Icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="relative group block">
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className="absolute inset-0 bg-white/40 rounded-xl"
        />
      )}
      <div
        className={cn(
          'relative flex items-center gap-3 p-3 rounded-xl transition-colors',
          isActive
            ? 'text-slate-900 font-semibold'
            : 'text-slate-600 hover:bg-white/20'
        )}
      >
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </div>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 p-4 z-50">
      <div className="h-full w-full bg-white/20 NodeGraph-blur-2xl border border-white/30 rounded-3xl flex flex-col p-6 shadow-2xl">
        {/* Logo */}
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

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          <NavItem href="/" icon={Database} label="Generator" />
          <NavItem href="/history" icon={Clock} label="History" />
          <NavItem href="/settings" icon={Settings} label="Settings" />
        </nav>
        

        {/* User / Logout */}
        <button className="flex items-center gap-3 p-3 text-slate-600 hover:text-red-500 transition-colors mt-auto w-full hover:bg-white/20 rounded-xl">
          <LogOut size={20} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}

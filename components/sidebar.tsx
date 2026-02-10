'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Clock,
  Settings,
  LogOut,
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
        <div className="flex items-center gap-2 mb-10">
          <div className="p-2 bg-gradient-to-tr from-violet-500 to-blue-500 rounded-lg shadow-lg">
            <Database className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            NodeGraph
          </h1>
        </div>

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

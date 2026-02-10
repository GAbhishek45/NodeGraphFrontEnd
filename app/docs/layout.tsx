'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle'; // <--- Import Toggle
import { Book, Code2, Terminal, Share2, Zap, FileText } from 'lucide-react';

const DOCS_LINKS = [
  { href: '/docs', label: 'Introduction', icon: Book },
  { href: '/docs/installation', label: 'Installation', icon: Terminal },
  { href: '/docs/quick-start', label: 'Quick Start', icon: Zap },
  // { href: '/docs/models', label: 'Generating Models', icon: Database }, // Assuming you have Database icon imported
  { href: '/docs/relationships', label: 'Relationships', icon: Share2 },
  { href: '/docs/api-routes', label: 'API Routes', icon: Code2 },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    // 1. Main Container: Uses semantic background
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* 2. Sidebar: Uses 'bg-card' or 'bg-muted/30' for contrast */}
      <aside className="w-64 border-r border-border bg-card/50 hidden md:flex flex-col fixed h-full z-10">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            NodeGraph
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {DOCS_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* 3. Sidebar Footer: Add Theme Toggle Here */}
        <div className="p-4 border-t border-border">
           <div className="flex items-center justify-between px-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Theme
              </span>
              <ThemeToggle />
           </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64">
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
          {children}
        </div>
      </main>

    </div>
  );
}
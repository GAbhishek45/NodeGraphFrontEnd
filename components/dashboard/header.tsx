'use client';

import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
  onLogout: () => void;
}

export default function DashboardHeader({ user, onLogout }: DashboardHeaderProps) {
  return (
    <header className="border-b border-gray-200 NodeGraph-blur-sm bg-white/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <span className="text-white font-bold text-lg">DH</span>
          </div>
          <span className="text-xl font-bold text-gray-900">DevHub</span>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* User info */}
          <div className="flex flex-col items-end">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>

          {/* Logout button */}
          <Button
            onClick={onLogout}
            variant="outline"
            className="ml-2 bg-transparent"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

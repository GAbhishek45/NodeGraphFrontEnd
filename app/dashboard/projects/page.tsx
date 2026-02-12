'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  FolderGit2, 
  Trash2,
  Edit2,
  Rocket,
  Clock,
  GitBranch,
  Sparkles,
  Loader2,
  AlertCircle
} from 'lucide-react';

// --- Utility: Time Ago Formatter ---
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
};

// --- Types ---
interface Project {
  _id: string;
  name?: string; // Fallback if your DB field is different
  title?: string; // Fallback
  status: 'completed' | 'failed' | 'pending' | 'processing'; 
  createdAt: string;
  branch?: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  // --- Dynamic State ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Fetch Projects ---
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('/api/generation/history');
        setProjects(res.data);
      } catch (err: any) {
        console.error("Failed to fetch history:", err);
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleNewProject = () => {
    router.push('/dashboard');
  };

  // --- Filtering Logic ---
  const filteredProjects = projects.filter((project) => {
    const projectName = project.name || project.title || "Untitled Project";
    return projectName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="relative min-h-full">
      <div className="relative z-10 p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* --- Header & Actions --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">My Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and deploy your generated backends.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-violet-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-9 pr-4 rounded-xl bg-card/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all w-64 placeholder:text-muted-foreground/50 backdrop-blur-sm"
              />
            </div>

            {/* New Project Button */}
            <button 
              onClick={handleNewProject}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center gap-2 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* --- Projects Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* === Generator Card (Always Visible) === */}
          <button 
            onClick={handleNewProject}
            className="group relative flex flex-col items-center justify-center p-8 rounded-3xl border border-dashed border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-blue-500/5 hover:from-violet-500/10 hover:to-blue-500/10 hover:border-violet-500/60 transition-all duration-300 h-full min-h-[200px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                 <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">Generate Backend</h3>
              <p className="text-sm text-muted-foreground text-center mt-2 max-w-[200px] group-hover:text-foreground/80 transition-colors">
                 Upload a diagram to build a new backend instantly.
              </p>
            </div>
          </button>

          {/* === Loading State === */}
          {loading && (
             <div className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[200px] rounded-3xl border border-border bg-card/30">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading history...</span>
                </div>
             </div>
          )}

          {/* === Error State === */}
          {!loading && error && (
             <div className="col-span-1 md:col-span-2 flex items-center justify-center min-h-[200px] rounded-3xl border border-red-500/20 bg-red-500/5">
                <div className="flex flex-col items-center gap-2 text-red-500">
                    <AlertCircle className="w-8 h-8" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
             </div>
          )}

          {/* === Filtered Project Cards === */}
          {!loading && !error && filteredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}

          {/* === Empty State (No Search Results) === */}
          {!loading && !error && filteredProjects.length === 0 && projects.length > 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">No projects found for "{searchQuery}"</p>
            </div>
          )}
          
          {/* === Empty State (No Projects at all) === */}
          {!loading && !error && projects.length === 0 && (
             <div className="col-span-full py-8 text-center text-muted-foreground text-sm">
                You haven't generated any projects yet. Click the card above to start!
             </div>
          )}

        </div>
      </div>
    </div>
  );
}

// --- Sub-Components ---

function ProjectCard({ project }: { project: Project }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Normalize data fields based on DB Schema
  const displayName = project.name || project.title || "Untitled Project";
  const displayTime = formatTimeAgo(project.createdAt);
  const displayBranch = project.branch || "main";

  console.log("project",project)

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCardClick = () => {
    if (!isMenuOpen) {
       // Use _id for routing
       //router.push(`/dashboard/projects/${project._id}`);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:shadow-violet-500/5 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full min-h-[200px] cursor-pointer"
    >
      
      {/* Top Row: Icon + Title + Menu */}
      <div className="flex items-start justify-between">
         <div className="flex items-start gap-4">
            {/* Icon Box */}
            <div className="p-3.5 rounded-2xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50 group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-6 h-6" />
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-bold text-foreground group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate pr-2">
                {displayName}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 font-medium flex items-center gap-1.5">
                 <Clock className="w-3 h-3" />
                 {displayTime}
              </p>
            </div>
         </div>

         {/* 3 Dots Menu */}
         <div className="relative">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative z-20"
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }} 
                />
                <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-popover border border-border shadow-xl z-40 animate-in fade-in zoom-in-95 duration-200 p-1">
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-foreground hover:bg-muted flex items-center gap-2 transition-colors">
                    <Rocket className="w-3.5 h-3.5" /> Deploy
                  </button>
                  <div className="h-px bg-border my-1" />
                  <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </>
            )}
         </div>
      </div>

      {/* Bottom Row: Branch & Status */}
      <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
         <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md">
            <GitBranch className="w-3 h-3" />
            {displayBranch}
         </div>
         <StatusBadge status={project.status} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  // Safe normalization of status string to lowercase
  const safeStatus = status?.toLowerCase() || 'pending';

  const styles: any = {
    completed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    deployed: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20", // Alias for completed
    
    pending: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    development: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20", // Alias
    
    processing: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    building: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20", // Alias
    
    failed: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    error: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20", // Alias
  };

  const labels: any = {
    completed: "Live",
    deployed: "Live",
    pending: "Pending",
    development: "Dev",
    processing: "Building",
    building: "Building",
    failed: "Error",
    error: "Error",
  };

  const activeStyle = styles[safeStatus] || styles['pending'];
  const activeLabel = labels[safeStatus] || safeStatus;

  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${activeStyle}`}>
      {activeLabel}
    </span>
  );
}
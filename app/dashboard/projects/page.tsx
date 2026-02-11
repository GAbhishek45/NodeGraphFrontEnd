'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  Plus, Search, MoreVertical, FolderGit2, Trash2, Edit2, Rocket, 
  Clock, GitBranch, Sparkles, Loader2, AlertCircle, Download, FileDown 
} from 'lucide-react';

// ... (Keep your existing formatTimeAgo and Interface code here) ...

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get('/api/generate/history');
      setProjects(res.data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // --- ⬇️ DOWNLOAD FUNCTION ⬇️ ---
  const handleDownload = async (e: React.MouseEvent, project: any) => {
    e.stopPropagation(); // Prevent clicking the card
    setDownloadingId(project._id);
    
    try {
      // Hit the Next.js Proxy
      const response = await axios.get(`/api/projects/${project._id}/download`, {
        responseType: 'blob', // Critical for files
      });

      // Create Blob Link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${project.name || 'project'}.zip`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success("Download started!");
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Failed to download project");
    } finally {
      setDownloadingId(null);
    }
  };

  // ... (Keep existing filtering logic) ...

  const filteredProjects = projects.filter((project) =>
    (project.name || "Untitled").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-full p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* ... (Keep Header Section) ... */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ... (Keep Generator Card) ... */}

        {/* Project Cards */}
        {!loading && !error && filteredProjects.map((project) => (
          <div 
            key={project._id}
            onClick={() => router.push(`/dashboard/projects/${project._id}`)}
            className="group relative p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:shadow-violet-500/5 transition-all duration-300 flex flex-col justify-between h-full min-h-[200px] cursor-pointer"
          >
             {/* Top Row */}
             <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 overflow-hidden">
                   <div className="p-3.5 rounded-2xl bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50 shrink-0">
                     <FolderGit2 className="w-6 h-6" />
                   </div>

                   <div className="min-w-0">
                     {/* --- 🎨 TITLE OVERFLOW FIX --- */}
                     <h3 className="text-lg font-bold text-foreground truncate pr-2" title={project.name}>
                       {project.name || "Untitled Project"}
                     </h3>
                     <p className="text-sm text-muted-foreground mt-1 font-medium flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {/* {formatTimeAgo(project.createdAt)} */} 2 hours ago
                     </p>
                   </div>
                </div>

                <div className="flex items-center gap-1">
                    {/* --- ⬇️ DOWNLOAD BUTTON --- */}
                    <button 
                        onClick={(e) => handleDownload(e, project)}
                        disabled={downloadingId === project._id}
                        className="p-2 rounded-xl hover:bg-violet-100 dark:hover:bg-violet-900/30 text-muted-foreground hover:text-violet-600 transition-colors"
                        title="Download Source Code"
                    >
                        {downloadingId === project._id ? (
                            <Loader2 className="w-5 h-5 animate-spin text-violet-500" />
                        ) : (
                            <Download className="w-5 h-5" />
                        )}
                    </button>

                    {/* Menu Button */}
                    <button className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
             </div>

             {/* Bottom Row */}
             <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded-md">
                   <GitBranch className="w-3 h-3" />
                   main
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                   Success
                </span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
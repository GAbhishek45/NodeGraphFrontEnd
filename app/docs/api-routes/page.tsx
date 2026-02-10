'use client';

import React from 'react';
import { Server, Shield, Globe, Lock, Terminal } from 'lucide-react';

export default function ApiRoutesPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* --- Header --- */}
      <div>
        <span className="inline-flex items-center gap-1.5 text-pink-600 dark:text-pink-400 font-bold tracking-wider text-xs uppercase bg-pink-50 dark:bg-pink-900/20 px-3 py-1 rounded-full border border-pink-100 dark:border-pink-800">
          <Server className="w-3 h-3" />
          API Reference
        </span>
        <h1 className="text-4xl font-extrabold text-foreground mt-4 mb-4">API Routes</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          NodeGraph automatically generates a full <strong className="text-foreground">RESTful CRUD interface</strong> for every entity found in your diagram.
        </p>
      </div>

      {/* --- Main Routes Section --- */}
      <section className="not-prose space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-4">
          <h3 className="font-bold text-foreground flex items-center gap-2 text-lg">
            <Globe className="w-5 h-5 text-blue-500" />
            Standard Endpoints
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border border-border">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <span className="text-xs font-mono text-muted-foreground">Base URL: http://localhost:5000</span>
          </div>
        </div>
        
        <div className="grid gap-4">
          {/* GET List */}
          <EndpointCard 
            method="GET" 
            path="/api/{resource}" 
            desc="Retrieve a paginated list of all documents."
            color="blue"
          />

          {/* GET One */}
          <EndpointCard 
            method="GET" 
            path="/api/{resource}/:id" 
            desc="Retrieve a single document by its Object ID."
            color="blue"
          />

          {/* POST */}
          <EndpointCard 
            method="POST" 
            path="/api/{resource}" 
            desc="Create a new document. Validates against schema."
            color="emerald"
          />

          {/* PUT */}
          <EndpointCard 
            method="PUT" 
            path="/api/{resource}/:id" 
            desc="Update an existing document completely."
            color="amber"
          />

          {/* DELETE */}
          <EndpointCard 
            method="DELETE" 
            path="/api/{resource}/:id" 
            desc="Remove a document permanently from the database."
            color="red"
          />
        </div>
      </section>

      {/* --- Security Note --- */}
      <section className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row gap-6 items-start shadow-sm">
        <div className="p-3 bg-muted rounded-xl border border-border shrink-0">
          <Shield className="w-6 h-6 text-slate-400 dark:text-slate-300" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground flex items-center gap-2 text-lg">
            Authentication & Security
            <Lock className="w-4 h-4 text-muted-foreground" />
          </h4>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            By default, all generated routes are <strong>public</strong> to allow for easy testing. 
            To secure them, uncomment the middleware line in your generated <code>routes/index.js</code> file:
          </p>
          
          <div className="mt-4 bg-[#0f172a] rounded-xl p-4 border border-slate-800 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Terminal className="w-4 h-4 text-slate-600" />
            </div>
            <div className="font-mono text-sm overflow-x-auto flex flex-col gap-1">
               <div className="text-slate-500 select-none">
                  // routes/index.js
               </div>
               <div className="flex gap-2">
                  <span className="text-purple-400">router</span>.<span className="text-blue-400">use</span>(<span className="text-green-400">'/api'</span>, <span className="text-yellow-200">authMiddleware</span>); 
                  <span className="text-slate-500 text-xs italic ml-4 self-center hidden md:block">{'<-- Uncomment this line'}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- Helper Component ---

function EndpointCard({ method, path, desc, color }: any) {
  // Semantic Colors for Dark/Light Mode
  const styles: any = {
    blue: "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/20",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/20",
    amber: "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/20",
    red: "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 border-red-200 dark:border-red-500/20",
  };

  return (
    <div className="group flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-300">
      {/* Method Badge */}
      <div className={`px-3 py-1.5 rounded-lg font-bold text-xs w-fit md:w-24 text-center border shadow-sm shrink-0 ${styles[color]}`}>
        {method}
      </div>
      
      {/* Path */}
      <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded border border-border w-fit">
        {path}
      </code>
      
      {/* Description */}
      <span className="text-sm text-muted-foreground md:ml-auto group-hover:text-foreground transition-colors">
        {desc}
      </span>
    </div>
  );
}
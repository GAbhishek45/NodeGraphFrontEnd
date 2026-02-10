'use client';

import React from 'react';
import { GitFork, Link as LinkIcon, ArrowRight, Layers, CheckCircle2, Network } from 'lucide-react';

export default function RelationshipsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* --- Header --- */}
      <div>
        <span className="inline-flex items-center gap-1.5 text-violet-600 dark:text-violet-400 font-bold tracking-wider text-xs uppercase bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full border border-violet-100 dark:border-violet-800">
          <Network className="w-3 h-3" />
          Advanced Logic
        </span>
        <h1 className="text-4xl font-extrabold text-foreground mt-4 mb-4">Relationships</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          NodeGraph detects connecting lines in your diagram and automatically generates 
          <strong className="text-foreground"> Mongoose References (ObjectId)</strong> to link your data.
        </p>
      </div>

      {/* --- 1:N Visualizer --- */}
      <section className="not-prose">
        <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <GitFork className="w-5 h-5 text-blue-500" />
          One-to-Many (1:N)
        </h3>
        
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row">
          
          {/* Visual Diagram Side */}
          <div className="flex-1 p-8 flex flex-col items-center justify-center bg-muted/30 border-b md:border-b-0 md:border-r border-border">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-8">Diagram Input</div>
            <div className="flex items-center gap-6 relative">
              
              {/* User Box */}
              <div className="w-24 h-24 bg-card border-2 border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center shadow-sm relative z-10 group">
                <span className="font-bold text-foreground">User</span>
                <span className="text-[10px] text-muted-foreground mt-1">Parent</span>
                {/* Cardinality Badge */}
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">1</div>
              </div>
              
              {/* Connector */}
              <div className="flex flex-col items-center text-slate-300 dark:text-slate-600">
                <div className="h-[2px] w-12 bg-current" />
                <ArrowRight className="w-4 h-4 -mt-[9px] ml-auto" />
              </div>

              {/* Post Box */}
              <div className="w-24 h-24 bg-card border-2 border-slate-300 dark:border-slate-600 rounded-xl flex flex-col items-center justify-center shadow-sm relative z-10">
                <span className="font-bold text-foreground">Post</span>
                <span className="text-[10px] text-muted-foreground mt-1">Child</span>
                {/* Cardinality Badge */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">N</div>
              </div>

            </div>
          </div>

          {/* Generated Code Side */}
          <div className="flex-1 p-0 bg-[#0d1117] overflow-x-auto">
            <div className="px-6 py-3 border-b border-white/10 flex items-center justify-between">
               <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Generated Schema</div>
               <div className="text-[10px] text-slate-500 font-mono">Post.js</div>
            </div>
            
            <div className="p-6 text-slate-300 font-mono text-sm leading-relaxed">
              <div>
                <span className="text-blue-400">const</span> <span className="text-yellow-200">PostSchema</span> = <span className="text-blue-400">new</span> Schema({`{`}
              </div>
              <div className="pl-4 py-0.5">
                <span className="text-blue-300">title</span>: String,
              </div>
              
              {/* Highlighted Block */}
              <div className="pl-4 py-2 my-1 bg-violet-500/10 border-l-2 border-violet-500 relative">
                <span className="text-blue-300">author_id</span>: {`{`} <span className="text-slate-500 italic">// Reference Added</span>
                <div className="pl-4">
                  type: Schema.Types.<span className="text-emerald-300">ObjectId</span>,
                </div>
                <div className="pl-4">
                  <span className="text-orange-300">ref</span>: <span className="text-green-300">'User'</span>
                </div>
                {`}`}
              </div>
              
              <div>{`}`});</div>
            </div>
          </div>

        </div>
      </section>

      {/* --- Population Explanation --- */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-violet-500" />
          <h2 className="text-2xl font-bold text-foreground">Automatic Population</h2>
        </div>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          When you fetch data using our generated API, we automatically "join" the tables so you get the full object, not just the ID.
        </p>

        <div className="grid md:grid-cols-2 gap-6 not-prose">
          <ResponseCard 
            title="Standard Response" 
            code={`{
  "id": "post_123",
  "title": "Hello World",
  "author_id": "user_999" 
}`} 
            type="bad"
          />
          <ResponseCard 
            title="NodeGraph Response (Populated)" 
            code={`{
  "id": "post_123",
  "title": "Hello World",
  "author": {
    "id": "user_999",
    "name": "Abhishek",
    "email": "dev@local"
  }
}`} 
            type="good"
          />
        </div>
      </section>

      {/* --- Supported Types --- */}
      <section className="bg-card rounded-2xl p-8 border border-border shadow-sm">
        <h3 className="font-bold text-foreground mb-6 text-lg">Supported Relationship Types</h3>
        <ul className="grid gap-4 not-prose">
          <RelationItem 
            title="One-to-Many (1:N)" 
            desc="Example: User has many Posts. We add 'user_id' to the Post model automatically."
          />
          <RelationItem 
            title="One-to-One (1:1)" 
            desc="Example: User has one Profile. We add 'profile_id' to User (and set unique: true)."
          />
          <RelationItem 
            title="Many-to-Many (M:N)" 
            desc="Example: Students and Classes. We create an array of IDs: 'students: [{ type: ObjectId }]'."
          />
        </ul>
      </section>

    </div>
  );
}

// --- Helper Components ---

function ResponseCard({ title, code, type }: { title: string, code: string, type: 'good' | 'bad' }) {
  const isGood = type === 'good';
  return (
    <div className={`rounded-xl border p-1 transition-all ${isGood ? 'bg-gradient-to-b from-violet-500/10 to-transparent border-violet-500/30' : 'bg-muted/30 border-border'}`}>
      <div className="px-4 py-3 text-xs font-bold uppercase tracking-wider flex justify-between items-center">
        <span className={isGood ? 'text-violet-600 dark:text-violet-400' : 'text-muted-foreground'}>{title}</span>
        {isGood && <CheckCircle2 className="w-4 h-4 text-violet-500" />}
      </div>
      <div className="bg-[#1e1e1e] rounded-lg p-4 overflow-x-auto shadow-inner">
        <pre className="text-xs font-mono text-slate-300 leading-relaxed">{code}</pre>
      </div>
    </div>
  );
}

function RelationItem({ title, desc }: { title: string, desc: string }) {
  return (
    <li className="flex gap-4 items-start p-4 bg-background rounded-xl border border-border/50 hover:border-violet-500/30 transition-colors">
      <div className="mt-1 p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-300">
        <LinkIcon className="w-4 h-4" />
      </div>
      <div>
        <h4 className="font-bold text-foreground text-sm mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}
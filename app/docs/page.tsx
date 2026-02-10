'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Lightbulb, 
  FileImage, 
  PenTool, 
  Server, 
  Database, 
  ArrowRight, 
  GitFork,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function DocsHomePage() {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* --- 1. Hero Section --- */}
      <div className="space-y-6">
        <span className="inline-flex items-center gap-1.5 text-primary font-bold tracking-wider text-xs uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
          <Lightbulb className="w-3 h-3" />
          Documentation
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          Turn Diagrams into <br />
          <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            Deployed Code.
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          NodeGraph is the missing link between your <strong>Excalidraw</strong> sketches and your <strong>Production</strong> server. 
          Stop writing boilerplate. Start shipping logic.
        </p>

        <div className="flex flex-wrap gap-4 pt-2">
          <Link href="/docs/installation">
            <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link href="/docs/models">
            <button className="px-6 py-2.5 rounded-full border border-border bg-background text-foreground hover:bg-muted font-medium transition-colors">
              See Examples
            </button>
          </Link>
        </div>
      </div>

      {/* --- 2. The "Magic" Grid (What gets generated) --- */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          What's in the box?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <FeatureCard 
            icon={<Server className="w-6 h-6 text-blue-500" />}
            title="Express.js Server"
            desc="A complete MVC structure with app.js, routes, and error handling middleware configured automatically."
          />
          <FeatureCard 
            icon={<Database className="w-6 h-6 text-emerald-500" />}
            title="Mongoose Schemas"
            desc="Strictly typed models with validation, timestamps, and automatic type inference from your diagram."
          />
          <FeatureCard 
            icon={<GitFork className="w-6 h-6 text-purple-500" />}
            title="Smart Relationships"
            desc="We detect lines between boxes and generate virtuals, populate() logic, and ObjectId references."
          />
          <FeatureCard 
            icon={<ShieldCheck className="w-6 h-6 text-orange-500" />}
            title="Production Ready"
            desc="Includes CORS configuration, helmet security headers, .env setup, and clean architecture patterns."
          />
        </div>
      </section>

      {/* --- 3. Input Formats --- */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Supported Inputs</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card 1 */}
          <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileImage className="w-20 h-20 text-blue-500" />
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500">
                <FileImage className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">ER Diagrams</h3>
              <p className="text-sm text-muted-foreground">
                Export from tools like Draw.io, Lucidchart, or Excalidraw. 
                Standard "Crow's Foot" or "Chen" notation works best.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 hover:border-primary/50 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <PenTool className="w-20 h-20 text-violet-500" />
            </div>
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4 text-violet-500">
                <PenTool className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Whiteboard Sketches</h3>
              <p className="text-sm text-muted-foreground">
                Snapped a photo of a whiteboard? We can read that too. 
                Ensure handwriting is legible and boxes are clearly defined.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// --- Helper Component ---

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-5 rounded-xl bg-card border border-border hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
      <div className="flex gap-4 items-start">
        <div className="shrink-0 p-2 bg-muted rounded-lg border border-border/50">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-foreground text-base mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
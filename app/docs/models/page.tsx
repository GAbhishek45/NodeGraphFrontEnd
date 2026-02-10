'use client';

import React from 'react';
import { Database, Code2, ArrowRight, ShieldCheck, Clock, ListFilter } from 'lucide-react';

export default function ModelsPage() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* --- Header --- */}
      <div>
        <span className="text-emerald-600 font-bold tracking-wider text-xs uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          Core Concepts
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-4">Database Models</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          NodeGraph intelligently translates your visual entities into robust <strong className="text-slate-800">Mongoose Schemas</strong>, preserving types, constraints, and defaults.
        </p>
      </div>

      {/* --- Interactive Visualizer: Diagram vs Code --- */}
      <section className="not-prose">
        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-violet-600" />
          Conversion Logic
        </h3>
        
        <div className="bg-slate-900 rounded-2xl p-1 shadow-2xl overflow-hidden border border-slate-800">
          {/* Toolbar */}
          <div className="bg-[#1e1e1e] px-4 py-2 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-500">schema_generator.ts</span>
          </div>
          
          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 bg-[#0d1117]">
            
            {/* Left: Input (Visual Diagram Representation) */}
            <div className="p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 relative">
              <div className="absolute top-4 left-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Input: Diagram</div>
              
              {/* The Entity Card */}
              <div className="w-64 bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform hover:scale-105 duration-300">
                <div className="bg-violet-600 px-4 py-2 flex justify-between items-center">
                  <span className="text-white font-bold text-sm">User</span>
                  <Code2 className="w-4 h-4 text-white/70" />
                </div>
                <div className="p-4 space-y-3 bg-white">
                  <EntityRow name="id" type="PK" />
                  <EntityRow name="email" type="String" />
                  <EntityRow name="role" type="Enum" />
                  <EntityRow name="is_active" type="Bool" />
                </div>
              </div>
              
              <div className="mt-6 text-slate-400 text-xs flex items-center gap-2">
                <ArrowRight className="w-4 h-4" /> AI detects box & attributes
              </div>
            </div>

            {/* Right: Output (Code) */}
            <div className="p-6 overflow-x-auto">
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-4">Output: Mongoose Schema</div>
              <pre className="font-mono text-sm leading-relaxed">
                <code className="text-blue-300">const</code> <code className="text-yellow-300">UserSchema</code> <code className="text-slate-300">=</code> <code className="text-blue-300">new</code> <code className="text-emerald-300">Schema</code><code className="text-slate-300">({`{`}</code>{'\n'}
                <CodeLine indent={1} label="email" val="{ type: String, unique: true }" />
                <CodeLine indent={1} label="role" val="{ type: String, enum: ['user', 'admin'] }" />
                <CodeLine indent={1} label="isActive" val="{ type: Boolean, default: true }" />
                <code className="text-slate-300">{'}'}, {`{`}</code>{'\n'}
                <CodeLine indent={1} label="timestamps" val="true" />
                <code className="text-slate-300">{`}`});</code>
              </pre>
            </div>

          </div>
        </div>
      </section>

      {/* --- Feature Grid --- */}
      <section className="grid md:grid-cols-3 gap-4 not-prose">
        <FeatureCard 
          icon={<Clock className="w-5 h-5 text-blue-600" />}
          title="Auto Timestamps"
          desc="createdAt and updatedAt fields are added automatically to every model."
        />
        <FeatureCard 
          icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
          title="Validations"
          desc="Fields like 'email' get unique indexes and regex validation by default."
        />
        <FeatureCard 
          icon={<ListFilter className="w-5 h-5 text-violet-600" />}
          title="Smart Enums"
          desc="We detect common status fields (e.g., 'role', 'status') and create enums."
        />
      </section>

      {/* --- Type Mapping Table --- */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Type Detection Logic</h2>
        <div className="not-prose overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-1/3">Field Name (Input)</th>
                <th className="px-6 py-4 w-1/3">Inferred Type</th>
                <th className="px-6 py-4">Applied Constraints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <TableRow input="email" type="String" constraint="unique: true, lowercase: true" />
              <TableRow input="password" type="String" constraint="select: false (hidden by default)" />
              <TableRow input="age, count, qty" type="Number" constraint="min: 0" />
              <TableRow input="is_active, verified" type="Boolean" constraint="default: false" />
              <TableRow input="settings, config" type="Object (Map)" constraint="Mixed type support" />
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

// --- Helper Components ---

function EntityRow({ name, type }: { name: string, type: string }) {
  return (
    <div className="flex justify-between items-center text-xs border-b border-slate-100 last:border-0 pb-2 last:pb-0">
      <span className="font-mono text-slate-700 font-bold">{name}</span>
      <span className="text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{type}</span>
    </div>
  );
}

function CodeLine({ indent, label, val }: { indent: number, label: string, val: string }) {
  return (
    <div style={{ paddingLeft: `${indent * 1.5}rem` }}>
      <span className="text-blue-300">{label}</span>: <span className="text-orange-300">{val}</span>,
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-violet-300 transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-slate-50 rounded-lg">{icon}</div>
        <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function TableRow({ input, type, constraint }: any) {
  return (
    <tr className="hover:bg-slate-50/50 transition-colors">
      <td className="px-6 py-4 font-mono text-violet-700 font-medium">{input}</td>
      <td className="px-6 py-4 font-bold text-slate-700">{type}</td>
      <td className="px-6 py-4 text-xs font-mono text-slate-500">
        <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">{constraint}</span>
      </td>
    </tr>
  );
}
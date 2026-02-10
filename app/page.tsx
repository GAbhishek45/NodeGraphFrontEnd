'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { ThemeToggle } from '@/components/theme-toggle'; // <--- 1. Import this
import { 
  Zap, 
  GitBranch, 
  Code2, 
  ArrowRight, 
  Database, 
  Layers, 
  Cpu, 
  Check, 
  Menu, 
  X,
  Github,
  Twitter,
  BookOpen,
  Waypoints, 
  ShieldCheck, 
  Box, 
  FileJson 
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (user && !isLoading) {
      router.push('/dashboard');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user, isLoading, router]);

  const handleStartGenerating = () => {
    router.push('/login');
  };

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Initializing Environment...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: Cpu,
      title: 'Intelligent Parsing',
      description: 'Our engine analyzes your ER diagrams pixel-by-pixel, identifying entities, attributes, and data types with 99% accuracy.',
    },
    {
      icon: GitBranch,
      title: 'Smart Relationships',
      description: 'Automatically detects 1:N and M:N associations, configuring Mongoose virtuals and references without manual intervention.',
    },
    {
      icon: Layers,
      title: 'Clean Architecture',
      description: 'Generates a scalable MVC folder structure with separate controllers, services, and route handlers.',
    },
  ];

  return (
    <div className="min-h-screen relative landing-mesh overflow-hidden bg-slate-50 dark:bg-background selection:bg-violet-200 selection:text-violet-900">
      
      {/* --- Navbar --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen 
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* --- LOGO: NodeGraph --- */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer group" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {/* Logo Icon */}
              <div className="relative w-10 h-10 flex items-center justify-center bg-slate-900 rounded-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-600/40 transition-all duration-300 group-hover:-rotate-3">
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-600 opacity-20 rounded-xl"></div>
                <Waypoints className="w-6 h-6 text-violet-400 group-hover:text-white transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-slate-50 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Logo Text */}
              <div className="flex flex-col justify-center -space-y-1">
                <span className={`text-xl font-extrabold tracking-tight ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                  Node<span className="text-violet-600">Graph</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-0.5 group-hover:text-violet-500 transition-colors">
                  Beta
                </span>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">How it Works</a>
              
              <Link 
                href="/docs" 
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-200 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-slate-700 transition-all shadow-sm group"
              >
                <BookOpen className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-600 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-wider">Docs</span>
              </Link>

              <a href="/billing" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Pricing</a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              {/* --- 2. THEME TOGGLE (Desktop) --- */}
              <ThemeToggle />

              <Button variant="ghost" onClick={() => router.push('/login')} className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-semibold">
                Sign In
              </Button>
              <Button onClick={handleStartGenerating} className="bg-slate-900 dark:bg-violet-600 hover:bg-slate-800 dark:hover:bg-violet-700 text-white font-bold shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 transition-all transform hover:-translate-y-0.5">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-600 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 p-4 shadow-xl animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-slate-600 dark:text-slate-300 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="text-slate-600 dark:text-slate-300 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
              
              <Link 
                href="/docs" 
                className="flex items-center gap-2 py-2 text-violet-700 dark:text-violet-400 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4" />
                Documentation
              </Link>
              
              <div className="flex items-center justify-between py-2 border-t border-b border-slate-100 dark:border-slate-800 my-2">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Switch Theme</span>
                {/* --- 3. THEME TOGGLE (Mobile) --- */}
                <ThemeToggle />
              </div>

              <Button variant="outline" onClick={() => router.push('/login')} className="w-full justify-center">Sign In</Button>
              <Button onClick={handleStartGenerating} className="w-full justify-center bg-violet-600">Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-200/50 dark:bg-violet-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-200/50 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-teal-100/50 dark:bg-teal-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" style={{ backgroundSize: '30px 30px', opacity: 0.4 }}></div>
      </div>

      <div className="relative z-10 pt-32 pb-16">
        
        {/* --- Hero Section --- */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 border border-violet-100 dark:border-violet-900 shadow-sm backdrop-blur-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">V1.0 is now live</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight animate-fade-in animation-delay-200">
            Stop Writing <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Backend Boilerplate
            </span>
          </h1>

          {/* Sub Headline */}
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-300">
            Upload your ER diagram and get a production-ready Node.js & Mongoose API in seconds. Focus on logic, not setup.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in animation-delay-400 mb-20">
            <Button
              onClick={handleStartGenerating}
              className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 shadow-xl shadow-violet-500/20 hover:scale-105 transition-all duration-300"
            >
              Start Generating Free
              <Zap className="ml-2 w-5 h-5 fill-current" />
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 text-lg rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 hover:border-violet-200 text-slate-700 dark:text-slate-200 transition-all duration-300"
            >
              View Demo Code
              <Code2 className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Code Preview Mockup */}
          <div className="w-full max-w-5xl mx-auto animate-fade-in animation-delay-500 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#1e1e2e] border border-slate-800">
              {/* Window Controls */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#242436] border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-slate-400">generated-controller.js</div>
              </div>
              {/* Fake Code */}
              <div className="p-6 overflow-x-auto text-left">
                <pre className="font-mono text-sm leading-relaxed text-slate-300">
                  <code className="text-blue-300">const</code> <span className="text-yellow-300">User</span> <span className="text-white">=</span> <span className="text-blue-300">require</span>(<span className="text-green-300">'../models/User'</span>);{'\n'}
                  {'\n'}
                  <span className="text-gray-500">// Auto-generated create controller with validation</span>{'\n'}
                  <span className="text-purple-300">exports</span>.<span className="text-blue-300">createUser</span> <span className="text-white">=</span> <span className="text-purple-300">async</span> (<span className="text-orange-300">req</span>, <span className="text-orange-300">res</span>) <span className="text-white">{'=>'}</span> {'{'}{'\n'}
                  {'  '}<span className="text-purple-300">try</span> {'{'}{'\n'}
                  {'    '}<span className="text-blue-300">const</span> {'{'}<span className="text-orange-300"> email</span>, <span className="text-orange-300">role</span>{'}'} <span className="text-white">=</span> <span className="text-orange-300">req</span>.<span className="text-orange-300">body</span>;{'\n'}
                  {'    '}<span className="text-blue-300">const</span> <span className="text-orange-300">user</span> <span className="text-white">=</span> <span className="text-purple-300">await</span> <span className="text-yellow-300">User</span>.<span className="text-blue-300">create</span>({'{'} <span className="text-orange-300">email</span>, <span className="text-orange-300">role</span> {'}'});{'\n'}
                  {'    '}<span className="text-orange-300">res</span>.<span className="text-blue-300">status</span>(<span className="text-red-300">201</span>).<span className="text-blue-300">json</span>({'{'} <span className="text-orange-300">success</span>: <span className="text-red-300">true</span>, <span className="text-orange-300">data</span>: <span className="text-orange-300">user</span> {'}'});{'\n'}
                  {'  '} {'}'} <span className="text-purple-300">catch</span> (<span className="text-orange-300">error</span>) {'{'}{'\n'}
                  {'    '}<span className="text-orange-300">res</span>.<span className="text-blue-300">status</span>(<span className="text-red-300">400</span>).<span className="text-blue-300">json</span>({'{'} <span className="text-orange-300">success</span>: <span className="text-red-300">false</span>, <span className="text-orange-300">error</span>: <span className="text-orange-300">error</span>.<span className="text-orange-300">message</span> {'}'});{'\n'}
                  {'  '}{'}'}{'\n'}
                  {'}'};
                </pre>
              </div>
            </div>
          </div>

        </div>

        {/* --- TECH STACK STANDARDS --- */}
        <div className="py-16 mt-12 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">Generates Production-Grade Code For</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
               
               {/* Item 1: Node.js */}
               <div className="flex flex-col items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/20 transition-all duration-300">
                     <Cpu className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Node.js Runtime</span>
               </div>

               {/* Item 2: MongoDB */}
               <div className="flex flex-col items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                     <Database className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Mongoose Schema</span>
               </div>

               {/* Item 3: Docker */}
               <div className="flex flex-col items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                     <Box className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Docker Ready</span>
               </div>

               {/* Item 4: Security */}
               <div className="flex flex-col items-center gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
                     <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">JWT Security</span>
               </div>

            </div>
          </div>
        </div>

        {/* --- Features Section --- */}
        <div id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Engineered for <span className="text-violet-600">Speed</span></h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">We don't just generate code. We generate code that you would write yourself—if you had perfectly consistent habits and unlimited coffee.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    {/* Glass Card */}
                    <div className="relative h-full p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl shadow-slate-200/50 dark:shadow-black/50 hover:shadow-violet-200/50 transition-all duration-300 hover:-translate-y-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                      
                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- How it Works Section --- */}
        <div id="how-it-works" className="py-24 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-y border-white/50 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white">From Screenshot to Server in <span className="text-blue-600 dark:text-blue-400">3 Steps</span></h2>
                <div className="space-y-6">
                  {[
                    { title: 'Upload Diagram', desc: 'Drag and drop your png/jpg ER diagram.' },
                    { title: 'AI Processing', desc: 'Our OCR and Logic engine maps your entities.' },
                    { title: 'Download Code', desc: 'Get a zip file with Models, Routes, and Controllers.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-300 flex items-center justify-center font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{step.title}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/docs" passHref>
                  <Button variant="link" className="text-violet-600 dark:text-violet-400 p-0 h-auto font-semibold hover:text-violet-800 dark:hover:text-violet-300">
                    Read full documentation <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="flex-1 relative">
                  {/* Visual decoration for the step section */}
                  <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-violet-100 to-blue-100 dark:from-violet-900/20 dark:to-blue-900/20 rounded-full flex items-center justify-center animate-blob">
                     <Database className="w-32 h-32 text-white opacity-50" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white/40 dark:border-slate-800">
                     <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                       <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                         <Check className="w-6 h-6" />
                       </div>
                       <div>
                         <div className="font-bold text-slate-800 dark:text-white">Conversion Complete</div>
                         <div className="text-xs text-slate-500 dark:text-slate-400">Just now</div>
                       </div>
                     </div>
                     <div className="space-y-2">
                        <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full w-full overflow-hidden">
                           <div className="h-full bg-green-500 w-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                           <span>Parsing</span>
                           <span>100%</span>
                        </div>
                     </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Footer --- */}
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                {/* --- Footer Logo --- */}
                <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                  <div className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg group-hover:bg-violet-900 transition-colors">
                    <Waypoints className="w-5 h-5 text-violet-400 group-hover:text-white" />
                  </div>
                  <span className="font-bold text-lg text-white">NodeGraph</span>
                </div>

                <p className="text-sm text-slate-400 mb-6">
                  Accelerating backend development one diagram at a time.
                </p>
                <div className="flex gap-4">
                  <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                  <Twitter className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Integrations</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Changelog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/docs" className="hover:text-violet-400 transition-colors">Documentation</Link></li>
                  <li><Link href="/docs/api-routes" className="hover:text-violet-400 transition-colors">API Reference</Link></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Community</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-violet-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">© 2024 NodeGraph Inc. All rights reserved.</p>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                System Operational
              </div>
            </div>
          </div>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}
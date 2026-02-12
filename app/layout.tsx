import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/auth-context'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

// 1. Separate Viewport Export (Next.js Best Practice)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents zooming issues on mobile inputs
}

// 2. Comprehensive Metadata
export const metadata: Metadata = {
  // --- Basic ---
  applicationName: 'NodeGraph',
  title: {
    default: 'NodeGraph | AI Backend Generator from Diagrams',
    template: '%s | NodeGraph'
  },
  description: 'Transform architecture diagrams into production-ready MERN stack & React Native code instantly. Stop writing boilerplate—upload your schema and deploy.',
  
  // --- Search Engine Optimization (SEO) ---
  keywords: [
    // Core Functionality
    'AI Backend Generator',
    'Diagram to Code',
    'Image to API',
    'System Architecture Generator',
    
    // Tech Stack
    'MERN Stack Builder',
    'Node.js Boilerplate',
    'Express.js API Generator',
    'MongoDB Schema Automation',
    'React Native Scaffold',
    
    // User Intent
    'Rapid Prototyping',
    'No-code Backend',
    'Low-code Development',
    'Developer Tools',
    'SaaS Boilerplate',
    'API Automation'
  ],
  authors: [{ name: 'Abhishek Gohel', url: 'https://github.com/yourusername' }], // Replace with your actual GitHub if you want
  creator: 'NodeGraph Team',
  publisher: 'NodeGraph Inc.',
  category: 'technology',
  
  // --- Canonical URL (Prevents Duplicate Content Issues) ---
  metadataBase: new URL('https://node-graph-front-end.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },

  // --- Social Media Previews (Open Graph) ---
  openGraph: {
    title: 'NodeGraph - Instant Backend from Diagrams',
    description: 'Don\'t code from scratch. Upload your ER diagram or whiteboard sketch and get a full Node.js/MongoDB backend in seconds.',
    url: 'https://node-graph-front-end.vercel.app',
    siteName: 'NodeGraph',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png', // Ensure you add an image at public/og-image.png
        width: 1200,
        height: 630,
        alt: 'NodeGraph Dashboard Preview',
      },
    ],
  },

  // --- Twitter / X Cards ---
  twitter: {
    card: 'summary_large_image',
    title: 'NodeGraph | Visual to Code',
    description: 'Upload diagrams, get code. The fastest way to build MERN backends.',
    creator: '@your_twitter_handle', // Optional
    images: ['/og-image.png'],
  },

  // --- Robots (Crawling) ---
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // --- App Icons ---
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // --- PWA Manifest ---
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
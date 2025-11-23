import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Providers from './providers';
import { Header } from '../components/Header';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Icons } from '../components/Icons';
import './globals.css';

// Optimize Fonts with next/font
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Axiom Pulse Replica',
  description: 'High-performance token discovery dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* DNS Prefetch for DiceBear API */}
        <link rel="dns-prefetch" href="https://api.dicebear.com" />
      </head>
      <body className="h-screen bg-background flex flex-col text-textMain font-sans antialiased selection:bg-accent/30 overflow-hidden">
        <ErrorBoundary>
            <Providers>
                <Header />
                <main className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
                    {children}
                </main>
                
                {/* Global Status Bar Footer */}
                <div className="h-8 bg-[#0e1014] border-t border-[#1e2128] flex items-center justify-between px-4 text-[10px] font-mono text-textMuted shrink-0 z-50">
                   <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400">
                            <Icons.Filter size={10} />
                            <span>PRESET 1</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                            <Icons.Wallet size={12} />
                            <span>Wallet</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                            <Icons.Twitter size={12} />
                            <span>Twitter</span>
                        </div>
                   </div>
                   
                   <div className="hidden md:flex items-center gap-6">
                       <span className="text-orange-400 flex items-center gap-1"><Icons.Solana className="w-3 h-3"/> $86.0K</span>
                       <span className="text-blue-400">$2,815</span>
                       <span className="text-green-500">$129.62</span>
                   </div>

                   <div className="flex items-center gap-2">
                       <div className="flex items-center gap-1 text-green-500">
                           <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                           <span className="hidden sm:inline">Connection Stable</span>
                       </div>
                       <span className="uppercase text-[#1e2128]">|</span>
                       <span className="uppercase text-xs font-bold text-gray-500">v1.0.4</span>
                   </div>
               </div>
            </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
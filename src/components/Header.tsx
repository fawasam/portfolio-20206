"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Dynamic Label based on pathname
  const getLabel = () => {
    if (pathname === '/') return 'Systems_Designer';
    if (pathname === '/about') return 'About_Identity';
    if (pathname === '/projects') return 'Work_Archive';
    if (pathname === '/experience') return 'Profession_Orbit';
    if (pathname.startsWith('/projects/')) return 'Project_Context';
    return 'System_Node';
  };

  const menuItems = [
    { label: 'Work', href: '/projects', id: '01' },
    { label: 'Experience', href: '/experience', id: '02' },
    { label: 'About', href: '/about', id: '03' },
    { label: 'Archive', href: '#', id: '04' }
  ];

  const gridLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 z-[1000] flex justify-between items-baseline mix-blend-difference text-white backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
          <Link href="/">
            <span className="font-black tracking-tighter text-3xl md:text-5xl uppercase leading-none block">fawas</span>
          </Link>
          {!isMenuOpen && (
            <div className="hidden sm:flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
                 {getLabel()}
               </span>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-6 md:gap-10">
          <ul className="hidden lg:flex items-center gap-16 text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">
             {menuItems.map(item => (
                <li key={item.label} className={`hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00] ${pathname === item.href ? 'text-[#ff4d00] opacity-100' : ''}`}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
             ))}
          </ul>
          
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={toggleTheme} 
              className="hidden lg:block text-[10px] uppercase tracking-[0.3em] font-bold border-b-2 border-white pb-1 cursor-pointer hover:text-[#ff4d00] hover:border-[#ff4d00] transition-all"
            >
              {isDark ? 'LIGHT' : 'DARK'}
            </button>
            <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)}
               className="lg:hidden text-[10px] uppercase tracking-[0.4em] font-black flex items-center gap-4 group"
            >
               <span className="opacity-60 group-hover:opacity-100 transition-opacity">{isMenuOpen ? 'CLOSE' : 'MENU'}</span>
               <div className="grid grid-cols-2 gap-1 w-4 h-4 translate-y-[2px]">
                  {[0,1,2,3].map(i => (
                    <div key={i} className={`w-full h-full border ${isMenuOpen && i % 2 === 0 ? 'bg-[#ff4d00] border-[#ff4d00]' : 'border-white'} transition-all`} />
                  ))}
               </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 w-full h-screen bg-background/95 backdrop-blur-2xl z-[900] lg:hidden border-l border-grid-line overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <line x1="33%" x2="33%" y1="0" y2="100%" stroke={gridLine} />
                  <line x1="66%" x2="66%" y1="0" y2="100%" stroke={gridLine} />
                  <line x1="0" x2="100%" y1="33%" y2="33%" stroke={gridLine} />
                  <line x1="0" x2="100%" y1="66%" y2="66%" stroke={gridLine} />
                </svg>
            </div>

            <div className="mt-40 px-8 flex flex-col gap-2 relative text-foreground">
                <div className="flex flex-col gap-6 pt-12 border-b-2 border-foreground/10 pb-10 relative">
                  <h2 className="text-7xl font-black tracking-tighter uppercase leading-none">FAWAS</h2>
                  <div className="flex justify-between items-center w-full">
                      <div className="technical-label flex items-center gap-4 text-[#ff4d00] animate-pulse">
                        <span className="w-2 h-2 rounded-full bg-current" />
                        <span>SYSTEM_ACCESS_GRANTED</span>
                      </div>
                      <button 
                      onClick={toggleTheme} 
                      className="text-[10px] tracking-[0.5em] font-black border-b-2 border-[#ff4d00] text-[#ff4d00] pb-1"
                      >
                        {isDark ? 'LIGHT' : 'DARK'}
                      </button>
                  </div>
                </div>

                <nav className="flex flex-col gap-6 mt-8">
                  {menuItems.map((item, i) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + (i * 0.1) }}
                          className="flex items-baseline gap-6 group"
                        >
                          <span className="font-mono text-xs opacity-20 group-hover:opacity-100 transition-opacity">{item.id}</span>
                          <span className={`text-5xl font-black tracking-tighter uppercase group-hover:text-[#ff4d00] transition-colors ${pathname === item.href ? 'text-[#ff4d00]' : ''}`}>
                            {item.label}
                          </span>
                        </motion.div>
                    </Link>
                  ))}
                </nav>

                <div className="mt-20 flex flex-col gap-6">
                  <div className="flex items-center gap-4 opacity-10">
                      <span className="w-12 h-[1px] bg-foreground" />
                      <span className="symbol text-2xl">+</span>
                      <span className="flex-1 h-[1px] bg-foreground" />
                  </div>
                  <div className="technical-label !text-[8px] opacity-20 flex justify-between w-full font-mono">
                      <span>USER_ID: // 0xFAW_IDENTITY</span>
                      <span>STATUS: ENCRYPTED_NOMINAL</span>
                  </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

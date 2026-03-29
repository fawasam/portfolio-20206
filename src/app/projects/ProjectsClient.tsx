"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "PRJ_001",
    num: "01",
    title: "THE_LAUNDRY_HUB",
    category: "LOGISTICS_SYSTEMS",
    stack: "NEXT.JS / EXPRESS / MONGO",
    tags: ["DXB", "SHJ", "AUH"],
    desc: "Real-time logistical ecosystem for premium laundry services across UAE."
  },
  {
    id: "PRJ_002",
    num: "02",
    title: "MUTHOOT_CAPITAL",
    category: "FINANCIAL_NODES",
    stack: "NEXT.JS / STRAPI / DOCKER",
    tags: ["FIN_TECH", "LOANS", "FD"],
    desc: "Enterprise-grade financial platform for secure payments and fixed deposits."
  },
  {
    id: "PRJ_003",
    num: "03",
    title: "DEWTON_INDIA",
    category: "VISUAL_COMMERCE",
    stack: "NEXT.JS / STRAPI / AWS",
    tags: ["AMPLIFY", "SEO", "EC2", "CI/CD"],
    desc: "Premium lighting commerce platform with optimized AWS infrastructure."
  },
  {
    id: "PRJ_004",
    num: "04",
    title: "SOUTH_INDIAN_CREDITS",
    category: "FINANCIAL_SYSTEMS",
    stack: "NEXT.JS / STRAPI / AWS",
    tags: ["NBFC", "EC2", "CREDIT_HUB", "SEO"],
    desc: "Digital heritage transformation for a multi-decade NBFC."
  },
  {
    id: "PRJ_005",
    num: "05",
    title: "LULU_TECH_PARK",
    category: "IT_INFRASTRUCTURE",
    stack: "NEXT.JS / STRAPI / AWS",
    tags: ["SMART_CITY", "EC2", "SPATIAL_WEB", "SEO"],
    desc: "World-class IT park manifest and spatial digital architecture."
  },
  {
    id: "PRJ_006",
    num: "06",
    title: "U_SPHERE",
    category: "CREATIVE_LOGIC",
    stack: "NEXT.JS / THREE.JS / GSAP",
    tags: ["HAPTICS", "3D_WEB", "EC2", "SEO"],
    desc: "Immersive 3D branding and future-proof digital architecture."
  },
  {
    id: "PRJ_007",
    num: "07",
    title: "AKORE_FORMULATIONS",
    category: "BIOTECH_UX",
    stack: "NEXT.JS / STRAPI / AWS",
    tags: ["TOPICAL", "EC2", "ANIMATIONS", "SEO"],
    desc: "High-performance scientific lab digital experience."
  },
  {
    id: "PRJ_008",
    num: "08",
    title: "MORGAN_FUELS",
    category: "ENERGY_LOGISTICS",
    stack: "NEXT.JS / STRAPI / AWS",
    tags: ["FUEL_CARDS", "EC2", "LOGISTICS", "SEO"],
    desc: "Scale-driven European fuel network commerce platform."
  },
  {
    id: "PRJ_009",
    num: "09",
    title: "TALKIYO",
    category: "COMMUNICATION_SYSTEMS",
    stack: "NODE.JS / SOCKET.IO / AWS_ECS",
    tags: ["REDIS", "ECS", "SONARQUBE", "CI/CD"],
    desc: "High-concurrency real-time conversation mesh architecture."
  },
  {
    id: "PRJ_010",
    num: "10",
    title: "ARIKIL_NETWORKS",
    category: "WELLNESS_SYSTEMS",
    stack: "NODE.JS / AGORA / AWS_ECS",
    tags: ["CHAT", "REDIS", "VOICE", "REAL_TIME"],
    desc: "Confidential real-time wellness and care communication mesh."
  },
  {
    id: "PRJ_011",
    num: "11",
    title: "REDIS_GUI",
    category: "PERSONAL_PROJECT",
    stack: "NEXT.JS / TYPESCRIPT / VERCEL",
    tags: ["REDIS", "GUI", "VERCEL", "SEO"],
    desc: "A high-performance visual interface for real-time Redis data orchestration."
  },
  {
    id: "PRJ_012",
    num: "12",
    title: "MARKAZ_KNOWLEDGE_CITY",
    category: "SPATIAL_ARCHITECTURE",
    stack: "NEXT.JS / PHP / MYSQL",
    tags: ["CALICUT", "EDUCATION", "SPATIAL", "SEO"],
    desc: "A high-fidelity digital manifest for India's premier 125-acre knowledge ecosystem."
  },
  {
    id: "PRJ_013",
    num: "13",
    title: "TRAVZ_CAR_RENTAL",
    category: "LOGISTICS_WEB",
    stack: "NEXT.JS / TYPESCRIPT / EC2",
    tags: ["GCC", "MULTILINGUAL", "RENTAL", "CURRENCY"],
    desc: "A high-fidelity GCC-wide car rental engine with seamless multi-dimensional currency and language support."
  },
  {
    id: "PRJ_014",
    num: "14",
    title: "MY_DEGREE",
    category: "ACADEMIC_PORTAL",
    stack: "NEXT.JS / NODE.JS / MONGODB",
    tags: ["EDUCATION", "PORTAL", "VERCEL", "MERN"],
    desc: "A streamlined academic management ecosystem for real-time degree tracking and student orchestration."
  },
  {
    id: "PRJ_015",
    num: "15",
    title: "KEY2_CONTENT",
    category: "CREATIVE_AGENCY",
    stack: "HTML / CSS / JS / PHP",
    tags: ["BRANDING", "CREATIVE", "JS", "PHP"],
    desc: "A premium visual branding platform for high-fidelity content production and digital storytelling."
  },
  {
    id: "PRJ_016",
    num: "16",
    title: "SHOE_STORE_STALL",
    category: "COMMERCE_ARCHITECTURE",
    stack: "REACT / NODE.JS / MONGODB",
    tags: ["E-COMMERCE", "RETAIL", "MERN", "VERCEL"],
    desc: "A high-performance e-commerce engine for streamlined retail footwear orchestration and transactional integrity."
  }
];

import { useTheme } from "@/context/ThemeContext";

export default function ProjectsListing() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const gridLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";

  return (
    <main className="min-h-screen relative font-sans transition-colors duration-700 bg-background text-foreground" ref={containerRef}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 z-[200] flex justify-between items-baseline mix-blend-difference text-white">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
           <Link href="/" className="font-black tracking-tighter text-xl md:text-2xl uppercase leading-none block">FAWAS</Link>
           {!isMenuOpen && (
             <div className="hidden sm:flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#ff4d00]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Systems_Archive</span>
             </div>
           )}
        </div>

        <nav className="flex items-center gap-6 md:gap-10">
          <ul className="hidden lg:flex items-center gap-16 text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">
             <li className="text-[#ff4d00] opacity-100 cursor-default">Work</li>
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">
               <Link href="/experience">Experience</Link>
             </li>
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">
               <Link href="/about">About</Link>
             </li>
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">Archive</li>
          </ul>
          
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={toggleTheme} 
              className="hidden lg:block text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold border-b-2 border-white pb-1"
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
      <motion.div 
         initial={false}
         animate={{ x: isMenuOpen ? 0 : '100%' }}
         transition={{ type: "spring", damping: 30, stiffness: 200 }}
         className="fixed top-0 right-0 w-full h-screen bg-background/95 backdrop-blur-2xl z-[150] lg:hidden border-l border-grid-line overflow-hidden flex flex-col"
      >
         <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
               <line x1="33%" x2="33%" y1="0" y2="100%" stroke={gridLine} />
               <line x1="66%" x2="66%" y1="0" y2="100%" stroke={gridLine} />
               <line x1="0" x2="100%" y1="33%" y2="33%" stroke={gridLine} />
               <line x1="0" x2="100%" y1="66%" y2="66%" stroke={gridLine} />
            </svg>
         </div>

         <div className="mt-40 px-8 flex flex-col gap-2 relative text-foreground inter-font">
            <div className="flex flex-col gap-6 pt-12 border-b-2 border-foreground/10 pb-10 relative">
               <h2 className="text-7xl font-black tracking-tighter uppercase leading-none">FAWAS</h2>
               <div className="flex justify-between items-center w-full">
                  <div className="technical-label flex items-center gap-4 text-[#ff4d00] animate-pulse">
                     <span className="w-2 h-2 rounded-full bg-current" />
                     <span>SYSTEMS_ARCHIVE_ACTIVE</span>
                  </div>
                  <button 
                   onClick={toggleTheme} 
                   className="text-[10px] tracking-[0.5em] font-black border-b-2 border-[#ff4d00] text-[#ff4d00] pb-1"
                  >
                    {isDark ? 'LIGHT' : 'DARK'}
                  </button>
               </div>
            </div>

            <div className="relative py-12 flex flex-col gap-4">
               <div className="absolute top-0 left-[-32px] w-[150%] h-[1px] bg-foreground/10 overflow-visible flex items-center px-8">
                  <div className="w-3 h-3 rotate-45 bg-[#ff4d00] shadow-[0_0_10px_#ff4d00] mr-6" />
                  <span className="technical-label !text-[8px] tracking-[0.5em] opacity-40">SYSTEM_INITIALIZED_00.2</span>
               </div>

               <nav className="flex flex-col gap-6 mt-8">
                  {[
                    { label: 'WORK', href: '/projects', id: '01' },
                    { label: 'EXPERIENCE', href: '/experience', id: '02' },
                    { label: 'ABOUT', href: '/about', id: '03' },
                    { label: 'ARCHIVE', href: '#', id: '04' }
                  ].map((item, i) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                       <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-baseline gap-6 group"
                       >
                          <span className="font-mono text-xs opacity-20 group-hover:opacity-100 transition-opacity">{item.id}</span>
                          <span className={`text-5xl font-black tracking-tighter uppercase group-hover:text-[#ff4d00] transition-colors ${item.label === 'WORK' ? 'text-[#ff4d00]' : ''}`}>{item.label}</span>
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
                     <span>ENCRYPTED_ID: // FW_26_ARCHIVE</span>
                     <span>VERIFICATION: NOMINAL</span>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>

      {/* Projects Title Branding */}
      <section className="pt-28 md:pt-48 px-6 md:px-24">
         <div className="flex flex-col gap-4 md:gap-6 max-w-4xl">
            <div className="technical-label flex items-center gap-4">
               <span className="symbol animate-pulse text-accent">✦</span>
               <span>SYSTEM_ARCHIVE_MANIFEST_v0.1</span>
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-[14vw] font-black tracking-tighter uppercase leading-[0.8] mb-6 md:mb-12">
               Systems.<br /><span className="text-accent">Archive.</span>
            </h1>
         </div>
      </section>

      {/* Projects Grid/List Layout */}
      <section className="px-6 md:px-24 pb-24 md:pb-48 grid grid-cols-1 gap-1 border-t border-grid-line mt-6 md:mt-12">
         {PROJECTS.map((proj) => (
            <Link key={proj.id} href={`/projects/${proj.id}`} className="group border-b border-grid-line block">
               <motion.div 
                 whileHover={{ x: 20 }}
                 className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 py-10 md:py-20 items-center transition-all duration-700 relative"
               >
                  <div className="lg:col-span-1">
                     <span className="font-mono text-2xl md:text-4xl opacity-10 font-bold group-hover:opacity-100 group-hover:text-accent transition-all duration-700">
                       {proj.num}
                     </span>
                  </div>
                  
                  <div className="lg:col-span-5 space-y-2 md:space-y-4">
                     <div className="technical-label !text-[8px] md:!text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">
                       {proj.category} {"//"} {proj.id}
                     </div>
                     <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-700 truncate max-w-full">
                        {proj.title}
                     </h2>
                  </div>

                  <div className="lg:col-span-4 space-y-3 md:space-y-4">
                     <p className="opacity-40 text-sm md:text-lg leading-tight uppercase font-medium max-w-sm group-hover:opacity-80 transition-opacity">
                        {proj.desc}
                     </p>
                     <div className="flex flex-wrap gap-2 pt-1 md:pt-4">
                        {proj.tags.map(tag => (
                          <span key={tag} className="text-[9px] md:text-[10px] font-mono border border-grid-line px-3 py-1 opacity-40 hover:border-accent hover:opacity-100 transition-all">
                             {tag}
                          </span>
                        ))}
                     </div>
                  </div>

                  <div className="lg:col-span-2 text-right hidden lg:block">
                     <div className="technical-label opacity-30 group-hover:opacity-100 mb-2">SYSTEM_CORE</div>
                     <div className="font-mono text-[10px] font-bold tracking-widest leading-relaxed">
                        {proj.stack.split(' / ').map(tech => (
                          <div key={tech}>{tech}</div>
                        ))}
                     </div>
                  </div>

                  {/* Corner Visual Detail */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 lg:top-0 lg:translate-y-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     <span className="symbol text-accent text-2xl md:text-3xl">→</span>
                  </div>
               </motion.div>
            </Link>
         ))}
      </section>

      {/* Final Tactical Note */}
      <footer className="px-6 md:px-24 py-12 flex justify-between border-t border-grid-line mt-12 md:mt-24">
         <div className="technical-label opacity-30 !text-[8px]">
            DOCUMENTATION_ID: ARCHIVE_INDEX_00
         </div>
         <div className="technical-label opacity-30 !text-[8px] text-right">
            TIMESTAMP: {mounted ? new Date().toISOString() : "0000-00-00T00:00:00Z"}
         </div>
      </footer>

    </main>
  );
}

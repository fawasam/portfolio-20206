"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ExperiencePage() {
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = globalThis.document?.documentElement;
    if (root) {
      root.dataset.theme = isDark ? 'dark' : 'light';
    }

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isDark, isMenuOpen]);

  const gridLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const markerBg = isDark ? "#111" : "#fff";
  const markerStroke = isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)";
  const crosshairStroke = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";

  return (
    <main className="min-h-screen relative font-sans transition-colors duration-700 bg-background text-foreground" ref={containerRef}>
      
      {/* Background Grid Decoration */}
      <div className="bg-pattern fixed inset-0 -z-1 pointer-events-none opacity-100">
        <svg className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1728 958" preserveAspectRatio="xMidYMid slice">
          <line x1="432" x2="432" y2="958" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="864" x2="864" y2="958" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="1296" x2="1296" y2="958" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="0" y1="319" x2="1728" y2="319" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="0" y1="638" x2="1728" y2="638" stroke={gridLine} fill="none" strokeWidth="1"></line>
          
          {[432, 864, 1296].flatMap(x => [319, 638].map(y => (
            <g key={`d-${x}-${y}`}>
              <rect x={x - 10} y={y - 10} width="20" height="20" fill={markerBg} stroke={markerStroke}></rect>
              <line x1={x} y1={y-4} x2={x} y2={y+4} stroke={crosshairStroke} fill="none"></line>
              <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={crosshairStroke} fill="none"></line>
            </g>
          )))}
        </svg>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 z-[200] flex justify-between items-baseline mix-blend-difference text-white">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
          <Link href="/">
            <span className="font-black tracking-tighter text-3xl md:text-5xl uppercase leading-none block">FAWAS</span>
          </Link>
          {!isMenuOpen && (
            <div className="hidden sm:flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Systems_Experience</span>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-6 md:gap-10">
          <ul className="hidden lg:flex items-center gap-16 text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">
               <Link href="/projects">Work</Link>
             </li>
             <li className="text-[#ff4d00] opacity-100 cursor-default">Experience</li>
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">Archive</li>
          </ul>
          
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={() => setIsDark(!isDark)} 
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
      <motion.div 
         initial={false}
         animate={{ x: isMenuOpen ? 0 : '100%' }}
         transition={{ type: "spring", damping: 30, stiffness: 200 }}
         className="fixed top-0 right-0 w-full h-screen bg-background/95 backdrop-blur-2xl z-[150] lg:hidden border-l border-grid-line overflow-hidden flex flex-col"
      >
         <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none">
            {/* Visual Decorative Grid */}
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
                     <span>SYSTEMS_DESIGNER_ACTIVE</span>
                  </div>
                  <button 
                   onClick={() => setIsDark(!isDark)} 
                   className="text-[10px] tracking-[0.5em] font-black border-b-2 border-[#ff4d00] text-[#ff4d00] pb-1"
                  >
                    {isDark ? 'LIGHT' : 'DARK'}
                  </button>
               </div>
            </div>

            <div className="relative py-12 flex flex-col gap-4">
               {/* Section Line as seen in image */}
               <div className="absolute top-0 left-[-32px] w-[150%] h-[1px] bg-foreground/10 overflow-visible flex items-center px-8">
                  <div className="w-3 h-3 rotate-45 bg-[#ff4d00] shadow-[0_0_10px_#ff4d00] mr-6" />
                  <span className="technical-label !text-[8px] tracking-[0.5em] opacity-40">SYSTEM_INITIALIZED_00.2</span>
               </div>

               <nav className="flex flex-col gap-6 mt-8">
                  {[
                    { label: 'WORK', href: '/projects', id: '01' },
                    { label: 'EXPERIENCE', href: '/experience', id: '02' },
                    { label: 'ARCHIVE', href: '#', id: '03' }
                  ].map((item, i) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                       <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-baseline gap-6 group"
                       >
                          <span className="font-mono text-xs opacity-20 group-hover:opacity-100 transition-opacity">{item.id}</span>
                          <span className="text-5xl font-black tracking-tighter uppercase group-hover:text-[#ff4d00] transition-colors">{item.label}</span>
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
                     <span>ENCRYPTED_ID: // FW_26_01</span>
                     <span>VERIFICATION: NOMINAL</span>
                  </div>
               </div>
            </div>
         </div>
         
         <div className="mt-auto p-8 opacity-20 text-[7px] tracking-[0.4em] font-mono leading-relaxed text-foreground">
            SYSTEMS ARCHITECT CORE // ALL RIGHTS RESERVED. <br />
            INITIALIZING LOGICAL INTERFACE PORT 8080.
         </div>
      </motion.div>

      {/* Hero: Experience Manifest */}
      <section className="pt-48 px-6 md:px-24">
         <div className="flex flex-col gap-6 max-w-4xl">
            <div className="technical-label flex items-center gap-4">
               <span className="symbol animate-pulse text-accent">✦</span>
               <span>SYSTEM_HISTORY_MANIFEST_v0.1</span>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-[14vw] font-black tracking-tighter uppercase leading-[0.8] mb-12">
               Experience.<br /><span className="text-accent underline decoration-4 md:decoration-8 underline-offset-8">Report.</span>
            </h1>
         </div>
      </section>

      {/* Engineering Experience: OPERATIONAL_HISTORY */}
      <section className="px-6 md:px-24 py-32 border-t border-grid-line bg-foreground/5 dark:bg-white/5">
           <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-20 md:gap-32"
           >
              <div className="flex flex-col gap-6">
                 <div className="technical-label flex items-center gap-4">
                    <span className="symbol text-accent">✦</span>
                    <span>LOG_EXPERIENCE_v0.1</span>
                 </div>
                 <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                    Engineering.<br /><span className="text-accent underline decoration-4 underline-offset-8">Experience.</span>
                 </h2>
              </div>

              <div className="grid grid-cols-1 gap-12 md:gap-24">
                 {[
                   {
                     role: "Software Developer/Engineer (Team Lead)",
                     company: "Webcastle Media Pvt Ltd",
                     location: "Kochi, India",
                     date: "July 2024 – Present",
                     points: [
                       "Led design & delivery of 15+ web application, collaborating directly with clients to define scope and ensure alignment from design to deployment.",
                       "Contributed to a 20% increase in website traffic and user engagement through optimized UI/UX design and responsive development.",
                       "Managed 5-member Agile team—sprint planning, code reviews & stand-ups—ensuring on-time, high-quality releases."
                     ]
                   },
                   {
                     role: "Software Developer - UI/UX Designer",
                     company: "Markaz Knowledge City, Calicut",
                     location: "Adivaram, India",
                     date: "March 2022 – Aug 2022",
                     points: [
                       "Led the complete overhaul and ongoing management of the company’s website, taking full responsibility for its design, development, content, and performance.",
                       "Coordinated cross-functional teams and stakeholders to ensure seamless project execution, resource allocation, and timely delivery of milestones."
                     ]
                   },
                   {
                     role: "Fullstack Developer Intern",
                     company: "FireFlies - Eranakulam",
                     location: "Eranakulam, India",
                     date: "Jan 2022 – March 2022",
                     points: [
                       "Designed and developed responsive web applications, learning web development skills and overall project structure."
                     ]
                   }
                 ].map((exp, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-l-2 border-grid-line pl-8 hover:border-accent transition-colors duration-500 group"
                   >
                     <div className="lg:col-span-1">
                        <span className="font-mono text-xl opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all">0{idx + 1}</span>
                     </div>
                     <div className="lg:col-span-5 flex flex-col gap-2">
                        <div className="technical-label opacity-40 uppercase text-[9px]">POSITION_NODE</div>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase leading-none">{exp.role}</h3>
                        <span className="text-accent font-bold uppercase tracking-widest text-[10px] md:text-xs">{exp.company}</span>
                     </div>
                     <div className="lg:col-span-6 space-y-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pb-6 border-b border-grid-line">
                           <div className="flex items-center gap-2 technical-label opacity-40 !text-[8px]">
                              <span>LOC: {exp.location}</span>
                           </div>
                           <div className="technical-label !text-[8px] bg-accent/10 px-2 py-0.5 text-accent">{exp.date}</div>
                        </div>
                        <ul className="space-y-4">
                           {exp.points.map((p, pidx) => (
                             <li key={pidx} className="flex gap-4 group/li">
                                <span className="symbol text-accent opacity-20 group-hover/li:opacity-100 group-hover/li:translate-x-1 transition-all">→</span>
                                <p className="opacity-60 text-sm md:text-base leading-relaxed tracking-tight group-hover/li:opacity-100 transition-opacity">{p}</p>
                             </li>
                           ))}
                        </ul>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* Additional Experience: ADAPTIVE_HISTORY */}
        <section className="px-6 md:px-24 py-32 border-t border-grid-line relative overflow-hidden">
           <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-col gap-20 md:gap-32"
           >
              <div className="flex flex-col gap-6">
                 <div className="technical-label flex items-center gap-4">
                    <span className="symbol text-accent">✦</span>
                    <span>LOG_ADDITIONAL_v0.1</span>
                 </div>
                 <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                    Additional.<br /><span className="text-foreground/40 underline decoration-4 underline-offset-8 decoration-accent">Experience.</span>
                 </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                 {[
                   {
                     role: "Volunteer Coordinator",
                     org: "Half Marathon - IIM Calicut",
                     location: "Kunnamangalam, India",
                     date: "Aug 2025",
                     desc: "Led and managed a team of approximately 40 volunteers for a major one-day public marathon event, ensuring effective coordination and logistics."
                   },
                   {
                     role: "Student Coordinator",
                     org: "Tinkerhub - MARM College",
                     location: "Kozhikode, India",
                     date: "Sep 2023",
                     desc: "Orchestrated a large-scale student outreach program, successfully engaging over 100 students in various technical workshops and innovation events."
                   },
                   {
                     role: "Volunteer Captain",
                     org: "Kerala Literature Festival",
                     location: "Calicut, India",
                     date: "Sep 2024",
                     desc: "Provided essential event support and logistical assistance for a prominent cultural festival, interacting with authors, attendees, and organizers."
                   },
                   {
                     role: "Volunteer Service",
                     org: "Pain and Palliative Care",
                     location: "Mukkom, India",
                     date: "2019 - 2024",
                     desc: "Demonstrated strong community engagement and support skills by actively participating in palliative care initiatives, assisting patients and their families."
                   }
                 ].map((exp, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="group relative pt-12 border-t border-grid-line hover:border-accent transition-all duration-500"
                   >
                     <div className="absolute top-4 left-0 technical-label opacity-20 !text-[8px] group-hover:opacity-100 group-hover:text-accent transition-all">
                        MODULE_ADPT_{idx + 1}
                     </div>
                     <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                           <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-accent transition-colors">{exp.role}</h3>
                           <span className="text-[10px] font-mono font-bold opacity-40 uppercase tracking-widest leading-none">{exp.org}</span>
                        </div>
                        <div className="text-right">
                           <div className="technical-label !text-[8px] opacity-30 mb-1">{exp.date}</div>
                           <div className="technical-label !text-[7px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">VERIFIED</div>
                        </div>
                     </div>
                     <p className="opacity-50 text-xs md:text-sm leading-relaxed max-w-lg mb-8 group-hover:opacity-80 transition-opacity">
                        {exp.desc}
                     </p>
                     <div className="flex items-center gap-3 technical-label !text-[8px] opacity-20">
                        <span className="symbol">⟁</span>
                        <span>{exp.location}</span>
                     </div>
                   </motion.div>
                 ))}
              </div>
           </motion.div>
        </section>

        {/* Final Action / Return */}
        <footer className="px-6 md:px-24 py-12 flex justify-between items-center border-t border-grid-line mt-24">
           <Link href="/" className="flex items-center gap-6 group">
              <span className="symbol text-accent group-hover:-translate-x-2 transition-transform duration-300">←</span>
              <span className="font-black text-xs uppercase tracking-[0.4em]">Return_to_Systems</span>
           </Link>
           <div className="technical-label !text-[8px] opacity-30 text-right">
              TIMESTAMP: {new Date().toISOString()}<br />
              LOG_LEVEL: SYSTEM_VERIFIED
           </div>
        </footer>

    </main>
  );
}

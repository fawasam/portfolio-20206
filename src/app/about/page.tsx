"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Award, User, Target, Zap } from "lucide-react";

import { useTheme } from "@/context/ThemeContext";

export default function AboutPage() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const gridLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const crosshairStroke = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";

  const contactNodes = [
    { label: "EMAIL", value: "fawasam32@gmail.com", icon: Mail, ref: "EP-LINK-01" },
    { label: "PHONE", value: "+91 9645885706", icon: Phone, ref: "EP-LINK-02" },
    { label: "LOCATION", value: "Calicut, India", icon: MapPin, ref: "EP-LINK-03" },
    { label: "WEBSITE", value: "fawasam.me", icon: Globe, ref: "EP-LINK-04" },
  ];

  const socialLinks = [
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/fawas-am/", icon: User },
    { label: "GITHUB", href: "https://github.com/fawasam", icon: User },
  ];

  const certifications = [
    { title: "Introduction to DevOps", issuer: "Great Learning Platform", id: "CERT_DV_001" },
    { title: "Introduction to Artificial Intelligence", issuer: "LinkedIn", id: "CERT_AI_002" },
    { title: "Full Stack Development", issuer: "Professional Training", id: "CERT_FS_003" },
  ];

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
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">About_Identity</span>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-6 md:gap-10">
          <ul className="hidden lg:flex items-center gap-16 text-[10px] uppercase tracking-[0.4em] font-medium opacity-60">
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">
               <Link href="/projects">Work</Link>
             </li>
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">
                <Link href="/experience">Experience</Link>
             </li>
             <li className="text-[#ff4d00] opacity-100 cursor-default">About</li>
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
      <motion.div 
         initial={false}
         animate={{ x: isMenuOpen ? 0 : '100%' }}
         transition={{ type: "spring", damping: 30, stiffness: 200 }}
         className="fixed top-0 right-0 w-full h-screen bg-background/95 backdrop-blur-2xl z-[150] lg:hidden border-l border-grid-line overflow-hidden flex flex-col"
      >
         {/* ... (sidebar content same as other pages) */}
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
                     <span>SYSTEMS_DESIGNER_ACTIVE</span>
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
               <nav className="flex flex-col gap-6 mt-8">
                  {[
                    { label: 'WORK', href: '/projects', id: '01' },
                    { label: 'EXPERIENCE', href: '/experience', id: '02' },
                    { label: 'ABOUT', href: '/about', id: '03' }
                  ].map((item, i) => (
                    <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                       <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: isMenuOpen ? 1 : 0, x: isMenuOpen ? 0 : 20 }}
                        transition={{ delay: 0.2 + (i * 0.1) }}
                        className="flex items-baseline gap-6 group"
                       >
                          <span className="font-mono text-xs opacity-20 group-hover:opacity-100 transition-opacity">{item.id}</span>
                          <span className={`text-5xl font-black tracking-tighter uppercase group-hover:text-[#ff4d00] transition-colors ${item.href === '/about' ? 'text-[#ff4d00]' : ''}`}>{item.label}</span>
                       </motion.div>
                    </Link>
                  ))}
               </nav>
            </div>
         </div>
      </motion.div>

      {/* About Content */}
      <section className="pt-48 px-6 md:px-24 pb-32">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Bio & Intro */}
            <div className="lg:col-span-8 flex flex-col gap-12">
               <div className="flex flex-col gap-4">
                  <div className="technical-label flex items-center gap-4">
                     <span className="symbol animate-pulse text-accent">✦</span>
                     <span>IDENTITY_SEQUENCE_v2.0</span>
                  </div>
                  <h1 className="text-6xl sm:text-8xl md:text-[12vw] font-[900] tracking-tighter uppercase leading-[0.8]">
                    About.<br /><span className="text-accent underline decoration-4 md:decoration-8 underline-offset-12">Fawasam.</span>
                  </h1>
               </div>

               <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
                  <div className="relative w-full md:w-[400px] aspect-[4/5] border border-grid-line p-2 group overflow-hidden">
                     <Image 
                        src="/assets/fawasam_portrait.jpg" 
                        alt="Fawasam Portrait" 
                        fill
                        className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                        priority
                     />
                     <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/50 transition-all duration-500 pointer-events-none" />
                  </div>
                  <div className="flex-1 space-y-8">
                     <div className="space-y-4">
                        <span className="technical-label opacity-40">ROLE_CLASSIFICATION</span>
                        <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                           Software Engineer & Developer<br />
                           <span className="text-accent">UI/UX Designer | Mentor</span>
                        </h2>
                     </div>
                     <p className="text-xl md:text-2xl leading-relaxed font-medium opacity-70 tracking-tight">
                        Based in Calicut, India, I specialize in architecting synchronous digital experiences 
                        that bridge the gap between complex logic and intuitive human interaction.
                     </p>
                     <div className="grid grid-cols-2 gap-8 pt-8 border-t border-grid-line">
                        <div className="flex flex-col gap-2">
                           <span className="technical-label !text-[8px] opacity-40">OPERATIONAL_FOCUS</span>
                           <span className="font-mono text-[10px] font-black uppercase tracking-widest">Full-Stack Architecture</span>
                        </div>
                        <div className="flex flex-col gap-2">
                           <span className="technical-label !text-[8px] opacity-40">COMMUNITY_ROLE</span>
                           <span className="font-mono text-[10px] font-black uppercase tracking-widest">Technical Mentor</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Stats/Info */}
            <div className="lg:col-span-4 flex flex-col gap-12">
               <div className="border border-grid-line p-8 space-y-10 relative bg-foreground/[0.02] dark:bg-white/[0.02]">
                  <div className="absolute top-0 right-0 p-4 border-l border-b border-grid-line">
                     <Zap className="w-4 h-4 text-accent animate-pulse" />
                  </div>
                  
                  <div className="space-y-6">
                     <span className="technical-label opacity-40 !text-[8px]">CONTACT_CHANNELS</span>
                     <div className="flex flex-col gap-6">
                        {contactNodes.map(node => (
                           <div key={node.label} className="group relative">
                              <div className="flex items-center gap-4 mb-1">
                                 <node.icon className="w-3 h-3 text-accent opacity-40 group-hover:opacity-100 transition-opacity" />
                                 <span className="technical-label !text-[9px] group-hover:text-accent transition-colors">{node.label}</span>
                              </div>
                              <span className="block font-mono text-[11px] font-bold opacity-60 group-hover:opacity-100 transition-opacity ml-7">{node.value}</span>
                              <span className="absolute right-0 top-0 font-mono text-[8px] opacity-10 group-hover:opacity-100 transition-opacity">{node.ref}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-6 pt-10 border-t border-grid-line">
                     <span className="technical-label opacity-40 !text-[8px]">SOCIAL_MESH</span>
                     <div className="flex flex-wrap gap-4">
                        {socialLinks.map(link => (
                           <a key={link.label} href={link.href} className="flex-1 flex items-center justify-center gap-3 border border-grid-line py-4 hover:border-accent hover:bg-accent hover:text-white transition-all group">
                              <link.icon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                              <span className="technical-label !text-[9px] font-black">{link.label}</span>
                           </a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Certifications: CREDENTIAL_MATRIX */}
      <section className="px-6 md:px-24 py-32 border-t border-grid-line bg-foreground/5 dark:bg-white/5 relative overflow-hidden">
         <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-20"
         >
            <div className="flex flex-col gap-6">
               <div className="technical-label flex items-center gap-4">
                  <Award className="w-4 h-4 text-accent" />
                  <span>CREDENTIAL_VERIFICATION_v1.0</span>
               </div>
               <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                  Auth.<br /><span className="text-accent underline decoration-4 underline-offset-8">Certificates.</span>
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-grid-line border border-grid-line">
               {certifications.map((cert, idx) => (
                  <motion.div 
                     key={cert.id}
                     whileHover={{ backgroundColor: 'rgba(255, 77, 0, 0.05)' }}
                     className="bg-background p-10 flex flex-col gap-8 group transition-all duration-500"
                  >
                     <div className="flex justify-between items-start">
                        <span className="font-mono text-[10px] opacity-20">0{idx + 1}</span>
                        <div className="w-8 h-8 rounded-full border border-grid-line flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all">
                           <Zap className="w-3 h-3 text-accent group-hover:text-white transition-colors" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-accent transition-colors">{cert.title}</h3>
                        <span className="technical-label !text-[9px] opacity-40">{cert.issuer}</span>
                     </div>
                     <div className="mt-auto flex justify-between items-center opacity-20 group-hover:opacity-100 transition-all">
                        <span className="font-mono text-[8px] tracking-widest">{cert.id}</span>
                        <span className="symbol">✦</span>
                     </div>
                  </motion.div>
               ))}
            </div>
         </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-24 py-16 flex justify-between items-center border-t border-grid-line mt-24">
         <Link href="/" className="flex items-center gap-6 group">
            <span className="symbol text-accent group-hover:-translate-x-2 transition-transform duration-300">←</span>
            <span className="font-black text-xs uppercase tracking-[0.4em]">Term_Session</span>
         </Link>
         <div className="technical-label !text-[8px] opacity-30 text-right">
            AUTH_ID: // 0xFAW_IDENTITY<br />
            STATUS: VERIFIED_NOMINAL
         </div>
      </footer>

    </main>
  );
}

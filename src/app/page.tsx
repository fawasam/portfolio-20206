"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Code2, Layers, Database, Binary, Send, Mail, User, BookOpen, Cloud, GitBranch } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-3">
          <label className="technical-label !text-[10px] opacity-40">01_USER_NAME</label>
          <input 
            type="text" 
            required
            placeholder="INPUT NAME..."
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="bg-transparent border-b border-grid-line p-4 focus:border-accent outline-none text-xl font-black uppercase tracking-tighter transition-all placeholder:opacity-30"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="technical-label !text-[10px] opacity-40">02_EMAIL_PROTOCOL</label>
          <input 
            type="email" 
            required
            placeholder="INPUT EMAIL..."
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="bg-transparent border-b border-grid-line p-4 focus:border-accent outline-none text-xl font-black uppercase tracking-tighter transition-all placeholder:opacity-30"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="technical-label !text-[10px] opacity-40">03_SUBJECT_MANIFEST</label>
        <input 
          type="text" 
          placeholder="INPUT SUBJECT..."
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className="bg-transparent border-b border-grid-line p-4 focus:border-accent outline-none text-xl font-black uppercase tracking-tighter transition-all placeholder:opacity-30"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="technical-label !text-[10px] opacity-40">04_MESSAGE_DATA_BUFFER</label>
        <textarea 
          required
          placeholder="TRANSMIT MESSAGE..."
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="bg-transparent border border-grid-line p-6 focus:border-accent outline-none text-lg font-medium tracking-tight transition-all resize-none placeholder:opacity-30"
        />
      </div>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={status === "loading"}
        className={`w-full py-6 md:py-8 border-2 border-accent text-accent font-black text-xs md:text-2xl uppercase tracking-[0.2em] md:tracking-[0.5em] transition-all flex items-center justify-center gap-6 group overflow-hidden relative ${status === 'success' ? 'bg-accent/10' : ''}`}
      >
        <div className="absolute inset-x-0 h-full bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <span className="relative z-10 group-hover:text-white transition-colors">
          {status === "idle" && "INITIATE_TRANSMISSION"}
          {status === "loading" && "TRANSMITTING..."}
          {status === "success" && "TRANSMISSION_COMPLETE"}
          {status === "error" && "RETRY_TRANSMISSION"}
        </span>
        <Send className="w-5 h-5 relative z-10 group-hover:text-white transition-colors group-hover:translate-x-4 group-hover:-translate-y-4 duration-500" />
      </motion.button>
      
      {status === 'success' && (
        <span className="technical-label text-[#22c55e] text-center">Protocol: Message successfully decentralized to system.</span>
      )}
      {status === 'error' && (
        <span className="technical-label text-[#ef4444] text-center">Error: Handshake failed. System not accessible.</span>
      )}
    </form>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const gridLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const crosshairStroke = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";

  return (
    <main className="min-h-screen relative font-sans transition-colors duration-700 bg-background text-foreground" ref={containerRef}>
      
      {/* Multi-Breakpoint SVG Backgrounds */}
      <div className="bg-pattern fixed inset-0 -z-1 pointer-events-none opacity-100">
        
        {/* Desktop Grid (>= 1280px) */}
        <svg className="hidden custom-desktop:block w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1728 958" preserveAspectRatio="xMidYMid slice">
          <line x1="437.5" x2="437.5" y2="958" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="864.5" x2="864.5" y2="958" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="1290.5" x2="1290.5" y2="958" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="0" y1="318.5" x2="1728" y2="318.5" stroke={gridLine} fill="none" strokeWidth="1"></line>
          <line x1="0" y1="637.5" x2="1728" y2="637.5" stroke={gridLine} fill="none" strokeWidth="1"></line>
          
          {/* Desktop Markers */}
          {[437.5, 864.5, 1290.5].flatMap(x => [318.5, 637.5].map(y => (
            <g key={`d-${x}-${y}`}>
              <line x1={x} y1={y-4} x2={x} y2={y+4} stroke={crosshairStroke} fill="none"></line>
              <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={crosshairStroke} fill="none"></line>
            </g>
          )))}
        </svg>

        {/* Tablet Grid (768px - 1279px) */}
        <svg className="hidden custom-tab:block custom-desktop:hidden w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 834 1194" preserveAspectRatio="xMidYMid slice">
          <line x1="278.5" x2="278.5" y2="1194" stroke={gridLine} fill="none"></line>
          <line x1="556.5" x2="556.5" y2="1194" stroke={gridLine} fill="none"></line>
          <line x1="0" y1="298.5" x2="834" y2="298.5" stroke={gridLine} fill="none"></line>
          <line x1="0" y1="597" x2="834" y2="597" stroke={gridLine} fill="none"></line>
          <line x1="0" y1="895.5" x2="834" y2="895.5" stroke={gridLine} fill="none"></line>
          {/* Tablet Markers */}
          {[278.5, 556.5].flatMap(x => [298.5, 597, 895.5].map(y => (
            <g key={`t-${x}-${y}`}>
              <line x1={x} y1={y-4} x2={x} y2={y+4} stroke={crosshairStroke} fill="none"></line>
              <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={crosshairStroke} fill="none"></line>
            </g>
          )))}
        </svg>

        {/* Mobile Grid (< 768px) */}
        <svg className="custom-tab:hidden w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 393 852" preserveAspectRatio="xMidYMid slice">
          <line x1="131" x2="131" y2="852" stroke={gridLine} fill="none"></line>
          <line x1="262" x2="262" y2="852" stroke={gridLine} fill="none"></line>
          <line x1="0" y1="213" x2="393" y2="213" stroke={gridLine} fill="none"></line>
          <line x1="0" y1="426" x2="393" y2="426" stroke={gridLine} fill="none"></line>
          <line x1="0" y1="639" x2="393" y2="639" stroke={gridLine} fill="none"></line>
          {/* Mobile Markers */}
          {[131, 262].flatMap(x => [213, 426, 639].map(y => (
            <g key={`m-${x}-${y}`}>
              <line x1={x} y1={y-3} x2={x} y2={y+3} stroke={crosshairStroke} fill="none"></line>
              <line x1={x-3} y1={y} x2={x+3} y2={y} stroke={crosshairStroke} fill="none"></line>
            </g>
          )))}
        </svg>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-12 z-[200] flex justify-between items-baseline mix-blend-difference text-white">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
          <Link href="/">
            <span className="font-black tracking-tighter text-3xl md:text-5xl uppercase leading-none block">fawas</span>
          </Link>
          {!isMenuOpen && (
            <div className="hidden sm:flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
               <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Systems_Designer</span>
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
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">
               <Link href="/about">About</Link>
             </li>
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">Archive</li>
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
         <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none">
            {/* Visual Decorative Grid */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
               <line x1="33%" x2="33%" y1="0" y2="100%" stroke={gridLine} />
               <line x1="66%" x2="66%" y1="0" y2="100%" stroke={gridLine} />
               <line x1="0" x2="100%" y1="33%" y2="33%" stroke={gridLine} />
               <line x1="0" x2="100%" y1="66%" y2="66%" stroke={gridLine} />
            </svg>
         </div>

         <div className="mt-40 px-8 flex flex-col gap-2 relative">
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
               {/* Section Line as seen in image */}
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
                          <span className="text-5xl font-black tracking-tighter uppercase group-hover:text-[#ff4d00] transition-colors">{item.label}</span>
                       </motion.div>
                    </Link>
                  ))}
               </nav>

               {/* Tactical Crosshair + Decorative Bottom */}
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
         
         <div className="mt-auto p-8 opacity-20 text-[7px] tracking-[0.4em] font-mono leading-relaxed">
            SYSTEMS ARCHITECT CORE // ALL RIGHTS RESERVED. <br />
            INITIALIZING LOGICAL INTERFACE PORT 8080.
         </div>
      </motion.div>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 relative overflow-hidden">
        
        {/* Small Framed Portrait Pod */}
        <motion.div 
          style={{ 
            right: "10%",
            top: "50%",
            width: "350px",
            height: "450px",
            y: "-50%",
            translateY: useTransform(smoothScroll, [0, 1], [0, -100]),
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0])
          }}
          className="absolute z-10 hidden xl:flex flex-col gap-4"
        >
          <div className="relative w-full h-full border border-grid-line p-2 bg-background/50 backdrop-blur-md group hover:border-accent transition-all duration-700">
            <div className="absolute top-0 right-0 p-4 mix-blend-difference z-10 opacity-60 group-hover:opacity-100 transition-opacity">
               <span className="technical-label !text-[8px] text-white tracking-[0.4em]">LIVE_FEED_01</span>
            </div>
            <div className="w-full h-full overflow-hidden relative">
              <Image 
                src="/assets/fawasam_portrait.jpg" 
                alt="Fawasam Portrait" 
                fill
                className="object-cover grayscale contrast-110 scale-x-[-1] group-hover:scale-[-1.05] transition-transform duration-1000"
                priority
              />
              <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-accent/5 pointer-events-none"
              />
            </div>
            {/* Tactical Corners */}
            <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-accent" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-accent" />
          </div>
          
          <div className="flex justify-between items-center opacity-30 text-[8px] font-mono tracking-widest px-1">
             <span>REF_ID: // 772-019-91</span>
             <span>SCAN_COMPLETE_99.8%</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 max-w-[90rem] w-full"
        >
          <div className="technical-label mb-10 flex items-center gap-6">
            <span className="symbol text-2xl">✦</span>
            <span className="text-xs">SYSTEM_INITIALIZED_00.2</span>
            <span className="handwriting text-xl ml-8 rotate-[-2deg] hidden md:inline-block">// Portrait mode active</span>
          </div>
          
          <h1 className="text-[14vw] md:text-[12vw] font-[900] tracking-tighter leading-[0.82] mb-12 uppercase">
            CODE,<br />
            BY <span className="text-accent relative">
              DESIGN.
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute left-0 bottom-[5%] h-[8%] bg-accent/20 -z-1" 
              />
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-start md:mt-12">
            <div className="md:col-span-12 lg:col-span-7 flex flex-col gap-10">
              <p className="text-2xl md:text-5xl leading-[1.1] font-medium tracking-tight max-w-[50rem]">
                I build systems that shape how humans and technology interact.
              </p>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <p className="opacity-40 text-lg md:text-xl max-w-xl leading-relaxed font-light">
                  From scalable backend architectures to intelligent interfaces, 
                  my work lives at the intersection of logic and experience.
                </p>
                <div className="technical-label text-[9px] border-l border-accent pl-4 flex flex-col gap-2">
                   <span>LOC: 12.9716° N, 77.5946° E</span>
                   <span>TIME: {mounted ? new Date().toLocaleTimeString() : "00:00:00 AM"}</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 lg:pl-12">
              <div className="space-y-4">
                <span className="technical-label opacity-40">SYSTEM STATUS</span>
                <div className="flex items-center gap-4 border-l-2 border-accent pl-4">
                  <span className="text-xs font-mono uppercase font-bold">NOMINAL_OPERATIONS_STABLE</span>
                </div>
              </div>
              <div className="space-y-4">
                <span className="technical-label opacity-40">ACTIVE MODULES</span>
                <div className="flex flex-wrap gap-2">
                  {['GEN_AI', 'NEURAL_MESH', 'VISUAL_SYSTEM', 'CORE_OS'].map(mod => (
                    <span key={mod} className="text-[10px] font-mono border border-foreground/20 px-3 py-1 uppercase font-bold hover:bg-foreground hover:text-background transition-colors cursor-crosshair">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <span className="technical-label opacity-40">CURRENT STACK</span>
                <p className="text-[10px] font-mono font-bold leading-relaxed tracking-widest uppercase">
                  NEXT.JS / TURBOPACK / BUN / TS
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Annotations */}
        {[
          { top: '15%', left: '40%', text: 'BIOMETRIC_ID_VERIFIED', rotate: -8, symbol: '☐' },
          { bottom: '20%', left: '10%', text: 'SYSTEM_ARCHITECT_CORE', rotate: 5, symbol: '✦' },
          { top: '30%', right: '5%', text: 'USER_INTERFACE_01', rotate: 12, symbol: '→' },
        ].map((anno, i) => (
          <motion.div
            key={anno.text + i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 + (i * 0.4) }}
            className="absolute hidden xl:block"
            style={{ 
              top: anno.top, left: anno.left, right: anno.right, bottom: anno.bottom,
              transform: `rotate(${anno.rotate}deg)`
            }}
          >
            <div className="flex flex-col gap-2 group cursor-help">
               <span className="technical-label !text-[9px] opacity-25 group-hover:opacity-100 transition-opacity">
                  <span className="text-accent">{anno.symbol}</span> {anno.text}
               </span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* High-Fidelity Architectural Manifest: EXACT DESIGN ALIGNMENT */}
  

      {/* Grid Alignment Showcase */}
      {/* <section className="relative px-8 md:px-24 py-32 border-t border-grid-line">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { id: '01', title: 'Logic Systems', desc: 'Crafting robust architectures for modern web applications.' },
              { id: '02', title: 'Visual Geometry', desc: 'Precise design systems built on mathematical foundations.' },
              { id: '03', title: 'Adaptive Flow', desc: 'Seamless interfaces that respond to every device.' },
              { id: '04', title: 'Neural Core', desc: 'Integrating intelligent AI nodes into human-centric products.' }
            ].map(item => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={item.id} 
                className="p-8 border border-grid-line bg-background/50 backdrop-blur-sm group hover:border-accent transition-all duration-500"
              >
                 <span className="font-mono text-[10px] opacity-30 mb-6 block">{item.id}.</span>
                 <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">{item.title}</h3>
                 <p className="text-sm opacity-50 leading-relaxed font-light group-hover:opacity-80 transition-opacity">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Realized Systems: SELECTED_OPERATIONS */}
        <section className="px-6 md:px-24 py-32 border-t border-grid-line">
          <div className="flex flex-col gap-20 md:gap-32">
            
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="flex flex-col gap-6"
            >
               <div className="technical-label flex items-center gap-4">
                  <span className="symbol">✦</span>
                  <span>SYSTEM_MANIFEST_v0.1</span>
               </div>
               <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                  Realized.<br /><span className="text-accent underline decoration-4 underline-offset-8">Systems.</span>
               </h2>
            </motion.div>

            {/* Project 01: The Laundry Hub */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 relative aspect-video lg:h-[60vh] lg:aspect-auto border border-grid-line overflow-hidden bg-background/50 backdrop-blur-sm group-hover:border-accent transition-all duration-700">
                 <Image 
                   src="/assets/laundry_hub_hero.jpg" 
                   alt="The Laundry Hub - Logistics Platform" 
                   fill
                   className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                   onError={(e) => { e.currentTarget.style.display = 'none'; }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                 <div className="absolute bottom-0 left-0 p-6 md:p-10 z-10 w-full flex justify-between items-end">
                    <span className="text-white font-mono text-lg md:text-xl opacity-40"></span>
                    <div className="flex flex-col gap-2 md:gap-3 items-end text-right max-w-[90%]">
                      <span className="technical-label !text-white !opacity-100 bg-accent px-2 py-0.5 md:px-3 md:py-1 self-end text-[8px] md:text-[10px]">DEPLOYMENT_ACTIVE</span>
                      <h3 className="text-xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none text-right">THE_LAUNDRY_HUB</h3>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
                 <div className="space-y-4 md:space-y-6">
                   <div className="flex items-center gap-4 technical-label opacity-40">
                      <span>ID: PRJ_001</span>
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      <span>2024</span>
                   </div>
                   <p className="text-xl md:text-2xl leading-tight font-medium tracking-tight">
                      Architecting a synchronous logistical mesh for premium service distribution across the UAE.
                   </p>
                   <p className="opacity-40 text-sm leading-relaxed max-w-lg">
                      Transforming traditional physical logistics into synchronous digital logic. Engineered a complete MERN infrastructure with real-time driver telemetry and automated booking nodes.
                   </p>
                 </div>

                 <div className="grid grid-cols-2 gap-8 py-8 border-y border-grid-line">
                    <div>
                      <span className="technical-label text-[9px] opacity-40 block mb-3">SYSTEM_CORE</span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest leading-relaxed">Next.js / Express / Mongo</span>
                    </div>
                    <div>
                      <span className="technical-label text-[9px] opacity-40 block mb-3">NODES_DEPLOYED</span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest leading-relaxed">PayTabs / Live Sockets</span>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-3">
                    {['DXB', 'AUH', 'SHJ', 'LOGISTICS'].map(tag => (
                      <span key={tag} className="text-[9px] font-mono border border-foreground/10 px-3 py-1 uppercase opacity-60 hover:opacity-100 hover:border-accent transition-all flex items-center gap-2">
                         <span className="w-1 h-1 rounded-full bg-accent" />
                         {tag}
                      </span>
                    ))}
                 </div>

                 <Link href="/projects/PRJ_001">
                   <motion.button 
                     whileHover={{ x: 10 }}
                     className="flex items-center gap-6 group/btn mt-4"
                   >
                      <span className="font-black text-xs uppercase tracking-[0.4em] border-b-2 border-accent pb-2">Investigate_Operation</span>
                      <span className="symbol text-accent group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
                   </motion.button>
                 </Link>
              </div>
            </motion.div>

            {/* Project 02: Muthoot Capital */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <div className="lg:col-span-7 lg:order-2 relative aspect-video lg:h-[60vh] lg:aspect-auto border border-grid-line overflow-hidden bg-background/50 backdrop-blur-sm group-hover:border-accent transition-all duration-700">
                 <Image 
                   src="/assets/muthoot_hero.jpg" 
                   alt="Muthoot Capital - Financial Platform" 
                   fill
                   className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                   onError={(e) => { e.currentTarget.style.display = 'none'; }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                 <div className="absolute bottom-0 left-0 lg:left-auto lg:right-0 p-6 md:p-10 z-10 w-full flex justify-between items-end text-left lg:text-right">
                    <span className="text-white font-mono text-lg md:text-xl opacity-40"></span>
                    <div className="flex flex-col gap-2 md:gap-3 items-end max-w-[90%]">
                      <span className="technical-label !text-white !opacity-100 bg-[#ff4d00] px-2 py-0.5 md:px-3 md:py-1 self-end text-[8px] md:text-[10px]">DOCKER_GRID_ACTIVE</span>
                      <h3 className="text-xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none text-right">Muthoot_Capital</h3>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-5 lg:order-1 flex flex-col gap-8 md:gap-10 text-left">
                 <div className="space-y-4 md:space-y-6">
                   <div className="flex items-center gap-4 technical-label opacity-40">
                      <span>ID: PRJ_002</span>
                      <div className="w-1 h-1 rounded-full bg-accent" />
                      <span>2024</span>
                   </div>
                   <p className="text-xl md:text-2xl leading-tight font-medium tracking-tight">
                      Deploying robust enterprise financial nodes for secure loan payments and fixed deposit instruments.
                   </p>
                   <p className="opacity-40 text-sm leading-relaxed max-w-lg">
                      Engineered a fully featured financial ecosystem using a Headless Strapi CMS. Orchestrated complex transaction logic and EMI calculations within a containerized Docker grid.
                   </p>
                 </div>

                 <div className="grid grid-cols-2 gap-8 py-8 border-y border-grid-line">
                    <div>
                      <span className="technical-label text-[9px] opacity-40 block mb-3">SYSTEM_CORE</span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest leading-relaxed">Next.js / TypeScript / Strapi</span>
                    </div>
                    <div>
                      <span className="technical-label text-[9px] opacity-40 block mb-3">DEPLOYMENT_NODE</span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest leading-relaxed">Docker Compose / MySQL</span>
                    </div>
                 </div>

                 <div className="flex flex-wrap gap-3">
                    {['LOAN_SETTLEMENT', 'FD_INTERFACE', 'ENTERPRISE_CMS', 'SECURITY_LAYER'].map(tag => (
                      <span key={tag} className="text-[9px] font-mono border border-foreground/10 px-3 py-1 uppercase opacity-60 hover:opacity-100 hover:border-accent transition-all flex items-center gap-2">
                         <span className="w-1 h-1 rounded-full bg-accent" />
                         {tag}
                      </span>
                    ))}
                 </div>

                 <Link href="/projects/PRJ_002">
                   <motion.button 
                     whileHover={{ x: 10 }}
                     className="flex items-center gap-6 group/btn mt-4 lg:flex-row-reverse lg:justify-end"
                   >
                      <span className="font-black text-xs uppercase tracking-[0.4em] border-b-2 border-accent pb-2">Investigate_Operation</span>
                      <span className="symbol text-accent group-hover/btn:translate-x-2 lg:group-hover/btn:-translate-x-2 transition-transform duration-300 lg:rotate-180">→</span>
                   </motion.button>
                 </Link>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Technical Capabilities: SYSTEM_STACK */}
        <section className="px-6 md:px-24 py-32 border-t border-grid-line bg-foreground/[0.02] dark:bg-white/[0.02] relative overflow-hidden">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="flex flex-col gap-20"
          >
             <div className="flex flex-col gap-6">
                <div className="technical-label flex items-center gap-4">
                   <span className="symbol text-accent">✦</span>
                   <span>CORE_CAPABILITIES_v1.0</span>
                </div>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                   Technical.<br /><span className="text-accent underline decoration-4 underline-offset-8">Arsenal.</span>
                </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {[
                  {
                    category: "LANGUAGES",
                    icon: "Code2",
                    skills: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "HTML", "CSS"]
                  },
                  {
                    category: "FRAMEWORKS",
                    icon: "Layers",
                    skills: ["Next.js", "React", "Node.js", "Express.js", "Strapi", "Langchain"]
                  },
                  {
                    category: "DATABASES",
                    icon: "Database",
                    skills: ["MySQL", "Postgres", "MongoDB", "Pinecone", "Elasticsearch"]
                  },
                  {
                    category: "TOOLS_DEV",
                    icon: "Binary",
                    skills: ["Google Colab", "Matlab", "Microsoft Office"]
                  },
                  {
                    category: "DEVOPS",
                    icon: "Cloud",
                    skills: ["AWS", "ECS", "CodePipeline", "CodeBuild", "ECR", "Amplify", "EC2", "S3"]
                  },
                  {
                    category: "CI/CD & INFRA",
                    icon: "GitBranch",
                    skills: ["Docker", "Jenkins", "Git", "GitHub Actions", "ArgoCD", "Grafana", "Prometheus", "Terraform"]
                  }
                ].map((group, idx) => {
                  const IconComponent = group.icon === "Code2" ? Code2 : group.icon === "Layers" ? Layers : group.icon === "Database" ? Database : group.icon === "Cloud" ? Cloud : group.icon === "GitBranch" ? GitBranch : Binary;
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col gap-8 p-8 border border-grid-line bg-background/50 backdrop-blur-sm group hover:border-accent transition-all duration-500"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          <span className="font-mono text-[10px] opacity-20">0{idx + 1}</span>
                          <h3 className="technical-label !text-[10px] font-black group-hover:text-accent transition-colors">{group.category}</h3>
                        </div>
                        <IconComponent className="w-5 h-5 text-accent opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-12" />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {group.skills.map((skill, sidx) => (
                          <span 
                            key={sidx} 
                            className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-grid-line px-2 py-1 group-hover:border-foreground/20 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
             </div>

             <div className="mt-12 flex items-center gap-6 opacity-10">
                <div className="h-[1px] flex-1 bg-foreground" />
                <div className="technical-label !text-[8px]">LOG_LEVEL: SYSTEM_READY</div>
                <div className="h-[1px] w-24 bg-foreground" />
             </div>
          </motion.div>
        </section>

        {/* Contact Section: PROTOCOL_HANDSHAKE */}
        <section id="contact" className="px-6 md:px-24 py-48 border-t border-grid-line bg-background relative overflow-hidden">
           {/* Visual background details */}
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <span className="font-mono text-[20vw] font-black leading-none">@</span>
           </div>

           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10"
           >
              <div className="lg:col-span-12 flex flex-col gap-6 mb-12">
                 <div className="technical-label flex items-center gap-4">
                    <Mail className="w-4 h-4 text-accent" />
                    <span>SYSTEM_CONTACT_BRIDGE_v1.2</span>
                 </div>
                 <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">
                   Start a.<br /><span className="text-accent underline decoration-4 md:decoration-8 underline-offset-12">Session.</span>
                 </h2>
                 <p className="text-xl md:text-2xl font-medium opacity-60 max-w-2xl tracking-tight">
                   For industrial architecture inquiries, system optimizations, or global collaborations, 
                   initiate the handshake protocol below.
                 </p>
              </div>

              <div className="lg:col-span-8">
                 <ContactForm />
              </div>

              <div className="lg:col-span-4 flex flex-col gap-12">
                 <div className="border border-grid-line p-10 space-y-8 h-fit bg-foreground/[0.01] dark:bg-white/[0.01]">
                    <div className="space-y-4">
                       <span className="technical-label !text-[8px] opacity-40">DIRECT_NODES</span>
                       <div className="flex flex-col gap-3">
                          <a href="mailto:fawasam32@gmail.com" className="group flex items-center gap-4">
                             <div className="w-8 h-8 rounded-full border border-grid-line flex items-center justify-center group-hover:border-accent transition-colors">
                                <Mail className="w-3 h-3 group-hover:text-accent" />
                             </div>
                             <span className="font-mono text-xs opacity-60 group-hover:opacity-100 group-hover:text-accent transition-all">fawasam32@gmail.com</span>
                          </a>
                          <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-full border border-grid-line flex items-center justify-center">
                                <User className="w-3 h-3" />
                             </div>
                             <span className="font-mono text-xs opacity-60">@fawasam</span>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-grid-line">
                       <span className="technical-label !text-[8px] opacity-40">AVAILABILITY_STATE</span>
                       <div className="flex items-center gap-4">
                          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_10px_#22c55e]" />
                          <span className="technical-label !text-[10px] font-black">ACTIVE_FOR_NEW_VENTURES</span>
                       </div>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

        {/* Global Footer */}
        <footer className="px-6 md:px-24 py-16 flex flex-col md:flex-row justify-between items-center border-t border-grid-line gap-12">
           <div className="flex flex-col gap-4 items-center md:items-start">
             <span className="font-black tracking-tighter text-3xl uppercase leading-none">fawas</span>
             <span className="technical-label opacity-30 !text-[8px] tracking-[0.5em]">SYSTEMS ARCHITECT CORE // 2024</span>
           </div>
           
           <div className="flex gap-12">
             <Link href="/projects" className="technical-label !text-[10px] hover:text-accent transition-colors">Archive</Link>
             <Link href="/experience" className="technical-label !text-[10px] hover:text-accent transition-colors">Experience</Link>
             <span className="technical-label !text-[10px] opacity-20">Terms_01</span>
           </div>

           <div className="technical-label !text-[8px] opacity-30 text-center md:text-right font-mono">
              TIMESTAMP: {mounted ? new Date().toISOString() : "0000-00-00T00:00:00Z"}<br />
              COORD: 12.9716° N, 77.5946° E
           </div>
        </footer>

    </main>
  );
}

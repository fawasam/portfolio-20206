"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Code2, Layers, Database, Binary, Award, Zap } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function ExperiencePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const gridLine = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
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
              <line x1={x} y1={y-4} x2={x} y2={y+4} stroke={crosshairStroke} fill="none"></line>
              <line x1={x-4} y1={y} x2={x+4} y2={y} stroke={crosshairStroke} fill="none"></line>
            </g>
          )))}
        </svg>
      </div>


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
                  {[
                    { title: "Introduction to DevOps", issuer: "Great Learning Platform", id: "CERT_DV_001" },
                    { title: "Introduction to Artificial Intelligence", issuer: "LinkedIn", id: "CERT_AI_002" },
                    { title: "Full Stack Development", issuer: "Professional Training", id: "CERT_FS_003" },
                  ].map((cert, idx) => (
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

         {/* Final Action / Return */}
         <footer className="px-6 md:px-24 py-12 flex justify-between items-center border-t border-grid-line mt-24">
            <Link href="/" className="flex items-center gap-6 group">
               <span className="symbol text-accent group-hover:-translate-x-2 transition-transform duration-300">←</span>
               <span className="font-black text-xs uppercase tracking-[0.4em]">Return_to_Systems</span>
            </Link>
            <div className="technical-label !text-[8px] opacity-30 text-right">
               TIMESTAMP: {mounted ? new Date().toISOString() : "0000-00-00T00:00:00Z"}<br />
               LOG_LEVEL: SYSTEM_VERIFIED
            </div>
         </footer>

    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ExternalLink } from "lucide-react";

// Mock Project Data (This would ideally be fetched from a manifest file)
// ... (trimmed for brevity)
import { PROJECTS_DATA, Project } from "@/lib/projects-data";


export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
   const project: Project = PROJECTS_DATA[id] || PROJECTS_DATA["PRJ_001"];
   
   const containerRef = useRef<HTMLDivElement>(null);


  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-700" ref={containerRef}>
      



      {/* Project Schematic Layout */}
      <section className="pt-40 md:pt-48 px-6 md:px-24 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24">
          
          {/* Metadata Sidebar (Schematic Style) */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 space-y-8 md:space-y-12"
          >
            <div className="flex flex-col gap-6 md:gap-8">
               <div className="technical-label flex items-center gap-3">
                  <span className="symbol">✦</span>
                  <span>PROJECT_METADATA_EXTRACT</span>
               </div>
               <div className="space-y-4 md:space-y-6 border-l border-grid-line pl-6">
                  <div>
                    <span className="technical-label opacity-60 text-[8px] block mb-2">IDENTIFIER</span>
                    <span className="font-mono text-sm font-black">{project.id}</span>
                  </div>
                  <div>
                    <span className="technical-label opacity-60 text-[8px] block mb-2">OPERATIONAL_YEAR</span>
                    <span className="font-mono text-sm font-black">{project.year}</span>
                  </div>
                  <div>
                    <span className="technical-label opacity-60 text-[8px] block mb-2">STATUS</span>
                    <span className="text-accent text-[9px] font-bold bg-accent/10 px-2 py-0.5">{project.status}</span>
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <span className="technical-label opacity-40 text-[8px] block mb-2">CORE_SYSTEM_STACK</span>
               <p className="font-mono text-[10px] leading-relaxed uppercase tracking-widest font-bold">
                 {project.stack}
               </p>
            </div>

             {project.url && (
               <div className="pb-8 space-y-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_8px_#22c55e]" />
                    <span className="technical-label !text-[9px] font-black text-[#22c55e]">STATUS: OPERATIONAL_ONLINE</span>
                  </div>
                  <motion.a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between w-full px-6 py-4 border-2 border-accent text-accent font-black text-[10px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 group shadow-[8px_8px_0px_0px_rgba(255,77,0,0.1)] hover:shadow-none"
                  >
                    <span className="glitch-text">INVESTIGATE_OPERATION</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.a>
               </div>
             )}

            <div className="space-y-8 md:space-y-12 pt-8 md:pt-12 border-t border-grid-line">
               <span className="technical-label opacity-40 text-[8px] block mb-2">SYSTEM_IMPACT_METRICS</span>
               {project.impact.map((m) => (
                 <div key={m.label} className="group">
                    <span className="technical-label !text-[8px] opacity-25 group-hover:opacity-100 transition-opacity">{m.label}</span>
                    <div className="text-lg md:text-xl font-black tracking-tighter uppercase mt-1">[{m.val}]</div>
                    <div className="w-full h-[1px] bg-grid-line mt-3 md:mt-4 group-hover:bg-accent transition-all duration-500" />
                 </div>
               ))}
            </div>
          </motion.aside>

          {/* Core Content Analysis */}
          <div className="lg:col-span-9 flex flex-col gap-16 md:gap-24">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="space-y-6 md:space-y-8"
             >
                <h1 className="text-4xl sm:text-6xl md:text-[10vw] font-black tracking-tighter leading-[0.85] uppercase">
                   {project.title.split('_').join(', ')}
                </h1>
                <div className="max-w-3xl">
                   <p className="text-xl md:text-4xl font-light leading-[1.4] tracking-tight opacity-90">
                     {project.concepts.philosophy}
                   </p>
                </div>
             </motion.div>

             {/* Large Schematic Visual */}
             <motion.div 
                style={{ 
                   height: "auto",
                   aspectRatio: "16/9"
                }}
                className="relative lg:h-[70vh] w-full border border-grid-line overflow-hidden group"
             >
                <Image 
                  src={project.images[0]} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-cover grayscale contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute top-0 right-0 p-4 md:p-8 technical-label mix-blend-difference flex flex-col gap-2 opacity-60">
                   <span>PRIMARY_INTERFACE_NODES</span>
                   <span className="handwriting text-accent text-xs md:text-base">{"// Operational Study 01"}</span>
                </div>
             </motion.div>

             {/* Technical Node Analysis */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
               <div className="space-y-8 md:space-y-12">
                  <div className="technical-label">01 // TECHNICAL_SPECIFICATIONS</div>
                  <div className="space-y-8 md:space-y-10 border-l border-accent pl-6 md:pl-8">
                     {project.nodes.map((node, i) => (
                       <div key={node.name} className="space-y-2 md:space-y-3">
                          <span className="text-[10px] font-mono font-bold opacity-30 tracking-[0.4em]">NODE_{i+1}</span>
                          <h4 className="text-lg md:text-xl font-black uppercase tracking-tight">{node.name}</h4>
                          <p className="opacity-50 text-sm leading-relaxed max-w-md">{node.desc}</p>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="space-y-8 md:space-y-12">
                  <div className="technical-label">02 // CONCEPTUAL_BREAKDOWN</div>
                  <p className="text-lg md:text-2xl font-medium leading-[1.7] opacity-80 line-grid-mobile-fix">
                    {project.concepts.breakdown}
                  </p>
                  <div className="pt-4 md:pt-8 flex flex-col gap-4 md:gap-6">
                     <span className="technical-label !text-[8px] opacity-25 uppercase">Logistical_Mesh_Visualization</span>
                     <div className="grid grid-cols-5 gap-2 h-16 md:h-20">
                        {[1,2,3,4,5,6,7,8,9,10].map(i => (
                          <motion.div 
                            key={i} 
                            animate={{ scaleY: [1, 0.4, 0.8, 0.3, 1] }}
                            transition={{ duration: 2 + i * 0.1, repeat: Infinity }}
                            className="bg-grid-line w-1 rounded-full" 
                          />
                        ))}
                     </div>
                  </div>
               </div>
             </div>

             {/* Final Action */}
             <div className="pt-16 md:pt-24 border-t border-grid-line flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                <Link href="/projects" className="flex items-center gap-6 group">
                   <span className="symbol text-accent group-hover:-translate-x-2 transition-transform duration-300">←</span>
                   <span className="font-black text-xs uppercase tracking-[0.4em]">Return_to_Systems</span>
                </Link>
                <div className="technical-label !text-[8px] opacity-25">
                   END_OF_DOCUMENTATION // {project.id}
                </div>
             </div>

          </div>

        </div>
      </section>

    </main>
  );
}

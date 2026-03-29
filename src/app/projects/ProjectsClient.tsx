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


export default function ProjectsListing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);



  return (
    <main className="min-h-screen relative font-sans transition-colors duration-700 bg-background text-foreground" ref={containerRef}>
      

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

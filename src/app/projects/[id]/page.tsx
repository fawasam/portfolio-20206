"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Project Data (This would ideally be fetched from a manifest file)
// ... (trimmed for brevity)
const PROJECTS_DATA: { [key: string]: any } = {
  "PRJ_001": {
    id: "PRJ_001",
    title: "THE_LAUNDRY_HUB",
    year: "2024",
    category: "Logistics_Architecture / Commercial_Web",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / EXPRESS / MONGODB / SOCKET.IO",
    nodes: [
      { name: "RECURSIVE_BOOKING_NODE", desc: "Automated hierarchical scheduling for high-concurrency request handling." },
      { name: "SOCKET_DRIVER_MESH", desc: "Real-time bi-directional data flow between driver telemetry and central dispatch." },
      { name: "PAYTABS_FINANCIAL_RELAY", desc: "Secure transaction processing with automated settlement verification." }
    ],
    concepts: {
      philosophy: "Transforming traditional physical logistics into synchronous digital logic. The system prioritizes operational transparency over simple interface design.",
      breakdown: "A complete MERN-based infrastructure covering web endpoints, driver-tracking mobile apps, and industrial processing hubs."
    },
    impact: [
       { label: "LOGISTICAL_EFFICIENCY", val: "SYNCHRONIZED_MESH" },
       { label: "GEOGRAPHIC_EXTENT", val: "DXB / AUH / SHJ" },
       { label: "USER_TELEMETRY", val: "LIVE_DRIVER_NODES" }
    ],
    images: ["/assets/laundry_hub_hero.jpg", "/assets/hero.png"]
  },
  "PRJ_002": {
    id: "PRJ_002",
    title: "MUTHOOT_CAPITAL",
    year: "2024",
    category: "Financial_Systems / Enterprise_UX / CMS",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / TYPESCRIPT / STRAPI / DOCKER",
    nodes: [
      { name: "FINANCIAL_PAYMENT_NODE", desc: "Secure digital settlement pathways for loan EMI and interest instruments." },
      { name: "FD_ORIGINATION_LOGIC", desc: "Automated fixed deposit creation flow with integrated calculation engines." },
      { name: "CONTAINER_GRID_OPS", desc: "Isolated service orchestration using Docker Compose for enterprise-grade uptime." }
    ],
    concepts: {
      philosophy: "Converting a multi-decade legacy of trust into a modern, high-security digital interface. The project emphasizes reliability and user accessibility.",
      breakdown: "A complete digital overhaul using Strapi as a headless content engine and MySQL for persistent financial data integrity."
    },
    impact: [
       { label: "DEPLOYMENT_STRATEGY", val: "DOCKER_CONTAINERIZED" },
       { label: "CONTENT_MANAGEMENT", val: "STRAPI_HEADLESS_CMS" },
       { label: "SERVICE_AVAILABILITY", val: "INDUSTRIAL_STABILITY" }
    ],
    images: ["/assets/muthoot_hero.png", "/assets/hero.png"]
  },
  "PRJ_003": {
    id: "PRJ_003",
    title: "DEWTON_INDIA",
    year: "2024",
    category: "Visual_Commerce / Cloud_Arch / SEO",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / STRAPI / AWS",
    nodes: [
      { name: "SEO_SYSTEM_CORE", desc: "Granular metadata and semantically optimized architecture for high-competition regional indexing." },
      { name: "AWS_INFRA_MESH", desc: "Scaled orchestration across AWS EC2 and Amplify nodes with automated CI/CD." },
      { name: "VISUAL_ASSET_NODE", desc: "Custom-built, performance-optimized image engine for high-fidelity lighting portfolios." }
    ],
    concepts: {
      philosophy: "Redefining industrial lighting commerce through a visual-first 'Art of Light' experience, balanced with elite SEO performance and AWS stability.",
      breakdown: "A complete cloud-native infrastructure utilizing Strapi and AWS to dominate regional lighting market search rankings."
    },
    impact: [
       { label: "SEO_VISIBILITY", val: "TOP_5_INDEXED" },
       { label: "INFRA_STABILITY", val: "AWS_AMPLIFY_CI/CD" },
       { label: "USER_INTERFACE", val: "PREMIUM_COMMERCE" }
    ],
    images: ["/assets/dewton_main.png", "/assets/hero.png"]
  },
  "PRJ_004": {
    id: "PRJ_004",
    title: "SOUTH_INDIAN_CREDITS",
    year: "2024",
    category: "Financial_Systems / NBFC / AWS",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / TYPESCRIPT / STRAPI / EC2",
    nodes: [
      { name: "DIGITAL_HERITAGE_NODE", desc: "Transforming decades of regulatory trust into a high-performance modern web framework." },
      { name: "GOLD_CREDIT_MESH", desc: "Streamlined digital pathways for secure gold loan and microfinance instruments." },
      { name: "ENTERPRISE_SEO_NODE", desc: "Strategic indexing architecture to dominate regional NBFC and credit markets." }
    ],
    concepts: {
      philosophy: "Grounding a heritage financial institution in contemporary digital logic, focusing on security, accessibility, and professional UX.",
      breakdown: "A complete digital transformation using Strapi for regulatory data management and AWS EC2 for persistent service stability."
    },
    impact: [
       { label: "DIGITAL_TRANSFORMATION", val: "MIGRATION_COMPLETE" },
       { label: "REGIONAL_ indexing", val: "SEO_DOMINANCE_DXB" },
       { label: "USER_ACCESSIBILITY", val: "NBFC_CREDIT_HUB" }
    ],
    images: ["/assets/sicl_main.png", "/assets/hero.png"]
  },
  "PRJ_005": {
    id: "PRJ_005",
    title: "LULU_TECH_PARK",
    year: "2024",
    category: "IT_Infra / Spatial_Architecture / AWS",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / TYPESCRIPT / STRAPI / EC2",
    nodes: [
      { name: "INFRA_MANIFEST_NODE", desc: "Digital representation of 3.5m sq. ft. of world-class office and robotic parking space." },
      { name: "SPATIAL_ORCHESTRATOR", desc: "Dynamic leasable area management and facility visualization engine." },
      { name: "IT_HUB_SEO_CLUSTER", desc: "High-performance indexing for global tech-hub search rankings in Kochi." }
    ],
    concepts: {
      philosophy: "Architecting a high-end digital manifest that matches the architectural scale and connectivity of a leading Twin-Tower IT park.",
      breakdown: "A robust enterprise deployment using Strapi for complex facility data and AWS EC2 for persistent service availability."
    },
    impact: [
       { label: "SEO_DOMINANCE", val: "RANKED_#1_KOCHI" },
       { label: "SPATIAL_METRICS", val: "3.5M_SQFT_INDEXED" },
       { label: "ENTERPRISE_READY", val: "MNC_TENANT_PORTAL" }
    ],
    images: ["/assets/lulu_tech_main.png", "/assets/hero.png"]
  },
  "PRJ_006": {
    id: "PRJ_006",
    title: "U_SPHERE",
    year: "2024",
    category: "Creative_Logic / Haptic_Web / WebGL",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / THREE.JS / GSAP / STRAPI",
    nodes: [
      { name: "HAPTIC_INTERFACE_NODE", desc: "Immersive motion-driven UX focusing on high-fidelity user feedback and storytelling." },
      { name: "GL_RENDER_ENGINE", desc: "Customized WebGL mesh within the Next.js workflow for zero-latency 3D visualizations." },
      { name: "SEO_FUTURE_NODES", desc: "Optimizing high-impact visual narratives for competitive search results." }
    ],
    concepts: {
      philosophy: "Building digital spaces that feel as structural and enduring as physical infrastructure, using immersive haptics and creative logic.",
      breakdown: "A sophisticated deployment using Three.js and GSAP for visual storytelling and Strapi for creative asset management."
    },
    impact: [
       { label: "VISUAL_FIDELITY", val: "HIGH_IMPACT_3D" },
       { label: "SEARCH_OPTIMIZATION", val: "ULCCS_FUTURE_SEO" },
       { label: "SESSION_DEPTH", val: "IMMERSIVE_ENGAGEMENT" }
    ],
    images: ["/assets/u_sphere_main.png", "/assets/hero.png"]
  },
  "PRJ_007": {
    id: "PRJ_007",
    title: "AKORE_FORMULATIONS",
    year: "2024",
    category: "Biotech_UX / Consumer_Science / AWS",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / TYPESCRIPT / STRAPI / EC2",
    nodes: [
      { name: "ANIMATION_PRESENTATION_NODE", desc: "Refined, zero-latency motion reflecting the high-performance lab aesthetic." },
      { name: "SCIENTIFIC_ORCHESTRATOR", desc: "Precise management of topical formulation data within a robust Strapi CMS." },
      { name: "BIOTECH_SEO_CLUSTER", desc: "Targeted indexing cluster for innovative topical solutions and lab manufacturing." }
    ],
    concepts: {
      philosophy: "Converting scientific precision into a high-end digital consumer experience focusing on trust, performance, and refined UX.",
      breakdown: "A complete professional deployment utilizing Next.js for high-fidelity frontend and Strapi for scientific content integrity."
    },
    impact: [
       { label: "INDEXING_STATUS", val: "DOMINANT_SEO" },
       { label: "MOTION_FIDELITY", val: "HIGH_PERFORMANCE_UX" },
       { label: "USER_TRUST", val: "PROFESSIONAL_RELIABILITY" }
    ],
    images: ["/assets/akore_main.png", "/assets/hero.png"]
  },
  "PRJ_008": {
    id: "PRJ_008",
    title: "MORGAN_FUELS",
    year: "2024",
    category: "Energy_Logistics / Enterprise_Web / AWS",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NEXT.JS / TYPESCRIPT / STRAPI / EC2",
    nodes: [
      { name: "TRANSACTION_ORCHESTRATION_NODE", desc: "Complex bulk fuel processing and multi-national fuel card management logic." },
      { name: "LOGISTICAL_CONTENT_RELAY", desc: "Real-time management of multi-regional energy prices and fleet data sets." },
      { name: "ENERGY_SEO_CLUSTER", desc: "High-performance indexing for heating oil and bulk fuel search categories." }
    ],
    concepts: {
      philosophy: "Modernizing a four-decade legacy into a high-precision digital commerce engine for Europe's energy network.",
      breakdown: "A robust enterprise deployment focusing on transactional integrity and logistical data scale across AWS nodes."
    },
    impact: [
       { label: "NETWORK_SCALE", val: "EUROPEAN_GROWTH" },
       { label: "COMMERCE_SPEED", val: "SYNCHRONIZED_ORDERING" },
       { label: "SEARCH_RANKING", val: "TOP_3_DOMINANCE" }
    ],
    images: ["/assets/morgan_fuels_main.png", "/assets/hero.png"]
  },
  "PRJ_009": {
    id: "PRJ_009",
    title: "TALKIYO",
    year: "2024",
    category: "Communication / Real-time / Backend",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NODE.JS / AGORA / REDIS / ECS",
    nodes: [
      { name: "AGORA_SYNC_MESH", desc: "Real-time audio and video orchestration using Agora SDK, synchronized with a distributed socket mesh." },
      { name: "FINANCIAL_BRIDGE_4X", desc: "Industrial payment relay integrating four distinct gateways for multi-national transaction scalability." },
      { name: "REFERRAL_LOGIC_NODE", desc: "Secure propagation engine for automated user-growth tracking and incentive settlements." }
    ],
    concepts: {
      philosophy: "Architecting a high-concurrency real-time ecosystem where calling fidelity and financial inclusivity are synchronized across distributed nodes.",
      breakdown: "A sophisticated backend deployment on Amazon ECS, featuring low-latency Agora logic and a robust 4-way payment bridge."
    },
    impact: [
       { label: "FINANCIAL_INCLUSIVITY", val: "4_PG_INTEGRATED" },
       { label: "COMMUNICATION_SCALE", val: "AGORA_VOICE_SYNC" },
       { label: "USER_GROWTH_ENGINE", val: "AUTOMATED_REFERRALS" }
    ],
    images: ["/assets/talkiyo_main.png", "/assets/hero.png"]
  },
  "PRJ_010": {
    id: "PRJ_010",
    title: "ARIKIL_NETWORKS",
    year: "2024",
    category: "Wellness / Real-time_Care / Backend",
    status: "ACTIVE_DEPLOYMENT",
    stack: "NODE.JS / AGORA / REDIS / ECS",
    nodes: [
      { name: "SYNCHRONOUS_CARE_NODE", desc: "Private 1-on-1 voice and chat communication system using Agora and Socket.io for mental health care." },
      { name: "CONFIDENTIAL_DATA_MESH", desc: "Secure distributed session architecture on Amazon ECS, focusing on HIPAA-compliant confidentiality." },
      { name: "WELLNESS_STABILITY_GRID", desc: "Industrial CI/CD with SonarQube validation ensuring zero-downtime service for 50k+ success stories." }
    ],
    concepts: {
      philosophy: "Transforming high-sensitivity mental and emotional wellness into a safe, real-time digital environment focusing on trust and resiliency.",
      breakdown: "A robust wellness deployment on Amazon ECS, featuring secure voice/chat logic and persistent state synchronization."
    },
    impact: [
       { label: "CARE_SYNCHRONIZATION", val: "ZERO_LATENCY_SYNC" },
       { label: "SESSION_TRUST", val: "CONFIDENTIAL_INDEXED" },
       { label: "SYSTEM_SCALE", val: "50K_CARE_NODES" }
    ],
    images: ["/assets/arikil_main.png", "/assets/hero.png"]
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;
  const project = PROJECTS_DATA[id] || PROJECTS_DATA["PRJ_001"]; // Fallback for demo
  
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-700" ref={containerRef}>
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-[200] flex justify-between items-baseline mix-blend-difference text-white">
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
           <Link href="/" className="font-black tracking-tighter text-2xl uppercase leading-none block">FAWAS</Link>
           {!isMenuOpen && (
              <div className="hidden sm:flex items-center gap-3">
                 <div className="w-1 h-1 rounded-full bg-[#ff4d00]" />
                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">Project_Context</span>
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
             <li className="hover:opacity-100 cursor-pointer transition-all hover:text-[#ff4d00]">Archive</li>
          </ul>
          
          <div className="flex items-center gap-6 md:gap-10">
            <button 
              onClick={() => setIsDark(!isDark)} 
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
         <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none text-foreground">
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
                     <span>SYSTEMS_CONTEXT_ACTIVE</span>
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
                     <span>ENCRYPTED_ID: // FW_26_CTX</span>
                     <span>VERIFICATION: NOMINAL</span>
                  </div>
               </div>
            </div>
         </div>
      </motion.div>

      {/* Project Schematic Layout */}
      <section className="pt-32 md:pt-40 px-6 md:px-24 pb-24 md:pb-32">
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
                    <span className="technical-label opacity-40 text-[8px] block mb-2">IDENTIFIER</span>
                    <span className="font-mono text-sm font-black">{project.id}</span>
                  </div>
                  <div>
                    <span className="technical-label opacity-40 text-[8px] block mb-2">OPERATIONAL_YEAR</span>
                    <span className="font-mono text-sm font-black">{project.year}</span>
                  </div>
                  <div>
                    <span className="technical-label opacity-40 text-[8px] block mb-2">STATUS</span>
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

            <div className="space-y-8 md:space-y-12 pt-8 md:pt-12 border-t border-grid-line">
               <span className="technical-label opacity-40 text-[8px] block mb-2">SYSTEM_IMPACT_METRICS</span>
               {project.impact.map((m: any) => (
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
                   <p className="text-xl md:text-4xl font-light leading-tight tracking-tight">
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
                     {project.nodes.map((node: any, i: number) => (
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
                  <p className="text-lg md:text-2xl font-medium leading-relaxed opacity-80">
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

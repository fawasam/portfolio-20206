"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    };

    const timer = setInterval(updateProgress, 150);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[20000] bg-[#fbfbf7] dark:bg-[#0c0c0c] flex flex-col items-center justify-center p-8 overflow-hidden"
        >
          {/* Decorative Grid for Preloader */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="preloader-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#preloader-grid)" />
            </svg>
          </div>

          <div className="relative flex flex-col items-center gap-12 max-w-md w-full">
            {/* Logo Section */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative flex flex-col items-center"
            >
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none selection:bg-accent relative">
                fawas
                <motion.div 
                   animate={{ opacity: [1, 0, 1] }}
                   transition={{ duration: 0.8, repeat: Infinity }}
                   className="absolute -right-6 bottom-2 w-4 h-8 bg-[#ff4d00]"
                />
              </h1>
              <span className="technical-label mt-4 tracking-[0.6em] text-accent font-black animate-pulse">
                SYSTEMS_ARCHITECT_CORE
              </span>
            </motion.div>

            {/* Progress Section */}
            <div className="w-full space-y-4">
              <div className="flex justify-between items-end technical-label !text-[8px] opacity-60">
                <div className="flex flex-col gap-1">
                  <span>INIT_HANDSHAKE: OK</span>
                  <span>LOAD_MODULE_01: {progress >= 30 ? 'SUCCESS' : 'PENDING'}</span>
                  <span>ESTABLISH_NODE_MESH: {progress >= 70 ? 'SUCCESS' : 'PENDING'}</span>
                </div>
                <span className="text-xl font-black">{progress}%</span>
              </div>
              
              <div className="h-[2px] w-full bg-grid-line relative overflow-hidden">
                <motion.div 
                  className="absolute h-full bg-[#ff4d00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              <div className="flex justify-between items-center technical-label !text-[7px] opacity-30">
                <span>COORD: 12.9716° N, 77.5946° E</span>
                <span>FW_SYSTEMS_v1.0.2</span>
              </div>
            </div>
          </div>

          {/* Tactical Corners */}
          <div className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-[#101010] dark:border-[#f2f2f2] opacity-20" />
          <div className="absolute top-12 right-12 w-8 h-8 border-t-2 border-r-2 border-[#101010] dark:border-[#f2f2f2] opacity-20" />
          <div className="absolute bottom-12 left-12 w-8 h-8 border-b-2 border-l-2 border-[#101010] dark:border-[#f2f2f2] opacity-20" />
          <div className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-[#101010] dark:border-[#f2f2f2] opacity-20" />

          {/* Scrolling Binary background details */}
          <div className="absolute top-0 right-0 h-full w-24 opacity-5 pointer-events-none vertical-text technical-label !text-[6px] overflow-hidden leading-none select-none">
             {Array.from({ length: 40 }).map((_, i) => (
                <div key={`system-bin-${i}`} className="mb-2">1011010101101100101010010110101</div>
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

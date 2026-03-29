"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, User, Briefcase, Home, Zap } from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const actions = [
    { icon: Home, label: "GOTO_TERMINAL", path: "/", shortcut: "H" },
    { icon: User, label: "GOTO_ORIGIN", path: "/about", shortcut: "A" },
    { icon: Briefcase, label: "GOTO_WORK_ARCHIVE", path: "/projects", shortcut: "W" },
    { icon: Zap, label: "GOTO_PROFESSION_ORBIT", path: "/experience", shortcut: "E" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <button 
        aria-label="Close command palette"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-default" 
        onClick={toggle} 
      />
      <div className="relative w-full max-w-lg bg-[#fbfbf7] dark:bg-[#0c0c0c] border-2 border-[#101010] dark:border-[#f2f2f2] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
        <div className="p-4 border-b-2 border-[#101010] dark:border-[#f2f2f2] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ff4d00]" />
          <input
            autoFocus
            className="w-full bg-transparent outline-none text-sm font-mono uppercase tracking-widest placeholder:text-gray-400 dark:placeholder:text-gray-600"
            placeholder="EXECUTE_COMMAND..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] font-mono border border-gray-300 dark:border-gray-700">
            ESC
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {actions
            .filter((a) => a.label.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((action) => (
              <button
                key={action.path}
                onClick={() => {
                  router.push(action.path);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-[#ff4d00] hover:text-white group transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <action.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-widest font-bold">
                    {action.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono opacity-40 group-hover:opacity-100 uppercase tracking-tighter">
                  /{action.path.slice(1) || "home"}
                </span>
              </button>
            ))}
        </div>

        <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] border-t-2 border-dashed border-gray-200 dark:border-gray-800 flex justify-between items-center text-[9px] font-mono text-gray-400">
          <span>SYSTEM_VERSION_1.0.2</span>
          <span className="flex gap-4">
            <span>↑↓_DRIVE</span>
            <span>ENTER_INIT</span>
          </span>
        </div>
      </div>
    </div>
  );
}

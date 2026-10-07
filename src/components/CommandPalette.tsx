"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Hash, Terminal, FileText, Palette, Wifi, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface CommandItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  action: () => void;
}

interface CommandPaletteProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

export default function CommandPalette({ onThemeChange, currentTheme }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pingResult, setPingResult] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
      setQuery("");
      setPingResult(null);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePing = () => {
    setIsPinging(true);
    setPingResult("Pinging edge.cloudflare-nodes.net...");
    
    const latencies = [
      "Reply from 104.16.248.249: time=12ms TTL=64",
      "Reply from 104.16.248.249: time=9ms TTL=64",
      "Reply from 104.16.248.249: time=15ms TTL=64",
      "Ping statistics: 3 packets transmitted, 3 received, 0% packet loss.",
      "rtt min/avg/max = 9/12.0/15 ms"
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < latencies.length) {
        setPingResult((prev) => prev + "\n" + latencies[step]);
        step++;
      } else {
        clearInterval(interval);
        setIsPinging(false);
      }
    }, 400);
  };

  const commands: CommandItem[] = [
    {
      id: "nav-hero",
      name: "Go to Home / Hero",
      description: "Jump to the top screen and architecture overview",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("hero"),
    },
    {
      id: "nav-about",
      name: "Go to About Me",
      description: "Read Sheikh Aman's backstory and career progression",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-skills",
      name: "Go to Core Skills",
      description: "Inspect language, backend, database and distributed systems expertise",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-projects",
      name: "Go to Projects",
      description: "Explore the WhatsApp AI agent, Credain, and wallet platforms",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-design",
      name: "Go to System Design Showcase",
      description: "Analyze architecture flows and backend decisions",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("system-design"),
    },
    {
      id: "nav-experience",
      name: "Go to Experience",
      description: "Check past work timeline",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("experience"),
    },
    {
      id: "nav-contact",
      name: "Go to Contact",
      description: "Get in touch or book a calendar meeting",
      icon: <Hash className="w-4 h-4 text-accent-blue" />,
      category: "Navigation",
      action: () => scrollToSection("contact"),
    },
    {
      id: "theme-obsidian",
      name: "Theme: Obsidian Dark",
      description: "Switch to a minimal, pure black layout (Default)",
      icon: <Palette className="w-4 h-4 text-accent-purple" />,
      category: "Appearance",
      action: () => {
        onThemeChange("obsidian");
        setIsOpen(false);
      },
    },
    {
      id: "theme-navy",
      name: "Theme: Space Navy",
      description: "Switch to a deep space blue accent glow",
      icon: <Palette className="w-4 h-4 text-accent-purple" />,
      category: "Appearance",
      action: () => {
        onThemeChange("navy");
        setIsOpen(false);
      },
    },
    {
      id: "theme-cyberpunk",
      name: "Theme: Cyberpunk Violet",
      description: "Switch to a glowing neon magenta & violet theme",
      icon: <Palette className="w-4 h-4 text-accent-purple" />,
      category: "Appearance",
      action: () => {
        onThemeChange("cyberpunk");
        setIsOpen(false);
      },
    },
    {
      id: "network-ping",
      name: "Run System Ping Diagnostics",
      description: "Simulate a network latency test to API gateway",
      icon: <Wifi className="w-4 h-4 text-accent-cyan" />,
      category: "Diagnostics",
      action: handlePing,
    },
    {
      id: "download-resume",
      name: "Download Professional Resume",
      description: "Obtain Sheikh Aman's full-stack engineer resume PDF",
      icon: <FileText className="w-4 h-4 text-accent-emerald" />,
      category: "Resume",
      action: () => {
        alert("Downloading Resume... (Simulated file download: sheikh-aman-resume.pdf)");
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Group commands by category
  const categories: { [key: string]: CommandItem[] } = {};
  filteredCommands.forEach((cmd) => {
    if (!categories[cmd.category]) {
      categories[cmd.category] = [];
    }
    categories[cmd.category].push(cmd);
  });

  // Flat list for indexing
  const flatFilteredList = filteredCommands;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 transition text-xs text-zinc-400 select-none cursor-pointer"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search actions...</span>
        <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-white/10 bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.15 }}
              ref={containerRef}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0e]/95 shadow-2xl shadow-black/80 flex flex-col font-sans"
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 border-b border-white/5 h-12">
                <Search className="w-5 h-5 text-zinc-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search sections..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-0 outline-none text-sm text-zinc-100 placeholder:text-zinc-500 py-2"
                />
                <span className="text-[10px] bg-zinc-900 border border-white/10 rounded px-1.5 py-0.5 text-zinc-500 font-mono">
                  ESC
                </span>
              </div>

              {/* Ping diagnostic display */}
              {pingResult && (
                <div className="px-4 py-3 bg-[#050507] border-b border-white/5 font-mono text-[11px] text-accent-cyan leading-5 whitespace-pre-wrap select-text relative">
                  {pingResult}
                  {isPinging && (
                    <span className="inline-block w-1.5 h-3.5 bg-accent-cyan ml-1 animate-pulse" />
                  )}
                  <button
                    onClick={() => setPingResult(null)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-300 text-[9px] border border-white/10 rounded px-1"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Commands List */}
              <div className="max-h-[320px] overflow-y-auto p-2 scrollbar-thin">
                {flatFilteredList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-zinc-500 gap-2">
                    <HelpCircle className="w-8 h-8 opacity-45" />
                    <span className="text-xs">No results found. Try search navigation or theme.</span>
                  </div>
                ) : (
                  Object.keys(categories).map((catName) => (
                    <div key={catName}>
                      <div className="px-3 py-1.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                        {catName}
                      </div>
                      {categories[catName].map((cmd) => {
                        // Find the actual index in the flat list for styling selection
                        const flatIdx = flatFilteredList.findIndex((item) => item.id === cmd.id);
                        const isSelected = flatIdx === selectedIndex;
                        return (
                          <div
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              if (cmd.id !== "network-ping") setIsOpen(false);
                            }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-white/[0.06] text-white"
                                : "text-zinc-400 hover:bg-white/[0.02] hover:text-zinc-200"
                            }`}
                          >
                            <div className="shrink-0 p-1 bg-white/[0.03] border border-white/5 rounded">
                              {cmd.icon}
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <span className="text-xs font-medium truncate">{cmd.name}</span>
                              <span className="text-[10px] text-zinc-500 truncate mt-0.5">
                                {cmd.description}
                              </span>
                            </div>
                            {isSelected && (
                              <span className="text-[10px] text-zinc-500 font-mono shrink-0">
                                ↵ Enter
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#08080a] border-t border-white/5 text-[10px] text-zinc-500">
                <div className="flex items-center gap-3">
                  <span>↑↓ to navigate</span>
                  <span>↵ to select</span>
                </div>
                <div>Active: {currentTheme.toUpperCase()}</div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

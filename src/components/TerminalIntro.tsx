"use client";

import React, { useState, useEffect } from "react";
import { Terminal, Shield, Play, ChevronRight, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalIntroProps {
  onComplete: () => void;
}

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const script = [
    { type: "input", text: "ssh guest@amanslab.com" },
    { type: "system", text: "Connecting to amanslab.com:22..." },
    { type: "system", text: "Authenticating guest user... SUCCESS." },
    { type: "system", text: "Initializing secure environment /dev/tty0..." },
    { type: "input", text: "cat identity_config.json" },
    {
      type: "output",
      text: `{
  "engineer": "Sheikh Aman",
  "role": "Senior Full-Stack Engineer",
  "experience": "5+ Years",
  "location": "Birbhum, West Bengal, India (remote)",
  "core_competencies": ["Node.js", "NestJS", "Next.js", "PostgreSQL", "AI agents"],
  "philosophy": "Don't tie your identity to one technology. Learn, adapt, build."
}`,
    },
    { type: "input", text: "init_portfolio_server.sh" },
    { type: "system", text: "Loading system architecture visualization module... [OK]" },
    { type: "system", text: "Binding API Gateway on port 8080... [OK]" },
    { type: "system", text: "Spinning up Queue worker threads... [OK]" },
    { type: "system", text: "Pre-warming distributed Redis caches... [OK]" },
    { type: "system", text: "System health check status: Green (0ms degradation)" },
    { type: "system", text: "Launching Portfolio UI interface..." },
  ];

  useEffect(() => {
    // Check if user already saw the intro in this session
    const hasSeenIntro = sessionStorage.getItem("portfolio-intro-seen");
    if (hasSeenIntro) {
      onComplete();
      return;
    }

    if (sequenceIndex >= script.length) {
      const timer = setTimeout(() => {
        setIsDone(true);
        sessionStorage.setItem("portfolio-intro-seen", "true");
        setTimeout(onComplete, 800); // Wait for fade out animation
      }, 1000);
      return () => clearTimeout(timer);
    }

    const currentItem = script[sequenceIndex];

    if (currentItem.type === "input") {
      let charIdx = 0;
      setCurrentLine("");
      
      const typeInterval = setInterval(() => {
        if (charIdx < currentItem.text.length) {
          setCurrentLine((prev) => prev + currentItem.text[charIdx]);
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setLogs((prev) => [...prev, `guest@aman:~$ ${currentItem.text}`]);
            setCurrentLine("");
            setSequenceIndex((prev) => prev + 1);
          }, 400);
        }
      }, 50);

      return () => clearInterval(typeInterval);
    } else {
      // System output / normal speed
      const printDelay = currentItem.type === "output" ? 800 : 250;
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, currentItem.text]);
        setSequenceIndex((prev) => prev + 1);
      }, printDelay);

      return () => clearTimeout(timer);
    }
  }, [sequenceIndex]);

  const handleSkip = () => {
    sessionStorage.setItem("portfolio-intro-seen", "true");
    setIsDone(true);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#09090b] flex items-center justify-center p-4 font-mono select-none"
        >
          {/* Animated Background Grids */}
          <div className="absolute inset-0 tech-grid opacity-10" />
          <div className="absolute top-0 left-0 w-full h-full radial-glow-purple pointer-events-none" />

          {/* Terminal Box */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-2xl h-[450px] rounded-xl border border-white/10 bg-black/80 backdrop-blur-md overflow-hidden flex flex-col shadow-2xl shadow-accent-purple-glow relative terminal-scanline"
          >
            {/* Top Bar */}
            <div className="h-10 border-b border-white/10 flex items-center justify-between px-4 bg-[#0d0d11] shrink-0">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-accent-purple" />
                <span className="text-xs text-zinc-400 font-semibold tracking-wider">SHEIKH-AMAN-TERMINAL // PORTFOLIO</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/5" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent-purple/40 border border-accent-purple/60" />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 text-xs leading-5 text-zinc-300 scrollbar-thin">
              {logs.map((log, idx) => {
                if (log.startsWith("guest@aman:~$")) {
                  return (
                    <div key={idx} className="flex items-start gap-1">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-accent-purple shrink-0" />
                      <span className="text-zinc-100">{log}</span>
                    </div>
                  );
                }
                if (log.startsWith("{")) {
                  return (
                    <pre key={idx} className="text-accent-cyan bg-zinc-950/50 p-3 rounded-lg border border-white/5 overflow-x-auto select-text font-mono text-[11px] leading-relaxed">
                      {log}
                    </pre>
                  );
                }
                return (
                  <div key={idx} className="text-zinc-400">
                    {log}
                  </div>
                );
              })}

              {/* Typing Line */}
              {sequenceIndex < script.length && script[sequenceIndex].type === "input" && (
                <div className="flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                  <span className="text-zinc-100 font-medium">guest@aman:~$ </span>
                  <span className="text-white font-medium">{currentLine}</span>
                  <span className="w-1.5 h-4 bg-white animate-pulse" />
                </div>
              )}
            </div>

            {/* Footer with Skip Info */}
            <div className="h-10 border-t border-white/5 bg-[#09090c] px-4 flex items-center justify-between text-[10px] text-zinc-500 shrink-0">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent-purple" />
                <span>Security audit passed. SSE-256 enabled.</span>
              </div>
              <button
                onClick={handleSkip}
                className="flex items-center gap-1 px-2 py-1 bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:text-white transition rounded cursor-pointer"
              >
                <span>Skip boot sequence</span>
                <kbd className="bg-zinc-900 border border-white/10 rounded px-1 ml-0.5">ESC</kbd>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

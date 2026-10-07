"use client";

import React, { useState } from "react";
import { Bot, Code2, Server, Database, Network, Link, Terminal } from "lucide-react";

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  skills: string[];
  // Where the skills were used, shown when the card is focused.
  note: string;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      id: "backend",
      name: "Backend Core",
      icon: <Server className="w-5 h-5 text-accent-purple" />,
      colorClass: "border-accent-purple/20 hover:border-accent-purple/40 shadow-accent-purple/5",
      skills: ["Node.js", "NestJS", "ExpressJS", "TypeScript", "REST APIs"],
      note: "Backend since 2020, from J&F to Finanshels today.",
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: <Code2 className="w-5 h-5 text-accent-blue" />,
      colorClass: "border-accent-blue/20 hover:border-accent-blue/40 shadow-accent-blue/5",
      skills: ["Next.js", "React", "TanStack Query", "shadcn/ui", "Tailwind CSS"],
      note: "Went full-stack in 2024. First blocker: a Next.js hydration error.",
    },
    {
      id: "ai",
      name: "AI & Agents",
      icon: <Bot className="w-5 h-5 text-accent-emerald" />,
      colorClass: "border-accent-emerald/20 hover:border-accent-emerald/40 shadow-accent-emerald/5",
      skills: ["Claude API", "LLM Applications", "Agent Workflows", "WhatsApp automation (WATI)"],
      note: "Internal AI agents at Finanshels and a WhatsApp sales agent of my own.",
    },
    {
      id: "data",
      name: "Data & Messaging",
      icon: <Database className="w-5 h-5 text-accent-cyan" />,
      colorClass: "border-accent-cyan/20 hover:border-accent-cyan/40 shadow-accent-cyan/5",
      skills: ["PostgreSQL", "TypeORM", "Redis", "RabbitMQ"],
      note: "RabbitMQ event architecture at Credain, Redis-backed chat state in my agent.",
    },
    {
      id: "architecture",
      name: "Architecture & Cloud",
      icon: <Network className="w-5 h-5 text-yellow-500" />,
      colorClass: "border-yellow-500/20 hover:border-yellow-500/40 shadow-yellow-500/5",
      skills: ["Backend Architecture", "Distributed Systems", "Event-Driven Design", "AWS Lambda"],
      note: "Founding-engineer architecture calls at Finanshels; EVM chains load-tested to 10K+ TPS.",
    },
    {
      id: "blockchain",
      name: "Earlier: Blockchain",
      icon: <Link className="w-5 h-5 text-pink-500" />,
      colorClass: "border-pink-500/20 hover:border-pink-500/40 shadow-pink-500/5",
      skills: ["Solidity", "Smart Contract Auditing", "EVM Chains", "ERC-4337", "Ethers.js"],
      note: "2021 to 2025: audits at Rapid Innovation, account abstraction at Credain, wallets at Bowled.io.",
    },
  ];

  return (
    <section id="skills" className="py-24 bg-[#09090b] relative overflow-hidden border-t border-white/5">
      {/* Background Grids */}
      <div className="absolute inset-0 tech-grid opacity-[0.03]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] radial-glow-blue pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-cyan uppercase">
            // Core Competencies
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            My Technical Arsenal
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Backend depth, a full-stack range, and the AI work I am doing now. Blockchain is where I have been, not where I am headed.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const isFocused = activeCategory === cat.id;
            const hasFocusActive = activeCategory !== null;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`glass-card p-6 rounded-xl border flex flex-col justify-between min-h-[240px] shadow-lg relative overflow-hidden transition-all duration-300 ${cat.colorClass} ${
                  hasFocusActive && !isFocused ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"
                }`}
              >
                {/* Glowing subtle card background on hover */}
                {isFocused && (
                  <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
                )}

                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/[0.03] border border-white/5 rounded-lg">
                      {cat.icon}
                    </div>
                    <h4 className="font-mono text-sm font-bold text-white tracking-wide">
                      {cat.name}
                    </h4>
                  </div>

                  {/* Skills Mini List / Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {cat.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.06] text-zinc-300 hover:text-white px-2 py-0.5 rounded transition duration-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-start gap-2 text-[11px] font-mono leading-relaxed">
                  <Terminal className="w-3.5 h-3.5 mt-0.5 shrink-0 text-zinc-500" />
                  <span className={isFocused ? "text-zinc-300" : "text-zinc-500"}>{cat.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

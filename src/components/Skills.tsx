"use client";

import React, { useState } from "react";
import { Code2, Server, Database, Cloud, Network, Link, Terminal, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  skills: { name: string; level: number }[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories: SkillCategory[] = [
    {
      id: "languages",
      name: "Programming Languages",
      icon: <Code2 className="w-5 h-5 text-accent-blue" />,
      colorClass: "border-accent-blue/20 hover:border-accent-blue/40 shadow-accent-blue/5",
      skills: [
        { name: "JavaScript", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "SQL (PostgreSQL)", level: 85 },
        { name: "Solidity", level: 80 },
      ],
    },
    {
      id: "backend",
      name: "Backend Core",
      icon: <Server className="w-5 h-5 text-accent-purple" />,
      colorClass: "border-accent-purple/20 hover:border-accent-purple/40 shadow-accent-purple/5",
      skills: [
        { name: "Node.js", level: 95 },
        { name: "NestJS", level: 90 },
        { name: "ExpressJS", level: 92 },
        { name: "REST / GraphQL APIs", level: 95 },
        { name: "Auth (OAuth, JWT, Session)", level: 90 },
        { name: "Microservices Architecture", level: 85 },
      ],
    },
    {
      id: "databases",
      name: "Databases & Storage",
      icon: <Database className="w-5 h-5 text-accent-cyan" />,
      colorClass: "border-accent-cyan/20 hover:border-accent-cyan/40 shadow-accent-cyan/5",
      skills: [
        { name: "PostgreSQL", level: 90 },
        { name: "TypeORM", level: 88 },
        { name: "Redis Cache & Pub/Sub", level: 90 },
        { name: "MongoDB", level: 85 },
      ],
    },
    {
      id: "cloud",
      name: "Cloud & DevOps",
      icon: <Cloud className="w-5 h-5 text-accent-emerald" />,
      colorClass: "border-accent-emerald/20 hover:border-accent-emerald/40 shadow-accent-emerald/5",
      skills: [
        { name: "AWS (EC2, Lambda, S3, RDS)", level: 80 },
        { name: "Docker", level: 85 },
        { name: "CI/CD Pipelines", level: 80 },
        { name: "Nginx Server", level: 85 },
        { name: "Reverse Proxy & Load Balancing", level: 85 },
      ],
    },
    {
      id: "distributed",
      name: "Distributed Systems",
      icon: <Network className="w-5 h-5 text-yellow-500" />,
      colorClass: "border-yellow-500/20 hover:border-yellow-500/40 shadow-yellow-500/5",
      skills: [
        { name: "Event-driven architecture", level: 90 },
        { name: "Message Queues (RabbitMQ)", level: 85 },
        { name: "Rate Limiting & Throttling", level: 90 },
        { name: "Horizontal Scaling Models", level: 80 },
        { name: "Consistent Hashing & Caching", level: 85 },
      ],
    },
    {
      id: "blockchain",
      name: "Blockchain Infrastructure",
      icon: <Link className="w-5 h-5 text-pink-500" />,
      colorClass: "border-pink-500/20 hover:border-pink-500/40 shadow-pink-500/5",
      skills: [
        { name: "Smart Contracts (EVM)", level: 85 },
        { name: "ERC-4337 Account Abstraction", level: 80 },
        { name: "Custom Bundlers & Paymasters", level: 75 },
        { name: "Wallet Infrastructure (Bowled)", level: 85 },
      ],
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
            Hover over a card to focus on its specifics. Designed for building robust, high-performance backends.
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
                className={`glass-card p-6 rounded-xl border flex flex-col justify-between h-[320px] shadow-lg relative overflow-hidden transition-all duration-300 ${cat.colorClass} ${
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
                    {cat.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-white/[0.03] border border-white/5 hover:border-white/10 hover:bg-white/[0.06] text-zinc-300 hover:text-white px-2 py-0.5 rounded transition duration-200"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Level indicators shown when category is hovered */}
                <div className="mt-4 pt-4 border-t border-white/5 space-y-2.5">
                  {isFocused ? (
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                        <span>TECHNOLOGY</span>
                        <span>PROFICIENCY</span>
                      </div>
                      <div className="space-y-1.5">
                        {cat.skills.slice(0, 3).map((s, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex justify-between text-[10px] font-mono text-zinc-300">
                              <span>{s.name}</span>
                              <span>{s.level}%</span>
                            </div>
                            <div className="h-1 bg-white/[0.04] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${s.level}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Hover card for engine specifications...</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Terminal, Calendar, Code2, Server, Award, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "timeline">("story");

  const timelineEvents = [
    {
      year: "2020 - 2021",
      title: "Software Developer & Engineer",
      subtitle: "J&F Noida",
      desc: "Engineered key HRMS modules and Course Taking systems. Automated backend workflows using AWS Lambda and PostgreSQL database management.",
      icon: <Code2 className="w-4 h-4 text-accent-blue" />,
    },
    {
      year: "2021 - 2024",
      title: "Blockchain Developer & Auditor",
      subtitle: "Rapid Innovation",
      desc: "Audited smart contracts and developed staking systems (Kaldi Market). Implemented robust testing modules securing blockchain applications.",
      icon: <Award className="w-4 h-4 text-accent-purple" />,
    },
    {
      year: "2024 - 2025",
      title: "Senior Software Developer & Wallet Infra",
      subtitle: "Credain / Bowled.io",
      desc: "Architected blockchain banking platforms on Avalanche Subnets and custodial wallet integrations for Bowled.io (10k+ wallets created).",
      icon: <Server className="w-4 h-4 text-accent-cyan" />,
    },
    {
      year: "2025 - Present",
      title: "Full-Stack Developer",
      subtitle: "Finanshels.com",
      desc: "Developing financial platforms and end-to-end full-stack features using NestJS, Next.js, and PostgreSQL.",
      icon: <Terminal className="w-4 h-4 text-accent-emerald" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/2 left-0 w-80 h-80 radial-glow-purple pointer-events-none opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 radial-glow-cyan pointer-events-none opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-purple uppercase">
            // About Sheikh Aman
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Systems for Extreme Reliability
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A developer who focuses on systemic design, clean database topologies, and robust message queuing rather than generic visual designs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Side: Professional Profile Photo */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-sm aspect-[4/5] rounded-2xl border border-white/10 bg-white/[0.01] backdrop-blur-sm overflow-hidden relative group shadow-2xl shadow-black/80">
              {/* Spinning particle line behind the image just at the edges */}
              <div className="absolute inset-0 tech-grid opacity-[0.08]" />
              
              {/* Profile Image */}
              <img
                src="/profile.jpg"
                alt="Sheikh Aman"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-102 group-hover:scale-100"
              />
              
              {/* Dark Overlay gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-transparent to-transparent opacity-80" />
              
              {/* Scanning terminal line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-accent-blue opacity-0 group-hover:opacity-40 animate-scanline pointer-events-none" />

              {/* Status and Identity Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-zinc-400 z-10">
                <span>IDENTITY: SHEIKH AMAN</span>
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                  SYS_ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Narrative and Interactive Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-white/5 pb-px">
              <button
                onClick={() => setActiveTab("story")}
                className={`pb-3 text-xs font-mono font-semibold uppercase tracking-wider relative cursor-pointer mr-8 ${
                  activeTab === "story" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Story
                {activeTab === "story" && (
                  <motion.div
                    layoutId="about-tab-active"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-purple"
                  />
                )}
              </button>

              <button
                onClick={() => setActiveTab("timeline")}
                className={`pb-3 text-xs font-mono font-semibold uppercase tracking-wider relative cursor-pointer ${
                  activeTab === "timeline" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Progression Timeline
                {activeTab === "timeline" && (
                  <motion.div
                    layoutId="about-tab-active"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-purple"
                  />
                )}
              </button>
            </div>

            {/* Content Display */}
            <div className="flex-1">
              {activeTab === "story" ? (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 font-sans text-sm text-zinc-300 leading-relaxed"
                >
                  <p>
                    I am a Full-Stack Engineer with over 5 years of experience building scalable backend systems and modern web platforms. My core expertise lies in designing reliable and high-performance applications using NestJS, Next.js, Node.js, and PostgreSQL.
                  </p>
                  <p>
                    From auditing smart contracts on EVM to engineering custodial wallet structures for gaming ecosystems processing thousands of secure operations, I focus on clean backend architecture, system design, database performance (TypeORM, SQL), and building products that sustain real transaction volumes.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-xs font-mono">// SPECIALIZATION</h4>
                      <ul className="text-zinc-400 space-y-1.5 text-xs">
                        <li className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-accent-blue" />
                          Distributed System Routing
                        </li>
                        <li className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-accent-blue" />
                          Custodial Wallet Security
                        </li>
                        <li className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-accent-blue" />
                          Smart Contract Audits
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-xs font-mono">// INTERESTS</h4>
                      <ul className="text-zinc-400 space-y-1.5 text-xs">
                        <li className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-accent-purple" />
                          Horizontal Scaling Models
                        </li>
                        <li className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-accent-purple" />
                          Eventual Consistency Issues
                        </li>
                        <li className="flex items-center gap-1.5">
                          <ChevronRight className="w-3.5 h-3.5 text-accent-purple" />
                          High-tech Startups
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="relative border-l border-white/10 pl-6 space-y-8 py-2">
                    {timelineEvents.map((event, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <div className="absolute -left-[35px] top-1.5 w-4.5 h-4.5 rounded-full bg-[#09090b] border border-white/10 flex items-center justify-center">
                          {event.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="text-[10px] font-mono bg-white/[0.04] border border-white/5 text-zinc-400 px-1.5 py-0.5 rounded">
                              {event.year}
                            </span>
                            <h4 className="text-sm font-semibold text-white">
                              {event.title}
                            </h4>
                            <span className="text-xs text-zinc-500 font-mono">
                              @ {event.subtitle}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                            {event.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

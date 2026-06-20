"use client";

import React, { useState } from "react";
import { FolderGit2, Calendar, ShieldCheck, ArrowUpRight, FileSpreadsheet, Eye, X, Network, Cpu, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  diagram: React.ReactNode;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: "credain",
      title: "Credain Banking Platform",
      description: "Built blockchain-powered banking infrastructure on an Avalanche subnet to handle secure, fast token settlements.",
      impact: "Designed secure banking transactions and high-speed settlement systems, integrating smart wallets.",
      tech: ["Solidity", "Avalanche Subnet", "ERC-4337", "NestJS", "PostgreSQL", "RabbitMQ"],
      features: [
        "ERC-4337 smart account abstraction for gasless user onboarding",
        "Custom blockchain bundler for batch transaction processing",
        "Custom paymaster supporting gas fee sponsorship in native tokens",
        "Event-driven architecture with RabbitMQ syncing blockchain transactions to SQL",
      ],
      githubUrl: "https://github.com/amansk2050",
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          {/* Grids and flows */}
          <rect width="400" height="240" rx="12" fill="#0d0d12" />
          <path d="M 60,120 L 140,80 M 60,120 L 140,160 M 140,80 L 250,80 M 140,160 L 250,160 M 250,80 L 330,120 M 250,160 L 330,120" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          
          {/* Animated path packets */}
          <path d="M 60,120 L 140,80 L 250,80 L 330,120" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8 6" className="animate-flow" />
          <path d="M 60,120 L 140,160 L 250,160 L 330,120" stroke="#a855f7" strokeWidth="2" strokeDasharray="8 6" className="animate-flow" />
          
          {/* Nodes */}
          <circle cx="60" cy="120" r="15" className="fill-[#09090b] stroke-accent-blue" strokeWidth="2" />
          <text x="60" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Client</text>

          <circle cx="140" cy="80" r="15" className="fill-[#09090b] stroke-accent-purple" strokeWidth="2" />
          <text x="140" y="83" textAnchor="middle" className="fill-white font-mono text-[9px]">API</text>

          <circle cx="140" cy="160" r="15" className="fill-[#09090b] stroke-accent-cyan" strokeWidth="2" />
          <text x="140" y="163" textAnchor="middle" className="fill-white font-mono text-[9px]">Bundler</text>

          <circle cx="250" cy="80" r="15" className="fill-[#09090b] stroke-accent-emerald" strokeWidth="2" />
          <text x="250" y="83" textAnchor="middle" className="fill-white font-mono text-[9px]">Queue</text>

          <circle cx="250" cy="160" r="15" className="fill-[#09090b] stroke-pink-500" strokeWidth="2" />
          <text x="250" y="163" textAnchor="middle" className="fill-white font-mono text-[8px]">AVAX VM</text>

          <circle cx="330" cy="120" r="15" className="fill-[#09090b] stroke-yellow-500" strokeWidth="2" />
          <text x="330" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">DB</text>

          {/* Titles */}
          <text x="20" y="25" className="fill-zinc-500 font-mono text-[9px]">CREDAIN NET_TOPOLOGY</text>
        </svg>
      ),
    },
    {
      id: "wallet",
      title: "Custodial Wallet for Bowled.io",
      description: "Designed a centralized custodian wallet platform managing digital assets for thousands of active Web3 mobile gamers.",
      impact: "Successfully created over 10,000 active smart-wallets with zero transaction security failures.",
      tech: ["Node.js", "ExpressJS", "PostgreSQL", "Cryptography", "AWS KMS", "Web3.js"],
      features: [
        "Seamless fiat-to-token & token-to-fiat conversion hooks",
        "Hardware security module (HSM) key isolation with AWS KMS",
        "Gas-optimized batch wallet creation queries in Postgres",
        "Cryptographic signature generation and transaction broadcast pools",
      ],
      githubUrl: "https://github.com/amansk2050",
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          <rect width="400" height="240" rx="12" fill="#0d0d12" />
          <path d="M 60,120 L 150,120 M 150,120 L 250,70 M 150,120 L 250,170 M 250,70 L 340,120 M 250,170 L 340,120" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path d="M 60,120 L 150,120 L 250,70 L 340,120" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" className="animate-flow" />
          <path d="M 150,120 L 250,170 L 340,120" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" className="animate-flow" />

          <circle cx="60" cy="120" r="16" className="fill-[#09090b] stroke-accent-blue" strokeWidth="2" />
          <text x="60" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Mobile</text>

          <circle cx="150" cy="120" r="16" className="fill-[#09090b] stroke-accent-purple" strokeWidth="2" />
          <text x="150" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">API GW</text>

          <circle cx="250" cy="70" r="16" className="fill-[#09090b] stroke-accent-emerald" strokeWidth="2" />
          <text x="250" y="73" textAnchor="middle" className="fill-white font-mono text-[8px]">AWS KMS</text>

          <circle cx="250" cy="170" r="16" className="fill-[#09090b] stroke-pink-500" strokeWidth="2" />
          <text x="250" y="173" textAnchor="middle" className="fill-white font-mono text-[8px]">Signer</text>

          <circle cx="340" cy="120" r="16" className="fill-[#09090b] stroke-yellow-500" strokeWidth="2" />
          <text x="340" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Chain</text>

          <text x="20" y="25" className="fill-zinc-500 font-mono text-[9px]">CUSTODIAL_WALLET_FLOW</text>
        </svg>
      ),
    },
    {
      id: "school",
      title: "School Management SaaS",
      description: "An enterprise-grade SaaS system hosting registration, dynamic exam evaluation, and asset handling.",
      impact: "Optimized complex multi-tenant query layers to scale comfortably under peak enrollment cycles.",
      tech: ["NestJS", "PostgreSQL", "AWS Lambda", "S3", "Docker", "REST API"],
      features: [
        "Dynamic course module engines with recursive table structures",
        "Automated grading reports utilizing distributed background workers",
        "Serverless asset uploading pipelines via AWS Lambda & S3 presigned URLs",
        "PostgreSQL query caching mechanisms to reduce standard database overhead",
      ],
      githubUrl: "https://github.com/amansk2050",
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          <rect width="400" height="240" rx="12" fill="#0d0d12" />
          <path d="M 60,120 L 150,120 M 150,120 L 250,70 M 150,120 L 250,170 M 250,70 L 340,70 M 250,170 L 340,170" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path d="M 60,120 L 150,120 L 250,70 L 340,70" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="7 5" className="animate-flow" />
          <path d="M 150,120 L 250,170 L 340,170" stroke="#3b82f6" strokeWidth="2" strokeDasharray="7 5" className="animate-flow" />

          <circle cx="60" cy="120" r="16" className="fill-[#09090b] stroke-accent-blue" strokeWidth="2" />
          <text x="60" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Tenant</text>

          <circle cx="150" cy="120" r="16" className="fill-[#09090b] stroke-accent-purple" strokeWidth="2" />
          <text x="150" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Nest App</text>

          <circle cx="250" cy="70" r="16" className="fill-[#09090b] stroke-accent-cyan" strokeWidth="2" />
          <text x="250" y="73" textAnchor="middle" className="fill-white font-mono text-[8px]">Lambda</text>

          <circle cx="250" cy="170" r="16" className="fill-[#09090b] stroke-accent-emerald" strokeWidth="2" />
          <text x="250" y="173" textAnchor="middle" className="fill-white font-mono text-[9px]">Postgres</text>

          <circle cx="340" cy="70" r="16" className="fill-[#09090b] stroke-pink-500" strokeWidth="2" />
          <text x="340" y="73" textAnchor="middle" className="fill-white font-mono text-[9px]">S3 Buck</text>

          <circle cx="340" cy="170" r="16" className="fill-[#09090b] stroke-yellow-500" strokeWidth="2" />
          <text x="340" y="173" textAnchor="middle" className="fill-white font-mono text-[9px]">Cache</text>

          <text x="20" y="25" className="fill-zinc-500 font-mono text-[9px]">SAAS_TENANT_ARCHITECTURE</text>
        </svg>
      ),
    },
    {
      id: "traveltech",
      title: "TravelTech Operations Platform",
      description: "A specialized SaaS product built to handle tour routing, scheduling, booking lifecycles, and vendor APIs.",
      impact: "Provides automated schedule synchronization, reducing manual updates by 80%.",
      tech: ["Node.js", "ExpressJS", "MongoDB", "Nginx", "Third-party APIs", "Cron Scheduler"],
      features: [
        "Distributed trip booking models supporting eventual transaction confirmation",
        "Third-party flight/hotel API wrappers with fault-tolerant fallback layers",
        "Real-time customer communication relays connected to SMS and Email queues",
        "Vendor invoice validation scheduler executing on isolated Docker runtimes",
      ],
      githubUrl: "https://github.com/amansk2050",
      diagram: (
        <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto">
          <rect width="400" height="240" rx="12" fill="#0d0d12" />
          <path d="M 60,120 L 150,120 M 150,120 L 250,70 M 150,120 L 250,170 M 250,70 L 340,120 M 250,170 L 340,120" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <path d="M 60,120 L 150,120 L 250,70 L 340,120" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6 4" className="animate-flow" />
          <path d="M 150,120 L 250,170 L 340,120" stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" className="animate-flow" />

          <circle cx="60" cy="120" r="16" className="fill-[#09090b] stroke-accent-blue" strokeWidth="2" />
          <text x="60" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Broker</text>

          <circle cx="150" cy="120" r="16" className="fill-[#09090b] stroke-accent-purple" strokeWidth="2" />
          <text x="150" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Nginx</text>

          <circle cx="250" cy="70" r="16" className="fill-[#09090b] stroke-yellow-500" strokeWidth="2" />
          <text x="250" y="73" textAnchor="middle" className="fill-white font-mono text-[8px]">Vendor</text>

          <circle cx="250" cy="170" r="16" className="fill-[#09090b] stroke-red-500" strokeWidth="2" />
          <text x="250" y="173" textAnchor="middle" className="fill-white font-mono text-[8px]">TaskQ</text>

          <circle cx="340" cy="120" r="16" className="fill-[#09090b] stroke-accent-emerald" strokeWidth="2" />
          <text x="340" y="123" textAnchor="middle" className="fill-white font-mono text-[9px]">Mongo</text>

          <text x="20" y="25" className="fill-zinc-500 font-mono text-[9px]">TRAVELTECH_SCHEDULER_FLOW</text>
        </svg>
      ),
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] radial-glow-purple pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-purple uppercase">
            // Technical Showcases
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Production-grade Architectures
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Click "Topology View" on any project to inspect its custom distributed backend architecture diagram and structural decisions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card p-8 rounded-xl border flex flex-col justify-between h-[360px] group shadow-xl relative overflow-hidden"
            >
              {/* Card top details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-white/[0.03] border border-white/5 rounded-lg group-hover:border-white/10 transition-colors">
                    <FolderGit2 className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-[10px] font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Network className="w-3.5 h-3.5" />
                      <span>Topology View</span>
                    </button>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 text-zinc-400 hover:text-white transition"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Card bottom details */}
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tech.slice(0, 4).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-mono bg-white/[0.03] border border-white/5 text-zinc-400 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                  {proj.tech.length > 4 && (
                    <span className="text-[9px] font-mono bg-white/[0.03] border border-white/5 text-zinc-500 px-1.5 py-0.5 rounded">
                      +{proj.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
                  <span className="truncate">{proj.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topology Architecture Diagram Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl bg-[#0c0c0f] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto z-10"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-accent-blue">// ARCHITECTURE TOPOLOGY</div>
                  <h3 className="text-xl font-extrabold text-white">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06] transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Custom interactive SVG diagram */}
              <div className="border border-white/5 rounded-xl bg-black/40 overflow-hidden shrink-0">
                {selectedProject.diagram}
              </div>

              {/* Core Features & System Breakdown */}
              <div className="space-y-4">
                <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent-purple" />
                  <span>Subsystem Specifications</span>
                </h4>
                
                <ul className="space-y-3">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Badges */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  STACK_DEPENDENCY_GRAPH
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-white/[0.04] border border-white/5 text-zinc-300 px-2.5 py-1 rounded-lg"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

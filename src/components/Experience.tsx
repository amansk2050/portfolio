"use client";

import React from "react";
import { Briefcase, Calendar, Star, ShieldAlert, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string[];
  skills: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      role: "Full-stack Developer",
      company: "Finanshels.com",
      duration: "May 2025 - Present",
      description: [
        "Developing core SaaS financial management features and backend workflows with NestJS.",
        "Building modern full-stack web platforms and customer user interfaces with Next.js, React, and Tailwind CSS.",
        "Optimizing data layers with PostgreSQL and TypeORM schemas to sustain heavy business transaction scopes.",
      ],
      skills: ["NestJS", "Next.js", "React", "PostgreSQL", "TypeORM", "Node.js"],
    },
    {
      role: "Senior Software Developer",
      company: "Credain",
      duration: "March 2024 - April 2025",
      description: [
        "Architected a blockchain-based banking platform on an Avalanche Subnet, enhancing transaction efficiency and reducing processing time by 30%.",
        "Implemented ERC-4337 with a custom bundler for seamless, gasless transactions, improving user onboarding and engagement rates.",
        "Developed a blockchain-driven event architecture using RabbitMQ, enabling real-time data synchronization and reducing event processing latency.",
        "Optimized performance and conducted load testing for EVM-based chains, supporting 10K+ transactions per second without compromising reliability.",
        "Led a cross-functional team, ensuring robust API development with ExpressJS and smart contract interactions via Ethers.js.",
      ],
      skills: ["Solidity", "Avalanche Subnet", "ERC-4337", "RabbitMQ", "ExpressJS", "Ethers.js"],
    },
    {
      role: "Blockchain Developer",
      company: "Bowled.io",
      duration: "March 2024 - July 2024",
      description: [
        "Developed a custodial wallet system for game players, enabling seamless buying and conversion of Bowled tokens with fiat currency.",
        "Integrated secure on-ramp and off-ramp solutions, supporting over 10,000 wallet creations without security breaches or downtime.",
        "Streamlined transaction workflows, reducing token purchase time by 25% and enhancing the overall user experience.",
        "Ensured high-level security protocols for fiat-to-crypto transactions, maintaining compliance with regulatory standards.",
        "Collaborated with product and engineering teams to enhance wallet features and optimize performance.",
      ],
      skills: ["Node.js", "Wallet Infrastructure", "Fiat Gateways", "Web3 Integration", "Security Auditing"],
    },
    {
      role: "Blockchain Developer And Auditor",
      company: "Rapid Innovation",
      duration: "September 2021 - February 2024",
      description: [
        "Audited EVM-based smart contracts, identifying critical vulnerabilities and implementing security enhancements to prevent potential breaches.",
        "Developed Kaldi Market's multi-tier staking system, increasing user retention by 25% through innovative reward distribution strategies.",
        "Enhanced dynamic testing modules, ensuring code reliability and security compliance across blockchain applications.",
        "Collaborated with cross-functional teams to deliver secure, scalable blockchain solutions aligned with client requirements.",
      ],
      skills: ["Solidity", "Smart Contracts", "EVM", "Security Auditing", "Testing Engines"],
    },
    {
      role: "Software Developer & Engineer",
      company: "J&F",
      duration: "November 2020 - October 2021",
      description: [
        "Engineered key HRMS modules, including a Course Taking System, enabling 1,000+ users to enroll and track progress seamlessly.",
        "Designed a dynamic Test Module with randomized question algorithms, improving assessment fairness and accuracy.",
        "Utilized PostgreSQL for efficient data management, ensuring fast, reliable access to course and test data.",
        "Automated backend workflows using AWS Lambda, enhancing processing speed and reducing manual intervention.",
        "Collaborated with frontend teams to deliver user-centric features, improving overall product usability.",
      ],
      skills: ["JavaScript", "SQL", "PostgreSQL", "AWS Lambda", "Node.js"],
    },
  ];

  return (
    <section id="experience" className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="absolute top-1/4 right-1/3 w-80 h-80 radial-glow-blue pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-blue uppercase">
            // Professional Progression
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Work Experience
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A history of building scalable web apps, financial pipelines, and secure cryptographic tools.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-white/5 pl-6 sm:pl-8 space-y-12 max-w-4xl mx-auto py-2">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Icon Indicator */}
              <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#09090b] border border-white/10 flex items-center justify-center text-zinc-400 group-hover:border-accent-blue group-hover:text-white transition duration-300">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Box Info */}
              <div className="glass-card p-6 sm:p-8 rounded-xl border space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-accent-blue transition-colors">
                      {exp.role}
                    </h4>
                    <span className="text-xs text-zinc-400 font-mono">
                      {exp.company}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.03] border border-white/5 rounded-full text-[10px] text-zinc-500 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-zinc-400 text-xs sm:text-sm font-sans leading-relaxed">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-purple mt-2 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {exp.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] font-mono bg-white/[0.02] border border-white/5 text-zinc-400 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

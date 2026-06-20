"use client";

import React from "react";
import { BookOpen, Calendar, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

interface BlogTopic {
  title: string;
  category: string;
  description: string;
  readTime: string;
}

export default function Blog() {
  const topics: BlogTopic[] = [
    {
      title: "Designing Idempotency Keys in Distributed Payment Gateways",
      category: "Distributed Systems",
      description: "How to avoid double-charging scenarios across multiple payment nodes, database retries, and network delays.",
      readTime: "8 min read",
    },
    {
      title: "Decoupling State Synchronization with Transactional Outbox Pattern",
      category: "System Design",
      description: "Writing atomic transactional data updates while safely notifying external message queue brokers without failure.",
      readTime: "6 min read",
    },
    {
      title: "Solidity Auditing: Eliminating Logic Edge-cases in Smart Contracts",
      category: "Blockchain",
      description: "A summary of reentrancy vectors, flash loan attack surfaces, and rounding errors found in real-world decentralized protocols.",
      readTime: "10 min read",
    },
    {
      title: "Scaling Express and NestJS APIs to 10k Requests Per Second",
      category: "Backend Engineering",
      description: "Implementing connection pooling, memory caching policies, and reverse proxy layers with Nginx.",
      readTime: "7 min read",
    },
  ];

  return (
    <section className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 radial-glow-blue pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-cyan uppercase">
            // Knowledge Sharing
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering Logs & Notebooks
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Writing about complex system patterns, memory optimization, and security audits.
          </p>
        </div>

        {/* Blog topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((t, idx) => (
            <div
              key={idx}
              className="glass-card p-6 sm:p-8 rounded-xl border flex flex-col justify-between h-[240px] group shadow-xl relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono bg-white/[0.04] border border-white/5 text-accent-cyan px-2 py-0.5 rounded">
                    {t.category}
                  </span>
                  
                  {/* Glowing Coming Soon Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-semibold tracking-wider uppercase bg-accent-purple/10 text-accent-purple border border-accent-purple/20 shadow-lg shadow-accent-purple-glow">
                    <span className="w-1 h-1 rounded-full bg-accent-purple animate-pulse" />
                    Coming Soon
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-bold text-white group-hover:text-accent-cyan transition-colors line-clamp-2">
                    {t.title}
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans line-clamp-2">
                    {t.description}
                  </p>
                </div>
              </div>

              {/* Bottom detail */}
              <div className="border-t border-white/5 pt-4 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t.readTime}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <span>Pending deployment</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

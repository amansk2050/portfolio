"use client";

import React, { useState } from "react";
import { Cpu, RefreshCw, Zap, Server, Database, ShieldAlert, ArrowRight, Play, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SystemStage {
  id: string;
  name: string;
  role: string;
  failureMode: string;
  mitigation: string;
}

interface Architecture {
  id: string;
  title: string;
  description: string;
  flowColor: string;
  stages: SystemStage[];
}

export default function SystemDesignShowcase() {
  const [activeArchId, setActiveArchId] = useState("payment");
  const [selectedStageIdx, setSelectedStageIdx] = useState(0);

  const architectures: Architecture[] = [
    {
      id: "payment",
      title: "Distributed Payments System",
      description: "A double-entry ledger settlement architecture designed to handle transaction retries, external payment provider API failures, and race conditions safely.",
      flowColor: "#3b82f6",
      stages: [
        {
          id: "client",
          name: "Client UI / Mobile",
          role: "Attaches a unique UUID Idempotency Key to all transaction payloads to prevent double-charging on network retry cycles.",
          failureMode: "Unapproved double submission due to user tapping twice.",
          mitigation: "Disable submit button + client-side debounce + pass idempotency keys.",
        },
        {
          id: "gateway",
          name: "API Gateway",
          role: "Authenticates request signature and checks Redis token-bucket rate limiter. Rejects burst spikes to prevent DDoS.",
          failureMode: "API gateway flooded during flash sales.",
          mitigation: "Dynamic token-bucket rate-limiting per client IP + edge CDN caching.",
        },
        {
          id: "service",
          name: "Ledger Service",
          role: "Performs validation, generates pre-auth ledger records, and pushes transaction events to the message queue.",
          failureMode: "External Payment Processor API takes 30s to respond, locking worker thread.",
          mitigation: "Publish-subscribe decoupling. Write state as 'PENDING' immediately and return 202 Accepted.",
        },
        {
          id: "queue",
          name: "RabbitMQ Broker",
          role: "Durable queue with message persistent store. Ensures payment actions are safely recorded even if backend crashes.",
          failureMode: "Broker node runs out of memory and crashes during high traffic.",
          mitigation: "Clustered mirrored queues, publisher confirms, and high disk watermark safety alerts.",
        },
        {
          id: "worker",
          name: "Settlement Worker",
          role: "Consumes payment message, calls Stripe/Checkout gateway, and processes transactional updates.",
          failureMode: "Stripe API is down or responds with a 504 timeout.",
          mitigation: "Implements Circuit Breaker pattern (Resilience4j / custom middleware) + dead-letter-queuing with backoff retries.",
        },
        {
          id: "db",
          name: "PostgreSQL DB",
          role: "Applies ACID transitions. Runs isolated database updates inside a SELECT FOR UPDATE row-lock statement for double-entry records.",
          failureMode: "Deadlocks on balance updates due to competing write operations.",
          mitigation: "Deterministic ordering of lock acquisitions + row partitioning.",
        },
        {
          id: "cache",
          name: "Redis Cache",
          role: "Caches user ledger balances. Utilizes write-through invalidation to prevent stale balance readings.",
          failureMode: "Cache-stampede or stale values read on fast reloads.",
          mitigation: "Strict Cache invalidation inside the DB commit block + short TTLs.",
        },
      ],
    },
    {
      id: "notification",
      title: "High-volume Notification Engine",
      description: "An event-driven notification dispatch pipeline processing high-frequency user alerts across email, SMS, and push channels.",
      flowColor: "#a855f7",
      stages: [
        {
          id: "client",
          name: "Action Trigger",
          role: "User actions (e.g. comments, orders) emit events asynchronously without blocking user response times.",
          failureMode: "Notification failures block core transaction logic.",
          mitigation: "Emit message to event broker via outbox table in Postgres.",
        },
        {
          id: "gateway",
          name: "Event Router",
          role: "Receives events and routes them to dynamic queues based on notification category and recipient profile.",
          failureMode: "Event flood from viral posts overload processing servers.",
          mitigation: "Partition events based on channel priority (Critical SMS vs non-critical Email).",
        },
        {
          id: "service",
          name: "Templating Core",
          role: "Compiles local user template languages dynamically and resolves tracking parameters.",
          failureMode: "I/O blocking calls during template generation from databases.",
          mitigation: "Pre-load system templates in memory cache + resolve variables in worker.",
        },
        {
          id: "queue",
          name: "Kafka Channel Queue",
          role: "Distributed partitions matching delivery channels (SMS / APNs / Email) to scale consumer workers.",
          failureMode: "High rate-limiting from Apple Push Notification servers.",
          mitigation: "Implement rate-limit throttling rules per partition group.",
        },
        {
          id: "worker",
          name: "SMS/Email Worker",
          role: "Fetches notification payloads and contacts carrier gateways (Twilio, Sendgrid). Handles fallback routing.",
          failureMode: "Twilio Gateway returns 429 too many requests.",
          mitigation: "Queue token-bucket rate limiter per provider + immediate fallback queue.",
        },
        {
          id: "db",
          name: "Audit Store",
          role: "Logs delivery receipts and status updates for tracking.",
          failureMode: "High database write stress during notifications.",
          mitigation: "Bulk-batching writes or logging audits to Elastic/ClickHouse.",
        },
        {
          id: "cache",
          name: "Session Cache",
          role: "Caches user notification settings and contact tokens.",
          failureMode: "Contact changes aren't immediately reflected in notification system.",
          mitigation: "Invalidate cache on user update events.",
        },
      ],
    },
    {
      id: "queue_processing",
      title: "High-throughput Queue Worker",
      description: "A concurrent background processing pipeline designed for large workloads like video optimization or heavy batch computations.",
      flowColor: "#06b6d4",
      stages: [
        {
          id: "client",
          name: "Upload Edge",
          role: "Uploads heavy documents or videos directly to Cloudflare R2 / AWS S3 using presigned URLs.",
          failureMode: "API Gateway crashes while parsing 500MB payload uploads.",
          mitigation: "Direct client-to-S3 uploading via secured presigned URLs.",
        },
        {
          id: "gateway",
          name: "Metadata Ingest",
          role: "Takes upload details, registers job record in DB, and dispatches job ID.",
          failureMode: "Duplicate queue triggers for same media files.",
          mitigation: "Apply unique checksum-based SHA256 identifier validation.",
        },
        {
          id: "service",
          name: "Orchestration",
          role: "Tracks work items and manages task flow states.",
          failureMode: "State inconsistency if worker crashes mid-task.",
          mitigation: "Heartbeat checks to monitor worker statuses. Return failed jobs to active queue.",
        },
        {
          id: "queue",
          name: "Priority Queue",
          role: "Enqueues media jobs into specific priority pools (VIP tier gets processed first).",
          failureMode: "Low priority jobs get starved.",
          mitigation: "Dynamic queue weight allocations ensuring slow progression for standard tiers.",
        },
        {
          id: "worker",
          name: "Worker Node Pool",
          role: "Pulls task, processes calculations, encodes media on ephemeral storage.",
          failureMode: "Heavy calculation exhausts worker CPU, crashing the node.",
          mitigation: "Autoscaling worker groups (K8s HPA) based on CPU metric limits.",
        },
        {
          id: "db",
          name: "Job Repository",
          role: "Stores job progress logs, metadata, and output assets URLs.",
          failureMode: "High-frequency task updates choke relational databases.",
          mitigation: "Record details using an optimized NoSQL database or state log.",
        },
        {
          id: "cache",
          name: "Progress Hub",
          role: "Caches job progress percentages so Client can poll progress instantly.",
          failureMode: "Poller overload checks on database layer.",
          mitigation: "Cache updates in Redis memory store with 5-minute expire times.",
        },
      ],
    },
  ];

  const activeArch = architectures.find((a) => a.id === activeArchId) || architectures[0];
  const activeStage = activeArch.stages[selectedStageIdx] || activeArch.stages[0];

  return (
    <section id="system-design" className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 radial-glow-blue pointer-events-none opacity-20" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] radial-glow-purple pointer-events-none opacity-15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-purple uppercase">
            // Architecture Playground
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How I Think as an Engineer
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select a system archetype below, click nodes along the data pathway, and explore system behaviors, fail-safes, and mitigation layers.
          </p>
        </div>

        {/* Architecture Type Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {architectures.map((arch) => (
            <button
              key={arch.id}
              onClick={() => {
                setActiveArchId(arch.id);
                setSelectedStageIdx(0);
              }}
              className={`px-4 py-2.5 rounded-lg border text-xs font-mono font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                activeArchId === arch.id
                  ? "bg-white/[0.04] text-white border-white/20"
                  : "bg-transparent text-zinc-500 border-white/5 hover:border-white/10 hover:text-zinc-300"
              }`}
            >
              {arch.title}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left / Top side: Horizontal node pipeline */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm relative overflow-hidden min-h-[350px]">
            <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none" />
            
            {/* Topology Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 relative z-10">
              <span className="font-mono text-xs text-zinc-500 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent-blue" />
                SYSTEM_FLOW_TOPOLOGY // ACTIVE
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.05] text-[9px] text-zinc-400 font-mono uppercase">
                Packet stream rate: 10/s
              </span>
            </div>

            {/* Pipeline nodes */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-3 py-6 relative z-10">
              {activeArch.stages.map((stage, idx) => {
                const isSelected = idx === selectedStageIdx;
                return (
                  <React.Fragment key={stage.id}>
                    <button
                      onClick={() => setSelectedStageIdx(idx)}
                      className={`flex flex-col items-center gap-2 relative transition-all duration-300 cursor-pointer ${
                        isSelected ? "scale-105" : "hover:scale-102 opacity-75 hover:opacity-90"
                      }`}
                    >
                      {/* Circle Node visual */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          isSelected
                            ? "bg-[#09090b] shadow-lg"
                            : "bg-white/[0.02]"
                        }`}
                        style={{
                          borderColor: isSelected ? activeArch.flowColor : "rgba(255, 255, 255, 0.08)",
                          boxShadow: isSelected ? `0 0 15px ${activeArch.flowColor}30` : "none"
                        }}
                      >
                        <span className="font-mono text-xs font-bold text-white">
                          0{idx + 1}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-zinc-300 max-w-[65px] text-center truncate">
                        {stage.name.split(" ")[0]}
                      </span>
                    </button>

                    {/* Connecting arrow */}
                    {idx < activeArch.stages.length - 1 && (
                      <div className="hidden sm:block text-zinc-700 font-mono text-xs animate-pulse">
                        ➔
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Visual packet animation bridge representation */}
            <div className="bg-[#050508] p-3 rounded-lg border border-white/5 font-mono text-[10px] text-zinc-500 mt-6 relative z-10 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                Packet status: Flowing dynamically...
              </span>
              <span>Data flow indicator</span>
            </div>
          </div>

          {/* Right / Bottom side: Detailed selected node specs */}
          <div className="lg:col-span-4 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between h-full relative overflow-hidden">
            {/* Glowing active outline */}
            <div
              className="absolute inset-x-0 top-0 h-1"
              style={{ backgroundColor: activeArch.flowColor }}
            />

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                  NODE_SPECIFICATION // STAGE 0{selectedStageIdx + 1}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {activeStage.name}
                </h4>
              </div>

              {/* Rationale / Role */}
              <div className="space-y-2">
                <h5 className="font-mono text-[10px] text-accent-blue uppercase tracking-wider font-semibold">
                  System Task / Logic
                </h5>
                <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                  {activeStage.role}
                </p>
              </div>

              {/* Failure Mode & Mitigation */}
              <div className="space-y-3.5 pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  <div className="p-1 rounded bg-red-500/10 border border-red-500/20 shrink-0 h-fit">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-mono text-[10px] text-red-400 font-semibold uppercase tracking-wider">
                      Failure Mode
                    </h5>
                    <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                      {activeStage.failureMode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="p-1 rounded bg-accent-emerald/10 border border-accent-emerald/20 shrink-0 h-fit">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-emerald" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-mono text-[10px] text-accent-emerald font-semibold uppercase tracking-wider">
                      Fail-Safe / Mitigation
                    </h5>
                    <p className="text-zinc-300 text-xs leading-relaxed font-sans">
                      {activeStage.mitigation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-right font-mono text-[9px] text-zinc-600">
              CLUSTER_CORE_REDUNDANCY = Active
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Download, Mail, Play, Cpu, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface SystemNode {
  x: number;
  y: number;
  label: string;
  type: "gateway" | "queue" | "database" | "cache" | "worker";
  status: string;
  load: string;
  rtt: string;
  radius: number;
  pulse: number;
}

interface Connection {
  from: number;
  to: number;
}

export default function Hero() {
  const [typingText, setTypingText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const roles = [
    "Product Engineering",
    "NestJS & Next.js",
    "FinTech Platforms",
    "AI Agents & LLM Apps",
  ];
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<SystemNode | null>(null);

  // Typing animation
  useEffect(() => {
    const activeRole = roles[typingIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypingText(activeRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypingText(activeRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);
    }

    if (!isDeleting && charIndex === activeRole.length) {
      // Pause at the end of typing
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTypingIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, typingIndex]);

  // Canvas distributed network simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Hardcode distributed systems nodes matching design directions
    const nodes: SystemNode[] = [
      { x: 0.15, y: 0.5, label: "Client Edge", type: "gateway", status: "Healthy", load: "14%", rtt: "8ms", radius: 7, pulse: 0 },
      { x: 0.35, y: 0.3, label: "API Gateway", type: "gateway", status: "Active", load: "34%", rtt: "12ms", radius: 8, pulse: 0 },
      { x: 0.35, y: 0.7, label: "Auth microservice", type: "worker", status: "Healthy", load: "8%", rtt: "5ms", radius: 6, pulse: 0 },
      { x: 0.55, y: 0.3, label: "RabbitMQ Cluster", type: "queue", status: "Nominal", load: "420 msg/s", rtt: "2ms", radius: 9, pulse: 0 },
      { x: 0.55, y: 0.7, label: "Redis Distributed Cache", type: "cache", status: "99.2% Hitrate", load: "12%", rtt: "0.4ms", radius: 7, pulse: 0 },
      { x: 0.8, y: 0.3, label: "PostgreSQL Replica", type: "database", status: "Syncing", load: "22%", rtt: "18ms", radius: 8, pulse: 0 },
      { x: 0.8, y: 0.7, label: "EVM Smart Account Subnet", type: "database", status: "Block 142095", load: "4.2 tps", rtt: "45ms", radius: 8, pulse: 0 },
    ];

    const connections: Connection[] = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 1, to: 4 },
      { from: 2, to: 4 },
      { from: 3, to: 5 },
      { from: 4, to: 5 },
      { from: 4, to: 6 },
    ];

    // Data packets floating along connections
    interface Packet {
      connIdx: number;
      progress: number; // 0 to 1
      speed: number;
      color: string;
    }

    const packets: Packet[] = [];
    for (let i = 0; i < 12; i++) {
      packets.push({
        connIdx: Math.floor(Math.random() * connections.length),
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        color: i % 2 === 0 ? "#3b82f6" : "#a855f7",
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      let found: SystemNode | null = null;
      for (const node of nodes) {
        const nx = node.x * canvas.width;
        const ny = node.y * canvas.height;
        const dist = Math.hypot(mouseX - nx, mouseY - ny);
        if (dist < 25) {
          found = node;
          break;
        }
      }
      setHoveredNode(found);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw Connections (Bridges)
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        const fx = fromNode.x * width;
        const fy = fromNode.y * height;
        const tx = toNode.x * width;
        const ty = toNode.y * height;

        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Update and Draw Data Packets
      packets.forEach((packet) => {
        const conn = connections[packet.connIdx];
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        const fx = fromNode.x * width;
        const fy = fromNode.y * height;
        const tx = toNode.x * width;
        const ty = toNode.y * height;

        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.connIdx = Math.floor(Math.random() * connections.length);
        }

        const px = fx + (tx - fx) * packet.progress;
        const py = fy + (ty - fy) * packet.progress;

        // Glowing packet dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = packet.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = packet.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw Nodes
      nodes.forEach((node) => {
        const nx = node.x * width;
        const ny = node.y * height;
        
        node.pulse += 0.02;
        const currentPulseRadius = node.radius + Math.sin(node.pulse) * 2;

        // Node style colors
        let accentColor = "#3b82f6"; // Gateway (Blue)
        if (node.type === "queue") accentColor = "#06b6d4"; // Queue (Cyan)
        if (node.type === "database") accentColor = "#a855f7"; // DB (Purple)
        if (node.type === "cache") accentColor = "#10b981"; // Cache (Green)

        const isCurrentHovered = hoveredNode && hoveredNode.label === node.label;

        // Outer glow
        ctx.beginPath();
        ctx.arc(nx, ny, currentPulseRadius + (isCurrentHovered ? 8 : 4), 0, Math.PI * 2);
        ctx.fillStyle = isCurrentHovered
          ? `${accentColor}25`
          : `${accentColor}10`;
        ctx.fill();

        // Inner solid node
        ctx.beginPath();
        ctx.arc(nx, ny, isCurrentHovered ? node.radius + 2 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = accentColor;
        ctx.shadowBlur = isCurrentHovered ? 20 : 8;
        ctx.shadowColor = accentColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw Label
        ctx.font = "10px monospace";
        ctx.fillStyle = isCurrentHovered ? "#ffffff" : "rgba(255, 255, 255, 0.4)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, nx, ny - 15);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredNode]);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center bg-[#09090b] overflow-hidden pt-20">
      {/* Background Tech Grids */}
      <div className="absolute inset-0 tech-grid opacity-[0.08]" />
      
      {/* Subtle Glow Overlays */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 radial-glow-blue pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] radial-glow-purple pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Headline Copy */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Label tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full text-xs text-zinc-400 font-mono">
            <Cpu className="w-3.5 h-3.5 text-accent-blue animate-pulse-slow" />
            <span>sys.designer_mode = true</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            I Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan">
              Scalable Systems
            </span>{" "}
            That Power Real Products.
          </h1>

          <div className="space-y-1">
            <p className="text-zinc-400 font-mono text-sm sm:text-base">
              Senior Full-Stack Engineer specializing in:
            </p>
            {/* Dynamic typing section */}
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold font-mono text-white">
                ➔ {typingText}
              </span>
              <span className="w-1.5 h-5 bg-accent-blue ml-1.5 animate-pulse" />
            </div>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed font-sans">
            "I design and build reliable software systems capable of serving thousands to millions of users, targeting minimal latency and maximal resilience."
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => handleScrollTo("projects")}
              className="px-5 py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-xs font-semibold text-white flex items-center gap-2 shadow-lg shadow-accent-blue/15 hover:shadow-accent-blue/25 hover:translate-y-[-1px] active:translate-y-[0px] transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => alert("Resume Download (Simulated)")}
              className="px-5 py-3 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/20 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-2 transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="px-5 py-3 rounded-lg text-xs font-semibold text-zinc-400 hover:text-zinc-200 flex items-center gap-2 hover:bg-white/[0.02] rounded-lg transition cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Me</span>
            </button>
          </div>
        </div>

        {/* Right Side: Network Graph Visualizer */}
        <div className="lg:col-span-6 relative flex flex-col justify-center h-[400px] sm:h-[480px] lg:h-[520px] rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />

          {/* Glowing node diagnostic card pop up overlay on hover */}
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute bottom-4 left-4 right-4 p-4 rounded-xl glass-card font-mono text-[11px] leading-5 text-zinc-300 space-y-1 z-20 pointer-events-none"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-accent-emerald" />
                  {hoveredNode.label}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-[9px] uppercase font-bold text-zinc-400">
                  {hoveredNode.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div>Health Check: <span className="text-accent-emerald">{hoveredNode.status}</span></div>
                <div>Server Load: <span className="text-white">{hoveredNode.load}</span></div>
                <div>Network Latency: <span className="text-accent-blue">{hoveredNode.rtt}</span></div>
                <div>Node Type: <span className="text-zinc-400 capitalize">{hoveredNode.type}</span></div>
              </div>
            </motion.div>
          )}

          {/* Simple floating tags */}
          <div className="absolute top-4 right-4 px-2.5 py-1 bg-white/[0.02] border border-white/5 rounded text-[10px] text-zinc-500 font-mono">
            Interactive Node Canvas
          </div>
        </div>
      </div>
    </section>
  );
}

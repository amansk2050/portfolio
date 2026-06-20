"use client";

import React, { useState } from "react";
import { Send, Calendar, Mail, Cpu, Terminal, CheckCircle2, ShieldCheck } from "lucide-react";
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

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success: boolean;
    requestId?: string;
    logText?: string;
  } | null>(null);

  const handleBookMeeting = () => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        window.Calendly.initPopupWidget({ url: "https://calendly.com/sheikh-aman" });
      };
      document.body.appendChild(script);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Simulated contact worker dispatch triggering local mail client
    setTimeout(() => {
      const generatedRequestId = "req_" + Math.random().toString(36).substring(2, 11).toUpperCase();
      setSubmissionStatus({
        success: true,
        requestId: generatedRequestId,
        logText: `HTTP/2 202 Accepted
Date: ${new Date().toUTCString()}
Server: aman-contact-worker-v1.0
Content-Type: application/json
X-Request-Id: ${generatedRequestId}

{
  "status": "queued",
  "message": "Payload verified. Redirecting to mail router to complete transaction...",
  "recipient": "Sheikh Aman <skaman.2050@gmail.com>"
}`
      });
      setIsSubmitting(false);

      // Construct mailto link and trigger after a short delay so the user views the log trace
      setTimeout(() => {
        const subject = encodeURIComponent(`Message from ${formData.name} (Portfolio Contact)`);
        const body = encodeURIComponent(`Hi Sheikh Aman,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`);
        window.location.href = `mailto:skaman.2050@gmail.com?subject=${subject}&body=${body}`;
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 bg-[#09090b] relative border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow-purple pointer-events-none opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-accent-cyan uppercase">
            // Establish Connection
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let’s Build Something Great
          </h3>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Reach out via the secure forms router below or schedule a direct Google Meet sync.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          {/* Left Side: Contact Channels & System Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase flex items-center gap-2">
                <Cpu className="w-4 h-4 text-accent-blue" />
                <span>Router Channels</span>
              </h4>
              
              <div className="space-y-4">
                {/* Email link */}
                <a
                  href="mailto:skaman.2050@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition group"
                >
                  <div className="p-2 rounded-lg bg-[#0d0d12] border border-white/5 text-zinc-400 group-hover:text-accent-blue transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">DIRECT_EMAIL</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">skaman.2050@gmail.com</span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/amsten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition group"
                >
                  <div className="p-2 rounded-lg bg-[#0d0d12] border border-white/5 text-zinc-400 group-hover:text-accent-purple transition-colors">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">LINKEDIN_ROUTING</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">linkedin.com/in/amsten</span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/amansk2050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition group"
                >
                  <div className="p-2 rounded-lg bg-[#0d0d12] border border-white/5 text-zinc-400 group-hover:text-accent-cyan transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-zinc-500 block">GITHUB_REPOS</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">github.com/amansk2050</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Calendar Meeting block */}
            <div className="p-6 rounded-xl border border-white/5 bg-white/[0.01] space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent-emerald" />
                <span className="font-mono text-xs font-bold text-white uppercase">Calendar Sync</span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                Prefer a face-to-face system architecture call? Book a virtual meeting slot instantly.
              </p>
              <button
                onClick={handleBookMeeting}
                className="w-full py-2.5 rounded-lg bg-accent-emerald text-xs font-semibold text-white hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                Book 15min Tech Sync
              </button>
            </div>
          </div>

          {/* Right Side: Form Router */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-[#0d0d12] border border-white/5 focus:border-white/15 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="w-full bg-[#0d0d12] border border-white/5 focus:border-white/15 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-zinc-500 uppercase">Message Payload</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Let's build a payment platform..."
                  className="w-full bg-[#0d0d12] border border-white/5 focus:border-white/15 focus:outline-none rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-zinc-600 transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !!submissionStatus}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-accent-blue/15 hover:shadow-accent-blue/25 hover:translate-y-[-1px] active:translate-y-[0px] disabled:opacity-50 disabled:translate-y-0 transition cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                    <span>Routing transaction...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Terminal Response simulation */}
            <AnimatePresence>
              {submissionStatus && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="border border-white/10 rounded-xl bg-black/80 p-4 font-mono text-[11px] text-accent-cyan leading-relaxed select-text overflow-hidden relative"
                >
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
                    <Terminal className="w-4 h-4 text-accent-cyan" />
                    <span className="text-[10px] font-bold text-zinc-400">CONTACT_WORKER_LOG // OUTPUT</span>
                  </div>
                  <pre className="overflow-x-auto max-w-full font-mono text-left whitespace-pre">{submissionStatus.logText}</pre>
                  
                  <div className="flex items-center gap-1.5 mt-4 pt-2 border-t border-white/5 text-[10px] text-accent-emerald font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Event registered. Transaction ID: {submissionStatus.requestId}</span>
                  </div>
                  <button
                    onClick={() => setSubmissionStatus(null)}
                    className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-300 text-[10px]"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center text-[10px] text-zinc-600 font-mono space-y-2">
          <div>© {new Date().getFullYear()} Sheikh Aman. All rights reserved.</div>
          <div>API Version: 1.4.2 // Node runtime // Cloudflare Workers Edge</div>
        </div>
      </div>
    </section>
  );
}

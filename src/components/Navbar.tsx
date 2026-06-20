"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Cpu, Mail } from "lucide-react";
import CommandPalette from "./CommandPalette";

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

interface NavbarProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

export default function Navbar({ onThemeChange, currentTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "System Design", href: "#system-design" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090b]/75 border-b border-white/5 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-cyan flex items-center justify-center shadow-lg shadow-accent-blue/25 group-hover:rotate-12 transition-transform duration-300">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 group-hover:from-white group-hover:to-zinc-200 transition-colors">
              AMAN<span className="text-accent-blue">.DEV</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/[0.02] border border-white/5 rounded-full">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleLinkClick(item.href)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-5">
              {/* Command Palette */}
              <CommandPalette onThemeChange={onThemeChange} currentTheme={currentTheme} />
              
              {/* Social Icons */}
              <a
                href="https://github.com/amansk2050"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/amsten"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <CommandPalette onThemeChange={onThemeChange} currentTheme={currentTheme} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-[#09090b]/95 border-b border-white/10 backdrop-blur-xl transition-all duration-300 py-6 px-4 z-30">
          <div className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.href)}
                className="w-full text-left py-2.5 px-4 rounded-lg bg-white/[0.02] border border-white/5 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-zinc-100 transition"
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center gap-4 justify-center border-t border-white/5 pt-5 mt-2">
              <a
                href="https://github.com/amansk2050"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition flex items-center justify-center w-10 h-10"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/amsten"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition flex items-center justify-center w-10 h-10"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="mailto:skaman.2050@gmail.com"
                className="p-2 rounded-full border border-white/5 bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition flex items-center justify-center w-10 h-10"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import SystemDesignShowcase from "@/components/SystemDesignShowcase";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import TerminalIntro from "@/components/TerminalIntro";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [theme, setTheme] = useState("obsidian");

  useEffect(() => {
    // Check if intro has already been seen in this session
    const hasSeenIntro = sessionStorage.getItem("portfolio-intro-seen");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  // Define dynamic CSS variables override based on active theme
  const getThemeVariables = () => {
    switch (theme) {
      case "navy":
        return {
          "--color-accent-blue": "#0284c7", // Sky Blue
          "--color-accent-purple": "#3b82f6", // Royal Blue
          "--color-accent-cyan": "#0ea5e9", // Electric Cyan
          "--color-accent-blue-glow": "rgba(2, 132, 199, 0.15)",
          "--color-accent-purple-glow": "rgba(59, 130, 246, 0.15)",
          "--color-accent-cyan-glow": "rgba(14, 165, 233, 0.15)",
        } as React.CSSProperties;
      case "cyberpunk":
        return {
          "--color-accent-blue": "#ec4899", // Neon Pink
          "--color-accent-purple": "#d946ef", // Fuchsia
          "--color-accent-cyan": "#f43f5e", // Rose Cyber
          "--color-accent-blue-glow": "rgba(236, 72, 153, 0.15)",
          "--color-accent-purple-glow": "rgba(217, 70, 239, 0.15)",
          "--color-accent-cyan-glow": "rgba(244, 63, 94, 0.15)",
        } as React.CSSProperties;
      case "obsidian":
      default:
        return {
          "--color-accent-blue": "#3b82f6", // Default Blue
          "--color-accent-purple": "#a855f7", // Default Purple
          "--color-accent-cyan": "#06b6d4", // Default Cyan
          "--color-accent-blue-glow": "rgba(59, 130, 246, 0.15)",
          "--color-accent-purple-glow": "rgba(168, 85, 247, 0.15)",
          "--color-accent-cyan-glow": "rgba(6, 182, 212, 0.12)",
        } as React.CSSProperties;
    }
  };

  if (showIntro) {
    return <TerminalIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div
      style={getThemeVariables()}
      className="min-h-screen bg-[#09090b] text-[#f4f4f5] transition-colors duration-500 selection:bg-accent-purple/30 selection:text-white"
    >
      <Navbar onThemeChange={handleThemeChange} currentTheme={theme} />
      
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <SystemDesignShowcase />
        <Experience />
        <Blog />
        <Contact />
      </main>
    </div>
  );
}

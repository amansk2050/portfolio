"use client";

import React, { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import SystemDesignShowcase from "@/components/SystemDesignShowcase";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import IntroOverlay from "@/components/IntroOverlay";

export default function Home() {
  // The page always renders (so it is in the server HTML); the intro only plays over it.
  const [showIntro, setShowIntro] = useState(true);
  const hideIntro = useCallback(() => setShowIntro(false), []);
  const [theme, setTheme] = useState("obsidian");

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
          "--color-accent-blue": "#b4552f", // Clay (default)
          "--color-accent-purple": "#9a4a2b", // Deep clay
          "--color-accent-cyan": "#3f6d99", // Blue
          "--color-accent-blue-glow": "rgba(217, 119, 87, 0.12)",
          "--color-accent-purple-glow": "rgba(217, 119, 87, 0.1)",
          "--color-accent-cyan-glow": "rgba(106, 155, 204, 0.12)",
        } as React.CSSProperties;
    }
  };

  return (
    <div
      style={getThemeVariables()}
      className="min-h-screen bg-[#faf9f5] text-[#141413] transition-colors duration-500 selection:bg-accent-purple/30 selection:text-white"
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

      {showIntro && <IntroOverlay onDone={hideIntro} />}
    </div>
  );
}

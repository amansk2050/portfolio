import type { Metadata } from "next";
import { Geist_Mono, Lora, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Claude-inspired type: Poppins for headings, Lora for body (Geist Mono kept for code labels).
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sheikh Aman | Senior Full-Stack Engineer, AI & Product",
  description: "Senior full-stack engineer with 5+ years building fintech platforms, AI agents and scalable backends with NestJS, Next.js, Node.js and PostgreSQL. Based in West Bengal, India, working remotely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${lora.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Marks returning visitors before first paint so the intro overlay never flashes. */}
        <Script id="intro-seen" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("portfolio-intro-seen"))document.documentElement.dataset.introSeen="1"}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}

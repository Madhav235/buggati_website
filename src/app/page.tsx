"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Experience from "@/components/Experience";
import SpecsGrid from "@/components/SpecsGrid";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-neutral-950 min-h-screen">
      <Navbar />

      {/* Master Scroll Container - 600vh height for long scroll sequence */}
      <div ref={containerRef} className="h-[600vh] relative">
        <Experience scrollYProgress={scrollYProgress} />
      </div>

      {/* Post-Scroll Content */}
      <div className="relative z-10 bg-neutral-950">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}

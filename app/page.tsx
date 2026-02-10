"use client";

import ScrollCanvas from "@/components/ScrollCanvas";
import Experience from "@/components/Experience";
import { ReactLenis } from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root>
      <main className="relative bg-black min-h-screen">
        <ScrollCanvas />
        <div className="relative z-10 w-full">
          {/* The Experience component contains the scroll height trigger */}
          <Experience />
        </div>
      </main>
    </ReactLenis>
  );
}

"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Phases based on scroll progress (0 - 1)
    // Hero: 0 - 0.2
    // Transition: 0.2 - 0.4
    // Design: 0.4 - 0.7
    // Engine: 0.7 - 1.0

    const heroOpacity = useTransform(
        scrollYProgress,
        [0, 0.18, 0.2, 1],
        [1, 1, 0, 0]
    );
    const heroVisibility = useTransform(
        scrollYProgress,
        [0, 0.2, 0.21, 1],
        ["visible", "visible", "hidden", "hidden"]
    );


    const designOpacity = useTransform(
        scrollYProgress,
        [0.25, 0.3, 0.7, 0.75, 1],
        [0, 1, 1, 0, 0]
    );

    const engineOpacity = useTransform(
        scrollYProgress,
        [0.8, 0.85, 1],
        [0, 1, 1]
    );


    return (
        <div ref={containerRef} className="relative h-[2400vh] w-full z-10 pointer-events-none">
            {/* Hero Section */}
            <motion.div
                style={{ opacity: heroOpacity, visibility: heroVisibility }}
                className="fixed inset-0 flex flex-col items-center justify-center text-white text-center will-change-opacity"
            >


                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-4">
                    Bugatti Chiron
                </h1>
                <p className="text-xl md:text-3xl font-light text-white/80 mb-8">
                    €3,000,000
                </p>
                <button className="pointer-events-auto px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-white/90 transition-colors">
                    Inquire Now
                </button>
            </motion.div>

            {/* Design Section */}
            <motion.div
                style={{ opacity: designOpacity }}
                className="fixed inset-0 flex flex-col items-start justify-center text-white px-8 md:px-24 pointer-events-none"
            >
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                        Aerodynamic Mastery
                    </h2>
                    <p className="text-lg md:text-2xl font-light text-white/80 leading-relaxed">
                        Quad-turbo carbon fiber hypercar with signature C-line profile.
                        Every curve serves a purpose, engineered for speed and stability beyond 400 km/h.
                    </p>
                </div>
            </motion.div>

            {/* Engine Section */}
            <motion.div
                style={{ opacity: engineOpacity }}
                className="fixed inset-0 flex flex-col items-end justify-center text-white px-8 md:px-24 pointer-events-none"
            >
                <div className="text-right">
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-2">
                        8.0L W16
                    </h2>
                    <div className="flex flex-col items-end gap-2">
                        <span className="text-4xl md:text-6xl font-bold text-blue-500">
                            1500 HP
                        </span>
                        <span className="text-xl md:text-2xl font-mono text-white/60">
                            QUAD-TURBOCHARGED
                        </span>
                        <span className="text-lg md:text-xl font-mono text-white/40 mt-4">
                            0-100 KM/H IN 2.4S
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicators / HUD elements could go here */}
            <div className="fixed bottom-8 left-8 text-white/30 font-mono text-xs hidden md:block">
                <p>SCROLL SEQUENCE // SYSTEM ACTIVE</p>
                <p>FRAME_BUFFER: OK</p>
            </div>
        </div>
    );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, AnimatePresence, MotionValue, useMotionValueEvent } from "framer-motion";
import ScrollCanvas from "./ScrollCanvas";
import clsx from "clsx";

interface ExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function Experience({ scrollYProgress }: ExperienceProps) {
    // Phase logic based on scroll progress
    // 0-0.33: Hero
    // 0.33-0.66: Design
    // 0.66-1.0: Engine

    const [phase, setPhase] = useState("hero");

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) setPhase("hero");
        else if (latest < 0.66) setPhase("design");
        else setPhase("engine");
    });

    // Opacity transitions
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const designOpacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const engineOpacity = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

    return (
        <>
            <ScrollCanvas scrollYProgress={scrollYProgress} />

            <div className="fixed inset-0 pointer-events-none flex flex-col justify-center items-center z-10 p-6 md:p-12">

                {/* HERO PHASE */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className={clsx(
                        "absolute flex flex-col items-center text-center",
                        // Only render if opacity > 0 to avoid overlapping clicks (event though pointer-events-none)
                        phase === "hero" ? "block" : "hidden"
                    )}
                >
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500 font-orbitron"
                    >
                        Bugatti Chiron
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-4 flex flex-col items-center"
                    >
                        <p className="text-xl md:text-2xl font-light tracking-[0.3em] text-bugatti-gold font-rajdhani">
                            PINNACLE OF AUTOMOTIVE ART
                        </p>
                        <div className="mt-8 h-px w-24 bg-white/20" />
                        <p className="mt-8 text-neutral-400 font-mono text-sm tracking-widest">
                            PRICE STARTING AT <span className="text-white font-bold">€3,000,000</span>
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-12 pointer-events-auto cursor-pointer group"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="relative px-8 py-3 overflow-hidden border border-white/20 group-hover:border-bugatti-gold transition-colors duration-500">
                            <div className="absolute inset-0 w-0 bg-bugatti-gold transition-all duration-[250ms] ease-out group-hover:w-full opacity-10" />
                            <span className="relative text-xs font-bold uppercase tracking-[0.25em] text-white group-hover:text-bugatti-gold transition-colors duration-300 font-orbitron">
                                INQUIRE NOW
                            </span>
                        </div>
                    </motion.div>
                </motion.div>


                {/* DESIGN PHASE */}
                <motion.div
                    style={{ opacity: designOpacity }}
                    className={clsx(
                        "absolute flex flex-col items-start max-w-4xl w-full",
                        phase === "design" ? "block" : "hidden"
                    )}
                >
                    <div className="border-l-2 border-bugatti-gold pl-6 md:pl-12 backdrop-blur-sm bg-black/20 py-8">
                        <h2 className="text-sm font-bold text-bugatti-gold mb-2 tracking-[0.5em] font-orbitron">DESIGN PHILOSOPHY</h2>
                        <h3 className="text-3xl md:text-6xl font-light leading-none text-white font-rajdhani uppercase mb-6">
                            Form Follows <br /><span className="font-bold text-neutral-400">Performance</span>
                        </h3>
                        <p className="text-sm md:text-lg text-neutral-300 max-w-xl leading-relaxed font-rajdhani">
                            Sculpted carbon-fiber bodywork featuring the signature C-line silhouette.
                            Every surface has been engineered for active aerodynamics and thermal management,
                            creating a masterpiece of speed and elegance.
                        </p>
                    </div>
                </motion.div>

                {/* ENGINE PHASE */}
                <motion.div
                    style={{ opacity: engineOpacity }}
                    className={clsx(
                        "absolute flex flex-col items-end w-full max-w-6xl",
                        phase === "engine" ? "block" : "hidden"
                    )}
                >
                    <div className="bg-neutral-900/80 backdrop-blur-md p-8 md:p-12 border border-white/5 rounded-sm max-w-md ml-auto">
                        <div className="flex items-baseline justify-between mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-4xl font-bold font-orbitron text-white">W16</h2>
                            <span className="text-xs tracking-[0.3em] text-bugatti-gold uppercase">Powertrain</span>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center group">
                                <span className="text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">Engine</span>
                                <span className="text-lg font-mono text-white text-right">8.0L Quad-Turbo</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">Power</span>
                                <span className="text-lg font-mono text-bugatti-gold text-right">1500 HP</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">Torque</span>
                                <span className="text-lg font-mono text-white text-right">1600 Nm</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <span className="text-xs text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">0-100 km/h</span>
                                <span className="text-lg font-mono text-bugatti-gold text-right">2.4s</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* GLOBAL HUD ELEMENTS */}
            <div className="fixed bottom-8 left-8 hidden md:block text-[10px] text-white/30 font-mono">
                COORD: 48.5284° N, 7.4958° E <br />
                MOLSHEIM, FRANCE
            </div>
            <div className="fixed bottom-8 right-8 hidden md:block text-[10px] text-white/30 font-mono text-right">
                SCROLL SYSTEM // ONLINE <br />
                PHASE: {phase.toUpperCase()}
            </div>
        </>
    );
}

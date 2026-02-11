"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import clsx from "clsx";

interface ScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
}

export default function ScrollCanvas({ scrollYProgress }: ScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const totalFrames = 145;

    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const loadImage = (index: number) => {
            const img = new Image();
            // Use device pixel ratio for high res if needed, but standard jpgs are usually enough
            // If retina images existed, we'd select them here.
            img.src = `/images/frames_hn/${index}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                // Handle missing images gracefully - maybe skip or show placeholder
                console.warn(`Failed to load frame ${index}`);
                loadedCount++; // Still count it to finish loading
                if (loadedCount === totalFrames) {
                    setIsLoaded(true);
                }
            }
            loadedImages[index - 1] = img; // Store in correct index
        };

        for (let i = 1; i <= totalFrames; i++) {
            loadImage(i);
        }

        setImages(loadedImages);
    }, []);

    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;

        const handleResize = () => {
            // High DPI scaling
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);

            // Render current frame immediately after resize
            const currentProgress = scrollYProgress.get();
            const frameIndex = Math.min(
                totalFrames - 1,
                Math.floor(currentProgress * totalFrames)
            );
            renderFrame(frameIndex);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, images]);

    const renderFrame = (index: number) => {
        if (!canvasRef.current || images.length === 0 || !images[index]) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[index];

        // Check if image handles are valid
        if (!img.complete || img.naturalWidth === 0) return;

        // Canvas logical dimensions (css pixels)
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);

        // "Contain" logic: scale image to fit within canvas while maintaining aspect ratio
        const hRatio = canvasWidth / img.width;
        const vRatio = canvasHeight / img.height;
        const ratio = Math.min(hRatio, vRatio); // Use min for 'contain', max for 'cover'
        // User requested 'contain'

        const centerShift_x = (canvasWidth - img.width * ratio) / 2;
        const centerShift_y = (canvasHeight - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded) return;
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );
        requestAnimationFrame(() => renderFrame(frameIndex));
    });

    return (
        <div className="fixed inset-0 z-0 bg-neutral-950">
            <canvas
                ref={canvasRef}
                className={clsx(
                    "block w-full h-full touch-none",
                    isLoaded ? "opacity-100" : "opacity-0"
                )}
                style={{ width: "100%", height: "100%" }}
            />

            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-50 bg-black">
                    <div className="mb-4 text-xs tracking-[0.5em] text-bugatti-gold animate-pulse font-orbitron">
                        INITIALIZING SYSTEMS
                    </div>
                    <div className="w-64 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-bugatti-gold transition-all duration-300 ease-out"
                            style={{ width: `${loadProgress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-[10px] text-neutral-500 font-mono">
                        {loadProgress}%
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const FRAME_COUNT = 145;

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress (0-1) to frame index (0-239)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      const imagePromises: Promise<void>[] = [];

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const promise = new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = `/images/buggati-sequence/${i}.jpg`;
          img.onload = () => {
            loadedImages[i - 1] = img;
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image ${i}`);
            // Fallback: just resolve to avoid blocking
            resolve();
          };
        });
        imagePromises.push(promise);
      }

      await Promise.all(imagePromises);
      setImages(loadedImages);
      setIsLoaded(true);
    };

    loadImages();
  }, []);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const img = images[index];

    // Calculate aspect ratio to cover (object-fit: cover)
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width / 2) - (img.width / 2) * scale;
    const y = (canvas.height / 2) - (img.height / 2) * scale;

    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, [images]);

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (!isLoaded) return;
    const index = Math.round(latest);
    requestAnimationFrame(() => renderFrame(index));
  });

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-render current frame
      const currentScroll = frameIndex.get();
      renderFrame(Math.round(currentScroll));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex, isLoaded, renderFrame]);

  // Initial render when loaded
  useEffect(() => {
    if (isLoaded) {
      // Force render first frame
      renderFrame(0);
    }
  }, [isLoaded, renderFrame]);

  return (
    <div className="fixed inset-0 z-0 bg-black">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-white/50 font-mono text-sm">
          INITIALIZING SYSTEMS...
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
}

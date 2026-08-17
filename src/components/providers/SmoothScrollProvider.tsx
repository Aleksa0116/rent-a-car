"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Wraps the page in Lenis smooth scroll.
 * • lerp 0.08  → ~Apple/Linear feel (slower = silkier)
 * • smoothWheel true  → smooth trackpad & mouse wheel
 * • IntersectionObserver (used by Framer Motion whileInView &
 *   the sticky fleet filter) still works correctly because
 *   Lenis keeps window.scrollY in sync with native scroll.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Allow any modal/overlay to pause and resume smooth scroll by dispatching
    // custom DOM events. This is decoupled — no shared state or context needed.
    const handleStop  = () => lenis.stop();
    const handleStart = () => lenis.start();
    document.addEventListener("lenis:stop",  handleStop);
    document.addEventListener("lenis:start", handleStart);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("lenis:stop",  handleStop);
      document.removeEventListener("lenis:start", handleStart);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

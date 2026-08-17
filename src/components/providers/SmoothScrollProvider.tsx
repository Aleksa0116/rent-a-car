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

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

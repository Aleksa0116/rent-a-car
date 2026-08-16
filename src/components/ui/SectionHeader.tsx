"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Animation variants ─────────────────────────────────────────────────────────
// Each section across the site gets a different entrance character so the page
// doesn't feel like a repeating template as the user scrolls.

const ANIMATION_VARIANTS = {
  /** Default — content rises from just below its final position. */
  "slide-up": {
    initial:    { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
  },
  /** Used for left-aligned sections — slides in from the leading edge. */
  "slide-left": {
    initial:    { opacity: 0, x: -36 },
    whileInView: { opacity: 1, x: 0 },
  },
  /** Used for "hero" content blocks — scales out of a slightly compressed state. */
  "scale": {
    initial:    { opacity: 0, scale: 0.92, y: 8 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
  },
} as const;

type AnimationVariant = keyof typeof ANIMATION_VARIANTS;

// ─── Props ─────────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  animationVariant?: AnimationVariant;
  className?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function SectionHeader({
  label,
  title,
  titleHighlight,
  description,
  align = "center",
  animationVariant = "slide-up",
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left:   "items-start text-left",
    center: "items-center text-center",
    right:  "items-end text-right",
  }[align];

  const { initial, whileInView } = ANIMATION_VARIANTS[animationVariant];

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-4", alignClass, className)}
    >
      {label && (
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-1.5 shadow-[0_0_0_1.5px_rgba(99,102,241,0.22),inset_0_1px_0_rgba(255,255,255,0.85)]">
          {/* Gradient accent dot */}
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 shadow-[0_0_5px_rgba(99,102,241,0.55)]" />
          {/* Gradient text */}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-[11px] font-bold uppercase tracking-[0.18em] text-transparent">
            {label}
          </span>
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}{" "}
        {titleHighlight && (
          <span className="gradient-text">{titleHighlight}</span>
        )}
      </h2>
      {description && (
        <p className="max-w-2xl text-base text-[var(--color-text-secondary)] sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

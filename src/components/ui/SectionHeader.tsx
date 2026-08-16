"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignClass = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  }[align];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("flex flex-col gap-4", alignClass, className)}
    >
      {label && (
        <span className="section-label">
          <span className="h-1 w-4 rounded-full bg-[var(--color-brand-500)]" />
          {label}
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

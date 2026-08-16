"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck, Car } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

// ─── Card entrance directions ───────────────────────────────────────────────
// Cards "gather" from three directions: left col slides from left, middle rises
// from below, right col slides from right. Creates a sense of convergence.
function cardInitial(index: number) {
  const col = index % 3;
  if (col === 0) return { opacity: 0, x: -40, y: 16 };
  if (col === 2) return { opacity: 0, x:  40, y: 16 };
  return         { opacity: 0, y: 52 };
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* ── Rating-centric header ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 text-center">

          {/* Big rating number — spring "pop" so it feels alive */}
          <motion.div
            initial={{ opacity: 0, scale: 0.55 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.34, 1.56, 0.64, 1], // overshoot spring
            }}
            className="flex items-center gap-4"
          >
            <span className="text-[4.5rem] font-black leading-none tracking-tighter text-zinc-900">
              4.8
            </span>
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i <= 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-200 text-amber-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-zinc-500">
                od <span className="font-bold text-zinc-700">2,400+</span> recenzija
              </p>
            </div>
          </motion.div>

          {/* Title slides up after the rating has "landed" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl"
          >
            Šta kažu naši{" "}
            <span className="gradient-text">klijenti</span>
          </motion.h2>
        </div>

        {/* ── Cards ────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={cardInitial(i)}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col gap-4 rounded-2xl border bg-[var(--color-surface-card)] p-6",
                "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
                i === 1
                  ? "border-blue-200 shadow-[0_0_0_1px_rgba(37,99,235,0.1),var(--shadow-card)] hover:border-blue-300"
                  : "border-[var(--color-surface-border)] shadow-[var(--shadow-card)] hover:border-[color-mix(in_srgb,var(--color-brand-500)_25%,var(--color-surface-border))]"
              )}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-5 h-8 w-8 text-[var(--color-surface-muted)] opacity-60"
                strokeWidth={1}
              />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[var(--color-brand-400)] text-[var(--color-brand-400)]"
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Car rented badge */}
              <div className="flex items-center gap-2 rounded-xl bg-[var(--color-surface-raised)] px-3 py-2">
                <Car className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-400)]" />
                <span className="text-xs font-medium text-[var(--color-text-muted)]">
                  {t.carRented}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-between border-t border-[var(--color-surface-border)] pt-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                        {t.name}
                      </p>
                      {t.verified && (
                        <BadgeCheck className="h-3.5 w-3.5 text-[var(--color-brand-400)]" />
                      )}
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)]">{t.location}</p>
                  </div>
                </div>
                <span className="text-xs text-[var(--color-text-disabled)]">
                  {new Date(t.date).toLocaleDateString("sr-RS", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

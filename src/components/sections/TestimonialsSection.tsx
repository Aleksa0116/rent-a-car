"use client";

import { motion } from "framer-motion";
import { Star, Quote, BadgeCheck } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ── Rating-centric header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 text-center"
        >
          {/* Rating row */}
          <div className="flex items-center gap-4">
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
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
            Šta kažu naši{" "}
            <span className="gradient-text">klijenti</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col gap-4 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-6",
                "transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-brand-500)_25%,var(--color-surface-border))] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]",
                i === 1 && "lg:scale-[1.02] border-[color-mix(in_srgb,var(--color-brand-500)_20%,var(--color-surface-border))]"
              )}
            >
              {/* Quote icon */}
              <Quote
                className="absolute top-5 right-5 h-8 w-8 text-[var(--color-surface-muted)] opacity-60"
                strokeWidth={1}
              />

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
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
                <span className="text-base">🚗</span>
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

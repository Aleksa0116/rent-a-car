"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Car, Key, ThumbsUp, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ─── Steps data ────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    icon: <Car className="h-6 w-6" />,
    title: "Izaberite Vozilo",
    description:
      "Pregledajte flotu, filtrirajte po kategoriji ili budžetu i pronađite vozilo koje odgovara Vašim potrebama.",
  },
  {
    num: "02",
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Pošaljite Upit",
    description:
      "Kliknite 'Izaberi', popunite kratki obrazac i pošaljite rezervaciju direktno na naš WhatsApp.",
  },
  {
    num: "03",
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Dobijte Potvrdu",
    description:
      "Naš tim odgovara za 30 minuta — potvrđujemo dostupnost, cenu i sve detalje rezervacije.",
  },
  {
    num: "04",
    icon: <Key className="h-6 w-6" />,
    title: "Preuzmite Vozilo",
    description:
      "Dođite na dogovorenu lokaciju ili dostavimo na Vašu adresu. Pregledamo zajedno, potpisujemo i krećete!",
  },
] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          label="Kako Funkcioniše"
          title="Rezervacija za"
          titleHighlight="60 Sekundi"
          description="Jednostavan proces u 4 koraka. Bez birokratije, bez čekanja — samo brza i pouzdana usluga."
          animationVariant="slide-left"
        />

        {/* ── Desktop: flex row + chevron connectors ──────────────────────────── */}
        <div className="hidden lg:flex items-stretch">
          {steps.map((step, i) => (
            <Fragment key={step.num}>
              <StepCard step={step} index={i} />

              {/* Connector between cards */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.1 + 0.28 }}
                  className="flex shrink-0 items-center self-center px-1"
                >
                  <ChevronRight className="h-5 w-5 text-blue-200" />
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>

        {/* ── Mobile / tablet: 2-column grid ──────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {steps.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── StepCard ──────────────────────────────────────────────────────────────────

interface StepProps {
  step: (typeof steps)[number];
  index: number;
}

function StepCard({ step, index }: StepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={[
        /* Layout */
        "group relative flex flex-1 flex-col overflow-hidden",
        /* Shape */
        "rounded-2xl border border-zinc-100 bg-white",
        /* Spacing */
        "px-6 pb-10 pt-6",
        /* Shadow */
        "shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)]",
        /* Hover lift */
        "transition-all duration-300",
        "hover:-translate-y-2 hover:shadow-[0_20px_56px_-16px_rgba(0,0,0,0.13)]",
      ].join(" ")}
    >
      {/*
       * ── Watermark number ──────────────────────────────────────────────────
       * Huge, ultra-light background text that gives each card its identity
       * without competing with the content. Shifts to a faint blue tint on
       * hover so the card "warms up" subtly.
       */}
      <span
        aria-hidden
        className={[
          "pointer-events-none select-none",
          "absolute -bottom-3 -right-1",
          "text-[6.5rem] font-black leading-none",
          "text-zinc-100",
          "transition-colors duration-300 group-hover:text-blue-50",
        ].join(" ")}
      >
        {step.num}
      </span>

      {/*
       * ── Icon ──────────────────────────────────────────────────────────────
       * Blue rounded square that scales slightly on card hover.
       * A subtle top-highlight gradient adds dimension without gradients.
       */}
      <div
        className={[
          "relative mb-5 inline-flex h-[3.25rem] w-[3.25rem] shrink-0",
          "items-center justify-center rounded-xl",
          "bg-blue-600 text-white",
          "transition-all duration-300",
          "group-hover:scale-[1.07]",
          "group-hover:shadow-[0_8px_24px_-4px_rgba(37,99,235,0.55)]",
        ].join(" ")}
        style={{ boxShadow: "0 4px 16px -4px rgba(37,99,235,0.42)" }}
      >
        {step.icon}
        {/* Gloss highlight */}
        <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* Step label */}
      <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-500">
        Korak {index + 1}
      </p>

      {/* Title */}
      <h3 className="mb-2.5 text-[15px] font-bold leading-snug text-zinc-900">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-500">
        {step.description}
      </p>
    </motion.div>
  );
}

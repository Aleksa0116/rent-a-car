"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Fuel, MessageCircle, Zap } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { openCarInquiryWhatsApp } from "@/lib/whatsapp";
import type { Car } from "@/lib/types";

// ─── Label maps ────────────────────────────────────────────────────────────────

const FUEL_LABELS: Record<string, string> = {
  petrol:   "Benzin",
  diesel:   "Dizel",
  hybrid:   "Hibrid",
  electric: "Električni",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  manual:    "Manuelni",
  automatic: "Automatik",
};

const CATEGORY_LABELS: Record<string, string> = {
  economy:     "Ekonomična",
  compact:     "Gradski",
  suv:         "SUV",
  luxury:      "Premium",
  van:         "Kombi",
  convertible: "Kabriolet",
  sport:       "Sport",
  business:    "Biznis",
};

// ─── Types ─────────────────────────────────────────────────────────────────────

interface CarCardProps {
  car: Car;
  index?: number;
  onBookNow?: (car: Car) => void;
  onDetails?: (car: Car) => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function CarCard({ car, index = 0, onBookNow, onDetails }: CarCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError,  setImgError]  = useState(false);

  const transmissionLetter = car.specs.transmission === "automatic" ? "A" : "M";
  const transmissionLabel  = TRANSMISSION_LABELS[car.specs.transmission] ?? "—";
  const fuelLabel          = FUEL_LABELS[car.specs.fuelType] ?? car.specs.fuelType;
  const categoryLabel      = (CATEGORY_LABELS[car.category] ?? car.category).toUpperCase();
  const carName            = `${car.brand} ${car.model}`.toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{    opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.44,
        delay:    (index % 4) * 0.06,
        ease:     [0.16, 1, 0.3, 1],
      }}
      className={cn(
        "group flex flex-col bg-white rounded-xl",
        "border border-zinc-100",
        "shadow-sm transition-shadow duration-300 hover:shadow-lg",
        !car.available && "opacity-60"
      )}
    >

      {/* ── Header — fixed height so image always starts at the same Y ─────── */}
      {/*
       *  Category label  ≈ 16 px
       *  Name (h-12)     = 48 px  ← clipped container — fits 2 lines of text-base
       *  ─────────────────────────
       *  Total (+ pt-4)  = 80 px before the image zone.
       *  Single-line names leave whitespace inside h-12; long names are clipped.
       *  Either way, the image always starts at the same vertical position.
       */}
      <div className="px-4 pt-4 pb-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
          {categoryLabel}
        </p>
        {/* Fixed-height name box — key to consistent card alignment */}
        <div className="h-12 overflow-hidden">
          <h3 className="text-base font-extrabold uppercase leading-6 text-slate-900 sm:text-[17px]">
            {carName}
          </h3>
        </div>
      </div>

      {/* ── Image — clickable for quick-view, badges overlaid ─────────────── */}
      <div
        className="relative mt-2 h-44 w-full cursor-pointer overflow-hidden"
        onClick={() => onDetails?.(car)}
        role="button"
        tabIndex={0}
        aria-label={`Pogledaj detalje — ${car.name}`}
        onKeyDown={(e) => e.key === "Enter" && onDetails?.(car)}
      >

        {!imgError ? (
          <>
            {/*
             * ── Blur-up placeholder ────────────────────────────────────────────
             * A separate div that is always mounted so it can fade out smoothly
             * (opacity transition) while the real image fades in.
             * Using scale-110 prevents the blurred edges from showing inside the
             * overflow-hidden container.
             */}
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 scale-110",
                "bg-gradient-to-br from-zinc-50 to-zinc-100",
                "blur-2xl transition-opacity duration-500 ease-out",
                imgLoaded ? "opacity-0" : "opacity-100"
              )}
            />

            {/*
             * ── Real image ─────────────────────────────────────────────────────
             * Starts at opacity-0 so the blur placeholder is fully visible.
             * On onLoad: both opacity and filter transition simultaneously.
             *   • opacity  0 → 1        (500 ms ease-out)
             *   • filter   none → drop-shadow (500 ms ease-out)
             * group-hover:scale-[1.04] is also a transform transition on hover.
             */}
            <Image
              src={car.thumbnailImage}
              alt={car.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={85}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={cn(
                "object-contain px-6 py-3",
                "transition-all duration-500 ease-out",
                "group-hover:scale-[1.04]",
                imgLoaded ? "opacity-100" : "opacity-0"
              )}
              style={{
                filter: imgLoaded
                  ? "drop-shadow(0 10px 18px rgba(0,0,0,0.12))"
                  : "none",
              }}
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 80 50" className="w-28 text-zinc-300" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="4" y="18" width="72" height="24" rx="4" />
              <path d="M16 18 L24 6 L56 6 L64 18" />
              <circle cx="22" cy="42" r="7" />
              <circle cx="58" cy="42" r="7" />
            </svg>
          </div>
        )}

        {/* Elliptical ground-plane shadow */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 h-3 w-2/3 rounded-full bg-black/[0.07] blur-md"
        />

        {/* Status pills — overlaid on image so they never shift text/buttons */}
        <div className="absolute right-2.5 top-2.5 flex flex-col items-end gap-1">
          {car.badge && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              <Zap className="h-2.5 w-2.5" />
              {car.badge}
            </span>
          )}
          {car.isNew && (
            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              Novo
            </span>
          )}
          {!car.available && (
            <span className="inline-flex items-center rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
              Nedostupno
            </span>
          )}
        </div>
      </div>

      {/* ── Specs + Footer ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-4 pb-4">

        {/* Specs row — fixed single-line height via py-3 */}
        <div className="flex items-center gap-4 border-b border-zinc-100 py-3">

          {/* Transmission: letter badge + label */}
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-[11px] font-bold text-zinc-600">
              {transmissionLetter}
            </span>
            <span className="text-sm text-zinc-500">{transmissionLabel}</span>
          </div>

          <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-zinc-200" />

          {/* Fuel: icon + label */}
          <div className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4 shrink-0 text-zinc-400" />
            <span className="text-sm text-zinc-500">{fuelLabel}</span>
          </div>
        </div>

        {/* Footer: price left, button right — always on same baseline */}
        <div className="mt-3 flex items-center justify-between gap-3">

          {/* Price */}
          <div className="min-w-0">
            <div className="flex items-baseline gap-0.5 leading-none">
              <span className="text-xs font-medium text-zinc-400">od&nbsp;</span>
              <span className="text-xl font-extrabold text-zinc-900">
                {formatCurrency(car.pricing.daily, car.pricing.currency)}
              </span>
              <span className="text-[11px] font-semibold text-blue-600/70">/dan</span>
            </div>
            <p className="mt-0.5 text-[11px] text-zinc-400">
              Depozit {formatCurrency(car.pricing.deposit, car.pricing.currency)}
            </p>
          </div>

          {/* CTA */}
          {car.available ? (
            <button
              type="button"
              onClick={() => onBookNow?.(car)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg",
                "bg-zinc-900 px-5 py-2.5",
                "text-sm font-bold uppercase tracking-wide text-white",
                "transition-colors duration-200 hover:bg-zinc-800 active:scale-[0.97]"
              )}
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#25D366]" />
              Izaberi
            </button>
          ) : (
            <button
              type="button"
              onClick={() => openCarInquiryWhatsApp(car.name)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg",
                "border border-zinc-200 bg-zinc-50 px-5 py-2.5",
                "text-sm font-bold uppercase tracking-wide text-zinc-500",
                "transition-colors duration-200 hover:border-zinc-300 hover:text-zinc-700 active:scale-[0.97]"
              )}
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0 text-[#25D366]" />
              Upit
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

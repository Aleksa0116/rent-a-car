"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Fuel,
  Settings2,
  Gauge,
  AirVent,
  DoorOpen,
  Briefcase,
  Calendar,
  Zap,
  Check,
  Minus,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { formatCurrency } from "@/lib/utils";
import { openCarInquiryWhatsApp } from "@/lib/whatsapp";
import type { Car } from "@/lib/types";

// ─── Label maps ────────────────────────────────────────────────────────────────

const FUEL_LABELS: Record<string, string> = {
  petrol: "Benzin",
  diesel: "Dizel",
  hybrid: "Hibrid",
  electric: "Električni",
};

const TRANSMISSION_LABELS: Record<string, string> = {
  manual: "Manuelni menjač",
  automatic: "Automatski menjač",
};

const DRIVE_LABELS: Record<string, string> = {
  fwd: "Prednji pogon",
  rwd: "Zadnji pogon",
  awd: "AWD pogon",
  "4wd": "4WD pogon",
};

// ─── Props ─────────────────────────────────────────────────────────────────────

interface CarQuickViewModalProps {
  car: Car | null;
  open: boolean;
  onClose: () => void;
  onBookNow?: (car: Car) => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function CarQuickViewModal({ car, open, onClose, onBookNow }: CarQuickViewModalProps) {
  const [activeImg, setActiveImg]   = useState(0);
  const [imgLoaded, setImgLoaded]   = useState(false);

  if (!car) return null;

  const images = car.images.length > 0 ? car.images : [car.thumbnailImage];

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
      setTimeout(() => { setActiveImg(0); setImgLoaded(false); }, 300);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden rounded-3xl border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] shadow-[0_40px_120px_-20px_rgb(0_0_0/_0.8)]"
              >
                {/* ── Image Gallery ─────────────────────────────────────── */}
                <div className="relative h-64 sm:h-80 shrink-0 bg-[#0d0d10] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImg}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-x-8 inset-y-4 flex items-center justify-center"
                      onAnimationStart={() => setImgLoaded(false)}
                    >
                      {/* Dark blur placeholder for the gallery */}
                      <div
                        aria-hidden
                        className={`absolute inset-0 scale-110 bg-gradient-to-br from-slate-700 to-slate-900 blur-3xl transition-opacity duration-500 ${imgLoaded ? "opacity-0" : "opacity-60"}`}
                      />

                      <Image
                        src={images[activeImg] ?? car.thumbnailImage}
                        alt={`${car.name} — foto ${activeImg + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 768px"
                        onLoad={() => setImgLoaded(true)}
                        className={`object-contain transition-all duration-500 ease-out ${imgLoaded ? "opacity-100 drop-shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : "opacity-0"}`}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Radial glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-24 w-2/3 blur-3xl opacity-20"
                    style={{ background: "radial-gradient(ellipse, #f59e0b, transparent 70%)" }}
                  />

                  {/* Gallery nav arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((i) => (i - 1 + images.length) % images.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setActiveImg((i) => (i + 1) % images.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      {/* Dot indicators */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveImg(i)}
                            className={`h-1.5 rounded-full transition-all duration-200 ${
                              i === activeImg
                                ? "w-6 bg-[var(--color-brand-400)]"
                                : "w-1.5 bg-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Header overlay */}
                  <div className="absolute top-0 inset-x-0 flex items-start justify-between p-4">
                    {/* Category + badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {car.badge && <Badge variant="solid" size="sm">{car.badge}</Badge>}
                      {car.isNew && <Badge variant="success" size="sm">Novo</Badge>}
                      {!car.available && <Badge variant="error" size="sm">Nedostupno</Badge>}
                    </div>
                    {/* Close */}
                    <Dialog.Close className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm hover:bg-black/70 transition-colors">
                      <X className="h-4 w-4" />
                    </Dialog.Close>
                  </div>
                </div>

                {/* ── Scrollable Content ─────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-5 sm:p-6 space-y-6">

                    {/* Title + Rating + Price */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="space-y-1">
                        <StarRating rating={car.rating} reviewCount={car.reviewCount} size="md" />
                        <Dialog.Title className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
                          {car.name}
                        </Dialog.Title>
                        <Dialog.Description className="text-sm text-[var(--color-text-muted)]">
                          {car.specs.year} · {car.specs.engineLabel}
                        </Dialog.Description>
                      </div>
                      <div className="shrink-0 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-5 py-3 text-center">
                        <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-disabled)]">od</p>
                        <p className="text-2xl font-extrabold text-[var(--color-text-primary)] leading-none">
                          {formatCurrency(car.pricing.daily, car.pricing.currency)}
                        </p>
                        <p className="text-xs text-[var(--color-text-muted)]">/dan</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {car.description}
                    </p>

                    {/* ── Specs Table ─────────────────────────────────────── */}
                    <section>
                      <SectionLabel>Tehničke karakteristike</SectionLabel>
                      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        <SpecRow icon={<Settings2 className="h-4 w-4" />} label="Menjač" value={TRANSMISSION_LABELS[car.specs.transmission] ?? "—"} />
                        <SpecRow icon={<Fuel className="h-4 w-4" />} label="Gorivo" value={FUEL_LABELS[car.specs.fuelType] ?? "—"} />
                        <SpecRow icon={<Zap className="h-4 w-4" />} label="Snaga" value={`${car.specs.horsepower} KS`} />
                        <SpecRow icon={<Users className="h-4 w-4" />} label="Sedišta" value={`${car.specs.seats} mesta`} />
                        <SpecRow icon={<DoorOpen className="h-4 w-4" />} label="Vrata" value={`${car.specs.doors} vrata`} />
                        <SpecRow icon={<Briefcase className="h-4 w-4" />} label="Prtljag" value={`${car.specs.luggage} koferi`} />
                        <SpecRow icon={<Gauge className="h-4 w-4" />} label="Motor" value={car.specs.engineLabel} />
                        <SpecRow icon={<MapPin className="h-4 w-4" />} label="Pogon" value={DRIVE_LABELS[car.specs.driveType] ?? "—"} />
                        <SpecRow icon={<Calendar className="h-4 w-4" />} label="Godište" value={String(car.specs.year)} />
                        <SpecRow icon={<AirVent className="h-4 w-4" />} label="Klima" value={car.specs.airConditioning ? "Da" : "Ne"} />
                        <SpecRow icon={<Fuel className="h-4 w-4" />} label="Potrošnja" value={car.specs.consumption} />
                      </div>
                    </section>

                    {/* ── Features Checklist ──────────────────────────────── */}
                    <section>
                      <SectionLabel>Oprema i karakteristike</SectionLabel>
                      <div className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {car.features.map((f) => (
                          <div
                            key={f.label}
                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 border ${
                              f.available
                                ? "border-[var(--color-surface-border)] bg-[var(--color-surface-card)]"
                                : "border-transparent bg-transparent opacity-40"
                            }`}
                          >
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                                f.available
                                  ? "bg-[color-mix(in_srgb,var(--color-brand-500)_15%,transparent)] text-[var(--color-brand-400)]"
                                  : "bg-[var(--color-surface-raised)] text-[var(--color-text-disabled)]"
                              }`}
                            >
                              {f.available ? (
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              ) : (
                                <Minus className="h-3 w-3" />
                              )}
                            </div>
                            <span className={`text-xs font-medium ${f.available ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-disabled)] line-through"}`}>
                              {f.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* ── Pricing Summary ─────────────────────────────────── */}
                    <section>
                      <SectionLabel>Cenovnik</SectionLabel>
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        {[
                          { label: "Dnevno", value: car.pricing.daily },
                          { label: "Sedmično", value: car.pricing.weekly },
                          { label: "Mesečno", value: car.pricing.monthly },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            className="rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-3 text-center"
                          >
                            <p className="text-[10px] uppercase tracking-widest text-[var(--color-text-disabled)]">{label}</p>
                            <p className="text-lg font-bold text-[var(--color-text-primary)] mt-0.5">
                              {formatCurrency(value, car.pricing.currency)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-[var(--color-text-disabled)] text-center">
                        Depozit {formatCurrency(car.pricing.deposit, car.pricing.currency)} · {car.pricing.includedKmPerDay} km/dan · extra {formatCurrency(car.pricing.extraKmRate, car.pricing.currency)}/km
                      </p>
                    </section>
                  </div>
                </div>

                {/* ── Footer CTA ─────────────────────────────────────────── */}
                <div className="shrink-0 flex gap-3 border-t border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] p-4">
                  <Button
                    variant="secondary"
                    size="md"
                    className="flex-1"
                    leftIcon={<MessageCircle className="h-4 w-4 text-[#25D366]" />}
                    onClick={() => openCarInquiryWhatsApp(car.name)}
                  >
                    WhatsApp upit
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    disabled={!car.available}
                    rightIcon={<ChevronRight className="h-4 w-4" />}
                    onClick={() => {
                      onClose();
                      if (car.available) onBookNow?.(car);
                    }}
                  >
                    {car.available ? "Rezerviši odmah" : "Nedostupno"}
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
        {children}
      </span>
      <div className="flex-1 h-px bg-[var(--color-surface-border)]" />
    </div>
  );
}

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-3 py-2.5">
      <span className="text-[var(--color-brand-400)] shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] text-[var(--color-text-disabled)] uppercase tracking-wider">{label}</p>
        <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">{value}</p>
      </div>
    </div>
  );
}

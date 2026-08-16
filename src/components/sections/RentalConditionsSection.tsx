"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, UserCheck, Shield, Fuel,
  ShieldCheck, MapPin, Globe, Ban, Phone,
  ChevronDown,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { rentalConditions } from "@/data/conditions";
import { cn } from "@/lib/utils";
import type { RentalCondition } from "@/lib/types";

const iconMap: Record<string, React.ReactNode> = {
  CreditCard:  <CreditCard  className="h-4 w-4" />,
  UserCheck:   <UserCheck   className="h-4 w-4" />,
  Shield:      <Shield      className="h-4 w-4" />,
  Fuel:        <Fuel        className="h-4 w-4" />,
  ShieldCheck: <ShieldCheck className="h-4 w-4" />,
  MapPin:      <MapPin      className="h-4 w-4" />,
  Globe:       <Globe       className="h-4 w-4" />,
  Ban:         <Ban         className="h-4 w-4" />,
  PawPrint:    <span className="text-sm leading-none">🐾</span>,
  Phone:       <Phone       className="h-4 w-4" />,
};

const categoryConfig: Record<
  RentalCondition["category"],
  { label: string; iconBg: string; iconText: string; badge: string }
> = {
  requirement: {
    label:    "Uslov",
    iconBg:   "bg-blue-50",
    iconText: "text-[var(--color-brand-500)]",
    badge:    "bg-blue-50 text-blue-700 border-blue-100",
  },
  policy: {
    label:    "Politika",
    iconBg:   "bg-violet-50",
    iconText: "text-violet-600",
    badge:    "bg-violet-50 text-violet-700 border-violet-100",
  },
  included: {
    label:    "Uključeno",
    iconBg:   "bg-emerald-50",
    iconText: "text-emerald-600",
    badge:    "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  excluded: {
    label:    "Zabranjeno",
    iconBg:   "bg-red-50",
    iconText: "text-red-600",
    badge:    "bg-red-50 text-red-700 border-red-100",
  },
};

export default function RentalConditionsSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          label="Uslovi najma"
          title="Transparentni"
          titleHighlight="uslovi"
          description="Sve što trebate znati pre iznajmljivanja. Nema iznenađenja — samo jasna pravila."
        />

        {/* Two-column grid on md+, single column on mobile */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-8">
          {rentalConditions.map((condition, i) => {
            const cfg    = categoryConfig[condition.category];
            const isOpen = openId === condition.id;

            return (
              <motion.div
                key={condition.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "border-b border-[var(--color-surface-border)]",
                  /* last in each column — remove border on the very last item */
                  i === rentalConditions.length - 1 && "border-b-0"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(condition.id)}
                  className="flex w-full items-center gap-3.5 py-4 text-left transition-colors hover:bg-[var(--color-surface-hover)] -mx-3 px-3 rounded-xl"
                  aria-expanded={isOpen}
                >
                  {/* Icon */}
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                      cfg.iconBg,
                      cfg.iconText
                    )}
                  >
                    {iconMap[condition.icon] ?? <Shield className="h-4 w-4" />}
                  </span>

                  {/* Title */}
                  <span className="flex-1 text-sm font-semibold text-[var(--color-text-primary)]">
                    {condition.title}
                  </span>

                  {/* Category badge */}
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider hidden sm:inline-flex",
                      cfg.badge
                    )}
                  >
                    {cfg.label}
                  </span>

                  {/* Chevron */}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Expanded description */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 pl-[2.875rem] pr-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {condition.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

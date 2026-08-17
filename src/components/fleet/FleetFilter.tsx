"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTER_STATE } from "@/lib/config";
import { PremiumSelect } from "@/components/ui/PremiumSelect";
import type { FilterState, CarCategory, FuelType, TransmissionType, SortOption } from "@/lib/types";

// ─── Config ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",        label: "Sva vozila", icon: "🚘" },
  { id: "economy",    label: "Ekonomična", icon: "💰" },
  { id: "compact",    label: "Gradski",    icon: "🏙" },
  { id: "suv",        label: "SUV",        icon: "🏔" },
  { id: "business",   label: "Biznis",     icon: "💼" },
  { id: "luxury",     label: "Premium",    icon: "⭐" },
  { id: "sport",      label: "Sport",      icon: "🏎" },
  { id: "van",        label: "Kombi",      icon: "🚐" },
] as const;

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "price-asc",   label: "Cena: rastuće" },
  { id: "price-desc",  label: "Cena: opadajuće" },
  { id: "name-asc",    label: "Naziv A–Z" },
];

const TRANSMISSION_OPTIONS = [
  { id: "all",       label: "Sve" },
  { id: "automatic", label: "Automatik" },
  { id: "manual",    label: "Manuelni" },
] as { id: TransmissionType | "all"; label: string }[];

const FUEL_OPTIONS = [
  { id: "all",      label: "Sve" },
  { id: "petrol",   label: "Benzin" },
  { id: "diesel",   label: "Dizel" },
  { id: "hybrid",   label: "Hibrid" },
  { id: "electric", label: "Elektro" },
] as { id: FuelType | "all"; label: string }[];

// ─── Props ─────────────────────────────────────────────────────────────────────

interface FleetFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
  totalCars: number;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function FleetFilter({ filters, onChange, totalResults, totalCars }: FleetFilterProps) {
  const [panelOpen, setPanelOpen] = useState(false);

  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const secondaryCount = [
    filters.fuelType !== "all",
    filters.transmission !== "all",
    filters.availableOnly,
  ].filter(Boolean).length;

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.searchQuery !== "" ||
    secondaryCount > 0;

  return (
    <div className="space-y-4">

      {/* ── Row 1: Search + Filters toggle + Sort ───────────────────────────── */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Pretraži vozilo..."
            value={filters.searchQuery}
            onChange={(e) => set("searchQuery", e.target.value)}
            className={cn(
              "h-11 w-full rounded-xl border border-zinc-150 bg-white",
              "pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400",
              "outline-none transition-all",
              "focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            )}
          />
          <AnimatePresence>
            {filters.searchQuery.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.12 }}
                onClick={() => set("searchQuery", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 hover:bg-zinc-300 transition-colors"
              >
                <X className="h-3 w-3" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Filters toggle button */}
        <button
          onClick={() => setPanelOpen((o) => !o)}
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-xl border px-3.5 py-2.5 text-sm font-semibold transition-all duration-200",
            panelOpen || secondaryCount > 0
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-800"
          )}
        >
          <SlidersHorizontal className="h-4 w-4 shrink-0" />
          <span className="hidden sm:inline">Filteri</span>
          {secondaryCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              {secondaryCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <div className="shrink-0 min-w-[175px]">
          <PremiumSelect
            value={filters.sortBy}
            onValueChange={(v) => set("sortBy", v as SortOption)}
            options={SORT_OPTIONS.map((o) => ({ value: o.id, label: o.label }))}
            icon={<ArrowUpDown className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* ── Row 2: Category chips ─────────────────────────────────────────────── */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => set("category", cat.id as CarCategory | "all")}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold",
                "transition-colors duration-150 select-none",
                isActive
                  ? "text-white"
                  : "border border-zinc-100 bg-white text-zinc-600 hover:border-zinc-200 hover:text-zinc-800"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="fleet-category-pill"
                  className="absolute inset-0 rounded-full bg-blue-600"
                  transition={{ type: "spring", stiffness: 400, damping: 38 }}
                />
              )}
              <span className="relative z-10 text-sm leading-none">{cat.icon}</span>
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Collapsible secondary filter panel ───────────────────────────────── */}
      <AnimatePresence initial={false}>
        {panelOpen && (
          <motion.div
            key="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-4">

              {/* Transmission */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Menjač
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {TRANSMISSION_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => set("transmission", opt.id)}
                      className={cn(
                        "rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all duration-150",
                        filters.transmission === opt.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-100" />

              {/* Fuel */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <span className="w-20 shrink-0 text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Gorivo
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {FUEL_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => set("fuelType", opt.id)}
                      className={cn(
                        "rounded-lg px-3.5 py-1.5 text-sm font-semibold transition-all duration-150",
                        filters.fuelType === opt.id
                          ? "bg-blue-600 text-white shadow-sm"
                          : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-zinc-100" />

              {/* Available only */}
              <button
                onClick={() => set("availableOnly", !filters.availableOnly)}
                className="flex items-center gap-3 text-sm font-semibold text-zinc-700 transition-colors hover:text-zinc-900"
              >
                {/* Custom checkbox */}
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-150",
                    filters.availableOnly
                      ? "border-blue-600 bg-blue-600"
                      : "border-zinc-300 bg-white"
                  )}
                >
                  {filters.availableOnly && (
                    <svg className="h-3 w-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </span>
                Prikaži samo dostupna vozila
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results bar ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <motion.p
          key={totalResults}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm text-zinc-500"
        >
          <span className="font-bold text-zinc-900">{totalResults}</span>
          {" od "}
          <span>{totalCars}</span>
          {" vozila"}
        </motion.p>

        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={() => { onChange(DEFAULT_FILTER_STATE); setPanelOpen(false); }}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              Resetuj filtere
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

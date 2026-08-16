"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpDown, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PremiumSelect } from "@/components/ui/PremiumSelect";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTER_STATE } from "@/lib/config";
import type { FilterState, CarCategory, FuelType, TransmissionType, SortOption } from "@/lib/types";

// ─── Config ────────────────────────────────────────────────────────────────────

interface CategoryPill {
  id: CarCategory | "all";
  label: string;
  emoji: string;
}

const CATEGORIES: CategoryPill[] = [
  { id: "all",        label: "Sva vozila",  emoji: "🚘" },
  { id: "economy",    label: "Ekonomična",  emoji: "💚" },
  { id: "compact",    label: "Gradski",     emoji: "🏙" },
  { id: "suv",        label: "SUV",         emoji: "🏔" },
  { id: "business",   label: "Biznis",      emoji: "💼" },
  { id: "luxury",     label: "Premium",     emoji: "⭐" },
  { id: "sport",      label: "Sport",       emoji: "🏎" },
  { id: "van",        label: "Kombi",       emoji: "🚐" },
];

const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "price-asc",   label: "Cena: rastuće" },
  { id: "price-desc",  label: "Cena: opadajuće" },
  { id: "rating-desc", label: "Ocena" },
  { id: "name-asc",    label: "Naziv A-Z" },
];

// ─── Props ─────────────────────────────────────────────────────────────────────

interface FleetFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
  totalCars: number;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function FleetFilter({ filters, onChange, totalResults, totalCars }: FleetFilterProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.fuelType !== "all" ||
    filters.transmission !== "all" ||
    filters.searchQuery !== "" ||
    filters.availableOnly;

  return (
    <div className="space-y-5">

      {/* ── Row 1: Search + Sort ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Search input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Pretraži po marki ili modelu..."
            value={filters.searchQuery}
            onChange={(e) => set("searchQuery", e.target.value)}
            className="h-11 w-full rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] pl-10 pr-10 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none transition-all focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--color-brand-500)_15%,transparent)]"
          />
          <AnimatedClearBtn
            show={filters.searchQuery.length > 0}
            onClick={() => set("searchQuery", "")}
          />
        </div>

        {/* Sort select */}
        <div className="shrink-0 min-w-[200px]">
          <PremiumSelect
            variant="default"
            value={filters.sortBy}
            onValueChange={(v) => set("sortBy", v as SortOption)}
            options={SORT_OPTIONS.map((o) => ({ value: o.id, label: o.label }))}
            icon={<ArrowUpDown className="h-4 w-4" />}
          />
        </div>
      </div>

      {/* ── Row 2: Category Pills with layoutId indicator ───────────────────── */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => set("category", cat.id)}
              className={cn(
                "relative flex-shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-150 select-none",
                isActive
                  ? "text-white"
                  : "border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {/* Sliding background — layoutId shared across all pills */}
              {isActive && (
                <motion.div
                  layoutId="fleet-category-pill"
                  className="absolute inset-0 rounded-xl bg-[var(--color-brand-500)]"
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span className="relative z-10 text-base leading-none">{cat.emoji}</span>
              <span className="relative z-10">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Row 3: Secondary filters ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">

        {/* Transmission 3-way toggle */}
        <div className="flex items-center gap-1">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--color-text-muted)] mr-1.5" />
          {(
            [
              { id: "all",       label: "Sve" },
              { id: "automatic", label: "Automatik" },
              { id: "manual",    label: "Manuelni" },
            ] as { id: TransmissionType | "all"; label: string }[]
          ).map((opt, i, arr) => {
            const isActive = filters.transmission === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => set("transmission", opt.id)}
                className={cn(
                  "relative px-3.5 py-2 text-xs font-semibold border transition-colors duration-150",
                  i === 0 && "rounded-l-lg",
                  i === arr.length - 1 && "rounded-r-lg",
                  i > 0 && "-ml-px",
                  isActive
                    ? "z-10 border-[var(--color-brand-500)] bg-[color-mix(in_srgb,var(--color-brand-500)_15%,transparent)] text-[var(--color-brand-400)]"
                    : "border-[var(--color-surface-border)] bg-[var(--color-surface-card)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Fuel chips */}
        <div className="flex gap-1">
          {(
            [
              { id: "all",      label: "Sve" },
              { id: "petrol",   label: "Benzin" },
              { id: "diesel",   label: "Dizel" },
              { id: "hybrid",   label: "Hibrid" },
              { id: "electric", label: "Elektro" },
            ] as { id: FuelType | "all"; label: string }[]
          ).map((opt) => (
            <button
              key={opt.id}
              onClick={() => set("fuelType", opt.id)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                filters.fuelType === opt.id
                  ? "bg-[var(--color-brand-500)] text-white shadow-[0_0_10px_-2px_var(--color-brand-500)]"
                  : "border border-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-surface-muted)]"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Available only toggle */}
        <button
          onClick={() => set("availableOnly", !filters.availableOnly)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold border transition-all duration-150",
            filters.availableOnly
              ? "border-[#22c55e] bg-[color-mix(in_srgb,#22c55e_12%,transparent)] text-[#22c55e]"
              : "border-[var(--color-surface-border)] bg-[var(--color-surface-card)] text-[var(--color-text-muted)] hover:border-[var(--color-surface-muted)]"
          )}
        >
          <span
            className={cn(
              "inline-block h-2 w-2 rounded-full transition-colors",
              filters.availableOnly ? "bg-[#22c55e]" : "bg-[var(--color-surface-muted)]"
            )}
          />
          Samo dostupna
        </button>

        {/* Spacer + count + reset */}
        <div className="ml-auto flex items-center gap-3">
          <motion.span
            key={totalResults}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[var(--color-text-muted)]"
          >
            <span className="font-bold text-[var(--color-text-primary)]">{totalResults}</span>
            <span> / {totalCars} vozila</span>
          </motion.span>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<X className="h-3.5 w-3.5" />}
              onClick={() => onChange(DEFAULT_FILTER_STATE)}
            >
              Resetuj
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Animated clear button ─────────────────────────────────────────────────────

function AnimatedClearBtn({ show, onClick }: { show: boolean; onClick: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          onClick={onClick}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:bg-[var(--color-brand-500)] hover:text-white transition-colors"
        >
          <X className="h-3 w-3" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}


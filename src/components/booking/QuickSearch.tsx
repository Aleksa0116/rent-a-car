"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Car, Search, ChevronDown, Check } from "lucide-react";
import { pickupLocations } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
  DateRangePicker,
  formatDateShort,
} from "@/components/ui/DateRangePicker";

/* ─── Static option lists ────────────────────────────────────────────────────── */

interface Option { value: string; label: string }

const LOCATION_OPTIONS: Option[] = pickupLocations.map((loc) => ({
  value: loc.name,
  label: loc.isAirport ? `✈ ${loc.name}` : loc.name,
}));

const CAR_TYPE_OPTIONS: Option[] = [
  { value: "all",      label: "Sva vozila" },
  { value: "economy",  label: "Ekonomična" },
  { value: "compact",  label: "Kompaktna" },
  { value: "suv",      label: "SUV" },
  { value: "business", label: "Biznis" },
  { value: "luxury",   label: "Luksuzna" },
  { value: "sport",    label: "Sport" },
];

/* ─── Main component ─────────────────────────────────────────────────────────── */

export default function QuickSearch() {
  const [location,    setLocation]    = useState("");
  const [pickupDate,  setPickupDate]  = useState<Date | undefined>();
  const [returnDate,  setReturnDate]  = useState<Date | undefined>();
  const [dateOpen,    setDateOpen]    = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [carTypeOpen,  setCarTypeOpen]  = useState(false);
  const [carType,      setCarType]      = useState("all");

  function handleRangeChange(from: Date | undefined, to: Date | undefined) {
    setPickupDate(from);
    setReturnDate(to);
  }

  function handleSearch() {
    window.dispatchEvent(
      new CustomEvent("autoelite:quick-search", { detail: { category: carType } })
    );
    setTimeout(() => {
      document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_12px_48px_-8px_rgba(0,0,0,0.18),0_4px_12px_-4px_rgba(0,0,0,0.08)]">
      {/* Accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-[var(--color-brand-500)] via-[var(--color-brand-400)] to-blue-300" />

      {/* Fields */}
      <div className="flex flex-col divide-y divide-[var(--color-surface-border)] lg:flex-row lg:divide-x lg:divide-y-0">

        {/* 1 — Location */}
        <QuickField
          icon={<MapPin className="h-4 w-4" />}
          label="Lokacija preuzimanja"
          onActivate={() => setLocationOpen(true)}
        >
          <InlineSelect
            value={location}
            onValueChange={setLocation}
            options={LOCATION_OPTIONS}
            placeholder="Odaberite lokaciju…"
            open={locationOpen}
            onOpenChange={setLocationOpen}
          />
        </QuickField>

        {/* 2+3 — Unified date range picker — spans flex:2 on desktop */}
        <DateRangePicker
          from={pickupDate}
          to={returnDate}
          onRangeChange={handleRangeChange}
          open={dateOpen}
          onOpenChange={setDateOpen}
          align="center"
        >
          {/*
           * This button is the Popover.Trigger (via asChild).
           * [flex:2] makes it occupy the same width as the two former date fields.
           * Internally it renders as two visual "sub-fields".
           */}
          <button
            type="button"
            className="lg:[flex:2] flex flex-col focus:outline-none lg:flex-row"
          >
            {/* Pickup sub-field */}
            <div className="group flex flex-1 cursor-pointer items-start gap-3 px-5 py-4 transition-colors hover:bg-[var(--color-surface-hover)] border-b border-[var(--color-surface-border)] lg:border-b-0 lg:border-r">
              <span className="mt-[18px] shrink-0 text-[var(--color-brand-500)] transition-colors group-hover:text-[var(--color-brand-400)]">
                <Calendar className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                  Datum preuzimanja
                </p>
                <p className={cn(
                  "text-sm font-medium",
                  pickupDate ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                )}>
                  {pickupDate ? formatDateShort(pickupDate) : "Odaberite datum"}
                </p>
              </div>
            </div>

            {/* Return sub-field */}
            <div className="group flex flex-1 cursor-pointer items-start gap-3 px-5 py-4 transition-colors hover:bg-[var(--color-surface-hover)]">
              <span className="mt-[18px] shrink-0 text-[var(--color-brand-500)] transition-colors group-hover:text-[var(--color-brand-400)]">
                <Calendar className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
                  Datum vraćanja
                </p>
                <p className={cn(
                  "text-sm font-medium",
                  returnDate ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
                )}>
                  {returnDate ? formatDateShort(returnDate) : "Odaberite datum"}
                </p>
              </div>
            </div>
          </button>
        </DateRangePicker>

        {/* 4 — Car type */}
        <QuickField
          icon={<Car className="h-4 w-4" />}
          label="Tip vozila"
          onActivate={() => setCarTypeOpen(true)}
        >
          <InlineSelect
            value={carType}
            onValueChange={setCarType}
            options={CAR_TYPE_OPTIONS}
            open={carTypeOpen}
            onOpenChange={setCarTypeOpen}
          />
        </QuickField>

        {/* CTA */}
        <div className="p-3 lg:flex lg:items-stretch lg:p-2.5">
          <button
            onClick={handleSearch}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--color-brand-500)] px-6 py-4 text-sm font-bold text-white shadow-[0_4px_16px_-4px_rgba(30,64,175,0.45)] transition-all hover:bg-[var(--color-brand-400)] hover:shadow-[0_6px_22px_-4px_rgba(30,64,175,0.55)] active:scale-[0.98] lg:h-full lg:min-w-[160px] lg:flex-col lg:gap-1.5 lg:px-8"
          >
            <Search className="h-5 w-5 shrink-0" />
            <span className="whitespace-nowrap">Pronađi vozilo</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── QuickField wrapper ─────────────────────────────────────────────────────── */

interface QuickFieldProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  onActivate: () => void;
}

function QuickField({ icon, label, children, onActivate }: QuickFieldProps) {
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (!target.closest("button") && !target.closest("input")) {
      onActivate();
    }
  }

  return (
    <div
      role="button"
      tabIndex={-1}
      onClick={handleClick}
      className="group flex flex-1 cursor-pointer items-start gap-3 px-5 py-4 transition-colors hover:bg-[var(--color-surface-hover)]"
    >
      <span className="mt-[18px] shrink-0 text-[var(--color-brand-500)] transition-colors group-hover:text-[var(--color-brand-400)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
          {label}
        </p>
        {children}
      </div>
    </div>
  );
}

/* ─── InlineSelect ───────────────────────────────────────────────────────────── */
/*
 * A lightweight custom dropdown that renders its panel via createPortal with
 * position:fixed. This COMPLETELY avoids the Radix / react-remove-scroll
 * scroll-locking that was shifting the page on every open.
 */

interface InlineSelectProps {
  value: string;
  onValueChange: (v: string) => void;
  options: Option[];
  placeholder?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function InlineSelect({
  value,
  onValueChange,
  options,
  placeholder = "Odaberite…",
  open,
  onOpenChange,
}: InlineSelectProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const [mounted,   setMounted]   = useState(false);
  const [panelPos,  setPanelPos]  = useState({ top: 0, left: 0, width: 200 });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPanelPos({
      top:   r.bottom + 8,
      left:  r.left,
      width: Math.max(r.width, 220),
    });
  }, [open]);

  const handleOutside = useCallback((e: MouseEvent) => {
    if (
      !triggerRef.current?.contains(e.target as Node) &&
      !panelRef.current?.contains(e.target as Node)
    ) {
      onOpenChange(false);
    }
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, handleOutside]);

  useEffect(() => {
    if (!open) return;
    const onKey    = (e: KeyboardEvent) => { if (e.key === "Escape") onOpenChange(false); };
    const onScroll = () => onOpenChange(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open, onOpenChange]);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className="flex w-full cursor-pointer items-center gap-2 bg-transparent text-left"
      >
        <span
          className={cn(
            "flex-1 text-sm font-medium",
            value ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]"
          )}
        >
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 shrink-0 text-[var(--color-text-muted)] transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -4,  scale: 0.97 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                top:      panelPos.top,
                left:     panelPos.left,
                minWidth: panelPos.width,
                zIndex:   9999,
              }}
              className="overflow-hidden rounded-xl border border-zinc-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08),0_2px_8px_rgb(0,0,0,0.04)]"
            >
              <div className="p-1">
                {options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={opt.value === value}
                    onClick={() => { onValueChange(opt.value); onOpenChange(false); }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-2.5",
                      "text-sm text-zinc-700 outline-none",
                      "transition-colors duration-100",
                      "hover:bg-zinc-50 hover:text-zinc-900",
                      opt.value === value && "font-semibold text-[var(--color-brand-500)]"
                    )}
                  >
                    <span>{opt.label}</span>
                    {opt.value === value && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-500)]" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

"use client";

import { Check } from "lucide-react";
import { cn, getRentalDays } from "@/lib/utils";
import type { BookingDetails } from "@/lib/types";

interface BookingStepExtrasProps {
  booking: BookingDetails;
  onChange: (partial: Partial<BookingDetails>) => void;
}

const extrasConfig: {
  key: keyof BookingDetails["extras"];
  label: string;
  description: string;
  pricePerDay: number;
  icon: string;
}[] = [
  {
    key: "childSeat",
    label: "Dečija sedišta",
    description: "Homologovana sedišta za decu do 36 kg",
    pricePerDay: 5,
    icon: "👶",
  },
  {
    key: "gps",
    label: "GPS navigacija",
    description: "Prenosivi GPS uređaj sa ažuriranim mapama",
    pricePerDay: 8,
    icon: "🗺️",
  },
  {
    key: "additionalDriver",
    label: "Dodatni vozač",
    description: "Dodajte još jednog vozača na ugovor",
    pricePerDay: 10,
    icon: "👤",
  },
  {
    key: "fullInsurance",
    label: "Puno osiguranje",
    description: "CDW + TP + nulta franšiza — bez brige",
    pricePerDay: 15,
    icon: "🛡️",
  },
  {
    key: "roadsideAssistance",
    label: "Pomoć na putu",
    description: "24/7 putna pomoć u celoj Evropi",
    pricePerDay: 5,
    icon: "🔧",
  },
];

export function BookingStepExtras({ booking, onChange }: BookingStepExtrasProps) {
  const days = getRentalDays(booking.pickupDate, booking.dropoffDate);

  const toggleExtra = (key: keyof BookingDetails["extras"]) => {
    onChange({
      extras: { ...booking.extras, [key]: !booking.extras[key] },
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Dodatna oprema
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Prilagodite vaš najam opcionalnom opremom. Cene su po danu.
        </p>
      </div>

      <div className="space-y-3">
        {extrasConfig.map((extra) => {
          const isSelected = booking.extras[extra.key];
          const totalCost = extra.pricePerDay * (days || 1);

          return (
            <button
              key={extra.key}
              onClick={() => toggleExtra(extra.key)}
              className={cn(
                "w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-150",
                isSelected
                  ? "border-[var(--color-brand-500)] bg-[color-mix(in_srgb,var(--color-brand-500)_8%,transparent)]"
                  : "border-[var(--color-surface-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-surface-muted)]"
              )}
            >
              <span className="text-2xl shrink-0">{extra.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {extra.label}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {extra.description}
                </p>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                <span className="text-sm font-bold text-[var(--color-text-primary)]">
                  +€{extra.pricePerDay}/dan
                </span>
                {days > 0 && (
                  <span className="text-xs text-[var(--color-text-muted)]">
                    €{totalCost} ukupno
                  </span>
                )}
              </div>
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all duration-150",
                  isSelected
                    ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)]"
                    : "border-[var(--color-surface-muted)]"
                )}
              >
                {isSelected && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary of selected extras */}
      {Object.values(booking.extras).some(Boolean) && (
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-brand-500)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-500)_6%,transparent)] px-4 py-3">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Odabrani dodaci:</p>
          <div className="flex flex-wrap gap-2">
            {extrasConfig
              .filter((e) => booking.extras[e.key])
              .map((e) => (
                <span
                  key={e.key}
                  className="rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_15%,transparent)] px-2.5 py-1 text-xs font-medium text-[var(--color-brand-400)]"
                >
                  {e.icon} {e.label}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { CalendarDays, Clock, MapPin, User } from "lucide-react";
import { pickupLocations } from "@/lib/config";
import { generateTimeSlots, formatDate } from "@/lib/utils";
import type { BookingDetails } from "@/lib/types";

interface BookingStepDetailsProps {
  booking: BookingDetails;
  onChange: (partial: Partial<BookingDetails>) => void;
}

const timeSlots = generateTimeSlots(7, 22, 30);

export function BookingStepDetails({ booking, onChange }: BookingStepDetailsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
        Detalji najma
      </h3>

      {/* Locations */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Lokacija preuzimanja"
          icon={<MapPin className="h-4 w-4" />}
        >
          <select
            value={booking.pickupLocation?.name ?? ""}
            onChange={(e) => {
              const loc = pickupLocations.find((l) => l.name === e.target.value) ?? null;
              onChange({ pickupLocation: loc });
            }}
            className="form-select"
          >
            <option value="">Izaberi lokaciju...</option>
            {pickupLocations.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.isAirport ? "✈ " : "📍 "}{loc.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          label="Lokacija vraćanja"
          icon={<MapPin className="h-4 w-4" />}
        >
          <select
            value={booking.dropoffLocation?.name ?? ""}
            onChange={(e) => {
              const loc = pickupLocations.find((l) => l.name === e.target.value) ?? null;
              onChange({ dropoffLocation: loc });
            }}
            className="form-select"
          >
            <option value="">Ista kao preuzimanje</option>
            {pickupLocations.map((loc) => (
              <option key={loc.name} value={loc.name}>
                {loc.isAirport ? "✈ " : "📍 "}{loc.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Datum preuzimanja" icon={<CalendarDays className="h-4 w-4" />}>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={booking.pickupDate ? booking.pickupDate.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const d = e.target.value ? new Date(e.target.value) : null;
              onChange({ pickupDate: d });
            }}
            className="form-input"
          />
        </FormField>

        <FormField label="Datum vraćanja" icon={<CalendarDays className="h-4 w-4" />}>
          <input
            type="date"
            min={booking.pickupDate ? booking.pickupDate.toISOString().split("T")[0] : new Date().toISOString().split("T")[0]}
            value={booking.dropoffDate ? booking.dropoffDate.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const d = e.target.value ? new Date(e.target.value) : null;
              onChange({ dropoffDate: d });
            }}
            className="form-input"
          />
        </FormField>
      </div>

      {/* Times */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Vreme preuzimanja" icon={<Clock className="h-4 w-4" />}>
          <select
            value={booking.pickupTime}
            onChange={(e) => onChange({ pickupTime: e.target.value })}
            className="form-select"
          >
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Vreme vraćanja" icon={<Clock className="h-4 w-4" />}>
          <select
            value={booking.dropoffTime}
            onChange={(e) => onChange({ dropoffTime: e.target.value })}
            className="form-select"
          >
            {timeSlots.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Customer Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] flex items-center gap-2">
          <User className="h-4 w-4 text-[var(--color-brand-400)]" />
          Vaši podaci
        </h4>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField label="Ime i prezime">
            <input
              type="text"
              placeholder="Marko Petrović"
              value={booking.customerName}
              onChange={(e) => onChange({ customerName: e.target.value })}
              className="form-input"
            />
          </FormField>
          <FormField label="Broj telefona">
            <input
              type="tel"
              placeholder="+381 6X XXX XXXX"
              value={booking.customerPhone}
              onChange={(e) => onChange({ customerPhone: e.target.value })}
              className="form-input"
            />
          </FormField>
        </div>
        <FormField label="Napomena (opciono)">
          <textarea
            placeholder="Posebni zahtevi, pitanja..."
            value={booking.notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            rows={3}
            className="form-input resize-none"
          />
        </FormField>
      </div>

      {/* Duration badge */}
      {booking.pickupDate && booking.dropoffDate && (
        <div className="rounded-xl border border-[color-mix(in_srgb,var(--color-brand-500)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-500)_8%,transparent)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-brand-400)]">
            Trajanje najma: {formatDate(booking.pickupDate)} → {formatDate(booking.dropoffDate)}
          </p>
        </div>
      )}
    </div>
  );
}

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
        {icon && <span className="text-[var(--color-brand-400)]">{icon}</span>}
        {label}
      </label>
      {children}
    </div>
  );
}

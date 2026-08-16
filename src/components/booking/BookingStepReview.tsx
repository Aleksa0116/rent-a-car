"use client";

import { MapPin, Calendar, Clock, User, Package, MessageCircle } from "lucide-react";
import { formatDate, calculatePriceSummary, formatCurrency, getRentalDays } from "@/lib/utils";
import type { BookingDetails } from "@/lib/types";

interface BookingStepReviewProps {
  booking: BookingDetails;
}

const extrasLabels: Record<string, string> = {
  childSeat: "Dečija sedišta",
  gps: "GPS navigacija",
  additionalDriver: "Dodatni vozač",
  fullInsurance: "Puno osiguranje",
  roadsideAssistance: "Pomoć na putu",
};

export function BookingStepReview({ booking }: BookingStepReviewProps) {
  const summary = calculatePriceSummary(booking);
  const days = getRentalDays(booking.pickupDate, booking.dropoffDate);
  const selectedExtras = Object.entries(booking.extras).filter(([, v]) => v);

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Pregled rezervacije
        </h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Proverite detalje pre slanja na WhatsApp.
        </p>
      </div>

      {/* Car summary */}
      {booking.car && (
        <ReviewSection title="Vozilo">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-[var(--color-surface-raised)] flex items-center justify-center text-2xl">
              🚗
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">{booking.car.name}</p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {booking.car.specs.year} · {booking.car.specs.transmission} · {booking.car.specs.fuelType}
              </p>
            </div>
          </div>
        </ReviewSection>
      )}

      {/* Rental Period */}
      <ReviewSection title="Termin najma">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ReviewItem
            icon={<MapPin className="h-4 w-4" />}
            label="Preuzimanje"
            value={booking.pickupLocation?.name ?? "—"}
          />
          <ReviewItem
            icon={<MapPin className="h-4 w-4" />}
            label="Vraćanje"
            value={booking.dropoffLocation?.name ?? booking.pickupLocation?.name ?? "—"}
          />
          <ReviewItem
            icon={<Calendar className="h-4 w-4" />}
            label="Datum preuzimanja"
            value={formatDate(booking.pickupDate)}
          />
          <ReviewItem
            icon={<Calendar className="h-4 w-4" />}
            label="Datum vraćanja"
            value={formatDate(booking.dropoffDate)}
          />
          <ReviewItem
            icon={<Clock className="h-4 w-4" />}
            label="Vreme preuzimanja"
            value={booking.pickupTime}
          />
          <ReviewItem
            icon={<Clock className="h-4 w-4" />}
            label="Vreme vraćanja"
            value={booking.dropoffTime}
          />
        </div>
      </ReviewSection>

      {/* Contact */}
      {(booking.customerName || booking.customerPhone) && (
        <ReviewSection title="Kontakt">
          <ReviewItem
            icon={<User className="h-4 w-4" />}
            label="Ime"
            value={booking.customerName || "—"}
          />
          <ReviewItem
            icon={<User className="h-4 w-4" />}
            label="Telefon"
            value={booking.customerPhone || "—"}
          />
        </ReviewSection>
      )}

      {/* Extras */}
      {selectedExtras.length > 0 && (
        <ReviewSection title="Dodaci">
          <div className="flex flex-wrap gap-2">
            {selectedExtras.map(([key]) => (
              <span
                key={key}
                className="rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)] px-3 py-1 text-xs font-medium text-[var(--color-brand-400)]"
              >
                {extrasLabels[key] ?? key}
              </span>
            ))}
          </div>
        </ReviewSection>
      )}

      {/* Price Summary */}
      <div className="rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-500)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-500)_6%,transparent)] p-5 space-y-3">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          <Package className="h-4 w-4 text-[var(--color-brand-400)]" />
          Obračun troška
        </h4>
        <div className="space-y-2">
          <SummaryLine
            label={`Osnovna cena (${days} ${days === 1 ? "dan" : "dana"})`}
            value={formatCurrency(summary.baseCost, summary.currency)}
          />
          {summary.extrasCost > 0 && (
            <SummaryLine
              label="Dodaci"
              value={`+${formatCurrency(summary.extrasCost, summary.currency)}`}
            />
          )}
          {summary.discountAmount > 0 && (
            <SummaryLine
              label="Popust (7+ dana)"
              value={`-${formatCurrency(summary.discountAmount, summary.currency)}`}
              isDiscount
            />
          )}
          <div className="border-t border-[var(--color-surface-border)] pt-2">
            <SummaryLine
              label="Ukupno"
              value={formatCurrency(summary.total, summary.currency)}
              isTotal
            />
          </div>
        </div>
        <p className="text-xs text-[var(--color-text-muted)]">
          * Procenjena cena. Konačna cena biće potvrđena od strane našeg tima.
        </p>
      </div>

      {/* WhatsApp note */}
      <div className="flex items-start gap-3 rounded-xl border border-[color-mix(in_srgb,#25D366_20%,transparent)] bg-[color-mix(in_srgb,#25D366_6%,transparent)] px-4 py-3">
        <MessageCircle className="h-4 w-4 text-[#25D366] mt-0.5 shrink-0" />
        <p className="text-xs text-[var(--color-text-secondary)]">
          Klikom na <strong className="text-[#25D366]">&ldquo;Pošalji na WhatsApp&rdquo;</strong> otvoriće se WhatsApp sa svim detaljima. Naš tim će Vas kontaktirati u roku od 30 minuta.
        </p>
      </div>
    </div>
  );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
        {title}
      </h4>
      <div className="space-y-2 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-4">
        {children}
      </div>
    </div>
  );
}

function ReviewItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        {icon && <span className="text-[var(--color-brand-400)]">{icon}</span>}
        {label}
      </div>
      <span className="text-xs font-medium text-[var(--color-text-primary)]">{value}</span>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  isTotal,
  isDiscount,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
  isDiscount?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span
        className={`text-sm ${isTotal ? "font-bold text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"}`}
      >
        {label}
      </span>
      <span
        className={`text-sm font-semibold ${
          isTotal
            ? "text-[var(--color-brand-400)] text-base"
            : isDiscount
            ? "text-[#22c55e]"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

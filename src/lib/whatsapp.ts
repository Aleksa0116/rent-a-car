import type { BookingDetails, Car } from "./types";
import { formatDate, getRentalDays, calculatePriceSummary, formatCurrency } from "./utils";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "381600000000";

// ─── Primary API ───────────────────────────────────────────────────────────────
// Used by the new single-screen BookingModal.

export interface WhatsAppLinkParams {
  car: Car;
  pickupDate: Date;
  returnDate: Date;
  pickupTime: string;
  returnTime: string;
  pickupLocation: string;
  customerName: string;
  customerPhone?: string;
  extras?: BookingDetails["extras"];
  notes?: string;
  totalPrice: number;
  currency?: string;
}

/**
 * Build a pre-filled WhatsApp URL with a clean, beautifully formatted
 * Serbian message using the standardised inquiry format.
 *
 * Format:
 *   🚗 *Upit za najam vozila*
 *   • Model: [Naziv vozila]
 *   • Period: [Datum od] do [Datum do] ([Broj dana] dana)
 *   • Lokacija: [Aerodrom / Centar / Adresa]
 *   • Procenjena cena: [Ukupno €]
 *   ──────────────────────
 *   • Ime: [Ime klijenta]
 */
export function generateWhatsAppLink(
  params: WhatsAppLinkParams,
  phone = WHATSAPP_NUMBER
): string {
  const {
    car,
    pickupDate,
    returnDate,
    pickupTime,
    returnTime,
    pickupLocation,
    customerName,
    customerPhone,
    extras,
    notes,
    totalPrice,
    currency = "EUR",
  } = params;

  const days = getRentalDays(pickupDate, returnDate);

  const extrasSelected = extras
    ? (Object.keys(extras) as Array<keyof BookingDetails["extras"]>)
        .filter((k) => extras[k])
        .map((k) => EXTRA_LABELS[k])
    : [];

  const lines: (string | null)[] = [
    `🚗 *Upit za najam vozila*`,
    ``,
    `• Model: *${car.name}* (${car.specs.year})`,
    `• Period: *${formatDate(pickupDate)}* do *${formatDate(returnDate)}* (${days} ${pluralizeDan(days)})`,
    `• Vreme: ${pickupTime} → ${returnTime}`,
    `• Lokacija: ${pickupLocation}`,
    `• Procenjena cena: *${formatCurrency(totalPrice, currency)}*`,
    `──────────────────────`,
    `• Ime: *${customerName}*`,
    customerPhone ? `• Telefon: ${customerPhone}` : null,
    extrasSelected.length > 0
      ? `\n🔧 Dodaci: ${extrasSelected.join(", ")}`
      : null,
    notes?.trim() ? `\n📝 Napomena: ${notes.trim()}` : null,
    ``,
    `_Naš tim će Vas kontaktirati u roku od 30 minuta._`,
  ];

  const message = lines.filter(Boolean).join("\n");
  return buildWhatsAppUrl(message, phone);
}

// ─── Legacy API — kept for backward compatibility ──────────────────────────────
// Used by BookingStepReview and WhatsAppFAB.

export function buildBookingMessage(booking: BookingDetails): string {
  const {
    car,
    pickupLocation,
    dropoffLocation,
    pickupDate,
    dropoffDate,
    pickupTime,
    dropoffTime,
    customerName,
    customerPhone,
    extras,
    notes,
  } = booking;

  if (!car) return buildGenericInquiryMessage();

  const days = getRentalDays(pickupDate, dropoffDate);
  const summary = calculatePriceSummary(booking);

  const extrasSelected = (Object.keys(extras) as Array<keyof BookingDetails["extras"]>)
    .filter((k) => extras[k])
    .map((k) => EXTRA_LABELS[k])
    .join(", ");

  const lines: (string | null)[] = [
    `🚗 *Upit za najam vozila*`,
    ``,
    `• Model: *${car.name}* (${car.specs.year})`,
    `• Period: *${formatDate(pickupDate)}* do *${formatDate(dropoffDate)}* (${days} ${pluralizeDan(days)})`,
    `• Vreme: ${pickupTime} → ${dropoffTime}`,
    pickupLocation ? `• Lokacija preuzimanja: ${pickupLocation.name}` : null,
    dropoffLocation ? `• Lokacija vraćanja: ${dropoffLocation.name}` : null,
    `• Procenjena cena: *${formatCurrency(summary.total, summary.currency)}*`,
    `──────────────────────`,
    customerName ? `• Ime: *${customerName}*` : null,
    customerPhone ? `• Telefon: ${customerPhone}` : null,
    extrasSelected ? `\n🔧 Dodaci: ${extrasSelected}` : null,
    notes?.trim() ? `\n📝 Napomena: ${notes.trim()}` : null,
    ``,
    `_Naš tim će Vas kontaktirati u roku od 30 minuta._`,
  ];

  return lines.filter(Boolean).join("\n");
}

export function buildGenericInquiryMessage(): string {
  return [
    `👋 *Upit za iznajmljivanje vozila*`,
    ``,
    `Zdravo! Zanima me iznajmljivanje vozila.`,
    `Molim Vas da me kontaktirate sa dostupnim vozilima i cenama.`,
    ``,
    `_Hvala!_`,
  ].join("\n");
}

export function buildCarInquiryMessage(carName: string): string {
  return [
    `🚗 *Upit za vozilo: ${carName}*`,
    ``,
    `Zdravo! Zanima me iznajmljivanje vozila *${carName}*.`,
    `Molim Vas da me kontaktirate sa dostupnim terminima i cenom.`,
    ``,
    `_Hvala!_`,
  ].join("\n");
}

// ─── URL & window helpers ──────────────────────────────────────────────────────

export function buildWhatsAppUrl(message: string, phone = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message.trim())}`;
}

export function openWhatsApp(message: string, phone = WHATSAPP_NUMBER): void {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(message, phone), "_blank", "noopener,noreferrer");
}

export function openBookingWhatsApp(booking: BookingDetails): void {
  openWhatsApp(buildBookingMessage(booking));
}

export function openCarInquiryWhatsApp(carName: string): void {
  openWhatsApp(buildCarInquiryMessage(carName));
}

export function openGenericWhatsApp(): void {
  openWhatsApp(buildGenericInquiryMessage());
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EXTRA_LABELS: Record<keyof BookingDetails["extras"], string> = {
  childSeat: "Dečija sedišta",
  gps: "GPS navigacija",
  additionalDriver: "Dodatni vozač",
  fullInsurance: "Puno osiguranje",
  roadsideAssistance: "Pomoć na putu",
};

function pluralizeDan(days: number): string {
  if (days === 1) return "dan";
  return "dana";
}

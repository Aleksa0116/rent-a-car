import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, format, isValid } from "date-fns";
import type {
  BookingDetails,
  BookingPriceSummary,
  Car,
  FilterState,
} from "./types";

// ─── Tailwind Class Utility ───────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Date Utilities ───────────────────────────────────────────────────────────

export function formatDate(date: Date | null | undefined): string {
  if (!date || !isValid(date)) return "—";
  return format(date, "dd MMM yyyy");
}

export function formatDateShort(date: Date | null | undefined): string {
  if (!date || !isValid(date)) return "—";
  return format(date, "dd/MM/yy");
}

export function getRentalDays(
  pickupDate: Date | null,
  dropoffDate: Date | null
): number {
  if (!pickupDate || !dropoffDate) return 0;
  const days = differenceInDays(dropoffDate, pickupDate);
  return Math.max(1, days);
}

// ─── Pricing Utilities ────────────────────────────────────────────────────────

export function calculateRentalPrice(
  car: Car,
  pickupDate: Date | null,
  dropoffDate: Date | null
): number {
  const days = getRentalDays(pickupDate, dropoffDate);
  if (days === 0) return 0;

  if (days >= 30) return car.pricing.monthly + Math.max(0, days - 30) * car.pricing.daily;
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const remainingDays = days % 7;
    return weeks * car.pricing.weekly + remainingDays * car.pricing.daily;
  }
  return days * car.pricing.daily;
}

export function calculateExtrasCost(
  extras: BookingDetails["extras"]
): number {
  const prices: Record<keyof BookingDetails["extras"], number> = {
    childSeat: 5,
    gps: 8,
    additionalDriver: 10,
    fullInsurance: 15,
    roadsideAssistance: 5,
  };
  return (Object.keys(extras) as Array<keyof BookingDetails["extras"]>).reduce(
    (total, key) => total + (extras[key] ? prices[key] : 0),
    0
  );
}

export function calculatePriceSummary(
  booking: BookingDetails
): BookingPriceSummary {
  const days = getRentalDays(booking.pickupDate, booking.dropoffDate);
  const baseCost = booking.car
    ? calculateRentalPrice(booking.car, booking.pickupDate, booking.dropoffDate)
    : 0;
  const extrasCost = calculateExtrasCost(booking.extras) * days;
  const discountAmount = days >= 7 ? baseCost * 0.05 : 0;
  const total = baseCost + extrasCost - discountAmount;

  return {
    rentalDays: days,
    baseCost,
    extrasCost,
    discountAmount,
    total,
    currency: booking.car?.pricing.currency ?? "EUR",
  };
}

export function formatCurrency(
  amount: number,
  currency = "EUR"
): string {
  return new Intl.NumberFormat("en-EU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Filter Utilities ─────────────────────────────────────────────────────────

export function filterCars(cars: Car[], filters: FilterState): Car[] {
  return cars
    .filter((car) => {
      if (filters.availableOnly && !car.available) return false;
      if (filters.category !== "all" && car.category !== filters.category)
        return false;
      if (
        filters.fuelType !== "all" &&
        car.specs.fuelType !== filters.fuelType
      )
        return false;
      if (
        filters.transmission !== "all" &&
        car.specs.transmission !== filters.transmission
      )
        return false;
      if (car.specs.seats < filters.minSeats) return false;
      if (car.pricing.daily > filters.maxPrice) return false;
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        if (
          !car.name.toLowerCase().includes(q) &&
          !car.brand.toLowerCase().includes(q) &&
          !car.model.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.pricing.daily - b.pricing.daily;
        case "price-desc":
          return b.pricing.daily - a.pricing.daily;
        case "rating-desc":
          return b.rating - a.rating;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
}

// ─── String Utilities ─────────────────────────────────────────────────────────

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

export function generateStars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

// ─── Time Slots ───────────────────────────────────────────────────────────────

export function generateTimeSlots(
  startHour = 7,
  endHour = 22,
  intervalMinutes = 30
): string[] {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += intervalMinutes) {
      if (h === endHour && m > 0) break;
      slots.push(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
      );
    }
  }
  return slots;
}

// ─── Local Storage ────────────────────────────────────────────────────────────

export function safeLocalStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be full or unavailable
  }
}

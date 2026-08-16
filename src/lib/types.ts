// ─── Car & Fleet ──────────────────────────────────────────────────────────────

export type FuelType = "petrol" | "diesel" | "hybrid" | "electric";
export type TransmissionType = "manual" | "automatic";
export type CarCategory =
  | "economy"
  | "compact"
  | "suv"
  | "luxury"
  | "van"
  | "convertible"
  | "sport"
  | "business";
export type DriveType = "fwd" | "rwd" | "awd" | "4wd";

export interface CarSpec {
  seats: number;
  doors: number;
  luggage: number;
  horsepower: number;
  engineCC: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  driveType: DriveType;
  year: number;
  consumption: string;
  airConditioning: boolean;
  engineLabel: string;
}

export interface CarPricing {
  daily: number;
  weekly: number;
  monthly: number;
  currency: string;
  deposit: number;
  includedKmPerDay: number;
  extraKmRate: number;
}

export interface CarFeature {
  label: string;
  available: boolean;
}

export interface Car {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: CarCategory;
  badge?: string;
  description: string;
  shortDescription: string;
  images: string[];
  thumbnailImage: string;
  specs: CarSpec;
  pricing: CarPricing;
  features: CarFeature[];
  available: boolean;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  tags: string[];
}

// ─── Booking ──────────────────────────────────────────────────────────────────

export type BookingStep = "details" | "extras" | "review" | "confirm";

export interface BookingLocation {
  name: string;
  address: string;
  isAirport?: boolean;
}

export interface BookingExtras {
  childSeat: boolean;
  gps: boolean;
  additionalDriver: boolean;
  fullInsurance: boolean;
  roadsideAssistance: boolean;
}

export interface BookingDetails {
  car: Car | null;
  pickupLocation: BookingLocation | null;
  dropoffLocation: BookingLocation | null;
  pickupDate: Date | null;
  dropoffDate: Date | null;
  pickupTime: string;
  dropoffTime: string;
  driverAge: number;
  extras: BookingExtras;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
}

export interface BookingPriceSummary {
  rentalDays: number;
  baseCost: number;
  extrasCost: number;
  discountAmount: number;
  total: number;
  currency: string;
}

// ─── Rental Conditions ────────────────────────────────────────────────────────

export interface RentalCondition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "requirement" | "policy" | "included" | "excluded";
}

// ─── Filters ──────────────────────────────────────────────────────────────────

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

export interface FilterState {
  category: CarCategory | "all";
  fuelType: FuelType | "all";
  transmission: TransmissionType | "all";
  minSeats: number;
  maxPrice: number;
  sortBy: SortOption;
  searchQuery: string;
  availableOnly: boolean;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatarUrl?: string;
  rating: number;
  review: string;
  carRented: string;
  date: string;
  verified: boolean;
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "booking" | "payment" | "vehicle" | "policy" | "support";
}

// ─── Site Config ──────────────────────────────────────────────────────────────

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  workingHours: {
    weekdays: string;
    weekends: string;
  };
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

// ─── Generic ──────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

export type Maybe<T> = T | null | undefined;

import type { SiteConfig, NavLink, BookingLocation } from "./types";

export const siteConfig: SiteConfig = {
  name: "AleRak Rent",
  tagline: "Vaš pouzdani partner u Beogradu",
  description:
    "Premium rent-a-car servis u Beogradu. Transparentne cene, bez skrivenih troškova. Rezervišite putem WhatsApp-a za 60 sekundi.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://alerakrent.rs",
  phone: "+381 60 000 0000",
  whatsapp: "381600000000",
  email: "rezervacije@alerakrent.rs",
  address: "Bulevar Kralja Aleksandra 1, Beograd",
  socialLinks: {
    instagram: "https://instagram.com/alerakrent",
    facebook: "https://facebook.com/alerakrent",
  },
  workingHours: {
    weekdays: "08:00 – 20:00",
    weekends: "09:00 – 18:00",
  },
};

export const navLinks: NavLink[] = [
  { label: "Vozni Park", href: "#fleet" },
  { label: "Kako Funkcioniše", href: "#how-it-works" },
  { label: "Recenzije", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#contact" },
];

export const pickupLocations: BookingLocation[] = [
  { name: "Beograd Centar", address: "Bulevar Kralja Aleksandra 1, Beograd", isAirport: false },
  { name: "Aerodrom Nikola Tesla", address: "Aerodrom Nikola Tesla, 11180 Beograd", isAirport: true },
  { name: "Novi Sad Centar", address: "Trg Slobode 1, Novi Sad", isAirport: false },
  { name: "Niš Centar", address: "Trg Kralja Milana 1, Niš", isAirport: false },
  { name: "Aerodrom Niš", address: "Aerodrom Konstantin Veliki, Niš", isAirport: true },
  { name: "Dostava na adresu", address: "Vaša adresa (navedite u napomeni)", isAirport: false },
];

export const DEFAULT_FILTER_STATE = {
  category: "all" as const,
  fuelType: "all" as const,
  transmission: "all" as const,
  minSeats: 2,
  maxPrice: 500,
  sortBy: "price-asc" as const,
  searchQuery: "",
  availableOnly: false,
};

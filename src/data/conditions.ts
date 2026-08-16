import type { RentalCondition } from "@/lib/types";

export const rentalConditions: RentalCondition[] = [
  {
    id: "c1",
    title: "Vozačka dozvola",
    description: "Minimum 1 godinu iskustva. Za premium vozila min. 3 godine.",
    icon: "CreditCard",
    category: "requirement",
  },
  {
    id: "c2",
    title: "Minimalna starost",
    description: "21 godina. Doplata za vozače 21-24 god: 10 EUR/dan.",
    icon: "UserCheck",
    category: "requirement",
  },
  {
    id: "c3",
    title: "Depozit",
    description: "Bezbedonosni depozit 150-1000 EUR zavisi od kategorije.",
    icon: "Shield",
    category: "policy",
  },
  {
    id: "c4",
    title: "Gorivo",
    description: "Vozilo preuzimate puno, vraćate puno. Full-to-full politika.",
    icon: "Fuel",
    category: "policy",
  },
  {
    id: "c5",
    title: "Osnovno osiguranje",
    description: "CDW i TP osiguranje uključeni u sve pakete bez doplate.",
    icon: "ShieldCheck",
    category: "included",
  },
  {
    id: "c6",
    title: "Besplatni KM",
    description: "250-400 km/dan uključeno. Prekoračenje od 0.10 EUR/km.",
    icon: "MapPin",
    category: "included",
  },
  {
    id: "c7",
    title: "Inostranstvo",
    description: "EU i Balkan dozvoljen. Ostale destinacije uz prethodnu saglasnost.",
    icon: "Globe",
    category: "policy",
  },
  {
    id: "c8",
    title: "Pušenje",
    description: "Zabranjen. Naknada za čišćenje 150 EUR u slučaju kršenja.",
    icon: "Ban",
    category: "excluded",
  },
  {
    id: "c9",
    title: "Kućni ljubimci",
    description: "Nisu dozvoljeni bez prethodnog dogovora i zaštitne navlake.",
    icon: "PawPrint",
    category: "policy",
  },
  {
    id: "c10",
    title: "24/7 Podrška",
    description: "Hitna pomoć na putu dostupna 24 sata, 7 dana u nedelji.",
    icon: "Phone",
    category: "included",
  },
];

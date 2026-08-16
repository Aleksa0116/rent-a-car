import type { FaqItem } from "@/lib/types";

export const faqItems: FaqItem[] = [
  // Booking
  {
    id: "b1",
    category: "booking",
    question: "Kako mogu da rezervišem vozilo?",
    answer:
      "Rezervaciju možete izvršiti direktno putem WhatsApp-a klikom na dugme 'Rezerviši' pored željenog vozila. Naš tim će Vam odgovoriti u roku od 30 minuta i potvrditi dostupnost. Alternativno, možete nas pozvati na broj +381 60 000 0000 ili poslati email.",
  },
  {
    id: "b2",
    category: "booking",
    question: "Koliko unapred treba rezervisati vozilo?",
    answer:
      "Preporučujemo rezervaciju najmanje 48 sati unapred, posebno za vikende i praznike. Za luksuzna vozila (Mercedes, BMW) savetujemo rezervaciju 3-5 dana ranije. U sezonskim mesecima (jul-avgust) preporučujemo rezervaciju 7-14 dana unapred.",
  },
  {
    id: "b3",
    category: "booking",
    question: "Da li je moguće otkazati rezervaciju?",
    answer:
      "Besplatno otkazivanje je moguće do 24 sata pre preuzimanja vozila. Otkazivanje unutar 24 sata podleže naknadi od 30% vrednosti rezervacije. Depozit se vraća na Vaš račun u roku od 3-5 radnih dana nakon vraćanja vozila.",
  },
  // Payment
  {
    id: "p1",
    category: "payment",
    question: "Koje načine plaćanja prihvatate?",
    answer:
      "Prihvatamo gotovinski uplatu, bankarski transfer i sve glavne kreditne/debitne kartice (Visa, Mastercard, Maestro). Plaćanje je moguće u EUR i RSD. Za rezervacije platite 30% avansa, ostatak pri preuzimanju vozila.",
  },
  {
    id: "p2",
    category: "payment",
    question: "Šta je depozit i kada se vraća?",
    answer:
      "Depozit je bezbedonosni iznos koji blokiramo na Vašoj kartici (ili uzimamo gotovinski) pri preuzimanju vozila. Visina depozita zavisi od kategorije vozila (150-1000 EUR). Depozit se odmah oslobađa/vraća pri vraćanju vozila u ispravnom stanju, ili u roku od 3-5 radnih dana u slučaju kartičnog plaćanja.",
  },
  {
    id: "p3",
    category: "payment",
    question: "Da li postoje skriveni troškovi?",
    answer:
      "Apsolutno ne. Cena u ponudi uključuje sve poreske obaveze, osnovno osiguranje i navedeni broj kilometara. Jedine dodatne troškove koje možete imati su: gorivo (vozilo preuzimate s punim rezervoarom i vraćate punim), eventualne štete, i prekoračenje kilometraže (0.10-0.30 EUR/km zavisno od vozila).",
  },
  // Vehicle
  {
    id: "v1",
    category: "vehicle",
    question: "U kakvom stanju su vozila?",
    answer:
      "Sva naša vozila su redovno servisirana po fabričkim intervalima i detaljno pregledana pre svakog iznajmljivanja. Prosečna starost flote je 1-2 godine. Pre preuzimanja, zajedno ćemo proći zapisnik o stanju vozila kako bi se zaštitili i Vi i mi.",
  },
  {
    id: "v2",
    category: "vehicle",
    question: "Šta ako se vozilo pokvari tokom najma?",
    answer:
      "U slučaju kvara, kontaktujte nas odmah na +381 60 000 0000 (dostupni 24/7). Za sve kvarove koji nisu nastali krivicom korisnika, besplatno Vam obezbeđujemo zamenu vozila. Dostupna je i opcija putne pomoći za svega 5 EUR/dan kao additional extra.",
  },
  {
    id: "v3",
    category: "vehicle",
    question: "Da li mogu da iznesem vozilo van Srbije?",
    answer:
      "Da, vozila je moguće izneti u sve EU/EEA države i region Balkana (BiH, Crna Gora, Makedonija, Hrvatska). Za vožnju van navedenih zemalja potrebna je prethodna pisana saglasnost. Za putovanje u inostranstvo savetujemo zelenu kartu osiguranja koju možete uključiti za 10 EUR/dan.",
  },
  // Policy
  {
    id: "po1",
    category: "policy",
    question: "Koji dokumenti su potrebni za iznajmljivanje?",
    answer:
      "Potrebni su: važeća vozačka dozvola (minimum 1 godina iskustva za standardna vozila, 3 godine za premium kategoriju), lična karta ili pasoš, i kartica za depozit. Strani državljani moraju imati međunarodnu vozačku dozvolu ukoliko njihova dozvola nije na latiničnom pismu.",
  },
  {
    id: "po2",
    category: "policy",
    question: "Koja je minimalna starost vozača?",
    answer:
      "Minimalna starost za iznajmljivanje je 21 godina. Za vozače između 21-24 godine primenjuje se doplata za mlade vozače od 10 EUR/dan. Luksuzna vozila (Mercedes, BMW X5) dostupna su vozačima starijim od 25 godina sa minimum 3 godine iskustva.",
  },
  {
    id: "po3",
    category: "policy",
    question: "Da li je pušenje dozvoljeno u vozilima?",
    answer:
      "Pušenje u vozilima je strogo zabranjeno. U slučaju da vozilo bude vraćeno sa mirisom dima, naplaćujemo naknadu za dubinsko čišćenje od 150 EUR. Ova naknada se oduzima od depozita.",
  },
  // Support
  {
    id: "s1",
    category: "support",
    question: "Da li radite vikendom i praznikom?",
    answer:
      "Radimo svaki dan uključujući vikende i praznike. Radnim danima smo dostupni 08:00-20:00, a vikendom 09:00-18:00. Van radnog vremena dostupni smo putem WhatsApp-a za hitne slučajeve i probleme u vožnji.",
  },
  {
    id: "s2",
    category: "support",
    question: "Da li nudite dostavu i preuzimanje na aerodromu?",
    answer:
      "Da! Nudimo dostavu i preuzimanje vozila na Aerodromu Nikola Tesla u Beogradu i Aerodromu Niš bez dodatnih troškova za periode najma duže od 3 dana. Za kraće periode dostava na aerodrom košta 20 EUR. Pratite letove i čekamo Vas po sletanju.",
  },
];

export const faqCategories = [
  { id: "all", label: "Sva pitanja" },
  { id: "booking", label: "Rezervacija" },
  { id: "payment", label: "Plaćanje" },
  { id: "vehicle", label: "Vozila" },
  { id: "policy", label: "Politika" },
  { id: "support", label: "Podrška" },
] as const;

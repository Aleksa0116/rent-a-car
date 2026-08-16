"use client";

import { motion } from "framer-motion";
import { MessageCircle, Car, Key, ThumbsUp } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    step: "01",
    icon: <Car className="h-6 w-6" />,
    title: "Izaberite Vozilo",
    description:
      "Pregledajte našu flotu, filtrirajte po kategoriji, ceni ili tipu goriva i pronađite vozilo koje odgovara Vašim potrebama.",
  },
  {
    step: "02",
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Pošaljite Upit",
    description:
      "Kliknite 'Rezerviši', popunite jednostavan obrazac i pošaljite detaljnu rezervaciju direktno na naš WhatsApp za 60 sekundi.",
  },
  {
    step: "03",
    icon: <ThumbsUp className="h-6 w-6" />,
    title: "Dobijte Potvrdu",
    description:
      "Naš tim odgovara u roku od 30 minuta. Potvrđujemo dostupnost, cenu i sve detalje rezervacije.",
  },
  {
    step: "04",
    icon: <Key className="h-6 w-6" />,
    title: "Preuzmite Vozilo",
    description:
      "Dođite na dogovorenu lokaciju ili dostavimo vozilo na Vašu adresu. Pregledamo zajedno, potpisujemo i krećete!",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeader
          label="Kako Funkcioniše"
          title="Rezervacija za"
          titleHighlight="60 Sekundi"
          description="Jednostavan proces u 4 koraka. Bez birokratije, bez čekanja — samo brza i pouzdana usluga."
        />

        <div className="relative">
          {/* Connecting line */}
          <div
            aria-hidden
            className="absolute top-10 left-0 right-0 hidden h-px lg:block"
            style={{
              background: `linear-gradient(90deg, transparent 0%, var(--color-brand-500) 20%, var(--color-brand-500) 80%, transparent 100%)`,
              opacity: 0.15,
            }}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step icon */}
                <div className="relative mb-5">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] text-[var(--color-brand-400)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[var(--color-brand-500)] hover:shadow-[var(--shadow-glow-sm)]">
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-xs font-bold text-white">
                    {i + 1}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

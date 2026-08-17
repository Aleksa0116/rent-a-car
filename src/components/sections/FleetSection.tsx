"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { BookingModal } from "@/components/booking/BookingModal";
import { cars } from "@/data/cars";
import type { Car } from "@/lib/types";

// ─── Stat definitions ──────────────────────────────────────────────────────────

interface StatDef {
  prefix?: string;
  num: number;
  suffix?: string;
  label: string;
}

const FLEET_STATS: StatDef[] = [
  { num: cars.length, label: "vozila" },
  { num: 6, label: "kategorija" },
  { prefix: "od €", num: 28, label: "dnevno" },
  { num: 24, suffix: "/7", label: "dostupni" },
];

// ─── Animated counter atom ──────────────────────────────────────────────────────

function StatCounter({ prefix, num, suffix, label, delay = 0 }: StatDef & { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    // Small delay so each pill starts slightly after the previous one
    const timer = setTimeout(() => {
      const controls = animate(0, num, {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, num, delay]);

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-1.5 rounded-full border border-zinc-100 bg-white px-5 py-2 shadow-sm"
    >
      <span className="tabular-nums text-base font-extrabold text-zinc-900">
        {prefix && <span>{prefix}</span>}
        {display}
        {suffix && <span className="text-zinc-500">{suffix}</span>}
      </span>
      <span className="text-sm text-zinc-400">{label}</span>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function FleetSection() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = (car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  };

  return (
    <section id="fleet" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Header + stats */}
        <div className="space-y-8">
          <SectionHeader
            label="Vozni Park"
            title="Izaberite Vaše"
            titleHighlight="Savršeno Vozilo"
            description="Od ekonomičnih gradskih automobila do luksuznih SUV-ova — naša flota pokriva svaku prigodu i budžet."
            animationVariant="scale"
          />

          {/* Stats strip — pills animate in, then numbers count up */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-3"
          >
            {FLEET_STATS.map((stat, i) => (
              <StatCounter key={stat.label} {...stat} delay={i * 120} />
            ))}
          </motion.div>
        </div>

        <FleetGrid cars={cars} onBookNow={handleBookNow} />
      </div>

      <BookingModal
        car={selectedCar}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}

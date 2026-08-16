"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { BookingModal } from "@/components/booking/BookingModal";
import { cars } from "@/data/cars";
import type { Car } from "@/lib/types";

const FLEET_STATS = [
  { value: `${cars.length}`, label: "vozila" },
  { value: "6",  label: "kategorija" },
  { value: "od €28", label: "dnevno" },
  { value: "24/7", label: "dostupni" },
];

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
          />

          {/* Animated stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-3"
          >
            {FLEET_STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-1.5 rounded-full border border-zinc-100 bg-white px-5 py-2 shadow-sm"
              >
                <span className="text-base font-extrabold text-zinc-900">{stat.value}</span>
                <span className="text-sm text-zinc-400">{stat.label}</span>
              </div>
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

"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FleetGrid } from "@/components/fleet/FleetGrid";
import { BookingModal } from "@/components/booking/BookingModal";
import { cars } from "@/data/cars";
import type { Car } from "@/lib/types";

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
        <SectionHeader
          label="Vozni Park"
          title="Izaberite Vaše"
          titleHighlight="Savršeno Vozilo"
          description="Od ekonomičnih gradskih automobila do luksuznih SUV-ova — naša flota pokriva svaku prigodu i budžet. Sva vozila su godišnjeg do dvogodišnjeg iskustva."
        />

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

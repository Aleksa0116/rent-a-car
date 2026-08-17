"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PackageSearch } from "lucide-react";
import { CarCard } from "./CarCard";
import { CarCardSkeleton } from "./CarCardSkeleton";
import { FleetFilter } from "./FleetFilter";
import { CarQuickViewModal } from "./CarQuickViewModal";
import { filterCars } from "@/lib/utils";
import { DEFAULT_FILTER_STATE } from "@/lib/config";
import type { Car, FilterState } from "@/lib/types";

const SKELETON_COUNT = 6;

interface FleetGridProps {
  cars: Car[];
  onBookNow?: (car: Car) => void;
  /** Pass true while fetching cars from an external API */
  isLoading?: boolean;
}

export function FleetGrid({ cars, onBookNow, isLoading = false }: FleetGridProps) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTER_STATE);
  const [detailCar, setDetailCar] = useState<Car | null>(null);

  // Detect when the filter bar is "stuck" to the navbar
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry!.isIntersecting),
      { threshold: 1.0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleQuickSearch(e: Event) {
      const { category } = (e as CustomEvent<{ category: string }>).detail;
      setFilters((prev) => ({
        ...prev,
        category: (category ?? "all") as FilterState["category"],
      }));
    }
    window.addEventListener("autoelite:quick-search", handleQuickSearch);
    return () =>
      window.removeEventListener("autoelite:quick-search", handleQuickSearch);
  }, []);

  const filteredCars = useMemo(() => filterCars(cars, filters), [cars, filters]);

  /* ── Loading state — show skeleton grid while data arrives ────────────── */
  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  /*
   * A stable key derived from WHICH cars are shown (independent of sort order).
   * When the set of visible cars changes, React fully unmounts + remounts the
   * grid, so cards never stay at their old grid positions — they always animate
   * in from scratch with no gaps.
   */
  const gridKey = useMemo(
    () =>
      [...filteredCars]
        .sort((a, b) => a.id.localeCompare(b.id))
        .map((c) => c.id)
        .join(","),
    [filteredCars]
  );

  return (
    <>
      <div className="space-y-8">

        {/* Sentinel — 1px invisible element; when it scrolls out of view
            the filter is "stuck" and we switch to the card appearance    */}
        <div ref={sentinelRef} className="-mt-1 h-px" aria-hidden />

        {/* Sticky filter bar */}
        <div
          className={[
            "sticky top-16 lg:top-[72px] z-30 transition-all duration-300",
            isStuck
              // Stuck → floating card: rounded, white, shadow
              ? "rounded-2xl border border-zinc-100 bg-white/95 px-5 py-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12),0_2px_10px_-4px_rgba(0,0,0,0.07)] backdrop-blur-sm"
              // Not stuck → seamlessly blends with the section background
              : "pb-4",
          ].join(" ")}
        >
          <FleetFilter
            filters={filters}
            onChange={setFilters}
            totalResults={filteredCars.length}
            totalCars={cars.length}
          />
        </div>

        {/* Grid / Empty state */}
        <AnimatePresence mode="wait">
          {filteredCars.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center justify-center py-28 text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] mb-5">
                <PackageSearch className="h-9 w-9 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
                Nema vozila
              </h3>
              <p className="text-sm text-[var(--color-text-muted)] max-w-xs mb-5">
                Nijedno vozilo ne odgovara odabranim filterima. Pokušajte sa drugačijim kriterijumima.
              </p>
              <button
                onClick={() => setFilters(DEFAULT_FILTER_STATE)}
                className="text-sm font-semibold text-[var(--color-brand-400)] hover:underline"
              >
                Resetuj filtere
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={gridKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredCars.map((car, index) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={index}
                  onBookNow={onBookNow}
                  onDetails={setDetailCar}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick-view modal */}
      <CarQuickViewModal
        car={detailCar}
        open={detailCar !== null}
        onClose={() => setDetailCar(null)}
        onBookNow={(car) => {
          setDetailCar(null);
          onBookNow?.(car);
        }}
      />
    </>
  );
}

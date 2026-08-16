"use client";

import { motion } from "framer-motion";
import { Users, Car, MapPin, ThumbsUp } from "lucide-react";

const stats = [
  { icon: <Users className="h-5 w-5" />, value: "2,400+", label: "Zadovoljnih klijenata" },
  { icon: <Car className="h-5 w-5" />, value: "50+", label: "Vozila u floti" },
  { icon: <MapPin className="h-5 w-5" />, value: "5", label: "Lokacija preuzimanja" },
  { icon: <ThumbsUp className="h-5 w-5" />, value: "4.8★", label: "Prosečna ocena" },
];

export default function StatsBar() {
  return (
    <section className="border-y border-[var(--color-surface-border)] bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)] text-[var(--color-brand-400)]">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-extrabold text-[var(--color-text-primary)] leading-none">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

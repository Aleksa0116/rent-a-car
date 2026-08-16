"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { openGenericWhatsApp } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-32">

      {/* ── Deep navy base ────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#091733]" />

      {/* ── Mesh gradient blobs ───────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top-left — pure blue, slow drift */}
        <motion.div
          animate={{ scale: [1, 1.07, 1], x: [0, 14, 0], y: [0, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-blue-600/35 blur-[110px]"
        />

        {/* Bottom-right — indigo, counter-drift */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, -18, 0], y: [0, 12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-52 -right-36 h-[680px] w-[680px] rounded-full bg-indigo-600/28 blur-[130px]"
        />

        {/* Centre — sky accent, very faint */}
        <div className="absolute left-1/2 top-1/2 h-[280px] w-[960px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/12 blur-[90px]" />
      </div>

      {/* ── Subtle grain overlay (noise, not stripes) ─────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-4xl space-y-10 px-4 text-center sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/75 backdrop-blur-sm">
            Počnite danas
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Spremi za vožnju?
          </h2>

          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/60">
            Kontaktirajte nas sada i rezervišite vozilo za svoju avanturu.
            Odgovaramo u roku od 30 minuta, svaki dan.
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={openGenericWhatsApp}
            className="flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-[0_4px_24px_-4px_rgba(37,211,102,0.55)] transition-all hover:bg-[#22c55e] hover:shadow-[0_8px_32px_-4px_rgba(37,211,102,0.65)] active:scale-[0.97]"
          >
            <MessageCircle className="h-5 w-5" />
            Rezervišite na WhatsApp
          </button>

          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-white/18 bg-white/8 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/14 active:scale-[0.97]"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </button>
          </a>
        </motion.div>

        {/* Trust micro-copy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-5 text-sm text-white/40"
        >
          {[
            "Bez skrivenih troškova",
            "Odgovor za 30 min",
            "Osnovno osiguranje uključeno",
            "Dostava na aerodrom",
          ].map((item) => (
            <span key={item} className="flex items-center gap-1.5">
              <span className="h-1 w-1 rounded-full bg-white/30" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

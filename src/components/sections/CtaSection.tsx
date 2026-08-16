"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openGenericWhatsApp } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand-500)] py-24">
      {/* Subtle diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            white,
            white 1px,
            transparent 1px,
            transparent 8px
          )`,
        }}
      />

      {/* Ambient glow blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #60a5fa 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
            Počnite danas
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Spremi za vožnju?
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/75">
            Kontaktirajte nas sada i rezervišite vozilo za svoju avanturu.
            Odgovaramo u roku od 30 minuta, svaki dan.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            type="button"
            onClick={openGenericWhatsApp}
            className="flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-[0_4px_20px_-4px_rgba(37,211,102,0.5)] transition-all hover:bg-[#22c55e] hover:shadow-[0_6px_28px_-4px_rgba(37,211,102,0.6)] active:scale-[0.97]"
          >
            <MessageCircle className="h-5 w-5" />
            Rezervišite na WhatsApp
          </button>

          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 active:scale-[0.97]"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phone}
            </button>
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex flex-wrap justify-center gap-6 text-sm text-white/60"
        >
          {[
            "✓ Bez skrivenih troškova",
            "✓ Odgovor za 30 min",
            "✓ Osnovno osiguranje uključeno",
            "✓ Dostava na aerodrom",
          ].map((item) => (
            <span key={item} className="text-white/70">{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

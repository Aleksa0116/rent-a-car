"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, ChevronRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/lib/config";
import { openGenericWhatsApp } from "@/lib/whatsapp";

export default function ContactAndLocation() {
  return (
    <section id="contact" className="section-padding bg-[var(--color-surface-raised)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Pronađite nas"
          titleHighlight="u Beogradu"
          description="Centar Beograda, aerodrom i dostava na adresu. Odgovaramo u roku od 30 minuta."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-5">

          {/* ─── Left — Contact panel ─── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Primary phone CTA */}
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="group relative flex items-center gap-4 overflow-hidden rounded-2xl bg-blue-600 p-5 shadow-[0_8px_32px_-8px_rgba(37,99,235,0.5)] transition-all hover:bg-blue-500 hover:shadow-[0_12px_40px_-8px_rgba(37,99,235,0.65)] active:scale-[0.98]"
            >
              {/* Glass sheen on top edge */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
              />
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white">
                <Phone className="h-6 w-6" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Pozovite odmah
                </p>
                <p className="text-xl font-bold tracking-tight text-white">
                  {siteConfig.phone}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 shrink-0 text-white/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white/70" />
            </a>

            {/* Secondary — WhatsApp */}
            <button
              type="button"
              onClick={openGenericWhatsApp}
              className="group flex items-center gap-4 rounded-2xl border border-[var(--color-surface-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-all hover:border-[#25D366]/40 hover:shadow-[0_4px_20px_-6px_rgba(37,211,102,0.3)] active:scale-[0.98]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/10">
                <MessageCircle className="h-6 w-6 text-[#25D366]" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                  WhatsApp
                </p>
                <p className="text-base font-semibold text-[var(--color-text-primary)]">
                  Pišite nam odmah
                </p>
              </div>
            </button>

            {/* Info rows */}
            <div className="rounded-2xl border border-[var(--color-surface-border)] bg-white p-5 shadow-[var(--shadow-card)] space-y-4">
              {/* Email */}
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 group"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-brand-500)]">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Email
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-500)] transition-colors">
                    {siteConfig.email}
                  </p>
                </div>
              </a>

              <div className="border-t border-[var(--color-surface-border)]" />

              {/* Address */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-brand-500)]">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Adresa
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-500)] transition-colors">
                    {siteConfig.address}
                  </p>
                </div>
              </a>

              <div className="border-t border-[var(--color-surface-border)]" />

              {/* Hours */}
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--color-brand-500)]">
                  <Clock className="h-4 w-4" />
                </span>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    Radno vreme
                  </p>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    Pon–Pet: {siteConfig.workingHours.weekdays}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Sub–Ned: {siteConfig.workingHours.weekends}
                  </p>
                  <p className="text-xs text-[var(--color-brand-500)] font-medium pt-0.5">
                    Van radnog vremena — WhatsApp 24/7
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right — Map ─── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative"
          >
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl border border-[var(--color-surface-border)] shadow-[var(--shadow-card)] lg:min-h-0 lg:h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.2822222222!2d20.4612!3d44.8178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa6a25e26b9%3A0xfe9ce5e82e6fa04f!2sBulevar%20kralja%20Aleksandra%201%2C%20Beograd%2011000!5e0!3m2!1ssr!2srs!4v1723728000000!5m2!1ssr!2srs"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px", filter: "grayscale(0.15)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${siteConfig.name} lokacija — ${siteConfig.address}`}
              />

              {/* Address chip overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-xl border border-white/70 bg-white/90 px-4 py-3 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-500)] text-white">
                    <MapPin className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                    {siteConfig.address}
                  </span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-semibold text-[var(--color-brand-500)] hover:underline whitespace-nowrap"
                >
                  Otvori u Maps →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

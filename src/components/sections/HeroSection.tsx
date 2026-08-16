"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  Plane,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { openGenericWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/* ─── Hero background ────────────────────────────────────────────────────────── */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?auto=format&fit=crop&w=1920&q=85";

/* ─── Trust proof points ─────────────────────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "Bez depozita za odabrana vozila" },
  { icon: <ShieldCheck className="h-3.5 w-3.5" />, label: "Kasko osiguranje uključeno" },
  { icon: <Plane className="h-3.5 w-3.5" />,        label: "Dostava na aerodrom 24/7" },
];

/* ─── Component ──────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden">

      {/* ── Full-bleed background photo ────────────────────────────────────── */}
      {/*
       * Dark blur placeholder sits beneath the real image.
       * It is visible on initial paint (especially on slow connections) and
       * fades out once the Image's onLoad fires.
       * The same dark-slate tone as the darkest gradient overlays ensures
       * text legibility is maintained even before the photo arrives.
       */}
      <HeroBgImage src={HERO_IMAGE} />

      {/* ── Gradient overlays ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />

      {/* ── Content — flex column fills the full viewport height ──────────── */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Hero copy — takes all remaining height and centers content inside */}
        <div className="flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl space-y-7">

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
              >
                Lako do savršenog{" "}
                <span className="text-blue-300">automobila</span>{" "}
                u Beogradu
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-lg text-lg leading-relaxed text-white/72"
              >
                Premium vozila, bez skrivenih troškova i komplikacija.
                Rezervišite za 60 sekundi putem WhatsApp-a.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-3"
              >
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ChevronRight className="h-5 w-5" />}
                  onClick={() =>
                    document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Pregledaj flotu
                </Button>

                <button
                  onClick={openGenericWhatsApp}
                  className="inline-flex h-13 items-center gap-2.5 rounded-xl border border-white/25 bg-white/10 px-7 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/18 active:scale-[0.98]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp upit
                </button>
              </motion.div>

              {/* Trust proof points — each pill enters individually */}
              <div className="flex flex-wrap gap-2.5">
                {TRUST_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.48,
                      delay: 0.36 + i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative flex items-center gap-2.5 overflow-hidden rounded-2xl border border-white/12 bg-white/6 px-4 py-2.5 backdrop-blur-md"
                  >
                    {/* Glass rim highlight */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                    {/* Icon badge */}
                    <span className="flex h-[1.625rem] w-[1.625rem] shrink-0 items-center justify-center rounded-lg bg-blue-400/20 text-blue-300">
                      {item.icon}
                    </span>
                    {/* Label */}
                    <span className="text-[12px] font-semibold leading-none text-white/85">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator — bouncing arrow nudges user toward QuickSearch ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mb-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ─── HeroBgImage ────────────────────────────────────────────────────────────
 * Renders the hero background with a dark blur-up crossfade.
 * Keeps the parent component as a single-concern layout component.
 */
function HeroBgImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Dark placeholder — visible until the photo is decoded */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 scale-110 blur-3xl",
          "bg-gradient-to-br from-slate-800 to-slate-900",
          "transition-opacity duration-700 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />

      <Image
        src={src}
        alt="Luksuzni automobil u Beogradu — AleRak Rent-a-Car"
        fill
        priority
        sizes="100vw"
        quality={85}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover object-[55%_65%]",
          "transition-opacity duration-700 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  );
}

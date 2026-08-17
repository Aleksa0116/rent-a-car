"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
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
  const prefersReduced = useReducedMotion();

  // Mouse parallax — raw values → smoothed springs
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 40, damping: 22, mass: 0.8 });
  const springY = useSpring(rawY, { stiffness: 40, damping: 22, mass: 0.8 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (prefersReduced) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    // Normalize to ‑1…+1, invert for parallax, scale to ±12 px
    rawX.set(((e.clientX - left) / width  - 0.5) * -24);
    rawY.set(((e.clientY - top)  / height - 0.5) * -24);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section
      className="relative h-[100svh] min-h-[640px] overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* ── Full-bleed background photo with mouse parallax ────────────────── */}
      <HeroBgImage src={HERO_IMAGE} x={springX} y={springY} />

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

              {/* Trust proof points — clean row, no pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-3"
              >
                {/* Thin editorial separator */}
                <span className="w-12 h-px bg-white/25" />

                {/* Items row */}
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-0">
                  {TRUST_ITEMS.map((item, i) => (
                    <Fragment key={item.label}>
                      <div className="flex items-center gap-2.5 shrink-0">
                        {/* Small icon in subtle tinted circle */}
                        <span className="flex h-[1.375rem] w-[1.375rem] shrink-0 items-center justify-center rounded-md bg-blue-400/20 text-blue-300">
                          {item.icon}
                        </span>
                        <span className="text-[13px] font-medium text-white/72 leading-none">
                          {item.label}
                        </span>
                      </div>
                      {/* Vertical separator — visible only on sm+ */}
                      {i < TRUST_ITEMS.length - 1 && (
                        <span className="hidden sm:block mx-5 h-3.5 w-px bg-white/20 shrink-0" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </motion.div>
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
 * Renders the hero background with:
 *  • Dark blur-up crossfade on load
 *  • Mouse-driven parallax (image moves opposite to cursor, ~12 px max)
 *    scale(1.1) ensures no edges are ever exposed during movement.
 */
function HeroBgImage({
  src,
  x,
  y,
}: {
  src: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Dark blur placeholder — fades out once the real image loads */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 scale-110 blur-3xl",
          "bg-gradient-to-br from-slate-800 to-slate-900",
          "transition-opacity duration-700 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Parallax layer — slightly oversized so edges stay hidden during movement */}
      <motion.div
        className="absolute inset-0"
        style={{ x, y, scale: 1.1 }}
      >
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
      </motion.div>
    </>
  );
}

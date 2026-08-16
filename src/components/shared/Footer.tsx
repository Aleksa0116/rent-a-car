import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

const FOOTER_LINKS = [
  { label: "Vozni park",       href: "#fleet"        },
  { label: "Kako funkcioniše", href: "#how-it-works"  },
  { label: "Recenzije",        href: "#testimonials"  },
  { label: "FAQ",              href: "#faq"           },
  { label: "Kontakt",          href: "#contact"       },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white">

      {/* Thin top gradient accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6">

            {/* Logo mark + wordmark */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-[0_4px_16px_-4px_rgba(37,99,235,0.6)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {siteConfig.name}
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Premium rent-a-car servis u Beogradu. Transparentne cene, bez
              skrivenih troškova i komplikacija. Rezervišite za 60 sekundi
              putem WhatsApp-a.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all hover:border-white/25 hover:text-white/80"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all hover:border-white/25 hover:text-white/80"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/40 transition-all hover:border-[#25D366]/50 hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Navigacija
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Kontakt
            </h3>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 group"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-blue-400/70 transition-colors group-hover:text-blue-400" />
                  <span className="text-sm text-white/50 transition-colors group-hover:text-white">
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 group"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-blue-400/70 transition-colors group-hover:text-blue-400" />
                  <span className="text-sm text-white/50 transition-colors group-hover:text-white">
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-blue-400/70 transition-colors group-hover:text-blue-400" />
                  <span className="text-sm text-white/50 transition-colors group-hover:text-white">
                    {siteConfig.address}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-6 sm:flex-row">
          <p className="text-sm text-white/25">
            © {year} {siteConfig.name}. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-5 text-sm text-white/25">
            <Link
              href="/politika-privatnosti"
              className="transition-colors hover:text-white/60"
            >
              Politika privatnosti
            </Link>
            <Link
              href="/uslovi-koriscenja"
              className="transition-colors hover:text-white/60"
            >
              Uslovi korišćenja
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

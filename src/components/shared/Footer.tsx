import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/config";

const FOOTER_LINKS = [
  { label: "Vozni park",    href: "#fleet"       },
  { label: "Kako funkcioniše", href: "#how-it-works" },
  { label: "Recenzije",     href: "#testimonials" },
  { label: "FAQ",           href: "#faq"          },
  { label: "Kontakt",       href: "#contact"      },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-surface-raised)] border-t border-[var(--color-surface-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-5">
            {/* Logo + name */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-brand-500)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z" />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.name}
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Premium rent-a-car servis u Beogradu. Transparentne cene, bez
              skrivenih troškova i komplikacija. Rezervišite za 60 sekundi
              putem WhatsApp-a.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-surface-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-brand-500)] hover:bg-blue-50 hover:text-[var(--color-brand-500)]"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-surface-border)] text-[var(--color-text-muted)] transition-all hover:border-[var(--color-brand-500)] hover:bg-blue-50 hover:text-[var(--color-brand-500)]"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-surface-border)] text-[var(--color-text-muted)] transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Navigacija
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-500)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-500)]"
                >
                  <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-brand-500)]" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-500)]"
                >
                  <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-brand-500)]" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-brand-500)]"
                >
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--color-brand-500)]" />
                  {siteConfig.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-surface-border)] py-6 sm:flex-row">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {year} {siteConfig.name}. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-5 text-sm text-[var(--color-text-muted)]">
            <Link
              href="/politika-privatnosti"
              className="transition-colors hover:text-[var(--color-text-secondary)]"
            >
              Politika privatnosti
            </Link>
            <Link
              href="/uslovi-koriscenja"
              className="transition-colors hover:text-[var(--color-text-secondary)]"
            >
              Uslovi korišćenja
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

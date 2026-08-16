"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { siteConfig, navLinks } from "@/lib/config";
import { openGenericWhatsApp } from "@/lib/whatsapp";

export default function Navbar() {
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [isMobileOpen,  setIsMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          isScrolled
            ? "border-[var(--color-surface-border)] bg-white/95 shadow-[0_2px_16px_-4px_rgb(0_0_0_/_0.07)] backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
              onClick={closeMobile}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-5h14v5z" />
                  <circle cx="7.5" cy="14.5" r="1.5" />
                  <circle cx="16.5" cy="14.5" r="1.5" />
                </svg>
              </div>
              <span
                className={cn(
                  "text-lg font-bold tracking-tight transition-colors",
                  isScrolled
                    ? "text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-500)]"
                    : "text-white group-hover:text-white/80"
                )}
              >
                {siteConfig.name}
              </span>
            </Link>

            {/* ── Desktop nav links ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                    isScrolled
                      ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    : "text-white/75 hover:text-white"
                )}
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
              <Button
                variant="whatsapp"
                size="sm"
                leftIcon={<MessageCircle className="h-4 w-4" />}
                onClick={openGenericWhatsApp}
              >
                WhatsApp
              </Button>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              className={cn(
                "lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border transition-all",
                isScrolled
                  ? "border-[var(--color-surface-border)] bg-white text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/20"
              )}
              onClick={() => setIsMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white border-l border-[var(--color-surface-border)] shadow-2xl lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex h-16 items-center justify-between px-5 border-b border-[var(--color-surface-border)]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-brand-500)]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z" />
                      <circle cx="7.5" cy="14.5" r="1.5" />
                      <circle cx="16.5" cy="14.5" r="1.5" />
                    </svg>
                  </div>
                  <span className="text-base font-bold text-[var(--color-text-primary)]">
                    {siteConfig.name}
                  </span>
                </div>
                <button
                  onClick={closeMobile}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] transition-all"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-0.5 p-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className="flex items-center px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-xl transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer CTAs */}
              <div className="p-5 border-t border-[var(--color-surface-border)] space-y-3">
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--color-surface-border)] text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)] hover:text-[var(--color-brand-500)] transition-all"
                >
                  <Phone className="h-4 w-4 text-[var(--color-brand-500)]" />
                  {siteConfig.phone}
                </a>
                <Button
                  variant="whatsapp"
                  size="md"
                  className="w-full"
                  leftIcon={<MessageCircle className="h-4 w-4" />}
                  onClick={() => { closeMobile(); openGenericWhatsApp(); }}
                >
                  Kontaktirajte nas na WhatsApp
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

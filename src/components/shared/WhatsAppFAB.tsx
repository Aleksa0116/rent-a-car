"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { openGenericWhatsApp } from "@/lib/whatsapp";
import { siteConfig } from "@/lib/config";

export default function WhatsAppFAB() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowTooltip(true), 1000);
      const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.1 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="relative glass-strong rounded-2xl px-4 py-3 shadow-[var(--shadow-float)] max-w-[220px]"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  Potrebna Vam je pomoć?
                </p>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  Dostupni smo na WhatsApp-u odmah!
                </p>
                {/* Arrow */}
                <div className="absolute -bottom-2 right-6 h-3 w-3 rotate-45 glass-strong border-r border-b border-[color-mix(in_srgb,white_8%,transparent)]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={openGenericWhatsApp}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_32px_-4px_rgba(37,211,102,0.5)] transition-shadow hover:shadow-[0_8px_40px_-4px_rgba(37,211,102,0.7)]"
            aria-label={`Kontakt putem WhatsApp — ${siteConfig.phone}`}
          >
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
            <MessageCircle className="h-6 w-6 relative z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

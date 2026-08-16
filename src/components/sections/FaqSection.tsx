"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqItems, faqCategories } from "@/data/faq";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/types";

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = activeCategory === "all"
    ? faqItems
    : faqItems.filter((f) => f.category === activeCategory);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="section-padding">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <SectionHeader
          title="Imate pitanje?"
          titleHighlight="Odgovaramo."
          align="left"
          animationVariant="slide-left"
        />

        {/* Category Tabs */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex-shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-150",
                activeCategory === cat.id
                  ? "bg-[var(--color-brand-500)] text-white"
                  : "border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filtered.map((item, i) => (
              <FaqItem
                key={item.id}
                item={item}
                index={i}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "rounded-2xl border transition-all duration-200 overflow-hidden",
          isOpen
            ? "border-[color-mix(in_srgb,var(--color-brand-500)_30%,var(--color-surface-border))] bg-[var(--color-surface-card)]"
            : "border-[var(--color-surface-border)] bg-[var(--color-surface-card)] hover:border-[var(--color-surface-muted)]"
        )}
      >
        <button
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
        >
          <span className="text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
            {item.question}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 text-[var(--color-text-muted)]"
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-[var(--color-surface-border)] px-6 pb-5 pt-4">
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

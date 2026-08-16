"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Public types ──────────────────────────────────────────────────────────── */

export interface SelectOption {
  value: string;
  label: string;
}

interface PremiumSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /**
   * "default" — bordered white pill (standalone filter inputs, sort bar).
   * "ghost"   — no visual chrome; for use inside a parent wrapper that
   *             already supplies borders / background (e.g. QuickField).
   */
  variant?: "default" | "ghost";
  /** Optional prefix icon shown in the default trigger. */
  icon?: React.ReactNode;
  /** Controlled open state — lets a parent wrapper open the dropdown programmatically. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/* ─── Component ──────────────────────────────────────────────────────────────── */

export function PremiumSelect({
  value,
  onValueChange,
  options,
  placeholder = "Odaberite…",
  disabled = false,
  className,
  variant = "default",
  icon,
  open,
  onOpenChange,
}: PremiumSelectProps) {
  return (
    <RadixSelect.Root
      value={value || undefined}
      onValueChange={onValueChange}
      disabled={disabled}
      open={open}
      onOpenChange={onOpenChange}
    >
      {/* ── Trigger ────────────────────────────────────────────────────────── */}
      <RadixSelect.Trigger
        className={cn(
          "group flex w-full items-center gap-2.5 outline-none",
          /* ---- Default bordered trigger ---- */
          variant === "default" && [
            "h-11 rounded-xl border border-zinc-200 bg-white pl-3.5 pr-3 text-sm font-medium",
            "text-zinc-700 transition-all duration-150",
            "hover:border-zinc-300",
            "focus:border-[var(--color-brand-400)] focus:ring-2 focus:ring-blue-100",
            "data-[placeholder]:text-zinc-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
          ],
          /* ---- Ghost trigger (inside QuickField) ---- */
          variant === "ghost" && [
            "w-full cursor-pointer bg-transparent text-sm font-medium",
            "text-[var(--color-text-primary)]",
            "data-[placeholder]:text-[var(--color-text-muted)]",
          ],
          className
        )}
      >
        {/* Prefix icon (default variant only) */}
        {icon && variant === "default" && (
          <span className="shrink-0 text-zinc-400">{icon}</span>
        )}

        {/* Current value / placeholder */}
        <RadixSelect.Value placeholder={placeholder} className="flex-1 text-left" />

        {/* Chevron — rotates 180° when open */}
        <RadixSelect.Icon asChild>
          <ChevronDown
            className={cn(
              "shrink-0 transition-transform duration-200 ease-[0.16,1,0.3,1]",
              "group-data-[state=open]:rotate-180",
              variant === "default"
                ? "h-4 w-4 text-zinc-400"
                : "h-3.5 w-3.5 text-[var(--color-text-muted)]"
            )}
          />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      {/* ── Dropdown ───────────────────────────────────────────────────────── */}
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={8}
          align="start"
          avoidCollisions
          className={cn(
            "z-[200] min-w-[var(--radix-select-trigger-width)] overflow-hidden",
            /* Shape & colour */
            "rounded-xl border border-zinc-100 bg-white",
            /* Shadow */
            "shadow-[0_8px_30px_rgb(0,0,0,0.08),0_2px_8px_rgb(0,0,0,0.04)]",
            /* Open animation */
            "data-[state=open]:animate-[select-in_0.15s_ease-out_both]",
            /* Close animation */
            "data-[state=closed]:animate-[select-out_0.1s_ease-in_both]"
          )}
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  /* Layout */
                  "relative flex cursor-pointer select-none items-center justify-between",
                  "rounded-lg px-4 py-2.5",
                  /* Typography */
                  "text-sm text-zinc-700",
                  /* Remove browser outline */
                  "outline-none",
                  /* Transitions */
                  "transition-colors duration-100",
                  /* Hover / keyboard focus */
                  "data-[highlighted]:bg-zinc-50 data-[highlighted]:text-zinc-900",
                  /* Selected state */
                  "data-[state=checked]:font-semibold data-[state=checked]:text-[var(--color-brand-500)]",
                  /* Disabled */
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
                )}
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>

                {/* Checkmark for selected item */}
                <RadixSelect.ItemIndicator>
                  <Check className="h-3.5 w-3.5 text-[var(--color-brand-500)]" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

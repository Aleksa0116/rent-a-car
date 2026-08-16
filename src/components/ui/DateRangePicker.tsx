"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Locale helpers ─────────────────────────────────────────────────────────── */

const MONTHS_FULL = [
  "Januar", "Februar", "Mart", "April", "Maj", "Jun",
  "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar",
];
const MONTHS_SHORT = [
  "jan", "feb", "mar", "apr", "maj", "jun",
  "jul", "avg", "sep", "okt", "nov", "dec",
];
/* getDay() → 0=Sun → maps to index */
const DAYS_SHORT: Record<number, string> = {
  0: "Ne", 1: "Po", 2: "Ut", 3: "Sr", 4: "Če", 5: "Pe", 6: "Su",
};

/** "15 avg" */
export function formatDateShort(d: Date): string {
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()] ?? ""}`;
}
/** "15. januar 2026." */
export function formatDateLong(d: Date): string {
  return `${d.getDate()}. ${(MONTHS_FULL[d.getMonth()] ?? "").toLowerCase()} ${d.getFullYear()}.`;
}

/* ─── DateRangeCalendar ──────────────────────────────────────────────────────── */

interface DateRangeCalendarProps {
  from: Date | undefined;
  to: Date | undefined;
  minDate?: Date;
  onRangeChange: (from: Date | undefined, to: Date | undefined) => void;
  onClose?: () => void;
}

export function DateRangeCalendar({
  from,
  to,
  minDate,
  onRangeChange,
  onClose,
}: DateRangeCalendarProps) {
  const [numMonths, setNumMonths] = useState(2);

  useEffect(() => {
    const check = () => setNumMonths(window.innerWidth < 640 ? 1 : 2);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = new Date(minDate ?? today);
  min.setHours(0, 0, 0, 0);

  const days =
    from && to ? Math.ceil((to.getTime() - from.getTime()) / 86_400_000) : 0;

  const handleSelect = (range: DateRange | undefined) => {
    onRangeChange(range?.from, range?.to);
    /* Auto-close once both dates are chosen */
    if (range?.from && range?.to) {
      setTimeout(() => onClose?.(), 240);
    }
  };

  const canApply = !!(from && to);

  return (
    <div className="select-none">
      <DayPicker
        mode="range"
        selected={{ from, to }}
        onSelect={handleSelect}
        disabled={{ before: min }}
        numberOfMonths={numMonths}
        defaultMonth={from ?? min}
        weekStartsOn={1}
        showOutsideDays={false}
        classNames={{
          root: "p-4 pb-2",
          months: "flex gap-8",
          month: "space-y-3 min-w-[224px]",
          month_caption:
            "relative flex items-center justify-center h-9 mb-1",
          caption_label: "text-sm font-bold text-slate-900",
          nav: "absolute inset-x-0 top-0 h-9 flex items-center justify-between pointer-events-none",
          button_previous:
            "pointer-events-auto h-8 w-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-slate-500 transition-colors",
          button_next:
            "pointer-events-auto h-8 w-8 flex items-center justify-center rounded-full hover:bg-zinc-100 text-slate-500 transition-colors",
          month_grid: "w-full border-collapse",
          weekdays: "",
          weekday:
            "text-[11px] font-semibold text-slate-400 uppercase text-center pb-2 w-9",
          week: "",
          /*
           * rdp-day goes on the <td>. The range modifier classes (rdp-range-start,
           * rdp-range-end, rdp-range-middle) are added here too — our globals.css
           * targets them to apply the Airbnb-style gradient/highlight.
           */
          day: "rdp-day p-0 text-center align-middle",
          day_button: cn(
            "rdp-day-btn",
            "h-8 w-8 rounded-full text-sm",
            "inline-flex items-center justify-center",
            "transition-colors duration-150",
            "hover:bg-zinc-100 text-slate-700",
            "focus:outline-none cursor-pointer",
          ),
          today:
            "[&_.rdp-day-btn]:font-extrabold [&_.rdp-day-btn]:text-blue-600",
          selected: "",
          disabled: "opacity-25 pointer-events-none",
          outside: "invisible pointer-events-none",
          hidden: "invisible pointer-events-none",
          range_start: "rdp-range-start",
          range_end: "rdp-range-end",
          range_middle: "rdp-range-middle",
          focused:
            "[&_.rdp-day-btn]:ring-2 [&_.rdp-day-btn]:ring-blue-400 [&_.rdp-day-btn]:ring-offset-1",
        }}
        components={{
          Chevron: (props) =>
            props.orientation === "left" ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            ),
        }}
        formatters={{
          formatCaption: (month) =>
            `${MONTHS_FULL[month.getMonth()]} ${month.getFullYear()}`,
          formatWeekdayName: (weekday) => DAYS_SHORT[weekday.getDay()] ?? "",
        }}
      />

      {/* ── Footer ── */}
      <div className="mt-1 flex items-center justify-between border-t border-zinc-100 px-4 py-3">
        <button
          type="button"
          onClick={() => onRangeChange(undefined, undefined)}
          disabled={!from && !to}
          className="text-sm text-slate-400 hover:text-slate-600 disabled:cursor-default disabled:opacity-30 transition-colors"
        >
          Obriši
        </button>

        <div className="flex items-center gap-3">
          <AnimatePresence mode="wait">
            {days > 0 && (
              <motion.span
                key={days}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-sm font-semibold text-slate-600"
              >
                {days} {days === 1 ? "dan" : "dana"}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={onClose}
            className={cn(
              "rounded-lg px-4 py-1.5 text-sm font-semibold transition-all duration-150",
              canApply
                ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.97]"
                : "bg-zinc-100 text-slate-400 cursor-default",
            )}
          >
            {!from
              ? "Izaberite datum"
              : !to
                ? "Izaberite kraj"
                : "Primeni ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── DateRangePicker (Popover shell) ───────────────────────────────────────── */

interface DateRangePickerProps {
  from: Date | undefined;
  to: Date | undefined;
  minDate?: Date;
  onRangeChange: (from: Date | undefined, to: Date | undefined) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  align?: "start" | "center" | "end";
  /** The element that triggers the popover (wrapped with Popover.Trigger asChild). */
  children: React.ReactNode;
}

export function DateRangePicker({
  from,
  to,
  minDate,
  onRangeChange,
  open,
  onOpenChange,
  align = "start",
  children,
}: DateRangePickerProps) {
  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align={align}
          sideOffset={8}
          avoidCollisions
          collisionPadding={16}
          className={cn(
            "z-[300] bg-white rounded-2xl",
            "border border-zinc-200",
            "shadow-[0_8px_48px_-8px_rgba(0,0,0,0.14),0_2px_8px_-2px_rgba(0,0,0,0.06)]",
            /* Radix built-in enter/exit animations */
            "data-[state=open]:animate-in  data-[state=open]:fade-in-0  data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            "data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
            "duration-150 focus:outline-none",
          )}
        >
          <DateRangeCalendar
            from={from}
            to={to}
            minDate={minDate}
            onRangeChange={onRangeChange}
            onClose={() => onOpenChange(false)}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

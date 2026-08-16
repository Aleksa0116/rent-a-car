"use client";

import { useState, useCallback, useId, useEffect } from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, CalendarDays, Clock, MapPin, User, Phone,
  MessageSquare, MessageCircle, Check, ChevronDown,
  AlertCircle, Zap, Loader2,
} from "lucide-react";
import { cn, getRentalDays, calculateRentalPrice, calculateExtrasCost, formatCurrency, generateTimeSlots } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { pickupLocations } from "@/lib/config";
import type { Car, BookingDetails } from "@/lib/types";
import { DateRangePicker, formatDateShort } from "@/components/ui/DateRangePicker";
import { PremiumSelect } from "@/components/ui/PremiumSelect";

// ─── Constants ─────────────────────────────────────────────────────────────────

const TIME_SLOTS = generateTimeSlots(7, 22, 30);

const CATEGORY_LABELS: Record<string, string> = {
  economy: "Ekonomična", compact: "Gradski", suv: "SUV",
  luxury: "Premium", van: "Kombi", convertible: "Kabriolet",
  sport: "Sport", business: "Biznis",
};

const EXTRAS_CONFIG: {
  key: keyof BookingDetails["extras"];
  label: string;
  description: string;
  icon: string;
  pricePerDay: number;
}[] = [
  { key: "childSeat",          label: "Dečija sedišta",   description: "Sertifikovano sedište",     icon: "👶", pricePerDay: 5  },
  { key: "gps",                label: "GPS navigacija",    description: "Offline mape uključene",    icon: "🗺️", pricePerDay: 8  },
  { key: "additionalDriver",   label: "Dodatni vozač",     description: "Neograničeni vozači",       icon: "👤", pricePerDay: 10 },
  { key: "fullInsurance",      label: "Puno osiguranje",   description: "Nulta franšiza",             icon: "🛡️", pricePerDay: 15 },
  { key: "roadsideAssistance", label: "Pomoć na putu",     description: "24/7 asistencija",          icon: "🔧", pricePerDay: 5  },
];

// ─── Local form state ──────────────────────────────────────────────────────────

interface FormState {
  pickupDate: Date | undefined;
  returnDate: Date | undefined;
  pickupTime: string;
  returnTime: string;
  locationId: string;
  customerName: string;
  customerPhone: string;
  notes: string;
  extras: BookingDetails["extras"];
}

const EMPTY_FORM: FormState = {
  pickupDate: undefined, returnDate: undefined,
  pickupTime: "10:00", returnTime: "10:00",
  locationId: "", customerName: "", customerPhone: "", notes: "",
  extras: { childSeat: false, gps: false, additionalDriver: false, fullInsurance: false, roadsideAssistance: false },
};

// ─── Props ─────────────────────────────────────────────────────────────────────

interface BookingModalProps {
  car: Car | null;
  open: boolean;
  onClose: () => void;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function BookingModal({ car, open, onClose }: BookingModalProps) {
  const formId = useId();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  useEffect(() => {
    if (open) { setForm(EMPTY_FORM); setErrors({}); setStatus("idle"); }
  }, [open, car?.id]);

  // ── Derived ────────────────────────────────────────────────────────────────

  const days      = getRentalDays(form.pickupDate ?? null, form.returnDate ?? null);
  const basePrice = car && days > 0
    ? calculateRentalPrice(car, form.pickupDate ?? null, form.returnDate ?? null)
    : 0;
  const extrasPerDay = calculateExtrasCost(form.extras);
  const extrasTotal  = extrasPerDay * (days || 1);
  const discount     = days >= 7 ? Math.round(basePrice * 0.05) : 0;
  const total        = basePrice + extrasTotal - discount;
  const currency     = car?.pricing.currency ?? "EUR";
  const location     = pickupLocations.find((l) => l.name === form.locationId);
  const isDelivery   = form.locationId === "Dostava na adresu";

  // ── Helpers ────────────────────────────────────────────────────────────────

  const setField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  }, []);

  /* Handles the unified date range picker callback */
  const handleDateRangeChange = useCallback((from: Date | undefined, to: Date | undefined) => {
    setForm((prev) => ({ ...prev, pickupDate: from, returnDate: to }));
    setErrors((prev) => { const n = { ...prev }; delete n.pickupDate; delete n.returnDate; return n; });
  }, []);

  const toggleExtra = useCallback((key: keyof BookingDetails["extras"]) => {
    setForm((prev) => ({ ...prev, extras: { ...prev.extras, [key]: !prev.extras[key] } }));
  }, []);

  // ── Validation ─────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.pickupDate) e.pickupDate = "Obavezno polje";
    if (!form.returnDate) e.returnDate = "Obavezno polje";
    if (form.pickupDate && form.returnDate && form.returnDate <= form.pickupDate)
      e.returnDate = "Mora biti nakon preuzimanja";
    if (!form.locationId) e.locationId = "Odaberite lokaciju";
    if (isDelivery && !form.notes.trim()) e.notes = "Unesite adresu dostave";
    if (!form.customerName.trim()) e.customerName = "Obavezno polje";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!validate() || !car || !form.pickupDate || !form.returnDate || !location) return;
    setStatus("sending");
    const link = generateWhatsAppLink({
      car, pickupDate: form.pickupDate, returnDate: form.returnDate,
      pickupTime: form.pickupTime, returnTime: form.returnTime,
      pickupLocation: location.name,
      customerName: form.customerName.trim(),
      customerPhone: form.customerPhone.trim() || undefined,
      extras: form.extras,
      notes: form.notes.trim() || undefined,
      totalPrice: total, currency,
    });
    await new Promise((r) => setTimeout(r, 350));
    window.open(link, "_blank", "noopener,noreferrer");
    setStatus("success");
    await new Promise((r) => setTimeout(r, 2000));
    onClose();
  };

  if (!car) return null;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>

            {/* ── Overlay ─────────────────────────────────────────────────── */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            {/* ── Panel ───────────────────────────────────────────────────── */}
            <Dialog.Content
              aria-labelledby={`${formId}-title`}
              aria-describedby={`${formId}-desc`}
              asChild
            >
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 32 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  /* Mobile: full-width sheet from bottom */
                  "fixed inset-x-0 bottom-0 z-50",
                  "rounded-t-[24px]",
                  /* Desktop: centered dialog */
                  "sm:inset-auto sm:left-1/2 sm:top-1/2",
                  "sm:-translate-x-1/2 sm:-translate-y-1/2",
                  "sm:max-w-[560px] sm:rounded-[24px]",
                  "w-full max-h-[94dvh] sm:max-h-[92dvh]",
                  "flex flex-col bg-white",
                  "shadow-[0_-8px_48px_-8px_rgba(0,0,0,0.12),0_32px_80px_-12px_rgba(0,0,0,0.35)]",
                  "overflow-hidden"
                )}
              >

                {/* ── Success overlay ─────────────────────────────────────── */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white"
                    >
                      <motion.div
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
                        className="flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] mb-5"
                        style={{ boxShadow: "0 0 0 8px rgba(37,211,102,0.12), 0 0 40px -8px #25D366" }}
                      >
                        <Check className="h-9 w-9 text-white stroke-[2.5]" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center px-8"
                      >
                        <p className="text-2xl font-bold text-slate-900">Upit poslat!</p>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                          WhatsApp se otvorio sa svim detaljima.<br />
                          Kontaktiraćemo Vas u roku od 30 minuta.
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Mobile drag handle ──────────────────────────────────── */}
                <div className="flex justify-center pt-3 pb-1 sm:hidden">
                  <div className="h-1 w-10 rounded-full bg-zinc-200" />
                </div>

                {/* ── Header ──────────────────────────────────────────────── */}
                <div className="flex items-center justify-between px-5 pt-3 pb-4 sm:pt-5 shrink-0">
                  <div>
                    <Dialog.Title
                      id={`${formId}-title`}
                      className="text-lg font-bold text-slate-900 leading-none"
                    >
                      Rezervacija
                    </Dialog.Title>
                    <Dialog.Description
                      id={`${formId}-desc`}
                      className="mt-0.5 text-xs text-slate-400"
                    >
                      Popunite formu — šaljemo upit direktno na WhatsApp
                    </Dialog.Description>
                  </div>
                  <Dialog.Close
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-slate-400 hover:bg-zinc-50 hover:text-slate-700 transition-colors"
                    aria-label="Zatvori"
                  >
                    <X className="h-4 w-4" />
                  </Dialog.Close>
                </div>

                {/* ── Car strip ───────────────────────────────────────────── */}
                <div className="mx-5 mb-4 flex items-center gap-4 rounded-2xl border border-zinc-100 bg-zinc-50 p-3 shrink-0">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm">
                    <CarThumb src={car.thumbnailImage} alt={car.name} />
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      {CATEGORY_LABELS[car.category] ?? car.category}
                    </p>
                    <p className="text-sm font-extrabold text-slate-900 leading-tight line-clamp-1">
                      {car.brand} {car.model}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {car.specs.year} · {car.specs.engineLabel}
                    </p>
                  </div>
                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] text-slate-400 font-medium">od</p>
                    <p className="text-xl font-extrabold text-blue-600 leading-none">
                      {formatCurrency(car.pricing.daily, currency)}
                    </p>
                    <p className="text-[10px] text-slate-400">/dan</p>
                  </div>
                </div>

                {/* ── Scrollable form ─────────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto px-5 pb-2">
                  <form
                    id={formId}
                    onSubmit={(e) => { e.preventDefault(); void handleSubmit(); }}
                    noValidate
                    className="space-y-7"
                  >
                    {/* ── Section 1: Period ─────────────────────────────── */}
                    <section>
                      <SectionHeader icon={<CalendarDays className="h-4 w-4" />} label="Period najma" />

                      {/* Unified date range picker */}
                      <div className="mb-3">
                        <FieldWrapper
                          label="Datum preuzimanja → vraćanja"
                          required
                          error={errors.pickupDate ?? errors.returnDate}
                        >
                          <DateRangePicker
                            from={form.pickupDate}
                            to={form.returnDate}
                            onRangeChange={handleDateRangeChange}
                            open={datePickerOpen}
                            onOpenChange={setDatePickerOpen}
                            align="center"
                          >
                            <button
                              type="button"
                              className={cn(
                                "w-full h-11 flex items-center gap-3 rounded-xl border px-3.5",
                                "text-sm outline-none transition-all bg-white",
                                (errors.pickupDate || errors.returnDate)
                                  ? "border-red-300 ring-2 ring-red-100"
                                  : "border-zinc-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                              )}
                            >
                              <CalendarDays className="h-4 w-4 shrink-0 text-slate-400" />
                              <span className={cn(
                                "flex-1 text-left",
                                form.pickupDate ? "text-slate-900 font-medium" : "text-slate-400"
                              )}>
                                {form.pickupDate ? formatDateShort(form.pickupDate) : "Preuzimanje"}
                              </span>
                              <span className="text-slate-300 text-xs font-light">→</span>
                              <span className={cn(
                                "flex-1 text-right",
                                form.returnDate ? "text-slate-900 font-medium" : "text-slate-400"
                              )}>
                                {form.returnDate ? formatDateShort(form.returnDate) : "Vraćanje"}
                              </span>
                            </button>
                          </DateRangePicker>
                        </FieldWrapper>
                      </div>

                      {/* Time selects */}
                      <div className="grid grid-cols-2 gap-3">
                        <FieldWrapper label="Vreme preuzimanja">
                          <TimeSelect
                            value={form.pickupTime}
                            onChange={(v) => setField("pickupTime", v)}
                          />
                        </FieldWrapper>

                        <FieldWrapper label="Vreme vraćanja">
                          <TimeSelect
                            value={form.returnTime}
                            onChange={(v) => setField("returnTime", v)}
                          />
                        </FieldWrapper>
                      </div>

                      {/* Duration badge */}
                      <AnimatePresence>
                        {days > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex items-center gap-2.5 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2.5">
                              <Zap className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                              <span className="text-sm font-semibold text-blue-700">
                                {days} {days === 1 ? "dan najma" : "dana najma"}
                                {days >= 7 && (
                                  <span className="ml-2 font-bold text-emerald-600">· Popust 5% primenjen 🎉</span>
                                )}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </section>

                    {/* ── Section 2: Location ───────────────────────────── */}
                    <section>
                      <SectionHeader icon={<MapPin className="h-4 w-4" />} label="Lokacija preuzimanja" />

                      <FieldWrapper label="Gde preuzimate vozilo?" required error={errors.locationId}>
                        <PremiumSelect
                          value={form.locationId}
                          onValueChange={(v) => setField("locationId", v)}
                          placeholder="Izaberi lokaciju…"
                          icon={<MapPin className="h-4 w-4" />}
                          options={pickupLocations.map((loc) => ({
                            value: loc.name,
                            label: `${loc.isAirport ? "✈  " : loc.name === "Dostava na adresu" ? "🏠  " : "📍  "}${loc.name}`,
                          }))}
                          className={errors.locationId ? "border-red-300 focus:border-red-400 ring-2 ring-red-100" : ""}
                        />
                      </FieldWrapper>

                      <AnimatePresence>
                        {location && !isDelivery && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-2 flex items-center gap-1.5 text-xs text-slate-400"
                          >
                            <MapPin className="h-3 w-3 shrink-0" />
                            {location.address}
                          </motion.p>
                        )}
                        {isDelivery && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-2 text-xs font-medium text-blue-600"
                          >
                            Unesite tačnu adresu za dostavu u napomenu ispod.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </section>

                    {/* ── Section 3: Contact ────────────────────────────── */}
                    <section>
                      <SectionHeader icon={<User className="h-4 w-4" />} label="Vaši podaci" />

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <FieldWrapper label="Ime i prezime" required error={errors.customerName}>
                          <div className="relative">
                            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Marko Petrović"
                              value={form.customerName}
                              onChange={(e) => setField("customerName", e.target.value)}
                              autoComplete="name"
                              className={cn(inputCls(!!errors.customerName), "pl-10")}
                            />
                          </div>
                        </FieldWrapper>

                        <FieldWrapper label="Broj telefona (opciono)">
                          <div className="relative">
                            <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                              type="tel"
                              placeholder="+381 6X XXX XXXX"
                              value={form.customerPhone}
                              onChange={(e) => setField("customerPhone", e.target.value)}
                              autoComplete="tel"
                              className={cn(inputCls(false), "pl-10")}
                            />
                          </div>
                        </FieldWrapper>
                      </div>

                      <div className="mt-3">
                        <FieldWrapper
                          label={isDelivery ? "Adresa dostave" : "Napomena (opciono)"}
                          required={isDelivery}
                          error={errors.notes}
                        >
                          <div className="relative">
                            <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-400" />
                            <textarea
                              placeholder={
                                isDelivery
                                  ? "Ulica i broj, grad, poštanski broj…"
                                  : "Posebni zahtevi, broj leta, napomene…"
                              }
                              value={form.notes}
                              onChange={(e) => setField("notes", e.target.value)}
                              rows={2}
                              className={cn(
                                inputCls(!!errors.notes),
                                "pl-10 py-3 h-auto resize-none"
                              )}
                            />
                          </div>
                        </FieldWrapper>
                      </div>
                    </section>

                    {/* ── Section 4: Extras ─────────────────────────────── */}
                    <section className="pb-2">
                      <SectionHeader icon={<Zap className="h-4 w-4" />} label="Dodaci (opciono)" />

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {EXTRAS_CONFIG.map((extra) => {
                          const isOn = form.extras[extra.key];
                          return (
                            <button
                              key={extra.key}
                              type="button"
                              onClick={() => toggleExtra(extra.key)}
                              aria-pressed={isOn}
                              className={cn(
                                "flex items-center gap-3.5 rounded-xl border-2 px-4 py-3 text-left",
                                "transition-all duration-150 select-none",
                                isOn
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-zinc-200 bg-white hover:border-zinc-300"
                              )}
                            >
                              <span className="text-xl leading-none">{extra.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className={cn("text-sm font-semibold leading-tight", isOn ? "text-blue-800" : "text-slate-800")}>
                                  {extra.label}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">{extra.description}</p>
                              </div>
                              <div className="shrink-0 text-right">
                                <p className={cn("text-xs font-bold", isOn ? "text-blue-600" : "text-slate-500")}>
                                  +€{extra.pricePerDay}
                                </p>
                                <p className="text-[10px] text-slate-400">/dan</p>
                              </div>
                              {/* Checkmark indicator */}
                              <div className={cn(
                                "shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all duration-150",
                                isOn ? "border-blue-500 bg-blue-500" : "border-zinc-300"
                              )}>
                                {isOn && <Check className="h-3 w-3 text-white stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  </form>
                </div>

                {/* ── Sticky footer ───────────────────────────────────────── */}
                <div className="shrink-0 border-t border-zinc-100 bg-white px-5 py-4">

                  {/* Live price breakdown */}
                  <div className="mb-4 rounded-xl bg-zinc-50 px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm text-slate-500">
                        {days > 0 ? (
                          <>
                            {days} dan{days !== 1 ? "a" : ""} × {formatCurrency(car.pricing.daily, currency)}
                            {extrasTotal > 0 && <span className="text-slate-400"> + dodaci</span>}
                            {discount > 0 && <span className="ml-1 font-semibold text-emerald-600">(-5%)</span>}
                          </>
                        ) : (
                          <span className="text-slate-400">Izaberite period</span>
                        )}
                      </div>
                      <motion.div key={total} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                        <span className={cn("text-xl font-extrabold", days > 0 ? "text-slate-900" : "text-slate-300")}>
                          {days > 0 ? formatCurrency(total, currency) : "—"}
                        </span>
                      </motion.div>
                    </div>
                    {days > 0 && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        Depozit: {formatCurrency(car.pricing.deposit, currency)} · {car.pricing.includedKmPerDay} km/dan uključeno
                      </p>
                    )}
                  </div>

                  {/* WhatsApp CTA */}
                  <button
                    type="button"
                    form={formId}
                    onClick={() => { void handleSubmit(); }}
                    disabled={status === "sending" || status === "success"}
                    className={cn(
                      "flex w-full items-center justify-center gap-3 rounded-xl py-3.5",
                      "text-base font-bold text-white transition-all duration-200",
                      "bg-[#25D366] hover:bg-[#20bd5a]",
                      "active:scale-[0.98]",
                      "disabled:opacity-60 disabled:cursor-not-allowed"
                    )}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Šaljemo…
                      </>
                    ) : status === "success" ? (
                      <>
                        <Check className="h-5 w-5 stroke-[2.5]" />
                        Poslato!
                      </>
                    ) : (
                      <>
                        <MessageCircle className="h-5 w-5" />
                        Pošalji upit na WhatsApp
                      </>
                    )}
                  </button>

                  <p className="mt-2.5 text-center text-[11px] text-slate-400">
                    Odgovaramo za 30 minuta · Bez skrivenih troškova
                  </p>
                </div>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        {icon}
      </div>
      <span className="text-sm font-bold text-slate-800">{label}</span>
      <div className="flex-1 h-px bg-zinc-100" />
    </div>
  );
}

function FieldWrapper({
  label, required, error, children,
}: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-600">
        {label}
        {required && <span className="ml-0.5 text-blue-500">*</span>}
      </label>
      {children}
      {error && (
        <div role="alert" className="flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3 text-red-500 shrink-0" />
          <span className="text-xs text-red-500">{error}</span>
        </div>
      )}
    </div>
  );
}

function TimeSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <Clock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputCls(false), "pl-10 pr-8 appearance-none cursor-pointer")}
      >
        {TIME_SLOTS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
    </div>
  );
}

// ─── CarThumb ──────────────────────────────────────────────────────────────────
// Small blur-up thumbnail used in the car strip inside the booking modal.

function CarThumb({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 scale-110",
          "bg-gradient-to-br from-zinc-50 to-zinc-100 blur-xl",
          "transition-opacity duration-400 ease-out",
          loaded ? "opacity-0" : "opacity-100"
        )}
      />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="96px"
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-contain p-1.5",
          "transition-all duration-400 ease-out",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          filter: loaded ? "drop-shadow(0 4px 8px rgba(0,0,0,0.10))" : "none",
        }}
      />
    </>
  );
}

// ─── Style helper ──────────────────────────────────────────────────────────────

function inputCls(hasError: boolean): string {
  return cn(
    "w-full h-11 rounded-xl border px-3.5 text-sm outline-none transition-all",
    "bg-white text-slate-900 placeholder:text-slate-400",
    "[color-scheme:light]",
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-zinc-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  );
}

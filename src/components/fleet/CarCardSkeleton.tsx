import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Structural placeholder for CarCard while fleet data is loading.
 * Mirrors the CarCard layout 1-to-1:
 *   header (category + fixed-h name) → image → specs row → footer (price + button)
 */
export function CarCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-100 bg-white shadow-sm overflow-hidden">

      {/* ── Header — category label + fixed-height name block ─────────────── */}
      <div className="px-4 pt-4 pb-0">
        {/* Category label */}
        <Skeleton className="h-2.5 w-14 mb-1.5" />
        {/* Name — matches the h-12 fixed container in CarCard */}
        <Skeleton className="h-12 w-full" />
      </div>

      {/* ── Image zone — mt-2 h-44 matching CarCard ───────────────────────── */}
      <div className="mt-2 h-44 w-full">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* ── Specs row — transmission badge + fuel ─────────────────────────── */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-4 py-3 border-b border-zinc-100">
          {/* Transmission: square badge + label */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* ── Footer — price block + CTA button ─────────────────────────── */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="space-y-1.5">
            {/* "od XX€/dan" */}
            <Skeleton className="h-7 w-28" />
            {/* "Depozit XX€" */}
            <Skeleton className="h-3 w-24" />
          </div>
          {/* IZABERI button */}
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold tracking-wide uppercase",
  {
    variants: {
      variant: {
        brand:
          "bg-[color-mix(in_srgb,var(--color-brand-500)_15%,transparent)] text-[var(--color-brand-400)] border border-[color-mix(in_srgb,var(--color-brand-500)_30%,transparent)]",
        success:
          "bg-[color-mix(in_srgb,#22c55e_15%,transparent)] text-[#22c55e] border border-[color-mix(in_srgb,#22c55e_30%,transparent)]",
        warning:
          "bg-[color-mix(in_srgb,#f59e0b_15%,transparent)] text-[#f59e0b] border border-[color-mix(in_srgb,#f59e0b_30%,transparent)]",
        error:
          "bg-[color-mix(in_srgb,#ef4444_15%,transparent)] text-[#ef4444] border border-[color-mix(in_srgb,#ef4444_30%,transparent)]",
        muted:
          "bg-[var(--color-surface-hover)] text-[var(--color-text-muted)] border border-[var(--color-surface-border)]",
        outline:
          "border border-[var(--color-surface-border)] text-[var(--color-text-secondary)]",
        solid:
          "bg-[var(--color-brand-500)] text-white",
      },
      size: {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-[11px]",
        md: "px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "brand",
      size: "sm",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-[#22c55e]",
            variant === "warning" && "bg-[#f59e0b]",
            variant === "error" && "bg-[#ef4444]",
            (variant === "brand" || variant === "solid") && "bg-[var(--color-brand-500)]",
            variant === "muted" && "bg-[var(--color-text-muted)]"
          )}
        />
      )}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };

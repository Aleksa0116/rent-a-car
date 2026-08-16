"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "font-semibold text-sm tracking-wide",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500",
    "disabled:pointer-events-none disabled:opacity-40",
    "select-none cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--color-brand-500)] text-white",
          "hover:bg-[var(--color-brand-400)] hover:-translate-y-px hover:shadow-md",
          "active:translate-y-0 active:shadow-none active:scale-[0.98]",
        ],
        secondary: [
          "bg-[var(--color-surface-card)] text-[var(--color-text-primary)]",
          "border border-[var(--color-surface-border)] shadow-[var(--shadow-card)]",
          "hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-surface-muted)] hover:shadow-[var(--shadow-card-hover)]",
          "active:scale-[0.98]",
        ],
        outline: [
          "border border-[var(--color-brand-500)] text-[var(--color-brand-400)]",
          "hover:bg-[color-mix(in_srgb,var(--color-brand-500)_10%,transparent)]",
          "active:scale-[0.98]",
        ],
        ghost: [
          "text-[var(--color-text-secondary)]",
          "hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]",
        ],
        destructive: [
          "bg-[var(--color-error)] text-white",
          "hover:opacity-90",
          "active:scale-[0.98]",
        ],
        whatsapp: [
          "bg-[#25D366] text-white",
          "hover:bg-[#20bd5a] hover:shadow-[0_0_24px_-4px_#25D366]",
          "active:scale-[0.98]",
        ],
        link: [
          "text-[var(--color-brand-400)] underline-offset-4",
          "hover:underline",
          "h-auto p-0",
        ],
      },
      size: {
        xs: "h-7 rounded-md px-3 text-xs",
        sm: "h-9 rounded-lg px-4 text-sm",
        md: "h-11 rounded-xl px-6 text-sm",
        lg: "h-13 rounded-xl px-8 text-base",
        xl: "h-15 rounded-2xl px-10 text-base",
        icon: "h-10 w-10 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glass?: boolean;
  glow?: boolean;
}

function Card({ className, hover = true, glass = false, glow = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-surface-border)]",
        glass
          ? "glass"
          : "bg-[var(--color-surface-card)]",
        hover && [
          "transition-all duration-200 ease-out",
          "hover:border-[color-mix(in_srgb,var(--color-brand-500)_30%,var(--color-surface-border))]",
          "hover:shadow-[0_10px_40px_-10px_rgb(0_0_0_/_0.6)]",
          "hover:-translate-y-0.5",
        ],
        glow && "shadow-[var(--shadow-glow-sm)]",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight text-[var(--color-text-primary)]",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-[var(--color-text-muted)]", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateStars } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCount?: boolean;
}

export function StarRating({
  rating,
  reviewCount,
  size = "md",
  className,
  showCount = true,
}: StarRatingProps) {
  const { full, half, empty } = generateStars(rating);

  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];

  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size];

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(iconSize, "fill-[var(--color-brand-400)] text-[var(--color-brand-400)]")}
          />
        ))}
        {half && (
          <StarHalf
            className={cn(iconSize, "fill-[var(--color-brand-400)] text-[var(--color-brand-400)]")}
          />
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(iconSize, "text-[var(--color-surface-muted)]")}
          />
        ))}
      </div>
      <span className={cn("font-semibold text-[var(--color-text-primary)]", textSize)}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn("text-[var(--color-text-muted)]", textSize)}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

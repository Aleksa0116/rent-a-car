import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Base skeleton pulse block.
 * Compose it into layout-specific skeletons (e.g. CarCardSkeleton).
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-zinc-200",
        className
      )}
      {...props}
    />
  );
}

import { cn } from "@/lib/utils";

/** Indian vegetarian symbol: green square with a green dot. */
export function VegMark({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Pure vegetarian"
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center rounded-[3px] border-[1.5px] border-veg",
        className,
      )}
    >
      <span className="size-2 rounded-full bg-veg" />
    </span>
  );
}

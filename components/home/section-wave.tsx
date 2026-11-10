import { cn } from "@/lib/utils";

export function SectionWave({
  position,
  surface,
  className,
}: {
  position: "top" | "bottom";
  surface: "background" | "surface-cream" | "surface-clay" | "navy";
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{ color: `var(--${surface})` }}
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-10 w-full sm:h-16 md:h-20",
        position === "top" ? "-top-px" : "-bottom-px rotate-180",
        className
      )}
    >
      <path
        d="M0 0h1440v28c-160 34-330 52-520 40C700 54 560 18 380 20 230 22 110 44 0 58z"
        fill="currentColor"
      />
    </svg>
  );
}

import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-accent", className)}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M10.5 23.5V8.5h8.1c3.15 0 5.15 2.05 5.15 5.05 0 2.95-2 5.05-5.15 5.05H10.5"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Mark className="size-8" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-2xs font-medium tracking-brand text-fg uppercase">
          Prevail
        </span>
        <span className="mt-1 font-sans text-3xs tracking-kicker text-muted uppercase">
          Mobile Detail
        </span>
      </span>
    </span>
  );
}

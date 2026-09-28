import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          "h-12 w-full appearance-none rounded-sm bg-elevated px-4 pr-10 text-sm text-fg shadow-border outline-none transition-[box-shadow] duration-150 ease-smooth focus-visible:shadow-border-hover focus-visible:ring-2 focus-visible:ring-ring/40",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
        strokeWidth={1.5}
        aria-hidden
      />
    </div>
  );
}

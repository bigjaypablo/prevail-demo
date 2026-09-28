import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-sm bg-elevated px-4 text-sm text-fg shadow-border outline-none transition-[box-shadow] duration-150 ease-smooth placeholder:text-subtle focus-visible:shadow-border-hover focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  );
}

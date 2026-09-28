import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/landing/mark";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#quote", label: "Quote" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-200 ease-smooth",
        scrolled ? "bg-bg/94 shadow-border" : "bg-transparent",
      )}
    >
      <div className="page-wrap flex h-20 items-center justify-between gap-4">
        <a href="#top" className="shrink-0" aria-label={`${SITE.name} home`}>
          <Wordmark />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-muted transition-colors duration-150 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={SITE.telHref}
            className="hidden text-sm tracking-wide text-muted transition-colors duration-150 hover:text-fg lg:inline"
          >
            {SITE.phoneDisplay}
          </a>
          <Button asChild size="sm">
            <a href="#quote">Request a Quote</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

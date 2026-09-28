import { Wordmark } from "@/components/landing/mark";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-wrap grid gap-10 py-14 md:grid-cols-4 md:gap-8">
        <div className="md:col-span-1">
          <Wordmark />
          <a
            href={SITE.telHref}
            className="mt-6 block font-display text-2xl tracking-tight text-fg transition-colors duration-150 hover:text-accent"
          >
            {SITE.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-muted">{SITE.city}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-kicker text-muted uppercase">
            Service areas
          </p>
          <ul className="mt-4 space-y-2 text-sm text-fg">
            {SITE.areas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-kicker text-muted uppercase">
            Hours
          </p>
          <p className="mt-4 text-sm text-fg">{SITE.hours}</p>
          <p className="mt-1 text-sm text-muted">{SITE.hoursNote}</p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-kicker text-muted uppercase">
            Payment
          </p>
          <ul className="mt-4 space-y-2 text-sm text-fg">
            {SITE.payments.map((method) => (
              <li key={method}>{method}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hairline" />
      <div className="page-wrap flex flex-col gap-2 py-6 text-xs tracking-wide text-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p>Mobile auto detailing · Kings County, CA</p>
      </div>
    </footer>
  );
}

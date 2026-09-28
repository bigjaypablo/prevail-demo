import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const TRUST = [
  { label: "5.0 Yelp rating", star: true },
  { label: SITE.reviews, star: false },
  { label: SITE.response, star: false },
  { label: SITE.hoursNote, star: false },
] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden"
    >
      <img
        src="/images/hero.jpg"
        alt="Glossy black luxury sedan with ceramic-coated paint after mobile detailing in Hanford, California"
        width={1792}
        height={1008}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-center outline outline-1 -outline-offset-1 outline-fg/10"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/30"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-bg/75 via-bg/25 to-transparent"
        aria-hidden
      />

      <div className="relative page-wrap pt-28 pb-8 md:pb-10">
        <p className="rise rise-1 mb-5 font-sans text-xs font-medium tracking-kicker text-accent uppercase">
          Hanford, California
        </p>
        <h1 className="rise rise-2 max-w-3xl font-display text-5xl leading-display font-medium tracking-tight text-fg sm:text-6xl lg:text-7xl">
          Showroom finish.
          <br />
          Delivered to you.
        </h1>
        <p className="rise rise-3 mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Family-owned mobile detailing for Hanford, Visalia, Lemoore, and Kings
          County. Same-day service. We come to you.
        </p>
        <div className="rise rise-4 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#quote">
              Request a Quote
              <ArrowRight className="size-4" strokeWidth={1.6} />
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href={SITE.smsHref}>Text Us Now</a>
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="hairline" />
        <ul className="page-wrap grid grid-cols-2 gap-x-6 gap-y-3 py-6 md:flex md:flex-wrap md:items-center md:gap-0 md:py-7">
          {TRUST.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center text-sm text-muted"
            >
              {index > 0 ? (
                <span
                  className="mx-4 hidden text-accent/50 md:inline"
                  aria-hidden
                >
                  ·
                </span>
              ) : null}
              {item.star ? (
                <Star
                  className="mr-2 size-3.5 fill-accent text-accent"
                  strokeWidth={0}
                  aria-hidden
                />
              ) : null}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { SITE, TESTIMONIALS } from "@/lib/site";

const PILLARS = [
  { title: "Family-owned", body: "Generational experience, one owner at the wheel." },
  { title: "We come to you", body: "Home, office, or driveway across Kings County." },
  { title: "Same-day service", body: "When the schedule allows, Greg is there today." },
] as const;

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="page-wrap">
        <p className="text-xs font-medium tracking-kicker text-accent uppercase">
          02 — The studio
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight font-medium tracking-tight text-fg md:text-5xl">
          Family-owned. Personally run.
        </h2>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="overflow-hidden rounded-xl shadow-border">
            <img
              src="/images/driveway.jpg"
              alt="Mobile auto detailing at a Hanford, California driveway at golden hour"
              width={1728}
              height={1152}
              loading="lazy"
              className="aspect-3/2 w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
            />
          </div>
          <div>
            <p className="font-display text-3xl leading-snug font-medium tracking-tight text-fg">
              Greg built Prevail the way detailing used to be done — by hand,
              on time, and without a waiting room.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              He answers personally, usually within twenty minutes, and treats
              every vehicle as if it were his own. No shop. No runaround. Just
              careful work at your door across Hanford, Visalia, Lemoore, and
              the rest of Kings County.
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {PILLARS.map((item) => (
                <li key={item.title} className="border-t border-border pt-4">
                  <p className="text-sm font-medium text-fg">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-20 font-display text-3xl font-medium tracking-tight text-fg md:text-4xl">
          Clients, in their own words.
        </h3>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <li
              key={item.name}
              className="flex h-full flex-col rounded-xl bg-surface p-6 shadow-border md:p-7"
            >
              <span
                className="font-display text-5xl leading-none text-accent"
                aria-hidden
              >
                “
              </span>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-fg">
                {item.quote}
              </blockquote>
              <footer className="mt-6 text-xs tracking-wide text-muted uppercase">
                {item.name}
                <span className="text-subtle"> — {item.place}</span>
              </footer>
            </li>
          ))}
        </ul>
        <p className="sr-only">
          {SITE.name} is a family-owned mobile auto detailing business serving
          {` ${SITE.areas.join(", ")}`}.
        </p>
      </div>
    </section>
  );
}

import { SERVICES } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="page-wrap">
        <p className="text-xs font-medium tracking-kicker text-accent uppercase">
          01 — Services
        </p>
        <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight font-medium tracking-tight text-fg md:text-5xl">
          Four disciplines. One standard.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
          Precision work at your home, office, or driveway. No shop wait. No
          shortcuts.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((service, index) => (
            <li key={service.id}>
              <article className="group h-full rounded-xl bg-surface p-3 shadow-border transition-[box-shadow,transform] duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-border-hover">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover outline outline-1 -outline-offset-1 outline-fg/10 transition-transform duration-500 ease-smooth group-hover:scale-105"
                  />
                </div>
                <div className="px-3 pt-5 pb-4">
                  <p className="font-display text-sm tracking-wide text-accent">
                    0{index + 1}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-fg">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

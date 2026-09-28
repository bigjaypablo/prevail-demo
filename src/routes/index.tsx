import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/landing/about";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { QuoteForm } from "@/components/landing/quote-form";
import { Services } from "@/components/landing/services";
import { JSON_LD, SITE } from "@/lib/site";

const TITLE =
  "Prevail Mobile Detail | Hanford CA Mobile Auto Detailing";
const DESCRIPTION = SITE.description;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Hanford CA mobile auto detailing, Visalia mobile detailing, Lemoore car detail, Kings County mobile auto detailing, ceramic wax Hanford, paint correction Visalia, headlight restoration Lemoore, Prevail Mobile Detail",
      },
      { name: "robots", content: "index, follow" },
      { name: "geo.region", content: "US-CA" },
      { name: "geo.placename", content: "Hanford" },
      { name: "author", content: "Prevail Mobile Detail" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <a
        href="#quote"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        Skip to quote form
      </a>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <QuoteForm />
      </main>
      <Footer />
    </>
  );
}

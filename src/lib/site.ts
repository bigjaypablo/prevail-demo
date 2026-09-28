export const SITE = {
  name: "Prevail Mobile Detail",
  shortName: "Prevail",
  tagline: "Showroom finish. Delivered to you.",
  description:
    "Family-owned mobile auto detailing in Hanford, Visalia, Lemoore, and Kings County. Full details, paint correction, ceramic wax, and headlight restoration. Same-day service — we come to you.",
  phoneDisplay: "(559) 381-2750",
  phoneTel: "+15593812750",
  smsHref: "sms:+15593812750",
  telHref: "tel:+15593812750",
  city: "Hanford, CA",
  hours: "8:00 AM – 8:00 PM",
  hoursNote: "Open 7 days",
  response: "~20 min average response",
  rating: "5.0",
  reviews: "25+ five-star reviews",
  owner: "Greg",
  areas: ["Hanford", "Visalia", "Lemoore", "Kings County"],
  payments: ["Cash", "Card", "Venmo", "Zelle"],
} as const;

export const SERVICES = [
  {
    id: "full-detail",
    title: "Full Detail",
    image: "/images/full-detail.jpg",
    alt: "Spotless cognac leather interior after a full mobile auto detail in Hanford, CA",
    description:
      "Interior and exterior restored to a quiet showroom standard — every surface, every seam, every inch of glass.",
  },
  {
    id: "paint-correction",
    title: "Paint Correction",
    image: "/images/paint-correction.jpg",
    alt: "Swirl-free black automotive paint after professional paint correction",
    description:
      "Swirls, haze, and oxidation removed by hand. Depth and clarity returned to the finish.",
  },
  {
    id: "ceramic-wax",
    title: "Ceramic Wax",
    image: "/images/ceramic-wax.jpg",
    alt: "Hydrophobic water beading on ceramic-waxed automotive paint",
    description:
      "A durable, hydrophobic layer with a wet, liquid gloss. Protection that holds between details.",
  },
  {
    id: "headlight-restoration",
    title: "Headlight Restoration",
    image: "/images/headlight.jpg",
    alt: "Crystal-clear restored luxury car headlights after professional restoration",
    description:
      "Clouded lenses clarified and sealed. Safer night driving, a cleaner face for the car.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Greg responded immediately and had me scheduled for the next day. He arrived on time, worked with care, and the car looked better than I expected.",
    name: "Sam M.",
    place: "Hanford",
  },
  {
    quote:
      "I was in town visiting family and needed a last-minute detail on a used car. Greg was one of the only people who actually called back — and the work was outstanding.",
    name: "Dan J.",
    place: "Visalia",
  },
  {
    quote:
      "They easily worked around our schedule, showed up on time, and did a superior job on the interior. This is who we call now.",
    name: "Alan P.",
    place: "Lemoore",
  },
] as const;

export const SERVICE_OPTIONS = [
  "Full Detail",
  "Paint Correction",
  "Ceramic Wax",
  "Headlight Restoration",
  "Not sure / a combination",
] as const;

export const JSON_LD = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutomotiveBusiness"],
  name: SITE.name,
  description: SITE.description,
  telephone: SITE.phoneTel,
  image: "/images/hero.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hanford",
    addressRegion: "CA",
    postalCode: "93230",
    addressCountry: "US",
  },
  areaServed: SITE.areas.map((name) => ({
    "@type": "City",
    name,
  })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "20:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "28",
    bestRating: "5",
  },
  priceRange: "$$",
  paymentAccepted: SITE.payments.join(", "),
};

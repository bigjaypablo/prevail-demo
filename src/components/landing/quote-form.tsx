import { useState, type FormEvent, type ReactNode } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_OPTIONS, SITE } from "@/lib/site";

type Fields = {
  name: string;
  vehicle: string;
  service: string;
  city: string;
  notes: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  name: "",
  vehicle: "",
  service: "",
  city: "",
  notes: "",
};

// Safe — will come from environment variable
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please add your name.";
  if (!values.vehicle.trim())
    errors.vehicle = "Year, make, and model help us quote accurately.";
  if (!values.service) errors.service = "Select a service.";
  if (!values.city.trim()) errors.city = "Tell us where to meet you.";
  return errors;
}

function readQuotes(): unknown[] {
  try {
    const raw = localStorage.getItem("prevail-quotes");
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function generateAIReply(values: Fields): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key is missing");
  }

  const prompt = `You are Greg, owner of Prevail Mobile Detail in Hanford, CA. 
Write a short, warm, professional SMS reply (max 160 characters) to a new quote request.
Be natural and premium — not salesy.
Include the customer's first name if possible.
Mention you'll get back with timing and a clear price soon.
Customer details:
Name: ${values.name}
Vehicle: ${values.vehicle}
Service: ${values.service}
City: ${values.city}
Notes: ${values.notes || "None"}`;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You write short, natural SMS messages for a premium mobile auto detailing business. Keep replies under 160 characters. Sound human and professional.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 100,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Groq error ${res.status}: ${errorText}`);
  }

  const data = await res.json();
  return (
    data.choices?.[0]?.message?.content?.trim() ||
    `Hey ${values.name.split(" ")[0] || "there"}, got your request for the ${values.vehicle}. I'll text you timing + price shortly. — Greg`
  );
}

export function QuoteForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const reply = await generateAIReply(values);
      setAiMessage(reply);

      const existing = readQuotes();
      localStorage.setItem(
        "prevail-quotes",
        JSON.stringify([
          ...existing,
          { ...values, aiReply: reply, at: new Date().toISOString() },
        ]),
      );

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Unknown error");
      setAiMessage(
        `Hey ${values.name.split(" ")[0] || "there"}, got your request for the ${values.vehicle}. I'll text you timing + price shortly. — Greg`,
      );
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="quote" className="scroll-mt-24 py-20 md:py-28">
      <div className="page-wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-medium tracking-kicker text-accent uppercase">
            03 — Inquire
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-medium tracking-tight text-fg md:text-5xl">
            Request a quote.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Tell Greg a little about the vehicle. He’ll text back with timing
            and a clear number — usually within twenty minutes.
          </p>
          <p className="mt-8 text-sm text-fg">
            Prefer to skip the form?{" "}
            <a
              href={SITE.smsHref}
              className="text-accent underline decoration-accent/30 underline-offset-4 transition-colors duration-150 hover:text-accent-hover"
            >
              Text {SITE.phoneDisplay}
            </a>
          </p>
        </div>

        <div className="rounded-3xl bg-surface p-6 shadow-border md:p-8">
          {submitted ? (
            <div className="flex min-h-80 flex-col items-start justify-center">
              <span className="flex size-12 items-center justify-center rounded-sm bg-accent text-accent-fg">
                <Check className="size-5" strokeWidth={1.75} />
              </span>
              <p className="mt-6 font-display text-3xl font-medium tracking-tight text-fg">
                Request received.
              </p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Here’s the SMS Greg would send:
              </p>

              <div className="mt-5 w-full rounded-2xl border border-fg/10 bg-bg p-4">
                <p className="text-xs font-medium tracking-wide text-subtle uppercase">
                  SMS Preview
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg whitespace-pre-wrap">
                  {aiMessage}
                </p>
              </div>

              {errorMsg && (
                <p className="mt-4 text-xs text-danger break-all">
                  Debug: {errorMsg}
                </p>
              )}

              <Button
                className="mt-8"
                variant="secondary"
                type="button"
                onClick={() => {
                  setValues(EMPTY);
                  setSubmitted(false);
                  setAiMessage("");
                  setErrorMsg("");
                }}
              >
                Send another request
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    aria-invalid={Boolean(errors.name)}
                    onChange={(event) => update("name", event.target.value)}
                  />
                </Field>
                <Field id="vehicle" label="Vehicle" error={errors.vehicle}>
                  <Input
                    id="vehicle"
                    name="vehicle"
                    placeholder="Year / Make / Model"
                    value={values.vehicle}
                    aria-invalid={Boolean(errors.vehicle)}
                    onChange={(event) => update("vehicle", event.target.value)}
                  />
                </Field>
                <Field
                  id="service"
                  label="Service interested in"
                  error={errors.service}
                >
                  <Select
                    id="service"
                    name="service"
                    value={values.service}
                    aria-invalid={Boolean(errors.service)}
                    onChange={(event) => update("service", event.target.value)}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field id="city" label="City / Area" error={errors.city}>
                  <Input
                    id="city"
                    name="city"
                    autoComplete="address-level2"
                    placeholder="Hanford, Visalia, Lemoore…"
                    value={values.city}
                    aria-invalid={Boolean(errors.city)}
                    onChange={(event) => update("city", event.target.value)}
                  />
                </Field>
                <Field
                  id="notes"
                  label="Notes"
                  optional
                  className="sm:col-span-2"
                >
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Anything we should know — condition, pets, timing."
                    value={values.notes}
                    onChange={(event) => update("notes", event.target.value)}
                  />
                </Field>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-7 w-full sm:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Generating reply…
                  </>
                ) : (
                  "Request a Quote"
                )}
              </Button>
              <p className="mt-4 text-xs tracking-wide text-subtle">
                We’ll text you back within \~20 minutes.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>
        <span className="tracking-kicker uppercase">{label}</span>
        {optional ? (
          <span className="ml-2 font-normal tracking-normal text-subtle">
            Optional
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

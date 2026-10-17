"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/site";

const interests = ["Business software", "AI integration", "Automation", "Digital transformation", "Technology services", "Workforce support"];
const industries = ["Retail", "Manufacturing", "Professional Services", "Logistics", "Healthcare", "Financial Services", "Other"];

type Errors = Partial<Record<"name" | "company" | "email" | "preferredContactMethod" | "requirement", string>>;

const fieldCls =
  "peer w-full rounded-2xl border border-line bg-card px-4 pb-3 pt-6 text-fg outline-none transition-colors placeholder:text-transparent focus:border-cyan focus:bg-card-strong";
const labelCls =
  "pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted transition-all duration-300 peer-focus:top-2 peer-focus:scale-[0.8] peer-focus:text-cyan peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-[0.8]";

function Field({ name, label, type = "text", required, error, autoComplete }: { name: string; label: string; type?: string; required?: boolean; error?: string; autoComplete?: string }) {
  return (
    <div>
      <div className="relative">
        <input id={name} name={name} type={type} placeholder={label} required={required} autoComplete={autoComplete} aria-invalid={!!error} className={fieldCls} />
        <label htmlFor={name} className={labelCls}>
          {label}
          {required && " *"}
        </label>
      </div>
      {error && <p className="mt-1.5 pl-1 text-xs text-[#ff6b81]">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const toggle = (v: string) => setSelected((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!get("name")) next.name = "Please enter your name.";
    if (!get("company")) next.company = "Please enter your company.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email.";
    if (!get("preferredContactMethod")) next.preferredContactMethod = "Please choose a contact method.";
    if (!get("requirement")) next.requirement = "Please describe your requirement.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Email: ${get("email")}`,
      `Contact Number: ${get("phone") || "-"}`,
      `Industry: ${get("industry") || "-"}`,
      `Preferred Contact Method: ${get("preferredContactMethod")}`,
      `Interested in: ${selected.join(", ") || "-"}`,
      "",
      "Requirement:",
      get("requirement"),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Website enquiry from ${get("company")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden rounded-panel glass-strong p-6 shadow-[var(--shadow)] sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[520px] flex-col items-center justify-center text-center"
          >
            <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden>
              <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#26c6da" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
              <motion.path d="M25 41l10 10 20-22" fill="none" stroke="#35d49a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.5 }} />
            </svg>
            <h3 className="mt-6 text-h2">Your enquiry is ready to send.</h3>
            <p className="mt-3 max-w-sm text-fg-soft">
              Your email app should open with the details filled in. If it doesn&apos;t, write to{" "}
              <a className="text-cyan underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
            <button type="button" onClick={() => setSent(false)} className="mt-8 rounded-full border border-line-strong px-5 py-2.5 text-sm hover:border-cyan">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -20 }} className="space-y-5">
            <fieldset>
              <legend className="mb-3 font-mono text-label uppercase tracking-[0.12em] text-muted">I&apos;m interested in</legend>
              <div className="flex flex-wrap gap-2">
                {interests.map((v) => {
                  const on = selected.includes(v);
                  return (
                    <button
                      type="button"
                      key={v}
                      aria-pressed={on}
                      onClick={() => toggle(v)}
                      className={`rounded-full border px-4 py-2 text-sm transition-all ${on ? "border-cyan bg-cyan/15 text-fg" : "border-line text-fg-soft hover:border-line-strong"}`}
                    >
                      {on ? "✓ " : "+ "}
                      {v}
                    </button>
                  );
                })}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Name" required error={errors.name} autoComplete="name" />
              <Field name="company" label="Company" required error={errors.company} autoComplete="organization" />
              <Field name="email" label="Email" type="email" required error={errors.email} autoComplete="email" />
              <Field name="phone" label="Contact Number" type="tel" autoComplete="tel" />
              <div className="relative">
                <select id="industry" name="industry" defaultValue="" className={`${fieldCls} appearance-none`}>
                  <option value="">Select industry</option>
                  {industries.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
                <label htmlFor="industry" className="pointer-events-none absolute left-4 top-2 scale-[0.8] origin-left text-sm text-muted">
                  Industry
                </label>
              </div>
              <div>
                <div className="relative">
                  <select id="preferredContactMethod" name="preferredContactMethod" defaultValue="" aria-invalid={!!errors.preferredContactMethod} className={`${fieldCls} appearance-none`}>
                    <option value="">Select preference</option>
                    <option>Email</option>
                    <option>Phone</option>
                  </select>
                  <label htmlFor="preferredContactMethod" className="pointer-events-none absolute left-4 top-2 scale-[0.8] origin-left text-sm text-muted">
                    Preferred Contact Method *
                  </label>
                </div>
                {errors.preferredContactMethod && <p className="mt-1.5 pl-1 text-xs text-[#ff6b81]">{errors.preferredContactMethod}</p>}
              </div>
            </div>
            <div>
              <div className="relative">
                <textarea
                  id="requirement"
                  name="requirement"
                  rows={5}
                  placeholder="What would you like to improve, build or scale?"
                  aria-invalid={!!errors.requirement}
                  className={`${fieldCls.replace("placeholder:text-transparent", "placeholder:text-muted/70").replace("pt-6", "pt-8")} resize-none`}
                />
                <label htmlFor="requirement" className="pointer-events-none absolute left-4 top-2 scale-[0.8] origin-left text-sm text-muted">
                  Requirement *
                </label>
              </div>
              {errors.requirement && <p className="mt-1.5 pl-1 text-xs text-[#ff6b81]">{errors.requirement}</p>}
            </div>
            <button
              type="submit"
              data-cursor="Send"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-blue px-6 py-4 font-medium text-white shadow-[0_10px_40px_-10px_rgba(23,105,255,0.8)] transition-shadow hover:shadow-[0_20px_60px_-10px_rgba(38,198,218,0.8)] sm:w-auto"
            >
              <span className="roll">
                <span>Send Enquiry</span>
                <span aria-hidden>Send Enquiry</span>
              </span>
              <span aria-hidden>↗</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-border bg-neutral-950/40 px-3.5 py-2.5 text-text placeholder:text-text-muted/70 transition-colors focus-visible:border-gold focus-visible:outline-none";

export default function QuoteForm() {
  const t = useTranslations("contacto.form");
  const status0: Status = "idle";
  const [status, setStatus] = useState<Status>(status0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { product: "arabica", certification: "none" },
  });

  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  function errorMessage(e?: FieldError) {
    if (!e) return undefined;
    if (e.type === "invalid_string" || e.type === "invalid_format") return t("invalidEmail");
    if (e.type === "too_big") return t("tooLong");
    return t("required");
  }

  async function onSubmit(data: ContactInput) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-success/40 bg-success/10 p-8 text-center"
      >
        <p className="font-display text-h3 text-text">{t("successTitle")}</p>
        <p className="mt-2 text-text-muted">{t("successBody")}</p>
      </div>
    );
  }

  const Label = ({ name, required }: { name: string; required?: boolean }) => (
    <label htmlFor={fid(name)} className="mb-1.5 block text-caption font-medium text-sage">
      {t(name as Parameters<typeof t>[0])}
      {required && <span className="ml-0.5 text-gold" aria-hidden="true">*</span>}
    </label>
  );

  const Err = ({ name, e }: { name: string; e?: FieldError }) =>
    e ? (
      <p id={`${fid(name)}-err`} className="mt-1 text-caption text-danger">
        {errorMessage(e)}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Honeypot — off-screen, not display:none so bots still fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input id={fid("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label name="name" required />
          <input
            id={fid("name")}
            className={cn(fieldClass, errors.name && "border-danger")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${fid("name")}-err` : undefined}
            autoComplete="name"
            {...register("name")}
          />
          <Err name="name" e={errors.name} />
        </div>
        <div>
          <Label name="company" required />
          <input
            id={fid("company")}
            className={cn(fieldClass, errors.company && "border-danger")}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${fid("company")}-err` : undefined}
            autoComplete="organization"
            {...register("company")}
          />
          <Err name="company" e={errors.company} />
        </div>
        <div>
          <Label name="email" required />
          <input
            id={fid("email")}
            type="email"
            className={cn(fieldClass, errors.email && "border-danger")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${fid("email")}-err` : undefined}
            autoComplete="email"
            {...register("email")}
          />
          <Err name="email" e={errors.email} />
        </div>
        <div>
          <Label name="phone" />
          <input
            id={fid("phone")}
            type="tel"
            className={fieldClass}
            autoComplete="tel"
            {...register("phone")}
          />
        </div>
        <div>
          <Label name="country" />
          <input id={fid("country")} className={fieldClass} {...register("country")} />
        </div>
        <div>
          <Label name="product" />
          <select id={fid("product")} className={fieldClass} {...register("product")}>
            <option value="arabica">{t("productOptions.arabica")}</option>
            <option value="robusta">{t("productOptions.robusta")}</option>
            <option value="both">{t("productOptions.both")}</option>
            <option value="specialty">{t("productOptions.specialty")}</option>
          </select>
        </div>
        <div>
          <Label name="grade" />
          <input id={fid("grade")} className={fieldClass} {...register("grade")} />
        </div>
        <div>
          <Label name="volume" />
          <input
            id={fid("volume")}
            className={fieldClass}
            placeholder={t("volumePlaceholder")}
            {...register("volume")}
          />
        </div>
        <div className="sm:col-span-2">
          <Label name="certification" />
          <select id={fid("certification")} className={fieldClass} {...register("certification")}>
            <option value="none">{t("certOptions.none")}</option>
            <option value="usda">{t("certOptions.usda")}</option>
            <option value="ocia">{t("certOptions.ocia")}</option>
            <option value="fourc">{t("certOptions.fourc")}</option>
            <option value="fairtrade">{t("certOptions.fairtrade")}</option>
            <option value="other">{t("certOptions.other")}</option>
          </select>
        </div>
      </div>

      <div>
        <Label name="message" required />
        <textarea
          id={fid("message")}
          rows={4}
          className={cn(fieldClass, "resize-y", errors.message && "border-danger")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? `${fid("message")}-err` : undefined}
          {...register("message")}
        />
        <Err name="message" e={errors.message} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-md border border-danger/40 bg-danger/10 px-4 py-3 text-danger">
          <strong className="font-semibold">{t("errorTitle")}</strong> {t("errorBody")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-gold px-7 py-3.5 font-semibold text-neutral-950 transition-colors duration-200 hover:bg-gold-strong disabled:cursor-not-allowed disabled:opacity-60 sm:self-start"
      >
        {status === "submitting" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}

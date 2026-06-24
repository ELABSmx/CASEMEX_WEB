"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Logo from "@/components/brand/Logo";
import LocaleToggle from "@/components/layout/LocaleToggle";
import { NAV_LINKS } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on resize to desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-hairline/70 bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-neutral-950"
      >
        {t("skip")}
      </a>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 sm:px-8">
        <a
          href="#inicio"
          aria-label={t("home")}
          className="flex h-7 items-center text-text transition-colors hover:text-sage"
        >
          <Logo className="h-7" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-base text-text-muted transition-colors hover:text-text"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LocaleToggle className="hidden sm:flex" />
          <a
            href="#contacto"
            className="hidden min-h-11 items-center rounded-md bg-gold px-5 font-semibold text-neutral-950 transition-colors hover:bg-gold-strong sm:inline-flex"
          >
            {t("cta")}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("close") : t("menu")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-text hover:text-gold lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="border-t border-hairline/70 bg-bg/95 px-6 pb-6 pt-2 backdrop-blur-md lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-hairline/40 py-3.5 text-lg text-text transition-colors hover:text-gold"
                >
                  {t(link.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between">
            <LocaleToggle />
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="inline-flex min-h-11 items-center rounded-md bg-gold px-5 font-semibold text-neutral-950"
            >
              {t("cta")}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

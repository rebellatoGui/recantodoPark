"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Navigation } from "lucide-react";
import { SectionWave } from "@/components/home/section-wave";
import { GoogleIcon } from "@/components/icons/google-icon";
import { contact } from "@/lib/data/pousada";
import { photos } from "@/lib/data/images";
import { InteractiveMap } from "@/components/home/interactive-map";
import { useReveal } from "@/lib/animations/use-reveal";

export function GoogleReviewsSection() {
  const t = useTranslations("googleReviews");
  const tContact = useTranslations("contact");
  const scope = useReveal<HTMLElement>();

  const secondaryLink =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-foreground/15 bg-background/70 px-5 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background";

  return (
    <section
      id="maps"
      ref={scope}
      className="relative isolate scroll-mt-24 overflow-hidden bg-surface-clay pt-32 pb-28 md:pt-44 md:pb-40"
    >
      <Image
        src={photos.googleMaps}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[15%_30%] lg:origin-[15%_30%] lg:scale-120"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-white/92 lg:bg-transparent lg:bg-linear-to-r lg:from-white/85 lg:via-white/60 lg:to-white/15 dark:bg-background/80 dark:lg:from-background/90 dark:lg:via-background/70 dark:lg:to-background/30"
      />

      <SectionWave position="top" surface="navy" />
      <SectionWave position="bottom" surface="surface-cream" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div data-reveal className="max-w-md lg:max-w-none">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.06em] text-muted-foreground">
            <GoogleIcon className="size-3.5" />
            {t("eyebrow")}
          </span>

          <h2 className="heading-section mt-5 text-foreground lg:whitespace-pre-line">{t("title")}</h2>

          <p className="mt-4 flex items-start gap-2 text-base text-muted-foreground">
            <MapPin className="mt-1 size-4 shrink-0 text-terracotta" />
            {tContact("address")}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={contact.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-terracotta px-6 text-sm font-medium text-white transition-colors hover:bg-terracotta/90"
            >
              <Navigation className="size-4 shrink-0" />
              {t("getDirections")}
            </a>
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryLink}
              >
                <MapPin className="size-4 shrink-0" />
                {t("viewOnMaps")}
              </a>
              <a
                href={contact.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={secondaryLink}
              >
                <GoogleIcon className="size-4 shrink-0" />
                {t("leaveReview")}
              </a>
            </div>
          </div>
        </div>

        <div data-reveal>
          <InteractiveMap className="aspect-4/5 w-full shadow-2xl shadow-foreground/15 sm:aspect-4/3 lg:aspect-auto lg:h-140" />
        </div>
      </div>
    </section>
  );
}

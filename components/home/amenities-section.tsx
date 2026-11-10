"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { showcaseAmenities } from "@/lib/data/pousada";
import { useReveal } from "@/lib/animations/use-reveal";
import { SectionBackdrop } from "@/components/home/section-backdrop";

export function AmenitiesSection() {
  const t = useTranslations("amenities");
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="servicos"
      ref={scope}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[color-mix(in_oklch,var(--surface-clay)_40%,var(--surface-cream))] px-6 py-20 md:py-28"
    >
      <SectionBackdrop variant="coaster" />
      <div className="mx-auto max-w-6xl">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-terracotta">
            {t("eyebrow")}
          </p>
          <h2 className="heading-section mt-3 text-foreground">
            {t("title")}
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 md:mt-14 lg:grid-cols-3">
          {showcaseAmenities.map(({ id, icon: Icon, image }) => (
            <li
              key={id}
              data-reveal
              className="group relative isolate aspect-4/5 overflow-hidden lg:aspect-4/3 rounded-2xl bg-navy shadow-sm sm:rounded-3xl"
            >
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 370px, 45vw"
                  className="-z-10 object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy/90 via-navy/25 to-transparent" />
              <div className="flex h-full flex-col justify-end gap-2.5 p-4 sm:p-5">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-gold backdrop-blur-sm sm:size-10">
                  <Icon className="size-[1.1rem] sm:size-5" strokeWidth={1.5} />
                </span>
                <span className="text-sm font-medium leading-snug text-white sm:text-base">
                  {t(`items.${id}`)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

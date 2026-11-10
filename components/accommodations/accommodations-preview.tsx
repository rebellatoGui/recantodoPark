"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Clock, PawPrint } from "lucide-react";
import { photos } from "@/lib/data/images";
import { Link } from "@/i18n/navigation";
import { BookNowButton } from "@/components/booking/book-now-button";
import { useReveal } from "@/lib/animations/use-reveal";
import { SectionBackdrop } from "@/components/home/section-backdrop";
import { cn } from "@/lib/utils";

const gallery = [
  { src: photos.quarto1, key: "quarto1" },
  { src: photos.quartoJanela, key: "quartoJanela" },
  { src: photos.quartoTriplo, key: "quartoTriplo" },
  { src: photos.quartoLilas, key: "quartoLilas" },
  { src: photos.banheiro1, key: "banheiro" },
  { src: photos.cafeBancada, key: "cafeBancada" },
  { src: photos.refeitorioMesas, key: "refeitorioMesas" },
  { src: photos.refeitorio, key: "refeitorio" },
] as const;

export function AccommodationsPreview() {
  const t = useTranslations("accommodationsPreview");
  const tInfo = useTranslations("essentialInfo");
  const tAmenities = useTranslations("amenities");
  const scope = useReveal<HTMLElement>();
  const [active, setActive] = useState(0);

  const go = (dir: 1 | -1) =>
    setActive((i) => (i + dir + gallery.length) % gallery.length);

  const info = [
    {
      Icon: Clock,
      label: tInfo("receptionLabel"),
      value: tAmenities("items.reception"),
    },
    { Icon: PawPrint, label: tInfo("petLabel"), value: tInfo("petValue") },
  ];

  const current = gallery[active];

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden bg-surface-cream py-20 md:py-28"
    >
      <SectionBackdrop variant="grain" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
        <div data-reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            {t("eyebrow")}
          </p>
          <h2 className="heading-section mt-4 text-foreground">{t("title")}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("text")}
          </p>

          <ul className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">
            {info.map(({ Icon, label, value }) => (
              <li key={label} className="flex items-center gap-4 py-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-terracotta text-white">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 font-display text-lg text-foreground">
                    {value}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <BookNowButton />
            <Link
              href="/acomodacoes/suite-01"
              className="inline-flex min-h-12 items-center rounded-full border border-foreground/20 px-6 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              {t("ctaAll")}
            </Link>
          </div>
        </div>

        <div data-reveal>
          <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-muted shadow-2xl shadow-foreground/15">
            <Image
              key={current.src}
              src={current.src}
              alt={t(`photos.${current.key}`)}
              fill
              priority={active === 0}
              className="animate-in object-cover fade-in duration-500"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-navy/80 to-transparent px-5 pt-16 pb-4 text-navy-foreground sm:px-6">
              <p className="text-sm font-medium sm:text-base">
                {t(`photos.${current.key}`)}
              </p>
              <span className="shrink-0 text-xs tabular-nums text-navy-foreground/70">
                {active + 1} / {gallery.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("prev")}
              className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-transform hover:scale-105"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("next")}
              className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-transform hover:scale-105"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
            {gallery.map((item, index) => (
              <li key={item.src}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={t(`photos.${item.key}`)}
                  aria-current={index === active}
                  className={cn(
                    "relative block aspect-4/3 w-full overflow-hidden rounded-xl transition-opacity",
                    index === active
                      ? "opacity-100 ring-2 ring-terracotta ring-offset-2 ring-offset-surface-cream"
                      : "opacity-55 hover:opacity-90",
                  )}
                >
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 8vw, 25vw"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

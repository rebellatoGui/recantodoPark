"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { photos, gravataCarousel } from "@/lib/data/images";
import { useReveal } from "@/lib/animations/use-reveal";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { PhotoCarousel } from "@/components/ui/photo-carousel";

const linkClass =
  "mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-medium text-gold transition-colors hover:text-gold/80";

function DestinationCard({
  image,
  alt,
  distance,
  title,
  description,
  link,
}: {
  image: string;
  alt: string;
  distance: string;
  title: string;
  description: string;
  link?: { href: string; label: string; external?: boolean };
}) {
  return (
    <div
      data-reveal
      data-destination
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(min-width: 768px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-navy/10 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-navy/70 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
          <MapPin className="size-3.5" />
          {distance}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h3 className="font-display text-xl leading-tight sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">
          {description}
        </p>
        {link &&
          (link.external ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {link.label}
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <Link href={link.href} className={linkClass}>
              {link.label}
              <ArrowRight className="size-4" />
            </Link>
          ))}
      </div>
    </div>
  );
}

const gravataMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Praia do Gravatá, Penha - SC")}`;

export function LocationSection() {
  const t = useTranslations("location");
  const scope = useReveal<HTMLElement>();

  useGSAP(
    () => {
      gsap
        .matchMedia()
        .add(
          "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          () => {
            gsap.utils
              .toArray<HTMLElement>("[data-destination]")
              .forEach((card, index) => {
                const side = index === 0 ? -1 : 1;
                gsap.fromTo(
                  card,
                  { xPercent: side * 14, rotate: side * 2.5 },
                  {
                    xPercent: 0,
                    rotate: 0,
                    ease: "none",
                    scrollTrigger: {
                      trigger: card,
                      start: "top bottom",
                      end: "top 70%",
                      scrub: 0.8,
                    },
                  },
                );
              });
          },
        );
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      id="localizacao"
      className="relative isolate overflow-hidden bg-navy py-24 text-navy-foreground md:py-32"
    >
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">
            {t("eyebrow")}
          </p>
          <h2 className="heading-section mt-4">{t("title")}</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          <DestinationCard
            image={photos.betoCarrero}
            alt={t("parkTitle")}
            distance={t("parkDistance")}
            title={t("parkTitle")}
            description={t("parkDescription")}
            link={{ href: "/ingressos-beto-carrero", label: t("parkLink") }}
          />
          <DestinationCard
            image={photos.gravataPedras}
            alt={t("beachTitle")}
            distance={t("beachDistance")}
            title={t("beachTitle")}
            description={t("beachDescription")}
            link={{
              href: gravataMapsUrl,
              label: t("beachLink"),
              external: true,
            }}
          />
        </div>

        <div data-reveal className="mt-20 md:mt-24">
          <h3 className="text-center font-display text-2xl sm:text-3xl">
            {t("carouselTitle")}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-navy-foreground/70 sm:text-base">
            {t("carouselSubtitle")}
          </p>
          <div className="mt-6">
            <PhotoCarousel photos={gravataCarousel} />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { videos } from "@/lib/data/images";
import { SmartVideo } from "@/components/ui/smart-video";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { SplitWords } from "@/components/animations/split-words";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { whenIdle } from "@/lib/animations/when-idle";

export function HeroSection() {
  const t = useTranslations("hero");
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      if (prefersReducedMotion()) return;

      // Os estados iniciais espelham os do globals.css (.hero-intro): o HTML do servidor
      // já nasce neles. A entrada espera a hidratação liberar a thread principal; começar
      // durante ela faz o primeiro quadro saltar.
      const play = contextSafe!(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", force3D: true },
        });
        tl.fromTo(
          "[data-hero-eyebrow]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
        )
          .fromTo(
            "[data-hero-word]",
            { y: 0, yPercent: 110 },
            {
              y: 0,
              yPercent: 0,
              duration: 1.1,
              stagger: 0.07,
              ease: "power4.out",
            },
            "-=0.55",
          )
          .fromTo(
            "[data-hero-subtitle]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.7",
          )
          .fromTo(
            "[data-hero-cta]",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
            "-=0.55",
          );
      });

      return whenIdle(play);
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="hero-intro relative flex h-[92vh] min-h-160 items-end overflow-hidden bg-navy"
    >
      <noscript>
        <style>{`.hero-intro [data-hero-eyebrow], .hero-intro [data-hero-subtitle], .hero-intro [data-hero-cta], .hero-intro [data-hero-word] { opacity: 1 !important; transform: none !important; animation: none !important; }`}</style>
      </noscript>
      <div data-hero-image className="absolute inset-0">
        <SmartVideo
          priority
          sources={videos.hero}
          label={t("videoLabel")}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/40 to-navy/10" />
        <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-navy/85 via-navy/35 to-transparent sm:h-80" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 text-navy-foreground sm:pb-20">
        <div>
          <p
            data-hero-eyebrow
            className="mb-4 text-sm uppercase tracking-[0.35em] text-gold"
          >
            {t("eyebrow")}
          </p>
          <h1
            data-hero-title
            className="font-display text-[2rem] leading-[0.95] font-bold uppercase tracking-[-0.03em] [font-variation-settings:'wdth'_125] sm:text-5xl lg:text-[4rem]"
          >
            <SplitWords text={t("title")} attr="data-hero-word" />
          </h1>
          <p
            data-hero-subtitle
            className="mt-6 max-w-[36ch] text-base text-navy-foreground/80 text-balance sm:text-lg"
          >
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <span data-hero-cta>
              <Magnetic>
                <BookNowButton label={t("ctaPrimary")} />
              </Magnetic>
            </span>
            <span data-hero-cta>
              <Magnetic>
                <WhatsappButton />
              </Magnetic>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

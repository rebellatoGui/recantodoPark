"use client";

import { Fragment, useRef } from "react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { photos, videos } from "@/lib/data/images";
import { DroneVideo } from "@/components/home/drone-video";
import { SectionBackdrop } from "@/components/home/section-backdrop";
import { CountUp } from "@/components/animations/count-up";

const stats = [
  { key: "distance", icon: MapPin },
] as const;

export function AboutSection() {
  const t = useTranslations("about");
  const scope = useRef<HTMLElement>(null);
  const lines = t("title")
    .split(/(?<=,)\s+/)
    .map((line) => line.split(" "));

  useGSAP(
    () => {
      const targets =
        "[data-about-word], [data-about-body], [data-about-stat], [data-about-video]";

      if (prefersReducedMotion()) {
        gsap.set(targets, { opacity: 1, y: 0, yPercent: 0, scale: 1, filter: "none" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope.current, start: "top 72%", once: true },
      });

      tl.from("[data-about-video]", {
        opacity: 0,
        scale: 0.94,
        y: 48,
        duration: 1.2,
        stagger: 0.18,
        ease: "power3.out",
      })
        .from(
          "[data-about-word]",
          {
            yPercent: 115,
            opacity: 0,
            filter: "blur(12px)",
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.25
        )
        .from(
          "[data-about-body]",
          { y: 28, opacity: 0, filter: "blur(6px)", duration: 0.9, ease: "power3.out" },
          "-=0.5"
        )
        .from(
          "[data-about-stat]",
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.14, ease: "power3.out" },
          "-=0.55"
        );

      gsap.matchMedia().add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-about-video]").forEach((video, index) => {
          gsap.fromTo(
            video,
            { yPercent: index === 0 ? 10 : -10 },
            {
              yPercent: index === 0 ? -10 : 10,
              ease: "none",
              scrollTrigger: {
                trigger: scope.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });
    },
    { scope }
  );

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden py-20 text-navy-foreground md:py-28"
    >
      <SectionBackdrop variant="park" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-linear-to-t from-navy to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 items-center gap-5 lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-10">
          <div data-about-video className="lg:order-1">
            <DroneVideo label={t("droneLabel")} className="w-full" />
          </div>

          <div className="order-first col-span-2 text-center lg:order-2 lg:col-span-1">
            <h2 className="heading-section whitespace-nowrap">
              {lines.map((words, l) => (
                <span key={l} className="block">
                  {words.map((word, i) => (
                    <Fragment key={`${word}-${i}`}>
                      <span className="mb-[-0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
                        <span data-about-word className="inline-block">
                          {word}
                        </span>
                      </span>
                      {i < words.length - 1 && " "}
                    </Fragment>
                  ))}
                </span>
              ))}
            </h2>

            <p
              data-about-body
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-navy-foreground/75 sm:text-lg"
            >
              {t("body")}
            </p>

            <dl className="mt-8 flex justify-center gap-10 border-t border-white/15 pt-8">
              {stats.map(({ key, icon: Icon }) => (
                <div key={key} data-about-stat>
                  <dt className="flex items-center justify-center gap-2 font-display text-2xl text-gold sm:text-3xl">
                    <Icon className="size-5 shrink-0 sm:size-6" strokeWidth={1.5} />
                    <CountUp value={t(`stats.${key}Value`)} />
                  </dt>
                  <dd className="mt-1 text-sm text-navy-foreground/70">
                    {t(`stats.${key}Label`)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-about-video className="lg:order-3">
            <DroneVideo
              label={t("droneLabel")}
              sources={videos.droneGravata2}
              poster={photos.droneGravata2Poster}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

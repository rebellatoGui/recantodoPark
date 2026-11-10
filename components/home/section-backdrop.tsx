"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { cn } from "@/lib/utils";

export function SectionBackdrop({
  variant,
  className,
}: {
  variant: "topo" | "park" | "grain" | "coaster";
  className?: string;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || variant === "grain") return;

      const scrollTrigger = {
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      if (variant === "coaster") {
        gsap.fromTo(
          "[data-coaster-track]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: { ...scrollTrigger, end: "center center" },
          },
        );
      } else if (variant === "park") {
        gsap.fromTo(
          "[data-backdrop-layer]",
          { backgroundPositionY: "42%" },
          { backgroundPositionY: "58%", ease: "none", scrollTrigger },
        );
      } else {
        gsap.to("[data-backdrop-layer]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger,
        });
      }
    },
    { scope, dependencies: [variant] },
  );

  return (
    <div
      ref={scope}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {variant === "park" ? (
        <>
          <div
            data-backdrop-layer
            className="absolute inset-x-0 top-0 h-[120%] scale-105 bg-[url('/photos/beto-carrero-world-parque.webp')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-navy/82" />
          <div className="absolute inset-0 bg-linear-to-b from-navy/60 via-transparent to-navy/60" />
        </>
      ) : variant === "grain" ? (
        <div className="absolute inset-0 bg-grain opacity-[0.1] mix-blend-multiply dark:opacity-[0.08] dark:mix-blend-screen" />
      ) : variant === "coaster" ? (
        <>
          <div className="absolute inset-0 bg-grain opacity-[0.1] mix-blend-multiply dark:opacity-[0.08] dark:mix-blend-screen" />
          <svg
            viewBox="0 0 1200 400"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-x-0 top-[8%] h-[70%] w-full text-terracotta/13 dark:text-gold/10"
          >
            <path
              d="M-20 330 C 120 330 160 120 280 120 S 400 300 480 300 S 560 60 640 60 C 700 60 740 150 700 190 C 660 230 590 180 620 130 C 650 80 760 90 800 170 S 900 330 1000 250 S 1120 90 1230 110"
              data-coaster-track
              pathLength={1}
              strokeDasharray="1 1"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M-20 346 C 120 346 160 136 280 136 S 400 316 480 316 S 560 76 640 76 C 690 76 722 146 690 176 C 660 206 606 172 630 136 C 654 100 748 108 786 178 S 900 346 1000 266 S 1120 106 1230 126"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="2 14"
              strokeLinecap="round"
            />
          </svg>
        </>
      ) : (
        <div
          data-backdrop-layer
          className="absolute inset-x-0 top-0 h-[125%] bg-terracotta opacity-20 [mask-image:url('/brand/bg-topo.webp')] mask-center mask-no-repeat mask-cover dark:bg-gold dark:opacity-15"
        />
      )}
    </div>
  );
}

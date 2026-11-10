"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";

function cardStep(track: HTMLElement) {
  const card = track.firstElementChild as HTMLElement | null;
  if (!card) return track.clientWidth;
  return (
    card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0")
  );
}

export function PhotoCarousel({
  photos,
  autoPlayMs = 3800,
}: {
  photos: { src: string; alt: string }[];
  autoPlayMs?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * cardStep(track), behavior: "smooth" });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    const pause = () => (pausedRef.current = true);
    const resume = () => (pausedRef.current = false);
    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);
    track.addEventListener("pointerdown", pause);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", resume);

    const id = window.setInterval(() => {
      if (pausedRef.current || document.hidden) return;
      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      track.scrollTo({
        left: atEnd ? 0 : track.scrollLeft + cardStep(track),
        behavior: "smooth",
      });
    }, autoPlayMs);

    return () => {
      window.clearInterval(id);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
      track.removeEventListener("pointerdown", pause);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", resume);
    };
  }, [autoPlayMs]);

  return (
    <div className="relative sm:px-14">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="relative aspect-4/3 w-[82%] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 82vw"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByCards(-1)}
        aria-label="Foto anterior"
        className="absolute left-0 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-105 sm:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCards(1)}
        aria-label="Próxima foto"
        className="absolute right-0 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy shadow-lg transition-transform hover:scale-105 sm:flex"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

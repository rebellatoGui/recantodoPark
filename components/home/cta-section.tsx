"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { BookNowButton } from "@/components/booking/book-now-button";
import { Magnetic } from "@/components/animations/magnetic";
import { useReveal } from "@/lib/animations/use-reveal";
import { gsap, useGSAP } from "@/lib/animations/gsap";
import { prefersReducedMotion } from "@/lib/animations/reduced-motion";
import { SplitWords } from "@/components/animations/split-words";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { contact } from "@/lib/data/pousada";
import { photos } from "@/lib/data/images";

function InstagramPostCard() {
  const t = useTranslations("instagram");

  return (
    <a
      data-instagram-invite
      href={contact.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("cta")}
      className="group relative mx-auto block w-full max-w-sm lg:max-w-md"
    >
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-tr from-[#f58529]/35 via-[#dd2a7b]/30 to-[#8134af]/35 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
      />
      <article className="overflow-hidden rounded-[1.75rem] bg-white text-left text-neutral-900 shadow-2xl shadow-[#8134af]/20 ring-1 ring-black/5 transition-transform duration-700 ease-out motion-safe:rotate-2 motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:rotate-0">
        <header className="flex items-center gap-3 px-4 py-3">
          <span className="rounded-full bg-linear-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-0.5">
            <span className="block rounded-full bg-white p-0.5">
              <Image
                src="/brand/logo-oficial.png"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full object-contain"
              />
            </span>
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-sm font-semibold">
              {contact.instagramHandle.replace(/^@/, "")}
            </p>
            <p className="truncate text-xs text-neutral-500">{t("location")}</p>
          </div>
          <span className="rounded-lg bg-[#0095f6] px-4 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-[#1877f2]">
            {t("follow")}
          </span>
        </header>

        <div className="relative aspect-4/5 overflow-hidden bg-neutral-900">
          <Image
            src={photos.fachadaNoite}
            alt={t("caption")}
            fill
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            sizes="(min-width: 1024px) 448px, (min-width: 640px) 384px, 90vw"
          />
          <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
            <InstagramIcon className="size-4" />
          </span>
        </div>

        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center gap-4">
            <Heart className="size-6 fill-[#ff3040] text-[#ff3040] transition-transform duration-300 group-hover:scale-110" />
            <MessageCircle className="size-6" />
            <Send className="size-6" />
            <Bookmark className="ml-auto size-6" />
          </div>
          <p className="mt-3 text-sm leading-snug">
            <span className="font-semibold">
              {contact.instagramHandle.replace(/^@/, "")}
            </span>{" "}
            {t("caption")}
          </p>
          <p className="mt-2 text-xs font-medium text-[#0095f6]">
            {t("cta")} →
          </p>
        </div>
      </article>
    </a>
  );
}

export function CtaSection() {
  const t = useTranslations("ctaFinal");
  const tInstagram = useTranslations("instagram");
  const scope = useReveal<HTMLElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-word]", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.06,
        ease: "power4.out",
        scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
      });
    },
    { scope },
  );

  return (
    <section
      ref={scope}
      className="relative isolate overflow-hidden bg-surface-cream px-6 pt-24 pb-20 md:pt-32 md:pb-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div className="text-center lg:text-left">
          <h2 className="heading-section text-foreground lg:text-[4.25rem]">
            <SplitWords text={t("title")} />
          </h2>
          <p
            data-reveal
            className="mx-auto mt-6 max-w-md text-lg text-muted-foreground lg:mx-0 lg:text-xl"
          >
            {t("subtitle")}
          </p>
          <div
            data-reveal
            className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 lg:justify-start"
          >
            <Magnetic>
              <BookNowButton
                label={t("ctaPrimary")}
                className="h-12 px-6 text-base lg:h-12 lg:px-6"
              />
            </Magnetic>
            <Magnetic>
              <WhatsappButton label={t("ctaWhatsapp")} size="lg" />
            </Magnetic>
          </div>
          <p
            data-reveal
            className="mt-10 flex items-center justify-center gap-2 text-base text-muted-foreground lg:justify-start"
          >
            <InstagramIcon className="size-5 text-[#dd2a7b]" />
            {tInstagram("invite")}
          </p>
        </div>

        <div data-reveal>
          <InstagramPostCard />
        </div>
      </div>
    </section>
  );
}

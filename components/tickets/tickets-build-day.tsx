"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import { useReveal } from "@/lib/animations/use-reveal";

export function TicketsBuildDay() {
  const t = useTranslations("tickets");
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="bg-surface-cream px-6 pb-20 md:pb-32">
      <div className="relative isolate mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-navy text-navy-foreground lg:grid-cols-2">
        <div className="relative aspect-16/10 lg:aspect-auto">
          <Image
            src="/photos/atracoes/star-mountain.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-navy/70 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-navy/40" />
        </div>

        <div data-reveal className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
            {t("buildDay.eyebrow")}
          </p>
          <h2 className="heading-section mt-4">
            {t("buildDay.title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
            {t("buildDay.text")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsappButton
              label={t("buildDay.whatsapp")}
              message={t("whatsappStayMessage")}
              size="lg"
            />
            <Button
              render={<Link href="/acomodacoes/suite-01" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="h-12 border-white/30 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              {t("buildDay.rooms")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

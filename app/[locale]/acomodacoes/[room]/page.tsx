import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import {
  Users,
  Ruler,
  BedDouble,
  ChevronLeft,
  Clock,
  Coffee,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RoomGallery } from "@/components/accommodations/room-gallery";
import { SectionBackdrop } from "@/components/home/section-backdrop";
import { BookNowButton } from "@/components/booking/book-now-button";
import { WhatsappButton } from "@/components/booking/whatsapp-button";
import {
  rooms,
  getRoomBySlug,
  amenities,
  type AmenityId,
} from "@/lib/data/pousada";
import { photos } from "@/lib/data/images";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo/site";

const breakfastPhotos = [
  { src: photos.cafeBuffet, key: "buffet" },
  { src: photos.refeitorioMesas, key: "tables" },
  { src: photos.cafeBancada, key: "counter" },
  { src: photos.refeitorio, key: "hall" },
] as const;

const amenityIcon = Object.fromEntries(
  amenities.map((a) => [a.id, a.icon]),
) as Record<AmenityId, (typeof amenities)[number]["icon"]>;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    rooms.map((room) => ({ locale, room: room.slug })),
  );
}

export async function generateMetadata(
  props: PageProps<"/[locale]/acomodacoes/[room]">,
): Promise<Metadata> {
  const { locale, room: slug } = await props.params;
  const room = getRoomBySlug(slug);
  if (!room) return {};

  const t = await getTranslations({ locale, namespace: "accommodations" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });
  const siteName = tMeta("siteName");

  return pageMetadata({
    locale,
    path: `/acomodacoes/${room.slug}`,
    title: `${t(`rooms.${room.id}.name`)} | ${siteName}`,
    description: t(`rooms.${room.id}.description`),
    siteName,
  });
}

function RoomDetail({ room }: { room: (typeof rooms)[number] }) {
  const roomId = room.id;
  const t = useTranslations("accommodations");
  const tAmenities = useTranslations("amenities");
  const tHero = useTranslations("hero");
  const bedsText = t(`rooms.${roomId}.beds`);

  const highlights = [
    room.capacity !== undefined && {
      icon: Users,
      label: t("capacityLabel"),
      value: String(room.capacity),
    },
    bedsText && {
      icon: BedDouble,
      label: t("detail.bedsLabel"),
      value: bedsText,
    },
    room.sizeSqm !== undefined && {
      icon: Ruler,
      label: t("detail.sizeLabel"),
      value: `${room.sizeSqm} m²`,
    },
  ].filter(Boolean) as { icon: typeof Users; label: string; value: string }[];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy pt-16 pb-20 text-navy-foreground md:pt-20 md:pb-28">
        <Image
          src={photos.fachadaNoite}
          alt=""
          fill
          priority
          className="-z-20 scale-110 object-cover opacity-90 blur-sm"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-navy/55 via-navy/80 to-navy"
        />
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-foreground/70 transition-colors hover:text-gold"
          >
            <ChevronLeft className="size-4" />
            {t("detail.backToRooms")}
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.35em] text-gold">
            {tHero("eyebrow")}
          </p>
          <h1 className="heading-section mt-4">{t(`rooms.${roomId}.name`)}</h1>

          <div className="mt-10 md:mt-12">
            <RoomGallery images={room.images} alt={t(`rooms.${roomId}.name`)} />
          </div>

          <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
            <div>
              {highlights.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-3">
                  {highlights.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="flex size-9 items-center justify-center rounded-full bg-gold/15 text-gold">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <div className="leading-tight">
                        <p className="text-xs uppercase tracking-wide text-navy-foreground/60">
                          {label}
                        </p>
                        <p className="text-sm font-medium text-navy-foreground">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="max-w-2xl text-lg leading-relaxed text-navy-foreground/85 lg:text-xl">
                {t(`rooms.${roomId}.longDescription`)}
              </p>
            </div>

            <aside>
              <div className="rounded-3xl border border-white/12 bg-white/6 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
                  {t("detail.bookEyebrow")}
                </p>
                <p className="mt-3 font-display text-2xl">
                  {t(`rooms.${roomId}.name`)}
                </p>
                <p className="mt-4 flex items-center gap-2 text-sm text-navy-foreground/75">
                  <Clock className="size-4 shrink-0 text-gold" />
                  {tAmenities("items.reception")}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <BookNowButton
                    label={t("bookRoom")}
                    className="h-12 w-full text-base lg:h-12"
                  />
                  <WhatsappButton size="lg" className="w-full" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="relative isolate bg-surface-cream">
        <SectionBackdrop variant="grain" />

        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2 className="text-xs font-medium uppercase tracking-[0.25em] text-terracotta">
            {t("detail.amenitiesLabel")}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-5 md:gap-4">
            {room.amenityIds.map((amenityId) => {
              const Icon = amenityIcon[amenityId];
              return (
                <li
                  key={amenityId}
                  className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-card/70 p-4 sm:flex-col sm:gap-3 sm:px-3 sm:py-6 sm:text-center"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy text-gold">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-base font-medium leading-snug text-foreground sm:text-sm">
                    {tAmenities(`items.${amenityId}`)}
                  </span>
                </li>
              );
            })}
          </ul>

          <section className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white">
                <Coffee className="size-4" strokeWidth={1.75} />
                {t("detail.breakfast.badge")}
              </span>
              <h2 className="mt-5 font-display text-3xl leading-tight text-foreground sm:text-4xl">
                {t("detail.breakfast.title")}
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                {t("detail.breakfast.text")}
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-3 md:gap-4">
              {breakfastPhotos.map(({ src, key }) => (
                <li
                  key={key}
                  className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted"
                >
                  <Image
                    src={src}
                    alt={t(`detail.breakfast.photos.${key}`)}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 300px, 50vw"
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default async function RoomPage(
  props: PageProps<"/[locale]/acomodacoes/[room]">,
) {
  const { locale, room: slug } = await props.params;
  setRequestLocale(locale);

  const room = getRoomBySlug(slug);
  if (!room) notFound();

  return <RoomDetail room={room} />;
}

import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/hero/hero-section";
import { ServicesStrip } from "@/components/home/services-strip";
import { InstagramBand } from "@/components/home/instagram-band";
import { AboutSection } from "@/components/home/about-section";
import { LocationSection } from "@/components/home/location-section";
import { AmenitiesSection } from "@/components/home/amenities-section";
import { AccommodationsPreview } from "@/components/accommodations/accommodations-preview";
import { GoogleReviewsSection } from "@/components/home/google-reviews-section";
import { CtaSection } from "@/components/home/cta-section";
import { LodgingJsonLd } from "@/lib/seo/lodging-json-ld";

export default async function HomePage(props: PageProps<"/[locale]">) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <LodgingJsonLd />
      <HeroSection />
      <ServicesStrip />
      <InstagramBand />
      <AccommodationsPreview />
      <AboutSection />
      <GoogleReviewsSection />
      <CtaSection />
      <AmenitiesSection />
      <LocationSection />
    </>
  );
}

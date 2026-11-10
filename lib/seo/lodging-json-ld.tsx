import { contact } from "@/lib/data/pousada";
import { ogImage, siteUrl } from "@/lib/seo/site";

export function LodgingJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${siteUrl}/#pousada`,
    name: "Pousada Recanto do Park",
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-oficial.png`,
    image: [`${siteUrl}${ogImage.url}`, `${siteUrl}/photos/quarto1.webp`],
    description:
      "Pousada em Penha/SC, a poucos minutos do Beto Carrero World e da Praia do Gravatá.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Timóteo Perfeito Flores, 2994",
      addressLocality: "Penha",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.latitude,
      longitude: contact.longitude,
    },
    hasMap: contact.googleMapsUrl,
    email: contact.email,
    telephone: contact.phoneDisplay,
    petsAllowed: true,
    sameAs: [contact.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

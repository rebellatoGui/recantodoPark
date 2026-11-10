import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { rooms } from "@/lib/data/pousada";
import { localizedPath, siteUrl } from "@/lib/seo/site";

const paths = [
  { path: "", priority: 1 },
  { path: "/ingressos-beto-carrero", priority: 0.8 },
  { path: "/politica-de-privacidade", priority: 0.3 },
  { path: "/termos-de-uso", priority: 0.3 },
  ...rooms.map((room) => ({
    path: `/acomodacoes/${room.slug}`,
    priority: 0.6,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap(({ path, priority }) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(locale, path)}`,
      lastModified,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteUrl}${localizedPath(l, path)}`])
        ),
      },
    }))
  );
}

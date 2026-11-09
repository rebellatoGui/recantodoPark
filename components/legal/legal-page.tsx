import { useLocale, useTranslations } from "next-intl";
import { contact } from "@/lib/data/pousada";

export const LEGAL_UPDATED_AT = "2026-11-09";

type Section = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  closing?: string;
};

const localeTags: Record<string, string> = {
  pt: "pt-BR",
  en: "en-US",
  es: "es-ES",
};

export function LegalPage({ document }: { document: "privacy" | "terms" }) {
  const t = useTranslations(`legal.${document}`);
  const tLegal = useTranslations("legal");
  const tContact = useTranslations("contact");
  const locale = useLocale();

  const fill = (text: string) =>
    text
      .replaceAll("{email}", contact.email)
      .replaceAll("{phone}", contact.phoneDisplay)
      .replaceAll("{address}", tContact("address"));

  const sections = t.raw("sections") as Section[];
  const updatedAt = new Intl.DateTimeFormat(localeTags[locale] ?? "pt-BR", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${LEGAL_UPDATED_AT}T12:00:00Z`));

  return (
    <>
      <div className="bg-navy px-6 py-16 text-navy-foreground md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-gold">
            {tLegal("eyebrow")}
          </p>
          <h1 className="heading-section mt-4">
            {t("title")}
          </h1>
          <p className="mt-4 text-sm text-navy-foreground/70">
            {tLegal("updatedAt", { date: updatedAt })}
          </p>
        </div>
      </div>

      <article className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-base leading-relaxed text-foreground sm:text-lg">
            {fill(t("intro"))}
          </p>

          {sections.map((section, index) => (
            <section key={section.title} className="mt-10 border-t border-border pt-8">
              <h2 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                {index + 1}. {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base"
                >
                  {fill(paragraph)}
                </p>
              ))}
              {section.items && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed text-muted-foreground marker:text-terracotta sm:text-base">
                  {section.items.map((item) => (
                    <li key={item}>{fill(item)}</li>
                  ))}
                </ul>
              )}
              {section.closing && (
                <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                  {fill(section.closing)}
                </p>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}

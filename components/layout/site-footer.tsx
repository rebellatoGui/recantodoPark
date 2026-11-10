import { useTranslations } from "next-intl";
import { Clock, Mail, MapPin, PawPrint } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { MastercardIcon } from "@/components/icons/mastercard-icon";
import { VisaIcon } from "@/components/icons/visa-icon";
import { PixIcon } from "@/components/icons/pix-icon";
import { EloIcon } from "@/components/icons/elo-icon";
import { BoletoIcon } from "@/components/icons/boleto-icon";
import { contact, whatsappLink } from "@/lib/data/pousada";
import { HashLink } from "@/components/layout/hash-link";

const paymentIcons = [
  { Icon: PixIcon, label: "Pix" },
  { Icon: VisaIcon, label: "Visa" },
  { Icon: MastercardIcon, label: "Mastercard" },
  { Icon: EloIcon, label: "Elo" },
  { Icon: BoletoIcon, label: "Boleto" },
];

function ColumnTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-semibold text-gold">{children}</h2>
  );
}

function ContactItem({
  href,
  Icon,
  children,
  external = true,
}: {
  href: string;
  Icon: ComponentType<{ className?: string }>;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="group flex min-h-11 items-start gap-3 py-2.5 transition-colors hover:text-gold lg:min-h-0 lg:py-1.5"
      >
        <Icon className="mt-0.5 size-4 shrink-0 text-gold/80 transition-colors group-hover:text-gold" />
        <span className="wrap-break-word">{children}</span>
      </a>
    </li>
  );
}

export function SiteFooter() {
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");
  const tFooter = useTranslations("footer");
  const tInfo = useTranslations("essentialInfo");
  const tAmenities = useTranslations("amenities");

  const navLinks = [
    { href: "/", label: tNav("home"), hash: false },
    { href: "/acomodacoes/suite-01", label: tNav("accommodations"), hash: false },
    { href: "/ingressos-beto-carrero", label: tNav("tickets"), hash: false },
    { href: "/#maps", label: tNav("location"), hash: true },
    { href: "/#servicos", label: tNav("amenities"), hash: true },
  ];

  const stayInfo = [
    { Icon: Clock, text: tAmenities("items.reception") },
    { Icon: PawPrint, text: `${tInfo("petLabel")}: ${tInfo("petValue")}` },
  ];

  const linkClass =
    "inline-flex min-h-11 items-center transition-colors hover:text-gold lg:min-h-0 lg:py-1.5";

  return (
    <footer
      id="contato"
      className="border-t border-white/10 bg-navy text-navy-foreground"
    >
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-28 sm:pb-10 md:pt-16">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-y-12 lg:gap-x-16">
          <nav aria-label={tFooter("navTitle")}>
            <ColumnTitle>{tFooter("navTitle")}</ColumnTitle>
            <ul className="mt-3 grid text-sm text-navy-foreground/70 sm:grid-cols-1 lg:mt-4">
              {navLinks.map(({ href, label, hash }) => (
                <li key={href}>
                  {hash ? (
                    <HashLink href={href} className={linkClass}>
                      {label}
                    </HashLink>
                  ) : (
                    <Link href={href} className={linkClass}>
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>{tContact("title")}</ColumnTitle>
            <ul className="mt-3 text-sm text-navy-foreground/70 lg:mt-4">
              <ContactItem href={whatsappLink()} Icon={WhatsappIcon}>
                {contact.phoneDisplay}
              </ContactItem>
              <ContactItem
                href={`mailto:${contact.email}`}
                Icon={Mail}
                external={false}
              >
                {contact.email}
              </ContactItem>
              <ContactItem href={contact.instagramUrl} Icon={InstagramIcon}>
                {contact.instagramHandle}
              </ContactItem>
              <ContactItem href={contact.googleMapsUrl} Icon={MapPin}>
                {tContact("address")}
              </ContactItem>
            </ul>
          </div>

          <div>
            <ColumnTitle>{tFooter("stayTitle")}</ColumnTitle>
            <ul className="mt-3 text-sm text-navy-foreground/70 lg:mt-4">
              {stayInfo.map(({ Icon, text }) => (
                <li key={text} className="flex items-start gap-3 py-2.5 lg:py-1.5">
                  <Icon className="mt-0.5 size-4 shrink-0 text-gold/80" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-6 border-t border-white/10 pt-8 lg:mt-14 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 text-xs text-navy-foreground/55 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
            <p>
              © {new Date().getFullYear()} Pousada Recanto do Park.{" "}
              {tFooter("rights")}
            </p>
            <Link
              href="/politica-de-privacidade"
              className="inline-flex min-h-11 items-center transition-colors hover:text-gold sm:min-h-0"
            >
              {tFooter("privacy")}
            </Link>
            <Link
              href="/termos-de-uso"
              className="inline-flex min-h-11 items-center transition-colors hover:text-gold sm:min-h-0"
            >
              {tFooter("terms")}
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs text-navy-foreground/55">
              {tFooter("paymentMethods")}
            </span>
            <ul className="flex items-center gap-2">
              {paymentIcons.map(({ Icon, label }) => (
                <li
                  key={label}
                  title={label}
                  className="flex h-8 w-11 items-center justify-center rounded-md bg-white"
                >
                  <Icon className="size-5" />
                  <span className="sr-only">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

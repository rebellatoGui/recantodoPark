import { permanentRedirect } from "next/navigation";
import { rooms } from "@/lib/data/pousada";
import { localizedPath } from "@/lib/seo/site";

export default async function AcomodacoesPage(
  props: PageProps<"/[locale]/acomodacoes">
) {
  const { locale } = await props.params;
  permanentRedirect(localizedPath(locale, `/acomodacoes/${rooms[0].slug}`));
}

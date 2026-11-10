import type { FullConfig } from "@playwright/test";

const PAGES = [
  "/",
  "/acomodacoes/suite-01",
  "/ingressos-beto-carrero",
  "/politica-de-privacidade",
  "/termos-de-uso",
];
const LOCALES = ["", "/en", "/es"];

// O dev do Next corrompe o .next/dev/prerender-manifest.json quando várias rotas são
// compiladas pela primeira vez ao mesmo tempo (os workers em paralelo). Compilar uma
// por vez antes dos testes evita a corrida.
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL ?? "http://localhost:3000";
  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const path = `${locale}${page}`.replace(/\/$/, "") || "/";
      await fetch(new URL(path, baseURL));
    }
  }
}

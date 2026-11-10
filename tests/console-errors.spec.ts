import { test, expect } from "@playwright/test";

// O embed do Google Maps roda scripts de terceiros que às vezes falham
// sozinhos no ambiente de teste. Não controlamos esse código, então ele não
// deve reprovar a checagem do nosso.
const TERCEIROS = ["maps.gstatic.com", "maps.google.com", "googleapis.com"];
const deTerceiros = (texto: string) =>
  TERCEIROS.some((dominio) => texto.includes(dominio));

const routes = [
  "/",
  "/acomodacoes/suite-01",
  "/ingressos-beto-carrero",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/en",
  "/en/acomodacoes/suite-01",
  "/en/ingressos-beto-carrero",
  "/es",
  "/es/acomodacoes/suite-01",
  "/es/ingressos-beto-carrero",
];

for (const route of routes) {
  test(`no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && !deTerceiros(msg.text()))
        errors.push(msg.text());
    });
    page.on("pageerror", (err) => {
      if (!deTerceiros(err.stack ?? err.message))
        errors.push("pageerror: " + err.message);
    });

    const failedRequests: string[] = [];
    page.on("response", (res) => {
      if (res.status() >= 400 && !deTerceiros(res.url()))
        failedRequests.push(`${res.status()} ${res.url()}`);
    });

    await page.goto(route, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    expect(errors, `console errors on ${route}`).toEqual([]);
    expect(failedRequests, `failed requests on ${route}`).toEqual([]);
  });
}

test("home page has no console warnings across theme/language interactions", async ({
  page,
}) => {
  const messages: string[] = [];
  page.on("console", (msg) => {
    if (
      (msg.type() === "error" || msg.type() === "warning") &&
      !deTerceiros(msg.text())
    ) {
      messages.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on("pageerror", (err) => {
    if (!deTerceiros(err.stack ?? err.message))
      messages.push("pageerror: " + err.message);
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const toggle = page.getByRole("button", { name: /alternar tema/i });
  await toggle.click();
  await page.waitForTimeout(500);
  await toggle.click();
  await page.waitForTimeout(500);

  const langBtn = page.getByRole("button", { name: /português/i });
  await langBtn.click();
  await page.waitForTimeout(300);
  await page.getByRole("menuitem", { name: /english/i }).click();
  await page.waitForTimeout(1000);

  expect(messages).toEqual([]);
});

test("room gallery lightbox opens and closes without errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !deTerceiros(msg.text()))
      errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    if (!deTerceiros(err.stack ?? err.message))
      errors.push("pageerror: " + err.message);
  });

  await page.goto("/acomodacoes/suite-01", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const mainImage = page
    .locator("button")
    .filter({ has: page.locator("img") })
    .first();
  await mainImage.click();
  await page.waitForTimeout(500);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);

  expect(errors).toEqual([]);
});

test("room gallery thumbnail navigation works without errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" && !deTerceiros(msg.text()))
      errors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    if (!deTerceiros(err.stack ?? err.message))
      errors.push("pageerror: " + err.message);
  });

  await page.goto("/acomodacoes/suite-01", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const thumbs = page.locator("button img");
  const count = await thumbs.count();
  if (count > 1) {
    await thumbs.nth(1).click();
    await page.waitForTimeout(400);
  }

  expect(errors).toEqual([]);
});

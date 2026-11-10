import { test, expect } from "@playwright/test";

test("home renders in Portuguese by default", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Recanto do Park/);
  await expect(
    page.getByRole("heading", { name: /refúgio entre o parque e o mar/i })
  ).toBeVisible();
});

test("accommodations link opens the suite page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Acomodações" }).first().click();
  await expect(page).toHaveURL(/\/acomodacoes\/suite-01$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /suíte standard/i })
  ).toBeVisible();
});

test("old accommodations list redirects to the suite", async ({ page }) => {
  await page.goto("/en/acomodacoes");
  await expect(page).toHaveURL(/\/en\/acomodacoes\/suite-01$/);
});

test("switches language to English", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Português" }).click();
  await page.getByRole("menuitem", { name: "English" }).click();
  await expect(page).toHaveURL(/\/en/);
  await expect(page).toHaveTitle(/Penha, Santa Catarina/);
});

test("whatsapp and booking CTAs point to configured placeholders", async ({
  page,
}) => {
  await page.goto("/");
  const whatsapp = page
    .getByRole("button", { name: "Falar no WhatsApp" })
    .first();
  await expect(whatsapp).toHaveAttribute("href", /wa\.me\/554732671937/);

  const floating = page.getByRole("link", {
    name: "Fale conosco no WhatsApp",
  });
  await expect(floating).toHaveAttribute("href", /wa\.me\/554732671937/);
});

test("book now buttons open the booking engine in a new tab", async ({ page }) => {
  await page.goto("/");
  const links = page.locator('a[href="https://reservas.pousadarecantodopark.com.br/"]');
  expect(await links.count()).toBeGreaterThan(0);
  await expect(links.first()).toHaveAttribute("target", "_blank");
  await expect(page.locator('a[href*="reservar-em-breve"]')).toHaveCount(0);
});

test("home invites to the official instagram in the final CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-instagram-invite]")).toHaveAttribute(
    "href",
    "https://www.instagram.com/pousadarecantodopark/"
  );
});

test("hero video label is translated", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("section video").first()).toHaveAttribute("aria-label", /aerial view/i);
});

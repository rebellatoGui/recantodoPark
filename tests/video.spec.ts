import { test, expect } from "@playwright/test";

test("hero video is a 10 second native loop without fades", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("section video").first();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 15_000 })
    .toBe(true);
  const info = await video.evaluate((v: HTMLVideoElement) => ({
    loop: v.loop,
    duration: Math.round(v.duration),
    opacity: getComputedStyle(v).opacity,
  }));
  expect(info).toEqual({ loop: true, duration: 10, opacity: "1" });
});

test("drone video pauses when scrolled away and resumes when back", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  const drone = page.locator('video[aria-label*="Gravatá"]').first();
  await drone.scrollIntoViewIfNeeded();
  await expect
    .poll(() => drone.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 15_000 })
    .toBe(true);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect
    .poll(() => drone.evaluate((v: HTMLVideoElement) => v.paused), { timeout: 5_000 })
    .toBe(true);

  await drone.scrollIntoViewIfNeeded();
  await expect
    .poll(() => drone.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 5_000 })
    .toBe(true);
});

test("hero content never paints in its final state before the entrance animation", async ({ page }) => {
  await page.addInitScript(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const word = document.querySelector("[data-hero-word]");
      const eyebrow = document.querySelector("[data-hero-eyebrow]");
      (window as unknown as { __firstPaint: unknown }).__firstPaint = {
        word: word && getComputedStyle(word).transform,
        eyebrow: eyebrow && getComputedStyle(eyebrow).opacity,
      };
    });
  });
  await page.goto("/");
  const first = await page.evaluate(() => (window as unknown as { __firstPaint: { word: string; eyebrow: string } }).__firstPaint);
  expect(first.word).not.toBe("none");
  expect(first.eyebrow).toBe("0");
});

test("hero video always plays at normal speed (smoothness comes from opacity only)", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("section video").first();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused), { timeout: 15_000 })
    .toBe(true);
  const rates = await video.evaluate(async (v: HTMLVideoElement) => {
    const seen = new Set<number>();
    for (let i = 0; i < 20; i++) {
      seen.add(v.playbackRate);
      await new Promise((r) => setTimeout(r, 50));
    }
    return [...seen];
  });
  expect(rates).toEqual([1]);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("hero content is visible immediately", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-hero-eyebrow]")).toHaveCSS("opacity", "1");
    await expect(page.locator("[data-hero-subtitle]")).toHaveCSS("opacity", "1");
    await expect(page.locator("[data-hero-word]").first()).toHaveCSS("transform", "none");
  });
});
